import Image from "next/image"
import { useSearchParams } from "next/navigation"

import thunderboltIcon from "@/public/icons/thunderbolt.svg"
import exclamationIcon from "@/public/icons/exclamationCircle.svg"

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
        <button className="flex items-center gap-2 border border-[#D8DFE6] rounded-sm py-1 px-2 text-[#77818C] font-semibold">
          <Image src={thunderboltIcon} alt="energy" className="w-4 h-4" />

          Sensor de energia
        </button>

        <button className="flex items-center gap-2 border border-[#D8DFE6] py-1 px-2 text-[#77818C] font-semibold">
          <Image src={exclamationIcon} alt="critical" className="w-4 h-4" />

          Crítico
        </button>
      </div>
    </div>
  )
}