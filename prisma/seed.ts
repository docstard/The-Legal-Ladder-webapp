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
        description: "State-specific Judiciary exam preparation",
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
        description: "Common Law Admission Test - Post Graduate",
        isActive: true,
      },
    }));

  const ugcnet =
    (await prisma.examCategory.findFirst({
      where: { name: "UGC NET Law" },
    })) ??
    (await prisma.examCategory.create({
      data: {
        name: "UGC NET Law",
        type: "UGC_NET_LAW",
        description: "UGC NET Law examination",
        isActive: true,
      },
    }));

  // =========================
  // 3. COURSES - JUDICIARY
  // =========================
  const judiciaryComprehensive =
    (await prisma.course.findFirst({
      where: { title: "Judiciary - Full Comprehensive Course" },
    })) ??
    (await prisma.course.create({
      data: {
        title: "Judiciary - Full Comprehensive Course",
        description: "Live classes, 1:1 sessions, PDF notes, case laws list, 1 MT every Sunday, 50 full length MTs",
        type: "PRIMARY",
        price: 25000,
        isFree: false,
      },
    }));

  const judiciarySpecificSubject =
    (await prisma.course.findFirst({
      where: { title: "Judiciary - Specific Subject Course" },
    })) ??
    (await prisma.course.create({
      data: {
        title: "Judiciary - Specific Subject Course",
        description: "Live classes, 5 [1:1 sessions], PDF notes, related MTs [10]",
        type: "SUBJECT_WISE",
        price: 2599,
        isFree: false,
      },
    }));

  const stateSpecificCourse =
    (await prisma.course.findFirst({
      where: { title: "State Specific Judiciary Course" },
    })) ??
    (await prisma.course.create({
      data: {
        title: "State Specific Judiciary Course",
        description: "Live lectures, 1:1 counselling, PDF notes, 15 full length MTs (Objective) + 8 Descriptive MTs + Legal Drafting",
        type: "PRIMARY",
        price: 50000,
        isFree: false,
      },
    }));

  const twoStateCourse =
    (await prisma.course.findFirst({
      where: { title: "2 State Judiciary Course" },
    })) ??
    (await prisma.course.create({
      data: {
        title: "2 State Judiciary Course",
        description: "Live lectures, 1:1 counselling, 15 full length MTs per state (Objective) + 8 Descriptive MTs per state",
        type: "PRIMARY",
        price: 65000,
        isFree: false,
      },
    }));

  const allStatesCourse =
    (await prisma.course.findFirst({
      where: { title: "All Targeted States Judiciary Course" },
    })) ??
    (await prisma.course.create({
      data: {
        title: "All Targeted States Judiciary Course",
        description: "Live lectures, 1:1 counselling, 30 full length MTs per state + Legal Drafting + Legal Essay Writing",
        type: "PRIMARY",
        price: 80000,
        isFree: false,
      },
    }));

  const civilLawsOnly =
    (await prisma.course.findFirst({
      where: { title: "Only Civil Laws" },
    })) ??
    (await prisma.course.create({
      data: {
        title: "Only Civil Laws",
        description: "All civil laws with notes and 8 + 3 MTs + 6 [1:1 sessions]",
        type: "SUBJECT_WISE",
        price: 25599,
        isFree: false,
      },
    }));

  const criminalLawsOnly =
    (await prisma.course.findFirst({
      where: { title: "Only Criminal Laws" },
    })) ??
    (await prisma.course.create({
      data: {
        title: "Only Criminal Laws",
        description: "All criminal laws with notes and 8 + 3 MTs + 6 [1:1 sessions]",
        type: "SUBJECT_WISE",
        price: 25599,
        isFree: false,
      },
    }));

  // =========================
  // 4. COURSES - CLAT PG
  // =========================
  const clatComprehensive =
    (await prisma.course.findFirst({
      where: { title: "CLAT PG - Full Comprehensive Course" },
    })) ??
    (await prisma.course.create({
      data: {
        title: "CLAT PG - Full Comprehensive Course",
        description: "Live classes, 1:1 sessions, PDF notes, 25 full length MTs + Recent landmark judgements",
        type: "PRIMARY",
        price: 25000,
        isFree: false,
      },
    }));

  const landmarkJudgements =
    (await prisma.course.findFirst({
      where: { title: "CLAT PG - Landmark Judgements Only" },
    })) ??
    (await prisma.course.create({
      data: {
        title: "CLAT PG - Landmark Judgements Only",
        description: "PDF notes on all landmark judgements + recent judgements [2018 - 2025]",
        type: "SECONDARY",
        price: 6000,
        isFree: false,
      },
    }));

  // =========================
  // 5. ADD-ON COURSES
  // =========================
  const counselling =
    (await prisma.course.findFirst({
      where: { title: "1:1 Counselling Session" },
    })) ??
    (await prisma.course.create({
      data: {
        title: "1:1 Counselling Session",
        description: "Personalized one-on-one counselling with expert mentors",
        type: "ADD_ON",
        price: 499,
        isFree: false,
      },
    }));

  const studyPlan =
    (await prisma.course.findFirst({
      where: { title: "Study Plan" },
    })) ??
    (await prisma.course.create({
      data: {
        title: "Study Plan",
        description: "Standard 6 month study plan",
        type: "ADD_ON",
        price: 299,
        isFree: false,
      },
    }));

  // =========================
  // 6. MOCK TESTS - JUDICIARY (State-Specific)
  // =========================
  const judiciaryStates = [
    "Rajasthan Judicial Services",
    "Delhi Judicial Services",
    "UP Judicial Services",
    "HP Judicial Services",
    "MP Judicial Services",
    "Uttarakhand Judicial Services",
  ];

  for (const stateName of judiciaryStates) {
    // Full Length Test
    const fullLengthExists = await prisma.mockTest.findFirst({
      where: {
        title: `${stateName} - Full Length Mock Test`,
        examCategoryId: judiciary.id,
      },
    });

    if (!fullLengthExists) {
      await prisma.mockTest.create({
        data: {
          title: `${stateName} - Full Length Mock Test`,
          description: `Complete syllabus mock test for ${stateName}`,
          examCategoryId: judiciary.id,
          type: "FULL_LENGTH",
          duration: 180,
          totalMarks: 200,
          status: "PUBLISHED",
          isFree: false,
        },
      });
    }

    // Sectional Tests
    const sections = ["Civil Laws", "Criminal Laws", "Constitutional Law"];
    for (const section of sections) {
      const sectionalExists = await prisma.mockTest.findFirst({
        where: {
          title: `${stateName} - ${section}`,
          examCategoryId: judiciary.id,
        },
      });

      if (!sectionalExists) {
        await prisma.mockTest.create({
          data: {
            title: `${stateName} - ${section}`,
            description: `Unit-wise mock test for ${section}`,
            examCategoryId: judiciary.id,
            type: "SECTIONAL",
            unit: section,
            duration: 60,
            totalMarks: 50,
            status: "PUBLISHED",
            isFree: false,
          },
        });
      }
    }
  }

  // =========================
  // 7. MOCK TESTS - UGC NET LAW
  // =========================
  // Full Length Tests
  for (let i = 1; i <= 3; i++) {
    const ugcFullExists = await prisma.mockTest.findFirst({
      where: {
        title: `UGC NET Law - Full Length Mock Test ${i}`,
        examCategoryId: ugcnet.id,
      },
    });

    if (!ugcFullExists) {
      await prisma.mockTest.create({
        data: {
          title: `UGC NET Law - Full Length Mock Test ${i}`,
          description: "Complete syllabus mock test for UGC NET Law",
          examCategoryId: ugcnet.id,
          type: "FULL_LENGTH",
          duration: 180,
          totalMarks: 200,
          status: "PUBLISHED",
          isFree: i === 1, // First test is free
        },
      });
    }
  }

  // Sectional Tests (10 Units)
  const ugcNetUnits = [
    "Constitutional and Administrative Law",
    "Jurisprudence",
    "Public International Law and International Humanitarian Law",
    "Law of Crimes",
    "Law of Torts and Consumer Protection",
    "Family Law",
    "Environment and Human Rights Law",
    "Intellectual Property Rights and Information Technology Law",
    "Comparative Public Law and Systems of Governance",
    "Labour and Industrial Law",
  ];

  for (const unit of ugcNetUnits) {
    const ugcSectionalExists = await prisma.mockTest.findFirst({
      where: {
        title: `UGC NET Law - ${unit}`,
        examCategoryId: ugcnet.id,
      },
    });

    if (!ugcSectionalExists) {
      await prisma.mockTest.create({
        data: {
          title: `UGC NET Law - ${unit}`,
          description: `Unit-wise mock test for ${unit}`,
          examCategoryId: ugcnet.id,
          type: "SECTIONAL",
          unit: unit,
          duration: 60,
          totalMarks: 50,
          status: "PUBLISHED",
          isFree: false,
        },
      });
    }
  }

  // =========================
  // 8. MOCK TESTS - CLAT PG
  // =========================
  for (let i = 1; i <= 5; i++) {
    const clatFullExists = await prisma.mockTest.findFirst({
      where: {
        title: `CLAT PG - Full Length Mock Test ${i}`,
        examCategoryId: clatpg.id,
      },
    });

    if (!clatFullExists) {
      await prisma.mockTest.create({
        data: {
          title: `CLAT PG - Full Length Mock Test ${i}`,
          description: "Complete syllabus mock test for CLAT PG",
          examCategoryId: clatpg.id,
          type: "FULL_LENGTH",
          duration: 120,
          totalMarks: 150,
          status: "PUBLISHED",
          isFree: i === 1, // First test is free
        },
      });
    }
  }

  // =========================
  // 9. SAMPLE QUESTIONS
  // =========================
  const allMockTests = await prisma.mockTest.findMany({
    take: 3, // Get first 3 tests to add questions
  });

  for (const mockTest of allMockTests) {
    const existingQuestions = await prisma.question.count({
      where: { mockTestId: mockTest.id },
    });

    if (existingQuestions === 0) {
      // Add 5 sample questions to each test
      const sampleQuestions = [
        {
          text: "Article 14 of the Indian Constitution deals with?",
          options: [
            "Right to Equality",
            "Right to Freedom",
            "Right against Exploitation",
            "Right to Religion",
          ],
          correctOption: 0,
          explanation:
            "Article 14 guarantees equality before law and equal protection of laws.",
          order: 1,
        },
        {
          text: "Who appoints the Chief Justice of India?",
          options: [
            "Prime Minister",
            "President of India",
            "Parliament",
            "Law Minister",
          ],
          correctOption: 1,
          explanation: "The President of India appoints the Chief Justice.",
          order: 2,
        },
        {
          text: "Which Article abolishes untouchability?",
          options: [
            "Article 15",
            "Article 16",
            "Article 17",
            "Article 18",
          ],
          correctOption: 2,
          explanation:
            "Article 17 abolishes untouchability and forbids its practice.",
          order: 3,
        },
        {
          text: "The concept of Judicial Review in India is borrowed from?",
          options: ["UK", "USA", "Canada", "Australia"],
          correctOption: 1,
          explanation:
            "The concept of Judicial Review is borrowed from the USA.",
          order: 4,
        },
        {
          text: "Which part of the Constitution deals with Fundamental Rights?",
          options: ["Part II", "Part III", "Part IV", "Part V"],
          correctOption: 1,
          explanation:
            "Part III of the Indian Constitution deals with Fundamental Rights.",
          order: 5,
        },
      ];

      for (const q of sampleQuestions) {
        await prisma.question.create({
          data: {
            mockTestId: mockTest.id,
            text: q.text,
            options: q.options,
            correctOption: q.correctOption,
            marks: 1,
            negativeMarks: 0.25,
            explanation: q.explanation,
            order: q.order,
          },
        });
      }
    }
  }

  // =========================
  // 10. BLOGS
  // =========================
  const blogs = [
    {
      title: "The Art of Cross-Examination",
      excerpt:
        "Master the techniques that can make or break a case in the courtroom.",
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
      excerpt:
        "An overview of the emerging trends and challenges for corporate lawyers.",
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
      excerpt:
        "A primer on patents, trademarks, and copyrights for aspiring law students.",
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
  // 11. NOTES
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
      courseId: judiciaryComprehensive.id,
    },
    {
      title: "CLAT PG - Landmark Judgements (2018-2025)",
      description: "Compilation of all important landmark cases",
      fileUrl: "/notes/landmark-judgements-2018-2025.pdf",
      fileName: "landmark-judgements-2018-2025.pdf",
      fileSize: 4096000,
      isFree: false,
      courseId: landmarkJudgements.id,
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
  console.log("\n📊 Database Summary:");
  console.log("- 3 Exam Categories (Judiciary, CLAT PG, UGC NET Law)");
  console.log("- 11 Courses (including add-ons)");
  console.log("- 60+ Mock Tests across all categories");
  console.log("- 4 Blog Posts");
  console.log("- 4 Notes/Resources");
  console.log("- Sample questions for mock tests");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
