(() => {
    const passingScore = 10;
    const scoreKey = (round) => `mathGame.round${round}.bestScore`;

    function getBestScore(round) {
        const score = Number(localStorage.getItem(scoreKey(round)));
        return Number.isFinite(score) ? score : 0;
    }

    function isRoundUnlocked(round) {
        return round === 1 || getBestScore(round - 1) >= passingScore;
    }

    function saveRoundScore(round, score) {
        const bestScore = Math.max(getBestScore(round), score);
        localStorage.setItem(scoreKey(round), String(bestScore));
    }

    function renderDashboard() {
        document.querySelectorAll("[data-round]").forEach((link) => {
            const round = Number(link.dataset.round);
            const bestScore = getBestScore(round);
            const unlocked = isRoundUnlocked(round);

            link.textContent = `${link.dataset.label} (Best: ${bestScore}/10)`;
            if (unlocked) {
                link.href = link.dataset.href;
                link.removeAttribute("aria-disabled");
                link.closest("li")?.classList.remove("locked");
            } else {
                const requiredRound = round - 1;
                link.removeAttribute("href");
                link.setAttribute("aria-disabled", "true");
                link.textContent += ` - Locked (get ${passingScore}/10 on Page ${requiredRound})`;
                link.closest("li")?.classList.add("locked");
            }
        });
    }

    function showLockedRound(round) {
        document.body.replaceChildren();
        const heading = document.createElement("h1");
        heading.textContent = `Page ${round} is locked`;
        const message = document.createElement("p");
        message.textContent = `Get ${passingScore}/10 on Page ${round - 1} to unlock this round.`;
        const dashboardLink = document.createElement("a");
        dashboardLink.href = "level1.html";
        dashboardLink.textContent = "Back to dashboard";
        document.body.append(heading, message, dashboardLink);
    }

    window.gameProgress = {
        isRoundUnlocked,
        saveRoundScore,
        showLockedRound
    };

    if (document.body.dataset.page === "dashboard") {
        renderDashboard();
    }
})();
