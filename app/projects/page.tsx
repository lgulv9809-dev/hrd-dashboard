"use client";
import { useProjects } from "@/context/ProjectContext";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
export default function ProjectsPage() {

  const { projects } = useProjects();

  return (
    <main className="min-h-screen bg-neutral-100 p-10">

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          용역관리
        </h1>

        <p className="mt-2 text-neutral-500">
          진행 중인 용역과 프로젝트를 관리합니다.
        </p>
        <Link
  href="/projects/new"
  className="mt-5 inline-block rounded-lg bg-green-800 px-5 py-3 text-white hover:bg-green-700"
>
  + 신규 용역 등록
</Link>

      </div>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">


        {projects.map((project) => (
  <ProjectCard

key={project.id}

id={project.id}

name={project.name}

client={project.client}

amount={project.amount}

status={project.status}

courses={project.courses}

/>
))}
      </div>  

    </main>
  );
}