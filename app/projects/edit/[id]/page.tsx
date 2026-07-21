"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProjects } from "@/context/ProjectContext";


export default function EditProjectPage() {

  const { id } = useParams();
  const router = useRouter();

  const { projects, updateProject } = useProjects();


  const project = projects.find(
    (p) => p.id === Number(id)
  );


  const [name, setName] =
    useState(project?.name || "");

  const [client, setClient] =
    useState(project?.client || "");

  const [amount, setAmount] =
    useState(project?.amount || 0);



  const [status, setStatus] =
    useState(project?.status || "진행중");



  const handleSubmit = () => {


updateProject({
  id: Number(id),
  name,
  client,
  amount,
  progress: project?.progress ?? 0,
  status,
  courses: project?.courses ?? [],
});


    router.push("/projects");

  };



  return (

    <main className="min-h-screen bg-neutral-100 p-10">


      <h1 className="text-3xl font-bold">
        용역 수정
      </h1>



      <div className="mt-8 max-w-xl rounded-2xl bg-white p-8 shadow">


        <input
          className="mb-4 w-full rounded-lg border p-3"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          placeholder="용역명"
        />


        <input
          className="mb-4 w-full rounded-lg border p-3"
          value={client}
          onChange={(e)=>setClient(e.target.value)}
          placeholder="고객사"
        />


        <input
          className="mb-4 w-full rounded-lg border p-3"
          type="number"
          value={amount}
          onChange={(e)=>setAmount(Number(e.target.value))}
          placeholder="계약금액"
        />


        


        <select
          className="mb-4 w-full rounded-lg border p-3"
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
        >

          <option>
            진행중
          </option>

          <option>
            완료
          </option>

        </select>



        <button
          onClick={handleSubmit}
          className="rounded-lg bg-green-800 px-5 py-3 text-white"
        >
          저장
        </button>


      </div>


    </main>

  );
}