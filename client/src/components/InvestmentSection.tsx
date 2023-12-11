import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FetchInvestmentList } from "../api";
import { Investment_Company, Project } from "../types";
import ProjectTable from "./ProjectTable";

export default function InvestmentSection() {
  const [investments, setInvestments] = useState<Project[]>([]);

  const fetchInvestmentData = () => {
    FetchInvestmentList(100)
      .then((data) => {
        setInvestments(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchInvestmentData();
  }, []);

  return (
    <Box p={5}>
      <Heading size={"md"}>Investment List</Heading>
      <Box p={5}>
        <ProjectTable projects={investments} />
      </Box>
    </Box>
  );
}
