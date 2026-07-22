"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {

  const pathname = usePathname();

const menu = [
  {
    name: "🏠 대시보드",
    href: "/",
  },
  {
    name: "📂 진행중인 과정관리",
    href: "/projects",
  },
  {
    name: "✅ 완료된 과정관리",
    href: "/completed",
  },
  {
    name: "📊 업무 추이",
    href: "/stats",
  },
];

  return (

    <aside className="w-64 bg-white border-r border-neutral-200 p-6">

      <h1 className="text-2xl font-bold text-green-800">
        Expert Consulting
      </h1>

      <p className="mt-1 text-sm text-neutral-500">
        업무관리 시스템
      </p>

      <nav className="mt-10 space-y-3">

        {menu.map((item) => {

          const active =
            pathname === item.href;

          return (

            <Link
              key={item.href}
              href={item.href}
              className={`
                block rounded-lg p-3 font-medium transition
                ${
                  active
                    ? "bg-green-100 text-green-800"
                    : "hover:bg-green-50"
                }
              `}
            >

              {item.name}

            </Link>

          );

        })}

      </nav>

    </aside>

  );

}