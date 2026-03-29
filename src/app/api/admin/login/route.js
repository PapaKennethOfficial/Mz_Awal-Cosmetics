import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    console.log(`[LOGIN_ATTEMPT] Email: ${email}`);
    
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@mzawal.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'mzawal2026';

    if (!adminEmail || !adminPassword) {
      console.error('[LOGIN_ERROR] Missing environment credentials.');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const normalizedEmail = (email || '').trim().toLowerCase();
    const normalizedAdminEmail = adminEmail.trim().toLowerCase();
    const normalizedPassword = (password || '').trim();
    const normalizedAdminPassword = adminPassword.trim();

    if (normalizedEmail !== normalizedAdminEmail || normalizedPassword !== normalizedAdminPassword) {
      console.warn(`[LOGIN_FAILED] Invalid credentials provided for ${email}`);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    console.log(`[LOGIN_SUCCESS] Admin logged in: ${email}`);
    // Create a simple token (in production, use JWT)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
