const express = require("express")
const app = express();
let port = 3000
const path = require("path")
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))


app.use(express.static(path.join(__dirname, "/public")))

let posts = [
    {
        id: uuidv4(),
        username: "Nikhita Das",
        content: "How to learn coding in college",
        img:"https://www.aristokids.in/wp-content/uploads/2023/02/Good-Handwriting.jpg"

    },
    {
        id: uuidv4(),
        username: "Harsh Thakur",
        content: "How do I turn off the iCloud drive without losing files on, my Mac?",
        img:"https://media.licdn.com/dms/image/C4D12AQEZqULWtcE2ug/article-cover_image-shrink_600_2000/0/1520221840118?e=2147483647&v=beta&t=gGAuC-_8VafTUs1YeIpesjTy9MqTn_-8ia-M7mNm7GM"

    },
    {
        id: uuidv4(),
        username: "Nikhil Das",
        content: "Humor: What are some of the greatest examples of presence of mind?",
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPvkyO73UUUWgAF6du7IuM8SUxxUYExx-6lw&s"
    },

]

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts })
})

app.get("/posts/new", (req, res) => {  ////to get post form

    res.render("new.ejs")

})
// to post 

app.post("/posts", (req, res) => {
    let { username, content,img } = req.body
    let id = uuidv4();
    posts.push({ id, username, content,img })


    res.redirect("/posts")
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params
    let post = posts.find((p) =>
        id === p.id)
    if (post) {
        res.render("show.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }

    // res.render("show.ejs", { post })

})

//patch
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newBody = req.body.content;
    let newimg=req.body.img;
    let post = posts.find((p) => id === p.id)
    post.content = newBody;
    post.img=newimg
    // console.log(post)
    // res.send("patch req working")
    res.redirect("/posts")
})
app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    if (post) {
        res.render("edit.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }

});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;

     posts = posts.filter((p) => id != p.id)
    // posts.remove(post);
    res.redirect("/posts")

})




