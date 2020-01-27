import types from '../actions/types';

const initialState = {
	user: {},
	users: [],
	filteredRepos: null,
	selectedIds: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case types.FETCH_USER:
			return {
				...state,
				user: action.payload,
			};
		case types.FETCH_USERS:
			return {
				...state,
				users: action.payload,
			};
		case types.FETCH_USER_REPOS:
			return {
				...state,
				userRepos: action.payload,
			};
		case types.ITEM_TOGGLE: {
			const selected = [...state.selectedIds];
			if (selected.includes(action.payload)) {
				const index = selected.indexOf(action.payload);
				selected.splice(index, 1);
			} else {
				selected.push(action.payload);
			}
			return {
				...state,
				selectedIds: selected,
			};
		}
		case types.SELECT_ALL: {
			let selected = state.selectedIds;
			if (selected.length > 0) {
				selected = [];
			} else {
				selected = action.payload;
			}
			return {
				...state,
				selectedIds: selected,
			};
		}


		case types.UPDATE_REPOS:
			return {
				...state,
				userRepos: action.payload,
			};
		case types.FILTER_REPOS:
			return {
				...state,
				filteredRepos: action.payload,
			};
		case types.DELETE_REPO:
			return {
				...state,
				userRepos: action.payload,
			};
		default:
			return state;
	}
}

