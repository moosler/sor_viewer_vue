<template>
  <v-app id="inspire">
    <Appbar v-on:collapseNav="drawer = !drawer" />
    <v-content>
      <router-view></router-view>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="shrink"></v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019 Marco Moosler</span>
    </v-footer>
  </v-app>
</template>

<script>
import Appbar from "./components/layout/Appbar";
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  created() {
    this.$vuetify.theme.dark = false;
  },
  components: {
    Appbar
  }
};
</script>