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
                 <p style="word-wrap: break-word;"><a href="#" id="open_custom_crm_form" style="color:#078d23; text-decoration: underline;">Создать задачу</a></p>
   

                <h6>Последние сделки</h6>
                    <p style="word-wrap: break-word;"><a href="${URL}/id/${panelCRM.deal1_id}">${panelCRM.deal1_name}</a></p>
                    <p style="word-wrap: break-word;"><a href="${URL}/id/${panelCRM.deal2_id}">${panelCRM.deal2_name}</a></p>
                    <p style="word-wrap: break-word;"><a href="${URL}/create_deal" style="color: #078d23; text-decoration: underline;">Создать сделку</a></p>

                <h6>Общая сумма сделок</h6>
                    <p style="word-wrap: break-word;">${panelCRM.sum} р.</p>

            </div>`,
            true
        );

        // Function to handle the click event for showing the custom CRM form
        $(document).on('click', '#open_custom_crm_form', function(event) {
            event.preventDefault(); // Prevent the default behavior of the link
            $('#custom_crm_form').show(); // Show the custom CRM form
        });
    });
});

