"use client";

import { useProjects } from "@/context/ProjectContext";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";



function calculateCourseDifficulty(todos:any[]) {

  const count =
    todos?.length || 0;


  if(count >= 15){
    return "상";
  }


  if(count >= 5){
    return "중";
  }


  return "하";

}







function calculateProjectDifficulty(courses:any[]) {


  const highCourses =

    courses?.filter(

      (course)=>
        calculateCourseDifficulty(course.todos) === "상"

    ).length || 0;




  if(highCourses >= 3){
    return "상";
  }






  if(highCourses >= 1){
    return "중";
  }






  return "하";


}









export default function ProjectsPage() {


  const { projects } =
    useProjects();






  const activeProjects =

    projects.filter(

      (project)=>
        project.status !== "완료"

    );









  return (


    <main className="min-h-screen bg-neutral-100 p-8">





      <div className="mb-8">





        <h1 className="text-3xl font-bold">

          나의 과정

        </h1>






        <p className="mt-2 text-neutral-500">

          진행 중인 용역과 프로젝트를 관리합니다.

        </p>








        <Link


          href="/projects/new"


          className="mt-5 inline-block rounded-lg bg-green-800 px-5 py-3 text-white hover:bg-green-700"


        >

          + 신규 용역 등록


        </Link>






      </div>









      {
        activeProjects.length === 0 ? (



          <div className="rounded-xl bg-white p-10 text-center text-neutral-500 shadow">


            진행 중인 용역이 없습니다.


          </div>



        )



        :



        (



          <div className="flex flex-col gap-5">






            {
              activeProjects.map((project)=>(






                <ProjectCard



                  key={project.id}



                  id={project.id}



                  name={project.name}



                  client={project.client}



                  amount={project.amount}



                  status={project.status}



                  courses={project.courses}



                  difficulty={

                    calculateProjectDifficulty(
                      project.courses
                    )

                  }





                  annual={

                    project.annual ?? false

                  }





                  multiRound={

                    project.multiRound ?? false

                  }





                  startMonth={

                    project.startMonth ?? ""

                  }





                  endMonth={

                    project.endMonth ?? ""

                  }





                />





              ))

            }







          </div>





        )

      }






    </main>


  );

}