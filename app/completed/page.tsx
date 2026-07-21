"use client";

import { useProjects } from "@/context/ProjectContext";
import ProjectCard from "@/components/ProjectCard";

export default function CompletedPage() {

  const { projects } = useProjects();

  const completedProjects =
    projects.filter(
      (project) => project.status === "완료"
    );
    console.log("완료 프로젝트", completedProjects);

  return (
    <main className="min-h-screen bg-neutral-100 p-10">

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          완료과정관리
        </h1>

        <p className="mt-2 text-neutral-500">
          완료된 용역 목록입니다.
        </p>
        <p>완료 프로젝트 개수 : {completedProjects.length}</p>
        

      </div>

      {completedProjects.length === 0 ? (

        <div className="rounded-xl bg-white p-10 text-center shadow">
          <p className="text-neutral-500">
            완료된 용역이 없습니다.
          </p>
        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {completedProjects.map((project) => (

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

      )}
<pre className="mt-10 rounded-lg bg-white p-4 text-xs">
  {JSON.stringify(projects, null, 2)}
</pre>
    </main>
  );

}