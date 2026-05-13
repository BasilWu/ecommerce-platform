import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.deleteMany();

  const products = [
    { name: '無線藍牙耳機', description: '主動降噪，續航 30 小時，輕量折疊設計。', price: 1280, stock: 50, category: '3C 電子', tag: '熱銷', imageUrl: null },
    { name: '真空保溫杯', description: '316 不鏽鋼內膽，保溫 12 小時，附提把蓋。', price: 690, stock: 80, category: '居家生活', tag: '新品', imageUrl: null },
    { name: '機械鍵盤', description: '青軸手感，RGB 背光，USB-C 連接。', price: 2980, stock: 30, category: '3C 電子', tag: '限時優惠', imageUrl: null },
    { name: '電動牙刷', description: '音波震動，五種模式，附旅行收納盒。', price: 999, stock: 60, category: '居家生活', tag: '推薦', imageUrl: null },
    { name: '香氛精油組', description: '天然植萃，薰衣草 + 佛手柑 + 玫瑰三入組。', price: 880, stock: 40, category: '美妝保養', tag: '母親節', imageUrl: null },
    { name: '運動休閒鞋', description: '記憶泡棉鞋墊，透氣網布，男女款皆有。', price: 1590, stock: 35, category: '服飾鞋包', tag: '熱銷', imageUrl: null },
    { name: '嬰兒棉柔巾', description: '純棉材質，無螢光劑，適合新生兒使用。', price: 299, stock: 100, category: '母嬰玩具', tag: '推薦', imageUrl: null },
    { name: '手沖咖啡豆', description: '衣索比亞單品，日曬處理，莓果風味。', price: 480, stock: 70, category: '食品飲料', tag: '新品', imageUrl: null },
    { name: '瑜伽墊', description: '6mm 厚度，防滑紋路，附背帶收納。', price: 750, stock: 45, category: '居家生活', tag: null, imageUrl: null },
    { name: '保濕面膜', description: '玻尿酸精華液，一盒 10 片，適合乾燥肌。', price: 320, stock: 90, category: '美妝保養', tag: '熱銷', imageUrl: null },
    { name: '積木玩具組', description: '大顆粒積木，適合 18 個月以上，180 片。', price: 650, stock: 25, category: '母嬰玩具', tag: null, imageUrl: null },
    { name: '氣炸鍋', description: '5.5L 大容量，8 種智慧程式，觸控面板。', price: 3200, stock: 20, category: '居家生活', tag: '限時優惠', imageUrl: null },
  ];

  for (const p of products) {
    await prisma.product.create({ data: p });
  }

  console.log(`✅ Seeded ${products.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
