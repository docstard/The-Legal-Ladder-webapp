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
  // 7. QUESTIONS (Multiple questions for full test)
  // =========================
  const questionsData = [
    {
      text: "Article 14 of the Indian Constitution deals with?",
      options: ["Right to Equality", "Right to Freedom", "Right against Exploitation", "Right to Religion"],
      correctOption: 0,
      explanation: "Article 14 guarantees equality before law and equal protection of laws within the territory of India.",
      order: 1,
    },
    {
      text: "Who appoints the Chief Justice of India?",
      options: ["Prime Minister", "President of India", "Parliament", "Law Minister"],
      correctOption: 1,
      explanation: "The President of India appoints the Chief Justice of India under Article 124.",
      order: 2,
    },
    {
      text: "Which Article of the Constitution abolishes untouchability?",
      options: ["Article 15", "Article 16", "Article 17", "Article 18"],
      correctOption: 2,
      explanation: "Article 17 abolishes untouchability and forbids its practice in any form.",
      order: 3,
    },
    {
      text: "The concept of 'Judicial Review' in India is borrowed from?",
      options: ["UK", "USA", "Canada", "Australia"],
      correctOption: 1,
      explanation: "The concept of Judicial Review is borrowed from the USA Constitution.",
      order: 4,
    },
    {
      text: "Which part of the Constitution deals with Fundamental Rights?",
      options: ["Part II", "Part III", "Part IV", "Part V"],
      correctOption: 1,
      explanation: "Part III of the Indian Constitution (Articles 12-35) deals with Fundamental Rights.",
      order: 5,
    },
  ];

  for (const qData of questionsData) {
    const existingQ = await prisma.question.findFirst({
      where: { mockTestId: fullLengthTest.id, order: qData.order },
    });
    if (!existingQ) {
      await prisma.question.create({
        data: {
          mockTestId: fullLengthTest.id,
          text: qData.text,
          options: qData.options,
          correctOption: qData.correctOption,
          marks: 1,
          negativeMarks: 0.25,
          explanation: qData.explanation,
          order: qData.order,
        },
      });
    }
  }

  // Questions for sectional test
  const sectionalQuestionsData = [
    {
      text: "The Preamble of the Indian Constitution declares India as?",
      options: ["Sovereign Socialist Democratic Republic", "Sovereign Socialist Secular Democratic Republic", "Federal Democratic Republic", "Socialist Republic"],
      correctOption: 1,
      explanation: "The Preamble declares India as a Sovereign Socialist Secular Democratic Republic.",
      order: 1,
    },
    {
      text: "Which amendment added 'Socialist' and 'Secular' to the Preamble?",
      options: ["42nd Amendment", "44th Amendment", "52nd Amendment", "61st Amendment"],
      correctOption: 0,
      explanation: "The 42nd Amendment Act, 1976 added the words 'Socialist' and 'Secular' to the Preamble.",
      order: 2,
    },
  ];

  for (const qData of sectionalQuestionsData) {
    const existingQ = await prisma.question.findFirst({
      where: { mockTestId: sectionalTest.id, order: qData.order },
    });
    if (!existingQ) {
      await prisma.question.create({
        data: {
          mockTestId: sectionalTest.id,
          text: qData.text,
          options: qData.options,
          correctOption: qData.correctOption,
          marks: 1,
          negativeMarks: 0.25,
          explanation: qData.explanation,
          order: qData.order,
        },
      });
    }
  }

  const question = await prisma.question.findFirst({
    where: { mockTestId: fullLengthTest.id, order: 1 },
  });

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
  
  // =========================
  // 11. BLOGS
  // =========================
  const blogs = [
    {
      title: "The Art of Cross-Examination",
      excerpt: "Master the techniques that can make or break a case in the courtroom.",
      content: `<h2>Introduction to Cross-Examination</h2>
        <p>Cross-examination is one of the most powerful tools in a lawyer's arsenal. It can reveal the truth, expose lies, and completely change the direction of a trial.</p>
        <h3>Key Techniques</h3>
        <ol>
          <li><strong>Prepare thoroughly:</strong> Know every detail of the case</li>
          <li><strong>Control the witness:</strong> Ask leading questions</li>
          <li><strong>Listen carefully:</strong> Adapt to unexpected answers</li>
          <li><strong>Stay composed:</strong> Never show frustration</li>
        </ol>
        <p>Mastering these techniques takes years of practice and dedication.</p>`,
      isFree: true,
      status: "PUBLISHED",
    },
    {
      title: "Navigating Corporate Law in 2024",
      excerpt: "An overview of the emerging trends and challenges for corporate lawyers.",
      content: `<h2>Corporate Law Landscape</h2>
        <p>The corporate legal landscape is evolving rapidly with new regulations, technology, and global challenges.</p>
        <h3>Key Trends in 2024</h3>
        <ul>
          <li>ESG compliance and sustainability</li>
          <li>Data privacy regulations</li>
          <li>Cross-border M&A complexities</li>
          <li>AI in contract management</li>
        </ul>`,
      isFree: true,
      status: "PUBLISHED",
    },
    {
      title: "Understanding Intellectual Property",
      excerpt: "A primer on patents, trademarks, and copyrights for aspiring law students.",
      content: `<h2>Intellectual Property Basics</h2>
        <p>Intellectual Property (IP) law protects creations of the mind, including inventions, literary works, designs, symbols, and names.</p>
        <h3>Types of IP</h3>
        <ul>
          <li><strong>Patents:</strong> Protect inventions and innovations</li>
          <li><strong>Trademarks:</strong> Protect brand names and logos</li>
          <li><strong>Copyrights:</strong> Protect original creative works</li>
          <li><strong>Trade Secrets:</strong> Protect confidential business information</li>
        </ul>`,
      isFree: true,
      status: "PUBLISHED",
    },
  ];

  for (const blogData of blogs) {
    const existingBlog = await prisma.blog.findFirst({
      where: { title: blogData.title },
    });
    if (!existingBlog) {
      await prisma.blog.create({ data: blogData });
    }
  }

  // =========================
  // 12. NOTES
  // =========================
  const notes = [
    {
      title: "Constitutional Law - Comprehensive Notes",
      description: "Detailed notes covering all major articles and amendments",
      fileUrl: "/notes/constitutional-law.pdf",
      fileName: "constitutional-law.pdf",
      fileSize: 2048000,
      isFree: true,
    },
    {
      title: "Contract Law Case Studies",
      description: "Important landmark judgments in contract law",
      fileUrl: "/notes/contract-law-cases.pdf",
      fileName: "contract-law-cases.pdf",
      fileSize: 1536000,
      isFree: true,
    },
    {
      title: "Criminal Procedure Code Notes",
      description: "Complete CrPC notes with important sections",
      fileUrl: "/notes/crpc-notes.pdf",
      fileName: "crpc-notes.pdf",
      fileSize: 3072000,
      isFree: false,
      courseId: judiciaryCourse.id,
    },
  ];

  for (const noteData of notes) {
    const existingNote = await prisma.note.findFirst({
      where: { title: noteData.title },
    });
    if (!existingNote) {
      await prisma.note.create({ data: noteData });
    }
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
