import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

import { handleBuildTree } from "@/helpers/tree"

import { getAssets } from "@/libs/assets"
import { getLocations } from "@/libs/locations"

import { LocationTreeNode } from "@/types"

import CompanyHeader from "./CompanyHeader"
import TreeView from "./TreeView"

export default function Content() {
  const [treeView, setTreeView] = useState<LocationTreeNode[]>([])
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

  useEffect(() => {
    if (assets && locations) {
      const treeViewBuilded = handleBuildTree({
        assets,
        locations
      })

      setTreeView(treeViewBuilded)
    }
  }, [assets, locations])

  return (
    <div className="m-2 bg-white overflow-y-auto border-[#D8DFE6] border rounded-sm p-4">
      <CompanyHeader />

      <div className="flex w-full">
        <TreeView treeView={treeView} />

        <div className="flex-1">

        </div>
      </div>
    </div>
  )
}