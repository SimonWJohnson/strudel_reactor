
// The View
// Owns the lifecycle

import { useEffect, useRef } from "react";
import { initD3Graph, destroyD3Graph } from "../Controllers/D3GraphModel";

function D3Graph() {
    const svgRef = useRef(null);

    useEffect(() => {
        if (svgRef.current) {
            initD3Graph(svgRef.current);
        }
        return () => {
            destroyD3Graph();
        }
    }, []);

    return (
        <svg
            ref={svgRef}
            style={{ width: "100%", height: "160px" }}
        />
    );
}

export default D3Graph;