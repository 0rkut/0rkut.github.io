import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '@models/profile.models';
import { AuthService } from '@services/auth/auth.service';
import { SupabaseService } from '@services/supabase/supabase.service';
import { UserService } from '@services/user/user.service';
import { User } from '@supabase/supabase-js';
import { firstValueFrom, take } from 'rxjs';

@Component({
  selector: 'app-validate-auth-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validate-auth-page.component.html',
  styleUrls: ['./validate-auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidateAuthPageComponent implements OnInit {
  private authService = inject(AuthService);

  private supabase = inject(SupabaseService);

  private userService = inject(UserService);

  private router = inject(Router);

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.detectAuthStatus();
  }

  private detectAuthStatus() {
    this.supabase.session$.pipe(take(1)).subscribe(async (session) => {
      const redirectUrl = this.route.snapshot.queryParams['redirectUrl'];
      if (session?.user?.id) {
        await this.checkInititalProfile(session?.user);
        this.router.navigate([redirectUrl || '/']);
      } else {
        this.authService.goToLoginAndComeBackAfter();
      }
    });
  }

  private setInitialProfile(data: Partial<Profile>) {
    const update = data as Profile;
    return this.userService.updateProfile(update);
  }

  private async checkInititalProfile(user: User) {
    const profile = await firstValueFrom(this.userService.profile$);
    if (!profile) {
      const {
        email,
        id,
        user_metadata: { name },
      } = user;
      const { website, avatar_url: avatar } = user.user_metadata;
      return this.setInitialProfile({
        id,
        email: email || '',
        website,
        avatar,
        name,
        nick: email,
      });
    } else {
      return true;
    }
  }
}
