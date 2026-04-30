import mongoose from "mongoose";


const urlSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        index: true,
        default : null
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    longUrl: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    expireAt : {
        type: Date,
        required : true
    }
}, { timestamps: true });

urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const URL = mongoose.model("URL",urlSchema);

export default URL;