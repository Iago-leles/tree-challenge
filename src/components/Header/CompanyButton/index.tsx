import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

import { ICompany } from "@/types";

import goldIcon from "@/public/icons/gold.svg"

type CompanyButtonProps = {
  company: ICompany;
}

export default function CompanyButton({ company }: CompanyButtonProps) {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const isActiveCompany = searchParams.get('companyId') === company.id;

  const handleClick = () => {
    push(`?companyId=${company.id}&companyName=${company.name}`);
  }

  return (
    <button
      onClick={handleClick}
      className="h-[24px] w-[80px] text-white flex items-center gap-2 py-1 px-2 rounded-sm hover:bg-opacity-90 text-xs"
      style={{ backgroundColor: isActiveCompany ? '#2188FF' : '#023B78' }}
    >
      <Image src={goldIcon} alt="gold" className="w-4 h-4" />

      {company.name}
    </button>
  )
}