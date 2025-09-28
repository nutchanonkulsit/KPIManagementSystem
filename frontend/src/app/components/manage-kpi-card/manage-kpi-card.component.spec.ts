import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageKpiCardComponent } from './manage-kpi-card.component';

describe('ManageKpiCardComponent', () => {
  let component: ManageKpiCardComponent;
  let fixture: ComponentFixture<ManageKpiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageKpiCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageKpiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
