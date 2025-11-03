$(function() {
    /**
     * ПОДСВЕТКА ТЕМ ЧАТОВ
     */
    const knownChatGroups = [
        'Тест JS',
        'Обсуждение багов',
        'Продажи WA',
        'Клиенты Telegram',
    ];
    
    const $title = $('#current_subject span:first');
    if ($title.length > 0) {
        let fullTitle = $title.text().trim();
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
    }

    /**
     * СКРЫТИЕ И ДЕАКТИВАЦИЯ ЭЛЕМЕНТОВ ИНТЕРФЕЙСА
     */
    $(document).ready(function() {
        // Добавляем CSS для скрытия и деактивации элементов
        if ($('#custom-hide-styles').length === 0) {
            $('<style id="custom-hide-styles"></style>')
                .text(
                    '/* Скрыть ссылку Переслать */' +
                    'i.icon-share-alt, i.fa-share, i[title="Переслать"], a[href*="forward"], .forward-link { display: none !important; }' +
                    '/* Скрыть кнопку Создать обращение */' +
                    'li.global-action-item[title*="Создать обращение"] { display: none !important; }' +
                    '/* Деактивировать ссылку редактировать */' +
                    'a.info_edit { color: #cccccc !important; pointer-events: none !important; cursor: default !important; text-decoration: none !important; }' +
                    '/* Скрыть ссылку сохранить */' +
                    'a.info_save { display: none !important; }'
                )
                .appendTo('head');
        }
    });

    /**
     * ИКОНКА ОБНОВЛЕНИЯ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
     */
    function addRefreshIcon() {
        const $userDataHeader = $('.info_header p:contains("ДАННЫЕ ПОЛЬЗОВАТЕЛЯ")').filter(function() {
            return $(this).text().trim() === 'ДАННЫЕ ПОЛЬЗОВАТЕЛЯ';
        }).first();
        
        if ($userDataHeader.length === 0) return;
        if ($userDataHeader.find('.refresh-user-data').length > 0) return;
        
        if ($('#refresh-user-data-styles').length === 0) {
            $('<style id="refresh-user-data-styles"></style>')
                .text(
                    '.refresh-user-data { color: #2563eb; cursor: pointer; margin-left: 8px; font-size: 12px; transition: all 0.2s ease; display: inline-block; }' +
                    '.refresh-user-data:hover { color: #1d4ed8; transform: scale(1.1); }' +
                    '.refresh-user-data.loading { animation: spin-refresh 0.6s linear; pointer-events: none; }' +
                    '@keyframes spin-refresh { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }'
                )
                .appendTo('head');
        }
        
        const $icon = $('<i class="fas fa-sync-alt refresh-user-data" title="Обновить данные пользователя"></i>');
        $userDataHeader.append($icon);
        
        $icon.on('click', function() {
            const $this = $(this);
            if ($this.hasClass('loading')) return;
            
            $this.addClass('loading');
            
            fetchUserData().then(() => {
                setTimeout(() => {
                    $this.removeClass('loading');
                }, 600);
            });
        });
    }
    
    function fetchUserData() {
        return new Promise((resolve) => {
            // TODO: Ваш код для получения данных со стороннего ресурса
            setTimeout(() => {
                resolve();
            }, 500);
        });
    }
    
    setTimeout(addRefreshIcon, 500);
    setTimeout(addRefreshIcon, 1500);

    /**
     * ВСЁ ОСТАЛЬНОЕ
     */
    var URL = 'https://omnidesk.ru';
    var CASE_ID = CurrentCaseId;
    var CASE_URL = document.location.href;

    var HORIZONTAL_MENU_SELECTOR = '.header-container';
    var HORIZONTAL_MENU_BUTTONS_SELECTOR = '.global-actions > .global-actions-list:last-child';
    var HORIZONTAL_MENU_ELEMENTS_SELECTOR = '.primary-nav';

    var INTEGRATION_PANEL_SELECTOR = '#integrations_info_panel';
    var INFORMATION_PANEL_SELECTOR = '#info_user_info_panel';

    var checkNotUndefined = function(data) {
        return (typeof data === 'undefined') ? false : true;
    }

    var addCode = function(selector, htmlCode, after) {
        var element = $(selector);
        if(checkNotUndefined(after) === true && after === true) {
            element.append(htmlCode);
        } else {
            element.prepend(htmlCode);
        }
    };

    $(document).ready(function() {
        $('select[name="field_7608"]').prop('disabled', true).trigger('chosen:updated');
    });

    $(document).ready(function() {
        var container = $('#new_case_sender_chosen');
        container.find('.chosen-single span').css({
                'color': '#c43117',
                'font-weight' : '700'
        });
    });

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

    addCode(
        HORIZONTAL_MENU_ELEMENTS_SELECTOR,
        '<li class="nav-item nav-item-web-link inlb"><a class="nav-item-url" href="https://omnidesk.ru">Веб-сайт</a></li>',
        true
    );

    addCode(
        HORIZONTAL_MENU_BUTTONS_SELECTOR,
        '<li class="global-action-item inlb kb-link" title="База знаний"><a class="nav-item-url" href="https://support.omnidesk.ru/knowledge_base"><i class="icon fi-rss" style="margin-left: 4px;background-color: #f5d998 !important;color: #459801 !important;font-size: 17px !important;"></i></a></li>',
        false
    );	

    addCode(
        HORIZONTAL_MENU_BUTTONS_SELECTOR,
        '<li class="global-action-item inlb api-link" title="API"><a class="nav-item-url" href="https://omnidesk.ru/api/introduction#intro"><i class="icon fi-key"></i></a></li>',
        false
    );

    $(document).find(HORIZONTAL_MENU_SELECTOR).css({
        'border-bottom': 'solid 3px #44BE69',
    });

    $(document)
        .find('body')
        .append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css">');    

    addCode(
        INFORMATION_PANEL_SELECTOR,
        '<div class="info_header clearfix"><p>КАСТОМНАЯ ПАНЕЛЬ</p></div>',
        true
    );

    var UserInformation = {
        id: 25553,
        name: 'Марк Бессонов',
        tariff_name: 'Максимальный',
        support_type: 'Постоянная'
    };

    addCode(
        INFORMATION_PANEL_SELECTOR,
        '<div class="info_fields"><h6>Логин</h6><p style="word-wrap: break-word;">#' + UserInformation.id + '</p><h6>Ссылка на профиль</h6><p style="word-wrap: break-word;"><a href="' + URL + '/id/' + UserInformation.id + '">' + UserInformation.name + '</a></p><h6>Тариф</h6><p style="word-wrap: break-word;">' + UserInformation.tariff_name + '</p><h6>Тип поддержки</h6><p style="word-wrap: break-word;">' + UserInformation.support_type + '</p></div>',
        true
    );
        
    addCode(
        INFORMATION_PANEL_SELECTOR,
        '<div class="info_header clearfix"><p>КАСТОМНАЯ CRM</p></div>',
        true
    );
    
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

    addCode(
        INFORMATION_PANEL_SELECTOR,
        '<div class="info_fields"><h6>Последние задачи</h6><p style="word-wrap: break-word;"><a href="' + URL + '/id/' + panelCRM.task1_id + '">' + panelCRM.task1_name + '</a></p><p style="word-wrap: break-word;"><a href="' + URL + '/id/' + panelCRM.task2_id + '">' + panelCRM.task2_name + '</a></p><p style="word-wrap: break-word;"><a href="' + URL + '/createtask" style="color:#078d23; text-decoration: underline;">Создать задачу</a></p><h6>Последние сделки</h6><p style="word-wrap: break-word;"><a href="' + URL + '/id/' + panelCRM.deal1_id + '">' + panelCRM.deal1_name + '</a></p><p style="word-wrap: break-word;"><a href="' + URL + '/id/' + panelCRM.deal2_id + '">' + panelCRM.deal2_name + '</a></p><p style="word-wrap: break-word;"><a href="' + URL + '/create_deal" style="color: #078d23; text-decoration: underline;">Создать сделку</a></p><h6>Общая сумма сделок</h6><p style="word-wrap: break-word;">💰 ' + panelCRM.sum + ' р.</p></div>',
        true
    );
    
    /* БЫСТРЫЕ ШАБЛОНЫ */
    var TemplateButtons = {
        initialized: false,
        
        init: function() {
            if (this.initialized) return;
            $('[data-template]').remove();
            $('#templateButtons').remove();
            this.addEmailTemplates();
            this.initialized = true;
        },

        addEmailTemplates: function() {
            var attachFirst = $('.attach-first');
            if (attachFirst.length > 0) {
                var templateButtons = '<div id="templateButtons" class="atach-items fl-left" style="margin-left: 15px;"><a href="#" data-template="327703" style="color: #e48000; text-decoration: none; margin-right: 10px; font-size: 11px; font-weight: 650; letter-spacing: 0.33px;">Скидки</a><a href="#" data-template="328169" style="color: #00868f; text-decoration: none; margin-right: 10px; font-size: 11px; font-weight: 650; letter-spacing: 0.33px;">Доставка</a><a href="#" data-template="328170" style="color: #ac00ae; text-decoration: none; margin-right: 10px; font-size: 11px; font-weight: 650; letter-spacing: 0.33px;">Каталог</a></div>';
                attachFirst.find('.attach-button').after(templateButtons);
            }
        },
        
        restore: function() {
            var self = this;
            var delays = [200, 500, 1000, 1500, 2000];
            
            delays.forEach(function(delay) {
                setTimeout(function() {
                    if ($('#templateButtons').length === 0 && $('.attach-first').length > 0) {
                        self.initialized = false;
                        self.init();
                    }
                }, delay);
            });
        }
    };

    $(document).off('click', '[data-template]').on('click', '[data-template]', function(e) {
        e.preventDefault();
        var templateId = $(this).data('template');
        $('.apply-template[href="template_' + templateId + '"]').click();
        TemplateButtons.restore();
    });

    var setupTemplateObserver = function() {
        var observer = new MutationObserver(function(mutations) {
            var needRestore = false;
            
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    var target = mutation.target;
                    if (target && (
                        $(target).hasClass('attach-wrapper') ||
                        $(target).hasClass('attach-first') ||
                        $(target).hasClass('text-area-box') ||
                        $(target).find('.attach-first').length > 0
                    )) {
                        needRestore = true;
                    }
                }
            });
            
            if (needRestore && $('#templateButtons').length === 0) {
                setTimeout(function() {
                    TemplateButtons.initialized = false;
                    TemplateButtons.init();
                }, 100);
            }
        });
        
        var formContainer = $('.text-area-box, .answer-action-box').first();
        if (formContainer.length > 0) {
            observer.observe(formContainer[0], {
                childList: true,
                subtree: true
            });
        } else {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    };

    $(document).ready(function() {
        setTimeout(function() { 
            TemplateButtons.init();
            setupTemplateObserver();
            
            setInterval(function() {
                if ($('.attach-first').length > 0 && $('#templateButtons').length === 0) {
                    TemplateButtons.initialized = false;
                    TemplateButtons.init();
                }
            }, 5000);
        }, 1000);
    });

    /* КАЛЬКУЛЯТОР */
    addCode( 
        INTEGRATION_PANEL_SELECTOR, 
        '<div class="info_header clearfix"><p>Калькулятор стоимости доставки</p></div>',
        true 
    );
    
    var addComplexCalculator = function(containerSelector) { 
        var calculatorHTML = '<div id="complexCalculator" style="margin-bottom: 20px;"><div style="margin-bottom: 10px;"><label for="weight" style="margin-right: 5px;">Вес <span style="color: #000000; font-weight: 600; font-size: 12px;">(кг)</span></label><input type="number" id="weight" placeholder="Введите вес" style="right: 23px; position: absolute;"></div><div style="margin-bottom: 10px;"><label for="height" style="margin-right: 5px;">Высота <span style="color: #000000; font-weight: 600; font-size: 12px;">(cм)</span></label><input type="number" id="height" placeholder="Введите высоту" style="right: 23px; position: absolute;"></div><div style="margin-bottom: 10px;"><label for="width" style="margin-right: 5px;">Ширина <span style="color: #000000; font-weight: 600; font-size: 12px;">(cм)</span></label><input type="number" id="width" placeholder="Введите ширину" style="right: 23px; position: absolute;"></div><div style="margin-bottom: 10px;"><label for="length" style="margin-right: 5px;">Длина <span style="color: #000000; font-weight: 600; font-size: 12px;">(cм)</span></label><input type="number" id="length" placeholder="Введите длину" style="right: 23px; position: absolute;"></div><div style="margin-bottom: 10px;"><label for="distance" style="margin-right: 5px;">Дистанция <span style="color: #000000; font-weight: 600; font-size: 12px;">(км)</span></label><input type="number" id="distance" placeholder="Введите дистанцию" style="right: 23px; position: absolute;"></div><div id="buttonsContainer" style="margin-top: 15px; display: flex; justify-content: space-between;"><button id="refreshBtn" style="padding: 8px 10px 7px 10px; background: #558ffd; color: #fff; border: none; border-radius: 3px; font-size: 13px; letter-spacing: 0.4px; margin-left: -3px;">ОБНОВИТЬ</button><button id="calculateBtn" style="position: absolute; right: 23px; padding: 8px 11px 7px 11px; background: #29ab30; color: #fff; border: none; border-radius: 3px; font-size: 13px; letter-spacing: 1.1px; width: 154px">ПОДСЧИТАТЬ</button></div><p id="resultLabel" style="font-weight: bold; font-size: 14px; color: #000000; margin-top: 15px;">Результат: <span id="resultValue" style="font-weight: bold; font-size: 14px; color: #29ab30; right: 5px;"></span></p></div>';

        $(containerSelector).append(calculatorHTML);

        $(containerSelector).on('click', '#calculateBtn', function() {
            calculateCost();
        });

        $(containerSelector).on('click', '#refreshBtn', function() {
            $('#weight, #height, #width, #length, #distance').val(''); 
            $('#resultValue').text('');
        });
    };

    var calculateCost = function() { 
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
        
        var distanceCost = distance;
        var totalCost = weightCost + volumeCost + distanceCost;
    
        $('#resultValue').text(totalCost.toFixed(2) + ' рублей');
    };
    
    $(document).ready(function() {    
        addComplexCalculator('#integrations_info_panel');
    });
    
});
