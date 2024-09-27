import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, credentials).pipe(
      catchError(this.handleError)
    );
  }

  signup(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user).pipe(
      catchError(this.handleSignupError)
    );
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  //Get the token from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isUserLoggedIn() {
    return !!this.getToken();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'An unknown error occured!';

    if (error.status === 400) {
      errorMsg = 'Invalid credentials,check your email & password!';
    }
    else if (error.status === 500) {
      errorMsg = 'Server error, please try again later!';
    }

    return throwError(errorMsg);
  }

  private handleSignupError(error: HttpErrorResponse) {
    let errorMsg = 'An unknown error occured!';

    if (error.status === 400) {
      errorMsg = 'User already exists!';
    }
    else if (error.status === 500) {
      errorMsg = 'Server error, please try again later!';
    }

    return throwError(errorMsg);
  }
}
