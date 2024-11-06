import { useRouter, useSearchParams } from "next/navigation";
import clsx from 'clsx'

type FilterButtonProps = {
  label: string;
  icon: React.ComponentType<{ color?: string | null }>;
  type: string;
}

export default function FilterButton({ label, type, ...props }: FilterButtonProps) {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const isFilterActive = searchParams.has(type)

  const handleUpdateSearch = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (params.has(type)) {
      params.delete(type)
    } else {
      params.append(type, 'true')
    }
    push(`?${params.toString()}`)
  }

  return (
    <button
      onClick={() => handleUpdateSearch()}
      className={clsx("flex items-center gap-2 border border-[#D8DFE6] rounded-sm py-1 px-2 font-semibold text-[#77818C]", {
        'bg-[#2188FF] text-white': isFilterActive
      })}
      style={{ transition: 'background-color 0.3s ease, color 0.3s ease' }}
    >
      <props.icon color={isFilterActive ? 'white' : '#2188FF'} />

      {label}
    </button>
  )
}