const messages = document.getElementById("messages");
const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");

const answers = [
  { keys: ["beginner", "workout", "routine", "plan"], reply: "A simple beginner routine: 5–10 minutes easy walking, then 2 sets each of bodyweight squats, wall push-ups and light rows. Finish with gentle cool-down. Start with 2–3 non-consecutive days per week and use comfortable effort. If you have an injury or medical concern, get individual guidance first." },
  { keys: ["warm", "warmup", "warm-up", "stretch"], reply: "Before a workout, try 5–10 minutes of easy walking or cycling, followed by gentle dynamic movements such as arm circles and bodyweight squats. Avoid forcing deep stretches when your muscles are cold." },
  { keys: ["protein", "food", "diet"], reply: "Everyday protein foods include eggs, milk, curd, paneer, dal, chickpeas, beans, fish and chicken. Include a balanced mix of protein, vegetables, fruit and whole grains. Your needs depend on body size, activity and health." },
  { keys: ["weight", "fat", "lose"], reply: "For gradual weight management, combine regular activity, strength training, balanced portions, enough sleep and consistency. Avoid crash diets. A qualified dietitian can help set a safe personal target." },
  { keys: ["rest", "recovery", "sore", "pain"], reply: "Recovery matters. Allow rest between hard sessions, sleep well and increase training gradually. Mild muscle soreness can happen; sharp, worsening or persistent pain is a reason to stop and seek professional advice." },
  { keys: ["tamil", "vanakkam", "வணக்கம்", "தமிழ்"], reply: "வணக்கம்! ஆரம்பநிலை உடற்பயிற்சிக்கு வாரத்தில் 2–3 நாட்கள் எளிய பயிற்சிகளுடன் தொடங்குங்கள். ஒவ்வொரு முறையும் warm-up செய்யவும், சரியான ஓய்வு எடுக்கவும். உடல்நலப் பிரச்சினை இருந்தால் மருத்துவர் அல்லது தகுதியான பயிற்சியாளரிடம் ஆலோசனை பெறுங்கள்." }
];

function addMessage(text, who) {
  const row = document.createElement("div");
  row.className = "message " + who;
  const avatar = document.createElement("span");
  avatar.className = "avatar";
  avatar.textContent = who === "bot" ? "F" : "You";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  const p = document.createElement("p");
  p.textContent = text;
  bubble.appendChild(p);
  row.append(avatar, bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

function getReply(question) {
  const q = question.toLowerCase();
  const match = answers.find(item => item.keys.some(key => q.includes(key)));
  return match ? match.reply : "I can help with beginner workouts, warm-ups, protein foods, weight-management basics and recovery. Try one of the suggested questions above. This demo uses sample replies; it is not connected to a live AI model yet.";
}

function send(text) {
  const question = text.trim();
  if (!question) return;
  addMessage(question, "user");
  input.value = "";
  window.setTimeout(() => addMessage(getReply(question), "bot"), 350);
}

form.addEventListener("submit", event => {
  event.preventDefault();
  send(input.value);
});

document.querySelectorAll("[data-prompt]").forEach(button => {
  button.addEventListener("click", () => send(button.dataset.prompt));
});

document.getElementById("clearBtn").addEventListener("click", () => {
  messages.replaceChildren();
  addMessage("Chat cleared. Vanakkam! Ask me a fitness question to get started.", "bot");
});