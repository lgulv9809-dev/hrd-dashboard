import { useClients } from "@/context/ClientContext";
import { useState } from "react";
type ClientCardProps = {
  id: number;
  name: string;
  manager: string;
  phone: string;
};


export default function ClientCard({
  id,
  name,
  manager,
  phone,
}: ClientCardProps) {
  const { deleteClient, updateClient } = useClients();

const [isEditing, setIsEditing] = useState(false);

const [editName, setEditName] = useState(name);
const [editManager, setEditManager] = useState(manager);
const [editPhone, setEditPhone] = useState(phone);

  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      {isEditing ? (

  <div className="space-y-3">

    <input
      className="w-full rounded-lg border p-2"
      value={editName}
      onChange={(e) => setEditName(e.target.value)}
    />

    <input
      className="w-full rounded-lg border p-2"
      value={editManager}
      onChange={(e) => setEditManager(e.target.value)}
    />

    <input
      className="w-full rounded-lg border p-2"
      value={editPhone}
      onChange={(e) => setEditPhone(e.target.value)}
    />


    <button
      onClick={() => {
        updateClient({
          id,
          name: editName,
          manager: editManager,
          phone: editPhone,
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
      {name}
    </h2>

    <p className="mt-3 text-neutral-500">
      담당자: {manager}
    </p>

    <p className="mt-2 text-neutral-500">
      연락처: {phone}
    </p>
  </>

)}
      <button
  onClick={() => setIsEditing(true)}
  className="mt-5 mr-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
>
  수정
</button>
<button
  onClick={() => deleteClient(id)}
  className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-white"
>
  삭제
</button>

    </div>
  );
}