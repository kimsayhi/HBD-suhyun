"use client";

import { Button, Paper, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Card from "@/components/Card";
import exampleLetter from "@public/letter-example.png";
import CancelIcon from "@mui/icons-material/Cancel";
import Image from "next/image";

export default function LetterPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [letterId, setLetterId] = useState("");
  const [isWrite, setIsWrite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidation, setIsValidation] = useState({
    name: true,
    message: true,
  });
  const [isOpenExample, setIsOpenExample] = useState(false);

  const validateField = () => {
    let isOk = true;
    if (name.trim("").length <= 0) {
      setIsValidation((prev) => ({ ...prev, name: false }));
      isOk = false;
    }
    if (message.length < 5) {
      setIsValidation((prev) => ({ ...prev, message: false }));
      isOk = false;
    }
    return isOk;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidateOk = validateField();
    if (!isValidateOk) {
      return;
    }
    try {
      setIsLoading(true);
      if (letterId) {
        const response = await fetch("api/letter", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: letterId, name, message }),
        });
        if (!response.ok) {
          throw new Error("실패");
        }
      } else {
        const response = await fetch("api/letter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, message }),
        });
        const responseData = await response.json();
        localStorage.setItem("letterId", responseData.data._id);
        setLetterId(responseData.data._id);
      }
      setName("");
      setMessage("");
      setIsSuccess(true);
      setIsWrite(true);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickEdit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/letter/${letterId}`);
      const responseData = await response.json();
      setMessage(responseData.data.message);
      setName(responseData.data.name);
      setIsWrite(false);
    } catch {
      console.log("편지 불러오기 에러");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedId = localStorage.getItem("letterId");
    if (!savedId) return;
    setIsWrite(true);
    setLetterId(savedId);
  }, []);

  return (
    <>
      <Card>
        <div className="w-full h-full p-6">
          {!isWrite ? (
            <div className="h-[400px] font-letter flex flex-col">
              <span className="text-base justify-start  w-full  font-bold">
                수현이에게 생일 축하 메시지를 남겨주세요. <br />
                길게 써주셔도, 간단하게 작성해주셔도 좋습니다!
                <br /> 다음과 같이 전달될 예정입니다.
              </span>
              <button
                onClick={() => {
                  setIsOpenExample(true);
                }}
                className="underline flex font-bold font-serif text-base text-blue-500"
              >
                예시사진
              </button>
              {isOpenExample && (
                <div className="z-30 border-4 fixed px-2 shadow-2xl backdrop-blur-sm inset-2">
                  <button
                    onClick={() => {
                      setIsOpenExample(false);
                    }}
                    className="z-40 absolute flex items-center top-[10%] left-1/2 -translate-x-1/2 opacity-60"
                  >
                    <CancelIcon className="w-[50px] h-[50px]" />
                    <span className="text-xl">눌러서 닫기</span>
                  </button>
                  <Image
                    src={exampleLetter}
                    alt="예시사진"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <form
                className="text-xl items-stretch min-w-[250px] w-full   flex flex-col gap-5"
                onSubmit={handleSubmit}
              >
                <TextField
                  variant="standard"
                  className="w-full"
                  onFocus={() => {
                    setIsValidation((prev) => ({ ...prev, name: true }));
                  }}
                  error={!isValidation.name}
                  helperText={
                    isValidation.name ? undefined : "이름을 입력해주세요"
                  }
                  label="이름"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />

                <TextField
                  className="w-full"
                  onFocus={() => {
                    setIsValidation((prev) => ({ ...prev, message: true }));
                  }}
                  error={!isValidation.message}
                  label="내용"
                  helperText={
                    isValidation.message ? undefined : "5자 이상 입력해주세요"
                  }
                  placeholder="5자 이상 입력해주세요"
                  multiline
                  rows={5}
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                <div className="flex h-[60px] items-end justify-end">
                  <Button
                    disabled={isLoading ? true : false}
                    variant="contained"
                    type="submit"
                  >
                    {isLoading ? "전송중" : "확인"}
                    <SendIcon className="relative left-2" />
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="h-[400px] flex flex-col items-center justify-center gap-[30px]">
              <p>작성해주셔서 감사합니다</p>
              <br />
              <Button onClick={onClickEdit} variant="contained">
                수정하기
              </Button>
            </div>
          )}
        </div>
      </Card>
      <Snackbar
        open={isSuccess}
        autoHideDuration={3000}
        onClose={() => {
          setIsSuccess(false);
        }}
        message="성공적으로 전송되었습니다. 감사합니다."
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <Snackbar
        open={isError}
        autoHideDuration={3000}
        onClose={() => {
          setIsError(false);
        }}
        message="에러가 발생했습니다."
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
}
