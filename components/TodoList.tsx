"use client";

import { useState } from "react";
import { useTodos } from "@/context/TodoContext";


export default function TodoList() {

  const { todos, addTodo, deleteTodo } = useTodos();

  const [text, setText] = useState("");


  const handleAdd = () => {

    if (!text.trim()) return;


    addTodo({
      id: Date.now(),
      text,
      done: false,
    });


    setText("");

  };


  return (

    <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm border border-neutral-200">


      <h2 className="text-xl font-bold">
        오늘 해야 할 일
      </h2>



      <div className="mt-5 flex gap-3">


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




      <div className="mt-6 space-y-3">


        {todos.map((todo)=>(

          <div
            key={todo.id}
            className="flex items-center justify-between rounded-lg bg-neutral-50 p-4"
          >

            <span>
              {todo.text}
            </span>


            <button
              onClick={()=>
                deleteTodo(todo.id)
              }
              className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white"
            >
              삭제
            </button>


          </div>

        ))}


        {todos.length===0 && (

          <p className="text-neutral-500">
            등록된 업무가 없습니다.
          </p>

        )}


      </div>


    </div>

  );
}