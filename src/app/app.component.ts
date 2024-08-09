import { Component, ElementRef, ComponentFactoryResolver, ViewContainerRef, OnInit, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import HuiCharts, { FlowChart } from "@opentiny/huicharts";
import "@opentiny/huicharts/components/FlowChart/index.css";
import { DynamicNodeComponent } from './dynamic-node.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styles: [`
    .fc-node-example-red { background-color: red; }
    .fc-node-example-green { background-color: green; }
    .fc-node-example-orange { background-color: orange; }
    .fc-node-example-blue { background-color: blue; }
  `],
  styleUrl: './flow-chart.less'
})
export class AppComponent {
  title = 'my-angular-app';
  private option:any;

  constructor(
    private elementRef: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private injector : Injector
  ) {}

  ngOnInit(): void {
    this.option = {
      vGap: 50,
      hGap: 80,
      lineStyle: {
        type: 'Bezier'
      },
      render: (container:any, data:any) => {

        return {
          component: DynamicNodeComponent,
          injector: this.injector
        }
      },
      data: {
        nodes: [
          { id: '111' }, { id: '2' }, { id: '3' }, { id: '4' }, 
          { id: '5' }, { id: '6' }, { id: '7' }, { id: '8' }, 
          { id: '9' }, { id: '10' }, { id: '11' }, { id: '12' }, 
          { id: '13' }, { id: '14' }
        ],
        edges: [
          { source: '111', target: '2', lineStyle: { dash: true } },
          { source: '9', target: '3' }, { source: '10', target: '3' }, 
          { source: '11', target: '10' }, { source: '4', target: '5' }, 
          { source: '4', target: '6' }, { source: '3', target: '4', lineStyle: { dash: false } }, 
          { source: '14', target: '4' }, { source: '4', target: '7' }, 
          { source: '5', target: '8' }, { source: '6', target: '8' }, 
          { source: '7', target: '8' }, { source: '2', target: '4' }, 
          { source: '12', target: '111' }, { source: '13', target: '111' }
        ]
      }
    };

    const chartIns = new HuiCharts();
    const chartContainerDom = this.elementRef.nativeElement.querySelector('#main');
    chartIns.init(chartContainerDom);
    chartIns.setSimpleOption(FlowChart, this.option);
    chartIns.render();
    
  }
}
