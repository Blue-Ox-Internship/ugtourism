import { Router } from "express";
// @ts-ignore - multer v2 has no types
import multer from "multer";
import cloudinary from "../lib/cloudinary";

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });

router.post("/video", upload.single("video"), async (req: any, res: any) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No video file provided" });
      return;
    }

    const base64 = req.file.buffer.toString("base64");
    const dataUri = `data:${req.file.mimetype};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      resource_type: "video",
      folder: "discover-uganda",
    });

    res.json({ url: result.secure_url, publicId: result.public_id });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
