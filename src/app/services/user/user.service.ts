import { Injectable } from '@angular/core';
import { User } from '@models/User.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$!: Observable<User>;

  constructor() {
    this.connectToUser();
  }

  private async connectToUser() {
    const userMock:     User = {
      name: 'Bruno',
      img: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSUPobOTWGGkexkI3nf8u8LFP65DSHycLqi52PJLG0IDhOHSHHPSs1iJUW09LLdUcQiKnoF93mTYz7tDaQ',
    };

    this.user$ = of(userMock);
  }
}
