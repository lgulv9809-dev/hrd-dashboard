"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { projects as initialProjects } from "@/data/projects";



type Todo = {
  id: number;
  title: string;
  completed: boolean;
  difficulty: string;
  hours: number;
  startDate: string;
  endDate: string;
};



type Course = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  people: number;
  manager: string;

  todos: Todo[];

  status: string;
};



type Project = {
  id: number;
  name: string;
  client: string;
  amount: number;
  progress: number;
  status: string;
  courses: Course[];
};





type ProjectContextType = {

  projects: Project[];

  addProject: (project: Project) => void;

  deleteProject: (id:number) => void;

  updateProject: (project:Project) => void;



  addCourse: (
    projectId:number,
    course:Course
  ) => void;


  updateCourse: (
    projectId:number,
    course:Course
  ) => void;


  deleteCourse: (
    projectId:number,
    courseId:number
  ) => void;



  addTodo: (
    projectId:number,
    courseId:number,
    todo:Todo
  ) => void;



  updateTodo: (
    projectId:number,
    courseId:number,
    todo:Todo
  ) => void;



  deleteTodo: (
    projectId:number,
    courseId:number,
    todoId:number
  ) => void;

};





const ProjectContext =
  createContext<ProjectContextType | null>(null);






export function ProjectProvider({
  children,
}:{
  children:React.ReactNode;
}) {



const [projects,setProjects] =
  useState<Project[]>(initialProjects);





// 기존 데이터 보정
useEffect(()=>{


  const savedProjects =
    localStorage.getItem("projects");



  if(savedProjects){


    const parsedProjects =
      JSON.parse(savedProjects);



    const updatedProjects =
      parsedProjects.map((project:any)=>({


        ...project,


        courses:
          (project.courses ?? [])
          .map((course:any)=>({


            ...course,


            todos:
              course.todos ?? []


          }))


      }));



    setProjects(updatedProjects);

  }


},[]);






// 저장
useEffect(()=>{


  localStorage.setItem(
    "projects",
    JSON.stringify(projects)
  );


},[projects]);








// 용역 추가
const addProject =
(project:Project)=>{


  setProjects((prev)=>[
    ...prev,
    project
  ]);


};








// 용역 삭제
const deleteProject =
(id:number)=>{


  setProjects((prev)=>
    prev.filter(
      (project)=>
        project.id !== id
    )
  );


};








// 용역 수정
const updateProject =
(project:Project)=>{


  setProjects((prev)=>

    prev.map((item)=>

      item.id === project.id
      ? project
      : item

    )

  );


};









// 과정 추가
const addCourse =
(
 projectId:number,
 course:Course
)=>{


setProjects((prev)=>

prev.map((project)=>


project.id === projectId

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









// 과정 수정
const updateCourse =
(
 projectId:number,
 course:Course
)=>{


setProjects((prev)=>

prev.map((project)=>


project.id === projectId

?

{

...project,


courses:

project.courses.map((item)=>

item.id === course.id
? course
: item

)


}


:

project


)

);


};









// 과정 삭제
const deleteCourse =
(
 projectId:number,
 courseId:number
)=>{


setProjects((prev)=>

prev.map((project)=>


project.id === projectId

?

{

...project,


courses:

project.courses.filter(
(course)=>
course.id !== courseId
)


}


:

project


)

);


};









// TO DO 추가
const addTodo =
(
 projectId:number,
 courseId:number,
 todo:Todo
)=>{


setProjects((prev)=>

prev.map((project)=>{


if(project.id !== projectId)
return project;



return {

...project,


courses:

project.courses.map((course)=>{


if(course.id !== courseId)
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









// TO DO 수정
const updateTodo =
(
 projectId:number,
 courseId:number,
 todo:Todo
)=>{


setProjects((prev)=>

prev.map((project)=>{


if(project.id !== projectId)
return project;



return {

...project,


courses:

project.courses.map((course)=>{


if(course.id !== courseId)
return course;



return {

...course,


todos:

course.todos.map((item)=>

item.id === todo.id
? todo
: item

)


};


})


};


})


);


};









// TO DO 삭제
const deleteTodo =
(
 projectId:number,
 courseId:number,
 todoId:number
)=>{


setProjects((prev)=>

prev.map((project)=>{


if(project.id !== projectId)
return project;



return {

...project,


courses:

project.courses.map((course)=>{


if(course.id !== courseId)
return course;



return {

...course,


todos:

course.todos.filter(
(todo)=>
todo.id !== todoId
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