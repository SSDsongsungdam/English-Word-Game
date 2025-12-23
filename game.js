let questions = QUESTIONS; // 👈 외부 문제 연결
let currentIndex = 0;
let score = 0;

/***********************
 * 게임 시작
 ***********************/
function startGame() {
  const name = document.getElementById("username").value.trim();
  if (!name) {
    alert("이름을 입력하세요!");
    return;
  }

  currentIndex = 0;
  score = 0;
  loadQuestion();
}

/***********************
 * 문제 로드
 ***********************/
function loadQuestion() {
  const q = questions[currentIndex];

  document.getElementById("kor").innerText = q.kor;
  document.getElementById("progress").innerText =
    `문제 ${currentIndex + 1} / ${questions.length}`;
  document.getElementById("score").innerText = `점수: ${score}`;

  const cards = document.getElementById("cards");
  const answer = document.getElementById("answer");

  cards.innerHTML = "";
  answer.innerHTML = "";

  const words = q.eng.split(" ").sort(() => Math.random() - 0.5);

  words.forEach(word => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerText = word;
    card.draggable = true;

    card.ondragstart = e =>
      e.dataTransfer.setData("text/plain", word);

    cards.appendChild(card);
  });

  answer.ondragover = e => e.preventDefault();
  answer.ondrop = e => {
    e.preventDefault();
    const word = e.dataTransfer.getData("text/plain");
    answer.innerHTML += `<span class="answer-word">${word} </span>`;
  };
}

/***********************
 * 정답 확인
 ***********************/
function checkAnswer() {
  const userAnswer = Array.from(
    document.getElementById("answer").children
  ).map(el => el.innerText.trim()).join(" ");

  const correct = questions[currentIndex].eng;

  if (userAnswer === correct) {
    alert("정답입니다! 🎉");
    score += questions[currentIndex].score;
    currentIndex++;

    if (currentIndex < questions.length) loadQuestion();
    else alert("🎉 모든 문제 완료!");
  } else {
    alert("틀렸습니다 😢");
  }
}

/***********************
 * 다시 섞기
 ***********************/
function reshuffle() {
  loadQuestion();
}
