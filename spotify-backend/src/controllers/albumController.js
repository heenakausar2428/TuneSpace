import {v2 as cloudinary} from 'cloudinary';
import albumModel from '../models/albumModel.js';


const addAlbum= async(req, res)=>{

    try{
        const { name, desc, bgColor } = req.body;
        const imageFile = req.files?.image?.[0];

         if (!name || !desc || !bgColor || !imageFile) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        console.log(req.body);
        console.log(req.files);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
        const albumData= {
            name,
            desc,
            bgColor,
            image: imageUpload.secure_url
        }

        const album= albumModel(albumData);
        await album.save();

        
        res.status(200).json({
    success: true,
    message: "Album uploaded successfully"
        });

    }catch(error){
         res.json({success:false});
        console.log(error);
    }

}

const listAlbum= async(req,res)=>{
    try{

         const allAlbums = await albumModel.find({});
        res.json({success:true, albums: allAlbums});


    }catch(error){
        res.json({success:false});
        console.log(error);
    }
}

const removeAlbum= async(req, res)=>{
    try{

         await albumModel.findByIdAndDelete(req.body.id);
                    res.json({
                        success:true,
                        message:"album deleted succesfully"
                    })

    }catch(error){
        console.log(error);
        res.json({
            success: false
        });

    }
}

export {addAlbum, removeAlbum, listAlbum} 

