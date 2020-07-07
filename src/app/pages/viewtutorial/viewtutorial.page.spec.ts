import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewtutorialPage } from './viewtutorial.page';

describe('ViewtutorialPage', () => {
  let component: ViewtutorialPage;
  let fixture: ComponentFixture<ViewtutorialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtutorialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewtutorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
