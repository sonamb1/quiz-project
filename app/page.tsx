"use client";

import { useState } from "react";
import Image from "next/image";

type Personality = "bold" | "zen" | "artisan" | "indulgent";

interface Answer {
  icon: string;
  text: string;
  personality: Personality;
}

interface Question {
  question: string;
  answers: Answer[];
}

const personalities = {
  bold: {
    name: "Bold Adventurer",
    coffee: "Double Espresso",
    tagline: "You live for intensity",
    image: "/images/bold-adventurer.jpg",
    color: "#ff6b6b",
  },
  zen: {
    name: "Zen Minimalist",
    coffee: "Black Coffee, Single Origin",
    tagline: "Simple. Clean. Perfect.",
    image: "/images/zen-minimalist.jpg",
    color: "#4ecdc4",
  },
  artisan: {
    name: "Artisan Snob",
    coffee: "Pour-Over, Single Origin",
    tagline: "You know what you like",
    image: "/images/artisan-snob.jpg",
    color: "#a855f7",
  },
  indulgent: {
    name: "Indulgent Treat",
    coffee: "Mocha with Whip",
    tagline: "Coffee is dessert",
    image: "/images/indulgent-treat.jpg",
    color: "#f59e0b",
  },
};

const questions: Question[] = [
  {
    question: "Which Hogwarts house would you be sorted into?",
    answers: [
      { icon: "\u{1F981}", text: "Gryffindor \u2014 brave and bold", personality: "bold" },
      { icon: "\u{1F985}", text: "Ravenclaw \u2014 wise and thoughtful", personality: "zen" },
      { icon: "\u{1F40D}", text: "Slytherin \u2014 ambitious and refined", personality: "artisan" },
      { icon: "\u{1F9A1}", text: "Hufflepuff \u2014 loyal and sweet", personality: "indulgent" },
    ],
  },
  {
    question: "Pick a Netflix binge:",
    answers: [
      { icon: "\u{1F3AC}", text: "Action thriller that keeps you on edge", personality: "bold" },
      { icon: "\u{1F33F}", text: "Quiet documentary about nature", personality: "zen" },
      { icon: "\u{1F3AD}", text: "Critically acclaimed foreign film", personality: "artisan" },
      { icon: "\u{1F497}", text: "Comfort rom-com you\u2019ve seen 10 times", personality: "indulgent" },
    ],
  },
  {
    question: "Which superpower would you choose?",
    answers: [
      { icon: "\u{1F4AA}", text: "Super strength", personality: "bold" },
      { icon: "\u{1F9E0}", text: "Telekinesis \u2014 no wasted movement", personality: "zen" },
      { icon: "\u23F3", text: "Time travel \u2014 experience every era", personality: "artisan" },
      { icon: "\u{1F98B}", text: "Shapeshifting \u2014 why not have fun?", personality: "indulgent" },
    ],
  },
  {
    question: "Pick a fictional best friend:",
    answers: [
      { icon: "\u{1F680}", text: "Han Solo \u2014 lives for the thrill", personality: "bold" },
      { icon: "\u{1F9D9}", text: "Gandalf \u2014 calm, wise, intentional", personality: "zen" },
      { icon: "\u{1F50D}", text: "Sherlock Holmes \u2014 impeccable taste", personality: "artisan" },
      { icon: "\u{1F43B}", text: "Paddington Bear \u2014 pure joy", personality: "indulgent" },
    ],
  },
  {
    question: "What\u2019s your karaoke song?",
    answers: [
      { icon: "\u{1F3A4}", text: "\u201CEye of the Tiger\u201D \u2014 go big or go home", personality: "bold" },
      { icon: "\u{1F3B5}", text: "\u201CImagine\u201D \u2014 keep it simple and meaningful", personality: "zen" },
      { icon: "\u{1F3B8}", text: "\u201CBohemian Rhapsody\u201D \u2014 only the classics", personality: "artisan" },
      { icon: "\u{1F3B6}", text: "\u201CDon\u2019t Stop Me Now\u201D \u2014 life is a party", personality: "indulgent" },
    ],
  },
  {
    question: "Pick a vacation destination:",
    answers: [
      { icon: "\u{1FA82}", text: "Skydiving in New Zealand", personality: "bold" },
      { icon: "\u26F0\uFE0F", text: "Quiet cabin in the mountains", personality: "zen" },
      { icon: "\u{1F377}", text: "Wine tasting in Tuscany", personality: "artisan" },
      { icon: "\u{1F3D6}\uFE0F", text: "All-inclusive resort with unlimited desserts", personality: "indulgent" },
    ],
  },
];

