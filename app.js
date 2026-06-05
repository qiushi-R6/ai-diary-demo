const screens = Array.from(document.querySelectorAll(".screen"));
const navButtons = Array.from(document.querySelectorAll(".bottom-nav button"));
const entryScreen = document.querySelector("#entry-screen");
const entryAction = document.querySelector("#entry-action");
const accountScreen = document.querySelector("#account-screen");
const accountForm = document.querySelector("#account-form");
const accountTitle = document.querySelector("#account-title");
const accountSubmit = document.querySelector("#account-submit");
const accountRegister = document.querySelector("#account-register");
const accountForgot = document.querySelector("#account-forgot");
const accountError = document.querySelector("#account-error");
const accountUsername = document.querySelector("#account-username");
const accountPassword = document.querySelector("#account-password");
const accountAgreement = document.querySelector("#account-agreement");
const summaryText = document.querySelector("#ai-summary-text");
const treeStage = document.querySelector("#tree-stage");
const weekTitle = document.querySelector("#week-title");
const calendarRow = document.querySelector("#calendar-row");
const yearSelect = document.querySelector("#year-select");
const monthSelect = document.querySelector("#month-select");
const daySelect = document.querySelector("#day-select");
const soulQuestion = document.querySelector("#soul-question");
const quickRecordInput = document.querySelector("#quick-record-input");
const quickRecordStatus = document.querySelector("#quick-record-status");
const quickTimer = document.querySelector("#quick-timer");
const entryList = document.querySelector(".entry-list");
const dailyPraise = document.querySelector("#daily-praise");
const emotionGuide = document.querySelector("#emotion-guide");
const editableSelector = [
  ".page-head p",
  ".page-head h1",
  ".summary-meta span",
  ".soul-widget span",
  ".soul-widget p",
  ".capture-strip strong",
  ".capture-strip p",
  ".ai-summary p",
  ".instant-head p",
  ".instant-head h2",
  ".instant-head > span",
  ".instant-card > span",
  ".instant-card p",
  ".panel-title p",
  ".panel-title h2",
  ".panel-title > span",
  ".topic-card strong",
  ".topic-card p",
  ".memory-search span",
  ".privacy-note",
  ".entry-card p",
  ".entry-card time",
  ".entry-card span",
  ".tree-hero p",
  ".tree-hero h2",
  ".tree-hero span",
  ".plan-cards span",
  ".plan-cards strong",
  ".plan-cards p",
  ".growth-list strong",
  ".growth-list p",
  ".day-board > p",
  ".day-board h2",
  ".block strong",
  ".block em",
  ".block p",
  ".block b",
  ".note p",
  ".note span",
  ".memory-page header h1",
  ".memory-page header p",
  ".receipt p",
  ".receipt strong",
  ".receipt em",
  ".paper-note",
  ".emotion-score span",
  ".emotion-score b",
  ".emotion-score em",
  ".org-card strong",
  ".org-card p",
  ".writing-paper p",
  ".writing-paper footer",
  ".comment-box h2",
  ".comment strong",
  ".comment span",
  ".comment p",
  ".passive-data p",
].join(",");

const summaryVariants = [
  "这周你反复写到“想把事情做好”和“害怕被突然打断”。这些句子像潮水退去后留下的纹路，提醒你：真正需要修复的，也许不是效率，而是重新拥有自己的节奏。",
  "散落的记录里浮现出三条线索：能量常在临时沟通后下降，期待来自和朋友见面，恢复感来自热食、夜风和短暂独处。你并没有停在原地，只是在学习辨认什么能让自己回到身体里。",
  "这不是结论，而是一面温柔的镜子。它照见你最近的疲惫，也照见你仍然愿意把小小的感受留下来。一个人愿意记录，就说明内心还有想被理解的部分。",
  "今天适合把问题放轻一点。许多答案不会在追赶中出现，它们常常在你愿意慢下来、愿意听见自己呼吸的时候，悄悄露出轮廓。"
];

const treeColors = {
  green: "#8dae91",
  purple: "#8f7ab8",
  blue: "#719aad",
  rose: "#bd7180",
};

const soulQuestions = [
  "你今天有什么不开心的事吗？",
  "今天最让你惊喜的一件事是什么？",
  "此刻身体最想告诉你什么？",
  "今天有没有一个瞬间，让你觉得自己被理解了？",
  "如果只记录一句话，你想把今天留成什么样子？",
];

