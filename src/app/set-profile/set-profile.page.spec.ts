import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetProfilePage } from './set-profile.page';

describe('SetProfilePage', () => {
  let component: SetProfilePage;
  let fixture: ComponentFixture<SetProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
