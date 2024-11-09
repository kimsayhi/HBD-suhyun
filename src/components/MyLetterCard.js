import Image from "next/image";
import Card from "./Card";
import loveLetter from "@public/love-letter.png";
import myLetter from "@public/my-letter.jpg";
import { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { motion } from "framer-motion";

export default function MyLetterCard() {
  const [isOpenLetter, setIsOpenLetter] = useState(false);

  useEffect(() => {
    if (isOpenLetter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpenLetter]);
  return (
    <>
      <Card>
        <div className="flex h-[500px] flex-col gap-[100px] items-center justify-center">
          <div className="text-gray-700">오빠가 쓴 편지야 읽어줘</div>
          <motion.button
            animate={{
              x: [0, -10, 10, -10, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              repeatDelay: 2,
              duration: 0.5,
            }}
            onClick={() => {
              setIsOpenLetter(true);
            }}
          >
            <Image src={loveLetter} alt="편지봉투" width={300} height={200} />
          </motion.button>
        </div>
      </Card>
      {isOpenLetter && (
        <motion.div
          initial={{ y: 1000 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="z-30 fixed backdrop-blur-sm inset-2"
        >
          <button
            onClick={() => {
              setIsOpenLetter(false);
            }}
            className="z-40 absolute bottom-[3%] left-1/2 -translate-x-1/2 opacity-40"
          >
            <CancelIcon className="w-[50px] h-[50px]" />
          </button>
          <Image src={myLetter} alt="내 편지" fill className="object-contain" />
        </motion.div>
      )}
    </>
  );
}
