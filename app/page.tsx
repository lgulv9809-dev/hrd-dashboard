"use client";

import { useProjects } from "@/context/ProjectContext";
import { useEducations } from "@/context/EducationContext";

import SummaryCard from "@/components/SummaryCard";
import TodoList from "@/components/TodoList";
import WeeklyCalendar from "@/components/WeeklyCalendar";



export default function Home() {


  const { projects } = useProjects();
  const { educations } = useEducations();






  const totalAmount = projects.reduce(
    (sum, project) => sum + project.amount,
    0
  );







  // 미완료 TO DO가 있는 과정 수

  const activeCourses = projects.reduce(

    (count, project) =>

      count +

      (project.courses?.filter(course => {


        if(!course.todos || course.todos.length === 0){

          return false;

        }


        return course.todos.some(
          todo => !todo.completed
        );


      }).length || 0),


    0

  );









  // 예정 교육 일정

  const upcomingEducations = educations.filter(

    (education)=>

      (education.progress || 0) < 100

  );









  // ==========================
  // 금주 업무 부하량 계산
  // ==========================


  const today = new Date();


  const day = today.getDay();


  const monday = new Date(today);


  monday.setDate(
    today.getDate() - (day === 0 ? 6 : day - 1)
  );


  monday.setHours(0,0,0,0);



  const sunday = new Date(monday);


  sunday.setDate(
    monday.getDate() + 6
  );


  sunday.setHours(23,59,59,999);







  const weeklyHours = projects.reduce(


    (sum, project)=>


      sum +


      (project.courses?.reduce(


        (courseSum, course)=>


          courseSum +


          (course.todos?.reduce(


            (todoSum,todo)=>{


              if(
                todo.completed ||
                !todo.startDate
              ){

                return todoSum;

              }




              const todoDate =
                new Date(todo.startDate);





              if(
                todoDate >= monday &&
                todoDate <= sunday
              ){

                return todoSum + (todo.hours || 0);

              }




              return todoSum;



            },


            0


          ) || 0),



        0


      ) || 0),



    0


  );








  // 40시간 기준 업무 부하량

  const workload = Math.min(


    Math.round(

      (weeklyHours / 40) * 100

    ),


    100


  );









  return (


    <main className="min-h-screen bg-neutral-100">


      <div className="flex-1 p-6">





        <div className="mb-6">


          <h1 className="text-3xl font-bold text-neutral-900">

            IM 업무 생산성 지표 관리 (가을)

          </h1>



          <p className="mt-2 text-neutral-500">

            아자아자 👋

          </p>


        </div>









        {/* 요약 대시보드 */}


        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">





          <SummaryCard

            title="총 금액"

            value={`${totalAmount.toLocaleString()}원`}

          />






          <SummaryCard

            title="준비중인 과정"

            value={`${activeCourses}건`}

          />






          <SummaryCard

            title="예정된 교육 일정"

            value={`${upcomingEducations.length}건`}

          />






          <SummaryCard

            title="업무 부하량"

            value={`${workload}%`}

          />





        </div>









        {/* 주간 캘린더 */}


        <div className="mb-8">


          <WeeklyCalendar />


        </div>









        {/* 오늘 해야 할 일 */}


        <TodoList />





      </div>


    </main>


  );

}