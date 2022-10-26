import { Candidato } from './model/candidato';
import { Component, OnInit } from '@angular/core';
import { CandidatoService } from './service/candidato.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public candidato: Candidato = {
    nome: '',
    votos: 0,
  };
  public listaDeCandidatos: Array<Candidato> = [];
  public exibirNumero: number | undefined;
  public totalDeVotos = 0;
  public habilitado = false;
  spinner = false;
  constructor(private candidatoService: CandidatoService) {}

  ngOnInit(): void {
    this.spinner = true;
    this.listarCandidatos();
    setTimeout(() => {
      this.spinner = false;
      this.ordenarPorVotos();
      this.enumerarPosicoes();
      this.calcularTotalDeVotos();
      this.calcularPercentualPorCandidato();
    }, 1000);
    //  setTimeout(() => {
    //   this. reload();
    // }, 120000);
  }
  public listarCandidatos() {
    return this.candidatoService.listarCandidatos().subscribe({
      next: (res) => (this.listaDeCandidatos = res),
      error: (err) => console.log(err),
    });
  }
  public alterarCandidato(candidato: Candidato) {
    return this.candidatoService.atualizarCandidato(candidato).subscribe({
      next: (res) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        alert('Realizado com sucesso'), res, (this.reload());
      },
      error: (err) => console.log(err),
    });
  }
  registrarVoto(valor: string) {
    //localStorage.setItem('votou', 'false');
    if (localStorage.getItem('votou') !== 'true') {
      this.calcularTotalDeVotos();
      this.habilitado = false;
      let contador = 0;
      const id = parseInt(valor, 10);
      this.listaDeCandidatos.map((candidato) => {
        // eslint-disable-next-line eqeqeq
        if (id == candidato.id) {
          contador = candidato.votos;
          contador++;
          candidato.votos = contador;
          this.alterarCandidato(candidato);
        }
      });
      localStorage.setItem('votou', 'true');
      //location.reload();
    } else {
      alert('Um voto por pessoa é o ideal para um resultado mais fiel');
    }
  }
  calcularTotalDeVotos() {
    let acumulador = 0;
    this.listaDeCandidatos.map((c) => {
      acumulador += Number(c.votos);
    });
    this.totalDeVotos = acumulador;
    console.log(this.totalDeVotos);
  }
  calcularPercentualPorCandidato() {
    let i = 0;
    this.listaDeCandidatos.map((c) => {
      const contador = Number((Number(c.votos) / this.totalDeVotos) * 100);
      setTimeout(() => {
        document.getElementsByClassName('tdPercentual')[i].innerHTML =
          contador.toFixed(2).toString() + '%';
        i++;
      }, 0);
    });
  }
  ordenarPorVotos() {
    this.listaDeCandidatos = this.listaDeCandidatos.sort((c1, c2) => {
      if (c1.votos < c2.votos) {
        return 1;
      } else if (c1.votos > c2.votos) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  enumerarPosicoes() {
    let i = 0;
    this.listaDeCandidatos.forEach((e, index) => {
      const contador = index + 1;
      setTimeout(() => {
        document.getElementsByClassName('tdColocacao')[i].innerHTML =
          contador.toString() + 'ª';
        i++;
      }, 0);
    });
  }
  reload(){
    location.reload();
  }
}
