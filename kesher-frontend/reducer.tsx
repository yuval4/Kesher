const initialState = {
    auth: {
        isLogin: false,
    },
    user: {
        name: { first: "", last: "" },
        role: "",
        children: [], //only for parents
        schools: [], //only for staff
    },
    report: {
        child_id: "",
        name: { first: "", last: "" },
        category: "",
        subCategory: "",
        profilePic: "",
    },
};

export default function Reducer(state = initialState, action: any) {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.data,
            };
        case "SET_REPORT":
            return {
                ...state,
                report: action.data,
            };
        case "SET_LOGIN":
            return {
                ...state,
                isLogin: action.data,
            };
        case "SET_REPORT_CATEGORY":
            return {
                ...state,
                category: action.data.category,
            };
        case "SET_REPORT_SUBCATEGORY":
            return {
                ...state,
                subCategory: action.data.subCategory,
            };

        // case 'DELETE_FOOD':
        //   return {
        //     ...state,
        //     foodList: state.foodList.filter((item) =>
        //       item.key !== action.key)
        //   };
        default:
            return state;
    }
}
