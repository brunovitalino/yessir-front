import { EventEmitter, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Pedido } from '../../model/pedido';

@Injectable({
  providedIn: 'root'
})
export class ModalAdicionarService {

  private confirmarEvent = new EventEmitter<boolean>();
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      id: new FormControl(0),
      nome: new FormControl('prato padrão'),
      preco: new FormControl(0),
      nomeIcone: new FormControl('local_dining'),
      tipo: new FormControl('COMIDA'),
      quantidade: new FormControl(0)
    });
    // var pedidoFormControlers = Object.keys(this.pedido).map(key => [key, new FormControl(this.pedido[key])]);
    // this.formGroup = new FormGroup(Object.fromEntries(pedidoFormControlers));
  }

  obterFormControl(formControlName: string): FormControl {
    const control = this.formGroup.get(formControlName);
    if (!control) {
      throw new Error(`FormControl com nome "${formControlName}" não existe.`);
    }
    return control as FormControl;
  }

  confirmar(): void {
    this.confirmarEvent.emit(true);
  }

  getConfirmarEvent(): EventEmitter<boolean> {
    return this.confirmarEvent;
  }
}