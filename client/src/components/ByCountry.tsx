import {
  Heading,
  Text,
  Box,
  HStack,
  Input,
  Button,
  Stack,
} from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ChangeEvent, useState } from "react";
import { Pie } from "react-chartjs-2";
import { FetchInvestmentListByCountry } from "../api";
import { Project } from "../types";
import ProjectTable from "./ProjectTable";

ChartJS.register(ArcElement, Tooltip, Legend);

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
        label: "Sectors",
        data: data,
        backgroundColor: backgroundColors,
        borderColor: generateColors(labels.length),
        borderWidth: 1,
      },
    ],
  };
}

export default function ByCountry() {
  const [country, setCountry] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);

  const update_country = (event: ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  const fetch_investments_by_country = () => {
    FetchInvestmentListByCountry(country)
      .then((data) => {
        console.log(data);
        setProjects(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handle_submit = () => {
    fetch_investments_by_country();
  };

  const reset = () => {
    setProjects([]);
  };

  return (
    <Box w="100vw" p={5}>
      <Heading size={"md"}>
        {projects.length > 0 ? "By Country: " + country : "By Country"}
      </Heading>
      <Text fontWeight={600} color={"gray"}></Text>
      <HStack mt={5} maxW={"450px"} minW={"300px"} gap={3}>
        <Input
          placeholder="Country Name"
          variant={"filled"}
          value={country}
          onChange={update_country}
        />
        <Button colorScheme={"green"} onClick={handle_submit}>
          Submit
        </Button>
        {projects.length > 0 ? (
          <Button colorScheme={"red"} onClick={reset}>
            Clear
          </Button>
        ) : (
          <></>
        )}
      </HStack>
      {projects.length > 0 ? (
        <Box>
          <Box p={5}>
            <Box
              w={"30vw"}
              maxW={"700px"}
              p={5}
              bg={"bg.surface"}
              borderWidth={3}
            >
              <Stack>
                <Text fontSize={"x-large"}>Breakdown by Sector</Text>
                <Pie data={createChartDataFromProjectList(projects)} />
              </Stack>
            </Box>
          </Box>
          <ProjectTable projects={projects} />
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
