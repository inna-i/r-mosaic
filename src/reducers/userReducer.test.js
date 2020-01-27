import userReducer from './userReducer';
import types from '../actions/types';

const initialState = {
	filteredRepos: null,
	selectedIds: [],
	user: {},
	users: [],
};

describe('userReducer', () => {
	it('should return the initial state', () => {
		expect(userReducer(undefined, {})).toEqual(initialState);
	});

	it('check FETCH_USER case', () => {
		const state = {
			...initialState,
			user: {
				id: 'id',
				name: 'Tony Stark',
			},
		};
		const action = {
			type: types.FETCH_USER,
			payload: {
				id: 'id',
				name: 'Tony Stark',
			},
		};

		expect(userReducer(initialState, action)).toEqual(state);
	});

	it('check FETCH_USER_REPOS case', () => {
		const state = {
			...initialState,
			userRepos: {
				id: 'id',
				name: 'App',
			},
		};
		const action = {
			type: types.FETCH_USER_REPOS,
			payload: {
				id: 'id',
				name: 'App',
			},
		};

		expect(userReducer(initialState, action)).toEqual(state);
	});

	it('check ITEM_TOGGLE case with one id', () => {
		const action = {
			type: types.ITEM_TOGGLE,
			payload: 'id-1',
		};
		const updatedState = {
			...initialState,
			selectedIds: ['id-1'],
		};

		expect(userReducer(initialState, action)).toEqual(updatedState);
	});

	it('check ITEM_TOGGLE case with duplicated id', () => {
		const action = {
			type: types.ITEM_TOGGLE,
			payload: 'id-1',
		};
		const state = {
			...initialState,
			selectedIds: ['id-1'],
		};
		const updatedState = {
			...state,
			selectedIds: [],
		};

		expect(userReducer(state, action)).toEqual(updatedState);
	});

	it('check ITEM_TOGGLE case with new id', () => {
		const action = {
			type: types.ITEM_TOGGLE,
			payload: 'id-2',
		};
		const state = {
			...initialState,
			selectedIds: ['id-1'],
		};
		const updatedState = {
			...state,
			selectedIds: ['id-1', 'id-2'],
		};

		expect(userReducer(state, action)).toEqual(updatedState);
	});

	it('check SELECT_ALL case', () => {
		const action = {
			type: types.SELECT_ALL,
			payload: [1, 2, 3],
		};
		const state = {
			...initialState,
			selectedIds: [],
		};
		const updatedState = {
			...state,
			selectedIds: [...action.payload],
		};

		expect(userReducer(state, action)).toEqual(updatedState);
	});

	it('check UPDATE_REPOS case', () => {
		const action = {
			type: types.UPDATE_REPOS,
			payload: { name: 'app', id: 3 },
		};
		const state = {
			...initialState,
			userRepos: { name: 'app2', id: 4 },
		};
		const updatedState = {
			...state,
			userRepos: { name: 'app', id: 3 },
		};

		expect(userReducer(state, action)).toEqual(updatedState);
	});
});

