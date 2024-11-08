import { IconLoader, IconSearch } from "@tabler/icons-react";
import { useState } from "react";

import useBuildTree from "@/hooks/useBuildTree";

import { IAsset, ILocation, LocationTreeNode } from "@/types";

import TreeNode from "./TreeNode";
import './treeView.css'
import useFilterTree from "@/hooks/useFilterTree";

export default function TreeView({
  assets,
  locations,
  isFetching
}: {
  assets?: IAsset[];
  locations?: ILocation[];
  isFetching?: boolean;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: treeView,
    isLoading
  } = useBuildTree({ assets, locations }) as { data: LocationTreeNode[], isLoading: boolean };

  const {
    data: filteredTree,
    isLoadingFilteredTree,
    hasFilters,
    handleSearch: handleFilterSearch
  } = useFilterTree({ search: searchTerm, tree: treeView })

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleTreeViewContent = () => {
    if (isLoading || isFetching || isLoadingFilteredTree) {
      return (
        <div className="flex items-center w-[100%] justify-center h-[60%]">
          <IconLoader className="slow-spin" color="blue" />
        </div>
      );
    }

    if (treeView.length && filteredTree.length === 0) {
      return (
        <div className="flex items-center w-[100%] justify-center h-[20%]">
          <p className="text-gray-800">
            Nenhum resultado encontrado
          </p>
        </div>
      );
    }

    return (
      <div className="mt-2 overflow-y-auto scrollbar scrollable-container">
        {filteredTree.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            expanded={hasFilters}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="border-[#D8DFE6] xl:w-[40%] w-[100%] max-w-[400px] xl:max-w-[40%] h-full border rounded-sm">
      <div className="border-b border-[#D8DFE6] w-full p-3 flex items-center">
        <input
          type="text"
          placeholder="Buscar Ativo ou Local"
          className="focus:outline-none w-full  text-gray-800 placeholder-[#C1C9D2]"
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={(e) => e.key === 'Enter' && handleFilterSearch()}
        />

        <IconSearch
          color="#363C44"
          size={16}
          cursor='pointer'
          onClick={() => handleFilterSearch()}
        />
      </div>

      {handleTreeViewContent()}
    </div>
  );
}
