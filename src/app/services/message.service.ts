import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private messageService: MessageService
  ) { }
    
  showSuccess(message: string, title: string = "Operación exitosa") {
    this.messageService.add({ severity: 'success', summary: title, detail: message });
  }

  showError(message: string, title: string = "Operación fallida") {
    this.messageService.add({ severity: 'error', summary: title, detail: message });
  }

  showInfo(message: string, title: string = "Información") {
    this.messageService.add({severity:'info', summary: title, detail: message});
  }
  showWarn(message: string, title: string = "Aviso") {
    this.messageService.add({severity:'warn', summary: title, detail: message});
  }

}
