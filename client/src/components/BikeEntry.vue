<template>
<form id="form" @submit.prevent="onSubmit">

<div class="field is-horizontal">
  <div class="field-label">
    <label class="label">Company</label>
  </div>
  <div class="field-body">
    <div class="field">
      <p class="control ">
        <input class="input" type="text" v-model="company" placeholder="Company">
      </p>
    </div>  
  </div>
</div>
<div class="field is-horizontal">
  <div class="field-label">
    <label class="label">Model</label>
  </div>
  <div class="field-body">
    <div class="field">
      <p class="control ">
        <input class="input" type="text"  v-model="model" placeholder="Model">
      </p>
    </div>  
  </div>
</div>
<div class="field is-horizontal">
  <div class="field-label">
    <label class="label">Year</label>
  </div>
  <div class="field-body">
    <div class="field">
      <p class="control ">
        <input class="input" type="text" v-model="year" placeholder="1969">
      </p>
    </div>  
  </div>
</div>
<div class="field is-horizontal">
  <div class="field-label">
    <label class="label">Image</label>
  </div>
  <div class="field-body">
    <div class="field">
      <p class="control ">
        <input class="input" type="file" ref="files" @change="onFileSelected">
      </p>
    </div>  
  </div>
</div>

  <div class="control">
    <button class="button is-primary is-pulled-right" v-on:click="addBike">Submit</button>
  </div>

</form>
</template>

<script>    
import axios from "axios"
import BikeService from '../BikeService'
import _ from 'lodash'
require('dotenv').config()

export default {
  name: 'BikeEntry',
  emits: {'bike-uploaded': null},
  data() {
    return {
        file: "",
        files: [],
        uploadFiles: [],
        company: "",
        model: "",
        year: "",
        imageLocation: "",
        // imageLocations: [],
        error: ""
    }   
  },

  methods: {
    onSubmit() {
      this.file = []
      this.files = []
      this.uploadFiles = []
    },

    async addBike() {

      if (this.uploadFiles[0])  {
          const formData = new FormData()
          formData.append('image', this.uploadFiles[0]) 

          try {          
            const response = await axios.post('http://localhost:4000/api/images/', formData)
    
            await BikeService.insertBike(this.company, this.model, this.year, response.data.imageUrl)

            console.log(process.env)

            this.imageLocation = response.data.imageUrl

            this.onSubmit()

            this.$emit('bike-uploaded')


          } catch (error) {
            console.log(error)
          }         
      }
      else {
        BikeService.insertBike(this.company, this.model, this.year, "")
        this.$emit('bike-uploaded')
        //do try
      }
      //this.submitted()
    },

    onFileSelected() {
        const files = this.$refs.files.files
        this.uploadFiles = [...this.files, ...files]//+=
        console.log("Files" + files)

        this.files = [
          ...this.files,
          ..._.map(files, file=> ({
            name: file.name,
            size: file.size,
            type: file.type,
          }))]

        this.imageLocation = this.uploadFiles[0].name
    }
  }
}
</script>

<style>

label {
  margin: 5px;
} 


</style>
