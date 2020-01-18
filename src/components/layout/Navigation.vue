
<template>
  <v-container>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :expand-on-hover="expandOnHover"
      :right="right"
      :color="color"
      app
      clipped
    >
      <v-list nav dense>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Marco</v-list-item-title>
            <v-list-item-subtitle>Moosler</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <Appbar v-on:collapseNav="drawer = !drawer" />
  </v-container>
</template>

<script>
import Appbar from "./Appbar";

export default {
  name: "Navigation",
  components: {
    Appbar
  },
  data() {
    return {
      color: "primary",
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-view-dashboard", link: "Home" },
        { title: "Settings", icon: "mdi-settings", link: "Settings" },
        { title: "Test", icon: "mdi-image", link: "Test" },
        { title: "About", icon: "mdi-help-box", link: "About" }
      ],
      miniVariant: true,
      expandOnHover: true,
      right: false
      // background: false,
    };
  }
};
</script>


<style scoped>
* {
  color: white;
}
</style>