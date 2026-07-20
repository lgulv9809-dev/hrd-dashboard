"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProjects } from "@/context/ProjectContext";
export default function NewProjectPage() {
const [name, setName] = useState("");
const [client, setClient] = useState("");
const [amount, setAmount] = useState("");
const [progress, setProgress] = useState("");
const [status, setStatus] = useState("진행중");
const { addProject } = useProjects();
const router = useRouter();
return (

    <main className="min-h-screen bg-neutral-100 p-10">

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          신규 용역 등록
        </h1>

        <p className="mt-2 text-neutral-500">
          새로운 프로젝트 정보를 등록합니다.
        </p>

      </div>


      <div className="max-w-xl rounded-2xl bg-white p-8 shadow">

        <div className="space-y-5">


          <div>
            <label className="text-sm text-neutral-500">
              용역명
            </label>

            <input
  className="mt-2 w-full rounded-lg border p-3"
  placeholder="예) 홈페이지 제작 용역"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
          </div>


          <div>
            <label className="text-sm text-neutral-500">
              고객사
            </label>

           <input
  className="mt-2 w-full rounded-lg border p-3"
  placeholder="고객사명"
  value={client}
  onChange={(e) => setClient(e.target.value)}
/>
          </div>


          <div>
            <label className="text-sm text-neutral-500">
              계약금액
            </label>

            <input
  className="mt-2 w-full rounded-lg border p-3"
  placeholder="금액 입력"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
/>
          </div>


          <div>
            <label className="text-sm text-neutral-500">
              진행률
            </label>

            <input
  className="mt-2 w-full rounded-lg border p-3"
  placeholder="예) 50"
  value={progress}
  onChange={(e) => setProgress(e.target.value)}
/>
          </div>


          <div>
            <label className="text-sm text-neutral-500">
              상태
            </label>

            <select
  className="mt-2 w-full rounded-lg border p-3"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>

              <option>
                진행중
              </option>

              <option>
                완료
              </option>

            </select>
          </div>


       <button
  onClick={() => {

  console.log("등록 실행");

  addProject({
    id: Date.now(),
    name,
    client,
    amount: Number(amount),
    progress: Number(progress),
    status,
  });
  router.push("/projects");
console.log("추가 완료");
}}
  className="mt-5 w-full rounded-lg bg-green-800 p-3 text-white"
>
  등록하기
</button>


        </div>

      </div>


    </main>
  );
}