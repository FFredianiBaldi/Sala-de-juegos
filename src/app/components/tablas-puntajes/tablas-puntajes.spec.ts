import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablasPuntajes } from './tablas-puntajes';

describe('TablasPuntajes', () => {
  let component: TablasPuntajes;
  let fixture: ComponentFixture<TablasPuntajes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablasPuntajes],
    }).compileComponents();

    fixture = TestBed.createComponent(TablasPuntajes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
