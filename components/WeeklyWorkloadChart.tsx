"use client";

import { useState } from "react";
import { useProjects } from "@/context/ProjectContext";
import { useTodos } from "@/context/TodoContext";


export default function WeeklyWorkloadChart(){


  const { projects } = useProjects();

  const { todos } = useTodos();


  const [weekOffset,setWeekOffset] = useState(0);



  const today = new Date();


  const monday = new Date(today);


  monday.setDate(
    today.getDate()
    - (today.getDay() === 0 ? 6 : today.getDay() - 1)
    + (weekOffset * 7)
  );





  const days = [

    {
      name:"월",
      value:0,
      hours:0,
    },

    {
      name:"화",
      value:0,
      hours:0,
    },

    {
      name:"수",
      value:0,
      hours:0,
    },

    {
      name:"목",
      value:0,
      hours:0,
    },

    {
      name:"금",
      value:0,
      hours:0,
    }

  ];





  days.forEach((day,index)=>{


    const targetDate = new Date(monday);


    targetDate.setDate(
      monday.getDate()+index
    );



    const dateString =
      targetDate.toISOString().split("T")[0];



    let hours = 0;




    // 프로젝트 업무 시간

    projects.forEach(project=>{


      project.courses?.forEach(course=>{


        course.todos?.forEach(todo=>{


          if(
            todo.startDate === dateString
          ){

            hours += todo.hours || 0;

          }


        });


      });


    });





    // 개인 업무 시간

    todos.forEach(todo=>{


      if(
        todo.date === dateString &&
        todo.done
      ){

        hours += todo.hours || 0;

      }


    });





    day.hours = hours;



    // 하루 8시간 기준

    day.value =
      Math.min(
        Math.round((hours / 8) * 100),
        100
      );



  });








  return (


    <div className="rounded-2xl bg-white p-6 shadow">



      <div className="mb-6 flex justify-between items-center">


        <h2 className="text-xl font-bold">
          주간 업무 부하량
        </h2>



        <div className="flex gap-2">


          <button

            onClick={()=>
              setWeekOffset(prev=>prev-1)
            }

            className="rounded bg-neutral-200 px-3 py-1"

          >

            ◀

          </button>




          <button

            onClick={()=>
              setWeekOffset(prev=>prev+1)
            }

            className="rounded bg-neutral-200 px-3 py-1"

          >

            ▶

          </button>


        </div>


      </div>







      <div className="grid grid-cols-5 gap-4">



        {
          days.map((day,index)=>{


            const date = new Date(monday);


            date.setDate(
              monday.getDate()+index
            );



            return (

              <div
                key={day.name}
              >



                <p className="mb-2 text-center font-bold">

                  {day.name}

                </p>





                <div

                  className="
                  flex
                  h-48
                  items-end
                  justify-center
                  rounded
                  bg-neutral-100
                  "

                >



                  <div


                    className="
                    relative
                    w-full
                    rounded-t
                    bg-green-700
                    "

                    style={{

                      height:`${day.value}%`

                    }}


                  >



                    <span


                      className="
                      absolute
                      -top-7
                      left-1/2
                      -translate-x-1/2
                      font-bold
                      "

                    >

                      {day.value}%

                    </span>



                  </div>



                </div>





                <p className="mt-2 text-center text-sm text-neutral-500">

                  {date.getMonth()+1}월 {date.getDate()}일

                </p>



                <p className="mt-1 text-center text-xs text-neutral-400">

                  {day.hours}시간

                </p>




              </div>


            );


          })
        }


      </div>





    </div>


  );

}