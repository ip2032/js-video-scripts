$(function() {
    /**
     * Ваш сайт, для примеров работы с запросами
     */
    var URL = 'https://omnidesk.ru';
   /**
     * Некоторые переменные, доступные в глобальной видимости Омнидеска:
     * CurrentCaseId
     * CurrentUserId
     * CurrentStaffId
     * CurrentClientId
      *
     * Данные в этих переменных уже можно использовать чтобы получить более развернутый результат по API Омнидеска
     * https://omnidesk.ru/api/introduction/intro
     */

    var CASE_ID = CurrentCaseId;
    var CASE_URL = document.location.href;

    /**
     * Некоторые селекторы для примеров
     */
    var HORIZONTAL_MENU_SELECTOR = '.header-container';
    var HORIZONTAL_MENU_BUTTONS_SELECTOR = '.global-actions > .global-actions-list:last-child';
    var HORIZONTAL_MENU_ELEMENTS_SELECTOR = '.primary-nav';

    var INTEGRATION_PANEL_SELECTOR = '#integrations_info_panel';
    var INFORMATION_PANEL_SELECTOR = '#info_user_info_panel';

    /** HELPERS */

    /**
     * Проверяем на undefined
     */
    var checkNotUndefined = function(data) {
        return (typeof data === 'undefined') ? false : true;
    }

    /**
     * Вставка в конец или в начало элемента
     */
    var addCode = function(selector, htmlCode, after) {
        var element = $(selector);

        if(checkNotUndefined(after) === true && after === true) {
            element.append(htmlCode);
        } else {
            element.prepend(htmlCode);
        }
    };

    /** EXAMPLES */

    // Отключаем возможность менять значение кастомного поля «Статус заказа»
    $(document).ready(function() {
        $('select[name="field_7608"]').prop('disabled', true).trigger('chosen:updated');
    });

    // Меняем стили для адреса электронной почты в поле «Отправить с»
    $(document).ready(function() {
        var container = $('#new_case_sender_chosen');

        container.find('.chosen-single span').css({
                'color': '#c43117',
                'font-weight' : '700'
        });
    });

    // Меняем стили для для поля «Группа»
    $(document).ready(function() {
        var container = $('#case_group_id_chosen');

        container.find('.chosen-single').css({
            'color': '#1441e0',
            'font-weight' : '700',
            'background': '#f6e6e6',
            'border-color': '#dadada',
            'box-shadow': '0 0 3px #f6e6e6 inset, 0 1px 1px rgba(0,0,0,.1)'
   	    });
    });

    // Добавляем новый раздел «Веб-сайт» в шапке страницы
    addCode(
        HORIZONTAL_MENU_ELEMENTS_SELECTOR,
        `<li class="nav-item nav-item-web-link inlb">
            <a class="nav-item-url" href="https://omnidesk.ru">Веб-сайт</a>
        </li>`,
        true
    );

    // Добавляем новую иконку в шапке справа и задаем кастомные стили
    addCode(
        HORIZONTAL_MENU_BUTTONS_SELECTOR,
        `<li class="global-action-item inlb kb-link" title="База знаний">
            <a class="nav-item-url" href="https://support.omnidesk.ru/knowledge_base">
                <i class="icon fi-rss" style="margin-left: 4px;background-color: #f5d998 !important;color: #459801 !important;font-size: 17px !important;"></i>
            </a>
        </li>`,
        false
    );

    // Добавляем новую иконку в шапке справа в стили Омнидеска
    addCode(
        HORIZONTAL_MENU_BUTTONS_SELECTOR,
        `<li class="global-action-item inlb api-link" title="API">
            <a class="nav-item-url" href="https://omnidesk.ru/api/introduction#intro">
                <i class="icon fi-key"></i>
            </a>
        </li>`,
        false
    );

    /**
     * Добавляем в горизонтальное меню цвета своей компании
     * Результат в коде Омнидеска https://www.dropbox.com/s/3vtzym61el1659z/04_custom_styles.png?dl=0
     * Результат на странице https://www.dropbox.com/s/hfo696yiffw455a/04_2_custom_styles.png?dl=0
     */
    $(document).find(HORIZONTAL_MENU_SELECTOR).css({
        'border-bottom': 'solid 3px #44BE69',
    });

    /**
     * Подключаем свой CSS в код Омнидеска. В CSS дополнительные иконки
     * Результат на странице https://www.dropbox.com/s/jde5uaykf84hsak/05_custom_css.png?dl=0
     */
    $(document)
        .find('body')
        .append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css">');

         /**
     * Добавляем кастомную информацию в блок о пользователе
     *
     * Сначала заголовок
     */
    addCode(
        INFORMATION_PANEL_SELECTOR,
        `<div class="info_header clearfix">
            <p>КАСТОМНАЯ ПАНЕЛЬ</p>
        </div>`,
        true
    );

    /**
     * Потом информация
     *
     * Допустим, мы запросили информацию извне
     * $.get(URL + '/api/users/' + CurrentUserId, data, callback);
     *
     * и получили такой объект в callback:
     */
    var UserInformation = {
        id: 25553,
        name: 'Марк Бессонов',
        tariff_name: 'Максимальный',
        support_type: 'Постоянная'
    };

    /**
     * Отображаем эту информацию
     * Результат в коде Омнидеска: https://www.dropbox.com/s/5b98ud1hwi97wu5/01_custom_block.png?dl=0
     */
    addCode(
        INFORMATION_PANEL_SELECTOR,
        `<div class="info_fields">
            <h6>Логин</h6>
            <p style="word-wrap: break-word;">#${UserInformation.id}</p>

            <h6>Ссылка на профиль</h6>
            <p style="word-wrap: break-word;"><a href="${URL}/id/${UserInformation.id}">${UserInformation.name}</a></p>

            <h6>Тариф</h6>
            <p style="word-wrap: break-word;">${UserInformation.tariff_name}</p>

            <h6>Тип поддержки</h6>
            <p style="word-wrap: break-word;">${UserInformation.support_type}</p>
        </div>`,
        true
    );

    // Добавляем заголовок для кастомной CRM
    addCode(
        INFORMATION_PANEL_SELECTOR,
        `<div class="info_header clearfix">
            <p>КАСТОМНАЯ CRM</p>
        </div>`,
        true
    );

    /**
     * Добавляем информацию
     *
     * Допустим, мы запросили информацию извне
     * $.get(URL + '/api/users/' + CurrentUserId, data, callback);
     *
     * и получили такой объект в callback:
     */

    var panelCRM = {
        id: 25253,
        task1_id: "8392",
        task1_name: "Оповестить службу доставки об обновлении тарифов",
        task2_id: "10032",
        task2_name: "Подготовить дополнительную упаковку для товаров по заказу #23023",
        deal1_id: "23023",
        deal1_name: "Заказ #23023",
        deal2_id: 24220,
        deal2_name: "Заказ #24220",
        sum: "32000"
    }

    //Отображаем эту информацию и стилизуем активные ссылки
    addCode(
        INFORMATION_PANEL_SELECTOR,
        `<div class="info_fields">

            <h6>Последние задачи</h6>
                <p style="word-wrap: break-word;"><a href="${URL}/id/${panelCRM.task1}"</a>${panelCRM.task1_name}</p>
                <p style="word-wrap: break-word;"><a href="${URL}/id/${panelCRM.task2}"</a>${panelCRM.task2_name}</p>
                <p style="word-wrap: break-word;"><a href="${URL}/createtask" style="color:#078d23; text-decoration: underline;">Создать задачу</a></p>

            <h6>Последние сделки</h6>
                <p style="word-wrap: break-word;"><a href="${URL}/id/${panelCRM.deal1_id}">${panelCRM.deal1_name}</a></p>
                <p style="word-wrap: break-word;"><a href="${URL}/id/${panelCRM.deal2_id}">${panelCRM.deal2_name}</a></p>
                <p style="word-wrap: break-word;"><a href="${URL}/create_deal" style="color: #078d23; text-decoration: underline;">Создать сделку</a></p>

            <h6>Общая сумма сделок</h6>
                <p style="word-wrap: break-word;">${panelCRM.sum} р.</p>

        </div>`,
        true
    );
    /* БЫСТРЫЕ ШАБЛОНЫ */

    // По клику находим ID шаблона, и применяем его, подставляя ID
    var handleMacroClick = function(templateId) {
        $(document).on('click', `#applyMacroButton_${templateId}`, function(e) {
            e.preventDefault();
            // Применяем шаблон по клику на ссылку
            $(`.apply-template[href="template_${templateId}"]`).click();
        });
    };

    // Выносим ссылки для быстрого применения шаблона и стилизуем их
    var addButton = function(containerSelector, templateId, buttonText, styles) {
        var buttonId = `applyMacroButton_${templateId}`;
        var buttonHtml = `<a id="${buttonId}" href="#">${buttonText}</a>`;
        addCode(containerSelector, buttonHtml, true);
        handleMacroClick(templateId);
        applyStyles(`#${buttonId}`, styles); // Находим и стилизуем кнопки по ID
    };

    // Создаем функцию для стилизации ссылок
    var applyStyles = function(selector, styles) {
        $(selector).css(styles);
    };

// ИЗМЕНЕНО: Создаем селектор для блока, в который добавим ссылки - теперь в тот же блок, что и "Прикрепить файл"
var buttonContainerSelector = '.attach-first';

// Проверяем, если кастомная ссылка на шаблон уже есть на странице, если нет, то добавляем
if ($('#macroButtonsContainer').length === 0) {
    addCode(
        buttonContainerSelector,
        '<div id="macroButtonsContainer" style="display: inline-block; margin-left: 15px;"></div>',
        true
    );
}

// Добавляем селектор для созданного блока ссылок
var templateSelector = '#macroButtonsContainer';

// Очищаем существующие данные, чтобы добавить определенные шаблоны
$('#macroButtonsContainer').empty();

// ИЗМЕНЕНО: Добавляем новые ссылки для применения шаблона и стилизуем их - изменили отступы
addButton(templateSelector, 210005, 'Акция 22', {
    'color': '#e48000',
    'text-decoration': 'none',
    'margin-right': '10px',
    'font-size': '11px',
    'font-weight': '650',
    'letter-spacing': '0.33px'
});

addButton(templateSelector, 179994, 'Реализация', {
    'color': '#00868f',
    'text-decoration': 'none',
    'margin-right': '10px',
    'font-size': '11px',
    'font-weight': '650',
    'letter-spacing': '0.33px'
});

addButton(templateSelector, 163903, 'Каталог', {
    'color': '#ac00ae',
    'text-decoration': 'none',
    'margin-right': '10px',
    'font-size': '11px',
    'font-weight': '650',
    'letter-spacing': '0.33px'
});

/* БЫСТРЫЕ ШАБЛОНЫ ДЛЯ ЧАТОВ */

// Селектор для чатов - добавляем после ul с кнопками
var chatContainerSelector = '.answer-action-box ul.clearfix.fl-left';

// Проверяем, что мы на странице чата и есть нужный контейнер
if ($(chatContainerSelector).length > 0) {

    // Проверяем, если кастомный блок шаблонов для чата уже есть
    if ($('#chatMacroButtonsContainer').length === 0) {
        // Добавляем контейнер для шаблонов после ul с кнопками
        $(chatContainerSelector).after('<div id="chatMacroButtonsContainer" style="display: inline-block; margin-left: 15px; margin-top: 10px;"></div>');
    }

    // Очищаем существующие данные
    $('#chatMacroButtonsContainer').empty();

    // Добавляем простые текстовые ссылки (как в email-обращениях)
    $('#chatMacroButtonsContainer').append(`
        <a id="applyChatMacroButton_210005" href="#" style="
            color: #e48000;
            text-decoration: none;
            margin-right: 10px;
            font-size: 11px;
            font-weight: 650;
            letter-spacing: 0.33px;
        ">Акция 22</a>
    `);

    $('#chatMacroButtonsContainer').append(`
        <a id="applyChatMacroButton_179994" href="#" style="
            color: #00868f;
            text-decoration: none;
            margin-right: 10px;
            font-size: 11px;
            font-weight: 650;
            letter-spacing: 0.33px;
        ">Реализация</a>
    `);

    $('#chatMacroButtonsContainer').append(`
        <a id="applyChatMacroButton_163903" href="#" style="
            color: #ac00ae;
            text-decoration: none;
            margin-right: 10px;
            font-size: 11px;
            font-weight: 650;
            letter-spacing: 0.33px;
        ">Каталог</a>
    `);

    // Обработчики кликов для чата
    $(document).on('click', '#applyChatMacroButton_210005', function(e) {
        e.preventDefault();
        $(`.apply-template[href="template_210005"]`).click();
    });

    $(document).on('click', '#applyChatMacroButton_179994', function(e) {
        e.preventDefault();
        $(`.apply-template[href="template_179994"]`).click();
    });

    $(document).on('click', '#applyChatMacroButton_163903', function(e) {
        e.preventDefault();
        $(`.apply-template[href="template_163903"]`).click();
    });
}
    /* КАЛЬКУЛЯТОР ПОДСЧЕТ СТОИМОСТИ */

    // Сначала добавляем название блока
    addCode(
        INTEGRATION_PANEL_SELECTOR,
        `<div class="info_header clearfix">
            <p>Калькулятор стоимости доставки</p> </div>`,
        true
    );

    // Создаем селектор и его HTML-верстку
    var addComplexCalculator = function(containerSelector) {
        var calculatorHTML =

        `<div id="complexCalculator" style="margin-bottom: 20px;">
            <div style="margin-bottom: 10px;">
                <label for="weight" style="margin-right: 5px;">Вес
                    <span style="color: #000000; font-weight: 600; font-size: 12px;">(кг)</span>
                </label>
                <input type="number" id="weight" placeholder="Введите вес" style="right: 23px; position: absolute;">
            </div>

            <div style="margin-bottom: 10px;">
                <label for="height" style="margin-right: 5px;">Высота
                    <span style="color: #000000; font-weight: 600; font-size: 12px;">(cм)</span>
                </label>
                <input type="number" id="height" placeholder="Введите высоту" style="right: 23px; position: absolute;">
            </div>

            <div style="margin-bottom: 10px;">
                <label for="width" style="margin-right: 5px;">Ширина
                    <span style="color: #000000; font-weight: 600; font-size: 12px;">(cм)</span>
                </label>
                <input type="number" id="width" placeholder="Введите ширину" style="right: 23px; position: absolute;">
            </div>

            <div style="margin-bottom: 10px;">
                <label for="length" style="margin-right: 5px;">Длина
                    <span style="color: #000000; font-weight: 600; font-size: 12px;">(cм)</span>
                </label>
                <input type="number" id="length" placeholder="Введите длину" style="right: 23px; position: absolute;">
            </div>

            <div style="margin-bottom: 10px;">
                <label for="distance" style="margin-right: 5px;">Дистанция
                    <span style="color: #000000; font-weight: 600; font-size: 12px;">(км)</span>
                </label>
                <input type="number" id="distance" placeholder="Введите дистанцию" style="right: 23px; position: absolute;">
            </div>

            <div id="buttonsContainer" style="margin-top: 15px; display: flex; justify-content: space-between;">

                <button id="refreshBtn" style="padding: 8px 10px 7px 10px; background: #558ffd; color: #fff; border: none; border-radius: 3px; font-size: 13px; letter-spacing: 0.4px; margin-left: -3px;">
                    ОБНОВИТЬ
                </button>

                <button id="calculateBtn" style="position: absolute; right: 23px; padding: 8px 11px 7px 11px; background: #29ab30; color: #fff; border: none; border-radius: 3px; font-size: 13px; letter-spacing: 1.1px; width: 154px">
                    ПОДСЧИТАТЬ
                </button>

            </div>

            <p id="resultLabel" style="font-weight: bold; font-size: 14px; color: #000000; margin-top: 15px;">
                Результат:
                    <span id="resultValue" style="font-weight: bold; font-size: 14px; color: #29ab30; right: 5px;"></span>
            </p>
        </div> `;

        // При запуске функции containerSelector показываем верстку блока
        $(containerSelector).append(calculatorHTML);

        // по клику на кнопку калькулятора «Подсчитать» запускаем функцию подсчёта
        $(containerSelector).on('click', '#calculateBtn', function() {
            calculateCost();
        });

        // По клику по кнопке калькулятора «Обновить» очищаем все поля
        $(containerSelector).on('click', '#refreshBtn', function() {
            $('#weight, #height, #width, #length, #distance').val('');
            $('#resultValue').text('');
        });
    };

    // Функция подсчёта стоимости
    var calculateCost = function() {

        var weight = parseFloat($('#weight').val()) || 0;
        var height = parseFloat($('#height').val()) || 0;
        var width = parseFloat($('#width').val()) || 0;
        var length = parseFloat($('#length').val()) || 0;
        var distance = parseFloat($('#distance').val()) || 0;

        // Подсчёт стоимости по весу
        var weightCost = 0;

        if (weight <= 2) {
            weightCost = 0;
        } else if (weight <= 5) {
            weightCost = 20;
        } else if (weight <= 10) {
            weightCost = 50;
        } else {
            weightCost = 20 * weight + 50;
        }

        // Подсчёт объёма
        var volume = (height * width * length) / 1000000; // конвертируем см3 в м3

        // Подсчёт стоимости по объёму
        var volumeCost = 0; if (volume > 500) {
            volumeCost = volume * 1 + 100;
        } else if (volume > 300) {
            volumeCost = 100;
        }

        // Подсчёт стоимости по дистанции
        var distanceCost = distance;

        // Подсчёт общей стоимости
        var totalCost = weightCost + volumeCost + distanceCost;

        // Отображаем результат в рублях
        $('#resultValue').text(totalCost.toFixed(2) + ' рублей');

    };

    // Добавляем блок с калькулятором в панель интеграций после загрузки элементов страницы
    $(document).ready(function() {
        addComplexCalculator('#integrations_info_panel');
    });

});