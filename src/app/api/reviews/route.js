import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeUnpublished = searchParams.get('all') === 'true';

    const reviews = await prisma.review.findMany({
      where: includeUnpublished ? {} : { published: true },
      orderBy: { createdAt: 'desc' },
      include: { product: true },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, published } = await request.json();

    const review = await prisma.review.update({
      where: { id },
      data: { published },
    });

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}
