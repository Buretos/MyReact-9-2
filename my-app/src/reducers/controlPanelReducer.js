export const initialStateControlPanel = {
	searchPhrase: '',
	isAlphabetSorting: false

};

export const controlPanelReducer = (state = initialStateControlPanel, action) => {
	switch (action.type) {

		case 'SET_SEARCH':
            return {
                ...state,
                searchPhrase: action.payload,
            };

		case 'SET_SORTING':
			return {
				...state,
				isAlphabetSorting: action.payload,
			};

		default:
			return state;
	}
};
