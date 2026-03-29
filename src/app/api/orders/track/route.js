import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get('orderNumber');

    if (!orderNumber) {
      return NextResponse.json(
        { error: 'Order number is required' },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { orderNumber },
      select: {
        orderNumber: true,
        orderStatus: true,
        paymentStatus: true,
        totalAmount: true,
        createdAt: true,
        items: {
          include: { product: { select: { name: true } } },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found. Please check your order number.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Error tracking order:', error);
    return NextResponse.json(
      { error: 'Failed to track order' },
      { status: 500 }
    );
  }
}
