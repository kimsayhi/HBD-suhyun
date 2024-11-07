"use client";
import { Button, Paper, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Card from "@/components/Card";

export default function LetterPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidation, setIsValidation] = useState({
    name: true,
    message: true,
  });
  const validateField = () => {
    let isOk = true;
    if (name.trim("").length <= 0) {
      setIsValidation((prev) => ({ ...prev, name: false }));
      isOk = false;
    }
    if (message.length <= 5) {
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

      const response = await fetch("api/post-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      setName("");
      setMessage("");
      setIsSuccess(true);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className="relative flex flex-col items-center mx-auto 
  justify-center px-5"
    >
      <Card>
        <div className="h-[400px]">
          <span className="text-base  w-full  bg-white font-bold">
            수현이에게
            <br />
            생일 축하 메시지를 남겨주세요
          </span>
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
              helperText={isValidation.name ? undefined : "이름을 입력해주세요"}
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
            <div className="flex h-[60px] items-end justify-between">
              <small className="text-xs">
                삭제나 수정은 <br />
                저에게 요청해주세요
              </small>
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
          <Snackbar
            open={isSuccess}
            autoHideDuration={3000}
            onClose={() => {
              setIsSuccess(false);
            }}
            message="성공적으로 전송되었습니다. 감사합니다."
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          />
        </div>
      </Card>
    </div>
  );
}
