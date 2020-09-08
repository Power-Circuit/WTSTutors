import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlayvidPage } from './playvid.page';

describe('PlayvidPage', () => {
  let component: PlayvidPage;
  let fixture: ComponentFixture<PlayvidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayvidPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayvidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
