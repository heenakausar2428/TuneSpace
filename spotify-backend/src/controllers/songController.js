import {v2 as cloudinary} from 'cloudinary';
import songModel from '../models/songModel.js';

const addSong = async (req, res) => {
    try {
        const { name, desc, album } = req.body;
        const audioFile = req.files?.audio?.[0];
        const imageFile = req.files?.image?.[0];

        if (!name || !desc || !album || !audioFile || !imageFile) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        console.log(req.body);
        console.log(req.files);

        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: 'video' });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
        const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`;

        const songData={
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }

        const song= songModel(songData);
        await song.save();

        res.status(200).json({
    success: true,
    message: "Song uploaded successfully"
        });

    }catch(error){
        res.json({success:false});
        console.log(error);
    }    
}

const listSong = async (req, res) => {
    try {

        const allSongs = await songModel.find();

        res.json({
            success: true,
            songs: allSongs
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false
        });
    }
}


const removeSong = async(req, res)=>{
        try{

            await songModel.findByIdAndDelete(req.body.id);
            res.json({
                success:true,
                message:"song deleted succesfully"
            })

        }catch(error){
             console.log(error);
        res.json({
            success: false
        });


        }
}



export { addSong, listSong, removeSong }