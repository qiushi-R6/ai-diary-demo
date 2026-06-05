const screens = Array.from(document.querySelectorAll(".screen"));
const navButtons = Array.from(document.querySelectorAll(".bottom-nav button"));
const summaryText = document.querySelector("#ai-summary-text");
const treeStage = document.querySelector("#tree-stage");

const summaryVariants = [
  "这段日子里，你从第一次打招呼开始熟悉啦。你分享过升温时想煮番茄鸡蛋面的小期待，也记录了工作压力大时偷偷放慢呼吸的瞬间。那些小小的生活皱褶，都藏着温暖的光。",
  "AI 已经把散落的句子整理好了：你这周不是没有前进，只是把很多力气花在了让自己稳定下来。那些想睡、想逃、想吃点热东西的时刻，都在提醒你要慢一点。",
  "这周的你有一点疲惫，也有一点柔软。你把便利店、夜骑、下雨和朋友的邀约都写了下来，像给生活留了一排小灯。它们不刺眼，但足够照见你。"
];

const treeColors = {
  green: "#8dae91",
  purple: "#8f7ab8",
  blue: "#719aad",
  rose: "#bd7180",
};

let summaryIndex = 0;

function showScreen(name) {
  const id = `screen-${name}`;
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === id);
  });
  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.go === name);
  });
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-go]");
  if (nav) {
    showScreen(nav.dataset.go);
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

  const colorButton = event.target.closest("[data-tree-color]");
  if (colorButton) {
    const colorName = colorButton.dataset.treeColor;
    document.querySelectorAll("[data-tree-color]").forEach((button) => button.classList.remove("active"));
    colorButton.classList.add("active");
    treeStage?.style.setProperty("--tree-color", treeColors[colorName] || treeColors.green);
  }
});
