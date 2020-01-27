import types from './types';

export const fetchUser = id => dispach => {
	fetch(`https://api.github.com/user/${id}`)
		.then(res => res.json())
		.then(data => dispach({
			type: types.FETCH_USER,
			payload: data,
		}));
};

export const fetchUsers = () => dispach => {
	fetch('https://api.github.com/users')
		.then(res => res.json())
		.then(data => dispach({
			type: types.FETCH_USERS,
			payload: data,
		}));
};

export const fetchUserRepos = url => dispatch => {
	fetch(url)
		.then(res => res.json())
		.then(resp => dispatch({
			type: types.FETCH_USER_REPOS,
			payload: resp,
		}));
};

export const fetchRepos = (reposUrl, id) => dispatch => {
	if (!reposUrl) {
		fetch(`https://api.github.com/user/${id}`)
			.then(res => res.json())
			.then(data => dispatch(fetchUserRepos(data.repos_url)));
	} else {
		dispatch(fetchUserRepos(reposUrl));
	}
};

export const onToggle = id => ({
	type: types.ITEM_TOGGLE,
	payload: id,
});

export const onSelectAll = () => (dispatch, getState) => {
	const repos = getState().users.userRepos;
	const ids = repos.map(el => el.id);
	dispatch({ type: types.SELECT_ALL, payload: ids });
};


export const updateRepos = repos => dispatch =>
	dispatch({ type: types.UPDATE_REPOS, payload: repos });

export const formSubmit = formData => (dispatch, getState) => {
	const repos = getState().users.userRepos;
	const updatedRepos = [...repos];
	const index = updatedRepos.findIndex(el => el.id === formData.id);

	updatedRepos[index] = {
		...updatedRepos[index],
		...formData,
	};

	dispatch(updateRepos(updatedRepos));
};

export const filterRepos = str => (dispatch, getState) => {
	const repos = getState().users.userRepos;
	const filteredRepos = repos.filter(item => item.name.length > 1 && item.name.includes(str));
	dispatch({ type: types.FILTER_REPOS, payload: filteredRepos });
};

export const deleteRepo = () => (dispatch, getState) => {
	const repos = getState().users.userRepos;
	const id = getState().users.selectedIds;
	const newReposList = repos.filter(item => !(id.includes(item.id)));
	dispatch({ type: types.DELETE_REPO, payload: newReposList });
};
