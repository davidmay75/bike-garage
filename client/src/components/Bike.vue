<template>
<div class="card">
  <div class="card-image">
    <figure class="image">
      <img v-bind:src=bike.imageLocation alt="image uh-oh">
    </figure>
  </div>

  <div class="card-content">
    <h1 class="title is-1">{{bike.company}}</h1>
    <h2 class="subtitle is-2">{{bike.model}}</h2>
    <h5 class="subtitle is-5">{{bike.year}}</h5>
  </div>

</div>
</template>

<script>
export default {
  name: 'Bike',
  props: ['bike'],
  data() {
    return {
      error: ''
    }
  }
}
</script>

<style >
.card {
  margin: 0.5rem;
  border: solid green 0.25rem;
}

.container {
    border: 4px solid black;
}


.image{
    margin-left: auto;
    margin-right: auto;
    max-width: 240px;;
}

.card-image { 
  margin:  1rem;
  border: solid black 1px;
}

</style>