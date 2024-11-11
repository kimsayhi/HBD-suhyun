"use client";
import FirstCard from "@/components/FirstCard";
import LastCard from "@/components/LastCard";
import MyLetterCard from "@/components/MyLetterCard";
import PeopleLettersCard from "@/components/PeopleLettersCard";
import YouTube from "react-youtube";

export default function giftPage() {
  return (
    <div className="items-center  w-full mb-[100px] flex flex-col gap-[100px]">
      <YouTube videoId="8OYTUFtN3V8" opts={{ playerVars: { autoplay: 1 } }} />
      <FirstCard />
      <MyLetterCard />
      <PeopleLettersCard />
      <LastCard />
    </div>
  );
}
