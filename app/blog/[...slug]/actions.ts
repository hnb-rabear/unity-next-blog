'use server';

import { getTotalViews, viewPost } from "lib/prisma";

export async function viewPostAction(slug: string) {
    return await viewPost(slug);
}

export async function getTotalViewsAction(slug: string) {
    return await getTotalViews(slug);
}