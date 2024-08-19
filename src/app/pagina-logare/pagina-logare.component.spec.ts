import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaLogareComponent } from './pagina-logare.component';

describe('PaginaLogareComponent', () => {
  let component: PaginaLogareComponent;
  let fixture: ComponentFixture<PaginaLogareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaLogareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaLogareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
