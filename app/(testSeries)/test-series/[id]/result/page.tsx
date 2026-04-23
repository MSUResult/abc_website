import ResultClient from "@/components/(Result)/ResultClient";
import { connectDB } from "@/lib/db/db";
import { QuizResult } from "@/lib/models/QuizResult";
import { auth } from "@clerk/nextjs/server";







export default async function ResultPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  // 1. Instantly check if they have a session
  const { userId } = await auth(); 

  return (
    <ResultClient
      testId={id}
      isLoggedIn={Boolean(userId)} // 2. Pass this flag down!
    />
  );
}