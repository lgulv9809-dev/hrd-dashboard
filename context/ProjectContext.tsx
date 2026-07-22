"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { projects as initialProjects } from "@/data/projects";



type Todo = {

  id:number;

  title:string;

  completed:boolean;

  difficulty:string;

  hours:number;

  startDate:string;

  endDate:string;

};





type Course = {

  id:number;

  name:string;

  startDate:string;

  endDate:string;

  people:number;

  manager:string;

  todos:Todo[];

  status:string;

};





type Project = {

  id:number;

  name:string;

  client:string;

  contractType?:string;


  managerName?:string;

  phone?:string;

  email?:string;


  amount:number;

  progress:number;

  status:string;


  startDate?:string;

  endDate?:string;


  annual?:boolean;

  multiRound?:boolean;


  courses:Course[];

};







type ProjectContextType = {


  projects:Project[];
    importProjects:(projects:Project[])=>void;


  addProject:(project:Project)=>void;


  deleteProject:(id:number)=>void;


  updateProject:(project:Project)=>void;



  addCourse:(

    projectId:number,

    course:Course

  )=>void;



  updateCourse:(

    projectId:number,

    course:Course

  )=>void;



  deleteCourse:(

    projectId:number,

    courseId:number

  )=>void;



  addTodo:(

    projectId:number,

    courseId:number,

    todo:Todo

  )=>void;



  updateTodo:(

    projectId:number,

    courseId:number,

    todo:Todo

  )=>void;



  deleteTodo:(

    projectId:number,

    courseId:number,

    todoId:number

  )=>void;


};







const ProjectContext =

createContext<ProjectContextType | null>(null);








export function ProjectProvider({

children,

}:{

children:React.ReactNode;

}){



const [projects,setProjects] =

useState<Project[]>(initialProjects);

const [loaded,setLoaded] = useState(false);





function calculateCourseProgress(
todos:Todo[]
){

if(!todos || todos.length===0)

return 0;



const completed =

todos.filter(
(todo)=>todo.completed
).length;



return Math.round(

(completed / todos.length) * 100

);

}






function calculateProjectProgress(
courses:Course[]
){

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









useEffect(()=>{


const saved =

localStorage.getItem("projects");


if(saved){



const parsed =

JSON.parse(saved);



const fixed =

parsed.map((project:any)=>({

...project,


managerName:
project.managerName ?? "",


phone:
project.phone ?? "",


email:
project.email ?? "",


startDate:
project.startDate ?? "",


endDate:
project.endDate ?? "",


annual:
project.annual ?? false,


multiRound:
project.multiRound ?? false,


courses:

(project.courses ?? [])

.map((course:any)=>({


...course,


todos:
course.todos ?? []


}))


}));



setProjects(fixed);

}


setLoaded(true);


},[]);













useEffect(()=>{

if(!loaded) return;

localStorage.setItem(
"projects",
JSON.stringify(projects)
);

},[projects,loaded]);









const importProjects = (
  newProjects:Project[]
)=>{

  setProjects(newProjects);

};



const addProject =
(project:Project)=>{


setProjects(prev=>[

...prev,

project

]);


};









const deleteProject =

(id:number)=>{


setProjects(prev=>

prev.filter(

(project)=>

project.id !== id

)

);


};









const updateProject =

(project:Project)=>{


setProjects(prev=>

prev.map(item=>

item.id===project.id

?

project

:

item

)

);


};









const addCourse =

(
projectId:number,
course:Course
)=>{


setProjects(prev=>

prev.map(project=>

project.id===projectId

?

{

...project,

courses:[

...project.courses,

course

]

}

:

project

)

);


};









const updateCourse =

(
projectId:number,
course:Course
)=>{


setProjects(prev=>

prev.map(project=>

project.id===projectId

?

{

...project,

courses:

project.courses.map(item=>

item.id===course.id

?

course

:

item

)

}

:

project

)

);


};









const deleteCourse =

(
projectId:number,
courseId:number
)=>{


setProjects(prev=>

prev.map(project=>

project.id===projectId

?

{

...project,

courses:

project.courses.filter(

course=>

course.id!==courseId

)

}

:

project

)

);


};









const addTodo =

(
projectId:number,
courseId:number,
todo:Todo
)=>{


setProjects(prev=>

prev.map(project=>{


if(project.id!==projectId)

return project;



return {


...project,


courses:

project.courses.map(course=>{


if(course.id!==courseId)

return course;



return {


...course,


todos:[

...course.todos,

todo

]


};


})


};


})


);


};









const updateTodo =

(
projectId:number,
courseId:number,
todo:Todo
)=>{


setProjects(prev=>

prev.map(project=>{


if(project.id!==projectId)

return project;



const courses =

project.courses.map(course=>{


if(course.id!==courseId)

return course;



return {

...course,

todos:

course.todos.map(item=>

item.id===todo.id

?

todo

:

item

)

};


});



const progress =

calculateProjectProgress(courses);



return {


...project,


courses,


progress,


status:

progress===100

?

"완료"

:

"진행중"


};


})


);


};









const deleteTodo =

(
projectId:number,
courseId:number,
todoId:number
)=>{


setProjects(prev=>

prev.map(project=>{


if(project.id!==projectId)

return project;



return {


...project,


courses:

project.courses.map(course=>{


if(course.id!==courseId)

return course;



return {


...course,


todos:

course.todos.filter(

todo=>

todo.id!==todoId

)


};


})


};


})


);


};









return (

<ProjectContext.Provider


value={{

projects,

importProjects,

addProject,

deleteProject,

updateProject,

addCourse,

updateCourse,

deleteCourse,

addTodo,

updateTodo,

deleteTodo,

}}


>


{children}


</ProjectContext.Provider>


);


}








export function useProjects(){


const context =

useContext(ProjectContext);



if(!context){

throw new Error(

"useProjects must be used inside ProjectProvider"

);

}



return context;


}