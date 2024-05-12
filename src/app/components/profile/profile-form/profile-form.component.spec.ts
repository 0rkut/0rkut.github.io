import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileFormComponent } from './profile-form.component';

describe('ProfileFormComponent', () => {
  let component: ProfileFormComponent;
  let fixture: ComponentFixture<ProfileFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileFormComponent],
    });
    fixture = TestBed.createComponent(ProfileFormComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({
      name: new FormControl(
        { value: '', disabled: false },
        Validators.required,
      ),
      website: new FormControl(
        { value: '', disabled: false },
        Validators.required,
      ),
      avatar: new FormControl(
        { value: '', disabled: false },
        Validators.required,
      ),
      nick: new FormControl(
        { value: '', disabled: false },
        Validators.required,
      ),
      bio: new FormControl({ value: '', disabled: false }, Validators.required),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
