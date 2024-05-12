import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommunityService } from '@services/community/community.service';
import { ListComponent } from '../../list/list.component';
import { CommunityCardComponent } from '../community-card/community-card.component';

@Component({
  selector: 'app-community-list',
  standalone: true,
  imports: [CommonModule, ListComponent, CommunityCardComponent],
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityListComponent {
  communities$ = this.communityService.comminities();

  constructor(private communityService: CommunityService) {}
}
