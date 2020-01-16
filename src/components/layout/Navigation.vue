
<template>
  <v-container>
    <v-navigation-drawer v-model="drawer" app clipped>
      <!-- <v-navigation-drawer v-model="drawer"  
        :color="color"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="right"
        :src="bg"
        app
        clipped
      >-->
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

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>OTDR-Viewer</v-toolbar-title>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      drawer: true,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", link: "Home" },
        { title: "Settings", icon: "mdi-settings", link: "Settings" },
        { title: "Test", icon: "mdi-image", link: "Test" },
        { title: "About", icon: "mdi-help-box", link: "About" }
      ],
      color: "primary",
      colors: ["primary", "blue", "success", "red", "teal"],
      right: true,
      miniVariant: false,
      expandOnHover: false,
      background: false
    };
  }
};
</script>