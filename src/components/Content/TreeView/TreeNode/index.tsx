import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconChevronRight } from "@tabler/icons-react";

import { useSelectedComponent } from "@/contexts/SelectedComponentContext";

import { Types } from "@/enums";

import { LocationTreeNode } from "@/types";

import locationIcon from "@/public/icons/location.svg";
import assetIcon from "@/public/icons/asset.svg";
import componentIcon from "@/public/icons/component.svg";

import OperatingStatus from "./OperatingStatus";

type TreeNodeProps = {
  node: LocationTreeNode;
};

export default function TreeNode({ node }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { setSelectedComponent } = useSelectedComponent()

  const { LOCATION, ASSET, COMPONENT } = Types

  const hasChildren = node.children && node.children.length > 0;

  const getIcon = () => {
    const icons = {
      [ASSET]: assetIcon,
      [COMPONENT]: componentIcon,
      [LOCATION]: locationIcon,
    }

    return icons[node.type as keyof typeof icons];
  };

  const handleSelectComponent = () => {
    if (node.children.length === 0 && node.type !== LOCATION) {
      setSelectedComponent(node);
    }
  }

  return (
    <div className="ml-4 my-1">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => {
          setIsExpanded(!isExpanded);
          handleSelectComponent()
        }}
      >
        {hasChildren && (
          <span>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <IconChevronRight color="gray" size={16} />
            </motion.div>
          </span>
        )}

        <Image src={getIcon()} alt="icon" className="w-5 h-5 mr-2" />

        <p className="text-md text-gray-800">{node.name}</p>

        <OperatingStatus node={node} />
      </div>

      {hasChildren && (
        <motion.div
          className="ml-6"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          <div className="border-l-2 border-gray-300 pl-2">
            {isExpanded && node.children.map((child) => (
              <TreeNode key={child.id} node={child} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
