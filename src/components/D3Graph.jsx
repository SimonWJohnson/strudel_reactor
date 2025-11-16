
// The View
// Owns the lifecycle

import { useEffect, useRef } from "react";
import { initD3Graph, destroyD3Graph } from "../Controllers/D3GraphController.jsx";

function D3Graph() {
    // create a persistent reference to the <svg> DOM element that D3 will draw into
    const svgRef = useRef(null);

    useEffect(() => {
        if (svgRef.current) {
            // set up D3 scaffolding (axes, paths, scales)
            // acts as the eventListener for live Strudel d3Data updates
            initD3Graph(svgRef.current);
        }
        return () => {
            // cleanup and remove all event listeners when component is unmounted
            // - navigate away or re0render a different view
            destroyD3Graph();
        }
    }, []);

    return (
        // render the <svg> element into the DOM
        <svg
            ref={svgRef}
            style={{ width: "100%", height: "160px" }}
        />
    );
}

export default D3Graph;