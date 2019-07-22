import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineboardComponent } from './mineboard.component';

describe('MineboardComponent', () => {
  let component: MineboardComponent;
  let fixture: ComponentFixture<MineboardComponent>;

  beforeEach(async(() => {
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
