import express from "express";
import cors from "cors";
import {
  HandleCompanyDetails,
  HandleFlexibleProjects,
  HandleInvestmentList,
  HandleInvestmentsByCountry,
  HandleInvestmentsBySector,
  HandleListOfCountries,
  HandleRoot,
  HandleSectorList,
  HandleTopCompaniesByInvestmentCount,
} from "./handlers";
import { DatabaseService } from "./database";

const app = express();
const port = 8080;

app.use(cors());

// Start the database connection
DatabaseService.getDbConnection();

app.get("/", HandleRoot);
app.get("/investments/", HandleInvestmentList);
app.get("/investments/by_country", HandleInvestmentsByCountry);
app.get("/investments/by_sector", HandleInvestmentsBySector);

app.get("/companies/top_investments", HandleTopCompaniesByInvestmentCount);
app.get("/countries", HandleListOfCountries);
app.get("/sectors", HandleSectorList);
app.get("/flexible_projects", HandleFlexibleProjects);
app.get("/company/details", HandleCompanyDetails);

app.listen(port, () => {
  console.log("Server running ⚡️");
});
