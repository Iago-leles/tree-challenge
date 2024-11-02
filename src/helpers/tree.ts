import { AssetTreeNode, IAsset, ILocation, LocationTreeNode } from "@/types";

type BuildTreeProps = {
  assets: IAsset[];
  locations: ILocation[];
};

export function handleBuildTree({
  assets,
  locations,
}: BuildTreeProps): LocationTreeNode[] {
  const locationMap: { [key: string]: LocationTreeNode } = {};
  const assetMap: { [key: string]: AssetTreeNode } = {};

  locations.forEach((loc) => {
    locationMap[loc.id] = {
      id: loc.id,
      name: loc.name,
      children: [],
    };
  });

  locations.forEach((loc) => {
    if (loc.parentId) {
      locationMap[loc.parentId]?.children.push(locationMap[loc.id]);
    }
  });

  assets.forEach((asset) => {
    assetMap[asset.id] = {
      id: asset.id,
      name: asset.name,
      status: asset.status,
      sensorType: asset.sensorType,
      children: [],
    };

    if (asset.parentId) {
      assetMap[asset.parentId]?.children.push(assetMap[asset.id]);
    } else if (asset.locationId) {
      locationMap[asset.locationId]?.children.push(assetMap[asset.id]);
    }
  });

  return Object.values(locationMap).filter(
    (loc) => !locations.find((l) => l.id === loc.id)?.parentId
  );
}
