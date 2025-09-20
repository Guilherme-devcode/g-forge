import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default size as medium', () => {
    expect(component.size).toBe('medium');
  });

  it('should emit closed event when closeModal is called', () => {
    spyOn(component.closed, 'emit');
    component.closeModal();
    expect(component.closed.emit).toHaveBeenCalled();
    expect(component.isOpen).toBe(false);
  });

  it('should emit confirmed event when onConfirm is called', () => {
    spyOn(component.confirmed, 'emit');
    component.onConfirm();
    expect(component.confirmed.emit).toHaveBeenCalled();
  });

  it('should emit cancelled event when onCancel is called', () => {
    spyOn(component.cancelled, 'emit');
    component.onCancel();
    expect(component.cancelled.emit).toHaveBeenCalled();
  });

  it('should apply correct CSS classes based on size', () => {
    component.size = 'large';
    expect(component.modalClass).toBe('gforge-modal gforge-modal--large');
  });
});