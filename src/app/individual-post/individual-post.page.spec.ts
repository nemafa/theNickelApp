import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualPostPage } from './individual-post.page';

describe('IndividualPostPage', () => {
  let component: IndividualPostPage;
  let fixture: ComponentFixture<IndividualPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualPostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
