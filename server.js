const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/recipes", (req, res) => {
  fs.readFile("./server/recipes.json", "utf-8", (err, recipes) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error reading data file");
    } else {
      const jsonRecipes = JSON.parse(recipes);
      res.send(jsonRecipes);
    }
  });
});

app.post("/recipes", (req, res) => {
  fs.readFile("./server/recipes.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error reading data file");
    } else {
      const jsonData = JSON.parse(data);
      jsonData.push(req.body);
      fs.writeFile("./server/recipes.json", JSON.stringify(jsonData), (err) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error writing data file");
        } else {
          res.send(req.body);
        }
      });
    }
  });
});

app.listen(8800, () => {
  console.log("Server listening on port 8800");
});
