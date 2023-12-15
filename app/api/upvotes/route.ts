import { getPost, getPosts, upvotePost } from "lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const { slug, ipAddress } = await request.json();
    return new NextResponse(JSON.stringify(await upvotePost(slug, ipAddress)));
}

export async function GET(request: NextRequest) {
    const slug = request.nextUrl.searchParams.get("slug");
    if (!slug) {
        return new NextResponse(JSON.stringify(await getPosts()));
    }
    return new NextResponse(JSON.stringify(await getPost(slug)));
}