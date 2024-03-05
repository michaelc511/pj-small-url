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

urlSchema.pre<IUrl>('save', function(next) {
    const fullUrl = this.full;
    const protocolIndex = fullUrl.indexOf('://');
    if (protocolIndex !== -1) {
        const protocol = fullUrl.substring(0, protocolIndex + 3);
        this.short = protocol + this.short;
    }
    next();
});

export default mongoose.model<IUrl>('Url', urlSchema);