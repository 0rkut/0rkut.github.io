import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppWrapperComponent } from './app-wrapper.component';

describe('AppWrapperComponent', () => {
  let component: AppWrapperComponent;
  let fixture: ComponentFixture<AppWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppWrapperComponent]
    });
    fixture = TestBed.createComponent(AppWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
