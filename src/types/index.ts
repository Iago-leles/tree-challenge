export interface ICompany {
  id: string;
  name: string;
}

export interface ILocation {
  id: string;
  name: string;
  parentId: string | null;
}

export interface IAsset {
  id: string;
  name: string;
  gatewayId: string;
  locationId: string | null;
  parentId: string | null;
  sensorId: string | null;
  sensorType: string | null;
  status: string | null;
}

interface TreeNode {
  id: string;
  name: string;
  children: TreeNode[];
}

export type AssetTreeNode = TreeNode & {
  status: string | null;
  sensorType: string | null;
};

export type LocationTreeNode = TreeNode;
