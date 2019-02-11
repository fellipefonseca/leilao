import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeilaoComponent } from './leilao.component';

describe('LeilaoComponent', () => {
  let component: LeilaoComponent;
  let fixture: ComponentFixture<LeilaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeilaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeilaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
