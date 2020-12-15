<template>
<div class="card">
  <div class="card-image">
    <figure class="image">
      <img v-bind:src=bike.imageLocation alt="image uh-oh">
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

    <div>
      <p class=" has-text-white">{{bike.description}}</p>    
    </div>

    <div class="control">
      <textarea class="textarea" v-model="description" placeholder='bike.description' readonly></textarea>
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
  border: solid rgba(194, 249, 112, 1) 0.25rem;
  /* color: aquamarine; */
}

.container {
    /* border: 4px solid rgb(255, 0, 0); */
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