import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AddTicketComponent } from '../add-ticket/add-ticket.component';
import { TicketService } from '../services/ticket.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

// import { title } from 'process';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit, OnInit {
  formValue!: FormGroup;
  dialog: any;
  addUser: any;
  public ticketData: any;
  userData: any;
  public user: any = {};
  public ticketId: string;
  PER_page = 10;
  tickesCount: 0;
  p: number = 1;
  pageCount = 0;
  selectedTicket = {
    title: '',
    description: '',
  };
  constructor(
    private router: Router,
    readonly TicketService: TicketService,
    private formBulder: FormBuilder
  ) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  Logout() {
    window.localStorage.clear();
    this.router.navigate(['']);
  }

  // openDialog() {
  //   this.dialog.open(AddTicketComponent);
  //   this.ticketId = '';
  // }

  displayedColumns: string[] = [
    'ID',
    'title',
    'description',
    'created_by',
    'created_at',
  ];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    // this.formValue = this.formBulder : FormBuilder{
    //   title: [''],
    //   description: ['']
    // }
    this.userData = localStorage.getItem('user');
    this.addUser = JSON.parse(this.userData);
    this.TicketService.ticketAll().subscribe({
      next: (data: any) => {
        this.ticketData = data.tickets;
        console.log(data.tickets);
        console.log(this.ticketData);
      },
    });
    this.user = this.TicketService.getUser();
    console.log(this.user._id);

    this.resetFrom();
    this.selectedTicket.title = '';
    this.selectedTicket.description = '';
    this.ticketId = '';
  }

  addnew() {
    // window.localStorage.clear();
    // this.router.navigate(['']);
    this.resetFrom();
    this.selectedTicket.title = '';
    this.selectedTicket.description = '';
    this.ticketId = '';
    //
    window.location.href = '/dashboard';
  }

  resetFrom(form?: NgForm) {
    this.TicketService.selectedTicket = { title: '', description: '' };
    if (form) {
      form.reset();
    }
  }

  deleteTicket(id: string) {
    console.log('delete');
    this.TicketService.ticketDelete(id).subscribe({
      next: () => {
        alert('data deleted!');
        window.location.href = '/dashboard';
      },
    });
  }
  editTicket(id: string) {
    this.ticketId = id;
    // this.formValue.controls['id'].
    console.log(id);
    this.TicketService.getTicket(id).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.TicketService.selectedTicket = data.tickets[0];
        this.selectedTicket = this.TicketService.selectedTicket;
        console.log('selected', this.TicketService.selectedTicket);
        console.log(this.selectedTicket);
      },
    });

    // this.formValue.controls['Title'].setValue(title);
    // this.formValue.controls['Description'].setValue(description);
  }
  handleChange() {
    this.TicketService.ticketAll().subscribe({
      next: (data: any) => {
        this.ticketData = data.tickets;
        // console.log(data.tickets);
        // console.log(this.ticketData);
      },
    });
  }
  OnSubmit(form: NgForm) {
    console.log(form.value);

    console.log('is it here?');
    if (this.ticketId) {
      const { title, description } = form.value;
      if (title && description) {
        this.TicketService.ticketEdit(
          this.ticketId,
          title,
          description
        ).subscribe({
          next: (res: any) => {
            window.location.href = '/dashboard';
          },
        });
      }
    } else {
      const { title, description } = form.value;
      if (title && description) {
        this.TicketService.ticketAdd(
          title,
          description,
          this.user._id,
          this.user.firstName
        ).subscribe({
          next: (res: any) => {
            window.location.href = '/dashboard';
          },
        });
        // console.log(this.addUser._id);
        // this.TicketService.ticketAdd(
        //   this.model.Title,
        //   this.model.Description,
        //   this.addUser._id,
        //   this.addUser.firstName
        // ).subscribe({
        //   next: (data: any) => {
        //     console.log('data added', data);
        //     alert('Ticket added successful');
        //     // navigator('/dashboard');
        //   },
        // });
      }
    }
  }
}
// const ELEMENT_DATA: PeriodicElement[] = [
//   // this.TicketService.ticketAll().subscribe((data))

//   ]

// getTicket(){

//   this.TicketService.ticketAll()
//     .subscribe((res: any) => {
//       this.ticketData = res;
//   })
//   }

// function DialogContentExampleDialog(DialogContentExampleDialog: any) {
//   throw new Error('Function not implemented.');
// }
// function getTicket() {
//   throw new Error('Function not implemented.');
// }
