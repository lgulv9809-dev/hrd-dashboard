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



  const [openDate,setOpenDate] =
    useState<string|null>(null);



  const [modalTitle,setModalTitle] =
    useState("");





  // 저장된 개인 일정 불러오기
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




  // 개인 일정 저장
  useEffect(()=>{

    localStorage.setItem(
      "personalSchedules",
      JSON.stringify(schedules)
    );

  },[schedules]);






  const days=[
    "월",
    "화",
    "수",
    "목",
    "금"
  ];







  // 현재 주 날짜 계산

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
      (day===0 ? -6 : 1);



    date.setDate(
      monday + index
    );


    return date;

  });








  // 과정 데이터

  const weeklyCourses =
    projects.flatMap(project =>


      project.courses?.map(course=>({

        ...course,

        projectName:
          project.name

      })) || []


    );








  const moveWeek=(amount:number)=>{


    const date =
      new Date(currentDate);


    date.setDate(
      date.getDate()+amount
    );


    setCurrentDate(date);

  };








  // 개인 일정 추가

  const addSchedule=()=>{


    if(!newTitle.trim() || !selectedDate)
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








  const addModalSchedule=()=>{


    if(!openDate || !modalTitle.trim())
      return;



    setSchedules(prev=>[

      ...prev,

      {

        id:Date.now(),

        date:openDate,

        title:modalTitle

      }

    ]);


    setModalTitle("");

  };








  const updateSchedule=(id:number,title:string)=>{


    setSchedules(prev=>

      prev.map(schedule=>


        schedule.id===id

        ?

        {

          ...schedule,

          title

        }

        :

        schedule


      )

    );

  };








  const deleteSchedule=(id:number)=>{


    setSchedules(prev=>

      prev.filter(
        schedule=>
        schedule.id!==id
      )

    );

  };









  return (

    <div className="rounded-2xl bg-white p-6 shadow">


      <div className="mb-5 flex justify-between items-center">


        <h2 className="text-2xl font-bold">
          주간 일정
        </h2>



        <div className="flex gap-2">


          <button

          onClick={()=>moveWeek(-7)}

          className="rounded bg-neutral-200 px-3 py-2"

          >
            ◀
          </button>



          <button

          onClick={()=>moveWeek(7)}

          className="rounded bg-neutral-200 px-3 py-2"

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

        onDoubleClick={()=>{


          const date =

          `${dates[index].getFullYear()}-${

            String(
              dates[index].getMonth()+1
            ).padStart(2,"0")

          }-${

            String(
              dates[index].getDate()
            ).padStart(2,"0")

          }`;


          setOpenDate(date);


        }}


        className="min-h-[180px] cursor-pointer rounded-xl border p-4"

        >



          <p className="font-bold">
            {day}
          </p>


          <p className="mt-2 text-neutral-500">

            {dates[index].getMonth()+1}월{" "}
            {dates[index].getDate()}일

          </p>





          <div className="mt-4 space-y-2"></div>


                   {/* 진행 과정 표시 */}

            {
            weeklyCourses

            .filter(course=>{


              if(
                !course.startDate ||
                !course.endDate
              )
              return false;



              const start =
                new Date(course.startDate);


              const end =
                new Date(course.endDate);



              const target =
                new Date(dates[index]);



              start.setHours(0,0,0,0);

              target.setHours(0,0,0,0);

              end.setHours(23,59,59,999);




              return (

                target >= start

                &&

                target <= end

              );


            })


            .map(course=>(


              <div

              key={course.id}

              className="rounded-lg bg-green-100 p-2 text-sm"

              >


                <p className="font-bold">

                  {course.name}

                </p>


                <p className="text-xs text-neutral-600">

                  {course.projectName}

                </p>


              </div>


            ))


            }





            {/* 개인 일정 표시 */}


            {

            schedules

            .filter(schedule=>{


              const scheduleDate =
                new Date(schedule.date);



              return (


                scheduleDate.getFullYear()
                ===
                dates[index].getFullYear()


                &&


                scheduleDate.getMonth()
                ===
                dates[index].getMonth()


                &&


                scheduleDate.getDate()
                ===
                dates[index].getDate()



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


      


      ))

      }


      </div>













      {/* 날짜 더블클릭 관리 모달 */}


      {

      openDate && (


      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">


        <div className="w-96 rounded-xl bg-white p-6">


          <h3 className="text-xl font-bold">

            {openDate} 일정 관리

          </h3>






          <div className="mt-8 space-y-8">


          {

          schedules

          .filter(schedule=>

            schedule.date===openDate

          )


          .map(schedule=>(


            <div

            key={schedule.id}

            className="flex gap-2"

            >



              <input

              value={schedule.title}

              onChange={(e)=>

                updateSchedule(

                  schedule.id,

                  e.target.value

                )

              }

              className="flex-1 rounded border p-2"

              />




              <button

              onClick={()=>deleteSchedule(schedule.id)}

              className="rounded bg-red-600 px-3 text-white"

              >

              삭제

              </button>



            </div>


          ))


          }


          </div>






          <div className="mt-5 flex gap-2">


            <input

            value={modalTitle}

            onChange={(e)=>

              setModalTitle(e.target.value)

            }

            placeholder="새 일정"

            className="flex-1 rounded border p-2"

            />



            <button

            onClick={addModalSchedule}

            className="rounded bg-green-700 px-3 text-white"

            >

            추가

            </button>


          </div>








          <button

          onClick={()=>{

            setOpenDate(null);

            setModalTitle("");

          }}

          className="mt-5 w-full rounded bg-neutral-300 p-2"

          >

          닫기

          </button>



        </div>


      </div>


      )

      }













      {/* 개인 일정 빠른 추가 */}


      <div className="mt-6 rounded-xl bg-neutral-50 p-4">


        <p className="mb-3 font-bold">

          개인 일정 추가

        </p>



        <div className="flex gap-3">



          <input

          type="date"

          value={selectedDate}

          onChange={(e)=>

            setSelectedDate(e.target.value)

          }

          className="rounded border p-2"

          />





          <input

          value={newTitle}

          onChange={(e)=>

            setNewTitle(e.target.value)

          }

          placeholder="예) 연차, 팀점, 외근"

          className="flex-1 rounded border p-2"

          />






          <button

          onClick={addSchedule}

          className="rounded bg-green-800 px-5 text-white"

          >

          추가

          </button>




        </div>


      </div>





    </div>


  );

}   