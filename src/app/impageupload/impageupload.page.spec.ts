import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImpageuploadPage } from './impageupload.page';

describe('ImpageuploadPage', () => {
  let component: ImpageuploadPage;
  let fixture: ComponentFixture<ImpageuploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpageuploadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImpageuploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
