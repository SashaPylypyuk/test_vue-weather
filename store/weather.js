/* eslint-disable */
import axios from 'axios';

export const state = () => ({
  query: 'Kiev',
  cities: [],
});

export const mutations = {
  SET_QUERY(state, query) {
    state.query = query;
  },
  SET_CITY(state, city) {
    state.cities.push(city)
  },
};

export const actions = {
 async fetchCity({state, commit}) {
   try {
    const response = await axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${state.query}&units=metric&appid=15b2238ad35774d2a7d5a9f658ca6fdc&lang=ua`)
      .then(res => res.data);
    console.log(response);
    commit('SET_CITY', response);
   } catch (e) {
     console.error(e)
     e.response.status === 404 ? alert('Я не найшов такого міста ;c') : ''
   }
 }
};

export const getters = {
  query: state => state.query,
  cities: state => state.cities
};
