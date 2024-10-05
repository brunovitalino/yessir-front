import { Component } from '@angular/core';
import { CardapioService } from '../../../cardapio.service';
import { CardBuscaCardapioService } from '../card-busca-cardapio.service';
import { Cardapio } from '../../../../../shared/model/cardapio';
import { PedidoService } from 'src/app/core/service/pedidos.service';
import { AtendimentoService } from 'src/app/core/service/atendimento.service';
import { UserService } from 'src/app/core/service/user.service';
import { pipe, map, switchMap, of, tap } from 'rxjs';
import { Pedido } from 'src/app/shared/model/pedido';
import { Atendimento } from 'src/app/shared/model/atendimento';

@Component({
  selector: 'app-modal-pedir',
  templateUrl: './modal-pedir.component.html',
  styleUrls: ['./modal-pedir.component.scss']
})
export class ModalPedirComponent {

  constructor(
    public cardBuscaCardapioService: CardBuscaCardapioService,
    public userService: UserService,
    public atendimentoService: AtendimentoService,
    public pedidoService: PedidoService
  ) { }

  confirmar() {
    // this.cardBuscaCardapioService.formCardapio.get("quantidade")?.patchValue(7);
    window.console.log('ITEM FINAL', this.cardBuscaCardapioService.formCardapio.value);
    this.userService.retornarUser().pipe(
      switchMap(user => !user ? of({} as Atendimento) : this.atendimentoService.findTheLatestbyMesaId(user.mesaId)),
      switchMap(atendimento => {
        if (!atendimento) return of({} as Pedido);
        const cardapio: Cardapio = this.cardBuscaCardapioService.formCardapio.value;
        const pedido: Pedido = { atendimento, cardapio, quantidade: cardapio.quantidade }
        return this.pedidoService.save(pedido)
      })
    ).subscribe({
      next: pedido => {
        console.log("retorno de pedido", pedido);
        this.cardBuscaCardapioService.formCardapio.get("quantidade")?.patchValue(1);
      },error: httpErrorResponse => console.log("ERROR", httpErrorResponse.err.detail)
    });
  }

}
