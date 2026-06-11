import mongoose from 'mongoose';

const recommendedGemSchema = new mongoose.Schema({
  gemstoneId: { type: String, required: true },
  name: { type: String, required: true },
  score: { type: Number, required: true },
  matchReasons: [String],
  color: String,
  planet: String,
  chakra: String,
  description: String,
  benefits: [String],
  careInstructions: String,
  priceRange: {
    min: Number,
    max: Number,
  },
  imageEmoji: String,
});

const recommendationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Input parameters
    zodiacSign: {
      type: String,
      required: true,
    },
    needs: {
      type: [String],
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    // Results
    recommendations: [recommendedGemSchema],
    // User notes
    notes: {
      type: String,
      default: '',
    },
    isSaved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Recommendation = mongoose.model('Recommendation', recommendationSchema);
export default Recommendation;
