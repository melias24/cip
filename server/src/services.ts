import { isDataView } from "util/types";
import {
  Project,
  Investment_Company,
  DatabaseService,
  CompanyData,
  Invests_In,
} from "./database";

export async function fetchListOfProjects(): Promise<Project[]> {
  const db = DatabaseService.getProjectConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  const sql = "SELECT * FROM Project_Table";
  const rows = await new Promise<Project[]>((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows as Project[]);
      }
    });
  });
  return rows;
}

export async function fetchSOEs(): Promise<Investment_Company[]> {
  const db = DatabaseService.getProjectConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  const sql = "SELECT * FROM Investment_Company WHERE SOE = TRUE";
  const rows = await new Promise<Investment_Company[]>((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows as Investment_Company[]);
    });
  });
  return rows;
}

export async function doThing() {
  return 1;
}

export async function fetchProjectFromRegion(
  region: string,
): Promise<Project[]> {
  const db = DatabaseService.getProjectConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  const sql = "SELECT * FROM Project_Table WHERE Region = ?";
  const rows = await new Promise<Project[]>((resolve, reject) => {
    db.all(sql, [region], (err, rows) => {
      if (err) reject(err);
      else resolve(rows as Project[]);
    });
  });
  return rows;
}

export async function fetchProjectFromCountry(country: string): Promise<any[]> {
  // Changed return type to any[] to include investment data
  const db = DatabaseService.getProjectConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  const sql = "SELECT * FROM Project_Table WHERE Country = ?";
  const projects = await new Promise<Project[]>((resolve, reject) => {
    db.all(sql, [country], (err, rows) => {
      if (err) reject(err);
      else resolve(rows as Project[]);
    });
  });

  let results = [];
  for (let i = 0; i < projects.length; i++) {
    let invests = await fetchInvestsInByProjectId(projects[i].Project_id);
    if (invests.length > 0) {
      let project = projects[i] as any; // Cast to any to allow adding new properties
      project.Amount = invests[0].Amount; // Add the investment data to the project object
      project.Investor = invests[0].Investor; // Add the investment data to the project object
      results.push(project);
    }
  }
  return results;
}

export async function fetchProjectByCompanyByRegion(
  companyName: string,
  region: string,
): Promise<Project[]> {
  const db = DatabaseService.getProjectConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  const sql = `
      SELECT Project.* 
      FROM Project 
      JOIN Investment_Company ON Project.Company_id = Investment_Company.Company_id
      WHERE Investment_Company.Investor = ? AND Project.Region = ?
  `;

  return new Promise((resolve, reject) => {
    db.all(sql, [companyName, region], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows as Project[]);
      }
    });
  });
}

export async function fetchProjectsBySector(
  sector: string,
): Promise<Project[]> {
  const db = DatabaseService.getProjectConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  const sql = "SELECT * FROM Project WHERE Sector = ?";
  const rows = await new Promise<Project[]>((resolve, reject) => {
    db.all(sql, [sector], (err, rows) => {
      if (err) reject(err);
      else resolve(rows as Project[]);
    });
  });
  return rows;
}

export async function fetchTopCompaniesByInvestmentCount(): Promise<
  Investment_Company[]
> {
  const db = DatabaseService.getProjectConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  const sql = `
    SELECT Investment_Company.*, COUNT(Invest_In.Company_id) as InvestmentCount
    FROM Investment_Company
    JOIN Invest_In ON Investment_Company.Company_id = Invest_In.Company_id
    GROUP BY Investment_Company.Company_id
    ORDER BY InvestmentCount DESC
    LIMIT 10
  `;
  const rows = await new Promise<Investment_Company[]>((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows as Investment_Company[]);
    });
  });
  return rows;
}

export async function fetchFlexibleProjects(options?: {
  filterBy?: { [key: string]: any };
  sortBy?: { column: string; order: "ASC" | "DESC" };
  limit?: number;
}): Promise<Project[]> {
  const db = DatabaseService.getProjectConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  let sql = "SELECT * FROM Project_Table";
  const params: any[] = [];

  // Apply filters if any
  if (options?.filterBy) {
    const filterKeys = Object.keys(options.filterBy);
    if (filterKeys.length > 0) {
      const filterClauses = filterKeys.map((key) => {
        params.push(options.filterBy![key]);
        return `${key} = ?`;
      });
      sql += " WHERE " + filterClauses.join(" AND ");
    }
  }

  // Apply sorting if provided
  if (options?.sortBy) {
    sql += ` ORDER BY ${options.sortBy.column} ${options.sortBy.order}`;
  }

  // Apply limit if provided
  if (options?.limit) {
    sql += " LIMIT ?";
    params.push(options.limit);
  }

  const rows = await new Promise<Project[]>((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows as Project[]);
    });
  });

  return rows;
}

export async function fetchListOfCountries(): Promise<string[]> {
  const db = DatabaseService.getProjectConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  const sql = "SELECT DISTINCT Country FROM Project_Table";
  const countries = await new Promise<string[]>((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else {
        const countryList = rows.map((row: any) => row.Country);
        resolve(countryList);
      }
    });
  });
  return countries;
}

export async function fetchListOfSectors(): Promise<string[]> {
  const db = DatabaseService.getProjectConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  const sql = "SELECT DISTINCT Sector FROM Project_Table";
  const sectors = await new Promise<string[]>((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else {
        const sectorList = rows.map((row: any) => row.Sector);
        resolve(sectorList);
      }
    });
  });
  return sectors;
}

export async function fetchInvestsInByProjectId(
  projectId: string,
): Promise<Invests_In[]> {
  const db = DatabaseService.getInvestsInConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  const sql = "SELECT * FROM Invests_in WHERE Project_id = ?";
  const investsInData = await new Promise<Invests_In[]>((resolve, reject) => {
    db.all(sql, [projectId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows as Invests_In[]);
      }
    });
  });
  return investsInData;
}

export async function fetchCompanyData(
  investorName: string,
): Promise<CompanyData | null> {
  const db = DatabaseService.getCompanyConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  const sqlCompany = "SELECT * FROM Investment_Company WHERE Investor = ?";
  const company = await new Promise<Investment_Company | null>(
    (resolve, reject) => {
      db.get(sqlCompany, [investorName], (err, row) => {
        if (err) reject(err);
        else resolve(row as Investment_Company | null);
      });
    },
  );

  if (!company) {
    return null;
  }

  const sqlProjects = `
  SELECT Project.*
  FROM ProjectDB.Project_Table AS Project
  JOIN InvestsDB.Invests_In ON Project.Project_id = InvestsDB.Invests_In.Project_id
  WHERE InvestsDB.Invests_In.Investor = ?
`;
  const projects = await new Promise<Project[]>((resolve, reject) => {
    db.all(sqlProjects, [investorName], (err, rows) => {
      if (err) reject(err);
      else resolve(rows as Project[]);
    });
  });

  const sqlInvestsIn = "SELECT * FROM Invests_In WHERE Investor = ?";
  const investsInData = await new Promise<Invests_In[]>((resolve, reject) => {
    db.all(sqlInvestsIn, [investorName], (err, rows) => {
      if (err) reject(err);
      else resolve(rows as Invests_In[]);
    });
  });

  return {
    Company: company,
    Projects: projects,
    Invests_In: investsInData[0], // Assuming we want the first investment data
  };
}
