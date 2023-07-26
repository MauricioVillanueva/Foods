import axios from 'axios';

export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/recipes');
        return dispatch({ type: 'GET_RECIPES', payload: json.data });
    };
};

export function getDiets(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/diets');
        return dispatch({ type:'GET_DIETS', payload: json.data });
    };
};


export function getNameRecipes(name){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
            return dispatch({ type: 'GET_NAME_RECIPES', payload: json.data });
        } catch (error) {
            console.log(error);
        }
    };
};

export function getDetail(id){
    return async function(dispatch){
        try {
            var json= await axios.get(`http://localhost:3001/recipes/${id}`)
            return dispatch({ type: 'GET_DETAILS', payload: json.data });
        } catch (error) {
            console.log(error);
        }
    };
};


export function postRecipe(payload){
    return async function(){
        console.log(payload);
        const response = await axios.post('http://localhost:3001/recipes', payload);
        return response;
    };
};

export function orderByHealthScore(payload){
    return function (dispatch) {
      return dispatch({ type: 'ORDER_BY_HEALTHSCORE', payload: payload });
    };
};

export function filterByDiets(payload){
    return function (dispatch) {
        return dispatch({ type: 'FILTER_BY_DIETS', payload: payload });
    };
};

export function filterCreated(payload){
    return function(dispatch) {
        return dispatch({ type: 'FILTER_CREATED', payload: payload });
    };
};

export function orderByName(payload){
    return function(dispatch) {
    return dispatch({ type: 'ORDER_BY_NAME', payload: payload });
    };
}