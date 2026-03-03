-- CreateTable
CREATE TABLE "Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,
    CONSTRAINT "Subject_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "id_user" INTEGER NOT NULL,
    CONSTRAINT "Course_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_id_user_key" ON "Course"("id_user");
