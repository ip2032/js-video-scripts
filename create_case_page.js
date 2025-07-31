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

    // CSS для выравнивания кнопок шаблонов с "Прикрепить файл"
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
            'background': '#ffeaea',
            'border-color': '#dadada',
            'box-shadow': '0 0 3px #ffeaea inset, 0 1px 1px rgba(0,0,0,.1)'
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
/* БЫСТРЫЕ ШАБЛОНЫ - ФИНАЛЬНАЯ ВЕРСИЯ БЕЗ КОНФЛИКТОВ */

// Функция для добавления кнопок шаблонов
var TemplateButtons = {
    initialized: false,
    
    init: function() {
        // Защита от повторной инициализации
        if (this.initialized) {
            return;
        }
        
        // Удаляем все существующие кнопки
        $('#templateButtons, #macroButtonsContainer, #simpleTemplateButtons').remove();
        
        this.addTemplateButtons();
        this.initialized = true;
    },

    addTemplateButtons: function() {
        // Ищем контейнер .attach-first
        var attachFirst = $('.attach-first');
        if (attachFirst.length > 0) {
            console.log('Добавляем кнопки шаблонов');
            
            // Делаем родительский контейнер flex для размещения в одну строку
            attachFirst.parent().css({
                'display': 'flex',
                'align-items': 'center',
                'flex-wrap': 'nowrap'
            });
            
            // Добавляем кнопки ПОСЛЕ .attach-first, но в том же контейнере
            var templateButtons = `
                <div id="templateButtons" style="
                    display: flex;
                    align-items: center;
                    margin-left: 15px;
                    gap: 10px;
                ">
                    <a href="#" class="template-btn" data-template="327703" style="
                        color: #e48000;
                        text-decoration: none;
                        font-size: 11px;
                        font-weight: 650;
                        letter-spacing: 0.33px;
                        padding: 2px 4px;
                        border-radius: 2px;
                        display: inline-block;
                    ">Акция</a>
                    <a href="#" class="template-btn" data-template="328169" style="
                        color: #00868f;
                        text-decoration: none;
                        font-size: 11px;
                        font-weight: 650;
                        letter-spacing: 0.33px;
                        padding: 2px 4px;
                        border-radius: 2px;
                        display: inline-block;
                    ">Реализация</a>
                    <a href="#" class="template-btn" data-template="328170" style="
                        color: #ac00ae;
                        text-decoration: none;
                        font-size: 11px;
                        font-weight: 650;
                        letter-spacing: 0.33px;
                        padding: 2px 4px;
                        border-radius: 2px;
                        display: inline-block;
                    ">Каталог</a>
                </div>
            `;
            
            // Добавляем ПОСЛЕ .attach-first
            attachFirst.after(templateButtons);
            
            console.log('Кнопки шаблонов добавлены успешно');
            return true;
        } else {
            console.log('Контейнер .attach-first не найден');
            return false;
        }
    },
    
    // Функция восстановления кнопок
    restore: function() {
        var self = this;
        console.log('Запускаем восстановление кнопок');
        
        // Множественные попытки восстановления
        var delays = [100, 300, 500, 800, 1200, 2000, 3000];
        
        delays.forEach(function(delay) {
            setTimeout(function() {
                if ($('#templateButtons').length === 0 && $('.attach-first').length > 0) {
                    console.log('Восстанавливаем кнопки через', delay, 'ms');
                    self.initialized = false;
                    self.init();
                }
            }, delay);
        });
    }
};

// Обработчик клика по кнопкам шаблонов с предотвращением всплытия
$(document).off('click', '.template-btn').on('click', '.template-btn', function(e) {
    // КРИТИЧЕСКИ ВАЖНО: предотвращаем все формы всплытия события
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    
    var templateId = $(this).data('template');
    var templateName = $(this).text();
    
    console.log('Применяем шаблон:', templateName, templateId);
    
    // Визуальная обратная связь
    $(this).css('opacity', '0.5').text('Применяю...');
    
    // Применяем шаблон
    $(`.apply-template[href="template_${templateId}"]`).click();
    
    // Восстанавливаем текст кнопки
    var $btn = $(this);
    setTimeout(function() {
        $btn.css('opacity', '1').text(templateName);
    }, 1000);
    
    // Запускаем восстановление кнопок
    TemplateButtons.restore();
    
    // Возвращаем false для дополнительной защиты
    return false;
});

// Улучшенный наблюдатель за изменениями DOM
var setupTemplateObserver = function() {
    var observer = new MutationObserver(function(mutations) {
        var needRestore = false;
        
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                var target = mutation.target;
                
                // Проверяем различные сценарии когда могут исчезнуть кнопки
                if (target && (
                    $(target).hasClass('attach-wrapper') ||
                    $(target).hasClass('attach-first') ||
                    $(target).hasClass('text-area-box') ||
                    $(target).hasClass('answer-action-box') ||
                    $(target).find('.attach-first').length > 0 ||
                    // Проверяем если были удалены узлы
                    mutation.removedNodes.length > 0
                )) {
                    needRestore = true;
                }
            }
        });
        
        if (needRestore && $('#templateButtons').length === 0) {
            setTimeout(function() {
                if ($('.attach-first').length > 0) {
                    console.log('Восстанавливаем кнопки через MutationObserver');
                    TemplateButtons.initialized = false;
                    TemplateButtons.init();
                }
            }, 50);
        }
    });
    
    // Наблюдаем за областью с формой
    var containers = ['.text-area-box', '.answer-action-box', '.attach-wrapper'];
    var targetContainer = null;
    
    for (var i = 0; i < containers.length; i++) {
        var container = $(containers[i]).first();
        if (container.length > 0) {
            targetContainer = container[0];
            break;
        }
    }
    
    if (targetContainer) {
        observer.observe(targetContainer, {
            childList: true,
            subtree: true
        });
        console.log('MutationObserver настроен для:', targetContainer.className);
    } else {
        // Fallback - наблюдаем за всем документом
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        console.log('MutationObserver настроен для document.body (fallback)');
    }
};

// Инициализация
$(document).ready(function() {
    setTimeout(function() { 
        var success = TemplateButtons.init();
        
        if (success) {
            setupTemplateObserver();
            
            // Дополнительная защита - проверка каждые 5 секунд
            setInterval(function() {
                if ($('.attach-first').length > 0 && $('#templateButtons').length === 0) {
                    console.log('Восстанавливаем кнопки через интервал (5 сек)');
                    TemplateButtons.initialized = false;
                    TemplateButtons.init();
                }
            }, 5000);
            
            console.log('Система кнопок шаблонов инициализирована успешно');
        } else {
            // Повторная попытка через 2 секунды
            setTimeout(function() {
                console.log('Повторная попытка инициализации через 2 сек');
                TemplateButtons.init();
                setupTemplateObserver();
            }, 2000);
        }
    }, 1000);
});
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


