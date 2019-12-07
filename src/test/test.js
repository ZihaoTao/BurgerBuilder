import React, {useEffect, useState} from 'react';
import classes from './test.module.css';
import Instance from './instance';

const Test = () => {
	const [postState, setPoststate] = useState({posts: []});
	const [bodyState, setBodystate] = useState({body: null});
	const [titleState, setTitleState] = useState({titleId: null});
	const [errorState, setErrorState] = useState({error: false});

  	useEffect(() => {
  		if (titleState.titleId) { 
  			// avoid updating indefinite loop
  			if (!bodyState.body || bodyState.body.id !== titleState.titleId) {
				Instance.get('/posts/' + titleState.titleId)
	      			.then(response => {
						setBodystate({body: response.data});
						setErrorState({error: false});
					})
					.catch(error => {
						setErrorState({error: true})
					});
  			}
		};
  	}); // componentDidUpdate
	
	useEffect(()=>{
		Instance.get('/posts')
			.then(response => {
				setPoststate({posts: response.data.slice(0, 4)});
				setErrorState({error: false});
			})
			.catch(error => {
				setErrorState({error: true})
			});
	}, []); // componentDidMount

	const clickHandler = (id) => {
		setTitleState({titleId: id});
	}

	const postDataHandler = () => {
		if(bodyState.body) {
			const data = {
				title: titleState.titleId,
				body: bodyState.body.body,
				author: 'Max'
			}
			Instance.post('/posts', data)
				.then(response => {
					console.log(response);
				});
		}
	}

	const div = postState.posts.map(el => <div key={el.id} onClick={() => clickHandler(el.id)}>{el.title}</div>);
	const body = errorState.error ? <div>Error!</div> : (
				<div>
					{div}
					<button onClick={postDataHandler}>Add Post</button>
					{bodyState.body ? <div>{bodyState.body.body}</div>:null}
				</div>);
	return (
		<div className={classes.Test}>
			{body}
		</div>);
}

export default Test;