import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Center,
} from "@chakra-ui/react";
import CountryMap from "./components/CountryMap";
import InvestmentSection from "./components/InvestmentSection";
import SelectedCountrySection from "./components/SelectedCountrySection";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  Title,
  CategoryScale,
  LinearScale,
} from "chart.js";
import GlobalData from "./components/GlobalData";
import { useAppContext } from "./AppContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);
const NAVBAR_HEIGHT = "90px";

export default function App() {
  const { tabIndex, setTabIndex, selectedCountry } = useAppContext();

  return (
    <div className="App">
      <Box w={"100vw"} height={`calc(80vh - ${NAVBAR_HEIGHT})`}>
        <CountryMap />
      </Box>
      <Center width={"100%"} mt={10}>
        <Box width={"100%"} maxW={"2048px"}>
          <Tabs
            isFitted
            variant="soft-rounded"
            colorScheme="green"
            index={tabIndex}
            onChange={setTabIndex}
          >
            <TabList>
              <Tab>Global Data</Tab>
              <Tab isDisabled={!selectedCountry}>Selected Country</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <GlobalData />
              </TabPanel>
              <TabPanel>
                <SelectedCountrySection />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Center>
    </div>
  );
}

// <Center>
//   <Box width={"100%"} maxW={"2048px"}>
//     <InvestmentSection />
//   </Box>
// </Center>
