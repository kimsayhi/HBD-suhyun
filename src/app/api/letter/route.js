// app/api/letters/route.js
import dbConnect from "@/lib/dbConnect";
import Letter from "@/models/Letter";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();

  try {
    const { name, message } = await request.json();
    const letter = await Letter.create({ name, message });
    console.log(letter);
    return NextResponse.json({ success: true, data: letter }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(request) {
  await dbConnect();

  try {
    const { id, name, message } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    const letter = await Letter.findByIdAndUpdate(
      id,
      { name, message },
      { new: true }
    );

    if (!letter) {
      return NextResponse.json(
        { success: false, error: "Letter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: letter });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}