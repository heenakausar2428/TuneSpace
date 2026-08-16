import { addAlbum, removeAlbum, listAlbum } from "../controllers/albumController.js";
import express from 'express';
import upload from '../middleware/multer.js'


const albumRouter = express.Router();

albumRouter.post('/add', upload.fields([{ name: 'image', maxCount: 1 }]), addAlbum);
albumRouter.get('/list', listAlbum);
albumRouter.delete('/remove', removeAlbum);

export default albumRouter;