import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfileselectPage } from './profileselect.page';

describe('ProfileselectPage', () => {
  let component: ProfileselectPage;
  let fixture: ComponentFixture<ProfileselectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileselectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileselectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
