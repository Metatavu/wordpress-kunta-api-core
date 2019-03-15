(function($) {
  'use strict';
  
  function updateValue() {
    $('.settings-table').each(function (index, table) {
      var tables = $.map($(table).find('tbody tr'), function (row) {
        var result = {};

        $(row).find('input').each(function (index, input) {
          var column = $(input).attr('data-column');
          if ($(input).is('[type="checkbox"]')) {
            result[column] = $(input).is(':checked') ? '1' : '0';
          } else {
            result[column] = $(input).val();
          }
        });

        return result;
      });

      $('input#' + $(table).attr('data-table-name')).attr('value',JSON.stringify(tables));  
    });    
  }
  
  $(document).on('click', '.add-settings-table-row', function (event) {
    var tableId = $(event.target).attr('data-table-name');
    var table = $('table[data-table-name="' + tableId + '"');
    var settings = JSON.parse(table.attr('data-table-settings'));
    var newRow = $("<tr>");
    var fieldNames = Object.keys(settings.fields);

    for (var i = 0; i < fieldNames.length; i++) {
      var fieldName = fieldNames[i];
      var fieldSettings = settings.fields[fieldName];
      var cell = $("<td>").appendTo(newRow);
      var input = $("<input>").attr({ "type": fieldSettings.type, "data-column": fieldName }).appendTo(cell);

      switch (fieldSettings.type) {
        case "checkbox":
          input.attr("value", "1");
        break;
        case "text":
          input.attr("style", "width: 100%");
        break;
      }
    } 

    table.find('tbody').append(newRow);
    updateValue();
  });
  
  $(document).on('click', '.settings-table-delete-row', function (event) {
    $(event.target).closest('tr').remove();
    updateValue();
  });
  
  $(document).ready(function () {
    updateValue();
  });
  
  $(document).on('change', 'table.settings-table input', function (event) {
    updateValue();
  });
  
})(jQuery);