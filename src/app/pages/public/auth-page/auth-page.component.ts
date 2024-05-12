import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent {

  email = '';

  private authService = inject(AuthService);

  signIn() {
    this.authService.signIn(this.email);
  }

}
