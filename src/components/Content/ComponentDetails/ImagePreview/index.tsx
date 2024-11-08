import Image, { StaticImageData } from "next/image";
import { IconTrash } from "@tabler/icons-react";

import boxIcon from "@/public/icons/box.svg";
import { useRef } from "react";

type ImagePreviewProps = {
  image: string | StaticImageData;
  setImage: (image: string) => void;
}

export default function ImagePreview({ image, setImage }: ImagePreviewProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContent = () => {
    if (image) {
      return (
        <div className="relative max-h-[240px]">
          <Image
            src={image}
            alt="Preview da imagem"
            width={320}
            height={240}
            className="rounded-md max-h-[210px]"
            style={{ objectFit: "contain" }}
          />

          <div
            className="absolute top-2 right-2 bg-white p-1 rounded-full cursor-pointer shadow-lg"
            onClick={() => setImage('')}
          >
            <IconTrash className="w-5 h-5 text-red-600" />
          </div>
        </div>
      )
    }

    return (
      <div
        onClick={handleAreaClick}
        className="w-[320px] border-[2px] border-dashed border-[#55A6FF] bg-[#F2F8FF] p-6 rounded-md cursor-pointer hover:bg-[#e6f0fc] flex flex-col items-center justify-center"
      >
        <div className="flex flex-col items-center gap-2">
          <Image
            src={boxIcon}
            alt="Icone de caixa"
            width={320}
            height={240}
            className="w-7 h-7"
          />

          <p className="text-center text-[#2188FF] text-md">
            Adicionar imagem do ativo
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      {handleContent()}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </>
  )
}