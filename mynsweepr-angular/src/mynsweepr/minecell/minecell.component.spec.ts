import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinecellComponent } from './minecell.component';

describe('MinecellComponent', () => {
  let component: MinecellComponent;
  let fixture: ComponentFixture<MinecellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinecellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinecellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
