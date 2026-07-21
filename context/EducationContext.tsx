"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { educations as initialEducations } from "@/data/educations";


type Education = {
  id: number;

  title: string;

  target: string;

  date: string;

  location: string;

  status: string;


  // 교육 진행률 추가
  progress?: number;

};



type EducationContextType = {

  educations: Education[];

  addEducation: (education: Education) => void;

  deleteEducation: (id: number) => void;

  updateEducation: (education: Education) => void;

};



const EducationContext =
  createContext<EducationContextType | null>(null);



export function EducationProvider({
  children,
}: {
  children: React.ReactNode;
}) {


  const [educations, setEducations] =
    useState<Education[]>(initialEducations);




  useEffect(() => {

    const saved =
      localStorage.getItem("educations");


    if (saved) {

      const parsed =
        JSON.parse(saved);


      const updated =
        parsed.map((education:any)=>({

          ...education,

          progress:
            education.progress ?? 0,

        }));


      setEducations(updated);

    }


  }, []);





  useEffect(() => {

    localStorage.setItem(
      "educations",
      JSON.stringify(educations)
    );


  }, [educations]);






  const addEducation = (
    education: Education
  ) => {

    setEducations((prev)=>[

      ...prev,

      {
        ...education,

        progress:
          education.progress ?? 0,

      }

    ]);

  };







  const deleteEducation = (
    id:number
  ) => {

    setEducations((prev)=>

      prev.filter(

        (education)=>

          education.id !== id

      )

    );

  };








  const updateEducation = (
    updatedEducation: Education
  ) => {


    setEducations((prev)=>

      prev.map((education)=>

        education.id === updatedEducation.id

        ? {

            ...updatedEducation,

            progress:
              updatedEducation.progress ?? 0,

          }

        : education

      )

    );


  };







  return (

    <EducationContext.Provider

      value={{

        educations,

        addEducation,

        deleteEducation,

        updateEducation,

      }}

    >

      {children}

    </EducationContext.Provider>

  );

}







export function useEducations() {


  const context =
    useContext(EducationContext);



  if (!context) {

    throw new Error(

      "useEducations must be used inside EducationProvider"

    );

  }



  return context;

}