import React from "react";
import { Bar } from "react-chartjs-2";
export default function BarChart(props) {
  return <Bar data={props.chartData} options={props.options} />;
}
