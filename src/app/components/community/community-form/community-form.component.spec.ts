import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, FormGroup } from '@angular/forms';
import { CommunityFormComponent } from './community-form.component';

describe('CommunityFormComponent', () => {
  let component: CommunityFormComponent;
  let fixture: ComponentFixture<CommunityFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommunityFormComponent],
    });
    fixture = TestBed.createComponent(CommunityFormComponent);
    component = fixture.componentInstance;

    component.formGroup = new FormGroup({
      name: new FormControl(''),
      image: new FormControl(''),
      desc: new FormControl(''),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
