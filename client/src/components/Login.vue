<template>

<div class="form-input">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" placeholder="">
      </div>
      <div>
        <label for="password">password:</label>
        <input type="text" v-model="password" placeholder="">        
      </div>
      

      <button v-on:click="login(this.username, this.password)">Login</button>    
      <button v-on:click="logout()">Logout</button>    
      <button v-on:click="refreshToken()">Refresh token</button>    


      {{message}}
</div>
</template>

<script>
import UserService from '../UserService'
import bcrypt from 'bcryptjs'

export default {
  name: 'Login',
  data() {
    return {
      error: '',
      username: '',
      password: '',
      email: '',
      message: ''
    }
  },
  methods: {
    async login(username, password){
      const encryptedPassword = await this.encryptPassword(password)
      const response = await UserService.login(username, encryptedPassword)
      this.message = response.data.accessToken

      localStorage.setItem('token', response.data.accessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      
      console.log("accessToken set to " + localStorage.getItem('token'))
      console.log("resfreshToken set to " + localStorage.getItem('refreshToken'))


    },

    async logout(){
      const refreshToken = localStorage.getItem('refreshToken')        
        console.log("Logging out for refreshToken : " + refreshToken)
        const response = await UserService.logout(refreshToken)
        console.log(response)
    },

    async refreshToken() {
      console.log("Trying to refresh token " + localStorage.getItem('refreshToken'))
      const response = await UserService.postToken(localStorage.getItem('refreshToken'))

localStorage.setItem('token', response.data.accessToken)
      console.log("accessToken set to " + response.data.accessToken)


    },

    async encryptPassword(password) {
      const salt = await bcrypt.genSaltSync(10)
      return await bcrypt.hashSync(password, salt)
    }
  },
    
}
</script>


<style >


</style>