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

router.get('/:id' , async (req, res) => {

    const {id} = req.params
    try {
        const post = await Posts.findById(id)
            res.status(200).json(post)
    }
    catch(error) {
        res.status(404).json(error.message)
    }
    
})

router.get('/:id/comments' , async (req, res) => {

    const {id} = req.params
    try {
        const post = await Posts. findPostComments(id)
            res.status(200).json(post)
    }
    catch(error) {
        res.status(404).json(error.message)
    }  
})

router.post('/', (req, res) => {
    const {title, contents} = req.body

    if (!title || !contents) {
        res.status(400).json({ message: 'title and contents required!' })
      }

    Posts.insert(req.body)
    .then(() => {
        Posts.find()
        .then(response => {
            res.status(200).json(response)
        }).catch(err => res.status(404).json({message: err.message}))
    })
    .catch(err => res.status(404).json({message: err.message}))
})


router.post('/:id/comments', (req, res) => {

    const {text} = req.body
    const {id} = req.params

    if (!text) {
        res.status(400).json({ message: 'text required!' })
      }

    Posts.findPostComments(id)
    .then(() => {
       Posts.insertComment(text)
       .then(resp)
    })
    .catch(err => res.status(404).json({message: err.message}))
})

router.delete('/:id' , async (req, res) => {

    const {id} = req.params
    try {
        const post = await Posts.remove(id)
            res.status(200).json(post)
    }
    catch(error) {
        res.status(404).json(error.message)
    }
    
})

router.put('/:id' , async (req, res) => {
    const {id} = req.params
    try {
        const post = await Posts.update(id,req.body)
            res.status(200).json(post)
    }
    catch(error) {
        res.status(404).json(error.message)
    }
    
})



module.exports = router