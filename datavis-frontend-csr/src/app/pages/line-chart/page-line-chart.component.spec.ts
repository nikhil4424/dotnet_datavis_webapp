import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLineChartComponent } from './page-line-chart.component';

describe('PageLineChartComponent', () => {
  let component: PageLineChartComponent;
  let fixture: ComponentFixture<PageLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLineChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
