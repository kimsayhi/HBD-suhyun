"use client";
import { Paper } from "@mui/material";

export default function Card({ children }) {
  return (
    <Paper
      elevation={5}
      className="w-full opacity-95 bg-[#F1EBE5] overflow-hidden z-10 rounded-xl max-w-[600px] text-3xl"
    >
      {children}
    </Paper>
  );
}
