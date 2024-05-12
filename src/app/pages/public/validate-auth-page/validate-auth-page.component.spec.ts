import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import { ValidateAuthPageComponent } from './validate-auth-page.component';

describe('ValidateAuthPageComponent', () => {
  let component: ValidateAuthPageComponent;
  let fixture: ComponentFixture<ValidateAuthPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ValidateAuthPageComponent,
        RouterModule,
        RouterModule.forRoot([]),
      ],
    });
    fixture = TestBed.createComponent(ValidateAuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
