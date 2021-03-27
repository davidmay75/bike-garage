<template>
<div class="section">

  <div class="container">
    <div class="columns">
      <div class="column">
        <div v-bind:key="bike._id" v-for="bike in bikes" v-bind:item="bike">
        <BikeVue v-bind:bike="bike"/>
      </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import BikeService from '../BikeService'
import BikeVue from './Bike.vue'

export default {
  name: 'Garage',
  components: {
    BikeVue
  },
  data() {
    return {
      bikes: [],
      showAddBikeModalFlag: false
    }
  },

  methods: {
    async refreshGarage() {
      try {
        this.bikes = await BikeService.getBikes()
      } catch (error) {
        this.error = error.message
      }
    }  
  },

  async created() {
    try {
      this.bikes = await BikeService.getBikes()
    } catch (error) {
      this.error = error.message
    }
  }
}
</script>

<style>
.section {
  /* background-color: rgba(0, 100, 0, 1); */
}
.container {
  /* background-color: rgb(255, 255, 0); */
}
.column {
  text-align: left;
  max-width: 75%;
}
</style>