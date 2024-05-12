import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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

  formGroup = this.formBuilder.group({
    name: new FormControl({ value: '', disabled: false }, Validators.required),
    website: new FormControl(
      { value: '', disabled: false },
      Validators.required,
    ),
    avatar: new FormControl(
      { value: '', disabled: false },
      Validators.required,
    ),
    nick: new FormControl({ value: '', disabled: false }, Validators.required),
    bio: new FormControl({ value: '', disabled: false }, Validators.required),
  });

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.profile$.pipe(filter(Boolean), take(1)).subscribe(async (profile) => {
      this.formGroup.controls['name'].setValue(profile.name);
      this.formGroup.controls['website'].setValue(profile.website);
      this.formGroup.controls['avatar'].setValue(profile.avatar);
      this.formGroup.controls['nick'].setValue(profile.nick);
      this.formGroup.controls['bio'].setValue(profile.bio);
    });
  }

  async updateProfile() {
    this.loading$.next(true);
    this.formGroup.disable();
    this.userService.user$
      .pipe(filter(Boolean), take(1))
      .subscribe(async (user) => {
        const formGroup = this.formGroup.value;
        const id = user.id;
        const name = formGroup.name || '';
        const website = formGroup.website || '';
        const avatar = formGroup.avatar || '';
        const nick = formGroup.nick || '';
        const bio = formGroup.bio || '';
        await this.userService.updateProfile({
          id,
          name,
          website,
          avatar,
          nick,
          bio,
        });
        this.formGroup.enable();
        this.loading$.next(false);
      });
  }
}
