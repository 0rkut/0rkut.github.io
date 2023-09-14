import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppWrapperComponent } from '@components/layout/app-wrapper/app-wrapper.component';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [CommonModule, AppWrapperComponent],
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {}
