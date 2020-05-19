<template>
  <div :class="className" :style="{height:height,width:width,minHeight:minHeight}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: 'auto'
    },
    minHeight: {
      type: String,
      default: '200px'
    },
    name: {
      type: String,
      default: '数量(个)'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart(chartData) {
      const that = this
      that.chart = echarts.init(that.$el, 'macarons')
      that.chart.setOption({
        color: ['#96c7ff', '#f5000a', '#39ef28', '#2670c9'],
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: 30,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          top: 'top',
          right: '10',
          data: chartData.title,
          textStyle: {
            color: '#ddd',
            fontSize: 12
          }
        },
        xAxis: [{
          type: 'category',
          data: chartData.category,
          axisLine: {
            lineStyle: {
              color: '#ddd'
            }
          }
        }],
        yAxis: [{
          name: that.name,
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#ddd'
            }
          },
          splitLine: {
            lineStyle: {
              color: ['rgba(255,255,255,.1)']
            }
          }
        }],
        series: [
          {
            name: chartData.title[0],
            type: 'line',
            stack: '总量',
            data: chartData.value[0],
            smooth: false,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'rgba(97,175,255,1)'
                }, {
                    offset: 1, color: 'rgba(97,175,255,0)'
                }],
                global: false
              }
            },
            animationDuration
          }
        ]
      })
    }
  }
}
</script>
