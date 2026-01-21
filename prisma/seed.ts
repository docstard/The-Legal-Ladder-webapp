const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // =========================
  // 1. ADMIN USER
  // =========================
  let admin = await prisma.user.findFirst({
    where: {
      clerkId: "user_389GnzMqhVCEg3JpYcY2ZcSVJV2",
    },
  });

  if (!admin) {
    admin = await prisma.user.create({
      data: {
        clerkId: "user_389GnzMqhVCEg3JpYcY2ZcSVJV2",
        email: "atticflow.business@gmail.com",
        firstName: "Admin",
        lastName: "User",
        role: "ADMIN",
        state: "Rajasthan",
      },
    });
  }

  // =========================
  // 2. EXAM CATEGORIES
  // =========================
  const judiciary =
    (await prisma.examCategory.findFirst({
      where: { name: "Judiciary" },
    })) ??
    (await prisma.examCategory.create({
      data: {
        name: "Judiciary",
        type: "JUDICIARY",
        description: "Judiciary exam mock tests",
        isActive: true,
      },
    }));

  const clatpg =
    (await prisma.examCategory.findFirst({
      where: { name: "CLAT PG" },
    })) ??
    (await prisma.examCategory.create({
      data: {
        name: "CLAT PG",
        type: "CLAT_PG",
        description: "CLAT PG exam mock tests",
        isActive: true,
      },
    }));

  // =========================
  // 3. COURSES
  // =========================
  const judiciaryCourse =
    (await prisma.course.findFirst({
      where: { title: "Judiciary Comprehensive Course" },
    })) ??
    (await prisma.course.create({
      data: {
        title: "Judiciary Comprehensive Course",
        description: "Complete judiciary preparation with mocks & notes",
        type: "PRIMARY",
        price: 24999,
        isFree: false,
      },
    }));

  const constitutionalCourse =
    (await prisma.course.findFirst({
      where: { title: "Constitutional Law Module" },
    })) ??
    (await prisma.course.create({
      data: {
        title: "Constitutional Law Module",
        description: "Subject-wise deep dive for judiciary",
        type: "SUBJECT_WISE",
        price: 2599,
        isFree: false,
      },
    }));

  // =========================
  // 4. ENROLLMENT
  // =========================
  const existingEnrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: admin.id,
        courseId: judiciaryCourse.id,
      },
    },
  });

  if (!existingEnrollment) {
    await prisma.enrollment.create({
      data: {
        userId: admin.id,
        courseId: judiciaryCourse.id,
      },
    });
  }

  // =========================
  // 5. MOCK TESTS
  // =========================
  const fullLengthTest =
    (await prisma.mockTest.findFirst({
      where: { title: "RJS Full Length Mock Test 1" },
    })) ??
    (await prisma.mockTest.create({
      data: {
        title: "RJS Full Length Mock Test 1",
        description: "Full syllabus mock test for Rajasthan Judiciary",
        examCategoryId: judiciary.id,
        type: "FULL_LENGTH",
        duration: 120,
        totalMarks: 100,
        status: "PUBLISHED",
        isFree: false,
      },
    }));

  const sectionalTest =
    (await prisma.mockTest.findFirst({
      where: { title: "Constitutional Law – Sectional Test" },
    })) ??
    (await prisma.mockTest.create({
      data: {
        title: "Constitutional Law – Sectional Test",
        description: "Unit-wise mock test",
        examCategoryId: judiciary.id,
        type: "SECTIONAL",
        unit: "Constitutional Law",
        duration: 60,
        totalMarks: 50,
        status: "PUBLISHED",
        isFree: true,
      },
    }));

  // =========================
  // 6. COURSE ↔ MOCK TEST MAPPING
  // =========================
  const mapping1 = await prisma.courseMockTest.findFirst({
    where: {
      courseId: judiciaryCourse.id,
      mockTestId: fullLengthTest.id,
    },
  });

  if (!mapping1) {
    await prisma.courseMockTest.create({
      data: {
        courseId: judiciaryCourse.id,
        mockTestId: fullLengthTest.id,
      },
    });
  }

  const mapping2 = await prisma.courseMockTest.findFirst({
    where: {
      courseId: constitutionalCourse.id,
      mockTestId: sectionalTest.id,
    },
  });

  if (!mapping2) {
    await prisma.courseMockTest.create({
      data: {
        courseId: constitutionalCourse.id,
        mockTestId: sectionalTest.id,
      },
    });
  }

  // =========================
  // 7. QUESTIONS
  // =========================
  const question =
    (await prisma.question.findFirst({
      where: {
        mockTestId: fullLengthTest.id,
        order: 1,
      },
    })) ??
    (await prisma.question.create({
      data: {
        mockTestId: fullLengthTest.id,
        text: "Article 14 of the Indian Constitution deals with?",
        options: [
          "Right to Equality",
          "Right to Freedom",
          "Right against Exploitation",
          "Right to Religion",
        ],
        correctOption: 0,
        marks: 1,
        negativeMarks: 0.25,
        explanation: "Article 14 guarantees equality before law.",
        order: 1,
      },
    }));

  // =========================
  // 8. ATTEMPT
  // =========================
  const attempt =
    (await prisma.attempt.findFirst({
      where: {
        userId: admin.id,
        mockTestId: fullLengthTest.id,
      },
    })) ??
    (await prisma.attempt.create({
      data: {
        userId: admin.id,
        mockTestId: fullLengthTest.id,
        status: "SUBMITTED",
        startedAt: new Date(Date.now() - 1000 * 60 * 120),
        submittedAt: new Date(),
      },
    }));

  // =========================
  // 9. ANSWER
  // =========================
  const existingAnswer = await prisma.attemptAnswer.findFirst({
    where: {
      attemptId: attempt.id,
      questionId: question.id,
    },
  });

  if (!existingAnswer) {
    await prisma.attemptAnswer.create({
      data: {
        attemptId: attempt.id,
        questionId: question.id,
        selectedOption: 0,
      },
    });
  }

  // =========================
  // 10. RESULT
  // =========================
  const existingResult = await prisma.result.findUnique({
    where: {
      attemptId: attempt.id,
    },
  });

  if (!existingResult) {
    await prisma.result.create({
      data: {
        attemptId: attempt.id,

        // 🔑 REQUIRED FIELD
        userId: admin.id,

        totalQuestions: 1,
        answered: 1,
        correct: 1,
        incorrect: 0,
        unattempted: 0,
        marksObtained: 1,
        totalMarks: 1,
        percentage: 100,
        rank: 1,
        percentile: 100,
      },
    });
  }
  console.log("✅ Seeding completed successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
