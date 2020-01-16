<template>
  <v-app id="inspire">
    <!-- <Test /> -->
    <Navigation />
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
import Navigation from "./components/layout/Navigation";
// import Test from "./components/layout/Test";
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
  components: {
    // Test
    Navigation
  }
};
</script>