import mongoose from 'mongoose';

interface IImageGen {
  text: string;
  image: string;
  likes: number;
  createdAt: Date;
}

const ImageGenSchema = new mongoose.Schema<IImageGen>({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ImageGen = mongoose.models.ImageGen || mongoose.model<IImageGen>('ImageGen', ImageGenSchema);

export default ImageGen;
