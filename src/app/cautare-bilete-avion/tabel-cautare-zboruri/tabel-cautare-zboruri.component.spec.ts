import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelCautareZboruriComponent } from './tabel-cautare-zboruri.component';

describe('TabelCautareZboruriComponent', () => {
  let component: TabelCautareZboruriComponent;
  let fixture: ComponentFixture<TabelCautareZboruriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelCautareZboruriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelCautareZboruriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
