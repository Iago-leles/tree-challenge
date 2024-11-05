import { IconLoader } from "@tabler/icons-react";
import { useState } from "react";

import useBuildTree from "@/hooks/useBuildTree";

import { IAsset, ILocation, LocationTreeNode } from "@/types";

import TreeNode from "./TreeNode";
import './treeView.css'

export default function TreeView({
  assets,
  locations,
}: {
  assets?: IAsset[];
  locations?: ILocation[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: treeView,
    isLoading
  } = useBuildTree({ assets, locations }) as { data: LocationTreeNode[], isLoading: boolean };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filterTree = (node: LocationTreeNode): LocationTreeNode | null => {
    const isMatch = node.name.toLowerCase().includes(searchTerm);
    const filteredChildren = node.children
      .map(filterTree)
      .filter(Boolean) as LocationTreeNode[];

    if (isMatch || filteredChildren.length) {
      return { ...node, children: filteredChildren };
    }
    return null;
  };

  const filteredTree = searchTerm
    ? treeView.map(filterTree).filter(Boolean) as LocationTreeNode[]
    : treeView;

  const handleTreeViewContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center w-[100%] justify-center h-[60%]">
          <IconLoader className="slow-spin" color="blue" />
        </div>
      );
    }

    return (
      <div className="mt-2 max-h-[90%] overflow-y-auto scrollbar">
        {filteredTree.map((node) => (<TreeNode key={node.id} node={node} />))}
      </div>
    );
  };

  return (
    <div className="border-[#D8DFE6] w-[40%] h-[82vh] border rounded-sm">
      <input
        type="text"
        placeholder="Buscar Ativo ou Local"
        className="border-b border-[#D8DFE6] focus:outline-none w-full p-3 text-gray-800 placeholder-[#C1C9D2]"
        value={searchTerm}
        onChange={handleSearch}
      />

      {handleTreeViewContent()}
    </div>
  );
}
