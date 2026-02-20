// types/cv.types.ts

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

export interface Experience {
  id: string;

  company: string;
  position: string;
  description: string;

  startMonth: string;
  startYear: string;

  endMonth: string;
  endYear: string;

  current: boolean;
}


export interface Education {
  id: number;
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
}

export interface Language {
  id: number;
  name: string;
  level: 'Básico' | 'Intermediário' | 'Avançado' | 'Fluente' | 'Nativo';
}

export interface CVData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  languages: Language[];
}