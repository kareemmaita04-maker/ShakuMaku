import { NextResponse } from 'next/server';

const USERNAME = 'SMK';
const PASSWORD = 'test';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (username === USERNAME && password === PASSWORD) {
      const res = NextResponse.json({ ok: true });
      res.cookies.set('admin_auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/',
      });
      return res;
    }

    return NextResponse.json({ ok: false, error: 'Invalid username or password.' }, { status: 401 });
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400 });
  }
}
