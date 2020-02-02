<template>
  <v-app>
    <div class="grid-container">
      <div class="file">
        <FileSelector v-model="filename" />
      </div>
      <div class="trace">
        <Chart />
      </div>
      <div class="events">
        <Events />
      </div>
      <div class="properties">
        <Properties v-bind:props="props" />
      </div>
    </div>
  </v-app>
</template>

<script>
import FileSelector from "./FileSelector";
import Chart from "./Chart";
import Events from "./Events";
import Properties from "./Properties";

import jsonfile from "../assets/data/EXFO_FTB7400_1550_U.json";
export default {
  components: {
    FileSelector,
    Chart,
    Events,
    Properties
  },
  computed: {
    props() {
      return jsonfile;
    }
  },
  data() {
    return {
      filename: ""
    };
  }
};
</script>
<style>
.grid-container {
  display: grid;
  grid-template-columns: 20% auto 20%;
  /* grid-template-columns: 1fr 1fr 1fr; */
  grid-template-rows: 1fr 1fr;
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