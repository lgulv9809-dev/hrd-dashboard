"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useProjects } from "@/context/ProjectContext";


function calculateProgress(todos:any[]) {

  if(!todos || todos.length === 0){
    return 0;
  }

  const completed =
    todos.filter((todo)=>todo.completed).length;

  return Math.round(
    (completed / todos.length) * 100
  );

}


function calculateDifficulty(todos:any[]) {

  const count = todos?.length || 0;


  if(count >= 15){

    return "상";

  }


  if(count >= 5){

    return "중";

  }


  return "하";

}



export default function ProjectDetailPage(){


const {id}=useParams();



const {
 projects,
 addCourse,
 updateCourse,
 deleteCourse,
 addTodo,
 deleteTodo,
 updateTodo
}=useProjects();



const project =
projects.find(
(p)=>p.id===Number(id)
);



const [showForm,setShowForm]=useState(false);
const [openCourse,setOpenCourse]=useState<number|null>(null);
const [editCourseId,setEditCourseId]=useState<number|null>(null);

const [editCourseForm,setEditCourseForm]=useState({
  name:"",
  manager:"",
  startDate:"",
  endDate:""
});

const [courseForm,setCourseForm]=useState({

name:"",
startDate:"",
endDate:"",
people:0,
manager:""

});

const [editTodoId,setEditTodoId]=useState<number|null>(null);

const [editTodoTitle,setEditTodoTitle]=useState("");

const [todoOpen,setTodoOpen]=useState<number|null>(null);
const [todoForm,setTodoForm]=useState({

title:"",
difficulty:"보통",
hours:0,
startDate:"",
endDate:""

});


if(!project){

return(
<main className="p-10">
용역 정보를 찾을 수 없습니다.
</main>
)

}

const handleAddCourse=()=>{

addCourse(

project.id,

{

id:Date.now(),

name:courseForm.name,

startDate:courseForm.startDate,

endDate:courseForm.endDate,

people:courseForm.people,

manager:courseForm.manager,

todos:[],

status:"진행중"

}

);


setCourseForm({

name:"",
startDate:"",
endDate:"",
people:0,
manager:""

});


setShowForm(false);


};


const handleCancelTodo = () => {

setTodoForm({

title:"",
difficulty:"보통",
hours:0,
startDate:"",
endDate:""

});

setTodoOpen(null);

};




const handleAddTodo=(courseId:number)=>{


if(!todoForm.title.trim())
return;



addTodo(

project.id,

courseId,

{

id:Date.now(),

title:todoForm.title,

completed:false,

difficulty:todoForm.difficulty,

hours:todoForm.hours,

startDate:todoForm.startDate,

endDate:todoForm.endDate

}

);



setTodoForm({

title:"",
difficulty:"보통",
hours:0,
startDate:"",
endDate:""

});


};






return(

<main className="min-h-screen bg-neutral-100 p-10">


<h1 className="text-4xl font-bold">
{project.name}
</h1>





<div className="mt-8 rounded-2xl bg-white p-8 shadow">


<p>
고객사 : {project.client}
</p>


<p className="mt-2">
담당자 : {project.managerName}
</p>


<p className="mt-2">
전화번호 : {project.phone}
</p>


<p className="mt-2">
메일주소 : {project.email}
</p>


<p className="mt-2">
계약금액 :
{project.amount.toLocaleString()}원
</p>


<p className="mt-2">
상태 : {project.status}
</p>


<p className="mt-2">
진행률 : {project.progress}%
</p>


</div>







<div className="mt-8 rounded-2xl bg-white p-8 shadow">


<div className="flex justify-between">


<h2 className="text-2xl font-bold">
📌 과정 관리
</h2>


<button

onClick={()=>setShowForm(!showForm)}

className="bg-green-800 text-white rounded-lg px-5 py-3"

>

+ 과정 추가

</button>


</div>






{
showForm &&

<div className="mt-5 grid gap-3">


<input

className="border p-3 rounded"

placeholder="과정명"

value={courseForm.name}

onChange={(e)=>
setCourseForm({
...courseForm,
name:e.target.value
})
}

/>



<input

className="border p-3 rounded"

placeholder="담당자"

value={courseForm.manager}

onChange={(e)=>
setCourseForm({
...courseForm,
manager:e.target.value
})
}

/>

<input

type="date"

className="border p-3 rounded"

value={courseForm.startDate}

onChange={(e)=>
setCourseForm({
...courseForm,
startDate:e.target.value
})
}

/>


<input

type="date"

className="border p-3 rounded"

value={courseForm.endDate}

onChange={(e)=>
setCourseForm({
...courseForm,
endDate:e.target.value
})
}

/>

<button

onClick={handleAddCourse}

className="bg-blue-600 text-white rounded p-3"

>

저장

</button>

<button

onClick={()=>{

  setShowForm(false);

  setCourseForm({

    name:"",
    startDate:"",
    endDate:"",
    people:0,
    manager:""

  });

}}

className="bg-neutral-500 text-white rounded p-3"

>

취소

</button>
</div>

}









<div className="mt-8 space-y-5">


{


[...(project.courses ?? [])]
.sort((a,b)=>{

  const aProgress = calculateProgress(a.todos);
  const bProgress = calculateProgress(b.todos);

  // 100% 완료 과정은 아래로
  if(aProgress === 100 && bProgress !== 100){
    return 1;
  }

  if(aProgress !== 100 && bProgress === 100){
    return -1;
  }


  // 시작일 기준 오름차순
  return (
    new Date(a.startDate || "9999-12-31").getTime()
    -
    new Date(b.startDate || "9999-12-31").getTime()
  );

})
.map((course)=>(

<div

key={course.id}

className="rounded-xl border bg-white p-5"

>


<div className="flex justify-between items-center">

<div className="flex items-center gap-3">

  <h3 className="text-xl font-bold">
    {course.name}
  </h3>


<span
  className={`
    flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white
    ${
      calculateDifficulty(course.todos) === "상"
      ? "bg-red-500"
      : calculateDifficulty(course.todos) === "중"
      ? "bg-yellow-400"
      : "bg-green-500"
    }
  `}
>
  {calculateDifficulty(course.todos)}
</span>

</div>



<div className="flex gap-2">


<button

onClick={()=>{

setEditCourseId(course.id);

setEditCourseForm({

name:course.name,

manager:course.manager || "",

startDate:course.startDate || "",

endDate:course.endDate || ""

});

}}

className="rounded-lg bg-yellow-500 px-4 py-2 text-white"

>

수정

</button>


<button

onClick={()=>setOpenCourse(
  openCourse === course.id
  ? null
  : course.id
)}

className="rounded-lg bg-blue-600 px-4 py-2 text-white"

>

{
openCourse === course.id
? "닫기"
: "할일보기"
}

</button>


</div>

</div>

<p className="mt-2 text-sm text-neutral-500">

기간 :
{course.startDate || "-"}
~
{course.endDate || "-"}

</p>

<p>
담당자 :
{course.manager || "-"}
</p>




<p className="mt-3 font-bold">

진행률 :
{calculateProgress(course.todos)}%

</p>




<div className="mt-2 h-3 rounded-full bg-neutral-200">

<div

className="h-3 rounded-full bg-green-700"

style={{

width:`${calculateProgress(course.todos)}%`

}}

/>

</div>





{
openCourse === course.id && (
<div className="mt-5 border-t pt-5">


<div className="flex justify-between">


<h4 className="font-bold">
📌 TO DO
</h4>



<button

onClick={()=>setTodoOpen(course.id)}

className="bg-green-700 text-white rounded px-3 py-2"

>

+ TO DO

</button>


</div>







{
todoOpen===course.id &&

<div className="mt-3 grid gap-2">


<input

className="border p-2 rounded"

placeholder="할 일"

value={todoForm.title}

onChange={(e)=>
setTodoForm({
...todoForm,
title:e.target.value
})
}

/>




<input

type="date"

className="border p-2 rounded"

value={todoForm.startDate}

onChange={(e)=>
setTodoForm({
...todoForm,
startDate:e.target.value
})
}

/>




<input

type="date"

className="border p-2 rounded"

value={todoForm.endDate}

onChange={(e)=>
setTodoForm({
...todoForm,
endDate:e.target.value
})
}

/>





<select

className="border p-2 rounded"

value={todoForm.difficulty}

onChange={(e)=>
setTodoForm({
...todoForm,
difficulty:e.target.value
})
}

>

<option>쉬움</option>
<option>보통</option>
<option>어려움</option>

</select>






<input

type="number"

className="border p-2 rounded"

placeholder="예상시간"

value={todoForm.hours}

onChange={(e)=>
setTodoForm({
...todoForm,
hours:Number(e.target.value)
})
}

/>




<div className="flex gap-2">


<button

onClick={()=>handleAddTodo(course.id)}

className="flex-1 bg-blue-600 text-white rounded p-2"

>

추가

</button>



<button

onClick={handleCancelTodo}

className="flex-1 bg-neutral-400 text-white rounded p-2"

>

취소

</button>


</div>



</div>

}









<div className="mt-5 space-y-2">


{
[...(course.todos ?? [])]
.sort(
  (a,b)=>
    new Date(a.startDate || "9999-12-31").getTime()
    -
    new Date(b.startDate || "9999-12-31").getTime()
)
.map((todo)=>(


<div

key={todo.id}

className="bg-neutral-100 rounded p-3"

>


<label>


<input

type="checkbox"

checked={todo.completed}

onChange={()=>updateTodo(

project.id,

course.id,

{

...todo,

completed:!todo.completed

}

)}

 />

{
editTodoId === todo.id ? (

<div className="flex gap-2 ml-2">


<input

className="border rounded px-2 py-1"

value={editTodoTitle}

onChange={(e)=>
setEditTodoTitle(e.target.value)
}

/>


<button

className="bg-green-700 text-white px-3 py-1 rounded"

onClick={()=>{


updateTodo(

project.id,

course.id,

{

...todo,

title:editTodoTitle

}

);


setEditTodoId(null);


}}

>

저장

</button>


</div>


)

:

(

<span className="ml-2">

{todo.title}

</span>

)

}


</label>




<p className="text-sm text-neutral-500">

실행기간 :

{todo.startDate || "-"}

~

{todo.endDate || "-"}

</p>




<p className="text-sm text-neutral-500">

난이도 :
{todo.difficulty}

&nbsp; / &nbsp;

예상시간 :
{todo.hours}시간

</p>

<button

onClick={()=>{

setEditTodoId(todo.id);

setEditTodoTitle(todo.title);

}}

className="text-blue-600 text-sm mr-3"

>

수정

</button>


<button

onClick={()=>deleteTodo(

project.id,

course.id,

todo.id

)}

className="text-red-600 text-sm"

>

삭제

</button>



</div>


))


}

</div>




</div>





)}
{
editCourseId === course.id && (

<div className="mt-5 grid gap-3 border-t pt-5">

<input
className="border p-3 rounded"
placeholder="과정명"
value={editCourseForm.name}
onChange={(e)=>
setEditCourseForm({
...editCourseForm,
name:e.target.value
})
}
/>


<input
className="border p-3 rounded"
placeholder="담당자"
value={editCourseForm.manager}
onChange={(e)=>
setEditCourseForm({
...editCourseForm,
manager:e.target.value
})
}
/>


<input
type="date"
className="border p-3 rounded"
value={editCourseForm.startDate}
onChange={(e)=>
setEditCourseForm({
...editCourseForm,
startDate:e.target.value
})
}
/>


<input
type="date"
className="border p-3 rounded"
value={editCourseForm.endDate}
onChange={(e)=>
setEditCourseForm({
...editCourseForm,
endDate:e.target.value
})
}
/>


<button

onClick={()=>{
updateCourse(
  project.id,
  {
    ...course,
    ...editCourseForm,
    id: course.id
  }
);

setEditCourseId(null);

}}

className="bg-blue-600 text-white rounded p-3"

>

저장

</button>

</div>

)
}
<div className="flex justify-end mt-5">

<button

onClick={()=>deleteCourse(

project.id,

course.id

)}

className="bg-red-600 text-white px-4 py-2 rounded"

>

과정 삭제

</button>

</div>



</div>


))


}


</div>



</div>



</main>

)


}