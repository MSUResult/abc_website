import cloudinary from "@/lib/cloudinary/cloudinary";

export async function POST(req) {
  try {
    const body = await req.json();

    const result = await cloudinary.uploader.upload(body.file, {
      folder: "ABC", // 🔒 FORCE FOLDER HERE
    });

    return Response.json({ success: true, url: result.secure_url });
  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
}