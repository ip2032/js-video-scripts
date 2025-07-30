$(function() {
    /**
     * Ваш сайт, для примеров работы с запросами
     */
    var URL = 'https://omnidesk.ru';

    /**
     * Некоторые переменные, доступные в глобальной видимости Омнидеска:
     * CurrentCaseId, CurrentUserId, CurrentStaffId, CurrentClientId
     */
    var CASE_ID = CurrentCaseId;
    var CASE_URL = document.location.href;

    /**
     * Селекторы для примеров
     */
    var HORIZONTAL_MENU_SELECTOR = '.header-container';
    var HORIZONTAL_MENU_BUTTONS_SELECTOR = '.global-actions > .global-actions-list:last-child';
    var HORIZONTAL_MENU_ELEMENTS_SELECTOR = '.primary-nav';
    var INTEGRATION_PANEL_SELECTOR = '#integrations_info_panel';
    var INFORMATION_PANEL_SELECTOR = '#info_user_info_panel';

    /** HELPERS */
    var checkNotUndefined = function(data) {
        return (typeof data !== 'undefined');
    };

    var addCode = function(selector, htmlCode, after) {
        var element = $(selector);
        if (checkNotUndefined(after) && after === true) {
            element.append(htmlCode);
        } else {
            element.prepend(htmlCode);
        }
    };

    // CSS для выравнивания кнопок шаблонов
    $(document).ready(function() {
        $('<style>').prop('type', 'text/css').html(`
            .attach-first {
                display: flex !important;
                align-items: center !important;
                flex-wrap: nowrap !important;
            }
            #macroButtonsContainer {
                display: inline-flex !important;
                align-items: center !important;
                vertical-align: middle !important;
                gap: 8px !important;
            }
        `).appendTo('head');
    });

    /** ОСНОВНЫЕ НАСТРОЙКИ */
    $(document).ready(function() {
        // Скрываем ненужные элементы
        $('#ForwardCase').hide();
        $('i.icon-share-alt.fas.fa-share[title="Переслать"]').hide();
        
        // Отключаем кастомное поле
        $('select[name="field_7608"]').prop('disabled', true).trigger('chosen:updated');
        
        // Стилизуем элементы
        $('#case_email_id_chosen').find('.chosen-single span').css({
            'color': '#c43117',
            'font-weight': '700'
        });
    });

    // Добавляем элементы в шапку
    addCode(HORIZONTAL_MENU_ELEMENTS_SELECTOR,
        `<li class="nav-item nav-item-web-link inlb">
            <a class="nav-item-url" href="https://omnidesk.ru">Веб-сайт</a>
        </li>`, true);

    addCode(HORIZONTAL_MENU_BUTTONS_SELECTOR,
        `<li class="global-action-item inlb kb-link" title="База знаний">
            <a class="nav-item-url" href="https://support.omnidesk.ru/knowledge_base">
                <i class="icon fi-rss" style="margin-left: 4px;background-color: #f5d998 !important;color: #459801 !important;font-size: 17px !important;"></i>
            </a>
        </li>`, false);

    addCode(HORIZONTAL_MENU_BUTTONS_SELECTOR,
        `<li class="global-action-item inlb api-link" title="API">
            <a class="nav-item-url" href="https://omnidesk.ru/api/introduction#intro">
                <i class="icon fi-key"></i>
            </a>
        </li>`, false);

    // Стилизуем шапку
    $(HORIZONTAL_MENU_SELECTOR).css('border-bottom', 'solid 3px #44BE69');

    // Подключаем внешние стили
    $('body').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css">');
    $('body').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">');

    /** ИНФОРМАЦИОННЫЕ ПАНЕЛИ */
    // Кастомная панель
    addCode(INFORMATION_PANEL_SELECTOR,
        `<div class="info_header clearfix">
            <p>КАСТОМНАЯ ПАНЕЛЬ</p>
        </div>`, true);

    var UserInformation = {
        id: 25553,
        name: 'Марк Бессонов',
        tariff_name: 'Максимальный',
        support_type: 'Постоянная'
    };

    addCode(INFORMATION_PANEL_SELECTOR,
        `<div class="info_fields">
            <h6>Логин</h6>
            <p style="word-wrap: break-word;">#${UserInformation.id}</p>
            <h6>Ссылка на профиль</h6>
            <p style="word-wrap: break-word;"><a href="${URL}/id/${UserInformation.id}">${UserInformation.name}</a></p>
            <h6>Тариф</h6>
            <p style="word-wrap: break-word;">${UserInformation.tariff_name}</p>
            <h6>Тип поддержки</h6>
            <p style="word-wrap: break-word;">${UserInformation.support_type}</p>
        </div>`, true);

    // CRM панель
    addCode(INFORMATION_PANEL_SELECTOR,
        `<div class="info_header clearfix">
            <p>КАСТОМНАЯ CRM</p>
        </div>`, true);

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
    };

    // Исправляем ссылки на задачи и добавляем иконку для суммы
    addCode(INFORMATION_PANEL_SELECTOR,
        `<div class="info_fields">
            <h6>Последние задачи</h6>
            <p style="word-wrap: break-word;"><a href="${URL}/id/${panelCRM.task1_id}">${panelCRM.task1_name}</a></p>
            <p style="word-wrap: break-word;"><a href="${URL}/id/${panelCRM.task2_id}">${panelCRM.task2_name}</a></p>
            <p style="word-wrap: break-word;"><a href="${URL}/createtask" style="color:#078d23; text-decoration: underline;">Создать задачу</a></p>
            <h6>Последние сделки</h6>
            <p style="word-wrap: break-word;"><a href="${URL}/id/${panelCRM.deal1_id}">${panelCRM.deal1_name}</a></p>
            <p style="word-wrap: break-word;"><a href="${URL}/id/${panelCRM.deal2_id}">${panelCRM.deal2_name}</a></p>
            <p style="word-wrap: break-word;"><a href="${URL}/create_deal" style="color: #078d23; text-decoration: underline;">Создать сделку</a></p>
            <h6>Общая сумма сделок</h6>
            <p style="word-wrap: break-word;"><i class="fa-solid fa-circle-dollar" style="margin-right: 5px; color: #8b8b8b;"></i>${panelCRM.sum} р.</p>
        </div>`, true);

    /* БЫСТРЫЕ ШАБЛОНЫ - ОРИГИНАЛЬНАЯ РАБОЧАЯ ЛОГИКА */

    // Обработчик кликов для email шаблонов
    var handleMacroClick = function(templateId) {
        $(document).on('click', `#applyMacroButton_${templateId}`, function(e) {
            e.preventDefault();
            $(`.apply-template[href="template_${templateId}"]`).click();
        });
    };

    // Добавление кнопки шаблона
    var addButton = function(containerSelector, templateId, buttonText, styles) {
        var buttonId = `applyMacroButton_${templateId}`;
        var buttonHtml = `<a id="${buttonId}" href="#">${buttonText}</a>`;
        addCode(containerSelector, buttonHtml, true);
        handleMacroClick(templateId);
        $(buttonId).css(styles);
    };

    // Стилизация ссылок
    var applyStyles = function(selector, styles) {
        $(selector).css(styles);
    };

    // Основная функция добавления шаблонов
    function addTemplateButtons() {
        console.log('Добавляем кнопки шаблонов...');

        var emailContainer = $('.attach-first');
        var chatContainer = $('.chat_msg_win_actions');

        // EMAIL обращения
        if (emailContainer.length > 0 && $('#macroButtonsContainer').length === 0) {
            console.log('Найден email контейнер, добавляем шаблоны');

            addCode('.attach-first',
                '<div id="macroButtonsContainer" style="display: inline-block; margin-left: 15px; margin-top: 2px;"></div>',
                true);

            var templateSelector = '#macroButtonsContainer';

            addButton(templateSelector, 327703, 'Акция', {
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

            console.log('✓ Email шаблоны добавлены');
        }

        // ЧАТЫ
        if (chatContainer.length > 0 && $('#chatMacroButtonsContainer').length === 0) {
            console.log('Найден чат контейнер, добавляем шаблоны');

            var chatIconsList = chatContainer.find('ul.clearfix');
            if (chatIconsList.length > 0) {
                chatIconsList.after('<div id="chatMacroButtonsContainer" style="display: inline-block; margin-left: 15px; vertical-align: top; margin-top: 8px;"></div>');

                $('#chatMacroButtonsContainer').append(`
                    <a id="applyChatMacroButton_327703" href="#" style="
                        color: #e48000;
                        text-decoration: none;
                        margin-right: 10px;
                        font-size: 11px;
                        font-weight: 650;
                        letter-spacing: 0.33px;
                    ">Акция</a>
                    <a id="applyChatMacroButton_179994" href="#" style="
                        color: #00868f;
                        text-decoration: none;
                        margin-right: 10px;
                        font-size: 11px;
                        font-weight: 650;
                        letter-spacing: 0.33px;
                    ">Реализация</a>
                    <a id="applyChatMacroButton_163903" href="#" style="
                        color: #ac00ae;
                        text-decoration: none;
                        margin-right: 10px;
                        font-size: 11px;
                        font-weight: 650;
                        letter-spacing: 0.33px;
                    ">Каталог</a>
                `);
            }

            // Обработчики для чата
            $(document).on('click', '#applyChatMacroButton_327703', function(e) {
                e.preventDefault();
                console.log('Клик по шаблону 327703 (Акция)');

                var selectors = [
                    `.apply-template[href="template_327703"]`,
                    `._template_row[rel="327703"]`,
                    `li[rel="327703"]`,
                    `.template_row[rel="327703"]`
                ];

                for (var i = 0; i < selectors.length; i++) {
                    var template = $(selectors[i]);
                    if (template.length > 0) {
                        console.log('Применяем через:', selectors[i]);
                        template.click();
                        return;
                    }
                }

                console.log('Шаблон 327703 не найден');
            });

            $(document).on('click', '#applyChatMacroButton_179994', function(e) {
                e.preventDefault();
                var selectors = [`.apply-template[href="template_179994"]`, `._template_row[rel="179994"]`, `li[rel="179994"]`];
                for (var i = 0; i < selectors.length; i++) {
                    var template = $(selectors[i]);
                    if (template.length > 0) {
                        template.click();
                        return;
                    }
                }
            });

            $(document).on('click', '#applyChatMacroButton_163903', function(e) {
                e.preventDefault();
                var selectors = [`.apply-template[href="template_163903"]`, `._template_row[rel="163903"]`, `li[rel="163903"]`];
                for (var i = 0; i < selectors.length; i++) {
                    var template = $(selectors[i]);
                    if (template.length > 0) {
                        template.click();
                        return;
                    }
                }
            });

            console.log('✓ Чат шаблоны добавлены');
        }
    }

    // Запуск с задержкой
    $(document).ready(function() {
        setTimeout(addTemplateButtons, 800);
    });

    /* КАЛЬКУЛЯТОР СТОИМОСТИ */
    addCode(INTEGRATION_PANEL_SELECTOR,
        `<div class="info_header clearfix">
            <p>Калькулятор стоимости доставки</p>
        </div>`, true);

    var addComplexCalculator = function(containerSelector) {
        var calculatorHTML = `
            <div id="complexCalculator" style="margin-bottom: 20px;">
                <div style="margin-bottom: 10px;">
                    <label for="weight" style="margin-right: 5px;">Вес <span style="color: #000000; font-weight: 600; font-size: 12px;">(кг)</span></label>
                    <input type="number" id="weight" placeholder="Введите вес" style="right: 23px; position: absolute;">
                </div>
                <div style="margin-bottom: 10px;">
                    <label for="height" style="margin-right: 5px;">Высота <span style="color: #000000; font-weight: 600; font-size: 12px;">(см)</span></label>
                    <input type="number" id="height" placeholder="Введите высоту" style="right: 23px; position: absolute;">
                </div>
                <div style="margin-bottom: 10px;">
                    <label for="width" style="margin-right: 5px;">Ширина <span style="color: #000000; font-weight: 600; font-size: 12px;">(см)</span></label>
                    <input type="number" id="width" placeholder="Введите ширину" style="right: 23px; position: absolute;">
                </div>
                <div style="margin-bottom: 10px;">
                    <label for="length" style="margin-right: 5px;">Длина <span style="color: #000000; font-weight: 600; font-size: 12px;">(см)</span></label>
                    <input type="number" id="length" placeholder="Введите длину" style="right: 23px; position: absolute;">
                </div>
                <div style="margin-bottom: 10px;">
                    <label for="distance" style="margin-right: 5px;">Дистанция <span style="color: #000000; font-weight: 600; font-size: 12px;">(км)</span></label>
                    <input type="number" id="distance" placeholder="Введите дистанцию" style="right: 23px; position: absolute;">
                </div>
                <div style="margin-top: 15px; display: flex; justify-content: space-between;">
                    <button id="refreshBtn" style="padding: 8px 11px 7px 11px; background: #558ffd; color: #fff; border: none; border-radius: 3px; font-size: 13px; letter-spacing: 0.4px; margin-left: -3px;">
                        ОБНОВИТЬ
                    </button>
                    <button id="calculateBtn" style="position: absolute; right: 23px; padding: 8px 10px 7px 10px; background: #29ab30; color: #fff; border: none; border-radius: 3px; font-size: 13px; letter-spacing: 1.1px; width: 154px">
                        ПОДСЧИТАТЬ
                    </button>
                </div>
                <p style="font-weight: bold; font-size: 14px; color: #000000; margin-top: 15px;">
                    Результат: <span id="resultValue" style="font-weight: bold; font-size: 14px; color: #29ab30;"></span>
                </p>
            </div>`;

        $(containerSelector).append(calculatorHTML);

        $(containerSelector).on('click', '#calculateBtn', function() {
            var weight = parseFloat($('#weight').val()) || 0;
            var height = parseFloat($('#height').val()) || 0;
            var width = parseFloat($('#width').val()) || 0;
            var length = parseFloat($('#length').val()) || 0;
            var distance = parseFloat($('#distance').val()) || 0;

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

            var volume = (height * width * length) / 1000000;
            var volumeCost = 0;
            if (volume > 500) {
                volumeCost = volume * 1 + 100;
            } else if (volume > 300) {
                volumeCost = 100;
            }

            var totalCost = weightCost + volumeCost + distance;
            $('#resultValue').text(totalCost.toFixed(2) + ' рублей');
        });

        $(containerSelector).on('click', '#refreshBtn', function() {
            $('#weight, #height, #width, #length, #distance').val('');
            $('#resultValue').text('');
        });
    };

    $(document).ready(function() {
        addComplexCalculator('#integrations_info_panel');
    });
});