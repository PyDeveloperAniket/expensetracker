import React from "react";
// Importing the Line component from react-chartjs-2 for rendering line charts
import { Line } from "react-chartjs-2";
// Importing ChartJS for chart rendering; 'chart.js/auto' includes all necessary components for Chart.js to work
import { Chart as ChartJS } from "chart.js/auto";

// LineChart component accepts `props` to configure and render a line chart
export default function LineChart(props) {
  return (
    // Rendering the Line chart component from react-chartjs-2
    // `data` prop: Configuration for the chart data (e.g., datasets, labels)
    // `options` prop: Configuration for chart options (e.g., scales, plugins)
    <Line data={props.chartData} options={props.options} />
  );
}
