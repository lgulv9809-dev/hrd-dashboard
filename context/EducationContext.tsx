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
      setEducations(JSON.parse(saved));
    }

  }, []);


  useEffect(() => {
    localStorage.setItem(
      "educations",
      JSON.stringify(educations)
    );

  }, [educations]);


  const addEducation = (education: Education) => {
    setEducations((prev) => [
      ...prev,
      education,
    ]);
  };


  const deleteEducation = (id: number) => {
    setEducations((prev) =>
      prev.filter(
        (education) =>
          education.id !== id
      )
    );
  };


  const updateEducation = (
    updatedEducation: Education
  ) => {
    setEducations((prev) =>
      prev.map((education) =>
        education.id === updatedEducation.id
          ? updatedEducation
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