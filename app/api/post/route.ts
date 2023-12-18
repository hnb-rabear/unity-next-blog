import { createPost, deletePost, getPost, getPosts, getTotalUpvotes, getTotalViews, upvotePost, viewPost } from "lib/post";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const slug = request.nextUrl.searchParams.get("slug") as string;
    const fetchViews = request.nextUrl.searchParams.get("fetchViews") === "true";
    const fetchUpvotes = request.nextUrl.searchParams.get("fetchUpvotes") === "true";

    const getPostData = async (slug: string, fetchViews: boolean, fetchUpvotes: boolean) => {
        const postPromise = getPost(slug);
        const promises = [postPromise];
        if (fetchViews) {
            promises.push(getTotalViews(slug));
        }
        if (fetchUpvotes) {
            promises.push(getTotalUpvotes(slug));
        }

        const [post, ...results] = await Promise.all(promises);

        const postData = { ...post };
        if (fetchViews) {
            postData.totalViews = results.shift();
        }
        if (fetchUpvotes) {
            postData.totalUpvotes = results.shift();
        }
        return postData;
    };

    try {
        let resultData;

        if (slug) {
            resultData = await getPostData(slug, fetchViews, fetchUpvotes);
        } else {
            resultData = await getPostData("", false, false);
        }

        return new NextResponse(JSON.stringify(resultData));
    } catch (error) {
        const errorMessage = slug ? 'Could not get post' : 'Could not get posts';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const post = await request.json();
        const createdPost = await createPost(post);
        return new NextResponse(JSON.stringify(createdPost));
    } catch (error) {
        return NextResponse.json({ error: 'Could not create post' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const slug = request.nextUrl.searchParams.get("slug");
    if (slug) {
        try {
            const result = await deletePost(slug as string);
            return new NextResponse(JSON.stringify(result));
        } catch (error) {
            return NextResponse.json({ error: 'Could not delete post' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
    }
}

export async function PUT(request: NextRequest) {
    const slug = request.nextUrl.searchParams.get("slug");
    if (slug) {
        try {
            const result = await viewPost(slug as string);
            return new NextResponse(JSON.stringify(result));
        } catch (error) {
            return NextResponse.json({ error: 'Could not update post views' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Slug parameter is required' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    const { slug, ipAddress } = await request.json();
    if (slug) {
        try {
            return new NextResponse(JSON.stringify(await upvotePost(slug, ipAddress)));
        } catch {
            return NextResponse.json({ error: 'Could not upvote post' }, { status: 500 });
        }
    }
    else {
        return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
    }
}