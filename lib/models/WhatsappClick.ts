import mongoose from "mongoose";

const WhatsappClickSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.models.WhatsappClick ||
  mongoose.model("WhatsappClick", WhatsappClickSchema);