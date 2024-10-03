import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { PageResponse } from 'src/app/shared/model/page-response';
import { Pedido } from 'src/app/shared/model/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private readonly API_HOST = environment.apiHost;
  private readonly ENDPOINT = `${this.API_HOST}/pedidos`

  constructor(private httpClient: HttpClient) { }
  
  findAllContent(): Observable<Pedido[]> {
    return this.findAll().pipe(
      map(page => page.content as Pedido[])
    );
  }

  findAll(): Observable<PageResponse> {
    const headers = new HttpHeaders({
      //'Origin':'*',
      //'Access-Control-Allow-Origin':'*',
      'Accept':'application/json'
    });
    return this.httpClient.get<PageResponse>(this.ENDPOINT, {headers});
  }

  findOnebyId(id: number): Observable<Pedido> {
    return this.httpClient.get<Pedido>(`${this.ENDPOINT}/${id}`);
  }

  findTheLatestbyAtendimentoId(atendimentoId: number): Observable<Pedido[]> {
    return this.httpClient.get<Pedido[]>(`${this.ENDPOINT}/atendimento/${atendimentoId}`);
  }

  save(pedido: Pedido): void {
    const headers = new HttpHeaders({
      'Accept':'application/json',
      'Content-Type':'application/json'
    });
    this.httpClient.post<Pedido>(this.ENDPOINT, pedido, {headers});
  }

  update(pedido: Pedido): void {
    const headers = new HttpHeaders({
      'Accept':'application/json',
      'Content-Type':'application/json'
    });
    this.httpClient.put<Pedido>(this.ENDPOINT, pedido, {headers});
  }
}