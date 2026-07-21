"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProjects } from "@/context/ProjectContext";


export default function EditProjectPage() {


  const { id } = useParams();
  const router = useRouter();

  const { projects, updateProject } = useProjects();


  const project = projects.find(
    (p) => p.id === Number(id)
  );



  const [name,setName] =
    useState("");

  const [client,setClient] =
    useState("");

  const [managerName,setManagerName] =
    useState("");

  const [phone,setPhone] =
    useState("");

  const [email,setEmail] =
    useState("");

  const [amount,setAmount] =
    useState(0);

  const [status,setStatus] =
    useState("진행중");


  // 용역 기간 추가

  const [startMonth,setStartMonth] =
    useState("");

  const [endMonth,setEndMonth] =
    useState("");



  useEffect(()=>{

    if(project){

      setName(project.name ?? "");

      setClient(project.client ?? "");

      setManagerName(project.managerName ?? "");

      setPhone(project.phone ?? "");

      setEmail(project.email ?? "");

      setAmount(project.amount ?? 0);

      setStatus(project.status ?? "진행중");


      setStartMonth(
        project.startMonth ?? ""
      );


      setEndMonth(
        project.endMonth ?? ""
      );

    }


  },[project]);





  const handleSubmit =()=>{


    if(!project)
      return;



    updateProject({


      ...project,


      id:Number(id),


      name,


      client,


      managerName,


      phone,


      email,


      amount,


      status,


      startMonth,


      endMonth,



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

          value={managerName}

          onChange={(e)=>setManagerName(e.target.value)}

          placeholder="담당자명"

        />





        <input

          className="mb-4 w-full rounded-lg border p-3"

          value={phone}

          onChange={(e)=>setPhone(e.target.value)}

          placeholder="전화번호"

        />





        <input

          className="mb-4 w-full rounded-lg border p-3"

          value={email}

          onChange={(e)=>setEmail(e.target.value)}

          placeholder="메일주소"

        />







        <input

          className="mb-4 w-full rounded-lg border p-3"

          type="number"

          value={amount}

          onChange={(e)=>setAmount(Number(e.target.value))}

          placeholder="계약금액"

        />







        {/* 용역 기간 */}

        <div className="mb-4">


          <p className="mb-2 text-sm text-neutral-500">

            용역 기간

          </p>



          <div className="flex items-center gap-3">


            <input

              type="month"

              className="w-full rounded-lg border p-3"

              value={startMonth}

              onChange={(e)=>
                setStartMonth(e.target.value)
              }

            />


            <span>
              ~
            </span>


            <input

              type="month"

              className="w-full rounded-lg border p-3"

              value={endMonth}

              onChange={(e)=>
                setEndMonth(e.target.value)
              }

            />


          </div>


        </div>







        <select

          className="mb-4 w-full rounded-lg border p-3"

          value={status}

          onChange={(e)=>setStatus(e.target.value)}

        >


          <option value="진행중">
            진행중
          </option>


          <option value="완료">
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