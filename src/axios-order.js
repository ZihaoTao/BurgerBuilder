import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-my-burger-799c7.firebaseio.com/'
});

export default instance;