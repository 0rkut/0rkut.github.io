import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SupabaseService } from '@services/supabase/supabase.service';
import { UserService } from '@services/user/user.service';
import { Observable } from 'rxjs';
import { CommunityListComponent } from '../../community/community-list/community-list.component';
import { FriendListComponent } from '../../friend/friend-list/friend-list.component';
import { AppWrapperState } from './app-wrapper.types';
import { routeData } from './router-data.helpers';

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

  appName = '0rkut';

  user$ = this.userService.user$;

  session = this.supabase.session;

  routeData$!: Observable<AppWrapperState>;

  constructor(
    private readonly supabase: SupabaseService,
    private route: ActivatedRoute,
  ) {
    this.connectToUser();
    this.connectToRouteData();
  }

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session));
  }

  private connectToUser() {
    this.user$.subscribe((a) => {
      console.log('USER logged?', a, this.session);
    });
  }

  private connectToRouteData() {
    this.routeData$ = routeData<AppWrapperState>(this.route);
  }
}
