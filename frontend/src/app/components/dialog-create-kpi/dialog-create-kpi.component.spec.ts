import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateKpiComponent } from './dialog-create-kpi.component';

describe('DialogCreateKpiComponent', () => {
  let component: DialogCreateKpiComponent;
  let fixture: ComponentFixture<DialogCreateKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCreateKpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
