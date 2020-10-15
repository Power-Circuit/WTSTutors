import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudyguidePage } from './studyguide.page';

describe('StudyguidePage', () => {
  let component: StudyguidePage;
  let fixture: ComponentFixture<StudyguidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyguidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudyguidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
