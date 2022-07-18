import { useState, useEffect } from "react";

function App() {
  const letter = [
    { pronun: "альфа", letter: "Α α" },
    { pronun: "бета", letter: "Β β" },
    { pronun: "гамма", letter: "Γ γ" },
    { pronun: "дельта", letter: "Δ δ" },
    { pronun: "эпсилон", letter: "Ε ε" },
    { pronun: "дзета ", letter: "Ζ ζ" },
    { pronun: "эта", letter: "Η η" },
    { pronun: "тета", letter: "Θ θ" },
    { pronun: "йота", letter: "Ι ι" },
    { pronun: "каппа", letter: "Κ κ" },
    { pronun: "лямбда", letter: "Λ λ" },
    { pronun: "мю", letter: "Μ μ" },
    { pronun: "ню", letter: "Ν ν" },
    { pronun: "кси", letter: "Ξ ξ" },
    { pronun: "омикрон", letter: "Ο ο" },
    { pronun: "пи", letter: "Π π" },
    { pronun: "ро", letter: "Ρ ρ" },
    { pronun: "сигма", letter: "Σ σ" },
    { pronun: "тау", letter: "Τ τ" },
    { pronun: "ипсилон", letter: "Υ ϒ" },
    { pronun: "фи", letter: "Φ φ" },
    { pronun: "хи", letter: "Χ χ" },
    { pronun: "пси", letter: "Ψ ψ" },
    { pronun: "омега", letter: "Ω ω" },
  ];

  const [input, setInput] = useState("");
  const [current, setCurrent] = useState(0);

  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const [error, setError] = useState(false);

  const setRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * letter.length);
    setCurrent(randomIndex);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.toLowerCase() === letter[current].pronun) {
      setStreak(streak + 1);
      setMaxStreak(streak + 1 > maxStreak ? streak + 1 : maxStreak);
      setError(false);

      localStorage.setItem("streak", streak + 1);
      localStorage.setItem(
        "maxStreak",
        streak + 1 > maxStreak ? streak + 1 : maxStreak
      );
    } else {
      const h = letter[current].letter;
      const r = letter[current].pronun;
      setError(`Неправильно! Правильный ответ для ${h} это ${r}`);
      setStreak(0);
      localStorage.setItem("streak", 0);
    }

    setInput("");
    setRandomLetter();
  };

  useEffect(() => {
    setRandomLetter();
    setStreak(parseInt(localStorage.getItem("streak")) || 0);
    setMaxStreak(parseInt(localStorage.getItem("maxStreak")) || 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-800 text-white text-center">
      <header className="p-6 mb-8">
        <h1 className="text-2xl font-bold uppercase">Ellenikó alpháveto</h1>
        <div>
          <p>
            {streak}/{maxStreak}
          </p>
        </div>
      </header>
      <div className="text-9xl font-bold mb-8">
        <p>{letter[current].letter}</p>
      </div>
      <div className="mb-8">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleChange}
            value={input}
            className="block w-24 bg-transparent border-b-2 border-b-white mx-auto outline-none text-center text-6xl pb-2"
          />
        </form>
      </div>

      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
