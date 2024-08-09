import { Component, Input } from '@angular/core';

@Component({
  selector: 'dynamic-node',
  template: `<div class="fc-node-example {{ nodeClass }}">{{ id }}</div>`,
  styles: [`
    .fc-node-example-red { background-color: red; }
    .fc-node-example-green { background-color: green; }
    .fc-node-example-orange { background-color: orange; }
    .fc-node-example-blue { background-color: blue; }
  `]
})
export class DynamicNodeComponent {
  @Input() id: string = '';
  nodeClass: string = '';

  ngOnChanges() {
    if (this.id.indexOf('3') !== -1) {
      this.nodeClass = 'fc-node-example-green';
    } else if (this.id.indexOf('2') !== -1) {
      this.nodeClass = 'fc-node-example-orange';
    } else if (this.id.indexOf('1') !== -1) {
      this.nodeClass = 'fc-node-example-blue';
    } else {
      this.nodeClass = 'fc-node-example-red';
    }
  }
}