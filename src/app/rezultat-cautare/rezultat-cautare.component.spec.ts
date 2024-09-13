import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezultatCautareComponent } from './rezultat-cautare.component';

describe('RezultatCautareComponent', () => {
  let component: RezultatCautareComponent;
  let fixture: ComponentFixture<RezultatCautareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RezultatCautareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RezultatCautareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
