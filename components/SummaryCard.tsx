type SummaryCardProps = {
  title: string;
  value: string;
};


export default function SummaryCard({
  title,
  value,
}: SummaryCardProps) {

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-neutral-200 hover:shadow-md transition">


      <p className="text-sm text-neutral-500">
        {title}
      </p>


      <h2 className="mt-4 text-3xl font-bold text-neutral-900">
        {value}
      </h2>


      <p className="mt-3 text-sm text-green-700">
        실시간 관리 데이터
      </p>


    </div>
  );
}