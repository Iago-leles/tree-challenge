import { LocationTreeNode } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function useFilterTree({
  search,
  tree,
}: {
  search: string;
  tree: LocationTreeNode[];
}) {
  const [urlFilters, setUrlFilters] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  useEffect(() => {
    const energy = searchParams.get("energy");
    const alert = searchParams.get("alert");

    const filters = [];
    if (energy) filters.push("energy");
    if (alert) filters.push("alert");

    setUrlFilters(filters);
  }, [query]);

  const filterTree = (node: LocationTreeNode): LocationTreeNode | null => {
    const isMatch = node.name.toLowerCase().includes(search);
    const matchesAlertFilter = urlFilters.includes("alert")
      ? node.status === "alert"
      : true;
    const matchesEnergyFilter = urlFilters.includes("energy")
      ? node.sensorType === "energy"
      : true;

    const filteredChildren = node.children
      .map(filterTree)
      .filter(Boolean) as LocationTreeNode[];

    if (
      (isMatch && matchesAlertFilter && matchesEnergyFilter) ||
      filteredChildren.length
    ) {
      return { ...node, children: filteredChildren };
    }
    return null;
  };

  const { isLoadingFilteredTree, data, hasFilters } = useMemo(() => {
    const result =
      search || urlFilters.length
        ? (tree.map(filterTree).filter(Boolean) as LocationTreeNode[])
        : tree;

    return {
      isLoadingFilteredTree: false,
      data: result,
      hasFilters: !!urlFilters.length || !!search,
    };
  }, [search, urlFilters, tree]);

  return { data, isLoadingFilteredTree, hasFilters };
}
