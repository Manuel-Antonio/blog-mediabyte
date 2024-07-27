import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = `${environment.apiUrl}/articles`;

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http
      .get<Article[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getArticle(id: number): Observable<Article> {
    return this.http
      .get<Article>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createArticle(article: Article): Observable<Article> {
    return this.http
      .post<Article>(this.apiUrl, article)
      .pipe(catchError(this.handleError));
  }

  updateArticle(id: number, article: Article): Observable<Article> {
    return this.http
      .put<Article>(`${this.apiUrl}/${id}`, article)
      .pipe(catchError(this.handleError));
  }

  deleteArticle(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
