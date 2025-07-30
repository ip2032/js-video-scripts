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
        if (element.length === 0) {
            console.warn('Селектор не найден:', selector);
            return;
        }
        
        if (checkNotUndefined(after) && after === true) {
            element.append(htmlCode);
        } else {
            element.prepend(htmlCode);
        }
    };

    // Добавляем общие стили один раз
    function addGlobalStyles() {
        if ($('#omnidesk-custom-styles').length === 0) {
            $('<style id="omnidesk-custom-styles">').html(`
                .attach-first {
                    display: flex !important;
                    align-items: center !important;
                    flex-wrap: nowrap !important;
                }
                #emailMacroButtons, #chatMacroButtons {
                    display: inline-flex !important;
                    align-items: center !important;
                    gap: 8px !important;
                }
                .macro-button {
                    text-decoration: none !important;
                    font-size: 11px !important;
                    font-weight: 650 !important;
                    letter-spacing: 0.33px !important;
                    cursor: pointer !important;
                    margin-right: 0 !important;
                }
                .macro-button:hover {
                    opacity: 0.7 !important;
                }
            `).appendTo('head');
        }
    }

    /** ОСНОВНЫЕ НАСТРОЙКИ ИНТЕРФЕЙСА */
    function initializeInterface() {
        // Скрываем ненужные элементы
        $('#ForwardCase').hide();
        $('i.icon-share-alt.fas.fa-share[title="Переслать"]').hide();
        
        // Отключаем кастомное поле
        $('select[name="field_7608"]').prop('disabled', true).trigger('chosen:updated');
        
        // Стилизуем элементы интерфейса
        $('#case_email_id_chosen').find('.chosen-single span').css({
            'color': '#c43117',
            'font-weight': '700'
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
        
        // Подключаем внешний CSS
        if ($('link[href*="foundation-icons"]').length === 0) {
            $('body').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css">');
        }
        
        // Подключаем Font Awesome для иконок
        if ($('link[href*="font-awesome"]').length === 0) {
            $('body').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">');
        }
    }

    /** ИНФОРМАЦИОННЫЕ ПАНЕЛИ */
    function addCustomPanels() {
        if ($(INFORMATION_PANEL_SELECTOR).length === 0) return;

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
    }

    /** СИСТЕМА БЫСТРЫХ ШАБЛОНОВ */
    var TemplateSystem = {
        templates: [
            { id: 327703, name: 'Акция', color: '#e48000' },
            { id: 179994, name: 'Реализация', color: '#00868f' },
            { id: 163903, name: 'Каталог', color: '#ac00ae' }
        ],

        // Универсальная функция применения шаблона
        applyTemplate: function(templateId) {
            console.log('Применяем шаблон:', templateId);
            
            // Список возможных селекторов для разных типов страниц
            var selectors = [
                `.apply-template[href="template_${templateId}"]`,
                `._template_row[rel="${templateId}"]`,
                `.template_row[rel="${templateId}"]`,
                `li[rel="${templateId}"]`,
                `.template-item[data-id="${templateId}"]`,
                `[data-template-id="${templateId}"]`
            ];
            
            var applied = false;
            for (var i = 0; i < selectors.length; i++) {
                var element = $(selectors[i]);
                if (element.length > 0) {
                    console.log('Найден шаблон через селектор:', selectors[i]);
                    element.first().click();
                    applied = true;
                    break;
                }
            }
            
            if (!applied) {
                console.warn('Шаблон не найден:', templateId);
                console.log('Доступные шаблоны на странице:');
                $('.apply-template, ._template_row, .template_row').each(function() {
                    var href = $(this).attr('href') || $(this).attr('rel');
                    if (href) console.log(' -', href, $(this).text().trim());
                });
            }
        },

        // Создание кнопки шаблона
        createButton: function(template) {
            return `<a href="#" class="macro-button template-btn" data-template-id="${template.id}" 
                       style="color: ${template.color};">${template.name}</a>`;
        },

        // Определение типа страницы
        getPageType: function() {
            if ($('.chat_msg_win_actions').length > 0) {
                return 'chat';
            } else if ($('.attach-first').length > 0) {
                return 'email';
            }
            return 'unknown';
        },

        // Добавление шаблонов для email
        addEmailTemplates: function() {
            var container = $('.attach-first');
            if (container.length === 0 || $('#emailMacroButtons').length > 0) return;
            
            console.log('Добавляем email шаблоны');
            var buttonsHtml = '<div id="emailMacroButtons" style="display: inline-flex; align-items: center; margin-left: 15px; gap: 8px;">';
            
            this.templates.forEach(function(template) {
                buttonsHtml += TemplateSystem.createButton(template);
            });
            buttonsHtml += '</div>';
            
            container.append(buttonsHtml);
        },

        // Добавление шаблонов для чата
        addChatTemplates: function() {
            var container = $('.chat_msg_win_actions');
            if (container.length === 0 || $('#chatMacroButtons').length > 0) return;
            
            console.log('Добавляем чат шаблоны');
            var buttonsHtml = '<div id="chatMacroButtons" style="display: inline-flex; align-items: center; margin-left: 15px; margin-top: 8px; gap: 8px;">';
            
            this.templates.forEach(function(template) {
                buttonsHtml += TemplateSystem.createButton(template);
            });
            buttonsHtml += '</div>';
            
            // Размещаем после панели с иконками
            var targetContainer = container.find('ul.clearfix');
            if (targetContainer.length > 0) {
                targetContainer.after(buttonsHtml);
            } else {
                container.append(buttonsHtml);
            }
        },

        // Инициализация системы шаблонов
        init: function() {
            var self = this;
            var pageType = this.getPageType();
            
            console.log('Тип страницы:', pageType);
            
            // Универсальный обработчик кликов
            $(document).on('click', '.template-btn', function(e) {
                e.preventDefault();
                var templateId = $(this).data('template-id');
                self.applyTemplate(templateId);
            });
            
            // Добавляем шаблоны только для соответствующего типа страницы
            setTimeout(function() {
                if (pageType === 'email') {
                    self.addEmailTemplates();
                } else if (pageType === 'chat') {
                    self.addChatTemplates();
                }
            }, 1000);
        }
    };

    /** КАЛЬКУЛЯТОР СТОИМОСТИ ДОСТАВКИ */
    function initializeCalculator() {
        if ($(INTEGRATION_PANEL_SELECTOR).length === 0) return;

        addCode(INTEGRATION_PANEL_SELECTOR,
            `<div class="info_header clearfix">
                <p>Калькулятор стоимости доставки</p>
            </div>`, true);

        var calculatorHTML = `
            <div id="complexCalculator" style="margin-bottom: 20px;">
                <div style="margin-bottom: 10px;">
                    <label for="calc_weight" style="margin-right: 5px;">Вес <span style="color: #000000; font-weight: 600; font-size: 12px;">(кг)</span></label>
                    <input type="number" id="calc_weight" placeholder="Введите вес" style="right: 23px; position: absolute;">
                </div>
                <div style="margin-bottom: 10px;">
                    <label for="calc_height" style="margin-right: 5px;">Высота <span style="color: #000000; font-weight: 600; font-size: 12px;">(см)</span></label>
                    <input type="number" id="calc_height" placeholder="Введите высоту" style="right: 23px; position: absolute;">
                </div>
                <div style="margin-bottom: 10px;">
                    <label for="calc_width" style="margin-right: 5px;">Ширина <span style="color: #000000; font-weight: 600; font-size: 12px;">(см)</span></label>
                    <input type="number" id="calc_width" placeholder="Введите ширину" style="right: 23px; position: absolute;">
                </div>
                <div style="margin-bottom: 10px;">
                    <label for="calc_length" style="margin-right: 5px;">Длина <span style="color: #000000; font-weight: 600; font-size: 12px;">(см)</span></label>
                    <input type="number" id="calc_length" placeholder="Введите длину" style="right: 23px; position: absolute;">
                </div>
                <div style="margin-bottom: 10px;">
                    <label for="calc_distance" style="margin-right: 5px;">Дистанция <span style="color: #000000; font-weight: 600; font-size: 12px;">(км)</span></label>
                    <input type="number" id="calc_distance" placeholder="Введите дистанцию" style="right: 23px; position: absolute;">
                </div>
                <div style="margin-top: 15px; display: flex; justify-content: space-between;">
                    <button id="refreshCalcBtn" style="padding: 8px 11px 7px 11px; background: #558ffd; color: #fff; border: none; border-radius: 3px; font-size: 13px; letter-spacing: 0.4px; margin-left: -3px;">ОБНОВИТЬ</button>
                    <button id="calculateBtn" style="position: absolute; right: 23px; padding: 8px 10px 7px 10px; background: #29ab30; color: #fff; border: none; border-radius: 3px; font-size: 13px; letter-spacing: 1.1px; width: 154px;">ПОДСЧИТАТЬ</button>
                </div>
                <p style="font-weight: bold; font-size: 14px; color: #000000; margin-top: 15px;">
                    Результат: <span id="calcResult" style="font-weight: bold; font-size: 14px; color: #29ab30;"></span>
                </p>
            </div>`;

        $(INTEGRATION_PANEL_SELECTOR).append(calculatorHTML);

        // Обработчики кнопок калькулятора
        $(document).on('click', '#calculateBtn', function() {
            var weight = parseFloat($('#calc_weight').val()) || 0;
            var height = parseFloat($('#calc_height').val()) || 0;
            var width = parseFloat($('#calc_width').val()) || 0;
            var length = parseFloat($('#calc_length').val()) || 0;
            var distance = parseFloat($('#calc_distance').val()) || 0;

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

            var distanceCost = distance;
            var totalCost = weightCost + volumeCost + distanceCost;

            $('#calcResult').text(totalCost.toFixed(2) + ' рублей');
        });

        $(document).on('click', '#refreshCalcBtn', function() {
            $('#calc_weight, #calc_height, #calc_width, #calc_length, #calc_distance').val('');
            $('#calcResult').text('');
        });
    }

    /** ИНИЦИАЛИЗАЦИЯ */
    $(document).ready(function() {
        console.log('Инициализация кастомизации Omnidesk...');
        
        // Добавляем стили
        addGlobalStyles();
        
        // Инициализируем основной интерфейс
        setTimeout(function() {
            initializeInterface();
            addCustomPanels();
            initializeCalculator();
            TemplateSystem.init();
            console.log('✓ Кастомизация завершена');
        }, 500);
    });
});