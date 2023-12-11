import {
  Project,
  Investment_Company,
  DatabaseService,
  CompanyData,
} from "./database";

export async function fetchListOfProjects(): Promise<Project[]> {
  const db = DatabaseService.getDbConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  const sql = "SELECT * FROM Project";
  const rows = await new Promise<Project[]>((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows as Project[]);
    });
  });
  return rows;
}

export async function fetchSOEs(): Promise<Investment_Company[]> {
  const db = DatabaseService.getDbConnection();
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
  const db = DatabaseService.getDbConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  const sql = "SELECT * FROM Project WHERE Region = ?";
  const rows = await new Promise<Project[]>((resolve, reject) => {
    db.all(sql, [region], (err, rows) => {
      if (err) reject(err);
      else resolve(rows as Project[]);
    });
  });
  return rows;
}

export async function fetchProjectFromCountry(
  country: string,
): Promise<Project[]> {
  const db = DatabaseService.getDbConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  const sql = "SELECT * FROM Project WHERE Country = ?";
  const rows = await new Promise<Project[]>((resolve, reject) => {
    db.all(sql, [country], (err, rows) => {
      if (err) reject(err);
      else resolve(rows as Project[]);
    });
  });
  return rows;
}

export async function fetchProjectByCompanyByRegion(
  companyName: string,
  region: string,
): Promise<Project[]> {
  const db = DatabaseService.getDbConnection();
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
  const db = DatabaseService.getDbConnection();
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
  const db = DatabaseService.getDbConnection();
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
  const db = DatabaseService.getDbConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  let sql = "SELECT * FROM Project";
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
  const db = DatabaseService.getDbConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  const sql = "SELECT DISTINCT Country FROM Project";
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
  const db = DatabaseService.getDbConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  const sql = "SELECT DISTINCT Sector FROM Project";
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

// export async function fetchCompanyDetails(
//   companyName: string,
// ): Promise<Investment_Company | null> {
//   const db = DatabaseService.getDbConnection();
//   if (!db) {
//     throw new Error("Database connection not established");
//   }
//
//   const sql = "SELECT * FROM Investment_Company WHERE Investor = ?";
//   const company = await new Promise<Investment_Company | null>(
//     (resolve, reject) => {
//       db.get(sql, [companyName], (err, row) => {
//         if (err) reject(err);
//         else resolve(row as Investment_Company | null);
//       });
//     },
//   );
//   return company;
// }

export async function fetchCompanyDetails(
  companyName: string,
): Promise<CompanyData> {
  const db = DatabaseService.getDbConnection();
  if (!db) {
    throw new Error("Database connection not established");
  }

  const companySql = "SELECT * FROM Investment_Company WHERE Investor = ?";
  const projectsSql = `
    SELECT Project.*
    FROM Project
    JOIN Investment_Company ON Project.Company_id = Investment_Company.Company_id
    WHERE Investment_Company.Investor = ?
  `;

  const companyPromise = new Promise<Investment_Company | null>(
    (resolve, reject) => {
      db.get(companySql, [companyName], (err, row) => {
        if (err) reject(err);
        else resolve(row as Investment_Company | null);
      });
    },
  );

  const projectsPromise = new Promise<Project[]>((resolve, reject) => {
    db.all(projectsSql, [companyName], (err, rows) => {
      if (err) reject(err);
      else resolve(rows as Project[]);
    });
  });

  try {
    const company = await companyPromise;
    const projects = await projectsPromise;
    return {
      Company: company!,
      Projects: projects,
    };
  } catch (error) {
    throw error;
  }
}
