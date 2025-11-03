$(function () {
    const knownChatGroups = [
        'Тест JS',
        'Обсуждение багов',
        'Продажи WA',
        'Клиенты Telegram',
    ];

    const $title = $('#current_subject span:first');

    if ($title.length === 0) return;

    let fullTitle = $title.text().trim();

    // Подсвечиваем группы
    knownChatGroups.forEach(group => {
        if (fullTitle.includes(group)) {
            const regex = new RegExp(`(${group})`, 'g');
            fullTitle = fullTitle.replace(
                regex,
                '<span style="color: #059669; font-weight: 700;">$1</span>'
            );
        }
    });

    $title.html(fullTitle);
});
