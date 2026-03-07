require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const p = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function seed() {
  try {
    const count = await p.product.count();
    if (count > 0) {
      console.log('Already seeded:', count, 'products');
    } else {
      const products = [
        { name: 'Simple Refreshing Facial Wash', category: 'face-cleanse', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80', price: 55, badge: null, inStock: true, description: 'Soap-free facial wash with Vitamin B5+E & Pro Amino Acids.' },
        { name: 'Kojie San Skin Lightening Soap', category: 'face-cleanse', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80', price: 120, badge: 'Best Seller', inStock: true, description: 'High grade kojic acid to lighten dark spots.' },
        { name: 'Azelaic Acid 10% Serum', category: 'face-treat', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80', price: 85, badge: null, inStock: true, description: 'Fades hyperpigmentation, reduces redness and rosacea.' },
        { name: 'Snail Mucin 96% Essence', category: 'face-treat', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&q=80', price: 145, badge: 'Trending', inStock: true, description: 'Hydrates, repairs skin barrier, and gives a glass-skin glow.' },
        { name: 'Cerave Daily Moisturizer', category: 'face-moisturise', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80', price: 160, badge: null, inStock: false, description: 'Lightweight, oil-free moisturizer with 3 essential ceramides.' },
        { name: 'Advanced Snail 92 All in one Cream', category: 'face-moisturise', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80', price: 155, badge: 'New', inStock: true, description: 'Deeply nourishes and locks in moisture.' },
      ];
      for (const pr of products) {
        await p.product.create({ data: pr });
      }
      console.log('Seeded', products.length, 'products');
    }
  } catch (e) {
    console.error('ERROR:', e.message);
    console.error('FULL:', JSON.stringify(e, null, 2));
  } finally {
    await p.$disconnect();
  }
}

seed();
