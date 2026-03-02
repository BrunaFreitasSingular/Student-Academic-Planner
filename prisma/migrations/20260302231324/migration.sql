/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Subject` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Assessment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "grade" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "subjectId" INTEGER NOT NULL,
    CONSTRAINT "Assessment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "semester" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "requiredCredits" INTEGER NOT NULL,
    "transferredCredits" INTEGER NOT NULL,
    "electiveCredits" INTEGER NOT NULL,
    "complementaryCredits" INTEGER NOT NULL,
    "numberOfComplementaryTypes" INTEGER NOT NULL,
    "extensionHours" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "totalLessons" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Subject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Subject" ("credits", "id", "name", "semester", "status", "totalLessons", "year") SELECT "credits", "id", "name", "semester", "status", "totalLessons", "year" FROM "Subject";
DROP TABLE "Subject";
ALTER TABLE "new_Subject" RENAME TO "Subject";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Course_userId_key" ON "Course"("userId");
