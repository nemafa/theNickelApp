import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomePagePage } from './welcome-page.page';

describe('WelcomePagePage', () => {
  let component: WelcomePagePage;
  let fixture: ComponentFixture<WelcomePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomePagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
