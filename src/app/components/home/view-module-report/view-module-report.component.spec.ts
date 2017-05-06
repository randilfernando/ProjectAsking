import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModuleReportComponent } from './view-module-report.component';

describe('ViewModuleReportComponent', () => {
  let component: ViewModuleReportComponent;
  let fixture: ComponentFixture<ViewModuleReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewModuleReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewModuleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
