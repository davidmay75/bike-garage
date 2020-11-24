<template>
<form id="form" @submit.prevent="onSubmit">
    <div class="form-input">
      <div>
        <label for="company">Company:</label>
        <input type="text" v-model="company" placeholder="">
      </div>
      <div>
        <label for="model">Model:</label>
        <input type="text" v-model="model" placeholder="">        
      </div>
      <div>
        <label for="year">Year:</label>
        <input type="text" v-model="year" placeholder="">        
      </div>
      <div>
        <p>{{imageLocation}}</p>
      </div>
      <div>
        {{test}}
      </div>
        

        <input multiple type="file" ref="files" @change="onFileSelected" name="file-input" id="file-input" class="file-input">


        <div class="files">
          <div v-for="(file, index) in files" :key="index">
            <div class="item">
              {{file.name}} 
              <span v-if="file.invalidMessage">{{file.invalidMessage}}</span>
              <button @click.prevent="files.splice(index, 1);uploadFiles.splice(index, 1)">X</button></div>
          </div>
        </div>

        <button v-on:click="addBike">Add bike</button>    
        <!-- <button v-on:click="addBike(); uploadPhoto();">upload bike and Photo</button>     -->
        <button v-on:click="uploadPhoto">upload bike and Photo</button>    

    </div>
</form>
</template>

<script>    
import axios from "axios"
import BikeService from '../BikeService'
import _ from 'lodash'

export default {
  name: 'BikeEntry',
  data() {
    return {
        files: [],
        uploadFiles: [],
        company: "",
        model: "",
        year: "",
        imageLocation: "",
        imageLocations: [],
        error: "",
        test: ""
    }   
  },

  methods: {
    onSubmit() {
      this.test = this.imageLocation + 'submitted successfully'
    },
    async addBike() {
      await BikeService.insertBike(this.company, this.model, this.year, this.imageLocation)
      //event.target.reset()
    },  
    async addBikeMultiplePhoto() {
      const formData = new FormData()

      _.forEach(this.uploadFiles, file => {
        if (this.validate(file) === "") {
          formData.append('files', file)
        }
      });

      try {          
        const response = await axios.post('http://localhost:4000/api/images/', formData)
        .then(await BikeService.insertBike(this.company, this.model, this.year, response.data.imageUrl))

        this.files = []
        this.uploadFiles = []

      } catch (error) {
        console.log(error)
      }
    },

    async uploadPhoto() {
      const formData = new FormData()
      formData.append('image', this.uploadFiles[0])

      const response = await axios.post('http://localhost:4000/api/images/', formData)
      const upload = await BikeService.insertBike(this.company, this.model, this.year, response.data.imageUrl)

      console.log(response)
      console.log(upload)

    },
    async uploadPhotoNew() {
      const formData = new FormData()
      formData.append('image', this.uploadFiles[0])

      try {          
        const response = await axios.post('http://localhost:4000/api/images/', formData)
        .then(await BikeService.insertBike(this.company, this.model, this.year, response.data.imageUrl))

        this.files = []
        this.uploadFiles = []

      } catch (error) {
        console.log(error)
      }
    },

    onFileSelected() {
        const files = this.$refs.files.files
        this.uploadFiles = [...this.files, ...files]//+=
        console.log(files)

        this.files = [
          ...this.files,
          ..._.map(files, file=> ({
            name: file.name,
            size: file.size,
            type: file.type,
          }))]

        this.imageLocation = this.uploadFiles[0].name
    },
    
    // async onFileUpload() {
    //   const formData = new FormData()
    //   _.forEach(this.uploadFiles, file => {
    //     if (this.validate(file) === "") {
    //       formData.append('files', file)
    //     }
    //   });

    //     try {          
    //       await axios.post('http://localhost:4000/api/images/', formData)
    //       this.files = []
    //       this.uploadFiles = []

    //     } catch (error) {
    //       console.log(error)
    //     }
    //   // appen bike details to this form data then upload 
    // },
  }
}
</script>

<style>
input{
    background-color: #000;
    color: green;
      margin: 5px;

}
label {
  margin: 5px;
}
</style>
