<template>
  <!-- <v-card class="mx-auto m-select" outlined> -->
  <div>
    <v-card-title>
      <span class="title font-weight-bold">Summary</span>
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
    ></v-file-input>
    <!-- </v-card> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: ["JDSU MTS600", "EXfo"]
    };
  },
  computed: {
    select: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
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