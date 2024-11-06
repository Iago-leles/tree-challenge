import Image from "next/image";
import { useRef, useState } from "react";

import { useSelectedComponent } from "@/contexts/SelectedComponentContext";

import { SensorTypes } from "@/enums";

import boxIcon from "@/public/icons/box.svg";
import sensorIcon from "@/public/icons/wifi_tethering.svg";
import receptorIcon from "@/public/icons/receptor.svg";

import OperatingStatus from "../TreeView/TreeNode/OperatingStatus";

export default function ComponentDetails() {
  const { selectedComponent } = useSelectedComponent();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleType = () => {
    const types = {
      [SensorTypes.ENERGY]: "Motor Elétrico (Trifásico)",
      [SensorTypes.VIBRATION]: "Sensor de Vibração",
    }

    const type = types[selectedComponent?.sensorType as keyof typeof types]

    if (!type) {
      return 'Nenhum Tipo'
    }

    return types[selectedComponent?.sensorType as keyof typeof types];
  }

  const handleResponsibles = () => {
    const responsibles = {
      [SensorTypes.ENERGY]: "Elétrica",
      [SensorTypes.VIBRATION]: "Mecânica",
    }

    const responsible = responsibles[selectedComponent?.sensorType as keyof typeof responsibles]

    if (!responsible) {
      return <p className="text-[#88929C]">Nenhum Responsável</p>;
    }

    return (
      <span className="flex items-center text-[#88929C]">
        <p className="rounded-full bg-[#2188FF] h-6 w-6 text-center text-white">
          {responsible[0].toUpperCase()}
        </p>

        <span className="ml-2">{responsible}</span>
      </span>
    );
  }

  console.log(selectedComponent);

  return (
    <div>
      <div className="flex border-b border-[#D8DFE6] h-12 p-4">
        <h3 className="text-[#24292F] font-semibold text-xl flex items-center gap-2">
          {selectedComponent?.name}

          <OperatingStatus node={selectedComponent ?? undefined} />
        </h3>
      </div>

      <div className="p-6">
        <div className="flex gap-6 h-[240px] pb-6">
          <div
            onClick={handleAreaClick}
            className="flex-1 border-[2px] border-dashed border-[#55A6FF]  bg-[#F2F8FF] p-6 rounded-md cursor-pointer hover:bg-[#e6f0fc] flex flex-col items-center justify-center"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview da imagem"
                className="max-w-full max-h-32 rounded-md"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Image
                  src={boxIcon}
                  alt="Icone de caixa"
                  className="w-7 h-7"
                />

                <p className="text-center text-[#2188FF] text-md">Adicionar imagem do ativo</p>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <div className="flex-1 text-[#24292F] flex flex-col">
            <div className="flex-1 flex flex-col justify-center gap-2">
              <p className="font-semibold">Tipo do Equipamento</p>

              <p className="text-[#88929C]">{handleType()}</p>
            </div>

            <hr />

            <div className="flex-1 flex flex-col justify-center gap-2">
              <p className="font-semibold">Responsáveis</p>

              {handleResponsibles()}
            </div>
          </div>
        </div>

        <hr />

        <div className="pt-6 flex">
          <div className="flex-1">
            <p className="font-semibold text-[#24292F] pb-2">Sensor</p>

            <span className="flex text-[#88929C]">
              <Image src={sensorIcon} alt="Icone de sensor" className="w-5 h-5" />

              <span className="ml-2">{selectedComponent?.sensorId}</span>
            </span>
          </div>

          <div className="flex-1">
            <p className="font-semibold text-[#24292F] pb-2">Receptor</p>

            <span className="flex text-[#88929C]">
              <Image src={receptorIcon} alt="Icone de receptor" className="w-5 h-5" />

              <span className="ml-2">{selectedComponent?.gatewayId}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
