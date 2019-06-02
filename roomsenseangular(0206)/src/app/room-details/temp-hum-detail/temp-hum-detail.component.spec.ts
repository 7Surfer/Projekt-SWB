import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempHumDetailComponent } from './temp-hum-detail.component';

describe('TempHumDetailComponent', () => {
  let component: TempHumDetailComponent;
  let fixture: ComponentFixture<TempHumDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempHumDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempHumDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
