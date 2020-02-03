<template>
  <v-card class="mx-auto" tile>
    <v-card-title>
      <span class="title font-weight-bold">Properties</span>
    </v-card-title>
    <v-list dense>
      <v-list-group v-for="(prop, name, index) in props" :key="index">
        <template v-slot:activator>
          <!-- <v-list-item-title>{{name}}</v-list-item-title> -->
          <v-subheader>{{name}}</v-subheader>
        </template>
        <v-list-item v-for="(pro, i) in prop" :key="i" link>
          <v-list-item-title v-text="i">:</v-list-item-title>
          <v-list-item-subtitle v-text="pro"></v-list-item-subtitle>
        </v-list-item>
      </v-list-group>
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