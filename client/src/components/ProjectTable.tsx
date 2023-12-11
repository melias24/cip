import {
  Table,
  TableContainer,
  Tbody,
  Thead,
  Tr,
  Th,
  Tfoot,
  Td,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { Project } from "../types";
import CompanyModal from "./CompanyModal";
import "../styles.css";

interface ProjectTableProps {
  projects: Project[];
}

export default function ProjectTable(props: ProjectTableProps) {
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const { projects } = props;

  const toggleModal = () => {
    setShowInvestmentModal(!showInvestmentModal);
  };

  const handleInvestorClick = (name: string) => {
    if (companyName !== name) {
      setCompanyName(name);
      setShowInvestmentModal(true);
    }
  };

  return (
    <Box borderWidth={3} borderRadius={8}>
      <CompanyModal
        companyName={companyName}
        onClose={toggleModal}
        isOpen={showInvestmentModal}
      />
      <TableContainer maxW={"100%"}>
        <Table variant={"striped"} colorScheme={"teal"}>
          <Thead>
            <Tr>
              <Th>Investor</Th>
              <Th>Year</Th>
              <Th>Sector</Th>
              <Th>Region</Th>
              <Th>Country</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map((project) => (
              <Tr>
                <Td onClick={() => handleInvestorClick(project.Investor)}>
                  <a className={"hoverable"}>{project.Investor}</a>
                </Td>
                <Td>{project.year}</Td>
                <Td>{project.Sector}</Td>
                <Td>{project.Region}</Td>
                <Td>{project.Country}</Td>
              </Tr>
            ))}
          </Tbody>
          {projects.length >= 10 ? (
            <Tfoot>
              <Tr>
                <Th>Investor</Th>
                <Th>Year</Th>
                <Th>Sector</Th>
                <Th>Region</Th>
                <Th>Country</Th>
              </Tr>
            </Tfoot>
          ) : (
            <></>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
