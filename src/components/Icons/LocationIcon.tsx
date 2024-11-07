type LocationIconProps = {
  color?: string;
  size?: number;
}

export default function LocationIcon({ color = '#2188FF', size = 20 }: LocationIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.69443 0.222229C3.48031 0.222229 0.055542 3.27778 0.055542 6.94445C0.055542 12.4689 7.69443 19.7778 7.69443 19.7778C7.69443 19.7778 15.3333 12.4689 15.3333 6.94445C15.3333 3.27778 11.9086 0.222229 7.69443 0.222229ZM7.69443 18.0056C5.32638 15.5245 1.32869 10.5378 1.32869 6.94445C1.32869 3.91334 4.19327 1.44445 7.69443 1.44445C9.40045 1.44445 11.0173 2.03112 12.2268 3.10667C13.3981 4.15778 14.0602 5.51445 14.0602 6.94445C14.0602 10.5378 10.0625 15.5245 7.69443 18.0056ZM10.2407 6.94445C10.2407 8.30112 9.10763 9.3889 7.69443 9.3889C6.28124 9.3889 5.14813 8.30112 5.14813 6.94445C5.14813 5.58779 6.28124 4.50001 7.69443 4.50001C9.10763 4.50001 10.2407 5.58779 10.2407 6.94445Z" fill={color} />
    </svg>
  );
}