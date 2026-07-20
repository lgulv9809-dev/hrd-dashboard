"use client";

import { useState } from "react";
import { useClients } from "@/context/ClientContext";
import { useRouter } from "next/navigation";


export default function NewClientPage() {

  const { addClient } = useClients();
  const router = useRouter();


  const [name, setName] = useState("");
  const [manager, setManager] = useState("");
  const [phone, setPhone] = useState("");


  const handleSubmit = () => {

    addClient({
      id: Date.now(),
      name,
      manager,
      phone,
    });


    router.push("/clients");

  };


  return (
    <main className="min-h-screen bg-neutral-100 p-10">

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          신규 고객사 등록
        </h1>

        <p className="mt-2 text-neutral-500">
          새로운 고객사 정보를 등록합니다.
        </p>

      </div>


      <div className="max-w-xl rounded-2xl bg-white p-8 shadow">

        <div className="space-y-5">


          <div>
            <label className="text-sm text-neutral-500">
              고객사명
            </label>

            <input
              className="mt-2 w-full rounded-lg border p-3"
              placeholder="예) ABC 주식회사"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>


          <div>
            <label className="text-sm text-neutral-500">
              담당자
            </label>

            <input
              className="mt-2 w-full rounded-lg border p-3"
              placeholder="담당자명"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
            />
          </div>


          <div>
            <label className="text-sm text-neutral-500">
              연락처
            </label>

            <input
              className="mt-2 w-full rounded-lg border p-3"
              placeholder="010-0000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>


          <button
            onClick={handleSubmit}
            className="mt-5 w-full rounded-lg bg-green-800 p-3 text-white"
          >
            등록하기
          </button>


        </div>

      </div>


    </main>
  );
}