const resources = [
  {
    id: 1,
    title: "JEE Main Full Mock Test - 01",

    date: "March 10, 2026",
    pdfUrl: "/files/test1.pdf",
    startDate: "2026-03-17T07:00:00",
    // --- DETAILS PAGE DATA ---
    category: "Engineering Entrance",
    difficulty: "Moderate",
    duration: 30, // minutess
    totalQuestions: 90,
    totalMarks: 300,
    overview:
      "This mock test covers the full JEE Main syllabus across Physics, Chemistry, and Mathematics. High-yield questions curated by experts.",
    syllabus: [
      {
        subject: "Physics",
        topics: ["Mechanics", "Thermodynamics", "Electromagnetism"],
      },
      { subject: "Chemistry", topics: ["Organic", "Inorganic", "Physical"] },
      {
        subject: "Maths",
        topics: ["Calculus", "Algebra", "Coordinate Geometry"],
      },
    ],
    instructions: [
      "Each correct answer earns +4 marks.",
      "-1 mark for every incorrect answer.",
      "You cannot pause the timer once the test starts.",
    ],

    // --- QUIZ ENGINE DATA ---
    questions: [
      {
        id: "q1",
        subject: "Physics",
        text: "The dimensional formula of Planck’s constant is:",
        options: ["ML²T⁻¹", "ML²T⁻²", "MLT⁻¹", "ML²T"],
        correctAnswer: 0,
        explanation:
          "Using E = hν ⇒ h = E/ν. Since E = ML²T⁻² and ν = T⁻¹, so h = ML²T⁻¹.",
      },
      {
        id: "q2",
        subject: "Physics",
        text: "A body is projected vertically upward. At the highest point:",
        options: [
          "Velocity and acceleration are zero",
          "Velocity is zero but acceleration is not zero",
          "Acceleration is zero but velocity is not zero",
          "Both velocity and acceleration are non-zero",
        ],
        correctAnswer: 1,
        explanation:
          "At the highest point, velocity becomes zero, but acceleration due to gravity (g) still acts downward.",
      },
      {
        id: "q3",
        subject: "Chemistry",
        text: "Which of the following is a strong electrolyte?",
        options: ["CH₃COOH", "NH₄OH", "NaCl", "H₂O"],
        correctAnswer: 2,
        explanation:
          "NaCl completely dissociates in water, making it a strong electrolyte.",
      },
      {
        id: "q4",
        subject: "Chemistry",
        text: "Which quantum number determines the shape of an orbital?",
        options: [
          "Principal quantum number",
          "Azimuthal quantum number",
          "Magnetic quantum number",
          "Spin quantum number",
        ],
        correctAnswer: 1,
        explanation:
          "Azimuthal quantum number (l) determines the shape of orbitals (s, p, d, f).",
      },
      {
        id: "q5",
        subject: "Maths",
        text: "The derivative of sin(x)cos(x) is:",
        options: ["cos²x - sin²x", "sin²x - cos²x", "2sinxcosx", "1"],
        correctAnswer: 0,
        explanation: "Using product rule: d/dx(sin x cos x) = cos²x - sin²x.",
      },
      {
        id: "q6",
        subject: "Maths",
        text: "If a + b = 10 and ab = 21, then a² + b² is:",
        options: ["58", "100", "79", "42"],
        correctAnswer: 0,
        explanation: "a² + b² = (a + b)² - 2ab = 100 - 42 = 58.",
      },
      {
        id: "q7",
        subject: "Physics",
        text: "In a purely resistive AC circuit, the phase difference between voltage and current is:",
        options: ["0", "π/2", "π", "π/4"],
        correctAnswer: 0,
        explanation:
          "In a resistive circuit, voltage and current are in phase.",
      },
      {
        id: "q8",
        subject: "Chemistry",
        text: "Which of the following gases is responsible for the greenhouse effect?",
        options: ["O₂", "N₂", "CO₂", "H₂"],
        correctAnswer: 2,
        explanation:
          "CO₂ traps heat in the atmosphere, contributing to the greenhouse effect.",
      },
    ],
  },
  {
    id: 2,
    title: "JEE Main Full Mock Test - 01",
    date: "March 10, 2026",
    startDate: "2026-03-17T07:00:00",
    pdfUrl: "/files/test1.pdf",
    category: "Engineering Entrance",
    difficulty: "Moderate",
    duration: 180,
    totalQuestions: 90,
    totalMarks: 300,
    overview:
      "Comprehensive mock test covering the entire JEE Main syllabus. Designed to simulate the actual exam environment with high-yield questions.",
    syllabus: [
      {
        subject: "Physics",
        topics: ["Mechanics", "Thermodynamics", "Optics", "Modern Physics"],
      },
      {
        subject: "Chemistry",
        topics: ["Organic", "Inorganic", "Physical", "Environmental"],
      },
      {
        subject: "Maths",
        topics: ["Calculus", "Algebra", "Vectors & 3D", "Trigonometry"],
      },
    ],
    instructions: [
      "Each correct answer earns +4 marks.",
      "-1 mark for every incorrect answer.",
      "0 marks for unattempted questions.",
      "You cannot pause the timer once the test starts.",
    ],

    questions: [
      {
        id: "q1",
        subject: "Physics",
        text: "A particle moves in a circle of radius R. In half a period of revolution, its displacement and distance covered are respectively:",
        options: ["2R, πR", "πR, 2R", "R√2, πR", "Zero, 2πR"],
        correctAnswer: 0,
        explanation:
          "Displacement is the shortest straight-line distance between initial and final points (diameter = 2R). Distance is the actual path length, which is half the circumference (πR).",
      },
      {
        id: "q2",
        subject: "Chemistry",
        text: "Which of the following has the highest electronegativity?",
        options: ["Oxygen", "Fluorine", "Nitrogen", "Chlorine"],
        correctAnswer: 1,
        explanation:
          "Fluorine is the most electronegative element in the periodic table with a value of 4.0 on the Pauling scale due to its small size and high effective nuclear charge.",
      },
      {
        id: "q3",
        subject: "Maths",
        text: "The value of ∫ log(x) dx is:",
        options: [
          "x log(x) + C",
          "x log(x) - x + C",
          "1/x + C",
          "log(x)/x + C",
        ],
        correctAnswer: 1,
        explanation:
          "This is solved using Integration by Parts (ILATE rule). Let u = log(x) and dv = 1 dx. ∫ u dv = uv - ∫ v du results in x log(x) - x + C.",
      },
      {
        id: "q4",
        subject: "Physics",
        text: "If the momentum of a body is increased by 50%, its kinetic energy will increase by:",
        options: ["50%", "100%", "125%", "225%"],
        correctAnswer: 2,
        explanation:
          "Kinetic Energy $K = \frac{P^2}{2m}$. If $P$ becomes $1.5P$, then $K$ becomes $(1.5)^2 K = 2.25K$. The increase is $2.25 - 1 = 1.25$ or 125%.",
      },
      {
        id: "q5",
        subject: "Chemistry",
        text: "The shape of $XeF_4$ molecule according to VSEPR theory is:",
        options: ["Tetrahedral", "Square Planar", "Octahedral", "Pyramidal"],
        correctAnswer: 1,
        explanation:
          "Xenon has 8 valence electrons. In $XeF_4$, there are 4 bond pairs and 2 lone pairs. This leads to an $sp^3d^2$ hybridization with a Square Planar geometry.",
      },
      {
        id: "q6",
        subject: "Maths",
        text: "The number of real roots of the equation $e^x = x$ is:",
        options: ["0", "1", "2", "Infinite"],
        correctAnswer: 0,
        explanation:
          "Graphically, the curve $y = e^x$ always stays above the line $y = x$ for all real values of $x$. Therefore, they never intersect, meaning zero real roots.",
      },
      {
        id: "q7",
        subject: "Physics",
        text: "A logic gate which has an output '1' only when both inputs are '1' is:",
        options: ["OR gate", "AND gate", "NOR gate", "NAND gate"],
        correctAnswer: 1,
        explanation:
          "The AND gate follows the Boolean expression Y = A · B. The output is high only if both A and B are high.",
      },
      {
        id: "q8",
        subject: "Chemistry",
        text: "Which of the following is an intensive property?",
        options: ["Volume", "Enthalpy", "Temperature", "Mass"],
        correctAnswer: 2,
        explanation:
          "Intensive properties do not depend on the amount of matter present. Temperature remains the same regardless of the size of the system.",
      },
    ],
  },
  {
    id: 3,
    title: "NEET Practice Test - Biology",

    date: "March 10, 2026",
    pdfUrl: "/biology_TestSeries.pdf",
    startDate: "2026-03-19T07:00:00",

    // --- DETAILS PAGE DATA ---
    category: "Medical Entrance",
    difficulty: "Easy to Moderate",
    duration: 60, // 1 hour for biology focus
    totalQuestions: 10, // Scalable to 90
    totalMarks: 40,
    overview:
      "This practice set focuses on high-weightage topics from NCERT Biology, including Genetics, Ecology, and Human Physiology. Perfect for quick revision.",
    syllabus: [
      {
        subject: "Botany",
        topics: ["Plant Kingdom", "Photosynthesis", "Genetics"],
      },
      {
        subject: "Zoology",
        topics: ["Human Reproduction", "Animal Kingdom", "Biotechnology"],
      },
    ],
    instructions: [
      "Each correct answer gives +4 marks.",
      "Negative marking of -1 for incorrect answers.",
      "Read every option carefully before selecting.",
    ],

    // --- QUIZ ENGINE DATA ---
    questions: [
      {
        id: "b1",
        subject: "Zoology",
        text: "Which part of the human brain is responsible for maintaining body temperature and hunger?",
        options: [
          "Cerebrum",
          "Cerebellum",
          "Hypothalamus",
          "Medulla Oblongata",
        ],
        correctAnswer: 2,
        explanation:
          "The Hypothalamus acts as the body's thermostat and also controls the master gland (Pituitary).",
      },
      {
        id: "b2",
        subject: "Botany",
        text: "In a DNA molecule, the phosphate group is attached to which carbon of the sugar?",
        options: ["1' carbon", "2' carbon", "3' carbon", "5' carbon"],
        correctAnswer: 3,
        explanation:
          "The phosphate group attaches to the 5' carbon of the pentose sugar to form the backbone of the DNA strand.",
      },
      {
        id: "b3",
        subject: "Zoology",
        text: "The 'Lubb' sound of the heart is produced during the closure of which valves?",
        options: [
          "Semilunar valves",
          "Mitral and Tricuspid valves",
          "Aortic valve only",
          "Pulmonary valve only",
        ],
        correctAnswer: 1,
        explanation:
          "The first heart sound (Lubb) occurs when the AV valves (Mitral and Tricuspid) close at the start of ventricular systole.",
      },
      {
        id: "b4",
        subject: "Botany",
        text: "Which of the following is known as the 'Terror of Bengal'?",
        options: [
          "Parthenium",
          "Water Hyacinth",
          "Lantana",
          "Eichhornia crassipes",
        ],
        correctAnswer: 3, // Both 1 and 3 are technically correct, but Eichhornia is the scientific name
        explanation:
          "Eichhornia crassipes (Water Hyacinth) is an invasive aquatic plant that drains oxygen from water, killing fish.",
      },
      {
        id: "b5",
        subject: "Zoology",
        text: "During aerobic respiration, how many ATP molecules are produced from one molecule of glucose?",
        options: ["2 ATP", "12 ATP", "36 to 38 ATP", "44 ATP"],
        correctAnswer: 2,
        explanation:
          "One glucose molecule yields a net gain of 36 or 38 ATP depending on the shuttle system used.",
      },
    ],
  },
];

export default resources;
