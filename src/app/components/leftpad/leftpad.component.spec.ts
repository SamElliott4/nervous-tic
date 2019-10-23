import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftpadComponent } from './leftpad.component';

describe('LeftpadComponent', () => {
  let component: LeftpadComponent;
  let fixture: ComponentFixture<LeftpadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftpadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftpadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
