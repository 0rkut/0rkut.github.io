import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import { CommunityCardComponent } from './community-card.component';

describe('CommunityCardComponent', () => {
  let component: CommunityCardComponent;
  let fixture: ComponentFixture<CommunityCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommunityCardComponent, RouterModule, RouterModule.forRoot([])],
    });
    fixture = TestBed.createComponent(CommunityCardComponent);
    component = fixture.componentInstance;

    component.community = {} as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
