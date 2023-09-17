export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  
}
export interface Employe {
  id : number,	
  firstname:string,	
  lastname:string,	
  email:string,
  gender:string,	
  jobtitle:string,
  department:string,
  project: Project
}
export interface EmployeeTable {
  data: Employee[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface Project {
  name: string;
  id: number;
}
