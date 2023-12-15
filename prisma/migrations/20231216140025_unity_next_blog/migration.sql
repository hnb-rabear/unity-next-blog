/*
  Warnings:

  - You are about to drop the `Guestbook` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Guestbook";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "upvotes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Upvote" (
    "slug" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,

    CONSTRAINT "Upvote_pkey" PRIMARY KEY ("slug","ipAddress")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_slug_fkey" FOREIGN KEY ("slug") REFERENCES "BlogPost"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
