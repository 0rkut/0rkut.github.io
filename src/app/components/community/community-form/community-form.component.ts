import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-community-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './community-form.component.html',
  styleUrls: ['./community-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityFormComponent {
  @Input({ required: true }) formGroup!: FormGroup<{
    name: FormControl<string | null>;
    image: FormControl<string | null>;
    desc: FormControl<string | null>;
  }>;

  @Output() submit = new EventEmitter();

  emitSubmit() {
    this.submit.emit();
  }
}