export default function Home() {
  const [screen, setScreen] = useState<"welcome" | "quiz" | "results">("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Personality[]>([]);

  function handleAnswer(personality: Personality) {
    const newAnswers = [...answers, personality];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreen("results");
    }
  }

  function calculateResults() {
    const counts: Record<Personality, number> = { bold: 0, zen: 0, artisan: 0, indulgent: 0 };
    answers.forEach((a) => counts[a]++);

    const total = answers.length;
    const results = (Object.keys(counts) as Personality[])
      .map((key) => ({
        key,
        count: counts[key],
        percentage: total > 0 ? Math.round((counts[key] / total) * 100) : 0,
        ...personalities[key],
      }))
      .sort((a, b) => b.count - a.count);

    return results;
  }

  function restart() {
    setScreen("welcome");
    setCurrentQuestion(0);
    setAnswers([]);
  }

  // Welcome Screen
  if (screen === "welcome") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-3xl bg-white/90 p-10 text-center shadow-xl backdrop-blur-sm">
          <div className="mb-4 text-6xl">{"\u2615"}</div>
          <h1 className="mb-3 text-4xl font-black tracking-tight text-gray-800">
            What{"\u2019"}s Your Coffee Personality?
          </h1>
          <p className="mb-8 text-lg text-gray-500">
            Answer 6 fun questions and discover the perfect Basecamp Coffee for you!
          </p>
          <button
            onClick={() => setScreen("quiz")}
            className="rounded-full bg-gradient-to-r from-pink-500 to-amber-400 px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            Start Quiz {"\u{1F680}"}
          </button>
        </div>
      </div>
    );
  }

  // Quiz Screen
  if (screen === "quiz") {
    const q = questions[currentQuestion];
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg rounded-3xl bg-white/90 p-8 shadow-xl backdrop-blur-sm">
          {/* Progress dots */}
          <div className="mb-6 flex items-center justify-center gap-2">
            {questions.map((_, i) => (
              <div
                key={i}
                className="h-3 w-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    i < currentQuestion
                      ? "#4ecdc4"
                      : i === currentQuestion
                        ? "#ff6b6b"
                        : "#e5e7eb",
                  transform: i === currentQuestion ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>

          {/* Question counter */}
          <p className="mb-2 text-center text-sm font-semibold text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </p>

          {/* Question */}
          <h2 className="mb-6 text-center text-2xl font-extrabold text-gray-800">
            {q.question}
          </h2>

          {/* Answer buttons */}
          <div className="flex flex-col gap-3">
            {q.answers.map((answer, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(answer.personality)}
                className="flex items-center gap-3 rounded-2xl border-2 border-gray-100 bg-white px-5 py-4 text-left font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:border-pink-300 hover:bg-pink-50 hover:shadow-md"
              >
                <span className="text-2xl">{answer.icon}</span>
                <span>{answer.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  const results = calculateResults();
  const topResult = results[0];

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Top Result Card */}
        <div
          className="mb-6 overflow-hidden rounded-3xl bg-white/90 shadow-xl backdrop-blur-sm"
        >
          <div
            className="px-8 py-6 text-center text-white"
            style={{ background: `linear-gradient(135deg, ${topResult.color}, ${topResult.color}dd)` }}
          >
            <p className="mb-1 text-sm font-semibold uppercase tracking-widest opacity-90">
              You are...
            </p>
            <h1 className="mb-1 text-3xl font-black">{topResult.name}</h1>
            <p className="text-lg font-medium opacity-90">{topResult.percentage}% match</p>
          </div>
          <div className="relative h-56 w-full">
            <Image
              src={topResult.image}
              alt={topResult.coffee}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 text-center">
            <h3 className="mb-1 text-xl font-bold text-gray-800">
              Your coffee: {topResult.coffee}
            </h3>
            <p className="text-lg italic text-gray-500">
              {"\u201C"}{topResult.tagline}{"\u201D"}
            </p>
          </div>
        </div>

        {/* All Results */}
        <h2 className="mb-4 text-center text-xl font-bold text-gray-700">
          Your Full Flavor Profile
        </h2>
        <div className="flex flex-col gap-3">
          {results.map((result) => (
            <div
              key={result.key}
              className="flex items-center gap-4 rounded-2xl bg-white/90 p-4 shadow-md backdrop-blur-sm"
            >
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={result.image}
                  alt={result.coffee}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-800">{result.name}</h3>
                  <span
                    className="text-sm font-bold"
                    style={{ color: result.color }}
                  >
                    {result.percentage}%
                  </span>
                </div>
                <p className="text-sm text-gray-500">{result.coffee}</p>
                {/* Percentage bar */}
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${result.percentage}%`,
                      backgroundColor: result.color,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Retake button */}
        <div className="mt-8 text-center">
          <button
            onClick={restart}
            className="rounded-full bg-gradient-to-r from-pink-500 to-amber-400 px-8 py-3 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            Retake Quiz {"\u{1F504}"}
          </button>
        </div>
      </div>
    </div>
  );
}
