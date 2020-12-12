import axios from 'axios';
const PORT = process.env.PORT || 4000

const url = '/api/bikes/'
console.log(PORT)
// const url = 'http://localhost:'+ PORT +'/api/bikes/'
// const url = 'http://192.168.0.5:'+ PORT +'/api/bikes/'
// const url = 'http://localhost:4000/api/bikes/'
// const url = 'http://bike-garage.herokuapp.com/api/bikes/'

class BikeService {
    // Get bikes
    static getBikes() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(bike => ({
                        ...bike,         
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })      
        });
    }
   
    //Create Post
    static insertBike(company, model, year, imageLocation, description) {
        return axios.post(url, {
            company,
            model,
            year,
            imageLocation,
            description
        });
    }

}

export default BikeService