import { NextResponse } from "next/server";
import { Quiz } from "@/lib/models/Quiz";
import { connectDB } from "@/lib/db/db";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    // 1. Validation: Ensure questions array exists
    if (!data.questions || !Array.isArray(data.questions)) {
      return NextResponse.json(
        { error: "Questions are required and must be an array." },
        { status: 400 }
      );
    }

    // 2. Auto-calculate totals
    const calculatedTotalQuestions = data.questions.length;
    const calculatedTotalMarks = calculatedTotalQuestions * 4; 

    // 3. Assemble the final object
    // Note: Ensure your frontend is sending 'examType', 'overview', and 'instructions'
    const finalData = { 
      ...data, 
      totalQuestions: calculatedTotalQuestions,
      totalMarks: calculatedTotalMarks
    };

    // 4. Save to database
    // Using Quiz.create() is often cleaner than new Quiz() + save()
    const newQuiz = await Quiz.create(finalData);

    return NextResponse.json(
      { message: "Quiz uploaded successfully!", quizId: newQuiz._id }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload Error:", error);
    
    // Check if it's a Mongoose validation error to give you better feedback
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: "Validation Failed", details: error.message }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to upload quiz.", details: error.message }, 
      { status: 500 }
    );
  }
}