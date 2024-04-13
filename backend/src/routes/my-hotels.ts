import express, {Request, Response} from "express";
import multer from "multer";
import cloudianry from "cloudinary";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import Hotel, { HotelType } from "../models/hotel";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024 //5MB
    }
})

// api/my-hotels
router.post(
    "/",
    verifyToken, 
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("counrty").notEmpty().withMessage("Country is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("type").notEmpty().withMessage("Hotel type is required"),
        body("pricePerNight")
        .notEmpty()
        .withMessage("Price per night is required and must be a number"),
        body("facilities")
        .notEmpty()
        .isArray()
        .withMessage('Facilities is required'),

    ],
     upload.array("imageFiles", 6),
 async (req: Request, res: Response) => {
    try{
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;



    //1. upload the images to cloudianry

     const uploadPromises = imageFiles.map(async(image)=>{
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI="data:" + image.mimetype + ";base64," + b64;
        const res = await cloudianry.v2.uploader.upload(dataURI);
        return res.url;
     });

     const imageUrls = await Promise.all(uploadPromises);
     newHotel.imageUrls = imageUrls;
     newHotel.lastupdated = new Date();
     newHotel.userId = req.userId;

    //2. if upload was successful, add the URLs to the new hotel

    //3. save the new hotel in our database

    const hotel = new Hotel(newHotel);
    await hotel.save();
    //4. return a 201 status
    res.status(201).send(hotel);


    } catch (e){
        console.log("Error creating hotel:", e );
        res.status(500).json({ message: "Something went wrong"});

    }

});

export default router;