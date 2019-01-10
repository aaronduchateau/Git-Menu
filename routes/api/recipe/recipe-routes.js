// POST COMMENTING IS HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../../config/db'),
  User = require('../../../config/User'),
  root = process.cwd(),
  upload = require('multer')({
    dest: `${root}/dist/temp/`,
  }),
  { ProcessImage, DeleteAllOfFolder } = require('handy-image-processor'),
  { unlinkSync, createReadStream, createWriteStream } = require('fs')

// ADD RECIPIE [REQ = POST, TEST]
app.post('/add-recipe', async (req, res) => {
  function modTimeUtil(timeSent){
    let hrs = timeSent.hrs || 0;
    let mins = timeSent.mins || 0;
    return (hrs * 60) + mins;
  }

  //to do: remove log below
  console.log(req.body);
  try {
    let { title, key, description, starRating, prepTime, cookTime, totalTime, ingredients, directions } = req.body,
      { id } = req.session,
      recipe = {
        user_id: id,
        uuid: key,
        title: title,
        description: description,
        rating: starRating,
        prep_time: modTimeUtil(prepTime),
        cook_time: modTimeUtil(cookTime),
        total_time: modTimeUtil(totalTime),
        photo: '',
        version: '1.0',
        created_at: new Date().getTime(),
      },
      { insertId } = await db.query('INSERT INTO recipes SET ?', recipe);
      // note: ingSampled must be array of arrays for bulk update [[],[],[]];
      let ingSampled = ingredients.map((item, i) => { 
        return [item.key, item.val, '1.0', i, insertId, key];
      });
    
      let result = await db.query('INSERT INTO ingredients (uuid, text, version, orderv, parent_id, parent_uuid) VALUES ?', [ingSampled]);

      // note: ingSampled must be array of arrays for bulk update [[],[],[]];
      let directionsSampled = directions.map((item, i) => { 
        return [item.key, item.val, '1.0', i, insertId, key];
      });
    
      let result2 = await db.query('INSERT INTO directions (uuid, text, version, orderv, parent_id, parent_uuid) VALUES ?', [directionsSampled]);

    res.json({
      success: true,
      mssg: 'Recipie Created!!',
      recipe_uuid: key,
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

// ADD RECIPIE [REQ = POST, TEST]
app.post('/get-recipe', async (req, res) => {

  //to do: remove log below
  console.log("HIIIIITT!!")
  console.log(req.body);
  try {
    let { title, key, description, starRating, prepTime, cookTime, totalTime, ingredients, directions } = req.body,
      { id } = req.session,
      recipe = {
        user_id: id,
        uuid: key,
        title: title,
        description: description,
        rating: starRating,
        prep_time: modTimeUtil(prepTime),
        cook_time: modTimeUtil(cookTime),
        total_time: modTimeUtil(totalTime),
        photo: '',
        version: '1.0',
        created_at: new Date().getTime(),
      },
      { insertId } = await db.query('INSERT INTO recipes SET ?', recipe);
      // note: ingSampled must be array of arrays for bulk update [[],[],[]];
      let ingSampled = ingredients.map((item, i) => { 
        return [item.key, item.val, '1.0', i, insertId, key];
      });
    
      let result = await db.query('INSERT INTO ingredients (uuid, text, version, orderv, parent_id, parent_uuid) VALUES ?', [ingSampled]);

      // note: ingSampled must be array of arrays for bulk update [[],[],[]];
      let directionsSampled = directions.map((item, i) => { 
        return [item.key, item.val, '1.0', i, insertId, key];
      });
    
      let result2 = await db.query('INSERT INTO directions (uuid, text, version, orderv, parent_id, parent_uuid) VALUES ?', [directionsSampled]);

    res.json({
      success: true,
      mssg: 'Recipie Created!!',
      recipe_uuid: key,
    })
  } catch (error) {
    db.catchError(error, res)
  }
})


module.exports = app
