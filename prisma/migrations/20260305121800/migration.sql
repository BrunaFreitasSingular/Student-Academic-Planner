-- CreateTable
CREATE TABLE "Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "id_student" INTEGER NOT NULL,
    "totalAssessments" INTEGER NOT NULL,
    CONSTRAINT "Subject_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
CREATE TABLE "Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    CONSTRAINT "Student_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "requiredCredits" INTEGER NOT NULL,
    "electiveCredits" INTEGER NOT NULL,
    "complementaryCredits" INTEGER NOT NULL
);
