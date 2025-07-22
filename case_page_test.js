$(function() {
    var URL = 'https://st.omnidesk.ru';

    var INTEGRATION_PANEL_SELECTOR = '#integrations_info_panel';

    /** HELPERS */
    var checkNotUndefined = function(data) {
        return typeof data !== 'undefined';
    };

    var addCode = function(selector, htmlCode, after) {
        var element = $(selector);
        if (checkNotUndefined(after) && after) {
            element.append(htmlCode);
        } else {
            element.prepend(htmlCode);
        }
    };

    $(document).ready(function() {
        // Добавляем заголовок для кастомной CRM
        addCode(
            INTEGRATION_PANEL_SELECTOR,
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
        };

        // Create a function to add options to a select element
        var addOptionsToSelect = function(selectElement, options) {
            options.forEach(function(option) {
                var optionElement = $('<option>', {
                    value: option.value,
                    text: option.text
                });
                selectElement.append(optionElement);
            });
        };

        // Define the options for the select elements
        var userOptions = [
            { value: '60', text: '#60 | Алексей Петров' }
        ];

        var performerOptions = [
            { value: '16', text: 'Иван' }
        ];

        // Create the form elements
        var form = $('<form>', {
            method: 'POST',
            id: 'custom_crm_form',
            style: 'display: none;' // Initially hide the form
        });

        var userSelect = $('<select>', {
            required: 'required',
            class: 'form-it search-form-it select-box select-for-nano',
            id: 'custom_crm_task_name',
            name: 'type'
        });
        addOptionsToSelect(userSelect, userOptions);

        var performerSelect = $('<select>', {
            required: 'required',
            class: 'form-it search-form-it select-box select-for-nano',
            id: 'custom_crm_task_performer',
            name: 'type'
        });
        addOptionsToSelect(performerSelect, performerOptions);

        // Append form elements to the form
        form.append(userSelect, performerSelect);

        // Create the buttons
        var createTaskButton = $('<button>', {
            class: 'btn_save active',
            text: 'Создать задачу',
            click: function(event) {
                createTaskInCRM(event);
            }
        });

        var spinnerButton = $('<button>', {
            class: 'btn_save_spin',
            style: 'display:none;'
        }).append($('<i>', {
            class: 'fas fa-spinner fa-spin'
        }));

        var buttonsDiv = $('<div>', {
            class: 'links clearfix',
            style: 'margin-top: 20px;'
        });
        buttonsDiv.append(createTaskButton);
        buttonsDiv.append(spinnerButton);

        // Append the buttons to the form
        form.append(buttonsDiv);

        // Append the form to the modal container
        $('#custom_crm-modal').append(form);

        // Function to handle the click event for creating a task in custom CRM
        function createTaskInCRM(event) {
            event.preventDefault(); // Prevent the default behavior of the button click
            // Add your code here to create a task in the custom CRM
            console.log('Task creation process initiated...');
            // You can add AJAX request here to create a task
        }

        //Отображаем эту информацию и стилизуем активные ссылки
        addCode(
            INTEGRATION_PANEL_SELECTOR,
            `<div class="info_fields">

                <h6>Последние задачи</h6>
                    <p style="word-wrap: break-word;"><a href="${URL}/id/${panelCRM.task1}"</a>${panelCRM.task1_name}</p>
                    <p style="word-wrap: break-word;"><a href="${URL}/id/${panelCRM.task2}"</a>${panelCRM.task2_name}</p>
                 <p style="word-wrap: break-word;"><a class="modal-trigger" id="#open_custom_crm_form" style="color:#078d23; text-decoration: underline;">Создать задачу</a></p>
   

                <h6>Последние сделки</h6>
                    <p style="word-wrap: break-word;"><a href="${URL}/id/${panelCRM.deal1_id}">${panelCRM.deal1_name}</a></p>
                    <p style="word-wrap: break-word;"><a href="${URL}/id/${panelCRM.deal2_id}">${panelCRM.deal2_name}</a></p>
                    <p style="word-wrap: break-word;"><a href="${URL}/create_deal" style="color: #078d23; text-decoration: underline;">Создать сделку</a></p>

                <h6>Общая сумма сделок</h6>
                    <p style="word-wrap: break-word;">${panelCRM.sum} р.</p>

            </div>`,
            true
        );

        var body = ('webkit chrome win');
        function customModal (){
            addCode(
                body, 
                `
                <div class="mfp-bg mfp-ready"></div>
                <div class="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready" style="overflow: hidden auto;">
                <div class="mfp-container mfp-s-ready mfp-inline-holder">
                <div class="mfp-content">
                <div id="customCRM-modal" class="modal-cont integrations-modal customCRM-modal-cont">
                <h4>Создать новую задачу в customCRM</h4>
                <form method="POST" id="customcrm_form">
                    <div id="customcrm_list_cb" class="merge-search-results-list form-element">
                        <div style="float: left; width: 50%;">
                            <label class="select-lbl">
                                <span class="lbl normal-send">Пользователь</span>
                                <select required="" class="form-it search-form-it select-box select-for-nano" id="customcrm_task_name" name="type">
                                                                        <option value="61" selected="">
                                            #61 | Андрей Щербаков                                    </option>
                                                                </select>
                            </label>
                        </div>
                        <div style="float: left; width: 50%; padding-left: 10px; box-sizing: border-box;">
                            <label class="select-lbl">
                                <span class="lbl normal-send">Исполнитель</span>
                                <select required="" class="form-it search-form-it select-box select-for-nano" id="customcrm_task_performer" name="type">
                                                                        <option value="16" selected="">
                                            Иван                                    </option>
                                                                </select>
                            </label>
                        </div>
                        <div class="clearfix"></div>
                        <label class="select-lbl">
                            <span class="lbl normal-send">Что сделать?</span>
                            <input required="" class="form-it search-form-it" type="text" id="customcrm_task_text" name="text">
                        </label>
                        <div class="clearfix"></div>
                        <div style="float: left; width: 70%;">
                            <label class="select-lbl">
                                <span class="lbl normal-send">Дата исполнения</span>
                                <input required="" pattern="\d{2}\.\d{2}\.\d{4}" class="form-it search-form-it customcrm_task_date" type="text" id="customcrm_task_date" name="text">
                            </label>
                        </div>
                        <div style="float: left; width: 30%; padding-left: 10px; box-sizing: border-box;">
                            <label class="select-lbl">
                                <span class="lbl normal-send">Время</span>
                                <select required="" class="form-it search-form-it select-box select-for-nano" id="customcrm_task_time" name="type">
                                    <option value="" selected="selected"></option>
                                    <option value="00:00" data-hour="0" disabled="disabled">00:00</option>
                                    <option value="01:00" data-hour="1" disabled="disabled">01:00</option>
                                    <option value="02:00" data-hour="2" disabled="disabled">02:00</option>
                                    <option value="03:00" data-hour="3" disabled="disabled">03:00</option>
                                    <option value="04:00" data-hour="4" disabled="disabled">04:00</option>
                                    <option value="05:00" data-hour="5" disabled="disabled">05:00</option>
                                    <option value="06:00" data-hour="6" disabled="disabled">06:00</option>
                                    <option value="07:00" data-hour="7" disabled="disabled">07:00</option>
                                    <option value="08:00" data-hour="8" disabled="disabled">08:00</option>
                                    <option value="09:00" data-hour="9" disabled="disabled">09:00</option>
                                    <option value="10:00" data-hour="10" disabled="disabled">10:00</option>
                                    <option value="11:00" data-hour="11">11:00</option>
                                    <option value="12:00" data-hour="12">12:00</option>
                                    <option value="13:00" data-hour="13">13:00</option>
                                    <option value="14:00" data-hour="14">14:00</option>
                                    <option value="15:00" data-hour="15">15:00</option>
                                    <option value="16:00" data-hour="16">16:00</option>
                                    <option value="17:00" data-hour="17">17:00</option>
                                    <option value="18:00" data-hour="18">18:00</option>
                                    <option value="19:00" data-hour="19">19:00</option>
                                    <option value="20:00" data-hour="20">20:00</option>
                                    <option value="21:00" data-hour="21">21:00</option>
                                    <option value="22:00" data-hour="22">22:00</option>
                                    <option value="23:00" data-hour="23">23:00</option>
                                </select>
                            </label>
                        </div>
                        <div class="clearfix"></div>
                        <label class="select-lbl">
                            <span class="lbl normal-send">Комментарий</span>
                            <textarea rows="4" class="form-it search-form-it" id="customcrm_task_description" name="description"></textarea>
                        </label>
                    </div>
                    <div class="links clearfix" style="margin-top: 20px;">
                        <button class="btn_save active" onclick="AddTaskToCustomCRM(event)">Создать задачу</button>
                        <button class="btn_save_spin" style="display:none;"><i class="fas fa-spinner fa-spin"></i></button>
                    </div>
                </form>
            <div title="Закрыть (Esc)" class="modal-close mfp-close"><i class="icon-remove fas fa-times"></i></div></div></div></div></div>`,
                true
            )
        }
        // Function to handle the click event for showing the custom CRM form
        const open_crm = document.getElementById('#open_custom_crm_form');
        open_crm.addEventListener('click', (evt) =>{
            customModal();
            evt.preventDefault();
        });
        // $(document).on('click', '#open_custom_crm_form', function(event) {
        //     event.preventDefault(); // Prevent the default behavior of the link
        //     customModal();
        // });
    });
});

