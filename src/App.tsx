import { useState } from "react";

interface Question {
  q: string;
  options: string[];
  answer: number;
  fact: string;
}

type Screen = "intro" | "question" | "final";

interface CopyScoreProps {
  score: number;
  total: number;
  msg: string;
}

const questions: Question[] = [
  {
    q: "What colour is traditionally associated with St. Patrick himself — NOT the colour most people wear?",
    options: ["Green", "Blue", "Gold", "White"],
    answer: 1,
    fact: "St. Patrick's Blue is the historically associated colour. Green became popular later due to Ireland's nickname 'The Emerald Isle.'"
  },
  {
    q: "St. Patrick is the patron saint of Ireland — but where was he actually born?",
    options: ["France", "Ireland", "Britain", "Italy"],
    answer: 2,
    fact: "St. Patrick was born in Roman Britain (likely modern-day Wales or Scotland) around 385 AD."
  },
  {
    q: "What river in the United States famously gets dyed green every St. Patrick's Day?",
    options: ["Mississippi River", "Hudson River", "Chicago River", "Ohio River"],
    answer: 2,
    fact: "The Chicago River has been dyed green since 1962 — it takes about 40 pounds of dye!"
  },
  {
    q: "According to legend, what did St. Patrick use to explain the Holy Trinity to the Irish?",
    options: ["A four-leaf clover", "A shamrock", "A harp", "A Celtic cross"],
    answer: 1,
    fact: "St. Patrick used the three-leafed shamrock to explain the concept of the Father, Son, and Holy Spirit."
  },
  {
    q: "Ottawa is the capital of Canada — but which city did it beat out to earn that title in 1857?",
    options: ["Toronto", "Montreal", "Kingston", "All of the above were considered"],
    answer: 3,
    fact: "Queen Victoria chose Ottawa from a list that included Toronto, Montreal, Kingston, and Quebec City. Ottawa was seen as a compromise."
  },
  {
    q: "What is the name of Ottawa's famous winter festival celebrating the cold season?",
    options: ["Snowflake Kingdom", "Winterlude", "FrostFest", "The Ottawa Winter Games"],
    answer: 1,
    fact: "Winterlude has been held annually since 1979, featuring the Rideau Canal Skateway — the world's largest naturally frozen skating rink!"
  },
  {
    q: "The vernal (spring) equinox in March means daytime and nighttime are approximately equal. What does 'equinox' mean in Latin?",
    options: ["Equal sun", "Equal night", "Balanced sky", "Half moon"],
    answer: 1,
    fact: "'Equinox' comes from the Latin 'aequus' (equal) and 'nox' (night) — equal night!"
  },
  {
    q: "Which of these is NOT one of the 'luck' symbols traditionally associated with St. Patrick's Day?",
    options: ["Horseshoe", "Leprechaun", "Four-leaf clover", "Harp"],
    answer: 3,
    fact: "The harp is the national symbol of Ireland, but it's not a traditional luck symbol. Horseshoes, leprechauns, and four-leaf clovers are all luck-associated."
  },
  {
    q: "What is the name of the famous waterway that runs through Ottawa and was declared a UNESCO World Heritage Site?",
    options: ["Ottawa River", "Rideau Canal", "Gatineau River", "St. Lawrence Seaway"],
    answer: 1,
    fact: "The Rideau Canal, built between 1826–1832, was designated a UNESCO World Heritage Site in 2007."
  },
  {
    q: "In the Northern Hemisphere, which is the first official month of spring?",
    options: ["February", "March", "April", "May"],
    answer: 1,
    fact: "March 20 or 21 marks the spring equinox in the Northern Hemisphere, making March the first month of spring."
  },
  {
    q: "How many leaves does a LUCKY clover have?",
    options: ["3", "4", "5", "6"],
    answer: 1,
    fact: "Four-leaf clovers are rare mutations — you have about a 1 in 10,000 chance of finding one!"
  },
  {
    q: "What is the name of the Irish mythological creature said to have a hidden pot of gold?",
    options: ["Banshee", "Selkie", "Leprechaun", "Pooka"],
    answer: 2,
    fact: "Leprechauns are said to hide their gold at the end of a rainbow. If you catch one, he must grant you three wishes!"
  },
  {
    q: "Adobe's Ottawa office is located on Preston Street, in which vibrant neighbourhood?",
    options: ["The Glebe", "Centretown", "Little Italy", "ByWard Market"],
    answer: 2,
    fact: "Adobe Ottawa is on Preston St. in Little Italy, one of Ottawa's most beloved neighbourhoods known for its Italian heritage, great restaurants, and lively community feel."
  },
  {
    q: "What is the tallest structure in Ottawa?",
    options: ["Parliament's Peace Tower", "CN Tower", "Gatineau Tower", "Ottawa City Hall"],
    answer: 0,
    fact: "The Peace Tower on Parliament Hill stands 92 metres tall and is the most recognizable landmark in Ottawa."
  },
  {
    q: "St. Patrick's Day is celebrated on March 17th — which year did it first become a public holiday in Ireland?",
    options: ["1798", "1903", "1950", "1916"],
    answer: 1,
    fact: "St. Patrick's Day became an official public holiday in Ireland in 1903, thanks to the Bank Holiday (Ireland) Act."
  }
];

