import { useProjects } from "@/context/ProjectContext";
import Link from "next/link";


type ProjectCardProps = {

  id:number;

  name:string;

  client:string;

  amount:number;

  status:string;

  courses:any[];

  difficulty:string;

  annual?:boolean;

  multiRound?:boolean;


  startDate?:string;

  endDate?:string;

};





function calculateCourseProgress(todos:any[]){

  if(!todos || todos.length===0)
    return 0;


  const complete =
    todos.filter(
      (todo)=>todo.completed
    ).length;


  return Math.round(
    (complete / todos.length) * 100
  );

}







function calculateProjectProgress(courses:any[]){

  if(!courses || courses.length===0)
    return 0;


  const total =
    courses.reduce(

      (sum,course)=>

      sum + calculateCourseProgress(course.todos),

      0

    );


  return Math.round(
    total / courses.length
  );

}









export default function ProjectCard({

id,
name,
client,
amount,
status,
courses,
difficulty,
annual,
multiRound,
startDate,
endDate

}:ProjectCardProps){





const {
deleteProject
}=useProjects();





const progress =
calculateProjectProgress(courses);







return (


<div className="rounded-2xl bg-white p-6 shadow">








<div className="flex items-center gap-3 flex-wrap">





<h2 className="text-xl font-bold">

{name}

</h2>








{/* 용역 난이도 */}

<span

className={`

flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white

${
difficulty==="상"

?

"bg-red-500"

:

difficulty==="중"

?

"bg-yellow-400"

:

"bg-green-500"

}

`}

>

{difficulty}

</span>








{/* 연간 표시 */}

{

annual && (

<span

className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white"

>

연

</span>

)

}










{/* 다차수 표시 */}

{

multiRound && (

<span

className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white"

>

다

</span>

)

}



</div>









<p className="mt-3 text-neutral-500">

고객사 :
{client}

</p>









{/* 용역 기간 */}

{

(startMonth || endMonth) && (

<p className="mt-2 text-neutral-500">

기간 :

{startMonth?.replace("-", ".")}

~

{endMonth?.replace("-", ".")}

</p>

)

}









<p className="mt-2 text-neutral-500">

계약금액 :

{amount.toLocaleString()}원

</p>









<p className="mt-4 font-bold">

전체 진행률 :

{progress}%

</p>









<div className="mt-2 h-3 rounded-full bg-neutral-200">


<div


className="h-3 rounded-full bg-green-700"


style={{


width:`${progress}%`


}}


/>


</div>










<p className="mt-4 text-sm text-green-700">

상태 :

{status}

</p>











<div className="mt-5 flex gap-3">





<Link

href={`/projects/${id}`}

className="rounded-lg bg-blue-600 px-4 py-2 text-white"

>

상세보기

</Link>







<Link

href={`/projects/edit/${id}`}

className="rounded-lg bg-indigo-600 px-4 py-2 text-white"

>

수정

</Link>









<button

onClick={()=>deleteProject(id)}

className="rounded-lg bg-red-600 px-4 py-2 text-white"

>

삭제

</button>






</div>







</div>


);


}