import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { NodeType } from 'node-html-parser';

@Directive({
  selector: '[a11yTrap]',
})
export class A11yTrapDirective implements AfterViewInit, OnInit, OnDestroy {
  private elementCache: Map<HTMLElement, {ariaHidden: string|null, tabIndex:string|null}>;
  private element: HTMLElement | null;
  private isTrap: boolean = false;
  private label: string | null = null;
  private isInitialized: boolean = false;

  /**
   * A boolean that indicates whether the directive should be trapping focus or not.
   */
  @Input('a11yTrap') set isTrapped(value: boolean) {
    if (this.isTrap !== value) {
      this.isTrap = value;
      this.toggle(value);
    }
  }
  get isTrapped(): boolean {
    return this.isTrap;
  }

  /**
   * The id of the element which labels the element that traps focus. Required.
   * If set to null when isTrapped is changed, will throw an error.
   */
  @Input('a11yTrapLabelledBy') set labelledBy(value: string | null) {
    this.label = value;
  }
  get labelledBy(): string | null {
    if (!this.label && this.element) {
      this.label = this.element.getAttribute('a11yTrapLabelledBy');
    }
    return this.label;
  }

  /**
   * Gets the id of the element, or, if not set, creates a new one (uniquish by way of Date.now())
   */
  get id(): string {
    let elementId: string | undefined | null;
    if (this.element && this.element.id && this.element.id.length) {
      elementId = this.element.id;
    }
    if (!elementId || elementId.length === 0) {
      elementId = `a11yTrap${Date.now()}`;
      if (this.element) {
        this.element.id = elementId;
      }
    }
    return elementId;
  }

