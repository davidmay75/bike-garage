<template>
<div>

<nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <h1 class="title is-2 has-text-primary">[Bike-Garage]</h1>
    </a>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
            <div class="control">
                <button class="button is-primary" v-on:click="$emit('open-modal')">Add bike</button>
            </div>
        </div>
      </div>
    </div>
    <!-- <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a> -->
    </div>
</nav>

</div>
</template>

<script>

export default {
  name: 'Navbar',
  
  emits: ['open-modal'],

  methods: {
    showAddBikeModal() {
      this.showAddBikeModalFlag = true
    },
    hideAddBikeModal() {
      this.showAddBikeModalFlag = false
      this.$emit('update-garage')
    }
  },

  data() {
    return {
      showAddBikeModalFlag: false
    }
  }

}
</script>

<style>
.nav {
    background-color: rgb(184, 61, 255);
}

</style>