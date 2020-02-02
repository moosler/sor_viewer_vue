<template>
  <v-card min-width="700px" width="100%" outlined>
    <v-card-title>
      <span class="title font-weight-bold">Chart</span>
    </v-card-title>
    <div id="main" style="width:700px; height:400px;">
      <v-chart :options="chartOptions" />
    </div>
  </v-card>
</template>