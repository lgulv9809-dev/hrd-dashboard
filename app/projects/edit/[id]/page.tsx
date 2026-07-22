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



  const [name,setName] = useState("");
  const [client,setClient] = useState("");
  const [managerName,setManagerName] = useState("");
  const [phone,setPhone] = useState("");
  const [email,setEmail] = useState("");
  const [amount,setAmount] = useState(0);
  const [status,setStatus] = useState("진행중");


  // 계약 유형
  const [contractType,setContractType] =
    useState("입찰");


  // 연간 / 다차수
  const [annual,setAnnual] =
    useState(false);

  const [multiRound,setMultiRound] =
    useState(false);



  const [startDate,setStartDate] =
    useState("");

  const [endDate,setEndDate] =
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



      setContractType(
        (project as any).contractType ?? "입찰"
      );



      setAnnual(
        (project as any).annual ?? false
      );


      setMultiRound(
        (project as any).multiRound ?? false
      );



      setStartDate(
        project.startDate ?? ""
      );


      setEndDate(
        project.endDate ?? ""
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


      contractType,


      annual,

      multiRound,


      startDate,

      endDate,


    } as any);



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






        {/* 계약 유형 */}

        <div className="mb-4">

          <p className="mb-2 text-sm text-neutral-500">
            계약 유형
          </p>


          <select

            className="w-full rounded-lg border p-3"

            value={contractType}

            onChange={(e)=>
              setContractType(e.target.value)
            }

          >

            <option value="입찰">
              입찰
            </option>


            <option value="수의계약">
              수의계약
            </option>


            <option value="단타">
              단타
            </option>


          </select>


        </div>






        {/* 연간 / 다차수 */}

        <div className="mb-4 flex gap-6">


          <label className="flex items-center gap-2">


            <input

              type="checkbox"

              checked={annual}

              onChange={(e)=>
                setAnnual(e.target.checked)
              }

            />


            연간 용역


          </label>





          <label className="flex items-center gap-2">


            <input

              type="checkbox"

              checked={multiRound}

              onChange={(e)=>
                setMultiRound(e.target.checked)
              }

            />


            다차수 용역


          </label>



        </div>









        {/* 기간 */}

        <div className="mb-4">


          <p className="mb-2 text-sm text-neutral-500">
            용역 기간
          </p>


          <div className="flex gap-3">


            <input

              type="date"

              className="w-full rounded-lg border p-3"

              value={startDate}

              onChange={(e)=>
                setStartDate(e.target.value)
              }

            />



            <span className="flex items-center">
              ~
            </span>



            <input

              type="date"

              className="w-full rounded-lg border p-3"

              value={endDate}

              onChange={(e)=>
                setEndDate(e.target.value)
              }

            />


          </div>


        </div>








        <select

          className="mb-4 w-full rounded-lg border p-3"

          value={status}

          onChange={(e)=>
            setStatus(e.target.value)
          }

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