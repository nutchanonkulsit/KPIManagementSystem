import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartOptions, ChartData, TooltipItem } from 'chart.js';

interface KpiMonthData {
  month: string;
  progress: number;
  actual_value: number;
  target_value: number;
}

@Component({
  selector: 'app-chart',
  standalone: false,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  @Input() kpiData: KpiMonthData[] = [];
  isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  type: 'bar' = 'bar';

  get data(): ChartData<'bar'> {
    return {
      labels: this.kpiData.map((d) => d.month),
      datasets: [
        {
          label: 'Progress (%)',
          borderRadius: 12,
          data: this.kpiData.map((d) => d.progress),
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          
        },
      ],
    };
  }

  options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false,
        external: (context) => {
          let tooltipEl = document.getElementById('chartjs-custom-tooltip');

          if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'chartjs-custom-tooltip';
            tooltipEl.style.background = '#1e293b';
            tooltipEl.style.color = '#fff';
            tooltipEl.style.borderRadius = '6px';
            tooltipEl.style.padding = '16px';
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.pointerEvents = 'none';
            tooltipEl.style.fontSize = '13px';
            document.body.appendChild(tooltipEl);
          }

          const tooltipModel = context.tooltip;
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = '0';
            return;
          }

          const index = tooltipModel.dataPoints[0].dataIndex;
          const item = this.kpiData[index];

          // HTML marker + text
          const getMarker = (color: string) =>
            `<span style="display:inline-block;width:12px;height:12px;margin-right:6px;border-radius:12px;background:${color}"></span>`;

          tooltipEl.innerHTML = `
            <div><b>${item.month}</b></div>
            <div>${getMarker('rgba(54,162,235,0.7)')} Progress: ${
            item.progress
          }%</div>
            <div>${getMarker('rgba(255,206,86,0.7)')} Actual: ${
            item.actual_value
          }</div>
            <div>${getMarker('rgba(75,192,192,0.7)')} Target: ${
            item.target_value
          }</div>
          `;

          // กำหนดตำแหน่ง tooltip
          const position = context.chart.canvas.getBoundingClientRect();
          tooltipEl.style.opacity = '1';
          tooltipEl.style.left =
            position.left + window.pageXOffset + tooltipModel.caretX + 'px';
          tooltipEl.style.top =
            position.top + window.pageYOffset + tooltipModel.caretY + 'px';
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        title: { display: true, text: 'Progress (%)' },
        grid: {
          drawTicks: false,
          color: 'transparent', // removes horizontal lines
        },
      },
      x: {
        grid: {
          drawTicks: false,
          color: 'transparent', // removes vertical lines
        },
      },
    },
  };
}
