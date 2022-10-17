import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeqrcodeComponent } from './typeqrcode.component';

describe('TypeqrcodeComponent', () => {
  let component: TypeqrcodeComponent;
  let fixture: ComponentFixture<TypeqrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeqrcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeqrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
