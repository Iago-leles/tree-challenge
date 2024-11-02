import axios from "axios";

import { ICompany } from "@/types/index";

export async function getCompanies(): Promise<ICompany[]> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/companies`;
  const { data } = await axios.get(url);

  return data;
}
