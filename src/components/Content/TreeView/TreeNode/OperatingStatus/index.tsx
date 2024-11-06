import Image from "next/image";

import { SensorStatus, SensorTypes } from "@/enums";

import { TreeNode } from "@/types";

import boltIcon from "@/public/icons/bolt.svg";

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

    if (node?.sensorType === ENERGY && node.status === OPERATING) {
      return <Image src={boltIcon} alt="icon" className="w-4 h-4 ml-2" />;
    }

    return icons[node?.status as keyof typeof icons];
  }

  return getComponentIcon()
}