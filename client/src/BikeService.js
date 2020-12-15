import axios from 'axios';
const url = '/api/bikes/'

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