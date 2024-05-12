import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import { AppWrapperComponent } from './app-wrapper.component';

describe('AppWrapperComponent', () => {
  let component: AppWrapperComponent;
  let fixture: ComponentFixture<AppWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppWrapperComponent, RouterModule, RouterModule.forRoot([])],
    });
    fixture = TestBed.createComponent(AppWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
