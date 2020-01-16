<template>
  <div class="test">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "test",
  components: {
    HelloWorld
  }
};
</script>
