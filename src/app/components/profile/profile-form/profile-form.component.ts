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
  selector: 'app-profile-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFormComponent {
  @Input({ required: true }) profileForm!: FormGroup<{
    name: FormControl<string | null>;
    website: FormControl<string | null>;
    avatar: FormControl<string | null>;
    nick: FormControl<string | null>;
  }>;

  @Input() disabled = false;

  @Output() submit = new EventEmitter();

  emitSubmit() {
    this.submit.emit();
  }
}
