// to display the data in donut chart form

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
export default function DoughnutChart(props) {
  return <Doughnut data={props.chartData} options={props.options} />;
}
