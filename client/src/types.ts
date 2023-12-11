export interface Project {
  Company_id: number;
  Country: string;
  year: number;
  Purpose: string;
  Investor: string;
  Project_id: number;
  Geolocation: string;
  Sector: string;
  Region: string;
  Greenfield: string;
}

export interface Investment_Company {
  Company_id: number;
  Investor: string;
  SOE: number;
}

export interface ProjectProps {
  projects: Project[];
}

export interface CompanyData {
  Company: Investment_Company;
  Projects: Project[];
}
