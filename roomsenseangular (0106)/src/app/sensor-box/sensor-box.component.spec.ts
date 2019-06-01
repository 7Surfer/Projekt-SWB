import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorBoxComponent } from './sensor-box.component';

describe('SensorBoxComponent', () => {
  let component: SensorBoxComponent;
  let fixture: ComponentFixture<SensorBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
