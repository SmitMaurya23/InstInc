import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destPath = path.join(__dirname, 'uploads');
    console.log('Saving file to:', destPath);
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    const fileName = `${file.originalname}`;
    console.log('Saving file as:', fileName);
    cb(null, fileName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 } // 10 MB limit
});

export default upload;
