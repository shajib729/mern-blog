import axios from 'axios'

const token = localStorage.getItem("myToken")
export const createAction = (postData) => {
    return async (dispatch, getState) => {
		const {
			AuthReducer: { token },
		} = getState();
		dispatch({ type: 'SET_LOADER' });
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				// onUploadProgress: (data) => {

				// 	console.log(
				// 		'Your image upload progress: ',
				// 		Math.round((100 * data.loaded) / data.total)
				// 	);
				// },
			};
			const {data: { msg }} = await axios.post('/create_post', postData, config);
			dispatch({ type: 'CLOSE_LOADER' });
			dispatch({ type: 'REMOVE_ERRORS' });
			dispatch({ type: 'REDIRECT_TRUE' });
			dispatch({ type: 'SET_MESSAGE', payload: msg });
		} catch (error) {
			console.log(error.response);
			const { errors } = error.response.data;
			dispatch({ type: 'CLOSE_LOADER' });
			dispatch({ type: 'CREATE_ERRORS', payload: errors });
		}
	};
}