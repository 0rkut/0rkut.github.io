import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '@services/supabase/supabase.service';
import { Profile, UserService } from '@services/user/user.service';
import { User } from '@supabase/supabase-js';
import { take } from 'rxjs';

@Component({
  selector: 'app-validate-auth-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validate-auth-page.component.html',
  styleUrls: ['./validate-auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidateAuthPageComponent implements OnInit {
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
        this.router.navigate(['/login']);
      }
    });
  }

  private setInitialProfile(data: Partial<Profile>) {
    const update = data as Profile;
    this.userService.updateProfile(update);
  }

  private async checkInititalProfile(user: User) {
    const { error } = await this.userService.profile(user.id);
    if (error) {
      const { email, id } = user;
      const { username, website, avatar_url } = user.user_metadata;
      return this.setInitialProfile({
        id,
        email: email || '',
        username,
        website,
        avatar_url,
      });
    } else {
      return true;
    }
  }
}
