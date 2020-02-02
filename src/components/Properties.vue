<template>
  <v-card class="mx-auto" tile>
    <v-card-title>
      <span class="title font-weight-bold">Properties</span>
    </v-card-title>
    <v-list dense>
      <v-list-item v-for="(prop, name, index) in props" :key="index">
        <v-list-item-title>{{ name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  props: {
    props: Object
  }
};
</script>