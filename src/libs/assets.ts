import axios from "axios";

import { IAsset } from "@/types/index";

export async function getAssets(companyId: string): Promise<IAsset[]> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/companies/${companyId}/assets`;
  const { data } = await axios.get(url);

  return data;
}
