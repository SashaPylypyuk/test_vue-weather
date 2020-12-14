<template>
  <header class="header">
    <p class="header__logo">
      Vue Weather
    </p>
    <form @submit.prevent="findSity" class="header__form">
      <input type="text" v-model="input_query" class="header__input">
      <button type="submit" class="header__button">
        Знайти місто
      </button>
    </form>
  </header>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
      input_query: '',
    };
  },
  watch: {
    input_query(value) {
      this.SET_QUERY(value);
    },
  },
  computed: {
    ...mapGetters('weather', ['query', 'cities']),
  },
  mounted() {
    this.input_query = this.query;
  },
  methods: {
    ...mapActions('weather', ['fetchCity']),
    ...mapMutations('weather', ['SET_QUERY']),
    async findSity() {
      try {
        this.fetchCity();
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 90px;
  background-color: $secondary-color;

  &__logo {
    color: #fff;
    font-size: 35px;
    font-weight: bold;
  }

  &__form {
    width: 75%;
    align-self: center;
    display: flex;
  }

  &__input {
    width: 80%;
    border: none;
    padding: 10px;
    border-radius: 10px;
    outline: none;
    color: $secondary-color;
    font-size: 20px;
    margin-right: 20px;
  }

  &__button {
    outline: none;
    border: none;
    border-radius: 10px;
    background-color: $primary-color;
    color: #fff;
    padding: 10px;
    font-size: 20px;
  }
}
</style>
