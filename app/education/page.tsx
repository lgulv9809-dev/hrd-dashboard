"use client";
import Link from "next/link";
import { useEducations } from "@/context/EducationContext";
import EducationCard from "@/components/EducationCard";
export default function EducationPage() {
const { educations } = useEducations();
  return (
    <main className="min-h-screen bg-neutral-100 p-10">

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          교육관리
        </h1>

        <p className="mt-2 text-neutral-500">
          교육 일정과 교육 정보를 관리합니다.
        </p>
        <Link
  href="/education/new"
  className="inline-block mt-5 rounded-lg bg-green-800 px-5 py-3 text-white"
>
  + 신규 교육 등록
</Link>

      </div>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

  {educations.map((education) => (
    <EducationCard
      key={education.id}
      id={education.id}
      title={education.title}
      target={education.target}
      date={education.date}
      location={education.location}
      status={education.status}
    />
  ))}

</div>


    </main>
  );
}