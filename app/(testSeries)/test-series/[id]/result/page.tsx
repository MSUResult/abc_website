import ResultClient from "@/components/(Result)/ResultClient";
import { connectDB } from "@/lib/db/db";
import { QuizResult } from "@/lib/models/QuizResult";
import { auth } from "@clerk/nextjs/server";


export default async function ResultPage({ params }: { params: { id: string } }) {
  // const { userId } = await auth();
const { id } = await params;

  // let isAlreadySaved = false;

  // if (userId) {
  //   await connectDB();
  //   // Use the string ID from params directly
  //   const existingAttempt = await QuizResult.findOne({
  //     userId: userId,
  //     testId: id,
  //   }).lean();

  //   isAlreadySaved = Boolean(existingAttempt);
  // }

  return (
    <ResultClient
      testId={id}
      // isAlreadySaved={isAlreadySaved}
      // isLoggedIn={Boolean(userId)}
    />
  );
}