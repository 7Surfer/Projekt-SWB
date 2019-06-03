import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoomYannikComponent } from './create-room-yannik.component';

describe('CreateRoomYannikComponent', () => {
  let component: CreateRoomYannikComponent;
  let fixture: ComponentFixture<CreateRoomYannikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRoomYannikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoomYannikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
