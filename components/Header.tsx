"use client";

import { usePathname } from "next/navigation";


export default function Header() {

  const pathname = usePathname();


  const today =
    new Date().toLocaleDateString(
      "ko-KR",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );


  const title =
    pathname === "/"
      ? "대시보드"
      : pathname.includes("projects")
      ? "용역관리"
      : pathname.includes("clients")
      ? "고객사관리"
      : pathname.includes("education")
      ? "교육관리"
      : pathname.includes("stats")
      ? "통계"
      : "업무관리";


  return (

    <header className="flex items-center justify-between border-b bg-white px-8 py-4">


      <div>

        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <p className="text-sm text-neutral-500">
          {today}
        </p>

      </div>



      <div className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-800">
        LIM Expert
      </div>


    </header>

  );

}