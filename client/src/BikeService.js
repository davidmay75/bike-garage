import axios from 'axios';

// const url = 'http://localhost:4000/api/bikes/' //HEROKU
const url = 'http://bike-garage.herokuapp.com/api/bikes/'


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
    static insertBike(company, model, year, imageLocation) {
        return axios.post(url, {
            company,
            model,
            year,
            imageLocation
        });
    }

}

export default BikeService