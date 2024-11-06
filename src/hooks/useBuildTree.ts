import { useMemo } from "react";

import { Types } from "@/enums";

import { IAsset, ILocation } from "@/types";

type UseBuildTreeProps = {
  assets?: IAsset[];
  locations?: ILocation[];
};

export default function useBuildTree({
  assets = [],
  locations = [],
}: UseBuildTreeProps) {
  const { ASSET, COMPONENT, LOCATION } = Types;

  const { isLoading = true, data } = useMemo(() => {
    if (!locations.length && !assets.length) {
      return {
        isLoading: false,
        data: [],
      };
    }

    const mappedHash: Record<string, IAsset> = {};

    for (const location of locations) {
      mappedHash[location.id] = {
        ...location,
        children: [],
        type: LOCATION,
      };
    }

    for (const asset of assets) {
      mappedHash[asset.id] = {
        ...asset,
        children: [],
        type: asset?.sensorType ? COMPONENT : ASSET,
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

    return {
      data: Object.values(mappedHash).filter(
        (node) => !node.parentId && !node.locationId
      ),
      isLoading: false,
    };
  }, [assets, locations]);

  return { data, isLoading };
}
