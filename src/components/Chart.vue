<template>
  <v-card min-width="700px" width="100%" outlined>
    <v-card-title>
      <span class="title font-weight-bold">Chart</span>
    </v-card-title>
    <div id="mainchart">
      <v-chart :options="chartOptions" />
    </div>
  </v-card>
</template>
<script>
import ECharts from "vue-echarts";
//see in node_modules\echarts\lib\
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/dataZoom";
export default {
  components: {
    "v-chart": ECharts
  },
  props: {
    points: Object
  },
  data() {
    return {
      chartOptions: {
        animation: false,
        dataset: {
          source: this.points.points
        },
        title: {
          text: "OTDR Trace Graph",
          Subtext: "Example in MetricsGraphics.js"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100
          },
          {
            start: 0,
            end: 100
          }
        ],
        xAxis: {
          name: "distance",
          // data: this.points.points,
          minorTick: {
            show: true
          },
          splitLine: {
            lineStyle: {
              color: "#999"
            }
          },
          minorSplitLine: {
            show: true,
            lineStyle: {
              color: "#ddd"
            }
          }
        },
        yAxis: {
          name: "Refelction",
          // min: -10,
          // max: 50,
          // minorTick: {
          //     show: true
          // },
          splitLine: {
            lineStyle: {
              color: "#999"
            }
          },
          minorSplitLine: {
            show: true,
            lineStyle: {
              color: "#ddd"
            }
          }
        },
        series: [
          {
            // data: trace.yVal,
            type: "line",
            encode: {
              x: 0,
              y: 1
            }
          }
        ]
      }
    };
  }
};
</script>
<style scoped>
.echarts {
  width: 100%;
  /* height: 100%; */
}
</style>