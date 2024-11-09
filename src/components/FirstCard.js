import Image from "next/image";
import Card from "./Card";
import ridingHorse from "@public/riding-horse.gif";

export default function FirstCard() {
  return (
    <Card>
      <div className="pt-10 pb-[100px]  flex flex-col gap-5 items-center">
        <div className="flex justify-center gap-1 text-4xl">
          <span className="text-[#ff566a] relative top-[100px] left-5 -rotate-[60deg]">
            H
          </span>
          <span className="text-[#FF7EBA] relative top-[70px] left-1 -rotate-[50deg]">
            A
          </span>
          <span className="text-[#FFE76F] relative top-[47px] -left-1 -rotate-[50deg]">
            P
          </span>
          <span className=" text-[#00A94F] relative top-[32px] -left-2 -rotate-[34deg]">
            P
          </span>
          <span className="text-[#40A9FF] relative top-[20px] -left-2 -rotate-[20deg]">
            Y
          </span>
          <span className="text-[#00A94F] relative top-[10px] left-2 -rotate-[5deg]">
            B
          </span>
          <span className="text-[#40A9FF]  relative top-[8px] left-2 rotate-[5deg]">
            I
          </span>
          <span className=" text-[#ff566a] relative top-[12px] left-2 rotate-[13deg]">
            R
          </span>
          <span className="text-[#FF7EBA]  relative top-[20px] left-1 rotate-[20deg]">
            T
          </span>
          <span className="text-[#FFE76F] relative top-[33px] left-1 rotate-[34deg]">
            H
          </span>
          <span className="text-[#00A94F] relative top-[55px] left-1 rotate-[42deg]">
            D
          </span>
          <span className="text-[#40A9FF]  relative top-[75px] -left-1  rotate-[47deg]">
            A
          </span>
          <span className="text-[#ff566a] relative top-[100px] -left-5 rotate-[65deg]">
            Y
          </span>
        </div>
        <div className="relative h-[350px] overflow-hidden rounded-t-full bg-white w-[300px]">
          <Image src={ridingHorse} alt="첫번째카드 사진" fill />
        </div>
        <div className="text-gray-700 pt-10">수현아, 생일축하해!</div>
      </div>
    </Card>
  );
}
