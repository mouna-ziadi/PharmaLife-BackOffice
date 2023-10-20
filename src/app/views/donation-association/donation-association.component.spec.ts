import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationAssociationComponent } from './donation-association.component';

describe('DonationAssociationComponent', () => {
  let component: DonationAssociationComponent;
  let fixture: ComponentFixture<DonationAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationAssociationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
