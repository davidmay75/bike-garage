<template>
<div class="main">

  <NavbarVue @open-modal="showAddBikeModal"/>

  <register-vue/>

  <div class="garage">
    <GarageVue ref="garage" />
  </div>

<div class="modal" :class="{'is-active': showAddBikeModalFlag}">
  <div class="modal-background" v-on:click="hideAddBikeModal"></div>
    <div class="modal-content has-background-grey py-5 px-5">
        <h1 class="title is-1 has-text-primary">Add Bike</h1>            
     
        <BikeEntryVue @bike-uploaded="onBikeUpload"/>

    </div>
      <button class="modal-close is-large" v-on:click="hideAddBikeModal" aria-label="close"></button>   
</div>

</div>
</template>

<script>
import NavbarVue from './components/Navbar.vue'
import GarageVue from './components/Garage.vue'
import BikeEntryVue from './components/BikeEntry.vue'
import RegisterVue from './components/Register.vue'

export default {
  name: 'App',
  components: {
    NavbarVue,
    BikeEntryVue,
    GarageVue,
    RegisterVue
  },
  data() {
    return {
      bikes: [],
      showAddBikeModalFlag: false
    }
  },
  methods: {
    showAddBikeModal() {
      this.showAddBikeModalFlag = true
    },
    hideAddBikeModal() {
      this.showAddBikeModalFlag = false
    },
    onBikeUpload() {
      this.hideAddBikeModal()
      this.$refs.garage.refreshGarage()
    }
  }
}
</script>

<style>

.garage {
  margin: 1rem;
}
.main{
  /* background-color: aliceblue; */
}
.modal-content {
  border: solid rgba(194, 249, 112, 1) 5px;
  border-radius: .5rem;
  
}
h1{
  color: aliceblue;
}

</style>
