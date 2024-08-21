import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CautareBileteAvionComponent } from './cautare-bilete-avion.component';

describe('CautareBileteAvionComponent', () => {
  let component: CautareBileteAvionComponent;
  let fixture: ComponentFixture<CautareBileteAvionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CautareBileteAvionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CautareBileteAvionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
