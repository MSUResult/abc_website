import { NextResponse } from "next/server";


import { connectDB } from "@/lib/db/db";
import { Quiz } from "@/lib/models/Quiz";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
  await connectDB();
    const { id } =await params;

    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // This data includes overview, instructions, and the full questions array
    return NextResponse.json(quiz, {
      status: 200,
      headers: {
        // Cache this quiz data for 1 hour (3600 seconds)
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}