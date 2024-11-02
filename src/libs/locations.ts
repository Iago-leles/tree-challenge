import axios from "axios";

import { ILocation } from "@/types";

export async function getLocations(companyId: string): Promise<ILocation[]> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/companies/${companyId}/locations`;
  const { data } = await axios.get(url);

  return data;
}
