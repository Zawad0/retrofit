const SITE_FACTS = `RetroFit is a Bangladesh-focused marketplace for pre-loved clothing. It has women’s, men’s and kids’ collections. Buyers can browse products, add items to a cart, save favourites, and place orders. Checkout accepts cash on delivery or bKash. Checkout adds 5% VAT to the product subtotal. Inside Dhaka, shipping is ৳100 below ৳1,500 and free for orders of ৳1,500 or more. The checkout form accepts a delivery address and city. After ordering, RetroFit contacts the buyer to confirm delivery. To sell, create an account and request seller access; an admin must approve it. Sellers can then use the Seller dashboard; listings are reviewed before appearing publicly. Customer support: retrofit@gmail.com, +880 1700-000000. Support hours listed on the site: every day, 10:00 AM–8:00 PM. The site does not publish a confirmed return/refund policy.`;
const Product = require('../models/Product');

function cleanProduct(product) {
  if (!product || typeof product !== 'object') return null;
  const fields = ['name', 'group', 'type', 'brand', 'price', 'size', 'condition', 'material', 'usedFor', 'age'];
  const safe = Object.fromEntries(fields
    .filter((field) => typeof product[field] === 'string' || typeof product[field] === 'number')
    .map((field) => [field, String(product[field]).slice(0, 120)]));
  return safe.name ? safe : null;
}

exports.reply = async (req, res) => {
  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length < 1 || messages.length > 12) {
    return res.status(400).json({ message: 'Send between 1 and 12 chat messages.' });
  }
  const history = messages.map((item) => ({
    role: item?.role,
    content: typeof item?.content === 'string' ? item.content.trim().slice(0, 1000) : '',
  }));
  if (history.some((item) => !['user', 'assistant'].includes(item.role) || !item.content) || history.at(-1).role !== 'user') {
    return res.status(400).json({ message: 'The latest chat message must be a non-empty user message.' });
  }
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ message: 'AI chat is not configured yet. Please contact retrofit@gmail.com or +880 1700-000000.' });

  let catalog = [];
  try {
    const availableProducts = await Product.find({ moderationStatus: 'approved', status: 'available' })
      .select('name group type brand price size condition material usedFor age')
      .limit(120).lean();
    catalog = availableProducts.map(cleanProduct).filter(Boolean);
  } catch (error) {
    console.error('Chat catalog lookup failed:', error.name || 'database error');
  }
  const instructions = `You are RetroFit's friendly website assistant. Respond to general questions naturally and helpfully, including greetings and small talk. You can discuss general topics, but for facts about RetroFit, use only the verified site information and product catalog below. Never invent product availability, order status, shipping outside the stated facts, policies, contact details, or payments. If a RetroFit-specific fact is not provided, say you cannot verify it and give the support contact. If asked to perform an action such as placing/canceling an order, explain how the user can do it on the site; do not claim you performed it. Reply in the language the user used, including Bangla or Banglish, and keep answers concise.

Verified site information:
${SITE_FACTS}

Current product catalog (not necessarily exhaustive):
${JSON.stringify(catalog)}`;

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || 'gpt-4.1-mini', instructions, input: history, max_output_tokens: 400 }),
      signal: AbortSignal.timeout(30000),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error('OpenAI chat request failed:', response.status, data?.error?.type || 'provider error');
      return res.status(502).json({ message: 'I could not get an answer right now. Please try again shortly.' });
    }
    const answer = (data.output || []).flatMap((item) => item.content || [])
      .filter((item) => item.type === 'output_text')
      .map((item) => item.text)
      .join('\n').trim();
    if (!answer) return res.status(502).json({ message: 'I could not get an answer right now. Please try again shortly.' });
    return res.json({ answer });
  } catch (error) {
    console.error('OpenAI chat request failed:', error.name || 'request error');
    return res.status(502).json({ message: 'I could not connect to the chat service. Please try again shortly.' });
  }
};
