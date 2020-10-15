import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestpremiumPage } from './requestpremium.page';

describe('RequestpremiumPage', () => {
  let component: RequestpremiumPage;
  let fixture: ComponentFixture<RequestpremiumPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestpremiumPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestpremiumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
