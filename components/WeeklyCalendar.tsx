"use client";

import { useEffect, useState } from "react";
import { useProjects } from "@/context/ProjectContext";


type PersonalSchedule = {
  id:number;
  date:string;
  title:string;
};



export default function WeeklyCalendar(){


  const { projects } = useProjects();



  const [currentDate,setCurrentDate] =
    useState(new Date());



  const [schedules,setSchedules] =
    useState<PersonalSchedule[]>([]);



  const [newTitle,setNewTitle] =
    useState("");



  const [selectedDate,setSelectedDate] =
    useState("");






  useEffect(()=>{


    const saved =
      localStorage.getItem(
        "personalSchedules"
      );


    if(saved){

      setSchedules(
        JSON.parse(saved)
      );

    }


  },[]);







  useEffect(()=>{


    localStorage.setItem(

      "personalSchedules",

      JSON.stringify(schedules)

    );


  },[schedules]);








  const days = [
    "월",
    "화",
    "수",
    "목",
    "금"
  ];








  const dates = days.map((_,index)=>{


    const date =
      new Date(currentDate);



    const day =
      currentDate.getDay();



    const monday =
      currentDate.getDate()
      -
      day
      +
      (day === 0 ? -6 : 1);



    date.setDate(
      monday + index
    );


    return date;


  });








  // TO DO 모으기

  const todos = projects.flatMap(project =>


    project.courses?.flatMap(course =>


      course.todos?.map(todo=>({


        ...todo,


        courseName:course.name,


        projectName:project.name


      })) || []


    ) || []


  );









  const moveWeek=(amount:number)=>{


    const date =
      new Date(currentDate);


    date.setDate(
      date.getDate()+amount
    );


    setCurrentDate(date);


  };










  const addSchedule=()=>{


    if(!newTitle || !selectedDate)
      return;



    setSchedules(prev=>[

      ...prev,

      {

        id:Date.now(),

        date:selectedDate,

        title:newTitle

      }

    ]);



    setNewTitle("");

    setSelectedDate("");

  };









  return (


    <div className="rounded-2xl bg-white p-6 shadow">





      <div className="mb-5 flex items-center justify-between">



        <h2 className="text-2xl font-bold">

          주간 일정

        </h2>




        <div className="flex gap-2">


          <button

            onClick={()=>moveWeek(-7)}

            className="rounded-lg bg-neutral-200 px-3 py-2"

          >

            ◀

          </button>



          <button

            onClick={()=>moveWeek(7)}

            className="rounded-lg bg-neutral-200 px-3 py-2"

          >

            ▶

          </button>



        </div>


      </div>









      <div className="grid grid-cols-5 gap-3">



        {
          days.map((day,index)=>(


            <div

              key={day}

              className="min-h-[180px] rounded-xl border p-4"

            >



              <p className="font-bold">

                {day}

              </p>




              <p className="mt-2 text-neutral-500">

                {dates[index].getMonth()+1}월{" "}

                {dates[index].getDate()}일

              </p>









              <div className="mt-4 space-y-2">





              {/* 과정 TO DO */}

              {

                todos.filter(todo=>{


                  if(!todo.startDate)
                    return false;



                  const todoDate =
                    new Date(todo.startDate);



                  return (

                    todoDate.getDate()
                    ===
                    dates[index].getDate()

                    &&

                    todoDate.getMonth()
                    ===
                    dates[index].getMonth()

                  );


                })

                .map(todo=>(


                  <div

                    key={todo.id}

                    className="rounded-lg bg-green-100 p-2 text-sm"

                  >

                    <p className="font-bold">

                      {todo.title}

                    </p>


                    <p className="text-xs text-neutral-600">

                      {todo.courseName}

                    </p>


                  </div>


                ))

              }









              {/* 직접 추가 일정 */}

              {

                schedules

                .filter(schedule=>{


                  const date =
                    new Date(schedule.date);



                  return (

                    date.getDate()
                    ===
                    dates[index].getDate()

                    &&

                    date.getMonth()
                    ===
                    dates[index].getMonth()

                  );


                })


                .map(schedule=>(


                  <div

                    key={schedule.id}

                    className="rounded-lg bg-pink-100 p-2 text-sm"

                  >

                    <p className="font-bold text-pink-700">

                      {schedule.title}

                    </p>


                  </div>


                ))

              }



              </div>



            </div>


          ))

        }


      </div>








      {/* 개인 일정 추가 */}


      <div className="mt-6 rounded-xl bg-neutral-50 p-4">


        <p className="mb-3 font-bold">

          개인 일정 추가

        </p>



        <div className="flex gap-3">


          <input

            type="date"

            value={selectedDate}

            onChange={(e)=>setSelectedDate(e.target.value)}

            className="rounded-lg border p-2"

          />



          <input

            value={newTitle}

            onChange={(e)=>setNewTitle(e.target.value)}

            placeholder="예) 연차, 팀점, 외근"

            className="flex-1 rounded-lg border p-2"

          />



          <button

            onClick={addSchedule}

             className="rounded-lg bg-green-800 px-5 text-white hover:bg-green-700"

          >

            추가

          </button>



        </div>


      </div>





    </div>


  );


}