"use client";

import { useProjects } from "@/context/ProjectContext";
import { useTodos } from "@/context/TodoContext";


export default function StatsPage(){


const { projects } = useProjects();

const { todos } = useTodos();



// 계약 금액

const totalAmount =
projects.reduce(
(sum,project)=>
sum + project.amount,
0
);



// 용역 현황

const activeProjects =
projects.filter(
project=>project.status==="진행중"
).length;


const completeProjects =
projects.filter(
project=>project.status==="완료"
).length;



// 과정 통계

const allCourses =
projects.flatMap(
project=>project.courses ?? []
);


const totalCourses =
allCourses.length;


const completeCourses =
allCourses.filter(
course=>course.status==="완료"
).length;


const activeCourses =
totalCourses - completeCourses;





// 프로젝트 완료 업무 시간

const projectHours =
projects.reduce(

(sum,project)=>

sum +

(project.courses?.reduce(

(courseSum,course)=>

courseSum +

(course.todos?.reduce(

(todoSum,todo)=>

todoSum +

(
todo.completed
?
(todo.hours || 0)
:
0
),

0

) || 0),

0

) || 0),

0

);





// 개인 완료 업무 시간

const personalHours =
todos.reduce(

(sum,todo)=>

sum +

(
todo.done
?
(todo.hours || 0)
:
0
),

0

);




const totalHours =
projectHours + personalHours;







return(


<main className="
min-h-screen
bg-neutral-100
p-10
">



<h1 className="
text-4xl
font-bold
">

업무 추이

</h1>



<p className="
mt-2
text-neutral-500
">

업무 진행 현황과 생산성 변화를 분석합니다.

</p>








<div className="
mt-10
grid
gap-6
md:grid-cols-4
">



<Card

title="총 계약금액"

value={`${totalAmount.toLocaleString()}원`}

/>




<Card

title="진행중 용역"

value={`${activeProjects}건`}

/>




<Card

title="완료 용역"

value={`${completeProjects}건`}

/>




<Card

title="전체 과정"

value={`${totalCourses}건`}

/>



</div>









<div className="
mt-10
grid
gap-6
md:grid-cols-3
">



<Card

title="진행중 과정"

value={`${activeCourses}건`}

/>




<Card

title="완료 과정"

value={`${completeCourses}건`}

/>




<Card

title="총 업무시간"

value={`${totalHours}시간`}

/>



</div>









<div className="
mt-10
rounded-2xl
bg-white
p-6
shadow
">



<h2 className="
text-xl
font-bold
">

업무 시간 분석

</h2>




<p className="mt-4">

프로젝트 업무 :

{projectHours}시간

</p>




<p className="mt-2">

개인 업무 :

{personalHours}시간

</p>



</div>








</main>


);

}









function Card({

title,

value

}:{

title:string;

value:string;

}){


return(


<div className="
rounded-2xl
bg-white
p-6
shadow
">



<p className="
text-neutral-500
">

{title}

</p>




<h2 className="
mt-3
text-3xl
font-bold
">

{value}

</h2>



</div>


);


}