import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChalkboardPage } from './chalkboard.page';

describe('ChalkboardPage', () => {
  let component: ChalkboardPage;
  let fixture: ComponentFixture<ChalkboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChalkboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChalkboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
