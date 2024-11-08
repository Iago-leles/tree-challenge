import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { IconBrandCodepen, IconChevronRight } from "@tabler/icons-react";

import AssetIcon from "@/components/Icons/AssetIcon";
import LocationIcon from "@/components/Icons/LocationIcon";

import { useSelectedComponent } from "@/contexts/SelectedComponentContext";
import { Types } from "@/enums";
import { LocationTreeNode } from "@/types";

import OperatingStatus from "./OperatingStatus";

type TreeNodeProps = {
  node: LocationTreeNode;
  expanded?: boolean;
};

export default function TreeNode({ node, expanded = false }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const { setSelectedComponent, selectedComponent } = useSelectedComponent();

  const { LOCATION, ASSET, COMPONENT } = Types;

  const hasChildren = node.children && node.children.length > 0;
  const isClicable = node.children.length > 0 || node.type !== LOCATION;
  const isSelectedComponent = selectedComponent?.id === node.id;
  const iconColor = isSelectedComponent ? "white" : "#2188FF";

  useEffect(() => {
    setIsExpanded(expanded);
  }, [expanded]);

  const getIcon = () => {
    const icons = {
      [ASSET]: <AssetIcon color={iconColor} />,
      [COMPONENT]: <IconBrandCodepen color={iconColor} size={20} />,
      [LOCATION]: <LocationIcon color={iconColor} />,
    };

    return icons[node.type as keyof typeof icons];
  };

  const handleSelectComponent = () => {
    if (node.children.length === 0 && node.type !== LOCATION) {
      setSelectedComponent(node);
    }
  };

  return (
    <div className="ml-4 my-1">
      <div
        className={clsx("flex items-center text-gray-800", {
          "text-white bg-[#2188FF] hover:bg-[#2188FF] ": isSelectedComponent,
          "cursor-pointer": isClicable,
          "cursor-default": !isClicable,
        })}
        onClick={() => {
          setIsExpanded(!isExpanded);
          handleSelectComponent();
        }}
      >
        {hasChildren && (
          <span>
            <div
              className={clsx("transition-transform duration-200", {
                "rotate-90": isExpanded,
              })}
            >
              <IconChevronRight color="gray" size={16} />
            </div>
          </span>
        )}

        {getIcon()}

        <p className="text-md ml-1">{node.name}</p>

        <OperatingStatus node={node} />
      </div>

      {hasChildren && (
        <div
          className={clsx("ml-6 overflow-hidden transition-all duration-300", {
            "max-h-0 opacity-0": !isExpanded,
          })}
        >
          <div className="border-l-2 border-gray-300 pl-2">
            {isExpanded &&
              node.children.map((child) => (
                <TreeNode key={child.id} node={child} expanded={expanded} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
