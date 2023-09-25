import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './left-nav-menu.component.html',
  styleUrls: ['./left-nav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftNavMenuComponent {}
