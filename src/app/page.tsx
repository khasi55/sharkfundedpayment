'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const uuid = crypto.randomUUID ? crypto.randomUUID() : `sf-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        router.replace(`/secure-checkout/${uuid}`);
    }, [router]);

    return null;
}
