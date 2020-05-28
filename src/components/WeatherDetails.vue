<template>
  <div class="weather semi-transparent">
    <p class="temperature">{{details.temp}}° C</p>
    <p class="details date">Date: <span>{{details.date}}</span></p>
    <p class="details location">Location: <span>{{details.location}}</span></p>
    <p class="details desc">Description: <span>{{details.description}}</span></p>
    <a class="details more" @click="getWeatherForecast()">more</a>
  </div>
</template>

<script>
export default {
  name: 'WeatherDetails',
  props: {
    weather: Object
  },
  computed: {
    details() {
      return this.weather && {
        temp: this.weather.main.temp.toFixed(0),
        location: this.weather.name,
        date: new Date(this.weather.dt*1000).toLocaleDateString(),
        description: this.weather.weather[0].description
      }
    }
  },
  methods: {
    getWeatherForecast() {
      this.$store.dispatch('getWeatherForecast').then(res => {
        if(res){
          this.$router.push('/forecast')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .weather {
    width: 100%;
    display: grid;
    grid-template-columns: 30% 60% 10%;
    grid-template-rows: 33% 33% 33%;
    align-items: center;
    row-gap: 5px;
  }
  .temperature {
    font-size: 1.5em;
    font-weight: bold;
    grid-column: 1 / 2;
    margin: 0;
    grid-row: 1 / 3;
    @media (min-width: 667px) {
      grid-row: 1 / 4;
      font-size: 2em;
    }
  }
  .details { 
    grid-column: 2 / 4;
    margin: 0;
    font-weight: 500;
    display: block;
    @media (min-width: 667px) {
      grid-column: 2 / 3;
    }
    &.date { 
      grid-row: 1 / 2;
    }
    &.location { 
      grid-row: 2 / 3;
    }
    &.date { 
      grid-row: 3 / 4;
    }
    &.more {
      grid-column: 1 / 2;
      grid-row: 3 / 4;
      text-transform: uppercase;
      font-weight: 700;
      cursor: pointer;
      @media (min-width: 667px) {
        grid-column: 3 / 4;
      }
    }
    span {
      font-weight: 200;
    }
  }
</style>
