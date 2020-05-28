import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const apiKey = '267ccd31afd9b62dfea7d64e8c7ebf87'
const proxyUrl = 'http://127.0.0.1:3000/'

export default new Vuex.Store({
  state: {
    location: null,
    weather: null,
    forecast: null
  },
  mutations: {
    setLocation(state, payload) {
      Vue.set(state, 'location', payload)
    },
    setWeather(state, payload) {
      Vue.set(state, 'weather', payload)
    },
    setForecast(state, payload) {
      Vue.set(state, 'forecast', payload)
    }
  },
  actions: {
    getLocation(context) {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=> {
          const { latitude, longitude } = position.coords;
          context.commit('setLocation', { latitude, longitude})
        })
      } else {
        context.commit('setLocation', null)
      }
    },
    async getWeather(context) {
      const url = `${proxyUrl}${context.getters.weatherApi()}&lat=${context.getters.location.latitude}&lon=${context.getters.location.longitude}`
      const weatherData = await fetch(url);
      context.commit('setWeather', await weatherData.json())

    },
    async getWeatherForecast(context) {
      return new Promise((res, rej)=> {
        const url = `${proxyUrl}${context.getters.weatherApi('forecast')}&lat=${context.getters.location.latitude}&lon=${context.getters.location.longitude}`
        fetch(url).then(resp => resp.json()).then(data=>{
          context.commit('setForecast', data)
          res(data)
        }).catch(err=>{
          rej(err)
        })

      })
    }
  },
  getters: {
    location: state => state.location || {},
    weather: state => state.weather,
    forecast: state => state.forecast,
    weatherApi: () => (type = 'weather') => {
      return `https://api.openweathermap.org/data/2.5/${type}?appid=${apiKey}&units=metric`
    }
  }
})
