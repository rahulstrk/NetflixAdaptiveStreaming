import multer from "multer";
import path from "path";

import { getUplaodDirectory } from "../lib/media";
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: (_req, file, cb) => {
        cb(null, getUplaodDirectory())
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${uuidv4()}${ext}`);
    }
})

export const uploadMiddleware = multer({ 
    storage,
    limits: {
        fileSize: 1024 * 1024 * 1024, // 1GB
    }
});

