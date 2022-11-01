import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidato } from '../model/candidato';
@Injectable({
  providedIn: 'root',
})
export class CandidatoService {
  public emitEvent = new EventEmitter();

  private url = '//www.reinan1971.c41.integrator.host/';

  constructor(private http: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/member-ordering
  httpOptions = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
  };

  public listarCandidatos(): Observable<Array<Candidato>> {
    return this.http.get<Array<Candidato>>(`${this.url}candidatos`).pipe(
      (res) => res,
      (error) => error
    );
  }
  public cadastrarCandidatos(candidato: Candidato): Observable<Candidato> {
    return this.http
      .post<Candidato>(
        `${this.url}cadidatos`,
        JSON.stringify(candidato),
        this.httpOptions
      )
      .pipe(
        (res) => res,
        (error) => error
      );
  }
  public removerCandidato(candidato: Candidato): Observable<Candidato> {
    return this.http
      .post<Candidato>(
        `${this.url}cadidatos/${candidato.id}`,
        JSON.stringify(candidato),
        this.httpOptions
      )
      .pipe(
        (res) => res,
        (error) => error
      );
  }
  public atualizarCandidato(candidato: Candidato): Observable<Candidato> {
    return this.http
      .put<Candidato>(
        `${this.url}candidatos/${candidato.id}`,
        JSON.stringify(candidato),this.httpOptions
      )
      .pipe(
        (res) => res,
        (error) => error
      );
  }
}
