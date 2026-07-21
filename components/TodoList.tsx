"use client";

import { useState } from "react";
import { useTodos } from "@/context/TodoContext";
import { useProjects } from "@/context/ProjectContext";


export default function TodoList() {


  const {
    todos,
    addTodo,
    deleteTodo
  } = useTodos();


  const {
    projects,
    updateTodo
  } = useProjects();



  const [text,setText] = useState("");



  const handleAdd = ()=>{


    if(!text.trim())
      return;



    addTodo({

      id: Date.now(),

      text,

      done:false

    });



    setText("");

  };





  const today = new Date();



  const projectTodos = projects.flatMap(project =>


    project.courses?.flatMap(course =>


      course.todos?.filter(todo=>{


        if(!todo.startDate)
          return false;



        const todoDate =
          new Date(todo.startDate);



        return (

          todoDate.getDate()
          ===
          today.getDate()

          &&

          todoDate.getMonth()
          ===
          today.getMonth()

          &&

          todoDate.getFullYear()
          ===
          today.getFullYear()

        );


      }).map(todo=>({

        ...todo,

        projectName: project.name,

        courseName: course.name,

        projectId: project.id,

        courseId: course.id

      })) || []


    ) || []


  );




  return (

    <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm border border-neutral-200">


      <h2 className="text-xl font-bold">

        오늘 해야 할 일

      </h2>




      <div className="mt-6 space-y-3">



        {/* 직접 추가한 업무 */}

        {
          todos.map(todo=>(


            <div

            key={todo.id}

            className="flex items-center justify-between rounded-lg bg-neutral-50 p-4"

            >


              <span>

                {todo.text}

              </span>



              <button

              onClick={()=>deleteTodo(todo.id)}

              className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white"

              >

              삭제

              </button>


            </div>


          ))
        }






        {/* 과정별 TO DO */}

        {
          projectTodos.map(todo=>(


            <div

            key={todo.id}

            className="rounded-lg bg-green-50 p-4"

            >


              <label className="flex items-center gap-3">


                <input

                type="checkbox"

                checked={todo.completed}

                onChange={()=>updateTodo(

                  todo.projectId,

                  todo.courseId,

                  {

                    ...todo,

                    completed: !todo.completed

                  }

                )}

                />



                <div>


                  <p className="font-bold">

                    {todo.title}

                  </p>



                  <p className="text-sm text-neutral-500">

                    {todo.projectName}

                    {" / "}

                    {todo.courseName}

                  </p>


                </div>


              </label>


            </div>


          ))
        }






        {
          todos.length === 0 &&
          projectTodos.length === 0 && (

            <p className="text-neutral-500">

              등록된 업무가 없습니다.

            </p>

          )
        }




      </div>





      {/* 새 업무 추가 */}

      <div className="mt-6 flex gap-3 border-t pt-5">


        <input

        className="flex-1 rounded-lg border p-3"

        placeholder="새 업무 입력"

        value={text}

        onChange={(e)=>setText(e.target.value)}

        onKeyDown={(e)=>{

          if(e.key==="Enter"){

            handleAdd();

          }

        }}

        />



        <button

        onClick={handleAdd}

        className="rounded-lg bg-green-800 px-5 text-white"

        >

          추가

        </button>


      </div>



    </div>

  );

}