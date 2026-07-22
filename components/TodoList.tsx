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
  const [hours,setHours] = useState(1);


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
  const [editPersonalHours,setEditPersonalHours] =
useState(1);

  const [selectedCourse, setSelectedCourse] =
useState("");

const [editingProjectTodo, setEditingProjectTodo] =
useState<number | null>(null);

const [editProjectTodo, setEditProjectTodo] = useState({
  title: "",
  difficulty: "보통",
  hours: 1,
  startDate: "",
  endDate: "",
});





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
  hours: hours,
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
setHours(1);
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

const totalProjectHours =
filteredProjectTodos.reduce(
  (sum, todo) => sum + (todo.hours || 0),
  0
);

const totalPersonalHours =
visiblePersonalTodos.length;

const totalHours =
totalProjectHours + totalPersonalHours;

let hourColor = "text-green-700";

if (totalHours >= 7) {

  hourColor = "text-red-600";

} else if (totalHours >= 4) {

  hourColor = "text-yellow-600";

}


return (

<div className="mt-10 rounded-2xl bg-white p-6 shadow-sm border border-neutral-200">



<div className="flex items-center justify-between">


<h2 className="text-xl font-bold">

{selectedDate.getMonth()+1}월 {selectedDate.getDate()}일 할 일

</h2>

<p className={`mt-2 font-semibold ${hourColor}`}>

🕒 오늘 예상 업무시간 : {totalHours}시간

</p>

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
<input
  type="number"
  min="1"
  className="w-20 rounded border px-2 py-1"
  value={editPersonalHours}
  onChange={(e)=>
    setEditPersonalHours(Number(e.target.value))
  }
/>

<button

className="rounded bg-green-700 px-3 py-1 text-sm text-white"

onClick={()=>{


updatePersonalTodo(

todo.id,

editPersonalText,

editPersonalHours

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

<span className="ml-2 text-sm text-neutral-500">
({todo.hours || 0}시간)
</span>

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

setEditPersonalHours(todo.hours || 1);

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
    title: editProjectTodo.title,
    difficulty: editProjectTodo.difficulty,
    hours: editProjectTodo.hours,
    startDate: editProjectTodo.startDate,
    endDate: editProjectTodo.endDate,
  }
);

}}
/>

<div>

{
editingProjectTodo===todo.id ?

<div className="space-y-3">

  <input
    className="w-full rounded border p-2"
    placeholder="업무명"
    value={editProjectTodo.title}
    onChange={(e)=>
      setEditProjectTodo({
        ...editProjectTodo,
        title:e.target.value
      })
    }
  />

  <div className="grid grid-cols-2 gap-2">

    <select
      className="rounded border p-2"
      value={editProjectTodo.difficulty}
      onChange={(e)=>
        setEditProjectTodo({
          ...editProjectTodo,
          difficulty:e.target.value
        })
      }
    >
      <option value="하">하</option>
      <option value="보통">보통</option>
      <option value="상">상</option>
    </select>

    <input
      type="number"
      className="rounded border p-2"
      value={editProjectTodo.hours}
      onChange={(e)=>
        setEditProjectTodo({
          ...editProjectTodo,
          hours:Number(e.target.value)
        })
      }
    />

  </div>

  <div className="grid grid-cols-2 gap-2">

    <input
      type="date"
      className="rounded border p-2"
      value={editProjectTodo.startDate}
      onChange={(e)=>
        setEditProjectTodo({
          ...editProjectTodo,
          startDate:e.target.value
        })
      }
    />

    <input
      type="date"
      className="rounded border p-2"
      value={editProjectTodo.endDate}
      onChange={(e)=>
        setEditProjectTodo({
          ...editProjectTodo,
          endDate:e.target.value
        })
      }
    />

  </div>

  <div className="flex gap-2">

    <button
      className="rounded bg-green-700 px-3 py-2 text-white"
      onClick={()=>{

        updateTodo(
          todo.projectId,
          todo.courseId,
          {
            ...todo,
            ...editProjectTodo
          }
        );

        setEditingProjectTodo(null);

      }}
    >
      저장
    </button>

    <button
      className="rounded bg-gray-500 px-3 py-2 text-white"
      onClick={()=>{
        setEditingProjectTodo(null);
      }}
    >
      취소
    </button>

  </div>

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

setEditProjectTodo({
  title: todo.title,
  difficulty: todo.difficulty,
  hours: todo.hours,
  startDate: todo.startDate,
  endDate: todo.endDate,
});

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
  <input
  type="number"
  min="1"
  className="w-24 rounded-lg border p-3"
  value={hours}
  onChange={(e)=>setHours(Number(e.target.value))}
  placeholder="시간"
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