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
  parentId?: string | null;
  sensorId?: string | null;
  sensorType?: string | null;
  status?: string | null;
  gatewayId?: string | null;
  locationId?: string | null;
  type: string;
  children: Array<ILocation | IAsset>;
}

export interface TreeNode {
  id: string;
  name: string;
  children: TreeNode[];
  type: string;
  sensorType?: string | null;
  status?: string | null;
}

export type AssetTreeNode = TreeNode & {
  status: string | null;
  sensorType: string | null;
};

export type LocationTreeNode = TreeNode;
