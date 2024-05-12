import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '@services/user/user.service';
import { ReplaySubject, filter, take } from 'rxjs';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPageComponent {
  loading$ = new ReplaySubject<boolean>();

  profile$ = this.userService.profile$;

  username = '';

  website = '';

  avatar = '';

  name = '';

  constructor(public userService: UserService) {}

  async updateProfile() {
    this.userService.user$
      .pipe(filter(Boolean), take(1))
      .subscribe(async (user) => {
        const {
          id,
          email,
          user_metadata: { name },
        } = user;
        this.loading$.next(true);
        const username = this.username;
        const website = this.website;
        const avatar = this.avatar;
        await this.userService.updateProfile({
          id,
          name,
          website,
          avatar,
          email: email || '',
        });

        this.loading$.next(false);
      });
  }
}
