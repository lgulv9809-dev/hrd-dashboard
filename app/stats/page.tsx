"use client";

import { useProjects } from "@/context/ProjectContext";
import { useEducations } from "@/context/EducationContext";


export default function StatsPage() {

  const { projects } = useProjects();
  const { educations } = useEducations();


  const totalAmount = projects.reduce(
    (sum, project) => sum + project.amount,
    0
  );


  const activeProjects =
    projects.filter(
      (project)=>project.status==="진행중"
    ).length;


  const completeProjects =
    projects.filter(
      (project)=>project.status==="완료"
    ).length;


  const averageProgress =
    projects.length
      ? Math.round(
          projects.reduce(
            (sum,p)=>sum+p.progress,
            0
          ) / projects.length
        )
      : 0;



  const plannedEducation =
    educations.filter(
      (e)=>e.status==="예정"
    ).length;


  const completeEducation =
    educations.filter(
      (e)=>e.status==="완료"
    ).length;



  return (

    <main className="min-h-screen bg-neutral-100 p-10">


      <h1 className="text-4xl font-bold">
        통계
      </h1>


      <p className="mt-2 text-neutral-500">
        업무 현황을 분석합니다.
      </p>



      <div className="mt-10 grid gap-6 md:grid-cols-3">


        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-neutral-500">
            총 계약금액
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {totalAmount.toLocaleString()}원
          </h2>
        </div>


        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-neutral-500">
            평균 진행률
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {averageProgress}%
          </h2>
        </div>


        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-neutral-500">
            전체 교육
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {educations.length}건
          </h2>
        </div>


      </div>




      <div className="mt-10 grid gap-6 md:grid-cols-2">


        <div className="rounded-2xl bg-white p-6 shadow">

          <h2 className="text-xl font-bold">
            용역 현황
          </h2>


          <p className="mt-4">
            진행중 {activeProjects}건
          </p>


          <p className="mt-2">
            완료 {completeProjects}건
          </p>


          <div className="mt-5 h-3 rounded-full bg-neutral-200">

            <div
              className="h-3 rounded-full bg-green-700"
              style={{
                width:`${
                  projects.length
                    ? (completeProjects/projects.length)*100
                    : 0
                }%`
              }}
            />

          </div>

        </div>




        <div className="rounded-2xl bg-white p-6 shadow">


          <h2 className="text-xl font-bold">
            교육 현황
          </h2>


          <p className="mt-4">
            예정 {plannedEducation}건
          </p>


          <p className="mt-2">
            완료 {completeEducation}건
          </p>


        </div>



      </div>


    </main>

  );

}