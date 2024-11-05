import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

import { getAssets } from "@/libs/assets"
import { getLocations } from "@/libs/locations"

import CompanyHeader from "./CompanyHeader"
import TreeView from "./TreeView"

export default function Content() {
  const searchParams = useSearchParams()
  const companyId = searchParams.get('companyId')

  const { data: assets } = useQuery({
    queryFn: () => getAssets(String(companyId)),
    queryKey: ['company-assets', companyId],
    staleTime: 1000 * 60 * 5,
    enabled: !!companyId,
  })

  const { data: locations } = useQuery({
    queryFn: () => getLocations(String(companyId)),
    queryKey: ['company-locations', companyId],
    staleTime: 1000 * 60 * 5,
    enabled: !!companyId,
  })

  return (
    <div className="m-2 bg-white overflow-y-auto border-[#D8DFE6] border rounded-sm p-4">
      <CompanyHeader />

      <div className="flex w-full">
        <TreeView assets={assets} locations={locations} />

        <div className="flex-1">

        </div>
      </div>
    </div>
  )
}