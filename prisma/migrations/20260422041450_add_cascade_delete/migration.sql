-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assessment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "grade" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "subjectId" INTEGER NOT NULL,
    CONSTRAINT "Assessment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Assessment" ("grade", "id", "subjectId", "title", "weight") SELECT "grade", "id", "subjectId", "title", "weight" FROM "Assessment";
DROP TABLE "Assessment";
ALTER TABLE "new_Assessment" RENAME TO "Assessment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
