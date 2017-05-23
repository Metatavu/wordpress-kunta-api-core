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
    var newRow = table.find('tbody tr:last-of-type').clone();
    newRow.find('input[type="checkbox"]').prop('checked', false);
    newRow.find('input[type="text"]').val('');
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