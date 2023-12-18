import { Visitor } from "@prisma/client";
import { prisma } from "./db";

export async function createVisitor(ip: string, userAgent: string) {
    return await prisma.visitor.upsert({
        where: {
            ip
        },
        create: {
            ip,
            userAgent
        },
        update: {
            userAgent
        }
    });
}

export async function deleteVisitor(ip: string) {
    return await prisma.visitor.delete({
        where: {
            ip
        }
    });
}

export async function getVisitors(): Promise<Visitor[]> {
    return await prisma.visitor.findMany();
}

export async function getTotalVisitor(): Promise<number> {
    return await prisma.visitor.count();
}