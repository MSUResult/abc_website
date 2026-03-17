// app/test-series/[id]/quiz/page.tsx
import QuizEngine from "@/components/(testseries)/QuizEngine";
import  resources  from "@/data/testSeries";
import { notFound } from "next/navigation";
 // We will create this below

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testData = resources.find((item) => item.id === Number(id));

  if (!testData) return notFound();

  return <QuizEngine testData={testData} />;
}