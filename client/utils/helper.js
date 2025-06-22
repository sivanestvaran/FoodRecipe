import Cookie from 'js-cookie';
import axios from './axiosInstance'

const validation = (fields) => {
    let messages = [];

    Object.entries(fields).forEach(([key, value]) => {
        if (value == '') {
            messages.push(`${key[0].toUpperCase() + key.slice(1)} is required`)
        }
    })

    return messages
}



const getUser = async () => {

    let user = null
    const response = await axios.get("/");
    user = response.data.user;

    return user


};

export { validation, getUser }