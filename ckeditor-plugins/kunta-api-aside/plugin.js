CKEDITOR.plugins.add( 'kunta-api-aside', {
    icons: 'kunta-api-aside',
    init: function(editor) {
      editor.addContentsCss(this.path + 'contents.css');
      
      editor.ui.addButton( 'kunta-api-aside', {
        label: 'Lisää sivupalkki',
        command: 'kunta-api-aside',
        toolbar: 'insert'
      });
      
      editor.addCommand("kunta-api-aside", { 
        exec: function(editor) {
          var aside = editor.document.findOne('.kunta-api-aside');
          if (aside) {
            aside.addClass('kunta-api-aside-highlight');
            aside.$.scrollIntoView();
            setTimeout(function () {
              aside.removeClass('kunta-api-aside-highlight');  
            }, 500);
          } else {
            var selection = editor.getSelection();
            var currentContents = selection.getRanges()[0].extractContents();
            var asideContents = CKEDITOR.dom.element.createFromHtml('<div class="kunta-api-aside-contents"/>', editor.document);
            asideContents.append(currentContents);
            var asideElement = CKEDITOR.dom.element.createFromHtml('<aside class="kunta-api-aside"/>');
            asideElement.append(asideContents);
            editor.document.getBody().append(asideElement);
          }
        }
      });
    }
});