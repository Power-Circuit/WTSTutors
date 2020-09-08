import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadlessonPage } from './uploadlesson.page';

describe('UploadlessonPage', () => {
  let component: UploadlessonPage;
  let fixture: ComponentFixture<UploadlessonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadlessonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadlessonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
