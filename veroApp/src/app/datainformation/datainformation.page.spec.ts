import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatainformationPage } from './datainformation.page';

describe('DatainformationPage', () => {
  let component: DatainformationPage;
  let fixture: ComponentFixture<DatainformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatainformationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatainformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
