import { useState } from "react";

import { LocationTreeNode } from "@/types"

type TreeNodeProps = {
  node: LocationTreeNode
}

export default function TreeNode({ node }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="ml-4">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {hasChildren && (
          <span className="mr-2">
            {isExpanded ? "▼" : "▶"}
          </span>
        )}
        <div className="w-4 h-4 bg-[#F0F1F3] rounded-full mr-2"></div>
        <p className="text-sm text-gray-800">{node.name}</p>
      </div>

      {isExpanded && hasChildren && (
        <div className="ml-4">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}