"use client";
import Link from "next/link";
import { useClients } from "@/context/ClientContext";
import ClientCard from "@/components/ClientCard";
export default function ClientsPage() {
  const { clients } = useClients();
  return (
    <main className="min-h-screen bg-neutral-100 p-10">

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          고객사관리
        </h1>

        <p className="mt-2 text-neutral-500">
          고객사 정보를 관리합니다.
        </p>
        <Link
  href="/clients/new"
  className="inline-block mt-5 rounded-lg bg-green-800 px-5 py-3 text-white"
>
  + 신규 고객사 등록
</Link>

      </div>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

  {clients.map((client) => (
    <ClientCard
      key={client.id}
      id={client.id}
      name={client.name}
      manager={client.manager}
      phone={client.phone}
      
    />
  ))}

</div>


    </main>
  );
}