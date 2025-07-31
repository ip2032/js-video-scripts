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


/* БЫСТРЫЕ ШАБЛОНЫ - ПРАВИЛЬНОЕ РАЗМЕЩЕНИЕ */

// Функция для создания кнопок в правильном месте
var createInlineTemplateButtons = function() {
    // Ищем стабильный контейнер для кнопок
    var attachContainer = $('.attach-wrapper, .attach-first').first();
    
    if (attachContainer.length === 0) {
        // Если не нашли, ищем альтернативные места
        attachContainer = $('[data-name="case[content]"]').parent().find('.attach-wrapper').first();
        if (attachContainer.length === 0) {
            attachContainer = $('.text-area-box').find('.attach-wrapper').first();
        }
    }
    
    if (attachContainer.length > 0 && $('#inlineTemplateButtons').length === 0) {
        console.log('Добавляем кнопки шаблонов рядом с Прикрепить файл');
        
        // Добавляем контейнер для кнопок
        attachContainer.append(`
            <div id="inlineTemplateButtons" style="
                display: inline-block;
                margin-left: 15px;
                vertical-align: top;
            ">
                <span style="
                    color: #666;
                    font-size: 11px;
                    margin-right: 8px;
                ">Шаблоны:</span>
                <a href="#" class="inline-template-btn" data-template="327703" style="
                    color: #e48000;
                    text-decoration: none;
                    margin-right: 8px;
                    font-size: 11px;
                    font-weight: 650;
                    letter-spacing: 0.33px;
                    padding: 2px 5px;
                    border-radius: 3px;
                    background: #fff5e6;
                    border: 1px solid #e48000;
                    transition: all 0.2s ease;
                ">Акция</a>
                <a href="#" class="inline-template-btn" data-template="328169" style="
                    color: #00868f;
                    text-decoration: none;
                    margin-right: 8px;
                    font-size: 11px;
                    font-weight: 650;
                    letter-spacing: 0.33px;
                    padding: 2px 5px;
                    border-radius: 3px;
                    background: #e6f7f8;
                    border: 1px solid #00868f;
                    transition: all 0.2s ease;
                ">Реализация</a>
                <a href="#" class="inline-template-btn" data-template="328170" style="
                    color: #ac00ae;
                    text-decoration: none;
                    font-size: 11px;
                    font-weight: 650;
                    letter-spacing: 0.33px;
                    padding: 2px 5px;
                    border-radius: 3px;
                    background: #f8e6f8;
                    border: 1px solid #ac00ae;
                    transition: all 0.2s ease;
                ">Каталог</a>
            </div>
        `);
        
        // Добавляем стили для эффектов
        $('<style>').prop('type', 'text/css').html(`
            .inline-template-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 2px 4px rgba(0,0,0,0.15);
                opacity: 0.9;
            }
            .inline-template-btn:active {
                transform: translateY(0);
                box-shadow: 0 1px 2px rgba(0,0,0,0.1);
            }
            .inline-template-btn.applying {
                background: #4CAF50 !important;
                color: white !important;
                border-color: #4CAF50 !important;
            }
        `).appendTo('head');
        
        // Привязываем события
        bindInlineTemplateEvents();
        
        return true;
    }
    
    return false;
};

// Функция привязки событий
var bindInlineTemplateEvents = function() {
    // Используем делегирование событий для надежности
    $(document).off('click', '.inline-template-btn');
    $(document).on('click', '.inline-template-btn', function(e) {
        e.preventDefault();
        
        var $btn = $(this);
        var templateId = $btn.data('template');
        var templateName = $btn.text();
        
        console.log('Применяем шаблон:', templateName, templateId);
        
        // Визуальная обратная связь
        $btn.addClass('applying').text('Применяю...');
        
        // Применяем шаблон
        $(`.apply-template[href="template_${templateId}"]`).click();
        
        // Восстанавливаем кнопку через короткое время
        setTimeout(function() {
            $btn.removeClass('applying').text(templateName);
        }, 1000);
        
        // Запускаем восстановление кнопок
        scheduleButtonRestoration();
    });
};

// Функция планирования восстановления кнопок
var scheduleButtonRestoration = function() {
    // Множественные попытки восстановления
    var delays = [100, 300, 500, 800, 1200, 2000];
    
    delays.forEach(function(delay) {
        setTimeout(function() {
            if ($('#inlineTemplateButtons').length === 0) {
                console.log('Восстанавливаем кнопки через', delay, 'ms');
                createInlineTemplateButtons();
            }
        }, delay);
    });
};

// Наблюдатель за изменениями DOM (улучшенная версия)
var setupAdvancedObserver = function() {
    var observer = new MutationObserver(function(mutations) {
        var shouldRestore = false;
        
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                // Проверяем, затронута ли область с кнопками
                var target = mutation.target;
                
                if (target && (
                    $(target).hasClass('attach-wrapper') ||
                    $(target).hasClass('attach-first') ||
                    $(target).hasClass('text-area-box') ||
                    $(target).find('.attach-wrapper').length > 0 ||
                    mutation.removedNodes.length > 0
                )) {
                    shouldRestore = true;
                }
            }
        });
        
        if (shouldRestore && $('#inlineTemplateButtons').length === 0) {
            setTimeout(function() {
                console.log('Восстанавливаем кнопки через MutationObserver');
                createInlineTemplateButtons();
            }, 50);
        }
    });
    
    // Наблюдаем за областью формы
    var formContainer = $('.text-area-box, .message-form').first();
    if (formContainer.length > 0) {
        observer.observe(formContainer[0], {
            childList: true,
            subtree: true
        });
    } else {
        // Fallback - наблюдаем за всем документом
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    return observer;
};

// Инициализация
$(document).ready(function() {
    // Небольшая задержка для загрузки DOM
    setTimeout(function() {
        console.log('Инициализация кнопок шаблонов');
        
        // Создаем кнопки
        var created = createInlineTemplateButtons();
        
        if (created) {
            // Настраиваем наблюдатель
            setupAdvancedObserver();
            
            // Дополнительная защита - периодическая проверка
            setInterval(function() {
                if ($('.attach-wrapper, .attach-first').length > 0 && $('#inlineTemplateButtons').length === 0) {
                    console.log('Восстанавливаем кнопки через интервал');
                    createInlineTemplateButtons();
                }
            }, 5000);
        } else {
            console.log('Не удалось найти место для размещения кнопок, повторная попытка через 2 сек');
            setTimeout(function() {
                createInlineTemplateButtons();
                setupAdvancedObserver();
            }, 2000);
        }
    }, 1000);
});

// Удаляем кнопки из боковой панели если они там есть
$(document).ready(function() {
    setTimeout(function() {
        $('.quick-template-btn').parent().parent().remove();
    }, 500);
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


