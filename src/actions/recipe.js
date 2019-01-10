import { dispatchHelper } from '../utils/utils'

export const getRecipe = (uuid) =>
  dispatchHelper('GET_RECIPE', 'recipe/get-recipe', {uuid: uuid})

export const getRecipies = () =>
  dispatchHelper('GET_RECIPES', 'get-recipes')

