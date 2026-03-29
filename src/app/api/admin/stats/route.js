import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    // Total sales this month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const monthlyOrders = await prisma.order.findMany({
      where: { createdAt: { gte: startOfMonth } },
    });
    const totalSales = monthlyOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    // Pending orders count
    const pendingOrders = await prisma.order.count({
      where: { orderStatus: 'PROCESSING' },
    });

    // Products out of stock
    const lowStock = await prisma.product.count({
      where: { inStock: false },
    });

    // New reviews this month
    const newReviews = await prisma.review.count({
      where: { createdAt: { gte: startOfMonth } },
    });

    // Total orders
    const totalOrders = await prisma.order.count();

    // Unread messages
    const unreadMessages = await prisma.contactMessage.count({
      where: { read: false },
    });

    // Recent orders (last 10)
    const recentOrders = await prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { items: { include: { product: true } } },
    });

    return NextResponse.json({
      totalSales,
      pendingOrders,
      lowStock,
      newReviews,
      totalOrders,
      unreadMessages,
      recentOrders,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
