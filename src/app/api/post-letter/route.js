// app/api/letters/route.js
import dbConnect from "@/lib/dbConnect";
import Letter from "@/models/Letter";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();

  try {
    const { name, message } = await request.json();
    const letter = await Letter.create({ name, message });
    return NextResponse.json({ success: true, data: letter }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
