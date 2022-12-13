import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const intialState: State = {
  ingredients: [
    new Ingredient('Green Apples', 5),
    new Ingredient('Tomato', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,
};


export function shoppingListReducer(
  state: State = intialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.paylod],
      };
    }
    case ShoppingListActions.ADD_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    }
    case ShoppingListActions.UPDATE_INGREDIENT: {
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = { ...ingredient, ...action.payload };
      const newIngredients = [...state.ingredients];
      newIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: [...newIngredients],
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    }
    case ShoppingListActions.DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, index) => {
          return index !== state.editedIngredientIndex;
        }),
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    }
    case ShoppingListActions.START_EDIT: {
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };
    }
    case ShoppingListActions.STOP_EDIT: {
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    }
    default: {
      return state;
    }
  }
}
