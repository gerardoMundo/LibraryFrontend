import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, catchError } from 'rxjs';

import { IBorrowedBook, ILoan } from '../interfaces/loan.interface';
import { ENVIRONMENT } from 'src/app/environments/environment';
import { handleErrors } from 'src/app/shared/helpers/handlers';

@Injectable({
  providedIn: 'root'
})
export class LoansService {
  constructor(private http: HttpClient) {}

  private readonly BASE_URL = ENVIRONMENT.BASE_URL;

  public postLoan(data: ILoan) {
    return this.http.post(`${this.BASE_URL}/loans`, data).pipe(
      catchError((response: HttpErrorResponse) => handleErrors(response))
    );
  };

  public getBorrowedBooks(): Observable<IBorrowedBook[]> {
    return this.http.get<IBorrowedBook[]>(`${this.BASE_URL}/loans/get-borrowed-books`)
    .pipe(
      catchError((response: HttpErrorResponse) => handleErrors(response))
    )
  };

}
