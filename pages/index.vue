<template>
  <Weather />
</template>

<script>
import Weather from '../components/Weather.vue';

export default {
  components: {
    Weather,
  },
};
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');

  * {
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    font-size: 16px;
  }

  body {
    margin: 0;
  }
</style>
