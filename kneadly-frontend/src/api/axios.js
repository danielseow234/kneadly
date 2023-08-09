import axios from 'axios';

export default axios.create({
    baseURL: 'https://6rf284jfm6.execute-api.us-east-1.amazonaws.com/prod' // change the baseURL
    // baseURL: 'http://localhost:5000' // change the baseURL
});
