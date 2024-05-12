import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-app-wrapper',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app-wrapper.component.html',
  styleUrls: ['./app-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppWrapperComponent {
  userService = inject(UserService);

  profile$ = this.userService.profile$;
}
