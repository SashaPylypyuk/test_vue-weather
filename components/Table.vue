<template>
      <div class="wrapper">
        <table v-if="cities.length" class="table">
          <tr class="table__row table__row-head">
            <th class="table__cell table__cell-head">Назва міста</th>
            <th class="table__cell table__cell-head">Опис</th>
            <th class="table__cell table__cell-head">Температура</th>
            <th class="table__cell table__cell-head">Відчувається як</th>
            <th class="table__cell table__cell-head">Вологість</th>
            <th class="table__cell table__cell-head">Хмарність</th>
          </tr>
          <tr v-for="city in cities" :key="city.name" class="table__row">
            <td class="table__cell">{{ city.name }}</td>
            <td class="table__cell">{{ city.weather[0].description }}</td>
            <td class="table__cell">{{ city.main.temp }}</td>
            <td class="table__cell">{{ city.main.feels_like }}</td>
            <td class="table__cell" >{{ city.main.humidity }}</td>
            <td class="table__cell">{{ city.clouds.all }}</td>
          </tr>
        </table>
      </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters('weather', ['cities']),
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 50px 90px;
  text-align: center;
}

.table {
  border-spacing: 0;
  width: 750px;
  margin: 0 auto;
  font-size: 20px;

  &__row {
    &-head {
      font-size: 25px;
      color: #fff;
      background-color: $secondary-color;

      :first-child {
        border-top-left-radius: 20px;
      }

      :last-child {
        border-top-right-radius: 20px;
      }
    }
  }

  &__cell {
    padding: 20px 5px;

    &::first-letter {
      text-transform: capitalize;
    }
  }
}
</style>
