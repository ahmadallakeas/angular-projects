import { EventEmitter, Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active',
    },
    {
      name: 'Testaccount',
      status: 'inactive',
    },
    {
      name: 'Hidden Account',
      status: 'unknown',
    },
  ];
  statusUpdate= new EventEmitter<string>()
  addAccount(name: string, status: string) {
    this.accounts.push({ name: name, status: status });
    this.loggingService.logStatusChanged(status);
  }
  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChanged(status);
    this.statusUpdate.emit(status)
  }
  constructor(private loggingService: LoggingService) {}
}
