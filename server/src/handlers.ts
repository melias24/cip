import { Request, Response } from "express";
import {
  fetchCompanyDetails,
  fetchFlexibleProjects,
  fetchListOfCountries,
  fetchListOfProjects,
  fetchListOfSectors,
  fetchProjectFromCountry,
  fetchProjectsBySector,
  fetchTopCompaniesByInvestmentCount,
} from "./services";

export function HandleRoot(req: Request, res: Response) {
  res.send({
    status: "Sucess",
  });
}

export async function HandleInvestmentList(req: Request, res: Response) {
  const queryParams = req.query;
  const firstStr = queryParams.first as string | undefined;
  try {
    let projects = await fetchListOfProjects();
    if (firstStr) {
      const n = parseInt(firstStr);
      if (isNaN(n) || n < 1) {
        return res.status(400);
      }
      projects = projects.slice(0, n);
    }
    return res.json(projects);
  } catch (err: any) {
    return res.sendStatus(400);
  }
}

export async function HandleInvestmentsByCountry(req: Request, res: Response) {
  const queryParams = req.query;
  const country = queryParams.country as string;
  try {
    let projects = await fetchProjectFromCountry(country);
    return res.json(projects);
  } catch (err: any) {
    return res.sendStatus(400);
  }
}

export async function HandleInvestmentsBySector(req: Request, res: Response) {
  const queryParams = req.query;
  const sector = queryParams.sector as string;
  if (!sector) {
    return res.status(400).send("Sector parameter is required");
  }
  try {
    const projects = await fetchProjectsBySector(sector);
    return res.json(projects);
  } catch (err: any) {
    return res.sendStatus(500).send(err.message);
  }
}

export async function HandleTopCompaniesByInvestmentCount(
  req: Request,
  res: Response,
) {
  try {
    const topCompanies = await fetchTopCompaniesByInvestmentCount();
    return res.json(topCompanies);
  } catch (err: any) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function HandleFlexibleProjects(req: Request, res: Response) {
  const queryParams = req.query;
  const options: {
    filterBy?: { [key: string]: any };
    sortBy?: { column: string; order: "ASC" | "DESC" };
    limit?: number;
  } = {};

  if (queryParams.filterBy) {
    options.filterBy = JSON.parse(queryParams.filterBy as string);
  }
  if (queryParams.sortBy) {
    options.sortBy = JSON.parse(queryParams.sortBy as string);
  }
  if (queryParams.limit) {
    options.limit = parseInt(queryParams.limit as string);
  }

  try {
    const projects = await fetchFlexibleProjects(options);
    return res.json(projects);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
}

export async function HandleListOfCountries(req: Request, res: Response) {
  try {
    const countries = await fetchListOfCountries();
    return res.json(countries);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
}

export async function HandleSectorList(req: Request, res: Response) {
  try {
    const sectors = await fetchListOfSectors();
    return res.json(sectors);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
}

// export async function HandleCompanyDetails(req: Request, res: Response) {
//   const queryParams = req.query;
//   const companyName = queryParams.name as string;
//   if (!companyName) {
//     return res.status(400).send("Company name parameter is required");
//   }
//   try {
//     const companyDetails = await fetchCompanyDetails(companyName);
//     if (companyDetails) {
//       return res.json(companyDetails);
//     } else {
//       return res.status(404).send("Company not found");
//     }
//   } catch (err: any) {
//     console.log(err);
//     return res.status(500).send(err.message);
//   }
// }

export async function HandleCompanyDetails(req: Request, res: Response) {
  const queryParams = req.query;
  const companyName = queryParams.name as string;
  if (!companyName) {
    return res.status(400).send("Company name parameter is required");
  }
  try {
    const companyDetails = await fetchCompanyDetails(companyName);
    if (companyDetails) {
      return res.json(companyDetails);
    } else {
      return res.status(404).send("Company not found");
    }
  } catch (err: any) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}
