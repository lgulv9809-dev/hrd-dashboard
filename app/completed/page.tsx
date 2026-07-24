"use client";

import { useProjects } from "@/context/ProjectContext";
import ProjectCard from "@/components/ProjectCard";



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







export default function CompletedPage() {


  const { projects } = useProjects();



  const completedProjects =

    projects.filter(

      (project)=>
        project.status === "완료"

    );







  return (


    <main className="min-h-screen bg-neutral-100 p-10">



      <div className="mb-10">



        <h1 className="text-4xl font-bold">
          완료과정관리
        </h1>



        <p className="mt-2 text-neutral-500">
          완료된 용역 목록입니다.
        </p>



        <p className="mt-3 font-bold text-green-800">

          완료된 용역은 {completedProjects.length}건입니다.

        </p>



      </div>







      {
        completedProjects.length === 0 ? (


          <div className="rounded-xl bg-white p-10 text-center text-neutral-500 shadow">

            완료된 용역이 없습니다.

          </div>



        )

        :

        (



          <div className="flex flex-col gap-5">



            {
              completedProjects.map((project)=>(


                <ProjectCard


                  key={project.id}


                  id={project.id}


                  name={project.name}


                  client={project.client}


                  amount={project.amount}


                  status={project.status}


                  courses={project.courses}



          


                  annual={

                    project.annual ?? false

                  }



                  multiRound={

                    project.multiRound ?? false

                  }



                 startDate={

  project.startDate ?? ""

}


endDate={

  project.endDate ?? ""

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