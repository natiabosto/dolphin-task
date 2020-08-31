import update from 'react-addons-update';

const initialState = {
    ads: [
        // {
        //     name: "blablabfdf",
        //     amount: 200
        // },
        // {
        //     name: "ggggg",
        //     amount: 300
        // }
        ]
};

const adReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_AD":
            return {
                ...state,
                ads: [
                    ...state.ads,
                    action.payload
                ]
            };
        case "EDIT_AD":
            console.log('reducershi', action.payload);
            return {
                ...state,
                ads: action.payload,
            };

        case "DELETE_AD":
            return {
                ...state,
                ads: state.ads.filter((ad, index) => index !== action.index)
            };

        default:
            return state;
    }
};

export default adReducer;