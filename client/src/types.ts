export interface Project {
  Month: string;
  Year: number;
  Sector: string;
  Country: string;
  Region: string;
  Greenfield: string;
  Source: string;
  Project_id: string;

  Investor?: string;
  Amount?: number;
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

export interface ProjectProps {
  projects: Project[];
}
