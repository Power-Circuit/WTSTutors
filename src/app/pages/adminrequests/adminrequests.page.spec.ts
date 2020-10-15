import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminrequestsPage } from './adminrequests.page';

describe('AdminrequestsPage', () => {
  let component: AdminrequestsPage;
  let fixture: ComponentFixture<AdminrequestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminrequestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminrequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
