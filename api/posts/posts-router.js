const express = require('express')
const Posts = require('../../data/db')

const router = express.Router()

router.get('/' , async (req, res) => {
    try {
        const posts = await Posts.find()
        res.status(200).json(posts)
    }
    catch (error) {
        res.status(404).json(error.message)
    }
})

module.exports = router