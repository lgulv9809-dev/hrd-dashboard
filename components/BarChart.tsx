"use client";


type Data = {

  name:string;

  value:number;

};



export default function BarChart({

  title,

  data

}:{

  title:string;

  data:Data[];

}){


  const total =
  data.reduce(
    (sum,item)=>sum+item.value,
    0
  );



  return (

    <div className="rounded-2xl bg-white p-6 shadow">


      <h2 className="text-xl font-bold mb-6">

        {title}

      </h2>




      <div className="space-y-5">


        {
          data.map(item=>{


           const percent =
  total
  ? Math.round(
      (item.value / total) * 100
    )
  : 0;



            return (

              <div key={item.name}>


                <div className="mb-1 flex justify-between">


                  <span className="font-medium">

                    {item.name}

                  </span>


                  <span className="text-neutral-500">

  {item.value}건 (
  {Math.round(
    (item.value /
      data.reduce(
        (sum,item)=>sum+item.value,
        0
      )
    ) * 100
  )}%
  )

</span>


                </div>





                <div className="
                  h-5
                  rounded-full
                  bg-neutral-200
                ">


                  <div

                    className="
                    h-5
                    rounded-full
                    bg-green-700
                    "

                    style={{

                      width:`${percent}%`

                    }}

                  />


                </div>



              </div>


            );


          })
        }


      </div>


    </div>


  );

}