<template>
  <div>
    <v-card outlined>
      <v-card-title>
        <span class="title font-weight-bold">Summary</span>
      </v-card-title>
      <v-data-table
        :headers="extractHeaders(events['summary'])"
        :items="[events['summary']]"
        hide-default-footer
      ></v-data-table>
    </v-card>
    <v-card outlined>
      <v-card-title>
        <span class="title font-weight-bold">Events</span>
      </v-card-title>
      <v-data-table
        v-if="events['events']"
        :headers="extractHeaders(events['events'][0])"
        :items="events['events']"
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
    events: Object
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