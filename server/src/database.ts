import sqlite3, { Database } from "sqlite3";

export class DatabaseService {
  private static instance: Database | null = null;

  public static getDbConnection(): Database | null {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new sqlite3.Database(
        "ChineseInvestment.db",
        (err) => {
          if (err) {
            console.error("Error opening database", err);
          } else {
            console.log("Database connection established");
          }
        },
      );
    }
    return DatabaseService.instance;
  }

  public static closeDbConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (DatabaseService.instance) {
        DatabaseService.instance.close((err) => {
          if (err) {
            reject(err);
          } else {
            DatabaseService.instance = null;
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }
}

export interface Project {
  Month: string;
  Year: Date;
  Sector: string;
  Country: string;
  Region: string;
  Greenfield: string;
  Source: string;
  Project_id: string;
}

export interface Investment_Company {
  Investor: string;
  SOE: string;
}

export interface CompanyData {
  Company: Investment_Company;
  Projects: Project[];
}

export interface Invests_In {
  Project_id: string;
  Investor: string;
  Amount: string;
}

export interface Survey {
  Survey_id: string;
  List_of_Answers: string[];
  List_of_Questions: string[];
  Answer_Date: Date;
}

export interface Is_About {
  Project_id: string;
  Survey_id: string;
  Proximity: number;
}

export function fetchListOfProjects(): Promise<Project[]> {
  return new Promise((resolve, reject) => {
    const db = DatabaseService.getDbConnection();
    //const db = new sqlite3.Database('new_blog.db');
    if (!db) {
      reject(new Error("Database connection not established"));
      return;
    }

    const sql = "SELECT * FROM Project";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows as Project[]);
      }
    });
  });
}

export function fetchProjectsByCompany(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const db = DatabaseService.getDbConnection();
    //const db = new sqlite3.Database('new_blog.db');
    if (!db) {
      reject(new Error("Database connection not established"));
      return;
    }

    const sql = `
        SELECT Investment_Company.Name, Project.* 
        FROM Investment_Company 
        JOIN Invest_In ON Investment_Company.Company_id = Invest_In.Company_id 
        JOIN Project ON Invest_In.Project_id = Project.Project_id
      `;
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function fetchSOEs(): Promise<Investment_Company[]> {
  return new Promise((resolve, reject) => {
    const db = DatabaseService.getDbConnection();
    //const db = new sqlite3.Database('new_blog.db');
    if (!db) {
      reject(new Error("Database connection not established"));
      return;
    }

    const sql = "SELECT * FROM Investment_Company WHERE SOE = 'Yes'";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows as Investment_Company[]);
      }
    });
  });
}

export function fetchProjectFromRegion(region: string): Promise<Project[]> {
  return new Promise((resolve, reject) => {
    //const db = new sqlite3.Database('new_blog.db');
    const db = DatabaseService.getDbConnection();
    if (!db) {
      reject(new Error("Database connection not established"));
      return;
    }

    const sql = `
        SELECT * FROM Project 
        WHERE Region = ?
      `;
    db.all(sql, [region], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows as Project[]);
      }
    });
  });
}

export function fetchProjectByCompanyByRegion(
  companyName: string,
  region: string,
): Promise<Project[]> {
  return new Promise((resolve, reject) => {
    const db = DatabaseService.getDbConnection();
    if (!db) {
      reject(new Error("Database connection not established"));
      return;
    }

    const sql = `
            SELECT Project.* 
            FROM Project 
            JOIN Investment_Company ON Project.Company_id = Investment_Company.Company_id
            WHERE Investment_Company.Name = ? AND Project.Region = ?
        `;
    db.all(sql, [companyName, region], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows as Project[]);
      }
    });
  });
}
