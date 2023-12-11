import {
  Box,
  Button,
  Card,
  FormLabel,
  Heading,
  HStack,
  Menu,
  Select,
  Stack,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import {
  FetchFlexibleProjects,
  FetchListOfCountries,
  FetchListOfSectors,
  FlexibleProjectOptions,
} from "../api";
import { Project } from "../types";
import ProjectTable from "./ProjectTable";

export default function ProjectFilterer() {
  const [countries, setCountries] = useState<string[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [country, setCountry] = useState("");
  const [sector, setSector] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);

  const performFlexibleQuery = () => {
    let options: FlexibleProjectOptions = {};
    if (country.length == 0 && sector.length == 0) {
      options.limit = 100;
    } else {
      options.filterBy = {};
      if (country.length > 0) {
        options.filterBy["Country"] = country;
      }
      if (sector.length > 0) {
        options.filterBy["Sector"] = sector;
      }
    }
    FetchFlexibleProjects(options)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetch_countries = () => {
    FetchListOfCountries()
      .then((response) => {
        setCountries(response as string[]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetch_sectors = () => {
    FetchListOfSectors()
      .then((response) => {
        setSectors(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  const handleSectorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSector(event.target.value);
  };

  useEffect(() => {
    fetch_countries();
    fetch_sectors();
  }, []);

  return (
    <Box p={5}>
      <Stack gap={5}>
        <Card p={5}>
          <HStack gap={3}>
            <Select
              placeholder="Filter Countries"
              onChange={handleCountryChange}
            >
              {countries.map((country) => (
                <option value={country}>{country}</option>
              ))}
            </Select>
            <Select placeholder="Filter Sectors" onChange={handleSectorChange}>
              {sectors.map((sector) => (
                <option value={sector}>{sector}</option>
              ))}
            </Select>
            <Button onClick={performFlexibleQuery} colorScheme={"green"}>
              Filter
            </Button>
          </HStack>
        </Card>
        <ProjectTable projects={projects} />
      </Stack>
    </Box>
  );
}
