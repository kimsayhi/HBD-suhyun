"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";

import colorPager from "@public/color-pager.gif";
import paperBoom from "@public/paper-boom.gif";
import useTimeLeft from "@/hooks/useTimeLeft";
import giftBox from "@public/gift-box.gif";
import { redirect } from "next/navigation";
import Card from "@/components/Card";

const BUBBLE_MESSAGE = [
  "안녕 이쁜이!",
  "두근두근 생일이 다가와!",
  "빨리 생일이 됐으면 좋겠다",
  "내가 뭘지 궁금해?",
  "시간이 지나면 알게 될거야!",
  "헤헤 보고싶다!",
];

export default function Home() {
  const [isBoomEnd, setIsBoomEnd] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [nowMessage, setNowMessage] = useState(BUBBLE_MESSAGE[messageIndex]);
  const { timeLeft, isDDay } = useTimeLeft();

  useEffect(() => {
    const messageIndexInterval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev + 1 >= BUBBLE_MESSAGE.length) {
          return 0;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(messageIndexInterval);
  }, []);

  useEffect(() => {
    setNowMessage(BUBBLE_MESSAGE[messageIndex]);
  }, [messageIndex]);

  useEffect(() => {
    if (isDDay)
      setTimeout(() => {
        setIsBoomEnd(true);
      }, 1500);
  }, [isDDay]);
  return (
    <>
      {isDDay && (
        <motion.div
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          transition={{ duration: 6 }}
          className="absolute  inset-0"
        >
          <Image src={colorPager} alt="색종이" fill />
        </motion.div>
      )}

      {isDDay && !isBoomEnd && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-20"
        >
          <Image src={paperBoom} alt="색종이붐" fill priority />
        </motion.div>
      )}

      <Card>
        <div className="h-[500px] bg-white">
          {!isDDay ? (
            <AnimatePresence>
              <motion.div
                key="count-down"
                initial={{ x: -500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 500, opacity: 0 }}
                className="flex flex-col items-center h-full pt-[100px]  gap-4  "
              >
                <span>수현이 생일까지</span>
                {timeLeft !== null ? (
                  <div className="flex gap-2">
                    <>
                      {timeLeft.days() ? (
                        <span>{timeLeft.days()}일</span>
                      ) : null}
                    </>
                    <span>{timeLeft.hours()}시간</span>
                    <span>{timeLeft.minutes()}분</span>
                    <span>{timeLeft.seconds()}초</span>
                  </div>
                ) : null}
                <span>남았다!</span>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              key="hbd-message"
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 500, opacity: 0 }}
              transition={{ type: "spring" }}
              className="gap-3 pt-[100px] flex  flex-col h-full items-center"
            >
              <span className="flex z-20 justify-center text-4xl">
                사랑하는&nbsp;<span className="text-pink-400">수현</span>아
              </span>
              <span className="flex z-20 pl-4 text-4xl">생일 축하해❤️</span>
            </motion.div>
          )}
          <motion.div
            initial={{ y: 0 }}
            animate={isDDay ? { y: -100 } : { y: 0 }}
            transition={{
              type: "spring",
            }}
            className="relative z-10 flex w-full justify-center bottom-[100px]"
          >
            <motion.div
              animate={{
                y: ["0px", "-15px", "0px"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              className="absolute bottom-[160px] "
            >
              <div className="relative bg-blue-400 text-white rounded-xl py-2 px-4 max-w-xs ">
                <p className="text-base font-sans font-semibold">
                  {!isDDay ? nowMessage : "이제 나를 눌러줘!"}
                </p>
                <div className="absolute left-1/2 bottom-[-9px] w-0 h-0 border-l-[15px] border-r-[15px] border-t-[15px] border-transparent border-t-blue-400"></div>
              </div>
            </motion.div>

            <button
              onClick={
                isDDay
                  ? () => {
                      redirect("/gift");
                    }
                  : () => {
                      setNowMessage("궁금해도 기다려 아직 준비가 안됐어!");
                    }
              }
            >
              <Image src={giftBox} alt="선물상자" width={200} height={200} />
            </button>
          </motion.div>
        </div>
      </Card>
    </>
  );
}
