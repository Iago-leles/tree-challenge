import { useState } from "react";

import { LocationTreeNode } from "@/types";

import TreeNode from "./TreeNode";

export default function TreeView({ treeView }: { treeView: LocationTreeNode[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filterTree = (node: LocationTreeNode): boolean => {
    if (node.name.toLowerCase().includes(searchTerm)) return true;
    return node.children.some(filterTree);
  };

  const filteredTree = searchTerm
    ? treeView.filter(filterTree)
    : treeView;

  return (
    <div className="border-[#D8DFE6] w-[40%] h-[82vh] border rounded-sm">
      <input
        type="text"
        placeholder="Buscar Ativo ou Local"
        className="border-b border-[#D8DFE6] focus:outline-none w-full p-3 text-gray-800 placeholder-[#C1C9D2]"
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="mt-2">
        {filteredTree.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}