import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  HStack,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FetchCompanyInfo } from "../api";
import { CompanyData, Investment_Company } from "../types";
import SectorChart from "./charts/Sector";
import TimelineChart from "./charts/Timeline";
import ProjectTable from "./ProjectTable";

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
}

export default function CompanyModal(props: CompanyModalProps) {
  const [data, setCompany] = useState<CompanyData>();
  const { isOpen, companyName, onClose } = props;

  const fetchCompanyInfo = () => {
    if (companyName == "") return;
    FetchCompanyInfo(companyName)
      .then((response) => {
        console.log(response);
        setCompany(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCompanyInfo();
  }, [companyName]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      size={"3xl"}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent maxW={"80vw"}>
        <ModalHeader>{data ? data.Company.Investor : "Loading"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {data ? (
            <Stack width={"100%"}>
              <HStack width={"50%"}>
                <SectorChart projects={data.Projects} />
                <TimelineChart projects={data.Projects} />
              </HStack>
              <ProjectTable projects={data.Projects} />
            </Stack>
          ) : (
            <></>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
