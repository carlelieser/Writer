// Writer
// Version 5.4
// Author : Carlos E. Santos
// Made with <3
$(document).ready(function() {

    //define global variables
    var $documentList = $('.document-list'),
        $mainContainer = $('.main-container'),
        $sideBar = $('.sidebar'),
        $sideToggle = $('.sidebar-toggle'),
        $settings = $('.settings-container'),
        $modal = $('.modal'),
        $bg = $('.bg');

    //loading screen
    var $loadingScreen = $('.loading-screen');

    //setting toggles
    var $toggle = $('.toggle');

    //specific toggles
    var $coffeeMode = $('.coffee'),
        $nightMode = $('.night'),
        $fullScreen = $('.full'),
        $statistics = $('.statistics'),
        $focus = $('.focus');

    //settings option
    var $settingsOption = $('.settings-option'),
        $optionContainer = $('.option');

    var $fontChildren = $('.font-options').children(),
        $sizeChildren = $('.font-size-options').children(),
        $themeChildren = $('.theme-options').children(),
        $lineChildren = $('.line-options').children();

    //modals
    var $documentContainer = $('.document-container'),
        $settingsContainer = $('.settings-container');

    //modal triggers
    var $docButton = $('.open-documents'),
        $settingsButton = $('.open-settings'),
        $modalClose = $('.modal-close');

    //sidebar buttons
    var $new = $('.new'),
        $open = $('.open'),
        $save = $('.save'),
        $saveAs = $('.save-as');

    var beizer = $.bez([.55, 0, .1, 1]);

    //useful for setting up chooseEntry
    var accepts = [{
        mimeTypes: ['text/*'],
        extensions: [
            'html',
            'htm',
            'txt',
            'md',
            'docx',
            'wtr'
        ]
    }];

    //default configuration
    var defaults = {
        coffee: false,
        night: false,
        full: false,
        statistics: false,
        focus: true,
        font: 'Charter',
        size: '18px',
        theme: 'default',
        line: 'single'
    }

    //this will dynamically change based
    //on user input
    var settings = {
        coffee: false,
        night: false,
        full: false,
        statistics: false,
        focus: true,
        font: 'Charter',
        size: '18px',
        theme: 'default',
        line: 'single'
    }

    function changeSettings(key, val){
        settings[key] = val;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function loadSettings(config){
        settings = config;
        for (var key in config) {
          if (config.hasOwnProperty(key)) {
              var value = config[key];
              var excluded = ['font', 'size', 'theme'];

              if(excluded.indexOf(key) > -1){
                  var correspondingDropdown;
                  if(key == 'size'){
                      correspondingDropdown = '.font-' + key + '-options';
                  }else{
                      correspondingDropdown = '.' + key + '-options';
                  }

                  $(correspondingDropdown).children().removeClass('active');

                  $(correspondingDropdown).children().filter(function(){
                      return $(this).text() == capitalizeFirstLetter(value);
                  }).each(function(){
                      $(this).click();
                      setTimeout(function(){
                          //make sure all dropdowns are hidden
                          //with height : 0
                          $optionContainer.css('height', '0');
                          $optionContainer.hide();
                      }, 200);
                  });

              }else{
                  //convert value into active or inactive
                  if(value === false){
                      value = 'toggle-inactive';
                  }else{
                      value = 'toggle-active'
                  }

                  if(value == 'toggle-active'){
                      $('.' + key).click();
                  }

                  if(key == 'focus' && value == 'toggle-inactive'){
                      focusMode = false;
                      $('.ql-editor *').css('opacity', '1');
                  }
              }
          }
        }
    }

    //the contents of an empty document item
    //represented in html format
    var newDocumentString = '<div class="document-item"><div class="material-icons">insert_drive_file</div><input readonly=true class="document-title" type="text"/><div class="document-size"></div><div class="document-edit"><div class="material-icons">edit</div></div><div class="document-delete"><div class="material-icons">delete</div></div></div>';
    var mainDocumentString = '<div class="document document-active"></div>';

    //hide elements
    $('.sidebar, .settings-container, .document-container, .bg, .option').hide();

    var documents = [];

    //simple functions to manipulate
    //dom level documents (not in array)
    function setDocumentTitle(element, title) {
        element.find('.document-title').val(title);
    }

    function setDocumentSize(element, size) {
        element.find('.document-size').text(size);
    }

    //return active document
    function documentAct() {
        return $('.document-active');
    }

    function replaceClass(element, classOne, classTwo){
        element.removeClass(classOne);
        element.addClass(classTwo);
    }

    //a Doc() object contains its contents
    //as a delta object and its own fileEntry.
    //this means we don't have to store these variables
    //in different arrays.

    var _DOC;

    function Doc() {
        this.name;
        this.size;
        this.contents;
        this.fileEntry;
        this.savedFileEntry;
        this.isActive;
        this.editor;
        this.editorDOM;
        this.docListItem;

        _DOC = this;
    }

    Doc.prototype.setName = function(name) {
        this.name = name;
    }

    Doc.prototype.getName = function() {
        return this.name;
    }

    Doc.prototype.setContents = function(contents) {
        this.contents = contents;
    }

    Doc.prototype.getContent = function() {
        return this.contents;
    }

    Doc.prototype.setSize = function(size) {
        this.size = size;
    }

    Doc.prototype.getSize = function() {
        return this.size;
    }

    Doc.prototype.setFileEntry = function(fileEntry) {
        if (typeof fileEntry === 'string') {
            this.loadFileEntry(fileEntry);
        } else {
            if (fileEntry === null || fileEntry === undefined || fileEntry === false) {

            } else {
                this.fileEntry = fileEntry;
                this.setName(fileEntry.name);
                this.setSavedFileEntry(fileEntry);
            }
        }
    }

    Doc.prototype.getFileEntry = function() {
        return this.fileEntry;
    }

    Doc.prototype.setSavedFileEntry = function(fileEntry) {
        this.savedFileEntry = chrome.fileSystem.retainEntry(fileEntry);
    }

    Doc.prototype.getSavedFileEntry = function() {
        return this.savedFileEntry;
    }

    Doc.prototype.loadFileEntry = function(string) {
        var thisDOC = this;
        chrome.fileSystem.restoreEntry(string, function(newFileEntry) {
            thisDOC.setFileEntry(newFileEntry);
        });
    }

    Doc.prototype.createEditor = function(element) {
        this.editor = new Quill(element, {
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{
                        'list': 'ordered'
                    }, {
                        'list': 'bullet'
                    }, {
                        align: []
                    }],
                    ['blockquote', 'code-block', 'link'],
                    [{
                        'header': 1
                    }, {
                        'header': 2
                    }]
                ]
            },
            scrollingContainer: '.main-container',
            bounds: '.main-container',
            theme: 'bubble'
        });

        var doc = this;

        var editor = this.editor;
        //set editorDOM for reference
        this.editorDOM = $(element).children().first(); //should be ql-editor

        var editorDOM = this.editorDOM;
        //only save data 600ms after user has stopped typing
        var timer;
        this.editor.on('text-change', function() {
            clearTimeout(timer);
            timer = setTimeout(function() {
                var _DOC = getDoc($(element).index());
                var oldText = _DOC.getContent(),
                    contents;
                if (isHTML(oldText)) {
                    contents = editorDOM.html();
                } else {
                    contents = editor.getContents();
                }
                _DOC.setContents(contents);
            }, 600);
        });
		
        //make sure to apply
        //default font and font size
        $fontChildren.filter(function(){
            return $(this).hasClass('active');
        }).each(function(){
            $(this).click();
            setTimeout(function(){
                $optionContainer.css('height', '0');
                $optionContainer.hide();
            }, 200);
        });
        
        $sizeChildren.filter(function(){
            return $(this).hasClass('active');
        }).each(function(){
            $(this).click();
            setTimeout(function(){
                $optionContainer.css('height', '0');
                $optionContainer.hide();
            }, 200);
        });
        
        $lineChildren.filter(function(){
            return $(this).hasClass('active');
        }).each(function(){
            $(this).click();
            setTimeout(function(){
                $optionContainer.css('height', '0');
                $optionContainer.hide();
            }, 200);
        });
        
        if ($(element).hasClass('document-active')) {
            this.editor.focus();
        }
    }

    //returns editor in the DOM
    Doc.prototype.getEditor = function() {
        return this.editorDOM;
    }

    //returns corresponding document-list item
    Doc.prototype.getDocItem = function() {
        return this.docListItem;
    }

    Doc.prototype.setActive = function(active) {
        this.isActive = active;
    }

    Doc.prototype.showCreate = function(name, size, active) {
        $documentList.append(newDocumentString);
        $mainContainer.append(mainDocumentString);

        var lastDoc = $documentList.children().last();

        this.docListItem = lastDoc;
        if (active === false) {
            $mainContainer.children().last().attr('class', 'document-' + lastDoc.index() + ' ql-container ql-bubble');
            this.setActive(false);
        } else {
            $documentList.children().removeClass('doc-active');
            this.docListItem.addClass('doc-active');

            $mainContainer.children().removeClass('document-active');
            $mainContainer.children().last().attr('class', 'document-' + lastDoc.index() + ' document-active ql-container ql-bubble');
            this.setActive(true);
        }
        //create editor
        this.createEditor('.document-' + lastDoc.index());

        setDocumentTitle(lastDoc, name);
        setDocumentSize(lastDoc, size);
    }

    Doc.prototype.show = function(index) {
        $documentList.children().removeClass('doc-active');
        this.docListItem.addClass('doc-active');
        $mainContainer.children().removeClass('document-active');
        $mainContainer.children().eq(index).attr('class', 'document-' + index + ' document-active ql-container ql-bubble');
        this.editorDOM.scrollTop(this.scrollTop);
        this.setActive(true);
    }

    Doc.prototype.create = function(name, size, active) {
        this.setName(name);
        this.setContents('');
        this.setSize(size);
        this.setFileEntry(false);
        this.showCreate(name, size, active);
    }

    //check if content is html
    function isHTML(string) {
        return /<[\s\S]*>/i.test(string);
    }

    Doc.prototype.setEditorContents = function(content) {
        if (typeof content === 'object') {
            this.editor.setContents(content);
        } else if (isHTML(content)) {
            this.editorDOM.html(content);
        } else {
            this.editor.setText(content);
        }
    }

    Doc.prototype.load = function(name, content, size, savedFileEntry) {
        this.setName(name);
        this.setContents(content);
        this.setEditorContents(content);
        this.setSize(size);
        this.setFileEntry(savedFileEntry);
    }

    Doc.prototype.loadFile = function(name, size, fileEntry){
        this.setName(name);
        this.setSize(size);
        this.setFileEntry(fileEntry);

        setDocumentTitle($('.doc-active'), name);
        setDocumentSize($('.doc-active'), size);
    }

    Doc.prototype.save = function() {
        console.log(this);
        var savedEntry = this.fileEntry;
        if (savedEntry) {
            exportToFileEntry(savedEntry);
        } else {
            ExportToDisk(this.name);
        }
    }

    function exportToFileEntry(fileEntry) {
        if (!fileEntry) {
            console.log('User cancelled saving.');
        } else {
            chrome.fileSystem.getWritableEntry(fileEntry, function(writableFileEntry) {
                writableFileEntry.createWriter(function(fileWriter) {
                    var extension = getExtension(writableFileEntry.name);
                    var doc = getDoc(documentAct().index());
                    var content;
                    var blob;
                    switch (extension) {
                        case 'html':
                        case 'htm':
                        case 'wtr':
                            content = qlEditor().html();
                            blob = new Blob([content]);
                            break;
                        case 'md':
                            content = toMarkdown(qlEditor().html());
                            blob = new Blob([content]);
                            break;
                        case 'docx':
                            content = '<!DOCTYPE HTML><html><head></head><body>' + qlEditor().html() + '</body></html>';
                            blob = htmlDocx.asBlob(content);
                            break;
                        case 'txt':
                        default:
                            content = doc.editor.getText();
                            blob = new Blob([content]);
                            break;
                    }
                    var truncated = false;
                    fileWriter.onwriteend = function(e) {
                        if (!truncated) {
                            truncated = true;
                            // You need to explicitly set the file size to truncate
                            // any content that might have been there before
                            this.truncate(blob.size);
                            return;
                        }
                    };
                    fileWriter.write(blob);

                    doc.loadFile(writableFileEntry.name, writableFileEntry.size, writableFileEntry);
                });
            });
        }
    }

    function ExportToDisk(name) {
        chrome.fileSystem.chooseEntry({
            type: 'saveFile',
            suggestedName: name,
            accepts: accepts
        }, exportToFileEntry);
    }

    function setDocsActive() {
        documents.forEach(function(value, index, array) {
            var doc = getDoc(index);
            doc.setActive(false);
        });
    }

    function focusEditor(index) {
        getDoc(index).editor.focus();
    }

    function addDocument(doc) {
        documents.push(doc);
    }

    function createDoc(doc, name, size, active) {
        doc.create(name, size, active);
    }

    function loadDoc(doc, name, content, size, savedFileEntry) {
        doc.load(name, content, size, savedFileEntry);
    }

    function newDoc(name, content, size, savedFileEntry, active) {
        var file = new Doc();
        createDoc(file, name, size, active);
        loadDoc(file, name, content, size, savedFileEntry);
        addDocument(file);
    }

    function getDoc(index) {
        return documents[index];
    }

    //returns ql-editor
    function qlEditor() {
        return $('.document-active .ql-editor');
    }

    function getExtension(fileName) {
        var extension = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
        return extension;
    }

    //autoscroll and focus on element
    //on click and on keyup
    $(document).on('keyup', '.ql-editor', function(e) {
        var navKeys = [37, 38, 39, 40, 13];
        if(navKeys.indexOf(e.keyCode) > -1){
            editorScroll(true);
        }else{
            editorScroll(false);
        }
        focusOnElem();
    })

    $(document).on('click select', '.ql-editor', function() {
        editorScroll();
        focusOnElem();
    });

    //focus on paragraphs
    //by greying out all other paragraphs
    function selectThis(element) {
        if(element.get(0).nodeName.toLowerCase() == 'li'){
            qlEditor().children().css('opacity', '0.6');
            element.parent().css('opacity', '1');
            element.parent().children().css('opacity', '0.6');
            element.css('opacity', '1');
            element.find('*').css('opacity', '1');
        }else{
            qlEditor().children().css('opacity', '0.6');
            element.css('opacity', '1');
            element.find('*').css('opacity', '1');
        }
    }

    //get y coordinate of caret in editor
    //by using its parent or inserting an element
    //in its place and reading the position
    function getSelectionCoords(win) {
        win = win || window;
        var doc = win.document;
        var sel = doc.selection,
            range, rects, rect;
        var y = 0;
        if (sel) {
            if (sel.type != 'Control') {
                range = sel.createRange();
                range.collapse(true);
                x = range.boundingLeft;
                y = range.boundingTop;
            }
        } else if (win.getSelection) {
            sel = win.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0).cloneRange();
                if (range.getClientRects) {
                    range.collapse(true);
                    rects = range.getClientRects();
                    if (rects.length > 1) {
                        rect = rects[1];
                    }

                    if (rect === undefined) {
                        rect = rects[0];
                        if (rect === undefined) {
                            rect = getSelectionContainerElement();
                            if ($(rect).hasClass('ql-editor')) {
                                //ignore
                            } else {
                                rect = rect.getClientRects()[0];
                            }
                        }
                    }

                    y = rect.top;

                }
            }
        }
        return {
            y: y
        };
    }

    //neat trick to keep current paragraph near the center
    //of the screen at all times
    function editorScroll(key) {
        setTimeout(function() {
            var editor = qlEditor();
            var scroll = editor.scrollTop();
            var nodePos = getSelectionCoords();
            var endScroll = scroll + nodePos.y - editor.height() + 50;

            if(key){
                editor.stop().animate({
                    scrollTop: endScroll
                }, 300, beizer, function() {
                    var doc = getDoc(documentAct().index());
                    doc.scrollTop = endScroll;
                });
            }else{
                editor.filter(':not(:animated)').animate({
                    scrollTop: endScroll
                }, 300, beizer, function() {
                    var doc = getDoc(documentAct().index());
                    doc.scrollTop = endScroll;
                });
            }
        }, 1);
    }

    //get caret parent
    function getSelectionContainerElement() {
        var range, sel, container;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt) {
                if (sel.rangeCount > 0) {
                    range = sel.getRangeAt(0);
                }
            }
        }

        if (range) {
            container = range.commonAncestorContainer;

            //check if the container is a text node and return its parent if so
            return container.nodeType === 3 ? container.parentNode : container;
        }
    }

    //actually focuses the element the cursor is under
    function focusOnElem() {
        if(focusMode === false){

        }else{
            var nodeParent = getSelectionContainerElement();
            var name = nodeParent.nodeName.toLowerCase();
            var whiteList = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote', 'pre', 'li'];
            if ($(nodeParent).hasClass('ql-editor')) {
                //ignore if parent is ql-editor
            } else if (whiteList.indexOf(name) == -1) {
                //if parent isn't within the bounds of our
                //whitelist, continue moving up the dom tree
                //until it finds some parent that is
                while (whiteList.indexOf(name) == -1) {
                    nodeParent = $(nodeParent).parent();
                    name = nodeParent.prop('tagName').toLowerCase();
                }
                selectThis($(nodeParent));
            } else {
                selectThis($(nodeParent));
            }

        }
    }

    //modals
    //these only apply to bigger modals
    //like settings, documents, .etc
    //this excludes save warning dialogues and such
    function openModal(element, callback) {
        //blur ql-editor
        qlEditor().blur();
        window.getSelection().removeAllRanges();

        if ($bg.is(':visible')) {
            element.show().filter(':not(:animated)').animate({
                left: '0'
            }, 200, beizer, function() {
                if (callback) {
                    callback();
                }
            });
        } else {
            $bg.show().filter(':not(:animated)').animate({
                opacity: '0.5'
            }, 200, beizer, function(){
                element.show().filter(':not(:animated)').animate({
                    left: '0'
                }, 200, beizer);
            });
        }
    }

    //left property should simply be the
    //negative of the width of the element
    function closeModal(element) {
        element.filter(':not(:animated)').animate({
            left: '-' + element.width()
        }, 200, beizer, function() {
            $(this).hide();
        });
        if ($bg.is(':visible') && element.hasClass('sidebar')) {
            $bg.filter(':not(:animated)').animate({
                opacity: '0'
            }, 200, beizer, function() {
                $(this).hide();
                focusEditor(documentAct().index());
                focusOnElem();
                var editorScrollTop = getDoc(documentAct().index()).scrollTop;
                documentAct().children().first().scrollTop(editorScrollTop);
            });
        } else {
            //dont hide bg
        }
    }

    function closeModals() {
        closeModal($modal);
    }

    var elemToFocus;
    //open sidebar
    $sideToggle.click(function() {
        elemToFocus = $(getSelectionContainerElement());
        openModal($sideBar);
    });

    //convert html to blob
    //and retrieve size from blob (approximately) in KB
    function calcSize(doc) {
        var contents = doc.editorDOM.html();
        var blob = new Blob([contents]);

        return Math.floor(blob.size / 1000);
    }

    //open documents
    $docButton.click(function() {
        openModal($documentContainer, function() {
            //calculate and set size for
            //each document
            $documentList.children().each(function() {
                var doc = getDoc($(this).index());
                var size = calcSize(doc);
                doc.setSize(size + ' KB');
                setDocumentSize($(this), size + ' KB');
            });
        });
    });

    //open settings
    $settingsButton.click(function() {
        openModal($settingsContainer);
    });

    //close top most modal
    $bg.click(function() {
        var highestIndex = 0;
        $modal.each(function(index) {
            var currentIndex = parseInt($(this).css('zIndex'), 10);

            if (currentIndex > highestIndex && $(this).is(':visible')) {
                highestIndex = currentIndex;
            }
        });

        $modal.filter(function() {
            return $(this).css('z-index') == highestIndex;
        }).each(function() {
            closeModal($(this));
        });
    });

    //close current modal
    $modalClose.click(function() {
        var modal = $(this).parent().parent();
        closeModal(modal);
    });

    //create new document
    $new.click(function() {
        newDoc('untitled', '', '0 KB', false, true);
        closeModal($sideBar);
    });

    function readAsArrayBuff(file, entry) {
        var reader = new FileReader();
        reader.onload = function() {
            var content = this.result;

            if(content.indexOf('<w:altChunk r:id="htmlChunk" />') > -1){
                content = content.substring(content.lastIndexOf('<!DOCTYPE HTML><html><head></head><body>') + 15 , content.lastIndexOf('</body></html>')) ;
                newDoc(file.name, content, file.size, entry, true);
                closeModal($sideBar);
            }else{
                var secReader = new FileReader();
                reader.onload = function(){
                    var content = this.result;
                    mammoth.convertToHtml({
                        arrayBuffer: content
                    }).then(function(result) {
                        content = result.value;
                        newDoc(file.name, content, file.size, entry, true);
                        closeModal($sideBar);
                    }).done();
                }
                reader.readAsArrayBuffer(file);
            }
        }

        reader.readAsText(file);
    }

    function readAsHTML(file, entry, markdown) {
        var reader = new FileReader();
        reader.onload = function() {
            var content = this.result;

            if (markdown) {
                var renderer = new marked.Renderer();
                renderer.paragraph = function(text) {
                    return '<p>' + text + '</p><br>';
                }
                content = marked(content, {
                    renderer: renderer
                });
                newDoc(file.name, content, file.size, entry, true)
                closeModal($sideBar);
            }
        }

        reader.readAsText(file);
    }

    //open document
    $open.click(function() {
        chrome.fileSystem.chooseEntry({
            type: 'openFile',
            acceptsMultiple: true,
            accepts: accepts
        }, function(files) {
            files.forEach(function(value, index, array) {
                var entry = value;
                entry.file(function(file) {
                    //handle files based on extension
                    var extension = getExtension(file.name),
                        content;
                    switch (extension) {
                        case 'md':
                            readAsHTML(file, entry, true);
                            break;
                        case 'docx':
                            readAsArrayBuff(file, entry);
                            break;
                        case 'html':
                        case 'htm':
                        case 'txt':
                        case 'wtr':
                        default:
                            readAsHTML(file, entry, false);
                            break;
                    }
                });
            });
        });
    });

    $save.click(function(){
        var doc = getDoc(documentAct().index());
        doc.save();

        closeModal($sideBar);
    });

    $saveAs.click(function(){
        var doc = getDoc(documentAct().index());
        ExportToDisk(doc.name);
        closeModal($sideBar);
    });

    //select document
    $(document).on('click', '.document-item', function() {
        var index = $(this).index();
        var doc = getDoc(index);
        setDocsActive();

        doc.show(index);
        closeModals();
    });

    function isActive(element){
        return element.hasClass('toggle-active');
    }

    //toggles
    $toggle.click(function(){
        var key = $(this).attr('name');
        //if active, make inactive
        if(isActive($(this))){
            replaceClass($(this), 'toggle-active', 'toggle-inactive');
            changeSettings(key, false);
        }else{
            replaceClass($(this), 'toggle-inactive', 'toggle-active');
            changeSettings(key, true);
        }
    });

    $toggle.mousedown(function(){
        $(this).children().css('transform', 'scale(1.15, .85)');
        $(this).children().css('box-shadow', 'rgba(0, 0, 0, 0.1) 0px 0px 0px 8px');
    });

    $(document).mouseup(function(){
        $toggle.children().css('transform', 'none');
        $toggle.children().css('box-shadow', 'none');
    });

    var src = '/assets/settings/coffee.mp3';
    var audio = new Audio(src);
    $coffeeMode.click(function(){
        if(isActive($(this))){
            audio.play();
        }else{
            audio.pause();
        }
    });

    //night mode
    //load stylesheet
    function loadStyles(name){
        var string = '<link type="text/css" rel="stylesheet" href="assets/settings/themes/' + name + '"/>';
        if($('link[href="'+ name + '"]').length < 1){
            $('head').append(string);
        }
    }

    function removeStyles(name){
        $('link[href="assets/settings/themes/'+ name + '"]').remove();
    }

    $nightMode.click(function(){
        if(isActive($(this)) === false){
            removeStyles('night.css');
        } else{
            loadStyles('night.css');
        }
    });

    function fullScreen(){
        var key = $fullScreen.attr('name');
        replaceClass($fullScreen, 'toggle-inactive', 'toggle-active');
        changeSettings(key, true);
    }

    function undoFullScreen(){
        var key = $fullScreen.attr('name');
        replaceClass($fullScreen, 'toggle-active', 'toggle-inactive');
        changeSettings(key, false);
    }

    //fullscreen mode
    $fullScreen.click(function(){
        if(chrome.app.window.current().isFullscreen()){
            chrome.app.window.current().restore();
        }else{
            chrome.app.window.current().fullscreen();
        }
    });

    //focus mode
    var focusMode;
    $focus.click(function(){
        if(isActive($(this)) === false){
            focusMode = false;
            $('.ql-editor *').css('opacity', '1');
        } else{
            focusMode = true;
            if(elemToFocus === undefined){
                elemToFocus = qlEditor().children().first();
            }
            selectThis(elemToFocus);
        }
    });
    
    //change font
    $fontChildren.click(function(){
        var fontFam = $(this).text();
        $('.ql-editor').css('font-family', fontFam);
        changeSettings('font', fontFam);
    });

    //change font size
    $sizeChildren.click(function(){
        var fontSize = $(this).text();
        $('.ql-editor').css('font-size', fontSize);
        changeSettings('size', fontSize);
    });

    //change theme
    $themeChildren.click(function(){
        var theme = $(this).text();
        switch (theme){
            case 'Default':
                removeStyles('dark.css');
                removeStyles('turquoise.css');
            break;
            case 'Dark':
                loadStyles('dark.css');
                removeStyles('turquoise.css');
            break;
            case 'Turquoise':
                loadStyles('turquoise.css');
                removeStyles('dark.css');
            break;
        }
        changeSettings('theme', theme);
    });
    
    //change line height
    $lineChildren.click(function(){
        var lineHeight = $(this).text(),
            actualLine = lineHeight;
        if(lineHeight == 'Single'){
            actualLine = 1;
        }
        if(lineHeight == 'Double'){
            actualLine = 2;
        }
        $('.ql-editor').css('line-height', actualLine);
        changeSettings('line', lineHeight);
    });

    //open dropdown
    function openDropdown(dropdown){
        //hide other dropdowns
        $optionContainer.stop().animate({ height : '0' }, 200, function(){
            $(this).hide();
            //then open the current one
            var height = dropdown.children().length * 40 + 'px';
            dropdown.stop().show().animate({ height: height }, 200);
        });
    }

    //close dropdown
    function closeDropdown(dropdown){
        dropdown.stop().animate({ height : '0' }, 200, function(){
            $(this).hide();
        });
    }

    $settingsOption.click(function(){
        if($(this).hasClass('noToggle')){
            var dropdown = $(this).children().last();
            if(dropdown.is(':visible')){
                closeDropdown(dropdown);
            }else{
                openDropdown(dropdown);
            }
        }
    });

    $optionContainer.children().click(function(){
        var dropdown = $(this).parent();
        dropdown.children().removeClass('active');
        $(this).addClass('active');
    });

    //change document title
    function makeReadOnly(input, element) {
        input.attr('readonly', true);
        input.blur();

        if (element.find('.material-icons').length > 1) {
            element.find('.material-icons').eq(1).text('edit');
        } else {
            element.find('.material-icons').text('edit');
        }
    }

    function undoReadOnly(input, element) {
        input.attr('readonly', false);
        input.select();

        if (element.find('.material-icons').length > 1) {
            element.find('.document-edit').find('.material-icons').text('check');
        } else {
            element.find('.material-icons').text('check');
        }
    }

    function rotate(element) {
        if (element.css('transform') == 'matrix(1, -2.44929e-16, 2.44929e-16, 1, 0, 0)') {
            element.css('transform', 'rotate(0deg)');
        } else {
            element.css('transform', 'rotate(360deg)');
        }
    }

    $(document).on('click', '.document-edit', function(e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        var input = $(this).parent().find('input');
        if ($(this).text() == 'check') {
            makeReadOnly(input, $(this));
        } else {
            undoReadOnly(input, $(this));
        }
        rotate($(this).find('.material-icons'))
    });

    $(document).on('keyup', '.document-title', function(e) {
        var index = $(this).parent().index();
        var doc = getDoc(index);
        var title = $(this).val();

        doc.setName(title);

        if (e.keyCode == 13) {
            makeReadOnly($(this), $(this).parent());
            rotate($(this).parent().find('.document-edit').find('.material-icons'));
        }
    });

    $(document).on('click', '.document-title', function(e) {
        if ($(this).attr('readonly') === undefined) {
            e.stopImmediatePropagation();
            e.stopPropagation();
        }
    });

    function loadScreen(){
        setTimeout(function(){
            $loadingScreen.stop().animate({ top: '-100%' }, 600, function(){
                $(this).remove();
            });
        }, 500);
    }

    //remember user data using the Chrome API
    //save data
    function saveData() {
        chrome.storage.local.set({
            settings: settings,
            data: documents
        });
    }

    //load data
    function loadData() {
        chrome.storage.local.get({
            settings: 'settings',
            data: 'documents'
        }, function(item) {
            var settings = item.settings,
                data = item.data;

            console.log(item);

            if (settings == 'settings' || data == 'documents') {
                newDoc('untitled', '', '0 KB', false, true);
                loadSettings(defaults);
                loadScreen();
            } else {
                var counter = 0;
                data.forEach(function(value, index, array) {
                    var thisData = data[index];
                    var name = thisData.name;
                    var content = thisData.contents;
                    var size = thisData.size;
                    var savedFileEntry = thisData.savedFileEntry;
                    var active = thisData.isActive;
                    newDoc(name, content, size, savedFileEntry, active);

                    //manually focus on first elem
                    documentAct().children().first().children().css('opacity', '0.6');
                    documentAct().children().first().children().first().css('opacity', '1');

                    counter++;
                    if(counter === array.length) {
                        loadSettings(settings);
                        loadScreen();
                    }
                });
            }
        });
    }

    $(window).mouseout(function() {
        saveData();
    });

    document.addEventListener('scroll', function (event) {
        var doc = getDoc(documentAct().index());
        doc.scrollTop = qlEditor().scrollTop();
    }, true);

    $(document).on('keyup', function(e){

        //fullscreen
        if(e.keyCode == 122){
            if(chrome.app.window.current().isFullscreen()){
                chrome.app.window.current().restore();
                undoFullScreen();
            }else{
                chrome.app.window.current().fullscreen();
                fullScreen();
            }
        }

        //close
        if(e.keyCode == 27){
            e.preventDefault();
            window.close();
        }
    });

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.max || message.min || message.restored) {
            undoFullScreen();
        }
        if (message.full) {
            fullScreen();
        }
    });

    loadData();

});
