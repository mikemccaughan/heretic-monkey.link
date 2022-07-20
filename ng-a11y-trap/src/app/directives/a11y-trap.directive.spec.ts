import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser/platform-browser';
import { A11yTrapDirective } from './a11y-trap.directive';

@Component({
  template: `
  <div>
    <button type="button" id="trigger" (click)="expanded = !expanded" aria-hidden="false" tabindex="0">Trigger</button>
    <div class="pop" *a11yTrap="expanded; labelledBy: 'trigger'">
      <input type="text" id="focusable">
    </div>
  </div>
  `,
})
class A11yTrapTestComponent {
  public expanded = false;
  constructor() {}
}

describe('AllyTrapDirective', () => {
  let fixture: ComponentFixture<A11yTrapTestComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [A11yTrapDirective, A11yTrapTestComponent],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(A11yTrapTestComponent);
    fixture.detectChanges();
  });
  it('should create an instance of component', () => {
    expect(fixture.componentInstance).toBeDefined();
  });
  it('should set boolean to true when button is clicked', async () => {
    fixture.debugElement.query(By.css('#trigger')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture.componentInstance!.expanded).toBeTrue();
  });
  it('should add a role=document wrapper when button is clicked', async () => {
    fixture.debugElement.query(By.css('#trigger')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[role="document"]'))).withContext('expected an element with a role of document').not.toBeNull();
  });
  it('should add a role=dialog wrapper when button is clicked', async () => {
    fixture.debugElement.query(By.css('#trigger')).nativeElement.click();
    fixture.detectChanges();
    const dialog = fixture.debugElement.query(By.css('[role="dialog"]'));
    expect(dialog).withContext('expected an element with a role of dialog').not.toBeNull();
    expect(dialog.nativeElement.getAttribute('aria-modal')).toBe('true');
    expect(dialog.nativeElement.getAttribute('aria-labelledby')).toBe('trigger');
  });
  it('should remove aria-hidden when button is clicked', async () => {
    fixture.detectChanges();
    fixture.debugElement.query(By.css('#trigger')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.pop')).nativeElement.getAttribute('aria-hidden'))
      .withContext('aria-hidden should be gone after click')
      .toBeNull();
  });
  it('should set aria-hidden to true and tabindex to -1 on all elements except applied element, when button is clicked', async () => {
    fixture.detectChanges();
    fixture.debugElement.query(By.css('#trigger')).nativeElement.click();
    fixture.detectChanges();
    const otherElement = fixture.debugElement.query(By.css('#trigger')).nativeElement;
    expect(otherElement.getAttribute('aria-hidden'))
      .withContext('aria-hidden should be true after click')
      .toBe('true');
    expect(otherElement.getAttribute('tabindex'))
      .withContext('tabindex should be -1 after click')
      .toBe('-1');
  });
  it('should set boolean to false when button is click1ed twice', async () => {
    fixture.detectChanges();
    expect(fixture.componentInstance!.expanded)
      .withContext('expanded should be false')
      .toBeFalse();
    fixture.debugElement.query(By.css('#trigger')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture.componentInstance!.expanded)
      .withContext('expanded should be true after first click')
      .toBeTrue();
    fixture.debugElement.query(By.css('#trigger')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture.componentInstance!.expanded)
      .withContext('expanded should be false after second click')
      .toBeFalse();
  });
  it('should remove the role=document wrapper when button is clicked twice', () => {
    fixture.debugElement.query(By.css('#trigger')).nativeElement.click();
    fixture.detectChanges();
    fixture.debugElement.query(By.css('#trigger')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[role="document"]'))).withContext('expected no element with a role of document').toBeNull();
  });
  it('should remove the role=dialog wrapper when button is clicked', async () => {
    fixture.debugElement.query(By.css('#trigger')).nativeElement.click();
    fixture.detectChanges();
    fixture.debugElement.query(By.css('#trigger')).nativeElement.click();
    fixture.detectChanges();
    const dialog = fixture.debugElement.query(By.css('[role="dialog"]'));
    expect(dialog).withContext('expected no element with a role of dialog').toBeNull();
  });
  it('should set aria-hidden to true when button is clicked twice', async () => {
    fixture.detectChanges();
    fixture.debugElement.query(By.css('#trigger')).nativeElement.click();
    fixture.detectChanges();
    fixture.debugElement.query(By.css('#trigger')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.pop')).nativeElement.getAttribute('aria-hidden'))
      .withContext('aria-hidden should be true after second click')
      .toBe('true');
  });
  it('should set aria-hidden and tabindex back to original values on all elements except applied element, when button is clicked twice', async () => {
    fixture.detectChanges();
    let otherElement = fixture.debugElement.query(By.css('#trigger')).nativeElement;
    const originalAriaHidden = otherElement.getAttribute('aria-hidden');
    const originalTabIndex = otherElement.getAttribute('tabindex');
    otherElement.click();
    fixture.detectChanges();
    fixture.debugElement.query(By.css('#trigger')).nativeElement.click();
    fixture.detectChanges();
    otherElement = fixture.debugElement.query(By.css('#trigger')).nativeElement;
    expect(otherElement.getAttribute('aria-hidden'))
      .withContext('aria-hidden should be original value after second click')
      .toBe(originalAriaHidden);
    expect(otherElement.getAttribute('tabindex'))
      .withContext('tabindex should be original value after second click')
      .toBe(originalTabIndex);
  });
});
