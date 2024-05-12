import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommunityListComponent } from '@components/community/community-list/community-list.component';
import { FriendListComponent } from '@components/friend/friend-list/friend-list.component';
import { ProfileFormComponent } from '@components/profile/profile-form/profile-form.component';
import { UserService } from '@services/user/user.service';
import { BehaviorSubject, filter, take } from 'rxjs';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FriendListComponent,
    CommunityListComponent,
    ProfileFormComponent,
  ],
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPageComponent {
  loading$ = new BehaviorSubject<boolean>(false);

  profile$ = this.userService.profile$;

  profileForm = this.formBuilder.group({
    name: '',
    website: '',
    avatar: '',
    nick: '',
  });

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.profile$.pipe(filter(Boolean), take(1)).subscribe(async (profile) => {
      this.profileForm.controls['name'].setValue(profile.name);
      this.profileForm.controls['website'].setValue(profile.website);
      this.profileForm.controls['avatar'].setValue(profile.avatar);
      this.profileForm.controls['nick'].setValue(profile.nick);
    });
  }

  async updateProfile() {
    this.loading$.next(true);
    this.userService.user$
      .pipe(filter(Boolean), take(1))
      .subscribe(async (user) => {
        const profileForm = this.profileForm.value;
        const id = user.id;
        const email = user.email || '';
        const name = profileForm.name || '';
        const website = profileForm.website || '';
        const avatar = profileForm.avatar || '';
        const nick = profileForm.nick || '';
        await this.userService.updateProfile({
          id,
          email: email,
          name,
          website,
          avatar,
          nick,
        });

        this.loading$.next(false);
      });
  }
}
