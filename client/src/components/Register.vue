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
          // const encryptedPassword = await this.encryptPassword(this.password)
 //var d = new Date()
          await UserService.insertUser(this.username, await this.encryptPassword(this.password), Date.now())
          console.log("User" + this.username + " Added and " )
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