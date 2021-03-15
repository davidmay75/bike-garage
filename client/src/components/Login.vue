<template>

<div class="form-input">
      <div>
        <label for="email">Email:</label>
        <input type="text" v-model="email" placeholder="">
      </div>
      <div>
        <label for="password">password:</label>
        <input type="text" v-model="password" placeholder="">        
      </div>
      <div>

      <button v-on:click="register">Add bike</button>    

</div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      error: '',
      username: '',
      password: '',
      email: ''
    }
  }
}
</script>

<style >


</style>