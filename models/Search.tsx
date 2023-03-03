import mongoose from 'mongoose';

const searchSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  answer: {
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

const Search = mongoose.models.Search || mongoose.model('Search', searchSchema);

export default Search;
