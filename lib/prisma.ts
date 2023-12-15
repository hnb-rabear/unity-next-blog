import { BlogPost } from "@prisma/client";
import { prisma } from "./db";

type PostInput = Omit<BlogPost, 'id' | 'createdAt'>;

export async function createPost(post: PostInput) {
    return await prisma.blogPost.create({ data: post });
}

export async function getPosts() {
    return await prisma.blogPost.findMany();
}

export async function getPost(slug: string) {
    return await prisma.blogPost.findUnique({ where: { slug } });
}

export async function deletePost(slug: string) {
    return await prisma.blogPost.delete({ where: { slug } });
}

export async function getTotalViews(slug: string) {
    if (slug)
        return await prisma.blogPost.aggregate({
            _sum: {
                views: true,
            },
            where: {
                slug,
            },
        });
    else
        return await prisma.blogPost.aggregate({
            _sum: {
                views: true,
            },
        });
}

export async function getTotalUpvotes(slug: string): Promise<number> {
    let total = 0;
    if (slug)
        total = await prisma.upvote.count({
            where: {
                post: {
                    slug: slug
                }
            }
        });
    else
        total = await prisma.upvote.count();

    return total;
}

export async function viewPost(slug: string) {
    return await prisma.blogPost.update({
        where: { slug },
        data: {
            views: {
                increment: 1,
            },
        },
    });
}

export async function upvotePost(slug: string, ipAddress: string) {
    const existingUpvote = await prisma.upvote.findUnique({
        where: { slug_ipAddress: { slug: slug, ipAddress } },
    });

    if (!existingUpvote) {

        // await prisma.upvote.create({
        //     data: {
        //         slug: slug,
        //         ipAddress,
        //     },
        // });

        // return await prisma.blogPost.update({
        //     where: { slug },
        //     data: {
        //         upvotes: {
        //             increment: 1,
        //         },
        //     },
        // });

        const result = await prisma.blogPost.upsert({
            where: { slug },
            create: {
                slug: slug,
                ipAddress,
                upvotes: 1,
            },
            update: {
                upvotes: {
                    increment: 1,
                },
            },
        });
        return result;
    } else {
        throw new Error("This IP address has already upvoted this post.");
    }
}
