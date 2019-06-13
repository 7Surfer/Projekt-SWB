import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsettingsComponent } from './roomsettings.component';

describe('RoomsettingsComponent', () => {
  let component: RoomsettingsComponent;
  let fixture: ComponentFixture<RoomsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
