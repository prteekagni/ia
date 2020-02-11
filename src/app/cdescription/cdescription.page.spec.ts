import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CdescriptionPage } from './cdescription.page';

describe('CdescriptionPage', () => {
  let component: CdescriptionPage;
  let fixture: ComponentFixture<CdescriptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdescriptionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CdescriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
