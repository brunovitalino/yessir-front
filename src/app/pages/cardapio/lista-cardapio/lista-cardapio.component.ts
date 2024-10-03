import { Component, OnInit } from '@angular/core';
import { Cardapio } from '../../../shared/model/cardapio';
import { CardapioService } from '../cardapio.service';

@Component({
  selector: 'app-lista-cardapio',
  templateUrl: './lista-cardapio.component.html',
  styleUrls: ['./lista-cardapio.component.scss']
})
export class ListaCardapioComponent implements OnInit {

  listaCardapio: Cardapio[] = [];

  constructor(private cardapioService: CardapioService) { }

  ngOnInit(): void {
    this.cardapioService.findAllContent().subscribe(cardapioList => {
      this.listaCardapio = cardapioList
    })
  }

}
