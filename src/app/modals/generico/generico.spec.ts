import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Generico } from './generico';

describe('Generico', () => {
  let component: Generico;
  let fixture: ComponentFixture<Generico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Generico],
    }).compileComponents();

    fixture = TestBed.createComponent(Generico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
