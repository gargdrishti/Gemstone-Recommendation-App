import Recommendation from '../models/Recommendation.js';
import { GEMSTONES, ZODIAC_SIGNS, NEEDS_OPTIONS } from '../config/gemstoneData.js';

// ─────────────────────────────────────────────────────────────────
// RECOMMENDATION ENGINE
// Scoring breakdown:
//   Zodiac match      → +40 pts
//   Each need match   → +20 pts
//   Budget fit        → +10 pts
//   Partial need      → +5 pts (substring match)
// ─────────────────────────────────────────────────────────────────
const scoreGemstone = (gem, zodiacSign, needs, budget) => {
  let score = 0;
  const matchReasons = [];

  // 1. Zodiac match
  if (gem.zodiacSigns.includes(zodiacSign)) {
    score += 40;
    matchReasons.push(`✨ Aligned with ${zodiacSign} zodiac energy`);
  }

  // 2. Needs match (exact)
  const exactMatches = needs.filter((n) => gem.needs.includes(n));
  exactMatches.forEach((n) => {
    const label = NEEDS_OPTIONS.find((o) => o.value === n)?.label || n;
    score += 20;
    matchReasons.push(`💎 Supports your need for ${label}`);
  });

  // 3. Partial/related needs match
  needs.forEach((n) => {
    if (!gem.needs.includes(n)) {
      const partial = gem.needs.some(
        (gn) => gn.includes(n) || n.includes(gn)
      );
      if (partial) {
        score += 5;
        matchReasons.push(`🌿 Partially supports: ${n}`);
      }
    }
  });

  // 4. Budget fit
  if (budget >= gem.minBudget) {
    score += 10;
    matchReasons.push(`💰 Within your budget of ₹${budget.toLocaleString()}`);
  }

  return { score, matchReasons };
};

// @route  POST /api/recommendations/generate
export const generateRecommendation = async (req, res) => {
  try {
    const { zodiacSign, needs, budget } = req.body;

    // Validation
    if (!zodiacSign || !needs || !budget) {
      return res.status(400).json({ success: false, message: 'zodiacSign, needs, and budget are required.' });
    }
    if (!ZODIAC_SIGNS.includes(zodiacSign)) {
      return res.status(400).json({ success: false, message: 'Invalid zodiac sign.' });
    }
    if (!Array.isArray(needs) || needs.length === 0) {
      return res.status(400).json({ success: false, message: 'Select at least one need.' });
    }
    if (Number(budget) <= 0) {
      return res.status(400).json({ success: false, message: 'Budget must be a positive number.' });
    }

    const budgetNum = Number(budget);

    // Score all gemstones
    const scored = GEMSTONES.map((gem) => {
      const { score, matchReasons } = scoreGemstone(gem, zodiacSign, needs, budgetNum);
      return {
        gemstoneId: gem.id,
        name: gem.name,
        score,
        matchReasons,
        color: gem.color,
        planet: gem.planet,
        chakra: gem.chakra,
        description: gem.description,
        benefits: gem.benefits,
        careInstructions: gem.careInstructions,
        priceRange: gem.priceRange,
        imageEmoji: gem.imageEmoji,
        origin: gem.origin,
        hardness: gem.hardness,
      };
    });

    // Sort by score, take top 5
    const top5 = scored
      .filter((g) => g.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    if (top5.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No strong matches found. Try broadening your needs or increasing budget.',
        recommendations: [],
      });
    }

    // Save to DB
    const recommendation = await Recommendation.create({
      user: req.user._id,
      zodiacSign,
      needs,
      budget: budgetNum,
      recommendations: top5,
    });

    res.status(201).json({
      success: true,
      message: 'Recommendations generated successfully.',
      data: recommendation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/recommendations/history
export const getHistory = async (req, res) => {
  try {
    const history = await Recommendation.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/recommendations/:id
export const getRecommendationById = async (req, res) => {
  try {
    const rec = await Recommendation.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!rec) {
      return res.status(404).json({ success: false, message: 'Recommendation not found.' });
    }
    res.json({ success: true, data: rec });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  PATCH /api/recommendations/:id/save
export const toggleSave = async (req, res) => {
  try {
    const rec = await Recommendation.findOne({ _id: req.params.id, user: req.user._id });
    if (!rec) {
      return res.status(404).json({ success: false, message: 'Recommendation not found.' });
    }
    rec.isSaved = !rec.isSaved;
    if (req.body.notes !== undefined) rec.notes = req.body.notes;
    await rec.save();
    res.json({ success: true, data: rec });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  DELETE /api/recommendations/:id
export const deleteRecommendation = async (req, res) => {
  try {
    const rec = await Recommendation.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!rec) {
      return res.status(404).json({ success: false, message: 'Recommendation not found.' });
    }
    res.json({ success: true, message: 'Deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/recommendations/gemstones  (public)
export const getAllGemstones = async (req, res) => {
  res.json({ success: true, data: GEMSTONES });
};
