import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { SupabaseService } from '@services/supabase/supabase.service';
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
export class AppWrapperComponent implements OnInit {
  private userService = inject(UserService);

  user$ = this.userService.user$;

  session = this.supabase.session;

  @Input() showLeft!: string;

  constructor(private readonly supabase: SupabaseService) {
    this.connectToUser();
  }

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session));
  }

  private connectToUser() {
    this.user$.subscribe((a) => {
      console.log('USER logged?', a, this.session);
    });
  }
}
