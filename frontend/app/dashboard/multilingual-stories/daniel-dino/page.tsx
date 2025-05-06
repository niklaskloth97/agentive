import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

'use client';


export default function RedirectPage() {
    const router = useRouter();

    useEffect(() => {
       
        const redirectUrl = '/dashboard/multilingual-stories/listening';
        router.push(redirectUrl);
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-500">Redirecting...</p>
        </div>
    );
}