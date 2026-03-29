import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where = {};
    if (status && status !== 'all') {
      where.orderStatus = status.toUpperCase();
    }
    if (search) {
      where.OR = [
        { orderNumber: { contains: search } },
        { customerName: { contains: search } },
      ];
    }

    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        items: { include: { product: true } },
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { customerName, customerEmail, totalAmount, paymentMethod, items } = data;

    const orderNumber = "MZA-" + Math.floor(100000 + Math.random() * 900000);

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail,
        totalAmount,
        paymentMethod,
        items: {
          create: items.map(item => ({
            productId: item.id,
            quantity: item.qty,
            price: item.price
          }))
        }
      },
      include: {
        items: true
      }
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, orderStatus, paymentStatus } = await request.json();

    const updateData = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const order = await prisma.order.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
