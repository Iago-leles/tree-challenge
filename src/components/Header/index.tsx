import { useQuery } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import Image from "next/image"

import { getCompanies } from "@/libs/companies"

import logoImage from "@/public/logo.png"
import goldIcon from "@/public/icons/gold.svg"

import CompanyButton from "./CompanyButton"

export default function Header() {
  const { push } = useRouter();
  const searchParams = useSearchParams()
  const companyId = searchParams.get('companyId')

  const { data, isFetching } = useQuery({
    queryFn: () => getCompanies(),
    queryKey: ['companies'],
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    if (data && data.length > 0 && !companyId) {
      const company = data[0];

      push(`?companyId=${company.id}&companyName=${company.name}`);
    }
  }, [companyId, data, push])

  const handleCompanies = () => {
    if (isFetching) {
      return Array.from({ length: 3 }).map((_, index) => (
        <button
          key={index}
          className="h-[24px] bg-gray-300 w-[80px] text-transparent flex items-center gap-2 py-1 px-2 rounded-sm text-xs animate-pulse"
        >
          <Image src={goldIcon} alt="gold" className="w-4 h-4" />
        </button>
      ))
    }

    if (!data || data.length === 0) {
      return null
    }

    return data.map((company, index) => (
      <CompanyButton
        key={index}
        company={company}
      />
    ))
  }

  return (
    <div className="w-screen bg-[#17192D] h-[80px] lg:h-[48px] flex items-center px-4 lg:justify-between justify-around flex-col sm:flex-row">
      <Image
        src={logoImage}
        alt="logo"
        width={100}
        height={100}
      />

      <div className="flex row gap-2">
        {handleCompanies()}
      </div>
    </div>

  )
}