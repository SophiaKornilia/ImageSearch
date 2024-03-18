const express = require("express");
const fs = require("fs").promises
const cors = require("cors")

const app = express()

    
    app.use(cors())
    app.use(express.json()) 
    
    const readFavorite = async () => {
        const data = await fs.readFile("./favouriteImages.json");
        console.log(JSON.parse(data))
        return JSON.parse(data);
    }
    
    const saveImage = async (link) => {
            const existingData = await readFavorite();
              const newData = [...existingData, link];
              await fs.writeFile("./favouriteImages.json", JSON.stringify(newData, null, 2));
    }
    app.post("/api/favouriteImages/save", async (req, res) => {
        try { 
          const {userEmail, link} = req.body;
          const favouriteImages = await readFavorite();
          //checka om användaren finns i listan. if om användaren finns lägg till länk, om inte lägg till användare och länk. Länken ska ligga i en array.Logigen ska ligga i posten.  Hur favouriteImages ska manipuleras. 
          //--
          await saveImage(favouriteImages);
          res.status(201).json(userEmail,link);
        } catch (error) {
          res.status(500).json({ message: "Internal server error" });
        }
      });

      app.get("/api/favouriteImages/print", async (req, res) => {
        try{
            const favouriteImages = await readFavorite();
            res.status(200).json(favouriteImages)
        } catch(error) {
            res.status(500).json("error")
        }
      })

 
app.listen(3000, () => console.log("Server is up and running!"))
