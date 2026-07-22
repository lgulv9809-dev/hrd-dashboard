"use client";

import { useRef } from "react";

import { useProjects } from "@/context/ProjectContext";
import { useTodos } from "@/context/TodoContext";



export default function DataBackup(){


const { projects, importProjects } = useProjects();

const { todos, importTodos } = useTodos();


const fileRef = useRef<HTMLInputElement | null>(null);







// 백업

const backupData = ()=>{


const data = {

projects,

todos,

date:new Date().toISOString()

};



const blob = new Blob(

[
JSON.stringify(
data,
null,
2
)
],

{
type:"application/json"
}

);



const url =
URL.createObjectURL(blob);



const a =
document.createElement("a");


a.href=url;


a.download =
`HRD-backup-${Date.now()}.json`;



a.click();



URL.revokeObjectURL(url);


};









// 복원

const restoreData = (

e:React.ChangeEvent<HTMLInputElement>

)=>{


const file =
e.target.files?.[0];


if(!file) return;



const reader =
new FileReader();



reader.onload = ()=>{


try{


const data =
JSON.parse(
reader.result as string
);



if(data.projects){

importProjects(
data.projects
);

}



if(data.todos){

importTodos(
data.todos
);

}



alert("데이터 복원이 완료되었습니다.");



}catch{


alert("잘못된 백업 파일입니다.");

}


};



reader.readAsText(file);


};










return(

<div className="flex gap-2">


<button

onClick={backupData}

className="
rounded-lg
bg-green-800
px-4
py-2
text-white
"

>

💾 데이터 백업

</button>





<button

onClick={()=>fileRef.current?.click()}

className="
rounded-lg
bg-neutral-700
px-4
py-2
text-white
"

>

📂 데이터 복원

</button>





<input

ref={fileRef}

type="file"

accept=".json"

onChange={restoreData}

className="hidden"

/>



</div>

);


}