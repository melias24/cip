import express from "express";
import cors from "cors";
import {
  HandleCompanyData,
  HandleFlexibleProjects,
  HandleInvestmentList,
  HandleInvestmentsByCountry,
  HandleInvestmentsBySector,
  HandleListOfCountries,
  HandleRoot,
  HandleSectorList,
  HandleTopCompaniesByInvestmentCount,
} from "./handlers";
import { DatabaseService, fetchListOfProjects } from "./database";

const app = express();
const port = 5050;

app.use(cors());

// Start the database connection
DatabaseService.getProjectConnection();
DatabaseService.getInvestsInConnection();
DatabaseService.getCompanyConnection();

app.get("/", HandleRoot);
app.get("/investments/", HandleInvestmentList);
app.get("/investments/by_country", HandleInvestmentsByCountry);
app.get("/investments/by_sector", HandleInvestmentsBySector);

app.get("/companies/top_investments", HandleTopCompaniesByInvestmentCount);
app.get("/countries", HandleListOfCountries);
app.get("/sectors", HandleSectorList);
app.get("/flexible_projects", HandleFlexibleProjects);
app.get("/company/details", HandleCompanyData);
// app.get("/company/details", HandleCompanyDetails);

app.listen(port, () => {
  console.log("Server running ⚡️");
});
