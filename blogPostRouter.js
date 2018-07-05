const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {BlogPosts} = require('./models');

BlogPosts.create("Sample Blog 1", "Lorem ipsum dolor sit amet", "Elizabeth Woodard");
BlogPosts.create("sample blog 2", "consectetur adipiscing elit", "Sally Student");

router.get('/', (req, res) => {
    res.json(BlogPosts.get());
}); 

router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
    res.status(201).json(item);
});

router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog post \`${req.params.ID}\``);
    res.status.end();
});

router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['id'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id) {
        const message = (
            `Request path id (${req.params.id}) and request body id `
            `(${req.body.id}) must match`);
          console.error(message);
          return res.status(400).send(message);
        }
        console.log(`Updating blog posts \`${req.params.id}\``);
        const updatedItem = BlogPosts.update({
            id: req.params.id,
            title: req.body.title,
            content: req.body.content,
            publishDate: req.body.publishDate
        });
        res.status(204).end();
})

module.exports = router;