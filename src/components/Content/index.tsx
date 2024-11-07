import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

import { getAssets } from "@/libs/assets"
import { getLocations } from "@/libs/locations"

import { useSelectedComponent } from "@/contexts/SelectedComponentContext"

import CompanyHeader from "./CompanyHeader"
import TreeView from "./TreeView"
import ComponentDetails from "./ComponentDetails"

export default function Content() {
  const searchParams = useSearchParams()
  const companyId = searchParams.get('companyId')
  const { setSelectedComponent } = useSelectedComponent()

  const { data: assets, isFetching: isFetchingAssets } = useQuery({
    queryFn: () => getAssets(String(companyId)),
    queryKey: ['company-assets', companyId],
    staleTime: 1000 * 60 * 5,
    enabled: !!companyId,
  })

  const { data: locations, isFetching: isFetchingLocations } = useQuery({
    queryFn: () => getLocations(String(companyId)),
    queryKey: ['company-locations', companyId],
    staleTime: 1000 * 60 * 5,
    enabled: !!companyId,
  })

  useEffect(() => {
    setSelectedComponent(null)
  }, [companyId])

  return (
    <div className="m-2 bg-white overflow-y-auto border-[#D8DFE6] border rounded-sm p-4">
      <CompanyHeader />

      <div className="flex w-full gap-2">
        <TreeView
          assets={assets}
          locations={locations}
          isFetching={isFetchingAssets || isFetchingLocations}
        />

        <div className="flex-1 border-[#D8DFE6] border rounded-sm">
          <ComponentDetails />
        </div>
      </div>
    </div>
  )
}