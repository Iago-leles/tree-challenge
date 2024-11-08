import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

import { useSelectedComponent } from "@/contexts/SelectedComponentContext";

import { SensorTypes } from "@/enums";

import sensorIcon from "@/public/icons/wifi_tethering.svg";
import receptorIcon from "@/public/icons/receptor.svg";

import sensorImage from "@/public/sensor.png";
import motorImage from "@/public/motor.png";

import OperatingStatus from "../TreeView/TreeNode/OperatingStatus";
import ImagePreview from "./ImagePreview";

export default function ComponentDetails() {
  const { selectedComponent } = useSelectedComponent();
  const [imagePreview, setImagePreview] = useState<string | StaticImageData>("");

  useEffect(() => {
    const types = {
      [SensorTypes.ENERGY]: sensorImage,
      [SensorTypes.VIBRATION]: motorImage,
    };

    const image = types[selectedComponent?.sensorType as keyof typeof types] ?? "";

    setImagePreview(image);
  }, [selectedComponent]);

  const handleType = () => {
    const types = {
      [SensorTypes.ENERGY]: "Motor Elétrico (Trifásico)",
      [SensorTypes.VIBRATION]: "Sensor de Vibração",
    };

    return types[selectedComponent?.sensorType as keyof typeof types] || "Nenhum Tipo";
  };

  const handleResponsibles = () => {
    const responsibles = {
      [SensorTypes.ENERGY]: "Elétrica",
      [SensorTypes.VIBRATION]: "Mecânica",
    };

    const responsible = responsibles[selectedComponent?.sensorType as keyof typeof responsibles];

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
  };

  return (
    <div>
      <div className="flex border-b border-[#D8DFE6] h-12 p-4">
        <h3 className="text-[#24292F] font-semibold text-xl flex items-center gap-2">
          {selectedComponent?.name}
          <OperatingStatus node={selectedComponent ?? undefined} />
        </h3>
      </div>

      <div className="p-6">
        <div className="flex gap-6 xl:h-[240px] h-[100%] pb-6 lg:flex-row flex-col">
          <ImagePreview image={imagePreview} setImage={setImagePreview} />

          <div className="flex-1 text-[#24292F] flex flex-col">
            <div className="flex-1 flex flex-col justify-center gap-2">
              <p className="font-semibold">
                Tipo do Equipamento
              </p>

              <p className="text-[#88929C]">
                {handleType()}
              </p>
            </div>

            <hr />

            <div className="flex-1 flex flex-col justify-center gap-2">
              <p className="font-semibold">
                Responsáveis
              </p>

              {handleResponsibles()}
            </div>
          </div>
        </div>

        <hr />

        <div className="pt-6 flex">
          <div className="flex-1">
            <p className="font-semibold text-[#24292F] pb-2">
              Sensor
            </p>

            <span className="flex text-[#88929C]">
              <Image
                src={sensorIcon}
                alt="Icone de sensor"
                className="w-5 h-5"
              />

              <span className="ml-2">
                {selectedComponent?.sensorId || "Nenhum Sensor"}
              </span>
            </span>
          </div>

          <div className="flex-1">
            <p className="font-semibold text-[#24292F] pb-2">
              Receptor
            </p>

            <span className="flex text-[#88929C]">
              <Image
                src={receptorIcon}
                alt="Icone de receptor"
                className="w-5 h-5" />

              <span className="ml-2">
                {selectedComponent?.gatewayId || "Nenhum Receptor"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
