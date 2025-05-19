
'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';


export default function StoryActivitiesRedirect() {
    const router = useRouter();
    const params = useParams();
    const storyId = params.storyId;

    useEffect(() => {
        // Redirect to the specific activity page
        // For demonstration purposes, this redirects to a hardcoded URL
        // In a real application, you might want to use the actual storyId from params
        router.replace(`/dashboard/activities/story-1/activity-1-1`);
    }, [router, storyId]);

    return (
        <div className="flex items-center justify-center h-screen">
            <p>Redirecting...</p>
        </div>
    );
}