import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MineboardComponent } from './mineboard.component';

describe('MineboardComponent', () => {
  let component: MineboardComponent;
  let fixture: ComponentFixture<MineboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MineboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
