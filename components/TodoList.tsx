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
    updateTodo
  } = useProjects();



  const [text,setText] = useState("");


  const [editingId,setEditingId] =
  useState<number|null>(null);


  const [editText,setEditText] =
  useState("");



  const [editingPersonalId,setEditingPersonalId] =
  useState<number|null>(null);


  const [editPersonalText,setEditPersonalText] =
  useState("");




  const handleAdd=()=>{


    if(!text.trim())
      return;


    addTodo({

      id:Date.now(),

      text,

      done:false

    });


    setText("");

  };







  const today = new Date();

  today.setHours(0,0,0,0);





  // 개인 Todo
  const visiblePersonalTodos =
  todos.filter(todo=>{

    if(todo.done)
      return false;

    return true;

  });






  // 과정 Todo

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







  // 날짜순 정렬

  projectTodos.sort((a,b)=>{


    const aDate =
    a.startDate
    ?
    new Date(a.startDate).getTime()
    :
    Infinity;


    const bDate =
    b.startDate
    ?
    new Date(b.startDate).getTime()
    :
    Infinity;


    return aDate-bDate;


  });






return (

<div className="mt-10 rounded-2xl bg-white p-6 shadow-sm border border-neutral-200">


<h2 className="text-xl font-bold">

오늘 해야 할 일

</h2>





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

projectTodos.map(todo=>(


<div

key={todo.id}

className="rounded-lg bg-green-50 p-4"

>


<div className="flex justify-between items-center">


<div className="flex items-center gap-3">



<input

type="checkbox"

checked={todo.completed}

onChange={()=>updateTodo(

todo.projectId,

todo.courseId,

{

...todo,

completed:!todo.completed

}

)}

/>






{

editingId===todo.id ? (


<div className="flex gap-2">


<input

className="rounded border px-2 py-1"

value={editText}

onChange={(e)=>
setEditText(e.target.value)
}

/>


<button

className="rounded bg-green-700 px-3 py-1 text-sm text-white"

onClick={()=>{


updateTodo(

todo.projectId,

todo.courseId,

{

...todo,

title:editText

}

);


setEditingId(null);


}}

>

저장

</button>


</div>


)


:


(


<div>


<p className="font-bold">

{todo.title}

</p>



<p className="text-sm text-neutral-500">

{todo.projectName}

{" / "}

{todo.courseName}

</p>



{

todo.startDate && (

<p className="text-xs text-neutral-400">

마감 : {todo.startDate}

</p>

)

}



</div>


)


}


</div>







{

editingId!==todo.id && (


<button

onClick={()=>{

setEditingId(todo.id);

setEditText(todo.title);

}}

className="rounded bg-blue-600 px-3 py-1 text-sm text-white"

>

수정

</button>


)

}



</div>


</div>


))


}









{

visiblePersonalTodos.length===0 &&
projectTodos.length===0 && (


<p className="text-neutral-500">

등록된 업무가 없습니다.

</p>


)

}



</div>









{/* 개인 업무 추가 */}


<div className="mt-6 flex gap-3 border-t pt-5">


<input

className="flex-1 rounded-lg border p-3"

placeholder="새 업무 입력"

value={text}

onChange={(e)=>
setText(e.target.value)
}

onKeyDown={(e)=>{

if(e.key==="Enter")
handleAdd();

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