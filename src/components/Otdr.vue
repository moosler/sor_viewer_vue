<template>
  <v-container>
    <div class="parent">
      <div class="Selector">
        <FileSelector />
      </div>
      <div class="Chart">
        <Chart />
      </div>
      <div class="Events">
        <Events />
      </div>
      <div class="Properties">
        <Properties />
      </div>
    </div>
  </v-container>
</template>

<script>
import FileSelector from "./FileSelector";
import Chart from "./Chart";
import Events from "./Events";
import Properties from "./Properties";
export default {
  components: {
    FileSelector,
    Chart,
    Events,
    Properties
  }
};
</script>
<style>
.parent {
  display: grid;
  /* grid-template-columns: repeat(3, 1fr); */
  grid-template-columns: 10% auto 15%;
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas: "File Trace Properties" "File Events Properties";
  grid-column-gap: 5px;
  grid-row-gap: 5px;
}

.Selector {
  /* grid-area: 1 / 1 / 3 / 2; */
  grid-area: File;
  /* class="grey lighten-3"  */
  align-content: center;
  justify-content: center;
}
.Chart {
  /* grid-area: 1 / 2 / 2 / 3; */
  grid-area: Trace;
}
.Events {
  /* grid-area: 2 / 2 / 3 / 3; */
  grid-area: Events;
}
.Properties {
  /* grid-area: 1 / 3 / 3 / 4; */
  grid-area: Properties;
}
</style>