import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscribable, Subscriber, Subscription } from 'rxjs';
import { AtendimentoService } from 'src/app/core/service/atendimento.service';
import { PedidoService } from 'src/app/core/service/pedidos.service';
import { UserService } from 'src/app/core/service/user.service';
import { Atendimento } from 'src/app/shared/model/atendimento';
import { Pedido } from 'src/app/shared/model/pedido';
import { PessoaUsuaria } from 'src/app/shared/model/type';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss']
})
export class CardapioComponent implements OnInit, OnDestroy {
  
  private mesaId: number;
  private loadMesaIdSubscription: Subscription;
  private atendimento: Atendimento;

  constructor(
    public userService: UserService,
    public atendimentoService: AtendimentoService
  ) { }

  ngOnInit(): void {
    this.loadMesaId();
    this.loadAtendimento();
  }
  
  loadMesaId(): void {
    this.loadMesaIdSubscription = this.userService.retornarUser().subscribe(user => {
      this.mesaId = user?.mesaId;
    });
  }

  iniciarAtendimento(): void {
    this.atendimento = { mesa: { id: this.mesaId } };
    this.atendimentoService.save(this.atendimento).subscribe({
      next: atendimento => this.atendimento = atendimento,
      error: httpErrorResponse => console.error("ERRO ao iniciar atendimento em Cardapio:", httpErrorResponse.error.detail)
    });
  }
  
  loadAtendimento(): void {
    this.atendimentoService.findTheLatestbyMesaId(this.mesaId).subscribe({
      next: atendimento => this.atendimento = atendimento,
      error: httpErrorResponse => console.error("ERRO ao carregar atendimento em Cardapio:", httpErrorResponse.error.detail)
    });
  }
  
  hasAtendimentoIniciado() {
    return !!this.atendimento;
  }
  
  ngOnDestroy(): void {
    if(this.loadMesaIdSubscription) this.loadMesaIdSubscription.unsubscribe();
  }
  
}

