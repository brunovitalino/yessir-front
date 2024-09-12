import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCardapioComponent } from './filter-cardapio.component';

describe('FilterCardapioComponent', () => {
  let component: FilterCardapioComponent;
  let fixture: ComponentFixture<FilterCardapioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterCardapioComponent]
    });
    fixture = TestBed.createComponent(FilterCardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
