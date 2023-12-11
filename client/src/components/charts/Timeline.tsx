import { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";
import { ProjectProps } from "../../types";

export default function TimelineChart(props: ProjectProps) {
  const { projects } = props;
  const projectCountByYear = projects.reduce(
    (acc, project) => {
      acc[project.year] = (acc[project.year] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );

  // Extract years and corresponding counts for the chart
  const years = Object.keys(projectCountByYear).map(Number).sort();
  const counts = years.map((year) => projectCountByYear[year]);

  // Define the chart data
  const data: ChartData<"bar"> = {
    labels: years,
    datasets: [
      {
        label: "Number of Projects",
        data: counts,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
}
