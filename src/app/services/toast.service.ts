import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  showSuccess(msg: string = 'Operation completed'){
    this.show(msg, { classname: 'bg-success text-light', delay: 5000 })
  }

  showError(response: any){
    this.show((response.error.message) ? response.error.message : "An unknown error has accured, please contact the administrator", { classname: 'bg-danger text-light', delay: 15000 })
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