const praiseVariants = [
  "你没有把疲惫藏起来，而是愿意诚实地写下它。这不是脆弱，是你开始照顾自己的证据。",
  "你今天已经做了一件很重要的事：把混乱从脑子里拿出来，放到了可以被看见的地方。",
  "你并不是没有前进。你只是先学会停下来，确认自己真正需要什么。",
  "能在压力里仍然记录一点真实感受，说明你还在认真地和生活保持连接。",
];

const emotionGuides = {
  休息: "如果它在提醒你休息，今晚只完成一件最小的事：喝水、洗漱、提前放下屏幕。恢复不是偷懒，是给明天留力气。",
  边界: "如果它在提醒你边界，先写下一句可以说出口的话：这件事我需要晚一点回复。清楚表达，比勉强承受更温柔。",
  理解: "如果它在提醒你需要被理解，试着把感受说具体：我不是生气，我是有点委屈。情绪被命名后，才有机会被安放。",
};

let summaryIndex = 0;
let accountMode = "login";
let questionIndex = 0;
let praiseIndex = 0;
let selectedRecordType = "文字";
let selectedMoodTag = "";
let timerId = null;
let timerLeft = 10;
const minSelectableDate = new Date(2024, 0, 1);
const maxSelectableDate = cloneDate(new Date());
let selectedDate = cloneDate(maxSelectableDate);
let visibleWeekStart = getWeekStart(selectedDate);

function cloneDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, amount) {
  const next = cloneDate(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function isBefore(first, second) {
  return cloneDate(first).getTime() < cloneDate(second).getTime();
}

function isAfter(first, second) {
  return cloneDate(first).getTime() > cloneDate(second).getTime();
}

function clampDate(date) {
  if (isBefore(date, minSelectableDate)) return cloneDate(minSelectableDate);
  if (isAfter(date, maxSelectableDate)) return cloneDate(maxSelectableDate);
  return cloneDate(date);
}

function getDaysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function getWeekStart(date) {
  const start = cloneDate(date);
  start.setDate(start.getDate() - start.getDay());
  return start;
}

function getWeekNumber(date) {
  const yearStart = new Date(date.getFullYear(), 0, 1);
  const firstWeekStart = getWeekStart(yearStart);
  const diff = getWeekStart(date) - firstWeekStart;
  return Math.floor(diff / 604800000) + 1;
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isSameDate(first, second) {
  return formatDateKey(first) === formatDateKey(second);
}

function resetOptions(select, values, selectedValue) {
  if (!select) return;
  select.innerHTML = "";
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = String(value);
    option.textContent = String(value);
    option.selected = value === selectedValue;
    select.append(option);
  });
}

function renderDateSelectors() {
  if (!yearSelect || !monthSelect || !daySelect) return;

  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth() + 1;
  const selectedDay = selectedDate.getDate();
  const years = [];

  for (let year = minSelectableDate.getFullYear(); year <= maxSelectableDate.getFullYear(); year += 1) {
    years.push(year);
  }

  const firstMonth = selectedYear === minSelectableDate.getFullYear() ? minSelectableDate.getMonth() + 1 : 1;
  const lastMonth = selectedYear === maxSelectableDate.getFullYear() ? maxSelectableDate.getMonth() + 1 : 12;
  const months = [];
  for (let month = firstMonth; month <= lastMonth; month += 1) {
    months.push(month);
  }

  const monthIndex = selectedMonth - 1;
  const firstDay =
    selectedYear === minSelectableDate.getFullYear() && monthIndex === minSelectableDate.getMonth()
      ? minSelectableDate.getDate()
      : 1;
  const lastDay =
    selectedYear === maxSelectableDate.getFullYear() && monthIndex === maxSelectableDate.getMonth()
      ? maxSelectableDate.getDate()
      : getDaysInMonth(selectedYear, monthIndex);
  const days = [];
  for (let day = firstDay; day <= lastDay; day += 1) {
    days.push(day);
  }

  resetOptions(yearSelect, years, selectedYear);
  resetOptions(monthSelect, months, selectedMonth);
  resetOptions(daySelect, days, selectedDay);
}

function updateSelectedDate(date) {
  selectedDate = clampDate(date);
  visibleWeekStart = getWeekStart(selectedDate);
  renderCalendar();
}

function renderCalendar() {
  if (!calendarRow || !weekTitle) return;

  renderDateSelectors();
  const weekNumber = getWeekNumber(selectedDate);
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  const loggedDays = new Set([1, 2, 4]);
  weekTitle.textContent = `${selectedDate.getFullYear()}年第${weekNumber}周`;
  calendarRow.innerHTML = "";

  weekdays.forEach((weekday, index) => {
    const date = addDays(visibleWeekStart, index);
    const button = document.createElement("button");
    const label = document.createElement("span");
    const day = document.createElement("em");

    button.type = "button";
    button.dataset.date = formatDateKey(date);
    button.setAttribute("aria-label", `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`);
    button.classList.toggle("selected", isSameDate(date, selectedDate));
    button.classList.toggle("has-log", loggedDays.has(date.getDay()));
    button.classList.toggle("other-month", date.getMonth() !== selectedDate.getMonth());
    button.disabled = isBefore(date, minSelectableDate) || isAfter(date, maxSelectableDate);

    label.textContent = weekday;
    day.textContent = date.getDate();
    button.append(label, day);
    calendarRow.append(button);
  });
}

function setupEditableText() {
  document.querySelectorAll(editableSelector).forEach((element, index) => {
    const key = element.dataset.editKey || `ai-diary-bp-edit-${index}`;
    const saved = localStorage.getItem(key);
    element.dataset.editKey = key;
    element.classList.add("editable-text");
    element.setAttribute("contenteditable", "true");
    element.setAttribute("spellcheck", "false");
    element.setAttribute("role", "textbox");
    element.setAttribute("aria-label", "可编辑文字");
    if (saved !== null) {
      element.innerHTML = saved;
    }
  });
}

function showScreen(name) {
  const id = `screen-${name}`;
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === id);
  });
  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.go === name);
  });
}

