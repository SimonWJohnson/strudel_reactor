
// The Model...
// Owns the data

// Max number of points to keep in memory; once MAX_POINTS is reached, older values are dropped
// Only the latest 100 data points are kept
const MAX_POINTS = 100;

// Model state; starts empty and is updated whenever new data arrives from Strudel
let data = [];

// Update the data model with the latest array from Strudel (arr)
// arr values from the d3Data event from Strudel
export function pushData(arr) {
    // ignore invalid inputs
    if (!Array.isArray(arr)) return;
    // only most recent 100 data points are kept
    data = arr.slice(-MAX_POINTS);
}

// Simple getter function to return current data for use in the D3GraphController
export function getData() {
    return data;
}