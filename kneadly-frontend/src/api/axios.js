import axios from 'axios';

export default axios.create({
    baseURL: 'http://kneadly-env.eba-eh3npqmp.us-east-1.elasticbeanstalk.com' // change the baseURL
    // baseURL: 'http://localhost:5000' // change the baseURL
});
