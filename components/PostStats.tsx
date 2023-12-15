'use client';

import { getTotalViewsAction, viewPostAction } from "app/blog/[...slug]/actions";
import { useEffect, useState } from "react";

function PostStats({ slug }) {
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        getTotalViewsAction(slug).then(setViewCount);
    });

    useEffect(() => {
        viewPostAction(slug);
    }, [slug]);

    return (
        <div>
            <p>View Count: {viewCount}</p>
        </div>
    );
}
export default PostStats;