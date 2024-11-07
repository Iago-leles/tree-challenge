import { IconBoltFilled } from "@tabler/icons-react";

import { SensorStatus, SensorTypes } from "@/enums";

import { TreeNode } from "@/types";


export default function OperatingStatus({ node }: { node?: TreeNode }) {
  const { ENERGY } = SensorTypes
  const { OPERATING } = SensorStatus

  const operatingIcon = <div className="h-3 w-3 ml-2 rounded-full bg-[#52C41A]" />
  const alertIcon = <div className="h-3 w-3 ml-2 rounded-full bg-[#ED3833]" />

  const getComponentIcon = () => {
    const icons = {
      operating: operatingIcon,
      alert: alertIcon,
    }

    if (node?.sensorType === ENERGY) {
      return (
        <IconBoltFilled
          size={16}
          color={node.status === OPERATING ? '#52C41A' : '#ED3833'}
          className="ml-1"
        />
      )
    }

    return icons[node?.status as keyof typeof icons];
  }

  return getComponentIcon()
}