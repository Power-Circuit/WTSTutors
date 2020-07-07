import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LessontypePage } from './lessontype.page';

describe('LessontypePage', () => {
  let component: LessontypePage;
  let fixture: ComponentFixture<LessontypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessontypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LessontypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
