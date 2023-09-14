import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppWrapperComponent } from '../app-wrapper/app-wrapper.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [CommonModule, AppWrapperComponent, RouterModule],
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicLayoutComponent {}
