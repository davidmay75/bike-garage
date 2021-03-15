<template>

<div class="form-input">
  <h1>Register</h1>
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" placeholder="">
      </div>

      <div>
        <label for="password">password:</label>
        <input type="text" v-model="password" placeholder="">        
      </div>

      {{error}}


      <button v-on:click="postUser()">Register</button>    

</div>
</template>

<script>
import bcrypt from 'bcryptjs';
import UserService from '../UserService'

export default {
  name: 'Register',
  data() {
    return {
      error: '',
      username: '',
      password: '',
      email: ''
    }
  },

  methods: {
    
    async encryptPassword(password) {
      const salt = await bcrypt.genSaltSync(10)
      return await bcrypt.hashSync(password, salt)
    },

    async postUser() {
      console.log(this.username)
      if (this.username != '' && this.password != '' ) {
        try{
          await UserService.insertUser(this.username, this.encryptPassword(this.password))
          console.log("User" + this.username + " Added")
        }
        catch {
          this.error = 'Error adding user'
        }

        
      } else {
        this.error = 'Username and password required'
      }
    }
   
}
}
</script>

<style >


</style>