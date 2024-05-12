import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommunityFormComponent } from '@components/community/community-form/community-form.component';
import { CommunityService } from '@services/community/community.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-community-add-page',
  standalone: true,
  imports: [CommonModule, CommunityFormComponent],
  templateUrl: './community-add-page.component.html',
  styleUrls: ['./community-add-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityAddPageComponent {
  loading$ = new BehaviorSubject<boolean>(false);

  formGroup = this.formBuilder.group({
    name: new FormControl({ value: '', disabled: false }, Validators.required),
    image: new FormControl({ value: '', disabled: false }, Validators.required),
    desc: new FormControl({ value: '', disabled: false }, Validators.required),
  });

  constructor(
    private formBuilder: FormBuilder,
    private communityService: CommunityService,
  ) {}

  async create() {
    this.loading$.next(true);
    this.formGroup.disable();
    const formGroup = this.formGroup.value;
    const name = formGroup.name || '';
    const image = formGroup.image || '';
    const desc = formGroup.desc || '';
    await this.communityService.insert({ name, image, desc });
    this.formGroup.enable();
    this.loading$.next(false);
  }
}
