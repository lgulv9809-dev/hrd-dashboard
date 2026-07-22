"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";




type Todo = {
  id: number;
  text: string;
  done: boolean;
  hours: number;
};




type TodoContextType = {

  todos: Todo[];

  addTodo: (todo: Todo)=>void;

  updateTodo: (
  id:number,
  text:string,
  hours:number
)=>void;

  deleteTodo: (
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






  useEffect(()=>{


    const saved =
      localStorage.getItem("todos");



    if(saved){

      setTodos(
        JSON.parse(saved)
      );

    }


  },[]);







  useEffect(()=>{


    localStorage.setItem(

      "todos",

      JSON.stringify(todos)

    );


  },[todos]);









  const addTodo=(todo:Todo)=>{


    setTodos((prev)=>[

      ...prev,

      todo

    ]);


  };









  // Todo 수정

  const updateTodo=(

  id:number,

  text:string,

  hours:number

)=>{

  setTodos((prev)=>

    prev.map(todo=>

      todo.id===id

      ?

      {

        ...todo,

        text,

        hours,

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