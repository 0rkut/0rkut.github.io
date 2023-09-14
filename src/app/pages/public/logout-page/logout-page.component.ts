import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SupabaseService } from '@services/supabase/supabase.service';

@Component({
  selector: 'app-logout-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutPageComponent {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly router: Router,
  ) {
    this.supabase.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
