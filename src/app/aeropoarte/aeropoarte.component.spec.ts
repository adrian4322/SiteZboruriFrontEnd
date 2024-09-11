import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeropoarteComponent } from './aeropoarte.component';

describe('AeropoarteComponent', () => {
  let component: AeropoarteComponent;
  let fixture: ComponentFixture<AeropoarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AeropoarteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AeropoarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
