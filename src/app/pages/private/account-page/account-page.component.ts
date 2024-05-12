import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '@services/user/user.service';
import { ReplaySubject, filter, take } from 'rxjs';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPageComponent {
  loading$ = new ReplaySubject<boolean>();

  profile$ = this.userService.profile$;

  updateProfileForm = this.formBuilder.group({
    name: '',
    website: '',
    avatar: '',
  });

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.profile$.pipe(filter(Boolean), take(1)).subscribe(async (profile) => {
      this.updateProfileForm.controls['name'].setValue(profile.name);
      this.updateProfileForm.controls['website'].setValue(profile.website);
      this.updateProfileForm.controls['avatar'].setValue(profile.avatar);
    });
  }

  async updateProfile() {
    this.userService.user$
      .pipe(filter(Boolean), take(1))
      .subscribe(async (user) => {
        const profileForm = this.updateProfileForm.value;
        const id = user.id;
        const email = user.email || '';
        const name = profileForm.name || '';
        const website = profileForm.website || '';
        const avatar = profileForm.avatar || '';
        await this.userService.updateProfile({
          id,
          email: email,
          name,
          website,
          avatar,
        });

        this.loading$.next(false);
      });
  }
}
