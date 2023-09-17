import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Employee, EmployeeTable } from './model/employee';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  public getEmployees(
    pageNumber: Number,
    pageSize: Number
  ): Observable<EmployeeTable> {
    const url = `https://reqres.in/api/users?page=${pageNumber}&per_page=${pageSize}`;

    return this.http.get<EmployeeTable>(url);
  }
}
