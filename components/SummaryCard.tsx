type SummaryCardProps = {
  title: string;
  value: string;
  sub?: string;
  color?: string;
};

export default function SummaryCard({

  title,
  value,
  sub,
  color,

}: SummaryCardProps) {

  const percent =
    Number(
      value.replace("%", "")
    );

  const isWorkload =
    title === "업무 부하량";

  let valueColor =
    color ?? "text-neutral-900";

  if (isWorkload && !color) {

    if (percent >= 80) {

      valueColor = "text-red-600";

    } else if (percent >= 50) {

      valueColor = "text-yellow-500";

    } else {

      valueColor = "text-green-600";

    }

  }

  return (

    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      <p className="text-sm text-neutral-500">

        {title}

      </p>

      <h2
        className={`mt-4 text-3xl font-bold ${valueColor}`}
      >

        {value}

      </h2>

      {/* 업무 부하량 Progress Bar */}

      {isWorkload && (

        <div className="mt-4">

          <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-200">

            <div

              className={`h-3 rounded-full ${
                percent >= 80
                  ? "bg-red-600"
                  : percent >= 50
                  ? "bg-yellow-500"
                  : "bg-green-600"
              }`}

              style={{
                width: `${Math.min(percent, 100)}%`,
              }}

            />

          </div>

        </div>

      )}

      {sub && (

        <p className="mt-3 text-sm text-neutral-500">

          {sub}

        </p>

      )}

    </div>

  );

}