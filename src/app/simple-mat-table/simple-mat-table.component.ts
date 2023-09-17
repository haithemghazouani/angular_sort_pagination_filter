import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Employee,Employe, EmployeeTable } from '../model/employee';
import { MatPaginator } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { EmpFilter, filterOption } from '../model/empfilter';
import { MatSelectChange } from '@angular/material/select';
import { MatSort, Sort } from '@angular/material/sort';
import { MatFormFieldAppearance } from '@angular/material/form-field';

import { EmployeeService } from '../employee.service';
import { merge, Observable, of as observableOf, pipe } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-simple-mat-table',
  templateUrl: './simple-mat-table.component.html',
  styleUrls: ['./simple-mat-table.component.scss'],
})
export class SimpleMatTableComponent implements OnInit {
 displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'email',
    'avatar',
  ];
  empTable!: EmployeeTable;
  totalData!: number;
  EmpData!: Employee[];

  dataSource = new MatTableDataSource<Employee>();

  isLoading = false;
  empFilters: EmpFilter[]=[];
  

  constructor(public empService: EmployeeService) {}

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('empTbSort') empTbSort =  new MatSort();
  
  @ViewChild('empTbSortWithObject') empTbSortWithObject = new MatSort();

  pageSizes = [3, 5, 7];

  getTableData$(pageNumber: Number, pageSize: Number) {
    return this.empService.getEmployees(pageNumber, pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.getTableData$(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((empData) => {
          if (empData == null) return [];
          this.totalData = empData.total;
          this.isLoading = false;
          return empData.data;
        })
      )
      .subscribe((empData) => {
        this.EmpData = empData;
        this.dataSource = new MatTableDataSource(this.EmpData);
        this.dataSource.sort = this.empTbSort;

      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {}
}
