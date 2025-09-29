import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogKpiUpdateComponent } from './dialog-kpi-update.component';

describe('DialogKpiUpdateComponent', () => {
  let component: DialogKpiUpdateComponent;
  let fixture: ComponentFixture<DialogKpiUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogKpiUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogKpiUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
