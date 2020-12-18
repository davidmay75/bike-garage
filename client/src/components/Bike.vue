<template>
<div class="card">
  <div class="card-image" v-show="!!bike.imageLocation">
    <figure class="image has-text-black">
      <img v-bind:src=bike.imageLocation alt="image uh-oh :O">
    </figure>
  </div>

  <div class="card-content">
    <div class="columns">
      <div class="column">
        <p><span class="title is-1 has-text-primary">{{bike.company+" "}}  </span>
        <span class="subtitle is-1 has-text-white">{{bike.model}}</span></p>
      </div>
      <div class="column is-one-fifth">
            <span class="subtitle is-2 has-text-white">{{bike.year}}</span>
            
      </div>
    </div>

    <div class="description" v-show="!!bike.description">
      <p class="description-text">{{bike.description}}</p>    
    </div>

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
  border: solid rgba(194, 249, 112, 1) 0.5rem;
  /* color: aquamarine; */
}
.description-text {
  margin: 0.5rem;
}

.container {
    /* border: 4px solid rgb(255, 0, 0); */
}
.description {
  white-space: pre-wrap;
  background-color: rgba(255, 255, 255, 0.5) ;
  color: rgb(0, 0, 0);
  border: solid rgb(194, 249, 112) 0.25rem;
  border-radius: 0.5rem;
}


/* .image{
    margin-left: auto;
    margin-right: auto;
    max-width: 240px;;
} */
img {
    float: left;
    width:  100px;
    height: 100px;
    object-fit: cover;
    /* border: solid black ;
    border-width: 2px 2px 2px 2px ; */
}

.image { 
    margin:  1rem;
}

</style>