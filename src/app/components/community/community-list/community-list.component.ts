import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommunityService } from '@services/community/community.service';
import { CommunityCardComponent } from '../community-card/community-card.component';

@Component({
  selector: 'app-community-list',
  standalone: true,
  imports: [CommonModule, CommunityCardComponent],
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityListComponent {
  communities$ = this.communityService.list();

  @Output() total = new EventEmitter<number>();

  constructor(private communityService: CommunityService) {
    this.communities$
      .then((communities = []) => communities?.length)
      .then((total) => this.total.emit(total));
  }
}
