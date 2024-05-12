import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommunityFormComponent } from '@components/community/community-form/community-form.component';
import { EditCommunityFormModel } from '@models/community.models';
import { CommunityService } from '@services/community/community.service';
import {
  BehaviorSubject,
  firstValueFrom,
  from,
  map,
  of,
  shareReplay,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-community-add-page',
  standalone: true,
  imports: [CommonModule, CommunityFormComponent],
  templateUrl: './community-add-page.component.html',
  styleUrls: ['./community-add-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityAddPageComponent {
  formGroup = this.formBuilder.group({
    name: new FormControl({ value: '', disabled: false }, Validators.required),
    image: new FormControl({ value: '', disabled: false }, Validators.required),
    desc: new FormControl({ value: '', disabled: false }, Validators.required),
  });

  saving$ = new BehaviorSubject<boolean>(false);

  community$ = this.route.params.pipe(
    switchMap((params) => {
      const id = params?.['id'];

      if (id) {
        return from(this.communityService.get(id));
      } else {
        return of(null);
      }
    }),
    shareReplay(),
  );

  loading$ = this.community$.pipe(
    switchMap((params) => {
      const id = params?.['id'];
      if (id) {
        return this.community$.pipe(map((community) => !community));
      } else {
        return of(false);
      }
    }),
  );

  constructor(
    private formBuilder: FormBuilder,
    private communityService: CommunityService,
    private route: ActivatedRoute,
  ) {
    this.setInitialFormValue();
  }

  async upsert() {
    const community = await firstValueFrom(this.community$);
    this.saving$.next(true);
    this.formGroup.disable();
    const formGroup = this.formGroup.value;
    const name = formGroup.name || '';
    const image = formGroup.image || '';
    const desc = formGroup.desc || '';

    await this.communityService.upsert({
      name,
      image,
      desc,
      id: community?.id,
    });
    this.formGroup.enable();
    this.saving$.next(false);
  }

  setFormValues(community: EditCommunityFormModel | null) {
    this.formGroup.controls.name.setValue(community?.name || '');
    this.formGroup.controls.image.setValue(community?.image || '');
    this.formGroup.controls.desc.setValue(community?.desc || '');
  }

  private async setInitialFormValue() {
    const community = await firstValueFrom(this.community$);
    this.setFormValues(community);
  }
}
