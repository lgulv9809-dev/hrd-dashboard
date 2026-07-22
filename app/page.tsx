"use client";

import { useProjects } from "@/context/ProjectContext";
import { useTodos } from "@/context/TodoContext";

import SummaryCard from "@/components/SummaryCard";
import TodoList from "@/components/TodoList";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import DataBackup from "@/components/DataBackup";



export default function Home() {

  const { projects } = useProjects();
  const { todos } = useTodos();
  

  // ==========================
  // 총 계약 금액
  // ==========================

  const totalAmount = projects.reduce(
    (sum, project) => sum + project.amount,
    0
  );

  // ==========================
  // 준비중인 과정
  // ==========================

  const activeCourses = projects.reduce(

    (count, project) =>

      count +

      (project.courses?.filter(course => {

        if (!course.todos || course.todos.length === 0) {
          return false;
        }

        return course.todos.some(todo => !todo.completed);

      }).length || 0),

    0

  );

// ==========================
// 오늘 진행중인 과정
// ==========================


const todayCourses = projects.flatMap(project =>

  project.courses?.filter(course => {

    if(!course.startDate || !course.endDate)
      return false;


    const start = new Date(course.startDate);

    const end = new Date(course.endDate);


    return (
      today >= start &&
      today <= end
    );

  }).map(course=>({

    ...course,

    projectName: project.name

  })) || []

);


const todayCourseNames =
  todayCourses.map(course => course.name);

  // ==========================
  // 이번주 업무시간 계산
  // ==========================

  const today = new Date();

  const day = today.getDay();

  const monday = new Date(today);

  monday.setDate(
    today.getDate() - (day === 0 ? 6 : day - 1)
  );

  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);

  sunday.setDate(monday.getDate() + 6);

  sunday.setHours(23, 59, 59, 999);

  const weeklyHours = projects.reduce(

    (sum, project) =>

      sum +

      (project.courses?.reduce(

        (courseSum, course) =>

          courseSum +

          (course.todos?.reduce(

            (todoSum, todo) => {

             if (
  !todo.completed ||
  !todo.startDate
) {
  return todoSum;
}

              const todoDate = new Date(todo.startDate);

              if (
                todoDate >= monday &&
                todoDate <= sunday
              ) {

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
 const personalHours =
  todos
    .filter(todo => {

  if(!todo.done)
    return false;


  if(!todo.date)
    return false;


  const todoDate = new Date(todo.date);


  return (
    todoDate >= monday &&
    todoDate <= sunday
  );

})
    .reduce(
      (sum, todo)=>
        sum + (todo.hours || 0),
      0
    );
  // ==========================
  // 업무 부하량
  // ==========================
const totalHours =
  weeklyHours + personalHours;
  const workload = Math.min(

    Math.round((totalHours / 40) * 100),

    100

  );

  let workloadColor = "text-green-600";

  if (workload >= 80) {

    workloadColor = "text-red-600";

  } else if (workload >= 50) {

    workloadColor = "text-yellow-500";

  }

  return (

    <main className="min-h-screen bg-neutral-100">

      <div className="flex-1 p-6">

        <div className="mb-6">

          

          <h1 className="text-3xl font-bold text-neutral-900">

            IM 업무 생산성 지표 관리 (가을)

          </h1>
          
          <DataBackup />

          <p className="mt-2 text-neutral-500">

            아자아자 👋

          </p>

        </div>

        {/* 요약 카드 */}

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
  title="오늘 진행중인 과정"
  value={
    todayCourseNames.length > 0
    ? todayCourseNames.join(", ")
    : "없음"
  }
/>

          <SummaryCard
            title="업무 부하량"
            value={`${workload}%`}
            sub={`${totalHours}시간 / 40시간`}
            color={workloadColor}
          />

        </div>

        {/* 주간 일정 */}

        <div className="mb-8">

          <WeeklyCalendar />

        </div>

        {/* 오늘 해야 할 일 */}

        <TodoList />

      </div>

    </main>

  );

}