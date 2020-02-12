<template>
  <div>
    <v-card outlined>
      <v-card-title>
        <span class="title font-weight-bold">Summary</span>
      </v-card-title>
      <v-data-table :headers="extractHeaders(summary)" :items="[summary]" hide-default-footer></v-data-table>
    </v-card>
    <v-card outlined>
      <v-card-title>
        <span class="title font-weight-bold">Events</span>
      </v-card-title>
      <v-data-table
        v-if="events"
        :headers="extractHeaders(events[0])"
        :items="events"
        hide-default-footer
        :items-per-page="100"
        dense
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    events: Array,
    summary: Object
  },
  data() {
    return {
      extractHeaders(obj) {
        let objArr = [];
        for (const key in obj) {
          let newObj = { text: key, value: key };
          objArr.push(newObj);
        }
        return objArr;
      }
    };
  }
};
</script>