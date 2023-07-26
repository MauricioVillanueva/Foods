const initialState = {
    recipes : [],
    allRecipes : [],
    diets:[],
    steps:[],
    detail:[]
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_RECIPES':
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case 'GET_DIETS':
            return{
                ...state,
                diets: action.payload
            }
        case 'GET_NAME_RECIPES':
            return{
                ...state,
                recipes: action.payload
            }
        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }
        case 'POST_RECIPE':
            return{
                ...state,
            }
        case 'CLEAR_DETAIL':
            return {
                ...state,
                detail: []
            };
        case 'FILTER_BY_DIETS':
            const selectedDiet = action.payload;
            const filterDietsRecipes = state.allRecipes;
            const dietFilter = action.payload === 'All' ? state.allRecipes : filterDietsRecipes.filter(recipe => recipe.diets.includes(action.payload));
            return{
                ...state,
                recipes: dietFilter
            };

        case 'FILTER_CREATED':
            const allRecipesByCreated = state.allRecipes
            const createdFilter = action.payload === 'database' ? allRecipesByCreated.filter(el => el.createdInDb) : allRecipesByCreated.filter(el => !el.createdInDb);
            console.log(createdFilter);
            return{
                ...state,
                recipes:action.payload === 'All' ? state.allRecipes : createdFilter,
            };

        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ?
                state.recipes.sort(function(a, b){
                    if(a.title > b.title){
                        return 1;
                    }
                    if(b.title > a.title){
                        return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function(a, b){
                    if(a.title > b.title){
                        return -1;
                    }
                    if(b.title > a.title){
                        return 1;
                    }
                    return 0;
                })
        return {
            ...state,
            recipes: sortedArr
        };
        
        case 'ORDER_BY_HEALTHSCORE':
            const orderHealthScoreRecipes = state.allRecipes.sort((recipeA, recipeB) => {
                if (action.payload === "up") {
                return recipeB.healthScore - recipeA.healthScore;
                }
                return recipeA.healthScore - recipeB.healthScore;
            });
            return {
                ...state,
                allRecipes: orderHealthScoreRecipes,
            };
        default:
            return state;
    }
}

export default rootReducer;