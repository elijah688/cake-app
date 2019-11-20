import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeDesignComponent } from './cake-design.component';

describe('CakeDesignComponent', () => {
  let component: CakeDesignComponent;
  let fixture: ComponentFixture<CakeDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CakeDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CakeDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
