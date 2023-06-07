import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariComponent } from './formulari.component';

describe('FormulariComponent', () => {
  let component: FormulariComponent;
  let fixture: ComponentFixture<FormulariComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormulariComponent]
    });
    fixture = TestBed.createComponent(FormulariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
