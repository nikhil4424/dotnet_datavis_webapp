import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePieChartComponent } from './page-pie-chart.component';

describe('PagePieChartComponent', () => {
  let component: PagePieChartComponent;
  let fixture: ComponentFixture<PagePieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
