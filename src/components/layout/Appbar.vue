
<template>
  <v-container>
    <v-app-bar app clipped-left :color="colors[2]">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-app-bar-nav-icon v-on:click="$emit('collapseNav')" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">OTDR-Viewer</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "Appbar",
  data() {
    return {
      drawer: true,
      colors: ["primary", "blue", "success", "red", "teal"]
    };
  }
};
</script>

<style scoped>
* {
  color: white;
}
</style>