import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '@services/user/user.service';
import { CommunityListComponent } from '../../community/community-list/community-list.component';
import { FriendListComponent } from '../../friend/friend-list/friend-list.component';

@Component({
  selector: 'app-app-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FriendListComponent,
    CommunityListComponent,
  ],
  templateUrl: './app-wrapper.component.html',
  styleUrls: ['./app-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppWrapperComponent {
  private userService = inject(UserService);

  appName = '0rkut';

  user$ = this.userService.user$;

  @Input() hideLeftPanel = false;

  @Input() hideMidlePanel = false;

  @Input() hideRightPanel = false;

  goToLogin() {
    this.userService.goToLogin();
  }
}
