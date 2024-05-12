import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import { CommunityAddPageComponent } from './community-add-page.component';

describe('CommunityAddPageComponent', () => {
  let component: CommunityAddPageComponent;
  let fixture: ComponentFixture<CommunityAddPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommunityAddPageComponent, RouterModule.forRoot([])],
    });
    fixture = TestBed.createComponent(CommunityAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
