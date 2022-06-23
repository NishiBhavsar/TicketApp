import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../shared/ticket.model';
@Injectable({
  providedIn: 'root',
})
export class TicketService {
  // static TicketService() {
  //   throw new Error('Method not implemented.');
  // }
  static http: any;
  selectedTicket: Ticket;
  constructor(private http: HttpClient) {}

  // baseURL = 'http://localhost:8000/Ticket/all';
  ticketAll() {
    return this.http.get('http://localhost:8000/Ticket/all', {});
  }

  getUser(): any {
    const user = window.localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
  }

  ticketAdd(title: string, description: string, id: string, firstName: string) {
    return this.http.post('http://localhost:8000/Ticket/add', {
      title,
      description,

      id,
      firstName,
    });
  }
  ticketDelete(id: string) {
    return this.http.delete('http://localhost:8000/Ticket/' + id, {});
  }
  ticketEdit(id: string, title: string, description: string) {
    return this.http.put('http://localhost:8000/Ticket/' + id, {
      title,
      description,
    });
  }
  getTicket(id: string) {
    return this.http.get('http://localhost:8000/Ticket/' + id, {});
  }
}