const TOTAL = questions.length;

function CopyScore({ score, total, msg }: CopyScoreProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const blocks: string[] = Array.from({ length: total }, (_, i) => i < score ? "🟩" : "⬛");
  const rows: string[] = [];
  for (let i = 0; i < blocks.length; i += 5) rows.push(blocks.slice(i, i + 5).join(""));
  const slackText = `☘️ *Adobe Ottawa St. Paddy's Trivia* ☘️\n\n${rows.join("\n")}\n\n*${score}/${total}* — ${msg}`;

  const handleCopy = (): void => {
    navigator.clipboard.writeText(slackText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div style={{ background: "#f0faf0", border: "1px solid #a5d6a7", borderRadius: "14px", padding: "16px", marginBottom: "14px", textAlign: "center" }}>
      <div style={{ fontFamily: "monospace", fontSize: "22px", letterSpacing: "2px", lineHeight: 1.6, marginBottom: "10px" }}>
        {rows.map((r, i) => <div key={i}>{r}</div>)}
      </div>
      <div style={{ fontSize: "13px", color: "#555", marginBottom: "12px" }}>Share your score on Slack!</div>
      <button
        onClick={handleCopy}
        style={{
          background: copied ? "#2d7a2d" : "#4a154b",
          color: "#fff", border: "none", borderRadius: "10px",
          padding: "10px 22px", fontSize: "14px", fontWeight: "700",
          cursor: "pointer", transition: "background 0.3s"
        }}
      >
        {copied ? "✅ Copied!" : "📋 Copy for Slack"}
      </button>
    </div>
  );
}

interface FinalResult {
  emoji: string;
  msg: string;
}

function getFinalResult(score: number, total: number): FinalResult {
  const pct = score / total;
  if (pct === 1)   return { emoji: "🏆", msg: "Perfect score! You're basically Irish!" };
  if (pct >= 0.8)  return { emoji: "🍀", msg: "Brilliant! The luck of the Irish is with you!" };
  if (pct >= 0.6)  return { emoji: "🎉", msg: "Not bad at all! You'd survive in a Dublin pub quiz." };
  if (pct >= 0.4)  return { emoji: "🌱", msg: "Room to grow — like the spring shamrocks!" };
  return             { emoji: "🦌", msg: "Maybe stick to drinking the green beer next time 😄" };
}

function getOptionStyle(i: number, revealed: boolean, selected: number | null, answer: number): React.CSSProperties {
  let bg = "#f0faf0", border = "2px solid #c8e6c9", color = "#1a4a1a";
  if (revealed) {
    if (i === answer)        { bg = "#2d7a2d"; border = "2px solid #2d7a2d"; color = "#fff"; }
    else if (i === selected) { bg = "#c62828"; border = "2px solid #c62828"; color = "#fff"; }
    else                     { bg = "#f5f5f5"; border = "2px solid #ddd";    color = "#999"; }
  }
  return {
    display: "block", width: "100%", padding: "14px 18px", marginBottom: "10px",
    borderRadius: "12px", background: bg, border, color,
    fontSize: "15px", fontWeight: "600", textAlign: "left",
    cursor: revealed ? "default" : "pointer", transition: "all 0.2s", outline: "none"
  };
}

export default function TriviaGame() {
  const [screen, setScreen]     = useState<Screen>("intro");
  const [current, setCurrent]   = useState<number>(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore]       = useState<number>(0);
  const [revealed, setRevealed] = useState<boolean>(false);

  const q = questions[current];

  const handleSelect = (i: number): void => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    if (i === q.answer) setScore(s => s + 1);
  };

  const handleNext = (): void => {
    if (current + 1 >= TOTAL) {
      setScreen("final");
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const restart = (): void => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setRevealed(false);
    setScreen("intro");
  };

  const wrap:    React.CSSProperties = { minHeight: "100vh", background: "linear-gradient(135deg, #1a4a1a 0%, #2d7a2d 50%, #1a4a1a 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", padding: "20px" };
  const card:    React.CSSProperties = { background: "rgba(255,255,255,0.96)", borderRadius: "20px", padding: "36px", maxWidth: "600px", width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.4)", position: "relative", overflow: "hidden" };
  const title:   React.CSSProperties = { textAlign: "center", fontSize: "28px", fontWeight: "900", color: "#1a4a1a", marginBottom: "4px", lineHeight: 1.2 };
  const nextBtn: React.CSSProperties = { display: "block", width: "100%", padding: "15px", marginTop: "18px", borderRadius: "12px", background: "linear-gradient(135deg, #2d7a2d, #4caf50)", color: "#fff", fontSize: "16px", fontWeight: "800", border: "none", cursor: "pointer", letterSpacing: "1px" };
  const startBtn:React.CSSProperties = { display: "block", width: "100%", padding: "16px", marginTop: "10px", borderRadius: "12px", background: "linear-gradient(135deg, #2d7a2d, #4caf50)", color: "#fff", fontSize: "18px", fontWeight: "800", border: "none", cursor: "pointer", letterSpacing: "1px" };

  if (screen === "intro") return (
    <div style={wrap}>
      <div style={card}>
        <div style={{ textAlign: "center", fontSize: "52px", marginBottom: "10px" }}>☘️🎉🍺</div>
        <div style={title}>St. Paddy's Day Trivia</div>
        <div style={{ textAlign: "center", color: "#555", fontSize: "14px", marginBottom: "28px" }}>Adobe Ottawa Edition — {TOTAL} Questions</div>
        <p style={{ color: "#444", fontSize: "15px", lineHeight: 1.6, marginBottom: "8px" }}>
          Test your knowledge on <strong>St. Patrick's Day</strong>, <strong>spring & March</strong>, and <strong>Ottawa</strong>! Good luck — you might need it. 🍀
        </p>
        <button style={startBtn} onClick={() => setScreen("question")}>Let's Play! 🎮</button>
      </div>
    </div>
  );

  if (screen === "final") {
    const { emoji, msg } = getFinalResult(score, TOTAL);
    return (
      <div style={wrap}>
        <div style={card}>
          <div style={{ textAlign: "center", fontSize: "64px", marginBottom: "10px" }}>{emoji}</div>
          <div style={title}>Game Over!</div>
          <div style={{ textAlign: "center", fontSize: "42px", fontWeight: "900", color: "#2d7a2d", margin: "10px 0" }}>{score} / {TOTAL}</div>
          <p style={{ textAlign: "center", fontSize: "16px", color: "#444", marginBottom: "24px" }}>{msg}</p>
          <CopyScore score={score} total={TOTAL} msg={msg} />
          <button style={startBtn} onClick={restart}>Play Again 🔄</button>
        </div>
      </div>
    );
  }

  return (
    <div style={wrap}>
      <div style={card}>
        <div style={{ position: "absolute", top: "18px", right: "20px", background: "#2d7a2d", color: "#fff", borderRadius: "20px", padding: "6px 14px", fontSize: "13px", fontWeight: "700" }}>
          ⭐ {score}/{current}
        </div>
        <div style={{ textAlign: "center", marginBottom: "8px", fontSize: "13px", fontWeight: "700", letterSpacing: "2px", color: "#2d7a2d", textTransform: "uppercase" }}>
          ☘️ Adobe Ottawa St. Paddy's Trivia ☘️
        </div>
        <div style={{ background: "#e8f5e9", borderRadius: "20px", height: "8px", marginBottom: "22px", overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: "20px", background: "linear-gradient(90deg, #2d7a2d, #4caf50)", width: `${(current / TOTAL) * 100}%`, transition: "width 0.4s ease" }} />
        </div>
        <div style={{ fontSize: "12px", color: "#888", marginBottom: "12px" }}>Question {current + 1} of {TOTAL}</div>
        <div style={{ fontSize: "18px", fontWeight: "700", color: "#1a4a1a", marginBottom: "20px", lineHeight: 1.5 }}>{q.q}</div>
        {q.options.map((opt, i) => (
          <button key={i} style={getOptionStyle(i, revealed, selected, q.answer)} onClick={() => handleSelect(i)}>
            {["🅐", "🅑", "🅒", "🅓"][i]} &nbsp;{opt}
          </button>
        ))}
        {revealed && (
          <div style={{ background: "#e8f5e9", border: "1px solid #a5d6a7", borderRadius: "10px", padding: "12px 16px", fontSize: "13px", color: "#1b5e20", marginTop: "14px", lineHeight: 1.5 }}>
            💡 <strong>Fun Fact:</strong> {q.fact}
          </div>
        )}
        {revealed && (
          <button style={nextBtn} onClick={handleNext}>
            {current + 1 >= TOTAL ? "See Final Score 🏆" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}
