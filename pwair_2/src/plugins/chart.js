
import Chart from 'chart.js'

export const ChartPlugin = {
  install( Vue, options ){
    Vue.prototype.Chart = Chart;
  }
}