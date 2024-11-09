"use client";
import FirstCard from "@/components/FirstCard";
import MyLetterCard from "@/components/MyLetterCard";
import PeopleLettersCard from "@/components/PeopleLettersCard";

export default function giftPage() {
  return (
    <div className="items-center  w-full mb-[100px] flex flex-col gap-[100px]">
      <FirstCard />
      <MyLetterCard />
      <PeopleLettersCard />
    </div>
  );
}
