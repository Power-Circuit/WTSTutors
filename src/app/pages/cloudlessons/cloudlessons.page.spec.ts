import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CloudlessonsPage } from './cloudlessons.page';

describe('CloudlessonsPage', () => {
  let component: CloudlessonsPage;
  let fixture: ComponentFixture<CloudlessonsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudlessonsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CloudlessonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
