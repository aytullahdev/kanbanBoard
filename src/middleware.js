import { NextResponse } from 'next/server'

export function middleware(request) {
    const response = NextResponse.next();
    const token = request.cookies.get('token')
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return response;


}

export const config = {
    matcher: '/board',
}

