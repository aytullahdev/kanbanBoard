import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export function middleware(request) {


    const response = NextResponse.next();
    const hasToken = cookies().has('token');
    if (!hasToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return response;


}

export const config = {
    matcher: '/board',
}

