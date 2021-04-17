// Require Libraries
const { response } = require("express")
const express = require("express")

const Tenor = require("tenorjs").client({
  Key: "JEGTEZF54LUT",
  Filter: "high",
  Locale: "en_US",
})

// App Setup
const app = express()

// Middleware
const exphbs = require("express-handlebars")

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

// Routes

app.get("/", (req, res) => {
  term = ""
  if (req.query.term) {
    term = req.query.term
  }
  Tenor.Search.Query(term, "10")
    .then((response) => {
      const gifs = response
      res.render("home", { gifs })
    })
    .catch(console.error)
})

app.get("/greetings/:name", (req, res) => {
  // grab the name from the path provided
  const name = req.params.name
  // render the greetings view, passing along the name
  res.render("greetings", { name })
})

// Start Server
app.listen(3000, () => {
  console.log("Gif Search listening on port localhost:3000!")
})
