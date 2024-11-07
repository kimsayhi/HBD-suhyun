"use client";
import { Paper } from "@mui/material";

export default function Card({ children }) {
  return (
    <Paper
      elevation={5}
      className="w-full opacity-95 overflow-hidden z-10 rounded-xl  p-6 max-w-[500px] text-3xl"
    >
      {children}
    </Paper>
  );
}
