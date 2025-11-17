
// The Controller...duh
// Owns the logic

import * as d3 from "d3";
import { pushData, getData } from "../Utils/D3GraphModel";

let svgEl = null; // svg DOM element data is drawn into
let g = null;   // the root 'g' inside the svg
let x = null, y = null; // D3 scales
let path = null; // path element that renders the visualisation line
let resizeHandler = null; // window resize listener
let d3DataHandler = null; // d3Data event listener

// margin conventions for axes / labels / padding
const margin = { top: 8, right: 8, bottom: 18, left: 28 };

// Outer and inner dimension from the current SVG size
function getInnerSize() {
    // total svg size
    const { width } = svgEl.getBoundingClientRect();
    const height = svgEl.clientHeight || 160; // default height if not set
    // inner plot area - margins
    const w = Math.max(10, width - margin.left - margin.right);
    const h = Math.max(10, height - margin.top - margin.bottom);
    return {width, height, w, h};
}

// Build / rebuild the static SVG scaffolding
function initScaffold() {
    const svg = d3.select(svgEl);

    // clear previous contents to reinitialise cleanly
    svg.selectAll("*").remove();

    const { w, h } = getInnerSize();

    // root group shifted by margins
    g = svg.append("g")
        .attr("class", "frame")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Linear x/y scales mapped to inner width and height
    x = d3.scaleLinear().range([0, w]);
    y = d3.scaleLinear().range([h, 0]);

    // Axis groups - left and bottom
    g.append("g").attr("class", "x-axis").attr("transform", `translate(0,${h})`);
    g.append("g").attr("class", "y-axis");

    // light grid groups - share scales with axes
    g.append("g").attr("class", "grid-x").attr("transform", `translate(0,${h})`);
    g.append("g").attr("class", "grid-y");

    // path to display the line geometry, i.e. the line drawn on the graph
    /*
    * contains the css styling for the path
    */
    path = g.append("path")
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "url(#neonGradient)")  // ensure super visible!
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5) // possibly change this 
        .attr("filter", "url(#glow)");

    // define the gradient and glow filter
    const defs = svg.append("defs");

    const gradient = defs.append("linearGradient")
        .attr("id", "neonGradient")
        .attr("x1", "0%") // start point (left)
        .attr("x2", "100%") // end point (right)
        .attr("y1", "0%")
        .attr("y2", "0%");

    // Define the  colour transitions along the path (gradient stops)
    gradient.append("stop")
        .attr("offset", "0%") // start of the gradient line
        .attr("stop-color", "#ff00ff"); // bright pink

    gradient.append("stop")
        .attr("offset", "100%") // end of the gradient line
        .attr("stop-color", "#ff66ff"); // softer edge

    // create the neon 'halo' around the line using a Guassian blur
    const glow = defs.append("filter")
        .attr("id", "glow");

    // Blur pass to create a soft light spread
    glow.append("feGaussianBlur")
        .attr("stdDeviation", "3") // blur intensity 
        .attr("result", "colouredBlur"); // colouredBlur output to be merged below

    const feMerge = glow.append("feMerge"); // feMerge combines multiple visual layers into 1 final rendered image
    feMerge.append("feMergeNode").attr("in", "colouredBlur"); // first visual layer - blur
    feMerge.append("feMergeNode").attr("in", "SourceGraphic"); // second visual layer - sharp line

}

// Normalise different data payload shapes to a single numeric value
function accessor(d) {
    // numbers are sent straight through
    if (typeof d === "number") return d;

    // String values need to be parsed via json to find numeric tokens
    if (typeof d === "string") {
        const n = parseFloat(d);
        if (Number.isFinite(n)) return n;

        // try parsing via json
        try {
            const obj = JSON.parse(d);
            if (obj && typeof obj === "object") {
                if ("value" in obj) return +obj.value;
                if ("amp" in obj) return +obj.amp;
                if ("vel" in obj) return +obj.vel;
                for (const k in obj) {
                    const v = +obj[k];
                    if (Number.isFinite(v)) return v;
                }
            }
        }
        catch {
            // if not JSON, data is simply ignored
        }

        // Fallback - grab the first numeric token in the string
        const m = d.match(/[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/);
        if (m) {
            const f = parseFloat(m[0]);
            if (Number.isFinite(f)) return f;
        }

        return NaN;
    }

    // Objects - value/amp.vel or any numeric field
    if (d && typeof d === "object") {
        if ("value" in d) return +d.value;
        if ("amp" in d) return +d.amp;
        if ("vel" in d) return +d.vel;
        for (const k in d) {
            const v = +d[k];
            if (Number.isFinite(v)) return v;
        }
    }

    return NaN;
}

// Draw / redraw the line chart using the latest data from the model
function draw() {
    // ensure all prerequisites
    if (!svgEl || !g || !x || !y || !path) return;

    // grab the latest data
    const data = getData();
    if (!data.length) return;

    // refresh current inner size 
    const svg = d3.select(svgEl);
    const { w, h } = getInnerSize();

    // update scale ranges and domains
    x.range([0, w]).domain([0, Math.max(1, data.length - 1)]);

    const vals = data.map(accessor).filter(Number.isFinite);
    const yMin = d3.min(vals);
    const yMax = d3.max(vals);
    const pad = (yMax - yMin) * 0.1 || 1; // 10% headroom, or 1 if flat
    y.range([h, 0]).domain([yMin - pad, yMax + pad]);

    // Build the line generator mapping index to x, and value to y
    const line = d3.line()
        .x((_, i) => x(i))
        .y((d) => y(accessor(d)));

    // update the path geometry
    path.attr("d", line(data));

    // Axes
    g.select(".x-axis").call(d3.axisBottom(x).ticks(Math.min(10, data.length)));
    g.select(".y-axis").call(d3.axisLeft(y).ticks(4));

    // gridlines
    // tickSize draws lines across the plot
    // tickFormat("") hides the labels
    g.select(".grid-x").call(d3.axisBottom(x).ticks(10).tickSize(-h).tickFormat(""));
    g.select(".grid-y").call(d3.axisLeft(y).ticks(4).tickSize(-w).tickFormat(""));

}

// Initialise the D3 graph for a given <svg> element
export function initD3Graph(el) {
    svgEl = el;
    if (!svgEl) return;

    initScaffold();
    console.debug("[D3] init", svgEl);
    draw();
    
    d3DataHandler = (event) => {
        const arr = Array.isArray(event.detail) ? event.detail : [];
        // debug
        console.debug("[D3] d3Data event:", arr.length, arr[0]);
        // update model
        pushData(arr);
        // redraw line
        draw();
    };

    document.addEventListener("d3Data", d3DataHandler);

    // Handle responsive resizes
    resizeHandler = () => {
        // rebuild with new size
        initScaffold();
        // draw with the same data
        draw();
    }
    window.addEventListener("resize", resizeHandler);

    // sanity: if no data arrives after 1s, draw a demo wave so you SEE the graph
    setTimeout(() => {
        if (getData().length === 0) {
            const demo = Array.from({ length: 60 }, (_, i) => Math.sin(i / 5));
            pushData(demo);
            console.debug("[D3] demo data drawn");
            draw();
        }
    }, 1000);
}

// Clean up listeners and references
export function destroyD3Graph() {
    if (d3DataHandler) document.removeEventListener("d3Data", d3DataHandler);
    if (resizeHandler) window.removeEventListener("resize", resizeHandler);

    // drop all references to reclaim memory
    svgEl = null; g = null; x = null; y = null; path = null;
    
}