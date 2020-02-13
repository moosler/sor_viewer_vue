<template>
  <!-- <v-card class="mx-auto m-select" outlined> -->
  <div>
    <v-card-title>
      <span class="title font-weight-bold">Select File</span>
    </v-card-title>
    <p>Select a Test File:</p>
    <v-select :items="items" dense label="Test File" v-model="select" outlined></v-select>
    <p>or Load a File from Disk</p>
    <v-file-input
      accept=".sor, .SOR"
      label="Select an SOR File"
      outlined
      dense
      filled
      prepend-icon="mdi-current-ac"
      v-model="chosenFile"
    ></v-file-input>
    <v-btn small @click.prevent="parseData()">Load Data</v-btn>
    <!-- </v-card> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: ["EXFO FTB7400 1550", "JDSU MTS600 1310", "Sample 1310"],
      select: "",
      chosenFile: null
    };
  },
  computed: {},
  methods: {
    parseData() {
      //Sample File used
      if (this.select) {
        this.$emit("event", this.select);
      } else if (this.chosenFile) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(this.chosenFile);
        reader.onload = () => {
          this.$emit("event", reader.result);
        };
      }
    }
  }
};
</script>
<style scoped>
.m-select {
  font-size: 0.1em;
}
</style>