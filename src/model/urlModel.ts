import mongoose, { Document, Schema } from 'mongoose';
const shortId = require('shortid');

interface IUrl extends Document {
    full: string;
    short: string; 
}

const urlSchema: Schema = new Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    } 
});

export default mongoose.model<IUrl>('Url', urlSchema);