import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddmodalPage } from './addmodal.page';

describe('AddmodalPage', () => {
  let component: AddmodalPage;
  let fixture: ComponentFixture<AddmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
