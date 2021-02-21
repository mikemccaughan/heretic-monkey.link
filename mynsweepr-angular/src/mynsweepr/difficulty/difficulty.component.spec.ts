import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DifficultyComponent } from './difficulty.component';

describe('DifficultyComponent', () => {
  let component: DifficultyComponent;
  let fixture: ComponentFixture<DifficultyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DifficultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
