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
<div class="field is-horizontal">
  <div class="field-label">
    <label class="label">Description</label>
  </div>
  <div class="field-body">
    <div class="field">
      <p class="control ">
        <textarea class="textarea" v-model="description" placeholder="Description"></textarea>
      </p>
    </div>  
  </div>
</div>

  <p class="has-text-danger" v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
    </ul>
  </p>

  <div class="control">
    <button class="button is-primary is-pulled-right" v-on:click="addBike">Submit</button>
  </div>

</form>
</template>

<script>    
import axios from "axios"
import BikeService from '../BikeService'
// import _ from 'lodash'
require('dotenv').config()

export default {
  name: 'BikeEntry',
  emits: ['bike-uploaded'],
  data() {
    return {
        file: "",
        uploadFile: "",
        files: [],
        uploadFiles: [],
        company: "",
        model: "",
        year: "",
        description: "",
        imageLocation: "",
        errors: []
    }   
  },

  methods: {
    clearForm() {
      this.file = ""
      this.uploadFile = ""
      this.files = []
      this.uploadFiles = []
      this.company = ""
      this.model = ""
      this.year = ""
      this.description = ""
      this.imageLocation = ""
    },

    checkForm(e) {
      this.errors = [];

      if (this.file) {
        this.validateFile(this.file)
      }

      if (!this.company) {
        this.errors.push('Company required.');
      }
      if (!this.model) {
        this.errors.push('Model required.');
      }

      if (this.errors.length == 0) {
        return true;        
      } 

      e.preventDefault();

    },

    async addBike(e) {

      if (this.checkForm(e)) {
        if (this.uploadFile)  {

          const formData = new FormData()
          formData.append('image', this.uploadFile) 
          console.log("attempting to upload: " + this.uploadFile)

          try {         
            const url = '/api/images/'
            const response = await axios.post(url, formData)
            // if (!response.data.imageUrl){
              // image failed
            // }

            await BikeService.insertBike(this.company, this.model, this.year, response.data.imageUrl, this.description)

            this.clearForm()
            this.$emit('bike-uploaded')

          } catch (error) {
            console.log(error)
          }         
      }
      else {

          await BikeService.insertBike(this.company, this.model, this.year, "", this.description)
          this.clearForm()
          this.$emit('bike-uploaded')      
                   
        }
      }
    },

    onFileSelected() {
      const file = this.$refs.files.files[0]
      this.file = file
      console.log("File selected: " + this.file)

      if (this.validateFile(file)) {
        this.uploadFile = file
      }

      // const files = this.$refs.files.files
      // this.uploadFiles = [...this.files, ...files]//+=

      // this.files = [
      //   ...this.files,
      //   ..._.map(files, file=> ({
      //     name: file.name,
      //     size: file.size,
      //     type: file.type,
      //   }))]

    },
    validateFile(file) {
      var allowedExtensions = ["image/jpeg", "image/jpeg", "image/png", "image/gif"]

      if (allowedExtensions.includes(file.type)) {
        //this.uploadFile = file
        return true
      }

      this.errors.push('Only JPG, JPEG, PNG extensions allowed')
      //this.uploadFile = ""
      return false
    },

    // onFileUpload() {

    // }
  }
}
</script>

<style>

label {
  margin: 5px;
} 


</style>
