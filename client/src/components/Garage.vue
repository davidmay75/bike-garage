<template>
<div class="section">

  <div class="container">
    <div class="columns is-vcentered">
      <div class="column is-vcentered">
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
  background-color: rgb(153, 130, 0);
}
.container {
  background-color: rgb(44, 44, 4);
}
.column {
  text-align: center;
}
</style>