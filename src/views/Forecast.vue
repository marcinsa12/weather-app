<template>
  <div class="forecast">
    <router-link class="logo" to="/">
      <img alt="Vue logo" width="65px" src="../assets/logo.png" class="logo" />
    </router-link>
    <h1 class="app-title">AirApp</h1>
    <div class="semi-transparent forecast-summary">
      <p class="details date">
        Date:
        <span>{{details.date}}</span>
      </p>
      <p class="details location">
        Location:
        <span>{{details.location}}</span>
      </p>
    </div>
    <table class="forecast-table">
      <tr>
        <th>Hour</th>
        <th>Temperature</th>
        <th>Description</th>
      </tr>
      <tr v-for="fc in forecastList" :key="fc.id">
        <td class="semi-transparent">{{fc.time}}</td>
        <td class="semi-transparent">{{fc.temp}}° C</td>
        <td class="semi-transparent">{{fc.desc}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Forecast",
  computed: {
    forecast() {
      return this.$store.getters.forecast;
    },
    weather() {
      return this.$store.getters.weather;
    },
    details() {
      return (
        (this.forecast && {
          location: this.forecast.city.name,
          date: new Date(this.weather.dt * 1000).toLocaleDateString()
        }) ||
        {}
      );
    },
    forecastList() {
      if (this.forecast) {
        const list = this.forecast.list.reduce((acc, cur, index) => {
          const obj = {
            time: new Date(cur.dt * 1000).toLocaleTimeString().substring(0, 5),
            temp: cur.main.temp.toFixed(0),
            desc: cur.weather[0].description,
            id: index
          };
          acc.push(obj);
          return acc;
        }, []);
        return list;
      } else return [];
    }
  },
  mounted() {
    if (!this.forecast) {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">
.app-title {
  font-size: 2rem;
  color: white;
  text-decoration: none;
}
.forecast {
  display: flex;
  flex-wrap: wrap;
  max-width: 450px;
  margin: auto;
  align-items: center;
  justify-content: flex-start;
  &-summary {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 5%;
    margin-bottom: 15%;
    .details {
      font-weight: 800;
      span {
        font-weight: 300;
      }
    }
  }

  &-table {
    width: 100%;
    border-spacing: 5px;
    td {
      width: 33%;
      padding: 15px 5px;
    }
  }
}
</style>