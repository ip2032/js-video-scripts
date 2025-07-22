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
     * Данные в этих переменных уже можно использовать, чтобы получить более развернутый результат по Омнидеска
     * https://omnidesk.ru/api/introduction/intro
     */

    var STAFF_ID = CurrentStaffId;

    /**
     * Некоторые селекторы для примеров
     */

    var HORIZONTAL_MENU_SELECTOR = '.header-container';
    var HORIZONTAL_MENU_BUTTONS_SELECTOR = '.global-actions > .global-actions-list:last-child';
    var HORIZONTAL_MENU_ELEMENTS_SELECTOR = '.primary-nav';

    var TOP_PANEL_SELECTOR = '#alpha1_panel';
    var RECORD_SELECTOR = '.req-tr.req-data-row';
    var RECORD_INFO_SELECTOR = '.req-td.req-inf';

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
    if (checkNotUndefined(after) === true && after === true) {
        return $(selector).append(htmlCode).html();
    } else {
        return $(selector).prepend(htmlCode).html();
    }
};
    /** EXAMPLES */
var styleTag = document.createElement('style');
styleTag.textContent = '#alpha1_toolbox .alpha1_toolbox_edit.custom-hidden { display: none !important; }';
document.head.appendChild(styleTag);

$(document).ready(function() {
    $('#alpha1_toolbox .alpha1_toolbox_edit').addClass('custom-hidden');
});

$(document).ready(function() {
    $('#records_list_sorting_chosen .chosen-single').css({
        'color': '#067826',             
        'background': '#ffe3e3',             
        'font-weight': '650',      
        'letter-spacing': '0.6px',      
        'font-size': '12px',      
    });
});

    /**
     * Добавляем кастомную информацию над списком обращений
     *
     * Сначала заголовок
     */

    addCode(
        TOP_PANEL_SELECTOR,
        `<div style=" padding: 4px 0px 0px;">
		<strong><a style="color: #cf15c1 !important; text-decoration: none !important; font-size: 14px; margin-left: 10px;" href="https://st.omnidesk.ru/staff/cases/list/custom/a_${STAFF_ID}">Мои</a></strong>
		<strong><a style="color: #008626 !important; text-decoration: none !important; font-size: 14px; margin-left: 10px;" href="https://st.omnidesk.ru/staff/cases/list/custom/a_0;a_${STAFF_ID};s_1">Открытые</a></strong>
		<strong><a style="color: #c38806 !important; text-decoration: none !important; font-size: 14px; margin-left: 10px;" href="https://st.omnidesk.ru/staff/cases/list/custom/reopen_1">Переоткрытие</a></strong>
	</div>`,
        true
    );

     addCode(
        HORIZONTAL_MENU_ELEMENTS_SELECTOR,
        `<li class="nav-item nav-item-web-link inlb">
            <a class="nav-item-url" href="https://omnidesk.ru">Веб-сайт</a>
        </li>`,
        true
    );



    /**
     * Пример добавления кнопки в блоках справа
     * Результат в коде Омнидеска https://www.dropbox.com/s/i0orxacnfrjwtwo/03_custom_button_in_header.png?dl=0
     */


      addCode(
        HORIZONTAL_MENU_BUTTONS_SELECTOR,
        `<li class="global-action-item inlb kb-link" title="База знаний">
            <a class="nav-item-url" href="https://support.omnidesk.ru/knowledge_base">
                <i class="icon fi-rss" style="background-color: #f5d998 !important;color: #459801 !important;font-size: 17px !important;"></i>
            </a>
        </li>`,
        false
    );

    addCode(
        HORIZONTAL_MENU_BUTTONS_SELECTOR,
        `<li class="global-action-item inlb api-link" title="API" style="margin-right: 4px;">
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
     * Таким образом можно менять и добавлять любые кнопки, формы и код на странице обращения.
     */
});

