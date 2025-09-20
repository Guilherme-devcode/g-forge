import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default variant as basic', () => {
    expect(component.variant).toBe('basic');
  });

  it('should have default size as medium', () => {
    expect(component.size).toBe('medium');
  });

  it('should apply correct CSS classes', () => {
    component.variant = 'elevated';
    component.size = 'large';
    component.clickable = true;
    
    const expectedClass = 'gforge-card gforge-card--elevated gforge-card--large gforge-card--clickable';
    expect(component.cardClass).toBe(expectedClass);
  });

  it('should apply disabled class when disabled', () => {
    component.disabled = true;
    expect(component.cardClass).toContain('gforge-card--disabled');
  });
});