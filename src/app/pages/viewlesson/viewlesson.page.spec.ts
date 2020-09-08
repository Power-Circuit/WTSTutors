import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewlessonPage } from './viewlesson.page';

describe('ViewlessonPage', () => {
  let component: ViewlessonPage;
  let fixture: ComponentFixture<ViewlessonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewlessonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewlessonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
