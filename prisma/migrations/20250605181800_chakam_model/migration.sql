-- CreateTable
CREATE TABLE "Chakam" (
    "id" TEXT NOT NULL,
    "tweet" TEXT,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Chakam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chakam_tweet_key" ON "Chakam"("tweet");

-- CreateIndex
CREATE UNIQUE INDEX "Chakam_image_key" ON "Chakam"("image");

-- AddForeignKey
ALTER TABLE "Chakam" ADD CONSTRAINT "Chakam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
