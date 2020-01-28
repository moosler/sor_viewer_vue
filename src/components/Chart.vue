<template>
  <v-row>
    <v-col cols="auto">
      <v-card min-width="700" color="light-green lighten-4" outlined>
        <v-card-title>
          <span class="title font-weight-bold">Chart</span>
        </v-card-title>
        <div id="main" style="width:700px; height:400px;">
          <v-chart :options="chartOptions" />
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>