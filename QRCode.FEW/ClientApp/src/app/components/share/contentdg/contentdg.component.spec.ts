import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentdgComponent } from './contentdg.component';

describe('ContentdgComponent', () => {
  let component: ContentdgComponent;
  let fixture: ComponentFixture<ContentdgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentdgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentdgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
