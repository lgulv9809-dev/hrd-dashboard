"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";



type Todo = {
  id:number;
  text:string;
  done:boolean;
  hours:number;
  date:string;
};




type TodoContextType = {

  todos: Todo[];

  importTodos:(todos:Todo[])=>void;

  addTodo:(todo:Todo)=>void;

  updateTodo:(
    id:number,
    text:string,
    hours:number,
    done?:boolean
  )=>void;

  deleteTodo:(
    id:number
  )=>void;

};






const TodoContext =
createContext<TodoContextType | null>(null);









export function TodoProvider({

children,

}:{

children:React.ReactNode;

}){



const [todos,setTodos] =
useState<Todo[]>([]);



const [loaded,setLoaded] =
useState(false);








// 불러오기

useEffect(()=>{


const saved =
localStorage.getItem("todos");



if(saved){

setTodos(
JSON.parse(saved)
);

}



setLoaded(true);



},[]);










// 저장

useEffect(()=>{


if(!loaded) return;



localStorage.setItem(

"todos",

JSON.stringify(todos)

);



},[todos,loaded]);










// 데이터 복원

const importTodos = (

newTodos:Todo[]

)=>{

setTodos(newTodos);

};









// Todo 추가

const addTodo=(todo:Todo)=>{


setTodos((prev)=>[

...prev,

todo

]);


};









// Todo 수정

const updateTodo = (

id:number,

text:string,

hours:number,

done?:boolean

)=>{


setTodos((prev)=>

prev.map(todo=>

todo.id===id

?

{

...todo,

text,

hours,

done: done ?? todo.done

}

:

todo

)

);


};










// Todo 삭제

const deleteTodo=(id:number)=>{


setTodos((prev)=>

prev.filter(

todo=>

todo.id !== id

)

);


};












return(

<TodoContext.Provider

value={{

todos,

importTodos,

addTodo,

updateTodo,

deleteTodo,

}}

>

{children}

</TodoContext.Provider>

);


}









export function useTodos(){


const context =

useContext(TodoContext);



if(!context){

throw new Error(

"useTodos must be used inside TodoProvider"

);

}



return context;


}