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
    chartData: {
      type: Object,
      default: function () {
        return {}
      }
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
        color: ['#2490ff', '#ff3938'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: 30,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: chartData.category,
          axisTick: {
            show: false,
            alignWithLabel: true
          },
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
        legend: {
          data: chartData.title,
          top: 'top',
          right: 10,
          textStyle: {
            color: '#ddd',
            fontSize: 12
          }
        },
        series: [
          {
            name: chartData.title[0],
            type: 'bar',
            stack: 'vistors',
            barWidth: '24%',
            data: chartData.value[0],
            animationDuration
          },
          {
            name: chartData.title[1],
            type: 'bar',
            stack: 'vistors',
            barWidth: '24%',
            data: chartData.value[1],
            animationDuration
          }
        ]
      })
    }
  }
}
</script>
