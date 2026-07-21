type SummaryCardProps = {
  title: string;
  value: string;
};



export default function SummaryCard({

  title,
  value,

}: SummaryCardProps) {



  const percent =
    Number(
      value.replace("%","")
    );



  const isWorkload =
    title === "업무 부하량";



  let valueColor =
    "text-neutral-900";



  if(isWorkload){


    if(percent > 100){

      valueColor =
        "text-red-600";

    }


    else if(percent >= 80){

      valueColor =
        "text-yellow-500";

    }


    else{

      valueColor =
        "text-green-600";

    }


  }






  return (

    <div className="rounded-2xl bg-white p-6 shadow-sm border border-neutral-200 hover:shadow-md transition">



      <p className="text-sm text-neutral-500">

        {title}

      </p>





      <h2

        className={`mt-4 text-3xl font-bold ${valueColor}`}

      >

        {value}

      </h2>





      <p className="mt-3 text-sm text-green-700">

      </p>




    </div>

  );

}