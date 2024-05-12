import { Injectable } from '@angular/core';

export type ConfirmationConfig = {
  message: string;
  description: string;
  actions: {
    type: 'error' | 'warning' | 'success';
    callback: () => void;
  }[];
};

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  confirm({ message, description, actions }: ConfirmationConfig) {
    const confirmed = window.confirm(`
      ${message}
      \n\n
      ${description}
    `);

    if (confirmed) {
      actions[0].callback();
    }
  }
}
