import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SupabaseService } from '@services/supabase/supabase.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private supabaseService = inject(SupabaseService);

  private route = inject(ActivatedRoute);

  signInWithGoogle() {
    const redirectUrl = this.route.snapshot.queryParams['redirectUrl'];
    this.supabaseService.signInWithGoogle({ redirectUrl });
  }
}
