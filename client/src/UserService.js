import axios from 'axios';
const url = '/api/users/'

class UserService {
    // Get Users
    static getUsers() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(user => ({
                        ...user,         
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })      
        });
    }
   
    //Add user
    static insertUser(username, password) {
        return axios.post(url, {
            username,
            password     
        });
    }

    static login(username, password) {
        return axios.post(url+"Login/", {
            username,
            password
        })
    }

    static logout(refreshToken) {
        //return refreshToken
        return axios.post(url+"Logout/", {            
                token: refreshToken            
        })        
    }

    static postToken(token){
        return axios.post(url+"Token/", {
            token
        })
    }

}

export default UserService