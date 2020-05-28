<template>
  <form class="search">
    <div class="search-wrapper">
      <input type="text" class="search-box" v-model="searchphrase" />
      <div class="search-results" v-if="showSearchResults && searchSuggestions.length" v-click-outside="()=>showSearchResults = false">
        <ul class="results">
          <li
            v-for="suggestion in searchSuggestions"
            :key="suggestion.place_id"
            class="results-element"
            @click="selectLocation(suggestion)"
          >
            <span class="results-element_city">{{suggestion.address.name}}, </span>
            <span class="results-element_country">{{suggestion.address.country}}</span>
          </li>
        </ul>
      </div>
    </div>
    <button class="search-button" @click="selectLocation(searchSuggestions[0])">Check</button>
  </form>
</template>

<script>
import ClickOutside from 'vue-click-outside'
const autocompleteUrl = `https://api.locationiq.com/v1/autocomplete.php?key=1063a9e9ad7742&limit=4&q=`;

export default {
  name: "LocationSearch",
  data() {
    return {
      searchphrase: "",
      searchSuggestions: [],
      showSearchResults: false,
      awaitSearch: false
    };
  },
  methods: {
    getSearchAutocomplete() {
      const q = this.searchphrase;
      fetch(autocompleteUrl + q)
        .then(resp => resp.json())
        .then(data => {
          this.searchSuggestions = data;
          this.showSearchResults = true;
        });
    },
    selectLocation(location) {
        this.searchphrase = `${location.address.name}, ${location.address.country}`
        const {lat, lon} = location
        this.$store.commit('setLocation', {latitude: lat, longitude: lon})
        this.showSearchResults = false
    }
  },
  watch: {
    searchphrase: function() {
      if (!this.awaitSearch) {
        setTimeout(() => {
          this.getSearchAutocomplete()
          this.awaitSearch = false;
        }, 1000); 
      }
      this.awaitSearch = true;
    }
  }, 
  directives: {
    ClickOutside
  }
};
</script>

<style lang="scss">
.search {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  &-wrapper {
    width: 60%;
    position: relative;
  }
  &-box {
    width: 100%;
    border: 1px solid white;
    background: rgba(255, 255, 255, 0.2);
    height: 36px;
    padding-left: 15px;
    caret-color: white;
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    outline: none;
  }
  &-button {
    font-family: "M PLUS Rounded 1c", sans-serif;
    width: 35%;
    font-weight: 800;
    font-size: 1.1rem;
    text-transform: uppercase;
    background: rgba(255, 255, 255, 0.4);
    border: none;
    color: white;
    outline: none;
    cursor: pointer;
  }
  &-results {
    position: absolute;
    top: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
  }
  .results {
    margin: 0;
    list-style: none;
    padding: 0;
    &-element {
      padding: 5px;
      text-align: left;
      width: 100%;
      cursor: pointer;
      &:not(:last-child) {
        border-bottom: 1px solid rgba(255, 255, 255, 0.4);
      }
      &:hover {
        background: rgba(255, 255, 255, 0.4);
      }
      &_city {
        font-weight: 800;
      }
      &_country {
        font-size: 0.65rem;
        font-weight: 300;
      }
    }
  }
}
</style>