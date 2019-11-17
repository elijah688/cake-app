import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeHubComponent } from './cake-hub.component';

describe('CakeHubComponent', () => {
  let component: CakeHubComponent;
  let fixture: ComponentFixture<CakeHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CakeHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CakeHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
