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
  console.log(req.body);
  console.log('foooooooo!O!O!!!O!!O!O');
  return false;
  try {
    let { post_id, text } = req.body,
      { id } = req.session,
      comment = {
        type: 'text',
        text,
        comment_by: id,
        post_id,
        comment_time: new Date().getTime(),
      },
      { insertId } = await db.query('INSERT INTO recipes SET ?', comment)
    //await User.mentionUsers(text, id, post_id, 'comment')

    res.json({
      success: true,
      mssg: 'Commented!!',
      comment_id: insertId,
    })
  } catch (error) {
    db.catchError(error, res)
  }
})


module.exports = app
