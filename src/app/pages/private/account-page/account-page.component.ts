import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '@services/supabase/supabase.service';
import { Profile, UserService } from '@services/user/user.service';
import {
  Observable,
  ReplaySubject,
  catchError,
  filter,
  finalize,
  from,
  map,
  of,
  shareReplay,
  switchMap,
  take,
} from 'rxjs';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPageComponent implements OnInit {
  loading$ = new ReplaySubject<boolean>();

  loadProfile$ = new ReplaySubject<boolean>();

  profile$!: Observable<Profile | null>;

  updateProfileForm = this.formBuilder.group({
    username: '',
    website: '',
    avatar_url: '',
  });

  constructor(
    public supabaseService: SupabaseService,
    public userService: UserService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.connectToProfileStream();
    this.loadProfile$.next(true);
  }

  private connectToProfileStream() {
    this.profile$ = this.loadProfile$.pipe(
      switchMap(() => this.supabaseService.session$),
      filter(Boolean),
      map((session) => session.user),
      filter(Boolean),
      switchMap((user) => {
        this.loading$.next(true);
        return from(this.userService.profile(user.id)).pipe(
          map(({ data }) => {
            const profile = data as Profile;
            this.updateProfileFormValues(profile);
            return profile;
          }),
          catchError(() => {
            console.log('error');
            return of(null);
          }),
          finalize(() => {
            this.loading$.next(false);
          }),
        );
      }),
      shareReplay(),
    );
  }

  async updateProfile(profile: Profile) {
    this.supabaseService.session$
      .pipe(filter(Boolean), take(1))
      .subscribe(async (session) => {
        const { id, email } = session.user;
        this.loading$.next(true);
        const username = this.updateProfileForm.value.username as string;
        const website = this.updateProfileForm.value.website as string;
        const avatar_url = this.updateProfileForm.value.avatar_url as string;

        await this.userService.updateProfile({
          id,
          username,
          website,
          avatar_url,
          email: email || '',
        });

        this.loading$.next(false);
        this.loadProfile$.next(true);
      });
  }

  private updateProfileFormValues(profile: Profile | null) {
    if (profile) {
      const { username, website, avatar_url } = profile;
      this.updateProfileForm.patchValue({
        username,
        website,
        avatar_url,
      });
    } else {
      this.updateProfileForm.reset();
    }
  }
}
