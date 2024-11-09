import { useEffect, useState } from "react";
import Card from "./Card";

export default function PeopleLettersCard() {
  const [peopleLetter, setPeoPleLetter] = useState([]);
  const getLetters = async () => {
    const response = await fetch("/api/letter", { method: "GET" });
    const responseData = await response.json();
    setPeoPleLetter(responseData.data);
  };

  useEffect(() => {
    getLetters();
  }, []);
  return (
    <Card>
      <div className="p-10 flex flex-wrap gap-4">
        <span className="font-letter w-full text-gray-600 pb-10 font-extrabold ">
          생일 축하 메시지
        </span>
        {peopleLetter.map((letter) => (
          <div
            key={letter._id}
            className="py-2 px-4 text-gray-800 font-letter text-base rounded-xl shadow-xl bg-[#d8d2c9ea] border-black flex flex-col gap-2"
          >
            <span className="text-sm font-bold ">{letter.name}</span>
            <span className="font-semibold">{letter.message}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
