-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "profile_image" TEXT,
    "max_health_point" INTEGER,
    "last_login" TIMESTAMP(3),
    "level" INTEGER,
    "experience" INTEGER,
    "point" INTEGER,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
