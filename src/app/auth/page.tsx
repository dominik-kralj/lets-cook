'use client';

import { useSearchParams } from 'next/navigation';

import { Login } from './components/Login';
import { Signup } from './components/Signup';

export default function Auth() {
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');

    return mode === 'login' ? <Login /> : <Signup />;
}
