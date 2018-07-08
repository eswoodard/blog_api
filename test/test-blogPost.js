const chai = require("chai");
const chaiHttp = require("chai-http");

const {app, runServer, closeServer} = require("../server");

const expect = chai.expect;
chai.use(chaiHttp);

describe("Blog Post", function() {
    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

   it("should return blog posts on GET", function() {
       return chai
       .request(app)
       .get("/blog-post")
       .then(function(res) {
           expect(res).to.have.status(200);
           expect(res).to.be.json;
           expect(res.body).to.be.a("array");
           expect(res.body.length).to.be.at.least(1);
           const expectedKeys = ["title", "content", "author"];
           res.body.forEach(function(item) {
               expect(item).to.be.a("object");
               expect(item).to.include.keys(expectedKeys);
           });
       });
   });

   it("should add blog post on POST", function() {
       const newBlogPost = {
           title: "New blog post",
           content: "Lorem Ipusm dolor sit amet",
           author: "Sally Student"
       };
       return chai
       request(app)
       .post("/blog-post")
       .send(newBlogPost)
       .then(function(res) {
           expect(res).to.have.status(201);
           expect(res).to.be.json;
           expect(res).to.be.a("object");
           expect(res.body).to.include.keys("title", "content", "author");
           expect(res.body.id).to.not.equal("null");
           expect(res.body).to.deep.equal(
               Object.assign(newBlogPost, {id: res.body.id})
           );
       });
   });

   it("should update blog post on PUT", function() {
       const updateData = {
           name: "Newest blog post",
           content: "consectetur adipiscing elit",
           author: "Bugs Bunny"
       };

       return (
           chai
           .request(app)
           .get("/blog-post")
           .then(function(res) {
               updateData.id = res.body[0].id;
               return chai
               .request(app)
               .put(`/blog-post/${updateData.id}`)
               .send(updateData);
           })
           .then(function(res) {
               expect(res).to.have.status(204);
            //    expect(res).to.be.json;
            //    expect(res.body).to.be.a("object");
            //    expect(res.body).to.deep.equal(updateData);
           })
       );
   });

   if("should delete blog post on DELETE", function() {
       return (
           chai.request(app)
           .get("/blog-post")
           .then(function(res) {
               return chai.request.app.delete(`/blog-post/${res.body[0].id}`);
           })
           .then(function(res) {
               expect(res).to.have.status(204);
           })
       );
   });
});