  constructor(
    private elementRef: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {
    this.element = this.elementRef.nativeElement;
    this.elementCache = new Map<HTMLElement, {ariaHidden:string|null,tabIndex:string|null}>();
  }

  ngAfterViewInit(): void {
    this.element = this.elementRef.nativeElement;
    this.toggle(this.isTrap);
    this.isInitialized = true;
  }

  ngOnDestroy(): void {
    this.toggle(false);
    this.element = null; // Not strictly necessary, as the GC will pick this up, but might as well
    this.elementCache.clear(); // More necessary, to clear the references to HTMLElements
    this.isInitialized = false;
  }

  ngOnInit(): void {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  /**
   * Gets accessibility-relevant siblings of a given element.
   * @param el {HTMLElement | null} The HTMLElement to find siblings of, or null
   * @param excludeHidden {boolean} true to exclude elements that are already hidden by virtue of
   * being descendants of elements that are hidden; otherwise, false (default)
   * @returns {HTMLElement[]} The siblings of the given element (except for elements that are
   * irrelevant to a11y, like style, script, head, etc.)
   */
  getRelevantSiblings(el: HTMLElement | null, excludeHidden = false): HTMLElement[] {
    return Array.from(el?.parentElement?.children ?? [])
      .filter((child) => child !== el && !child.matches('style,script,head,link,meta,html,template'))
      .filter((child) => {
        if (excludeHidden) {
          // If an element is already a descendant of an element with aria-hidden="true", it does not
          // need to be hidden again.
          return !Array.from(document.querySelectorAll('[aria-hidden="true"]'))
            .some((alreadyHidden) => alreadyHidden.contains(child));
        }
        return true;
      }) as HTMLElement[];
  }

  /**
   * Hides all sibling elements from accessibility tools and removes the element
   * from the tab order.
   * @param el {HTMLElement | null} The HTMLElement whose siblings and whose
   * ancestors' siblings will be hidden from accessibility tools and removed
   * from the tab order.
   */
  hideAllElementsExceptAncestors(el: HTMLElement | null): void {
    const siblings = this.getRelevantSiblings(el, true);
    siblings.forEach(sib => {
      const ariaHidden = sib.getAttribute('aria-hidden');
      const tabIndex = sib.getAttribute('tabindex');
      if ((ariaHidden && ariaHidden.length) || (tabIndex && tabIndex.length)) {
        this.elementCache.set(sib, {ariaHidden:ariaHidden, tabIndex:tabIndex});
      }
      sib.setAttribute('aria-hidden', 'true');
      sib.setAttribute('tabindex', '-1');
    });
    if (el !== document.body) {
      this.hideAllElementsExceptAncestors(el?.parentElement as HTMLElement);
    }
  }

  /**
   * Reverts changes made by hideAllElementsExceptAncestors.
   * @param el {HTMLElement | null} The HTMLElement whose siblings and whose
   * ancestors' siblings will be shown to accessibility tools and available
   * to the tab order.
   */
  showAllElementsExceptAncestors(el: HTMLElement | null): void {
    const siblings = this.getRelevantSiblings(el);
    siblings.forEach(sib => {
      const prevState = this.elementCache.get(sib);
      if (prevState?.ariaHidden) {
        sib.setAttribute('aria-hidden', prevState.ariaHidden);
      } else {
        sib.removeAttribute('aria-hidden');
      }
      if (prevState?.tabIndex) {
        sib.setAttribute('tabindex', prevState.tabIndex);
      } else {
        sib.removeAttribute('tabindex');
      }
    });
    if (el !== document.body) {
      this.showAllElementsExceptAncestors(el?.parentElement as HTMLElement);
    }
  }

  /**
   * A list of CSS selectors which will match elements which can receive focus.
   */
  static focusableSelectors: string[] = [
    "a[href]",
    "area[href]",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "button:not([disabled])",
    "iframe",
    "object",
    "embed",
    "*[tabindex]",
    "*[contenteditable]"
  ];

  /**
   * Finds the first focusable element which is has a display that is not "none", a visibility that is not
   * "hidden", and an opacity that is not "0" (i.e., is "visible").
   * @returns The first visible element which is focusable.
   */
  getFirstFocusableElement(): HTMLElement | undefined {
    return Array.from(this.element?.querySelectorAll(A11yTrapDirective.focusableSelectors.join(',')) ?? [])
    .find(el => {
      const style = window.getComputedStyle(el);
      const {display, visibility, opacity}= style;
      return display !== 'none' && visibility !== 'hidden' && opacity !== '0';
    }) as HTMLElement;
  }

  /**
   * Sets the focus to the first focusable element in the container, if trapping
   * focus, and if the focusedElement is not already within the container.
   * @param focusedElement {HTMLElement} The element which currently has focus.
   */
  setFocusIfNecessary(focusedElement: HTMLElement) {
    if (this.isTrap && !this.element?.contains(focusedElement)) {
      const first = this.getFirstFocusableElement();
      if (first) {
        first.focus();
      }
    }
  }

  /**
   * Handles the event when the window receives the focus.
   * @param e {Event} The FocusEvent fired when the window received the focus.
   */
  windowGotFocus(e: Event): void {
    this.setFocusIfNecessary(e.target as HTMLElement);
  }

  /**
   * Toggles trapping of the focus on or off.
   * @param trap {boolean} true to turn on the trap feature; otherwise, false
   */
  toggle(trap: boolean): void {
    // if ngAfterViewInit hasn't been called yet, ignore calls to toggle.
    if (!this.isInitialized) {
      return;
    }
    if (!this.label || this.label.length === 0 || document.querySelectorAll(`#${this.label}`).length === 0) {
      throw new Error('The labelledBy property (or a11yTrapLabelledBy attribute) must be set to the id of the element which labels the trap element');
    }
    // Get a reference to the windowGotFocus function with this bound correctly.
    const windowGotFocusBound = this.windowGotFocus.bind(this);
    // this.elementRef.nativeElement goes to a separate comment node created by Angular
    this.element = this.element?.nodeType === NodeType.COMMENT_NODE ?
      this.element.previousElementSibling as HTMLElement:
      this.element;
    if (!this.element) {
      // Theoretically, this should never happen, but...
      throw new Error('Could not find element on which this directive is bound');
    }

    let parent = this!.element!.parentElement!;
    let dialog, doc;
    if (trap) {
      // When not trapping the focus, hide the element
      this.element.removeAttribute('aria-hidden');
      // When trapping the focus, create a wrapper with a role of a modal dialog
      dialog = document.createElement('div');
      dialog.setAttribute('role', 'dialog');
      dialog.setAttribute('aria-modal', 'true');
      if (this.label && this.label.length) {
        dialog.setAttribute('aria-labelledby', this.label);
      }
      // Wrap the modal dialog in a wrapper with a role of document
      doc = document.createElement('div');
      doc.setAttribute('role', 'document');
      doc.appendChild(dialog);
      // Theoretically, that's all you should have to do, besides adding the document
      // to the DOM and adding the element to the dialog
      parent.insertBefore(doc, this.element);
      dialog.appendChild(this.element);
      // But we can't have nice things, so we need to set everything else to
      // aria-hidden="true" and tabindex="-1".
      this.hideAllElementsExceptAncestors(doc);
      // And make sure that if the user gets crafty by setting focus elsewhere, the
      // focus gets yanked back here.
      window.addEventListener('focusin', windowGotFocusBound);
      // Also, set the focus to the first focusable element
      this.setFocusIfNecessary(document.body);
    } else if (this.element.closest) {
      // When we are not trapping focus, hide this element
      this.element.setAttribute('aria-hidden', 'true');
      // Grab the dialog and document wrappers
      dialog = this.element.closest('[role="dialog"');
      doc = this.element.closest('[role="document"]');
      if (doc) {
        parent = doc!.parentElement! as HTMLElement;
        // Move the element back to where it was
        parent.insertBefore(this.element, doc);
        // Undo all of the aria-hidden="true" and tabindex="-1" stuff
        this.showAllElementsExceptAncestors(this.element);
        // And remove the wrappers
        if (dialog) {
          dialog.remove();
        }
        doc.remove();
      }
      // Also stop listening for focus events
      window.removeEventListener('focusin', windowGotFocusBound);
    }
  }
}
