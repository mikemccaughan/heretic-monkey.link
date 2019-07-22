import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MynsweeprComponent } from './mynsweepr.component';

describe('MynsweeprComponent', () => {
  let component: MynsweeprComponent;
  let fixture: ComponentFixture<MynsweeprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MynsweeprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MynsweeprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
