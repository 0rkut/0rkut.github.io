import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppWrapperComponent } from '../app-wrapper/app-wrapper.component';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [CommonModule, AppWrapperComponent, RouterModule],
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateLayoutComponent {}
