$(function () {
    const knownChatGroups = [
        'Тест JS',
        'Обсуждение багов',
        'Продажи WA',
        'Клиенты Telegram',
    ];

    const $title = $('#current_subject span');
    const fullTitle = $title.text().trim();

    const matchedGroup = knownChatGroups.find(group =>
        fullTitle.startsWith(group)
    );

    if (matchedGroup) {
        const rest = fullTitle.slice(matchedGroup.length).trimStart();
        const highlighted = `<span style="color: #3a88cb; font-weight: bold;">${matchedGroup}</span> ${rest}`;
        $title.html(highlighted);
    }
});
