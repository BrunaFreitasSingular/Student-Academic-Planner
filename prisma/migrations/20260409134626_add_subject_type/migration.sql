/*
  Warnings:

  - Added the required column `type` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
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
    "id_student" INTEGER NOT NULL,
    "totalAssessments" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    CONSTRAINT "Subject_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Subject" ("credits", "id", "id_student", "name", "semester", "status", "totalAssessments", "year") SELECT "credits", "id", "id_student", "name", "semester", "status", "totalAssessments", "year" FROM "Subject";
DROP TABLE "Subject";
ALTER TABLE "new_Subject" RENAME TO "Subject";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
