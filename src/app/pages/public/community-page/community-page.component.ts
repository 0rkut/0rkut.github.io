import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-community-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityPageComponent {

}
