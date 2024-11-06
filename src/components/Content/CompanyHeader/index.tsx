import { useSearchParams } from "next/navigation"

import ThunderboltIcon from "@/components/Icons/ThunderboltIcon"
import ExclamationCircleIcon from "@/components/Icons/ExclamationCircleIcon"

import { SensorStatus, SensorTypes } from "@/enums"

import FilterButton from "./FilterButton"

export default function CompanyHeader() {
  const searchParams = useSearchParams()
  const companyName = searchParams.get('companyName')

  return (
    <div className="flex justify-between w-[100%] mb-2">
      <div>
        <h1 className="text-xl text-[#24292F] font-semibold">
          Ativos

          <span className="text-sm text-[#77818C] font-normal ml-1">
            / {companyName}
          </span>
        </h1>
      </div>

      <div className="flex gap-2">
        <FilterButton
          icon={ThunderboltIcon}
          label="Sensor de Energia"
          type={SensorTypes.ENERGY}
        />

        <FilterButton
          icon={ExclamationCircleIcon}
          label="Crítico"
          type={SensorStatus.ALERT}
        />
      </div>
    </div>
  )
}
