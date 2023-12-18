'use server';


import { getTotalViews, viewPost } from "lib/post";

export async function viewPostAction(slug: string) {
    return await viewPost(slug);
}

export async function getTotalViewsAction(slug: string): Promise<number> {
    return await getTotalViews(slug);
}