"use client";

import { useState } from "react";
import { useTodos } from "@/context/TodoContext";
import { useProjects } from "@/context/ProjectContext";


export default function TodoList() {


  const {
    todos,
    addTodo,
    updateTodo:updatePersonalTodo,
    deleteTodo
  } = useTodos();



 const {
  projects,
  addTodo: addProjectTodo,
  updateTodo,
  deleteTodo: deleteProjectTodo
} = useProjects();



  const [text,setText] = useState("");


  const [selectedDate,setSelectedDate] =
  useState(new Date());



  const [editingId,setEditingId] =
  useState<number|null>(null);


  const [editText,setEditText] =
  useState("");



  const [editingPersonalId,setEditingPersonalId] =
  useState<number|null>(null);


  const [editPersonalText,setEditPersonalText] =
  useState("");

  const [selectedCourse, setSelectedCourse] =
useState("");

const [editingProjectTodo, setEditingProjectTodo] =
useState<number | null>(null);

const [editProjectText, setEditProjectText] =
useState("");





  const moveDate=(amount:number)=>{

    const date = new Date(selectedDate);

    date.setDate(
      date.getDate()+amount
    );

    setSelectedDate(date);

  };







  const handleAdd = () => {

  if (!text.trim()) return;

  // 과정을 선택하지 않은 경우 → 개인 Todo
  if (selectedCourse === "") {

    addTodo({
      id: Date.now(),
      text,
      done: false,
    });

  } else {

    const [projectId, courseId] =
      selectedCourse.split("-").map(Number);

    addProjectTodo(
      projectId,
      courseId,
      {
        id: Date.now(),
        title: text,
        completed: false,
        difficulty: "보통",
        hours: 1,
        startDate: selectedDate.toISOString().slice(0, 10),
        endDate: selectedDate.toISOString().slice(0, 10),
      }
    );

  }

  setText("");
  setSelectedCourse("");

};







  // 개인 Todo

  const visiblePersonalTodos =
  todos.filter(todo=>{

    if(todo.done)
      return false;


    return true;

  });









  // 과정 Todo 전체

  const projectTodos = projects.flatMap(project =>


    project.courses?.flatMap(course =>


      course.todos

      ?.filter(todo=>{


        if(todo.completed)
          return false;


        return true;


      })


      .map(todo=>({


        ...todo,


        projectName:project.name,


        courseName:course.name,


        projectId:project.id,


        courseId:course.id


      })) || []


    ) || []


  );









  // 선택 날짜 Todo만

  const filteredProjectTodos =
  projectTodos.filter(todo=>{


    if(!todo.startDate)
      return false;



    const todoDate =
    new Date(todo.startDate);



    return (

      todoDate.getFullYear()
      ===
      selectedDate.getFullYear()

      &&

      todoDate.getMonth()
      ===
      selectedDate.getMonth()

      &&

      todoDate.getDate()
      ===
      selectedDate.getDate()

    );


  });






  filteredProjectTodos.sort((a,b)=>{


    return new Date(a.startDate).getTime()
    -
    new Date(b.startDate).getTime();


  });






return (

<div className="mt-10 rounded-2xl bg-white p-6 shadow-sm border border-neutral-200">



<div className="flex items-center justify-between">


<h2 className="text-xl font-bold">

{selectedDate.getMonth()+1}월 {selectedDate.getDate()}일 할 일

</h2>



<div className="flex gap-2">


<button

onClick={()=>moveDate(-1)}

className="rounded-lg bg-neutral-200 px-3 py-1"

>

◀

</button>



<button

onClick={()=>moveDate(1)}

className="rounded-lg bg-neutral-200 px-3 py-1"

>

▶

</button>



</div>


</div>







<div className="mt-6 space-y-4">







{/* 개인 Todo */}


{

visiblePersonalTodos.map(todo=>(


<div

key={todo.id}

className="flex items-center justify-between rounded-lg bg-neutral-50 p-4"

>


{

editingPersonalId===todo.id ? (


<div className="flex gap-2">


<input

className="rounded border px-2 py-1"

value={editPersonalText}

onChange={(e)=>
setEditPersonalText(e.target.value)
}

/>


<button

className="rounded bg-green-700 px-3 py-1 text-sm text-white"

onClick={()=>{


updatePersonalTodo(

todo.id,

editPersonalText

);


setEditingPersonalId(null);


}}

>

저장

</button>


</div>


)

:

(

<span>

{todo.text}

</span>

)

}





<div className="flex gap-2">


{

editingPersonalId!==todo.id && (


<button

onClick={()=>{

setEditingPersonalId(todo.id);

setEditPersonalText(todo.text);

}}

className="rounded bg-blue-600 px-3 py-1 text-sm text-white"

>

수정

</button>


)

}



<button

onClick={()=>deleteTodo(todo.id)}

className="rounded bg-red-600 px-3 py-1 text-sm text-white"

>

삭제

</button>


</div>


</div>


))

}









{/* 과정 Todo */}

{
filteredProjectTodos.map((todo)=>(

<div
key={todo.id}
className="rounded-lg bg-green-50 p-4"
>

<div className="flex items-center justify-between">

<div className="flex items-center gap-3">

<input
type="checkbox"
checked={todo.completed}
onChange={()=>{

updateTodo(
todo.projectId,
todo.courseId,
{
...todo,
completed:!todo.completed
}

);

}}
/>

<div>

{
editingProjectTodo===todo.id ?

<div className="flex gap-2">

<input
className="rounded border px-2 py-1"
value={editProjectText}
onChange={(e)=>
setEditProjectText(e.target.value)
}
/>

<button
className="rounded bg-green-700 px-3 py-1 text-white text-sm"
onClick={()=>{

updateTodo(
todo.projectId,
todo.courseId,
{
...todo,
title:editProjectText
}
);

setEditingProjectTodo(null);

}}
>

저장

</button>

</div>

:

<>

<p className="font-bold">

{todo.title}

</p>

<p className="text-sm text-neutral-500">

{todo.projectName} / {todo.courseName}

</p>

<p className="text-xs text-neutral-400">

{todo.startDate}

</p>

</>

}

</div>

</div>

<div className="flex gap-2">

{
editingProjectTodo!==todo.id &&

<button
className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
onClick={()=>{

setEditingProjectTodo(todo.id);
setEditProjectText(todo.title);

}}
>

수정

</button>

}

<button
className="rounded bg-red-600 px-3 py-1 text-sm text-white"
onClick={()=>{

if(confirm("삭제하시겠습니까?")){

deleteProjectTodo(
todo.projectId,
todo.courseId,
todo.id
);

}

}}
>

삭제

</button>

</div>

</div>

</div>

))
}









{

visiblePersonalTodos.length===0 &&
filteredProjectTodos.length===0 && (


<p className="text-neutral-500">

해당 날짜의 업무가 없습니다.

</p>


)

}



</div>








{/* 개인 업무 추가 */}


<div className="mt-6 border-t pt-5 space-y-3">

<select
  className="w-full rounded-lg border p-3"
  value={selectedCourse}
  onChange={(e) => setSelectedCourse(e.target.value)}
>
  <option value="">개인 할 일</option>

  {projects.flatMap(project =>
    project.courses.map(course => (
      <option
        key={`${project.id}-${course.id}`}
        value={`${project.id}-${course.id}`}
      >
        {project.name} / {course.name}
      </option>
    ))
  )}
</select>

<div className="flex gap-3">

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





</div>


);


}