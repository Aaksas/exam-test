import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Exam } from '../exam.model';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private apiUrl = 'http://localhost:3000/exams';

  constructor(private http: HttpClient) {}

  getExams(): Observable<Exam[]> {
    return this.http
      .get<Exam[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  addExam(exam: Exam): Observable<Exam> {
    return this.http
      .post<Exam>(this.apiUrl, exam)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Gestion des erreurs
    return throwError(
      () => new Error('Erreur lors de la communication avec l’API.')
    );
  }
}
