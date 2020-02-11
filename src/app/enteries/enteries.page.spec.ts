import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnteriesPage } from './enteries.page';

describe('EnteriesPage', () => {
  let component: EnteriesPage;
  let fixture: ComponentFixture<EnteriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnteriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnteriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
