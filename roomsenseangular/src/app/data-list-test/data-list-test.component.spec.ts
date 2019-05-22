import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataListTestComponent } from './data-list-test.component';

describe('DataListTestComponent', () => {
  let component: DataListTestComponent;
  let fixture: ComponentFixture<DataListTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataListTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataListTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
