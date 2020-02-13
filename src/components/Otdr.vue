<template>
  <div>
    <!-- <div v-if="loading">Loading Please wait...</div>
    <div v-else>{{ sorResult }}</div>-->

    <div class="grid-container">
      <div class="file">
        <FileSelector @event="loadData" />
      </div>
      <div class="trace">
        <Chart v-bind:points="points" :key="chartKey" :filename="filename" />
      </div>
      <div class="events">
        <Events v-bind:events="events" v-bind:summary="summary" :key="eventsKey" />
      </div>
      <div class="properties">
        <Properties v-bind:props="props" :key="propKey" />
      </div>
    </div>
  </div>
</template>

<script>
//Components
import FileSelector from "./FileSelector";
import Chart from "./Chart";
import Events from "./Events";
import Properties from "./Properties";

//Sample Files
import sample1 from "@/assets/data/EXFO_FTB7400_1550_U.json";
import sample2 from "@/assets/data/JDSU_MTS6000_1310_G.json";
import sample3 from "@/assets/data/sample1310_lowDR.json";

//bundle
import SorReader from "@/assets/js/sor.js";

export default {
  components: {
    FileSelector,
    Chart,
    Events,
    Properties
  },
  created() {
    this.parseSor();
    this.loadSampleFile("Sample 1310");
  },
  computed: {
    // params() {
    //   // this.setData(sample1);
    //   return sample2;
    // },
  },
  methods: {
    async parseSor() {
      this.loading = true;
      this.loading = false;
    },
    setData(sample) {
      this.events = sample.params.KeyEvents.events;
      this.summary = sample.params.KeyEvents.summary;
      /**
       * @todo in the Parser: events and summary in own object
       */
      this.points = sample.points;
      this.props = sample.params;
    },
    renderComponents() {
      this.chartKey += 1;
      this.eventsKey += 1;
      this.propKey += 1;
    },
    loadSampleFile(sample) {
      this.filename = sample;
      switch (this.filename) {
        case "EXFO FTB7400 1550":
          this.setData(sample1);
          this.renderComponents();
          break;
        case "JDSU MTS600 1310":
          this.setData(sample2);
          this.renderComponents();
          break;
        case "Sample 1310":
          this.setData(sample3);
          break;
        default:
          this.setData(sample3);
          this.renderComponents();
          break;
      }
    },
    async loadData(file) {
      //only if something is selected

      if (file instanceof ArrayBuffer) {
        let sor = new SorReader(
          false,
          {
            browserMode: true
          },
          file
        );
        let data = await sor.parse();
        await this.setData(data);
        await this.renderComponents();
      } else {
        await this.loadSampleFile(file);
      }
    }
  },
  data() {
    return {
      loading: false,
      props: {},
      points: {},
      events: {},
      summary: {},
      filename: "",
      chartKey: 0,
      eventsKey: 0,
      propKey: 0
    };
  }
};
</script>
<style>
.grid-container {
  display: grid;
  grid-template-columns: 20% 60% 20%;
  /* grid-template-columns: 1fr 1fr 1fr; */
  grid-template-rows: 40% 60%;
  grid-template-areas: "file trace properties" "file events properties";
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  margin: 7px;
}

.file {
  grid-area: file;
  border: 1px solid grey;
}

.trace {
  grid-area: trace;
  border: 1px solid grey;
}

.events {
  grid-area: events;
  border: 1px solid grey;
}

.properties {
  grid-area: properties;
  border: 1px solid grey;
}
</style>