// app/api/user/[id]/route.js
import dbConnect from "@/lib/dbConnect";
import Letter from "@/models/Letter";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  console.log("호출");
  const { id } = await params;

  await dbConnect();

  if (!ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, error: "Invalid ID format" },
      { status: 400 }
    );
  }

  try {
    const letter = await Letter.findById(id).lean();
    if (!letter) {
      return NextResponse.json(
        { success: false, error: "Letter not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: letter });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
