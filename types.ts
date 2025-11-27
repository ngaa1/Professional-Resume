export interface Project {
  name: string;
  description: string;
}

export interface Experience {
  company: string;
  logo?: string;
  position: string;
  year: string;
  description: string;
  core_responsibilities: string[];
  projects: Project[];
}

export interface Education {
  degree: string;
  school: string;
  year: string;
  gpa: string;
  courses?: string;
  thesis?: string;
}

export interface Honor {
  title: string;
  company: string;
  year: string;
  description: string;
}

export interface Skills {
  [key: string]: string[];
}

export interface Labels {
  about_me: string;
  experience: string;
  education: string;
  honors: string;
  skills: string;
  core_responsibilities: string;
  projects: string;
  view_more: string;
  collapse: string;
  expand: string;
}

export interface ResumeData {
  lang: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  wechat: string;
  summary: string;
  tags?: string[];
  labels: Labels;
  education: Education[];
  experience: Experience[];
  honors: Honor[];
  skills: Skills;
}