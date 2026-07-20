"use client";

import { useState } from "react";
import { useEducations } from "@/context/EducationContext";
import { useRouter } from "next/navigation";


export default function NewEducationPage() {

  const { addEducation } = useEducations();
  const router = useRouter();


  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("예정");


  const handleSubmit = () => {

    addEducation({
      id: Date.now(),
      title,
      target,
      date,
      location,
      status,
    });


    router.push("/education");

  };


  return (
    <main className="min-h-screen bg-neutral-100 p-10">

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          신규 교육 등록
        </h1>

        <p className="mt-2 text-neutral-500">
          새로운 교육 정보를 등록합니다.
        </p>

      </div>


      <div className="max-w-xl rounded-2xl bg-white p-8 shadow">

        <div className="space-y-5">


          <input
            className="w-full rounded-lg border p-3"
            placeholder="교육명"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />


          <input
            className="w-full rounded-lg border p-3"
            placeholder="교육 대상"
            value={target}
            onChange={(e)=>setTarget(e.target.value)}
          />


          <input
            className="w-full rounded-lg border p-3"
            placeholder="교육 날짜"
            value={date}
            onChange={(e)=>setDate(e.target.value)}
          />


          <input
            className="w-full rounded-lg border p-3"
            placeholder="교육 장소"
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
          />


          <select
            className="w-full rounded-lg border p-3"
            value={status}
            onChange={(e)=>setStatus(e.target.value)}
          >

            <option>
              예정
            </option>

            <option>
              완료
            </option>

          </select>


          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-green-800 p-3 text-white"
          >
            등록하기
          </button>


        </div>

      </div>

    </main>
  );
}