import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LandPage } from './land.page';

describe('LandPage', () => {
  let component: LandPage;
  let fixture: ComponentFixture<LandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
