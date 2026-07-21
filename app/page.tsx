"use client";

import { useProjects } from "@/context/ProjectContext";
import { useClients } from "@/context/ClientContext";
import { useEducations } from "@/context/EducationContext";


import SummaryCard from "@/components/SummaryCard";
import TodoList from "@/components/TodoList";




export default function Home() {

  const { projects } = useProjects();
  const { clients } = useClients();
  const { educations } = useEducations();


  const totalAmount = projects.reduce(
    (sum, project) => sum + project.amount,
    0
  );


  const activeProjects = projects.filter(
    (project) => project.status === "진행중"
  ).length;


  return (
    <main className="flex min-h-screen bg-neutral-100">

 


      <div className="flex-1 p-10">


        {/* 제목 */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold text-neutral-900">
            IM 업무 생산성 지표 관리 (가을)
          </h1>


          <p className="mt-2 text-neutral-500">
            아자아자 👋
          </p>

        </div>



        {/* 현황 카드 */}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">


          <SummaryCard
            title="총 계약규모"
            value={`${totalAmount.toLocaleString()}원`}
          />


          <SummaryCard
            title="진행중 용역"
            value={`${activeProjects}건`}
          />


          <SummaryCard
            title="교육 일정"
            value={`${educations.length}건`}
          />


          <SummaryCard
            title="관리 고객사"
            value={`${clients.length}개`}
          />


        </div>



        {/* 오늘 해야 할 일 */}

        <TodoList />


      </div>


    </main>
  );
}