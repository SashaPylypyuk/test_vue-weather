<template>
  <v-main>
    <h3 class="ma-2 text-center ">
      Saved cities
    </h3>
    <div class="d-flex ma-2 flex-wrap justify-center">
      <div
        v-for="city in savedCity"
        :key="city.cityName"
        class="ma-3"
      >
        <v-btn @click="fromSavedCity(city.cityName)">
          {{ city.cityName }}
        </v-btn>
        <v-btn
          x-small
          color="red"
          dark
          fab
          @click="deleteCity(city.cityName)"
        >
          <v-icon dark>
            mdi-cancel
          </v-icon>
        </v-btn>
      </div>
    </div>
    <div class="d-flex ma-2 justify-center align-center flex-wrap">
      <v-col cols="5">
        <v-text-field
          v-model="city"
          @keyup.enter="findCity"
        />
      </v-col>
      <v-btn
        class="primary"
        @click="findCity"
      >
        Find city
      </v-btn>
      <v-btn
        color="secondary"
        class="mx-2"
        @click="saveCity"
      >
        Save city
      </v-btn>
    </div>
    <div class="justify-center text-center">
      <div>
        <h2 class="primary--text">
          В <span class="secondary--text">{{ cityNameSaved }}</span> температура <span class="info--text">{{ info.temp }}</span>
        </h2>
        <h2 class="primary--text">
          Відчуваєьться як <span class="info--text">{{ info.feels_like }}</span>
        </h2>
        <div class="d-flex ma-2 justify-center align-center flex-wrap">
          <v-col cols="5">
            <v-file-input @change="fileUpload" />
          </v-col>
          <v-btn @click="downloadFile">
            Download data
          </v-btn>
        </div>
      </div>
    </div>
  </v-main>
</template>

<script>
import axios from 'axios'

export default {
  components: {
  },
  data () {
    return {
      info: {
        temp: ''
      },
      city: 'Kyiv',
      cityNameSaved: 'Kyiv',
      file: '',
      text: '',
      savedCity: []
    }
  },
  mounted () {
    if (localStorage.savedCity) {
      const cities = JSON.parse(localStorage.savedCity)
      this.savedCity = cities
    }
    if (this.savedCity.length > 0) {
      this.cityNameSaved = this.savedCity[0].cityName
      this.city = this.savedCity[0].cityName
    }
    // axios
    //   .get(`https://api.opencagedata.com/geocode/v1/json?q=${this.city}&key=3e7edb89ef3c432aa5bb001c4d4e70d2`)
    //   .then(res => (this.geometry = res.data.results[0].geometry))
    // axios
    //   .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.cordin.lat}&lon=${this.cordin.lng}&exclude=daily
    //        &units=metric&appid=15b2238ad35774d2a7d5a9f658ca6fdc`)
    //   .then(res => (this.time = this.editingArray(res.data.hourly)))

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=15b2238ad35774d2a7d5a9f658ca6fdc`)
      .then(res => (this.info = res.data.main))
  },
  methods: {
    findCity () {
      // await axios
      //   .get(`https://api.opencagedata.com/geocode/v1/json?q=${this.city}&key=3e7edb89ef3c432aa5bb001c4d4e70d2`)
      //   .then(res => (this.cordin = res.data.results[0].geometry))

      // await axios
      //   .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.cordin.lat}&lon=${this.cordin.lng}&exclude=daily
      //        &units=metric&appid=15b2238ad35774d2a7d5a9f658ca6fdc`)
      //   .then(res => (this.time = this.editingArray(res.data.hourly)))

      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=15b2238ad35774d2a7d5a9f658ca6fdc`)
        .then(res => (this.info = res.data.main))

      this.cityNameSaved = this.city
    },
    errorHandling () {
      alert('pleace input correct city')
    },
    editingArray (arr) {
      return arr.slice(0, 24)
    },
    saveCity () {
      const city = {
        cityName: this.city,
        info: this.info
      }
      if (this.savedCity.filter(cit => cit.cityName.toLowerCase() === city.cityName.toLowerCase())[0]) {
        alert('В нас вже є це місто')
      } else {
        this.savedCity.push(city)
        localStorage.savedCity = JSON.stringify(this.savedCity)
      }
    },
    saveCityFromFile (obj) {
      console.log(obj)
      if (obj.length > 1) {
        obj.map((city) => {
          const cities = {
            cityName: city.cityName,
            info: city.info
          }
          if (this.savedCity.filter(c => c.cityName.toLowerCase() === cities.cityName.toLowerCase())[0]) {
            alert('Частина з данних в нас вже є')
          } else {
            this.savedCity.push(cities)
            localStorage.savedCity = JSON.stringify(this.savedCity)
          }
        })
      } else {
        const city = {
          cityName: obj[0].cityName,
          info: obj[0].info
        }
        if (this.savedCity.filter(cit => cit.cityName.toLowerCase() === city.cityName.toLowerCase())[0]) {
          alert('Ми вже маємо такі данні')
        } else {
          this.savedCity.push(city)
          localStorage.savedCity = JSON.stringify(this.savedCity)
        }
      }

      console.log(this.savedCity)
    },
    fromSavedCity (name) {
      const city = this.savedCity.filter(city => city.cityName === name)[0]
      if (city.cityName !== '') {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${city.cityName}&units=metric&appid=15b2238ad35774d2a7d5a9f658ca6fdc`)
          .then(res => (this.info = res.data.main))
          .catch(e => this.errorHandling())
      }
      this.city = city.cityName
      // this.time = city.time
      // this.cordin = city.cordin
      this.cityNameSaved = this.city
    },
    deleteCity (name) {
      // const city = this.savedCity.filter(city => city.cityName === name)
      const index = this.savedCity.findIndex(city => city.cityName === name)
      if (index > -1) {
        this.savedCity.splice(index, 1)
        localStorage.savedCity = JSON.stringify(this.savedCity)
      }
    },
    fileUpload (e) {
      this.file = e

      const blob = new Blob([this.file])

      const reader = new FileReader()
      reader.onload = (e) => {
        this.text = JSON.parse(e.target.result)
      }
      reader.onerror = () => {
        console.log('error')
        reader.abort()
      }
      reader.readAsText(blob)
    },
    downloadFile () {
      const blob = new Blob([JSON.stringify(this.savedCity)])
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'weather.json'
      link.click()
    }
  },
  watch: {
    text () {
      this.saveCityFromFile(this.text)
    }
  }
}
</script>
