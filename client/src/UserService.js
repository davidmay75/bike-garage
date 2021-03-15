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
    static insertUser(username, password, joinedDate) {
        return axios.post(url, {
            username,
            password,
            joinedDate
        });
    }

}

export default UserService