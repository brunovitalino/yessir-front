import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

interface AuthResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private apiUrl: string = environment.apiHost;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  autenticar(email: string, senha: string): Observable<HttpResponse<AuthResponse>> {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/login`,
      { email, senha },
      { observe: 'response', headers }
    ).pipe(
      tap((response) => {
        const authToken = response.body?.access_token || '';
        this.userService.salvarToken(authToken);
      })
    );
  }

  isGarcomAutenticado(): boolean {
    return this.userService.isGarcom();
  }

}
