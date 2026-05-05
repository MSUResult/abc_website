import { connectDB } from "@/lib/db/db";
import WhatsappClick from "@/lib/models/WhatsappClick";


export async function POST() {
  try {
    await connectDB();

    await WhatsappClick.findOneAndUpdate(
      {}, // no filter = single doc
      { $inc: { count: 1 } }, // increment
      {
        upsert: true, // create if not exists
        new: true,
      }
    );

    return Response.json({ success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false }, { status: 500 });
  }
}