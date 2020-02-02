<template>
  <div>
    <v-card outlined>
      <v-card-title>
        <span class="title font-weight-bold">Summary</span>
      </v-card-title>
      <!-- <v-data-table
          :headers="extractHeaders(dumpdata.KeyEvents['Summary'])"
          :items="[dumpdata.KeyEvents.Summary]"
          hide-default-footer
      ></v-data-table>-->
    </v-card>
    <v-card outlined>
      <v-card-title>
        <span class="title font-weight-bold">Events</span>
      </v-card-title>
      <!-- <v-data-table
          :headers="extractHeaders(dumpdata.KeyEvents['event 1'])"
          :items="filterKeyEvent"
          hide-default-footer
      ></v-data-table>-->
    </v-card>
  </div>
</template>