import express from "express"
import { addfood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router();

//image storage engine
const storage = multer.diskStorage({
    destination:"uploads",
    //cb=callback 
    filename:(req,file,cb)=>{
         return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})
foodRouter.post("/add",upload.single("image"),addfood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)

export default foodRouter;