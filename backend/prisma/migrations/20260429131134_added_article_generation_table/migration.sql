-- CreateTable
CREATE TABLE "article_generations" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "topic" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255),
    "content" TEXT NOT NULL,
    "word_count" INTEGER NOT NULL,
    "language" VARCHAR(20) NOT NULL,
    "metadata" JSONB,
    "linking_strategy" JSONB,
    "faq" JSONB,
    "status" VARCHAR(20) NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "article_generations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "article_generations_user_id_idx" ON "article_generations"("user_id");

-- AddForeignKey
ALTER TABLE "article_generations" ADD CONSTRAINT "article_generations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
