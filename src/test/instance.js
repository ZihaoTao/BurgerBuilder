import axios from 'axios';

const instance = axios.create({
	baseURL:'https://jsonplaceholder.typicode.com',
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use(request => {
	console.log('request:');
	console.log(request);
	// Edit request
	return request;
}, error => {
	console.log(error);
	return Promise.reject(error);
});

instance.interceptors.response.use(response => {
	console.log('response:');
	console.log(response);
	// Edit request
	return response;
}, error => {
	console.log(error);
	return Promise.reject(error);
});

export default instance;