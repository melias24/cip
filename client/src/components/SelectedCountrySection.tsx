import {
  Box,
  Card,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FetchInvestmentListByCountry } from "../api";
import { useAppContext } from "../AppContext";
import { Project } from "../types";
import SectorChart from "./charts/Sector";
import TimelineChart from "./charts/Timeline";
import ProjectTable from "./ProjectTable";

export default function SelectedCountrySection() {
  const { selectedCountry } = useAppContext();
  const [projects, setProjects] = useState<Project[]>([]);

  const fetch_investments_by_country = (country: string) => {
    FetchInvestmentListByCountry(country)
      .then((data) => {
        console.log(data);
        setProjects(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!selectedCountry) {
      return;
    }
    fetch_investments_by_country(selectedCountry);
  }, [selectedCountry]);

  if (!selectedCountry) {
    return <></>;
  }

  return (
    <Box p={5} id="selected-country-section" width={"100%"}>
      <Heading size={"md"} mb={5}>
        {selectedCountry}
      </Heading>
      <Stack gap={10}>
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={1}>
            <Item>
              <Heading size={"sm"}>By Sector</Heading>
              <SectorChart projects={projects} />
            </Item>
          </GridItem>
          <GridItem rowSpan={1} colSpan={2}>
            <Item>
              <Heading size={"sm"}>Investments by Year</Heading>
              <TimelineChart projects={projects} />
            </Item>
          </GridItem>
        </Grid>
        <Item>
          <Heading size="sm" mb={5}>
            Investments
          </Heading>
          <ProjectTable projects={projects} />
        </Item>
      </Stack>
    </Box>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return <Card p={3}>{children}</Card>;
}
