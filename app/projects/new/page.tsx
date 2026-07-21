"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProjects } from "@/context/ProjectContext";

export default function NewProjectPage() {


  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [managerName, setManagerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("진행중");
  const [startDate, setStartDate] = useState("");

const [endDate, setEndDate] = useState("");



  // 용역 유형
  const [annual, setAnnual] = useState(false);
  const [multiRound, setMultiRound] = useState(false);


  // 용역 기간 추가
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");



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

              onChange={(e)=>setName(e.target.value)}

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

              onChange={(e)=>setClient(e.target.value)}

            />



            <input

              className="mt-3 w-full rounded-lg border p-3"

              placeholder="담당자명"

              value={managerName}

              onChange={(e)=>setManagerName(e.target.value)}

            />



            <input

              className="mt-3 w-full rounded-lg border p-3"

              placeholder="전화번호"

              value={phone}

              onChange={(e)=>setPhone(e.target.value)}

            />



            <input

              className="mt-3 w-full rounded-lg border p-3"

              placeholder="메일주소"

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

            />


          </div>







          <div>

            <label className="text-sm text-neutral-500">
              계약금액
            </label>


            <input

              className="mt-2 w-full rounded-lg border p-3"

              type="number"

              placeholder="금액 입력"

              value={amount}

              onChange={(e)=>setAmount(Number(e.target.value))}

            />


          </div>

<div>

<label className="text-sm text-neutral-500">
  용역 시작일
</label>

<input

className="mt-2 w-full rounded-lg border p-3"

type="date"

value={startDate}

onChange={(e)=>setStartDate(e.target.value)}

/>

</div>



<div>

<label className="text-sm text-neutral-500">
  용역 종료일
</label>

<input

className="mt-2 w-full rounded-lg border p-3"

type="date"

value={endDate}

onChange={(e)=>setEndDate(e.target.value)}

/>

</div>





          {/* 용역 기간 */}

          <div>

            <label className="text-sm text-neutral-500">
              용역 기간
            </label>


            <div className="mt-3 flex gap-3">


              <input

                type="month"

                className="w-full rounded-lg border p-3"

                value={startMonth}

                onChange={(e)=>setStartMonth(e.target.value)}

              />


              <span className="flex items-center">
                ~
              </span>


              <input

                type="month"

                className="w-full rounded-lg border p-3"

                value={endMonth}

                onChange={(e)=>setEndMonth(e.target.value)}

              />


            </div>


          </div>








          {/* 용역 유형 */}

          <div>

            <label className="text-sm text-neutral-500">
              용역 유형
            </label>


            <div className="mt-3 flex gap-5">


              <label className="flex items-center gap-2">


                <input

                  type="checkbox"

                  checked={annual}

                  onChange={(e)=>setAnnual(e.target.checked)}

                />

                연간 용역

              </label>





              <label className="flex items-center gap-2">


                <input

                  type="checkbox"

                  checked={multiRound}

                  onChange={(e)=>setMultiRound(e.target.checked)}

                />

                다차수 용역

              </label>



            </div>


          </div>








          <div>


            <label className="text-sm text-neutral-500">
              상태
            </label>


            <select

              className="mt-2 w-full rounded-lg border p-3"

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


          </div>









          <button

            onClick={()=>{


              addProject({

                id:Date.now(),

                name,

                client,

                managerName,

                phone,

                email,

                amount,

                status,

progress:0,


startDate,

endDate,


annual,

                multiRound,


                // 추가
                startMonth,

                endMonth,


                courses:[]

              } as any);



              router.push("/projects");


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