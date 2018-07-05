const express = require('express');
const router = express.Router();

const {BlogPosts} = require('./models');

BlogPosts.create("Sample Blog 1", "Lorem ipsum dolor sit amet", "Elizabeth Woodard");
BlogPosts.create("sample blog 2", "consectetur adipiscing elit", "Sally Student");

router.get('/', (req, res) => {
    res.json(BlogPosts.get());
}); 