import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MikkelComponent } from './mikkel.component';

describe('MikkelComponent', () => {
  let component: MikkelComponent;
  let fixture: ComponentFixture<MikkelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MikkelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MikkelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
