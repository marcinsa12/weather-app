<template>
  <div class="home">
    <img alt="Vue logo" width="125px" src="../assets/logo.png" class="logo">
    <h1 class="app-title">AirApp</h1>
    <p class="description">Check the weather! Enter the city name, or <b>leave empty for geolocation</b></p>
    <LocationSearch />
    <WeatherDetails v-if="weather" :weather="weather" />
  </div>
</template>

<script>
// @ is an alias to /src
import WeatherDetails from '@/components/WeatherDetails'
import LocationSearch from '@/components/LocationSearch.vue'


import { mapState } from 'vuex';


export default {
  name: 'Home',
  components: {
    WeatherDetails,
    LocationSearch
  },
  data(){
    return {
      autocomplete: null,
    }
  },
  methods: {
    getAddressData(address) {
      const { latitude, longitude } = address
      this.$store.commit('setLocation', {latitude, longitude})
      this.$store.dispatch('getWeather')
    }
  },
  computed: mapState(['weather', 'location']),
  mounted() {
    this.$store.dispatch('getLocation')
  },
  watch: {
    location() {
      this.$store.dispatch('getWeather')
    } 
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-wrap: wrap;
  max-width: 450px;
  margin: auto;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -75%);
}
.app-title {
  font-size: 3.5rem;
  font-weight: 800;
}

</style>
