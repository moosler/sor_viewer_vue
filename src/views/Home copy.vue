<template>
  <v-container fluid>
    <v-row class="grey lighten-3" align="center" justify="center">
      <v-col cols="auto">
        <!-- <v-card class="mx-auto" max-width="1000" min-width="700" outlined> -->
        <v-card class="mx-auto" outlined>
          <v-card-title>Select a Test File or Load a File from Disk</v-card-title>
          <v-select :items="items" dense label="Test File" outlined></v-select>
          <v-file-input
            accept=".sor, .SOR"
            label="Select an SOR File"
            outlined
            dense
            filled
            prepend-icon="mdi-current-ac"
          ></v-file-input>
        </v-card>
      </v-col>
      <v-col cols="auto">
        <v-card outlined>
          <v-card-title>
            <span class="title font-weight-light">ParamsBlock</span>
            <v-text-field v-model="search" label="Filter"></v-text-field>
          </v-card-title>
          <v-data-table :headers="fileHeaders" :items="fileblocks" :search="search"></v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <!-- Trace Data -->
    <v-row class="grey lighten-1" align="center" justify="center">
      <v-col cols="auto">
        <v-card class="mx-auto text-center" color="green" dark max-width="600">
          <v-card-text>
            <v-sheet color="rgba(0, 0, 0, .12)">
              <v-sparkline
                :value="chartValues"
                color="rgba(255, 255, 255, .7)"
                height="100"
                padding="24"
                stroke-linecap="round"
                smooth
              >
                <template v-slot:label="item">{{ item.value }}</template>
              </v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text>
            <div class="display-1 font-weight-thin">Trace File</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Single Table Elements -->
    <v-row class="grey lighten-5" align="center" justify="center">
      <v-col cols="auto">
        <h3>Resumé</h3>
        <v-card outlined>
          <v-card-title>
            <span class="title font-weight-light">Summary</span>
          </v-card-title>
          <v-data-table
            :headers="extractHeaders(dumpdata.KeyEvents['Summary'])"
            :items="[dumpdata.KeyEvents.Summary]"
            hide-default-footer
          ></v-data-table>
        </v-card>
        <v-card outlined>
          <v-card-title>
            <span class="title font-weight-light">Events</span>
          </v-card-title>
          <v-data-table
            :headers="extractHeaders(dumpdata.KeyEvents['event 1'])"
            :items="filterKeyEvent"
            hide-default-footer
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <!-- chart  -->
    <v-row class="grey lighten-5" align="center" justify="center">
      <v-col cols="auto">
        <v-card min-width="700" color="light-blue lighten-4" outlined>
          <v-card-title>
            <span class="title font-weight-light">Chart</span>
          </v-card-title>
          <div id="main" style="width:700px; height:400px;">
            <v-chart :options="chartOptions" />
          </div>
        </v-card>
      </v-col>
    </v-row>
    <!-- Data in List form -->
    <v-container fluid>
      <v-row class="grey lighten-3" align="center" justify="center">
        <v-col v-for="(value, key) in filterDumpfile" v-bind:key="value.id" cols="auto">
          <v-card class="mx-auto" max-width="300" tile>
            <v-list dense>
              <v-subheader>{{key}}</v-subheader>
              <v-list-item v-for="(item, key2) in value" :key="key2">
                <template v-if="!isObject(item)">
                  <v-list-item-content>
                    <v-list-item-title v-text="key2"></v-list-item-title>
                    <v-list-item-subtitle v-text="item"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
                <template v-else>
                  <v-list-group no-action sub-groupvalue="true">
                    <template v-slot:activator>
                      <v-list-item-content>
                        <v-list-item-title v-text="key2"></v-list-item-title>
                      </v-list-item-content>
                    </template>
                    <v-list-item v-for="(innner, i) in item" :key="i" link>
                      <v-list-item-content>
                        <v-list-item-title v-text="i"></v-list-item-title>
                        <v-list-item-subtitle v-text="innner"></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-group>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- All Data as a new Table -->
    <!-- <v-row class="grey lighten-1" align="center" justify="center">
      <v-col v-for="(value, key) in dumpdata" v-bind:key="value.id" cols="auto">
        <v-card outlined>
          <v-card-title>
            <span class="title font-weight-light">{{key}}</span>
          </v-card-title>
          <v-data-table :headers="extractHeaders(value)" :items="[value]" hide-default-footer></v-data-table>
        </v-card>
      </v-col>
    </v-row>-->
  </v-container>
</template>

<script>
import filedata from "../assets/data/sample.json";
import dump from "../assets/data/dump.json";
import ECharts from "vue-echarts";
import * as trace from "../assets/js/traceValues.js";
//see in node_modules\echarts\lib\
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/dataZoom";

export default {
  name: "home",
  components: {
    "v-chart": ECharts
  },
  computed: {
    dumpdata() {
      return dump;
    },
    fileHeaders() {
      let headerData = [];
      for (let block in filedata.blocks) {
        for (let item in filedata.blocks[block]) {
          let obj = { text: item, value: item };
          headerData.push(obj);
        }
        break;
      }
      return headerData;
    },
    fileblocks() {
      let blockData = [];
      for (let block in filedata.blocks) {
        let obj = filedata.blocks[block];
        blockData.push(obj);
      }
      return blockData;
    },
    filterKeyEvent() {
      let eventfile = [];
      for (const key in dump["KeyEvents"]) {
        const element = dump["KeyEvents"][key];
        if (key !== "Summary" && key !== "num events") {
          eventfile.push(element);
        }
      }
      return eventfile;
    },
    filterDumpfile() {
      let valid = [
        "Cksum",
        "DataPts",
        "FxdParams",
        "GenParams",
        "SupParams",
        "mapblock"
      ];
      let dumpfile = {};
      for (const key in dump) {
        if (dump.hasOwnProperty(key)) {
          const element = dump[key];
          if (valid.includes(key)) {
            dumpfile[key] = element;
          }
        }
      }
      return dumpfile;
    }
  },
  data() {
    return {
      test: trace.yVal,
      isObject(obj) {
        if (typeof obj === "object" && obj !== null) {
          return true;
        }
        return false;
      },
      extractHeaders(obj) {
        let objArr = [];
        for (const key in obj) {
          let newObj = { text: key, value: key };
          objArr.push(newObj);
        }
        return objArr;
      },
      items: ["JDSU MTS600", "EXfo"],
      search: "",
      chartValues: [423, 446, 675, 510, 590, 610, 760],
      chartOptions: {
        animation: false,
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
          data: trace.xVal,
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
            data: trace.yVal,
            type: "line"
          }
        ]
      }
    };
  }
};
</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>