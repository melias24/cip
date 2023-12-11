import axios, { AxiosResponse } from "axios";
import { CompanyData, Investment_Company, Project } from "../types";

export const API_PREFIX = "http://localhost:8080";

export async function FetchInvestmentList(first?: number) {
  let firstStr = "";
  if (first) {
    firstStr = "?first=" + first;
  }
  let response = await axios.get(API_PREFIX + "/investments" + firstStr);
  const data = response.data as Project[];
  return data;
}

export async function FetchInvestmentListByCountry(country: string) {
  let response = await axios.get(
    API_PREFIX + "/investments/by_country" + "?country=" + country,
  );
  const data = response.data as Project[];
  return data;
}

export async function FetchTopInvestmentCompanies() {
  let response = await axios.get(API_PREFIX + "/companies/top_investments");
  const data = response.data as Investment_Company[];
  return data;
}

export interface FlexibleProjectOptions {
  filterBy?: { [key: string]: any };
  sortBy?: { column: string; order: "ASC" | "DESC" };
  limit?: number;
}

export async function FetchFlexibleProjects(
  options: FlexibleProjectOptions,
): Promise<AxiosResponse<Project[]>> {
  try {
    const response = await axios.get<Project[]>(
      API_PREFIX + "/flexible_projects",
      {
        params: {
          filterBy: options.filterBy
            ? JSON.stringify(options.filterBy)
            : undefined,
          sortBy: options.sortBy ? JSON.stringify(options.sortBy) : undefined,
          limit: options.limit,
        },
      },
    );
    return response;
  } catch (error) {
    // Handle the error appropriately
    console.error("Error fetching flexible projects:", error);
    throw error;
  }
}

export async function FetchListOfCountries() {
  let response = await axios.get(API_PREFIX + "/countries");
  const data = response.data;
  return data;
}

export async function FetchListOfSectors() {
  try {
    let response = await axios.get(API_PREFIX + "/sectors");
    const data = response.data;
    return data as string[];
  } catch (error) {
    throw error;
  }
}

export async function FetchCompanyInfo(companyName: string) {
  try {
    const response = await axios.get("http://localhost:8080/company/details", {
      params: {
        name: companyName,
      },
    });
    return response.data as CompanyData;
  } catch (error) {
    console.error("Error fetching company details:", error);
    throw error;
  }
}
