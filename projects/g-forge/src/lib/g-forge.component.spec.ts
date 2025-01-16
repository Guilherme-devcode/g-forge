import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GForgeComponent } from './g-forge.component';

describe('GForgeComponent', () => {
  let component: GForgeComponent;
  let fixture: ComponentFixture<GForgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GForgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GForgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
