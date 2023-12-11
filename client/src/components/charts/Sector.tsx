import { Box } from "@chakra-ui/react";
import { Pie } from "react-chartjs-2";
import { Project, ProjectProps } from "../../types";

function generateColors(length: number) {
  const colors = [];
  for (let i = 0; i < length; i++) {
    colors.push(`hsl(${(i * 360) / length}, 70%, 55%)`);
  }
  return colors;
}

function createChartDataFromProjectList(projects: Project[]) {
  const sectorCounts: { [key: string]: number } = {};

  for (const project of projects) {
    const { Sector } = project;
    if (sectorCounts[Sector]) {
      sectorCounts[Sector]++;
    } else {
      sectorCounts[Sector] = 1;
    }
  }

  // Extract label and data arrays from the sectorCounts map
  const labels = Object.keys(sectorCounts);
  const data = labels.map((label) => sectorCounts[label]);

  const backgroundColors = generateColors(labels.length);

  return {
    labels: labels,
    datasets: [
      {
        label: "Investments",
        data: data,
        backgroundColor: backgroundColors,
        borderColor: generateColors(labels.length),
        borderWidth: 1,
      },
    ],
  };
}

export default function SectorChart(props: ProjectProps) {
  const { projects } = props;

  return <Pie data={createChartDataFromProjectList(projects)} />;
}
