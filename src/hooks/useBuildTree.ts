import { useState, useEffect } from "react";

import { IAsset, ILocation } from "@/types";

type UseBuildTreeProps = {
  assets?: IAsset[];
  locations?: ILocation[];
};

export default function useBuildTree({
  assets = [],
  locations = [],
}: UseBuildTreeProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<IAsset[]>([]);

  useEffect(() => {
    setIsLoading(true);

    if (!locations.length && !assets.length) {
      setData([]);
      setIsLoading(false);
      return;
    }

    const mappedHash: Record<string, IAsset> = {};

    for (const location of locations) {
      mappedHash[location.id] = {
        ...location,
        children: [],
        type: "location",
      };
    }

    for (const asset of assets) {
      mappedHash[asset.id] = {
        ...asset,
        children: [],
        type: asset?.sensorType ? "component" : "asset",
      };
    }

    for (const unitId in mappedHash) {
      const currentUnit = mappedHash[unitId];
      const parentId = currentUnit?.parentId || currentUnit?.locationId || "";

      if (parentId) {
        const currentParent = mappedHash[parentId];
        if (currentParent) {
          currentParent.children.push(currentUnit);
        }
      }
    }

    setData(
      Object.values(mappedHash).filter(
        (node) => !node.parentId && !node.locationId
      )
    );
    setIsLoading(false);
  }, [assets, locations]);

  return { data, isLoading };
}
