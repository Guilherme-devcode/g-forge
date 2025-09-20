import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default variant as primary', () => {
    expect(component.variant).toBe('primary');
  });

  it('should have default size as medium', () => {
    expect(component.size).toBe('medium');
  });

  it('should toggle checked state when toggle is called', () => {
    expect(component.checked).toBe(false);
    component.toggle();
    expect(component.checked).toBe(true);
  });

  it('should emit checkedChange event when toggled', () => {
    spyOn(component.checkedChange, 'emit');
    component.toggle();
    expect(component.checkedChange.emit).toHaveBeenCalledWith(true);
  });

  it('should not toggle when disabled', () => {
    component.disabled = true;
    component.checked = false;
    component.toggle();
    expect(component.checked).toBe(false);
  });

  it('should clear indeterminate state when toggled', () => {
    component.indeterminate = true;
    component.toggle();
    expect(component.indeterminate).toBe(false);
  });
});