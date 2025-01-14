import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements AfterViewInit {

  constructor(private builder: FormBuilder, private service: AuthService, 
    private dialog: MatDialog, private router:Router) {
    this.LoadUser();
  }
  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {

  }
  LoadUser() {
    this.service.getAll().subscribe(res => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  displayedColumns: string[] = ['username', 'name', 'email', 'status', 'role'];

  registration(){
    this.router.navigate([''])
  }
  // updateuser(code: any) {
  //   this.OpenDialog('1000ms', '600ms', code);
  // }

  // OpenDialog(enteranimation: any, exitanimation: any, code: string) {
  //   const popup = this.dialog.open(UpdatepopupComponent, {
  //     enterAnimationDuration: enteranimation,
  //     exitAnimationDuration: exitanimation,
  //     width: '30%',
  //     data: {
  //       usercode: code
  //     }
  //   });
  //   popup.afterClosed().subscribe(res => {
  //     this.LoadUser();
  //   });
  // }



}