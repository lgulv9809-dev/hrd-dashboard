"use client";

import { useEducations } from "@/context/EducationContext";
import { useState } from "react";

type EducationCardProps = {
  id: number;
  title: string;
  target: string;
  date: string;
  location: string;
  status: string;
};


export default function EducationCard({
  id,
  title,
  target,
  date,
  location,
  status,
}: EducationCardProps) {

 const { deleteEducation, updateEducation } = useEducations();

const [isEditing, setIsEditing] = useState(false);

const [editTitle, setEditTitle] = useState(title);
const [editTarget, setEditTarget] = useState(target);
const [editDate, setEditDate] = useState(date);
const [editLocation, setEditLocation] = useState(location);
const [editStatus, setEditStatus] = useState(status);


  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      {isEditing ? (

  <div className="space-y-3">

    <input
      className="w-full rounded-lg border p-2"
      value={editTitle}
      onChange={(e)=>setEditTitle(e.target.value)}
    />

    <input
      className="w-full rounded-lg border p-2"
      value={editTarget}
      onChange={(e)=>setEditTarget(e.target.value)}
    />

    <input
      className="w-full rounded-lg border p-2"
      value={editDate}
      onChange={(e)=>setEditDate(e.target.value)}
    />

    <input
      className="w-full rounded-lg border p-2"
      value={editLocation}
      onChange={(e)=>setEditLocation(e.target.value)}
    />

    <button
      onClick={()=>{
        updateEducation({
          id,
          title: editTitle,
          target: editTarget,
          date: editDate,
          location: editLocation,
          status: editStatus,
        });

        setIsEditing(false);
      }}
      className="rounded-lg bg-green-800 px-4 py-2 text-white"
    >
      저장
    </button>

  </div>


) : (

<>
  <h2 className="text-xl font-bold">
    {title}
  </h2>

  <p className="mt-3 text-neutral-500">
    대상: {target}
  </p>

  <p className="mt-2 text-neutral-500">
    일정: {date}
  </p>

  <p className="mt-2 text-neutral-500">
    장소: {location}
  </p>
</>

)}


      <p className="mt-2 text-neutral-500">
        일정: {date}
      </p>


      <p className="mt-2 text-neutral-500">
        장소: {location}
      </p>


      <p className="mt-4 text-sm text-green-700">
        상태: {status}
      </p>

<button
  onClick={() => setIsEditing(true)}
  className="mt-5 mr-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
>
  수정
</button>

      <button
        onClick={() => deleteEducation(id)}
        className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-white"
      >
        삭제
      </button>


    </div>
  );
}