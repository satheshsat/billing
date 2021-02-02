import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaxComponent } from './tax.component';

describe('TaxComponent', () => {
  let component: TaxComponent;
  let fixture: ComponentFixture<TaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
