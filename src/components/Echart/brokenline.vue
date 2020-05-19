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
          name: '数量(个)',
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
            symbolSize: 6,
            data: chartData.value[0],
            animationDuration
          },
          {
            name: chartData.title[1],
            type: 'line',
            stack: '总量',
            symbolSize: 6,
            data: chartData.value[1],
            animationDuration
          },
          {
            name: chartData.title[2],
            type: 'line',
            stack: '总量',
            symbolSize: 6,
            data: chartData.value[2],
            animationDuration
          },
          {
            name: chartData.title[3],
            type: 'bar',
            barWidth: '10px',
            stack: '总量',
            itemStyle: {
              color: '#2670c9',
              barBorderRadius: [5, 5, 5, 5]
            },
            data: chartData.value[3],
            animationDuration
          }
        ]
      })
    }
  }
}
</script>
