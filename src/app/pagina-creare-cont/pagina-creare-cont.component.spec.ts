import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCreareContComponent } from './pagina-creare-cont.component';

describe('PaginaCreareContComponent', () => {
  let component: PaginaCreareContComponent;
  let fixture: ComponentFixture<PaginaCreareContComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaCreareContComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaCreareContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
