import { post } from 'axios'
import Notify from 'handy-notification'
import * as followA from '../actions/follow'
import { insta_notify, uData } from './utils'

/**
 * Follow user
 *
 * user, username & done properties must be provided.
 *
 * Provide update_followers when user's followers data need to be updated.
 * Eg. On Banner Comp.
 *
 * Provide update_followings when user's followings data need to be updated.
 * Eg. On Followers Comp.
 *
 * Provide dispatch when either update_followers OR update_followings needs to be updated
 *
 * Provide Firstname & Surname when update_followings=true
 *
 * Provide username as it used for notifying.
 *
 * @param {Object} options Options for following user
 * @param {Number} options.user
 * @param {String} options.username
 * @param {firstname} options.firstname
 * @param {surname} options.surname
 * @param {Boolean} options.update_followers
 * @param {Boolean} options.update_followings
 * @param {Function} options.dispatch
 * @param {Function} options.done
 */
export const addRecipe = async options => {
  let defaults = {
      title: '',
      key: '',
      description: '',
      starRating: 0,
      prepTime: {hrs: "", mins: ""},
      cookTime: {hrs: "", mins: ""},
      totalTime: {hrs: "", mins: ""},
      ingredients: [],
      directions: [],
      dispatch: () => null,
      done: () => null,
    },
    obj = { ...defaults, ...options },
    {
      title,
      key,
      description,
      starRating,
      prepTime,
      cookTime,
      totalTime,
      ingredients,
      directions,
      done,
    } = obj,
    {
      data: { mssg, success, ff },
    } = await post('/api/recipe/add-recipe', { 
      title,
      key,
      description,
      starRating,
      prepTime,
      cookTime,
      totalTime,
      ingredients,
      directions })

  if (success) {
    let fwing = {
      recipe_id: ff.uuid,
    }

    //dispatch(followA.Follower(ff));

    

    //insta_notify({
    //  to: user,
    //  type: 'follow',
    //})

    done()
  }

  //Notify({ value: mssg })
}