function refreshSoulQuestion() {
  questionIndex = (questionIndex + 1) % soulQuestions.length;
  if (soulQuestion) {
    soulQuestion.textContent = soulQuestions[questionIndex];
    soulQuestion.animate(
      [
        { opacity: 0, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 220, easing: "ease-out" }
    );
  }
}

function startQuickTimer() {
  clearInterval(timerId);
  timerLeft = 10;
  if (quickTimer) quickTimer.textContent = "10秒";
  timerId = setInterval(() => {
    timerLeft -= 1;
    if (quickTimer) quickTimer.textContent = `${Math.max(timerLeft, 0)}秒`;
    if (timerLeft <= 0) {
      clearInterval(timerId);
      if (quickRecordStatus) quickRecordStatus.textContent = "已经超过 10 秒也没关系，先把此刻留下来。";
    }
  }, 1000);
}

function setQuickStatus(message) {
  if (quickRecordStatus) {
    quickRecordStatus.textContent = message;
  }
}

function saveQuickRecord() {
  const value = quickRecordInput?.value.trim() || "";
  if (!value) {
    setQuickStatus("先写下一句话，哪怕只有几个字也可以。");
    quickRecordInput?.focus();
    return;
  }

  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const meta = `${value.length}字 · ${selectedRecordType}${selectedMoodTag ? ` · ${selectedMoodTag}` : ""}`;
  const card = document.createElement("article");
  card.className = "entry-card";
  card.innerHTML = `<time>${time}</time><span>${meta}</span><p>${value}</p>`;
  entryList?.prepend(card);

  quickRecordInput.value = "";
  setQuickStatus("已保存。无需分类，系统会在复盘时自动整理线索。");
  showScreen("diary");
}

function setAccountError(message) {
  if (accountError) {
    accountError.textContent = message;
  }
}

function handleAccountSubmit() {
  const username = accountUsername?.value.trim() || "";
  const password = accountPassword?.value || "";
  const agreed = accountAgreement?.checked;

  if (!username) {
    setAccountError("请输入用户名。");
    accountUsername?.focus();
    return;
  }

  if (password.length < 4) {
    setAccountError("请输入至少 4 位密码。");
    accountPassword?.focus();
    return;
  }

  if (!agreed) {
    setAccountError("请先阅读并同意用户协议与隐私政策。");
    accountAgreement?.focus();
    return;
  }

  localStorage.setItem(
    "timeEchoDemoUser",
    JSON.stringify({
      username,
      mode: accountMode,
      loginAt: new Date().toISOString(),
    })
  );

  setAccountError("");
  accountScreen?.classList.add("hidden");
  showScreen("diary");
}

function toggleAccountMode() {
  accountMode = accountMode === "login" ? "register" : "login";
  if (accountTitle) accountTitle.textContent = accountMode === "login" ? "Welcome" : "Create";
  if (accountSubmit) accountSubmit.textContent = accountMode === "login" ? "登录" : "注册";
  if (accountRegister) accountRegister.textContent = accountMode === "login" ? "注册账号" : "返回登录";
  setAccountError("");
}

document.addEventListener("click", (event) => {
  if (event.target.closest("#entry-action")) {
    entryScreen?.classList.add("hidden");
    accountScreen?.classList.remove("hidden");
    return;
  }

  if (event.target.closest("#account-register")) {
    toggleAccountMode();
    return;
  }

  if (event.target.closest("#account-forgot")) {
    setAccountError("Demo 暂不支持找回密码，请先使用任意账号体验。");
    return;
  }

  if (event.target.closest("#refresh-question")) {
    refreshSoulQuestion();
    return;
  }

  if (event.target.closest("#refresh-praise")) {
    praiseIndex = (praiseIndex + 1) % praiseVariants.length;
    if (dailyPraise) {
      dailyPraise.textContent = praiseVariants[praiseIndex];
      dailyPraise.animate(
        [
          { opacity: 0, transform: "translateY(6px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 220, easing: "ease-out" }
      );
    }
    return;
  }

  const emotionButton = event.target.closest("[data-emotion-step]");
  if (emotionButton) {
    const step = emotionButton.dataset.emotionStep;
    document.querySelectorAll("[data-emotion-step]").forEach((button) => button.classList.remove("active"));
    emotionButton.classList.add("active");
    if (emotionGuide) {
      emotionGuide.textContent = emotionGuides[step] || emotionGuides.休息;
    }
    return;
  }

  const recordTypeButton = event.target.closest("[data-record-type]");
  if (recordTypeButton) {
    selectedRecordType = recordTypeButton.dataset.recordType;
    document.querySelectorAll("[data-record-type]").forEach((button) => button.classList.remove("active"));
    recordTypeButton.classList.add("active");
    setQuickStatus(`已切换为${selectedRecordType}记录。Demo 中以界面模拟为主。`);
    startQuickTimer();
    return;
  }

  const moodButton = event.target.closest("[data-mood-tag]");
  if (moodButton) {
    selectedMoodTag = moodButton.dataset.moodTag;
    document.querySelectorAll("[data-mood-tag]").forEach((button) => button.classList.remove("active"));
    moodButton.classList.add("active");
    setQuickStatus(`已添加心情标签：${selectedMoodTag}`);
    return;
  }

  if (event.target.closest("#save-quick-record")) {
    saveQuickRecord();
    return;
  }

  const nav = event.target.closest("[data-go]");
  if (nav) {
    showScreen(nav.dataset.go);
    if (nav.dataset.go === "write") {
      startQuickTimer();
      quickRecordInput?.focus();
    }
    return;
  }

  if (event.target.matches("#regenerate-summary")) {
    summaryIndex = (summaryIndex + 1) % summaryVariants.length;
    summaryText.textContent = summaryVariants[summaryIndex];
    summaryText.animate(
      [
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 260, easing: "ease-out" }
    );
    return;
  }

  if (event.target.closest("[data-week-prev]")) {
    updateSelectedDate(addDays(selectedDate, -7));
    return;
  }

  if (event.target.closest("[data-week-next]")) {
    updateSelectedDate(addDays(selectedDate, 7));
    return;
  }

  const dateButton = event.target.closest("[data-date]");
  if (dateButton) {
    const [year, month, day] = dateButton.dataset.date.split("-").map(Number);
    updateSelectedDate(new Date(year, month - 1, day));
    return;
  }

  const colorButton = event.target.closest("[data-tree-color]");
  if (colorButton) {
    const colorName = colorButton.dataset.treeColor;
    document.querySelectorAll("[data-tree-color]").forEach((button) => button.classList.remove("active"));
    colorButton.classList.add("active");
    treeStage?.style.setProperty("--tree-color", treeColors[colorName] || treeColors.green);
  }
});

accountForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  handleAccountSubmit();
});

document.addEventListener("input", (event) => {
  const editable = event.target.closest(".editable-text");
  if (!editable) return;
  localStorage.setItem(editable.dataset.editKey, editable.innerHTML);
});

[yearSelect, monthSelect, daySelect].forEach((select) => {
  select?.addEventListener("change", () => {
    const year = Number(yearSelect.value);
    const monthIndex = Number(monthSelect.value) - 1;
    const day = Number(daySelect.value);
    updateSelectedDate(new Date(year, monthIndex, day));
  });
});

setupEditableText();
renderCalendar();
