import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeListItemComponent } from './cake-list-item.component';

describe('CakeListItemComponent', () => {
  let component: CakeListItemComponent;
  let fixture: ComponentFixture<CakeListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CakeListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CakeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
