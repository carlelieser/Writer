// Writer
// Version 5.4.1
// Author : Carlos E. Santos
// Made with <3
$(document).ready(function() {

    require.config({
        paths: {
            'upndown': '/assets/libs/upndown/lib/upndown.bundle.min'
        }
    });

    var $html = $('html'),
        $body = $('body'),
        $topBar = $('.top-bar'),
        $documentList = $('.document-list'),
        $mainContainer = $('.main-container'),
        $navBar = $('.navigation-container'),
        $sideBar = $('.sidebar'),
        $sideToggle = $('.sidebar-toggle'),
        $settings = $('.settings-container'),
        $modal = $('.modal'),
        $bg = $('.bg');

    var $loadingScreen = $('.loading-screen');

    var $installScreen = $('.install-screen');

    var $toggle = $('.toggle');

    var $coffeeMode = $('.coffee'),
        $nightMode = $('.night'),
        $fullScreen = $('.full'),
        $statistics = $('.statistics'),
        $focus = $('.focus');

    var $settingsOption = $('.settings-option'),
        $optionContainer = $('.option');

    var $fontChildren = $('.font-options').children(),
        $sizeChildren = $('.font-size-options').children(),
        $themeChildren = $('.theme-options').children(),
        $lineChildren = $('.line-options').children(),
        $marginChildren = $('.margin-options').children();

    var $documentContainer = $('.document-container'),
        $settingsContainer = $('.settings-container'),
        $feedBackContainer = $('.feedback-container'),
        $detailsContainer = $('.details-container'),
        $helpContainer = $('.help-container'),
        $fileContainer = $('.file-container');

    var $docButton = $('.open-documents'),
        $settingsButton = $('.open-settings'),
        $feedback = $('.open-feedback'),
        $details = $('.open-details'),
        $help = $('.open-help'),
        $file = $('.open-file'),
        $modalClose = $('.modal-close');

    var $new = $('.new'),
        $open = $('.open'),
        $save = $('.save'),
        $saveAs = $('.save-as'),
        $print = $('.print');

    var $snackBar = $('.snackbar');

    var $statisticsBar = $('.statistics-bar');

    var $email = $('.feedback-email'),
        $subject = $('.feedback-email'),
        $message = $('.feedback-message');

    var beizer = $.bez([.17, .67, .29, 1.01]);

    var accepts = [{
            description: 'Writer Document (*.wtr)',
            extensions: [
                'wtr'
            ]
        },
        {
            description: 'Word Document (*.docx)',
            extensions: [
                'docx'
            ]
        },
        {
            description: 'Markdown File (*.md)',
            extensions: [
                'md'
            ]
        },
        {
            description: 'HTML File (*.html)',
            extensions: [
                'html'
            ]
        },
        {
            description: 'HTM File (*.htm)',
            extensions: [
                'htm'
            ]
        },
        {
            description: 'Text File (*.txt)',
            extensions: [
                'txt'
            ]
        }
    ];

    var defaults = {
        coffee: false,
        night: false,
        full: false,
        statistics: false,
        focus: true,
        font: 'Charter',
        size: '16px',
        theme: 'default',
        line: 'double',
        margin: 'medium'
    }

    var settings = {
        coffee: false,
        night: false,
        full: false,
        statistics: false,
        focus: true,
        font: 'Charter',
        size: '16px',
        theme: 'default',
        line: 'double',
        margin: 'medium'
    }

    function changeSettings(key, val) {
        settings[key] = val;
        saveData();
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function loadSettings(config) {
        settings = config;
        for (var key in config) {
            if (config.hasOwnProperty(key)) {
                var value = config[key];
                var excluded = ['font', 'size', 'theme', 'margin', 'line'];

                if (excluded.indexOf(key) > -1) {
                    var correspondingDropdown;
                    if (key == 'size') {
                        correspondingDropdown = '.font-' + key + '-options';
                    } else {
                        correspondingDropdown = '.' + key + '-options';
                    }

                    $(correspondingDropdown).children().removeClass('active');

                    $(correspondingDropdown).children().filter(function() {
                        return $(this).text() == capitalizeFirstLetter(value);
                    }).each(function() {
                        $(this).click();
                        setTimeout(function() {
                            $optionContainer.css('height', '0');
                            $optionContainer.hide();
                        }, 400);
                    });

                } else {
                    if (value === false) {
                        value = 'toggle-inactive';
                    } else {
                        value = 'toggle-active'
                    }

                    if (key == 'focus' && value == 'toggle-inactive') {
                        focusMode = false;
                        $('.ql-editor *').css('opacity', '1');
                    }

                    if (value == 'toggle-active') {
                        $('.' + key).click();
                    }

                }
            }
        }
        docAct().click();
    }

    var newDocumentString = '<div class="document-item"><div class="material-icons">insert_drive_file</div><input readonly=true class="document-title" type="text"/><div class="doc-overflow"><div class="material-icons">more_vert</div></div><div class="overflow-menu"><div class="doc-rename">Rename</div><div class="doc-delete">Delete</div></div><div class="document-size"></div></div>';
    var mainDocumentString = '<div class="document document-active"></div>';

    $('.sidebar, .settings-container, .document-container, .bg, .option, .snackbar').hide();

    var documents = [];

    function setDocumentTitle(element, title) {
        element.find('.document-title').val(title);
    }

    function setDocumentSize(element, size) {
        element.find('.document-size').text(size);
    }

    function documentAct(index) {
        if (index) {
            return $('.document-active').index();
        } else {
            return $('.document-active');
        }
    }

    function docAct() {
        return $('.doc-active');
    }

    function replaceClass(element, classOne, classTwo) {
        element.removeClass(classOne);
        element.addClass(classTwo);
    }

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
        saveData();
    }

    Doc.prototype.getName = function() {
        return this.name;
    }

    function createTempEditor(contents) {
        var $container = $(document.createElement('div'));
        $container.addClass('temporary-editor');
        $body.append($container);
        var tempEditor = new Quill('.temporary-editor'),
            tempHTML = $container.children().first();
        tempHTML.html(contents);
        var editorContents = tempEditor.getContents();
        $container.remove();

        return editorContents;
    }

    Doc.prototype.setContents = function(contents) {
        if (isHTML(contents)) {
            contents = createTempEditor(contents);
        }
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
            this.fileEntry = fileEntry;
            if (fileEntry === null || fileEntry === undefined || fileEntry === false) {

            } else {
                this.path = this.fileEntry.fullPath;
                this.setName(fileEntry.name);
                this.setSavedFileEntry(fileEntry);
                saveData();
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
            thisDOC.path = thisDOC.fileEntry.fullPath;
        });
    }

    Doc.prototype.createEditor = function(element) {
        var bindings = {
            alignLeft: {
                key: 'W',
                shortKey: true,
                handler: function(range, context) {
                    if (context.format.align != 'left') {
                        this.quill.formatLine(range, 'align', false);
                    }
                }
            },
            alignCenter: {
                key: 'E',
                shortKey: true,
                handler: function(range, context) {
                    if (context.format.align != 'center') {
                        this.quill.formatLine(range, 'align', 'center', true);
                    } else {
                        this.quill.formatLine(range, 'align', false);
                    }
                }
            },
            alignRight: {
                key: 'R',
                shortKey: true,
                handler: function(range, context) {
                    if (context.format.align != 'right') {
                        this.quill.formatLine(range, 'align', 'right', true);
                    } else {
                        this.quill.formatLine(range, 'align', false);
                    }
                }
            },
            makeHeadingOne: {
                key: '1',
                shortKey: true,
                altKey: true,
                handler: function(range, context) {
                    if (context.format.header == 1) {
                        this.quill.formatLine(range, 'header', false);
                    } else {
                        this.quill.formatLine(range, 'header', 1, true);
                    }
                }
            },
            makeHeadingTwo: {
                key: '2',
                shortKey: true,
                altKey: true,
                handler: function(range, context) {
                    if (context.format.header == 2) {
                        this.quill.formatLine(range, 'header', false);
                    } else {
                        this.quill.formatLine(range, 'header', 2, true);
                    }
                }
            },
            makeQuote: {
                key: '5',
                shortKey: true,
                altKey: true,
                handler: function(range, context) {
                    if (context.format.blockquote) {
                        this.quill.formatLine(range, 'blockquote', false);
                    } else {
                        this.quill.formatLine(range, 'blockquote', true);
                    }
                }
            },
            makeCode: {
                key: '6',
                shortKey: true,
                altKey: true,
                handler: function(range, context) {
                    if (context.format['code-block'] == true) {
                        this.quill.formatLine(range, 'code-block', false);
                    } else {
                        this.quill.formatLine(range, 'code-block', true);
                    }
                }
            }
        }

        this.editor = new Quill(element, {
            modules: {
                keyboard: {
                    bindings: bindings
                },
                toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{
                        'list': 'ordered'
                    }, {
                        'list': 'bullet'
                    }, {
                        align: []
                    }],
                    ['blockquote', 'code-block', 'link', 'image'],
                    [{
                        'header': 1
                    }, {
                        'header': 2
                    }]
                ]
            },
            bounds: '.main-container',
            theme: 'bubble'
        });

        var doc = this;

        var editor = this.editor;

        this.editorDOM = $(element).children().first();

        var editorDOM = this.editorDOM;

        applyAll();

        if (settings.statistics == true) {
            calcStats(editor.getText());
        }

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
                saveData();
            }, 1000);
            doc.changed = true;
            if (settings.statistics == true) {
                calcStats(doc.editor.getText());
            }
            if ($('.tutorial-container').is(':visible')) {
                nextTutorial();
            }
        });

        if ($(element).hasClass('document-active')) {
            removeAnim();
            editorDOM.children().first().focus();
        }

    }

    function applyAll() {
        $fontChildren.filter(function() {
            return $(this).hasClass('active');
        }).each(function() {
            $(this).click();
            setTimeout(function() {
                $optionContainer.css('height', '0');
                $optionContainer.hide();
            }, 200);
        });

        $sizeChildren.filter(function() {
            return $(this).hasClass('active');
        }).each(function() {
            $(this).click();
            setTimeout(function() {
                $optionContainer.css('height', '0');
                $optionContainer.hide();
            }, 200);
        });

        $lineChildren.filter(function() {
            return $(this).hasClass('active');
        }).each(function() {
            $(this).click();
            setTimeout(function() {
                $optionContainer.css('height', '0');
                $optionContainer.hide();
            }, 200);
        });

        $marginChildren.filter(function() {
            return $(this).hasClass('active');
        }).each(function() {
            $(this).click();
            setTimeout(function() {
                $optionContainer.css('height', '0');
                $optionContainer.hide();
            }, 200);
        });
    }

    Doc.prototype.getEditor = function() {
        return this.editorDOM;
    }

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

        this.createEditor('.document-' + lastDoc.index());

        setDocumentTitle(lastDoc, name);
        setDocumentSize(lastDoc, size);
    }

    function shadeRGBColor(color, percent) {
        var f = color.split(","),
            t = percent < 0 ? 0 : 255,
            p = percent < 0 ? percent * -1 : percent,
            R = parseInt(f[0].slice(4)),
            G = parseInt(f[1]),
            B = parseInt(f[2]);
        return "rgb(" + (Math.round((t - R) * p) + R) + "," + (Math.round((t - G) * p) + G) + "," + (Math.round((t - B) * p) + B) + ")";
    }

    Doc.prototype.show = function(index) {
        $documentList.children().removeClass('doc-active');
        this.docListItem.addClass('doc-active');
        $mainContainer.children().removeClass('document-active');
        $mainContainer.children().eq(index).attr('class', 'document-' + index + ' document-active ql-container ql-bubble');
        this.editorDOM.scrollTop(this.scrollTop);
        this.setActive(true);

        if (settings.statistics == true) {
            calcStats(this.editor.getText());
        }

        saveData();
    }

    Doc.prototype.create = function(name, size, active) {
        this.setName(name);
        this.setContents('');
        this.setSize(size);
        this.setFileEntry(false);
        this.showCreate(name, size, active);
    }

    function isHTML(string) {
        return /<[\s\S]*>/i.test(string);
    }

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    function isEmpty(element) {
        return !$.trim(element.html())
    }

    function cleanDoc(string) {
        return string.replaceAll(' 0.6;"=""', '')
            .replaceAll(' 1;"=""', '')
            .replaceAll('=3D', '=')
            .replaceAll('="3D', '="')
            .replaceAll('class="3D&quot;', 'class="')
            .replaceAll('&quot;', '')
    }

    function getIndicesOf(searchStr, str, caseSensitive) {
        var searchStrLen = searchStr.length;
        if (searchStrLen == 0) {
            return [];
        }
        var startIndex = 0,
            index, indices = [];
        if (!caseSensitive) {
            str = str.toLowerCase();
            searchStr = searchStr.toLowerCase();
        }
        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + searchStrLen;
        }
        return indices;
    }

    function getNextIndex(string, start, token) {
        var indices = getIndicesOf(token, string);

        indices.forEach(function(value, index, array) {
            if (start < value) {
                return value;
            }
        });
    }

    function getStyle(element, styleProp) {
        var style = element.attr('style');
        var index = style.lastIndexOf(styleProp + ':') + styleProp.length + 2;
        style = style.substring(index, getNextIndex(style, index, ':'));
        style = style.replace(';', '');
        return style;
    }

    function cleanHTML(html) {
        var htmlParent = $(document.createElement('div'));
        htmlParent.addClass('htmlParent');
        htmlParent.html(html);

        htmlParent.find('br').remove();

        htmlParent.find('*').each(function() {
            if (isEmpty($(this))) {
                $(this).html('<br/>');
            }
            if ($(this).attr('style')) {
                if ($(this).attr('style').indexOf('text-align') > -1) {
                    var prop = getStyle($(this), 'text-align');
                    $(this).addClass('ql-align-' + prop);
                    $(this).removeAttr('style');
                }
            }
        });


        htmlParent.find('ol, ul').each(function() {
            var indent = ($(this).parentsUntil(htmlParent).length - 1);

            if (indent != -1) {
                $(this).children().not('ol').not('ul').attr('class', 'ql-indent-' + indent);
            }

            if (!$(this).parent().is(htmlParent)) {
                var cnt = $(this).contents();
                $(this).replaceWith(cnt);
            }

        });

        htmlParent.find('li').each(function() {
            if ($(this).find('li').length) {
                $(this).find('li').insertAfter($(this));
            }
        });

        htmlParent.find('div').each(function() {
            $(this).replaceWith('<p>' + $(this).html() + '</p>');
        });

        htmlParent.find('span').each(function() {
            var cnt = $(this).contents();
            $(this).replaceWith(cnt);
        });

        htmlParent.find('p').each(function() {
            if ($(this).parent().is('li') || $(this).parent().is('blockquote')) {
                var cnt = $(this).contents();
                $(this).replaceWith(cnt);
            }
        });

        htmlParent.find('table').remove();

        var cleaned = cleanDoc(htmlParent.html());
        console.log(cleaned);
        return cleaned;
    }

    Doc.prototype.setEditorContents = function(content) {
        if (typeof content === 'object') {
            this.editor.setContents(content);
        } else if (isHTML(content)) {
            var clean = cleanHTML(content);
            this.editorDOM.html(clean);
        } else {
            this.editor.setText(content);
        }

        this.editor.history.clear();
    }

    Doc.prototype.load = function(name, content, size, savedFileEntry, changed) {
        this.setName(name);
        this.setContents(content);
        this.setEditorContents(content);
        this.setSize(size);
        this.setFileEntry(savedFileEntry);
        this.changed = changed;
    }

    Doc.prototype.loadFile = function(name, size, fileEntry, changed) {
        this.setName(name);
        this.setSize(size);
        this.setFileEntry(fileEntry);
        this.changed = changed;
        setDocumentTitle(docAct(), name);
        setDocumentSize(docAct(), size);
    }

    function strip(name) {
        if (name.indexOf('.') == -1) {
            return name;
        } else {
            return name.substr(0, name.lastIndexOf('.'));
        }
    }

    Doc.prototype.save = function() {
        var savedEntry = this.fileEntry;
        var name = strip(this.name);
        if (savedEntry) {
            exportToFileEntry(savedEntry);
        } else {
            ExportToDisk(name);
        }
    }

    var deleteIndex;

    function openSave(doc) {
        closeModals(true);
        if (!$bg.is(':visible')) {
            openBg();
        }
        $('.save-dialogue .save-text span').text(doc.name);
        $('.save-dialogue').fadeIn('fast');

        deleteIndex = documents.indexOf(doc);
    }

    function closeSave() {
        closeModals();
        $('.save-dialogue').fadeOut('fast');
    }

    $('.save-buttons .delete-cancel').click(function() {
        closeSave();
    });

    $('.save-buttons .delete-confirm').click(function() {
        var doc = getDoc(deleteIndex);
        doc.changed = false;
        doc.delete();
        closeSave();
    });

    Doc.prototype.delete = function() {
        if (this.changed) {
            openSave(this);
        } else {
            var index = documents.indexOf(this);
            this.editorDOM.parent().remove();
            this.docListItem.remove();
            documents.splice(index, 1);

            if (documents.length === 0) {
                newDoc(true);
                closeModals();
            } else {
                if (!this.docListItem.hasClass('doc-active')) {
                    $('.doc-active').click();
                } else {
                    if (index - 1 == documents.length - 1) {
                        $documentList.children().last().click();
                    } else {
                        $documentList.children().eq(index).click();
                    }
                }
            }
        }
    }

    function cleanStyles(html) {
        var temp = $(document.createElement('div'));
        temp.html(html);

        temp.find('*').removeAttr('style');
        return temp.html();
    }

    function writeToWriter(fileWriter, doc, blob, entry) {
        fileWriter.write(blob);
        doc.loadFile(entry.name, blob.size, entry, false);
        openSnackBar(false, false, entry.name);
        saveData();
    }

    function exportToFileEntry(fileEntry) {
        if (!fileEntry) {
            console.log('User cancelled saving.');
        } else {
            chrome.fileSystem.getWritableEntry(fileEntry, function(writableFileEntry) {
                writableFileEntry.createWriter(function(fileWriter) {
                    var extension = getExtension(writableFileEntry.name);
                    var doc = getDoc(documentAct(true));
                    var content;
                    var blob;

                    switch (extension) {
                        case 'html':
                        case 'htm':
                        case 'wtr':
                            content = cleanStyles(qlEditor().html());
                            blob = new Blob([content]);
                            writeToWriter(fileWriter, doc, blob, writableFileEntry);
                            break;
                        case 'md':
                            require(['upndown'], function(upndown) {
                                var und = new upndown();
                                und.convert(cleanStyles(qlEditor().html()), function(err, markdown) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        content = markdown;
                                        blob = new Blob([content]);
                                        writeToWriter(fileWriter, doc, blob, writableFileEntry);
                                    }
                                });
                            });
                            break;
                        case 'docx':
                            content = '<!DOCTYPE HTML><html><head></head><body>' + cleanStyles(qlEditor().html()) + '</body></html>';
                            blob = htmlDocx.asBlob(content);
                            writeToWriter(fileWriter, doc, blob, writableFileEntry);
                            break;
                        case 'pdf':
                            blob = pdfBlob;
                            writeToWriter(fileWriter, doc, blob, writableFileEntry);
                            break;
                        case 'txt':
                        default:
                            content = doc.editor.getText();
                            blob = new Blob([content]);
                            writeToWriter(fileWriter, doc, blob, writableFileEntry);
                            break;
                    }
                    var truncated = false;
                    fileWriter.onwriteend = function(e) {
                        if (!truncated) {
                            truncated = true;
                            this.truncate(blob.size);
                            return;
                        }
                    };
                });
            });
        }
    }

    function ExportToDisk(name) {
        name = strip(name);
        var ua = window.navigator.userAgent;
        if (ua.indexOf('CrOS') > -1) {
            name += '.wtr';
        }
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

    function loadDoc(doc, name, content, size, savedFileEntry, changed) {
        doc.load(name, content, size, savedFileEntry, changed);
    }

    function newDoc(newString, name, content, size, savedFileEntry, active, changed) {
        var file = new Doc();
        if (newString != false) {
            name = 'untitled';
            content = '';
            size = '0 KB';
            savedFileEntry = false;
            active = true;
            changed = false;
        }
        createDoc(file, name, size, active);
        loadDoc(file, name, content, size, savedFileEntry, changed);
        addDocument(file);
        loadImages();
        saveData();
    }

    function deleteDoc(doc) {
        doc.delete();
    }

    function getDoc(index) {
        return documents[index];
    }

    function qlEditor() {
        return $('.document-active .ql-editor');
    }

    function allEditors() {
        return $('.ql-editor');
    }

    function getExtension(fileName) {
        var extension = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
        return extension;
    }

    $(document).on('keyup', '.ql-editor', function(e) {
        var navKeys = [37, 38, 39, 40, 13];
        if (navKeys.indexOf(e.keyCode) > -1) {
            editorScroll(true);
        } else {
            editorScroll(false);
        }
        closeNavBar();
        focusOnElem();
    })

    $(document).on('click select', '.ql-editor', function() {
        editorScroll();
        focusOnElem();
    });

    $topBar.mouseenter(function() {
        openNavBar();
    });

    $(document).on('mouseenter', '.ql-editor', function() {
        closeNavBar();
    });

    function selectThis(element) {
        if (element.get(0).nodeName.toLowerCase() == 'li') {
            qlEditor().find('*').css('opacity', '0.6');
            element.parent().css('opacity', '1');
            element.parent().children().css('opacity', '0.6');
            element.css('opacity', '1');
            element.find('*').css('opacity', '1');
        } else {
            qlEditor().find('*').css('opacity', '0.6');
            element.css('opacity', '1');
            element.find('*').css('opacity', '1');
        }
    }

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
                            if (!$(rect).hasClass('ql-editor')) {
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

    function editorScroll(key) {
        setTimeout(function() {
            var editor = qlEditor();
            var scroll = editor.scrollTop();
            var nodePos = getSelectionCoords();
            var endScroll = scroll + nodePos.y - (editor.height() / 2) - 100;

            if (key) {
                editor.stop().animate({
                    scrollTop: endScroll
                }, 300, beizer, function() {
                    var doc = getDoc(documentAct(true));
                    doc.scrollTop = endScroll;
                });
            } else {
                editor.filter(':not(:animated)').animate({
                    scrollTop: endScroll
                }, 300, beizer, function() {
                    var doc = getDoc(documentAct(true));
                    doc.scrollTop = endScroll;
                });
            }
        }, 1);
    }

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

            return container.nodeType === 3 ? container.parentNode : container;
        }
    }

    function focusOnElem() {
        if (focusMode === false) {

        } else {
            var nodeParent = getSelectionContainerElement();
            var name = nodeParent.nodeName.toLowerCase();
            var whiteList = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote', 'pre', 'li'];
            if ($(nodeParent).hasClass('ql-editor')) {} else if (whiteList.indexOf(name) == -1) {
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

    function openModal(element, callback) {

        if (element == $documentContainer) {
            calcDocSize();
        }

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
            }, 200, beizer, function() {
                element.show().filter(':not(:animated)').animate({
                    left: '0'
                }, 200, beizer);
            });
        }
    }

    function openBg() {
        $bg.show().filter(':not(:animated)').animate({
            opacity: '0.5'
        }, 200);
    }

    function closeBg() {
        $bg.filter(':not(:animated)').animate({
            opacity: '0'
        }, 200, beizer, function() {
            $(this).hide();
            focusEditor(documentAct(true));
            focusOnElem();
            var editorScrollTop = getDoc(documentAct(true)).scrollTop;
            documentAct().children().first().scrollTop(editorScrollTop);
        });
    }

    function closeModal(element) {
        element.filter(':not(:animated)').animate({
            left: '-' + element.width()
        }, 200, beizer, function() {
            $(this).hide();
        });
        if ($modal.filter(function() {
                return $(this).is(':visible');
            }).length == 1) {
            closeBg();
        } else {}

    }

    function closeModals(bg) {
        closeModal($modal);
        if (bg != true) {
            closeBg();
        }
    }

    var elemToFocus;
    $sideToggle.click(function() {
        elemToFocus = $(getSelectionContainerElement());
        $('.tutorial-container-two').fadeOut('fast');
        openNavBar();
        openModal($sideBar);
    });

    function calcSize(doc) {
        var extension = getExtension(doc.name);
        var content,
            blob;
        var index = documents.indexOf(doc);
        var html = $('.document-' + index).find('.ql-editor').html();
        var size;
        switch (extension) {
            case 'html':
            case 'htm':
            case 'wtr':
                content = html;
                blob = new Blob([content]);
                break;
            case 'md':
                content = toMarkdown(html);
                blob = new Blob([content]);
                break;
            case 'docx':
                content = '<!DOCTYPE HTML><html><head></head><body>' + html + '</body></html>';
                blob = htmlDocx.asBlob(content);
                break;
            case 'txt':
            default:
                content = doc.editor.getText();
                blob = new Blob([content]);
                break;
        }

        return Math.floor(blob.size / 1000);
    }

    function calcDocSize() {
        $documentList.children().each(function() {
            var doc = getDoc($(this).index());
            var size = calcSize(doc);
            doc.setSize(size + ' KB');
            setDocumentSize($(this), size + ' KB');
        });
    }

    $docButton.click(function() {
        openModal($documentContainer);
    });

    $settingsButton.click(function() {
        openModal($settingsContainer);
    });

    $bg.click(function() {
        if (!$('.save-dialogue').is(':visible')) {
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
        }
    });

    $modalClose.click(function() {
        var modal = $(this).parent().parent();
        closeModal(modal);
    });

    $new.click(function() {
        newDoc(true);
        closeModals();
    });

    function readAsArrayBuff(file, entry) {
        var reader = new FileReader();
        reader.onload = function() {
            var content = this.result;

            if (content.indexOf('<w:altChunk r:id="htmlChunk" />') > -1) {
                content = content.substring(content.lastIndexOf('<!DOCTYPE HTML><html><head></head><body>') + 15, content.lastIndexOf('</body></html>'));
                newDoc(false, file.name, content, file.size, entry, true, false);
                closeModals();
            } else {
                var secReader = new FileReader();
                reader.onload = function() {
                    var content = this.result;
                    mammoth.convertToHtml({
                        arrayBuffer: content
                    }).then(function(result) {
                        content = result.value;
                        newDoc(false, file.name, content, file.size, entry, true, false);
                        closeModals();
                    }).done();
                }
                reader.readAsArrayBuffer(file);
            }
        }

        reader.readAsText(file);
    }

    function convertNewLines(text) {
        return text.replace(/\n\n  \n\n\n/g, '<p><p>');
    }

    function readAsHTML(file, entry, markdown) {
        var reader = new FileReader();
        reader.onload = function() {
            var content = this.result;
            console.log(content);
            if (markdown) {
                content = convertNewLines(content);
                content = marked(content);
                content = cleanHTML(content);
                newDoc(false, file.name, content, file.size, entry, true, false);
                closeModals();
            } else {
                newDoc(false, file.name, content, file.size, entry, true, false);
                closeModals();
            }
        }

        reader.readAsText(file);
    }

    function checkForPath(path) {
        for (var i = 0; i < documents.length; i++) {
            if (documents[i].path == path) {
                return true
                break;
            }
        }
        return false;
    }

    function openFiles(files) {
        files.forEach(function(value, index, array) {
            var entry = value;
            var path = entry.fullPath;
            if (checkForPath(path) == true) {
                closeModals();
                openSnackBar(true, 'is already open.', entry.name);
            } else {
                entry.file(function(file) {
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
            }
        });
    }

    $open.click(function() {
        chrome.fileSystem.chooseEntry({
            type: 'openFile',
            acceptsMultiple: true,
            accepts: accepts
        }, function(files) {
            openFiles(files);
        });
    });

    $save.click(function() {
        var doc = getDoc(documentAct(true));
        doc.save();

        closeModals();
    });

    $saveAs.click(function() {
        var doc = getDoc(documentAct(true));
        var name = doc.name;
        ExportToDisk(name);
        closeModals();
    });

    $print.click(function() {
        var html = qlEditor().html();
        var copyString = '<div class="ql-editor" id="print"></div>';
        $html.append(copyString);
        var copy = $('#print');
        copy.html(html);
        window.print();
        copy.remove();
    });

    $file.click(function() {
        openModal($fileContainer);
    });

    $feedback.click(function() {
        openModal($feedBackContainer, function() {
            $feedBackContainer.find('.feedback-email').val($('.user-email').text());
            $feedBackContainer.find('.feedback-email').focus();
        });
    });

    function createDataURL(response, node) {
        var reader = new FileReader();

        reader.onload = function() {
            var data = this.result;
            if (node != undefined) {
                node.attr('src', data);
            }
        }

        reader.readAsDataURL(response);
    }

    function requestXML(url, node) {
        if (url.indexOf('data:') == -1) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.onload = function() {
                createDataURL(xhr.response, node);
            }.bind(this);
            xhr.send();
        }
        node.show();
    }

    function loadImages() {
        qlEditor().find('img').each(function() {
            if ($(this).attr('src') === undefined) {} else {
                var url = $(this).attr('src');
                requestXML(url, $(this));
            }
        });
    }

    $(document).on('paste drop', function() {
        setTimeout(loadImages, 0);
    });

    $(document).on('error', 'img', function() {
        $(this).hide();
    })

    $('.submit-button').click(function() {
        var email = $email.val();
        var subject = $subject.val();
        var message = $message.val();
        var url = "mailto:writerchromeapp@gmail.com?subject=" + subject + '&body=' + message;
        var link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.click();
    });

    function getTime(text) {
        var words = getWords(text);
        return Math.round(words / 200) + ' Min';
    }

    function getParagraphs(text) {
        return text.replace(/\n$/gm, '').split(/\n/).length;
    }

    function getWords(text) {
        var words = text.trim().replace(/\s+/gi, ' ').split(' ');
        if (words[0] === '' && words.length == 1) {
            words = 0;
        } else {
            words = words.length;
        }
        return words;
    }

    function getCharacters(text) {
        return text.length - 1;
    }

    function getCharsExSpaces(text) {
        if (text.match(/[\S]/g) === null) {
            return 0;
        } else {
            return text.match(/[\S]/g).length;
        }
    }

    function getDocDetails(doc, callback) {
        var text = doc.editor.getText();
        var details = {
            name: doc.name,
            time: getTime(text),
            paragraphs: getParagraphs(text),
            words: getWords(text),
            chars: getCharacters(text),
            charsExSpaces: getCharsExSpaces(text)
        }

        setDocDetails(details, callback);
    }

    function setDocDetails(details, callback) {
        var counter = 0;
        for (var key in details) {
            if (details.hasOwnProperty(key)) {
                var value = details[key];

                switch (key) {
                    case 'name':
                        $('.file-name-details').text(value);
                        break;
                    case 'time':
                        $('.est-time-amount').text(value);
                        break;
                    case 'paragraphs':
                        $('.paragraph-amount').text(value);
                        break;
                    case 'words':
                        $('.word-amount').text(value);
                        break;
                    case 'chars':
                        $('.character-amount').text(value);
                        break;
                    case 'charsExSpaces':
                        $('.characters-without-spaces-amount').text(value);
                        break;
                }
                counter++;
                if (counter === details.length) {
                    callback();
                }
            }
        }
    }

    $details.click(function() {
        var doc = getDoc(documentAct(true));
        getDocDetails(doc, openModal($detailsContainer));
    });

    $help.click(function() {
        openModal($helpContainer);
    });

    $snackBar.css('bottom', '-' + ($snackBar.height() + 100) + 'px');

    var snackBarTime;

    function openSnackBar(message, real, name) {
        if (message || real) {
            $snackBar.children().first().text(name);
            $snackBar.children('span').text(real);
            $snackBar.show().stop().animate({
                bottom: '0'
            }, 500, beizer, function() {
                snackBarTime = setTimeout(closeSnackBar, 5000);
            });
        } else {
            $snackBar.children().first().text(name);
            $snackBar.children('span').text('was saved.');
            $snackBar.show().stop().animate({
                bottom: '0'
            }, 500, beizer, function() {
                snackBarTime = setTimeout(closeSnackBar, 3000);
            });
        }
    }

    function closeSnackBar() {
        $snackBar.animate({
            bottom: '-' + ($snackBar.height() + 100) + 'px'
        }, 500, beizer, function() {
            $(this).hide();
            clearTimeout(snackBarTime);
        });
    }

    $(document).on('click', '.document-item', function() {
        if ($('.overflow-menu').is(':visible')) {
            closeOverflow($('.overflow-menu'));
        } else {
            var index = $(this).index();
            var doc = getDoc(index);
            setDocsActive();

            doc.show(index);
            closeModals();
        }
    });

    function isActive(element) {
        return element.hasClass('toggle-active');
    }

    $toggle.click(function() {
        var key = $(this).attr('name');
        if (isActive($(this))) {
            replaceClass($(this), 'toggle-active', 'toggle-inactive');
            changeSettings(key, false);
        } else {
            replaceClass($(this), 'toggle-inactive', 'toggle-active');
            changeSettings(key, true);
        }
    });

    $toggle.mousedown(function() {
        $(this).children().css('transform', 'scale(1.15, .85)');
        $(this).children().css('box-shadow', 'rgba(0, 0, 0, 0.1) 0px 0px 0px 8px');
    });

    $(document).mouseup(function() {
        $toggle.children().css('transform', 'none');
        $toggle.children().css('box-shadow', 'none');
    });

    var src = '/assets/settings/coffee.mp3';
    var audio = new Audio(src);
    $coffeeMode.click(function() {
        if (isActive($(this))) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    var animTimer;

    function removeAnim() {
        allEditors().css('transition', 'none');
        $('.ql-editor *').css('transition', 'none');
        clearTimeout(animTimer);
        animTimer = setTimeout(function() {
            addAnim();
        }, 200);
    }

    function addAnim() {
        allEditors().css('transition', 'all .2s ease');
        $('.ql-editor *').css('transition', 'all .2s ease');
    }

    function loadStyles(name) {
        var string = '<link type="text/css" rel="stylesheet" href="assets/settings/themes/' + name + '"/>';
        if ($('link[href="' + name + '"]').length < 1) {
            $('head').append(string);
        }
    }

    function removeStyles(name) {
        $('link[href="assets/settings/themes/' + name + '"]').remove();
    }

    $nightMode.click(function() {
        removeAnim();
        if (isActive($(this)) === false) {
            removeStyles('night.css');
        } else {
            loadStyles('night.css');
        }
    });

    function fullScreen() {
        var key = $fullScreen.attr('name');
        replaceClass($fullScreen, 'toggle-inactive', 'toggle-active');
        changeSettings(key, true);
    }

    function undoFullScreen() {
        var key = $fullScreen.attr('name');
        replaceClass($fullScreen, 'toggle-active', 'toggle-inactive');
        changeSettings(key, false);
    }

    $fullScreen.click(function() {
        if (chrome.app.window.current().isFullscreen()) {
            chrome.app.window.current().restore();
        } else {
            chrome.app.window.current().fullscreen();
        }
    });

    var focusMode;
    $focus.click(function() {
        if (isActive($(this)) === false) {
            focusMode = false;
            $('.ql-editor *').css('opacity', '1');
        } else {
            focusMode = true;
            if (elemToFocus === undefined) {
                elemToFocus = qlEditor().children().first();
            }
            selectThis(elemToFocus);
        }
    });

    function calcStats(text) {
        var wordContainer = $('.words');
        var charContainer = $('.chars');

        var regex = /\s+/gi;
        var words = text.trim().replace(regex, ' ').split(' ');
        var chars = text.length - 1;
        if (words[0] === '' && words.length == 1) {
            words = 0;
        } else {
            words = words.length;
        }

        wordContainer.text(words);
        charContainer.text(chars);
    }

    $statisticsBar.css('bottom', '-' + ($statisticsBar.height() + 100) + 'px');

    function openStatistics() {
        var doc = getDoc(documentAct(true));
        calcStats(doc.editor.getText());
        $statisticsBar.show().stop().animate({
            bottom: '0'
        }, 300, beizer);
    }

    function closeStatistics() {
        $statisticsBar.stop().animate({
            bottom: '-' + ($statisticsBar.height() + 50) + 'px'
        }, 300, beizer, function() {
            $(this).hide();
        });
    }

    $statistics.click(function() {
        if (isActive($(this)) === false) {
            closeStatistics();
        } else {
            openStatistics();
        }
    });

    $fontChildren.click(function() {
        var fontFam = $(this).text();
        allEditors().css('font-family', fontFam);
        changeSettings('font', fontFam);
    });

    function convertSize(fontSize) {
        var size = Number(fontSize.replace('px', ''));
        var em = (size / 12) + 0.25;

        return em + 'em';
    }

    $sizeChildren.click(function() {
        var fontSize = $(this).text();
        allEditors().css('font-size', convertSize(fontSize));
        changeSettings('size', fontSize);
    });

    $themeChildren.click(function() {
        var theme = $(this).text();
        switch (theme) {
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

    $lineChildren.click(function() {
        var lineHeight = $(this).text(),
            actualLine = lineHeight;
        if (lineHeight == 'Single') {
            actualLine = 1;
        }
        if (lineHeight == 'Double') {
            actualLine = 2;
        }
        allEditors().css('line-height', actualLine);
        changeSettings('line', lineHeight);
    });

    function setMargin(margin) {
        allEditors().css('padding-left', margin);
        allEditors().css('padding-right', margin);
    }

    $marginChildren.click(function() {
        var margin = $(this).text(),
            realMarg = margin;

        switch (margin) {
            case 'Small':
                realMarg = '8%';
                break;
            case 'Medium':
                realMarg = '18%';
                break;
            case 'Large':
                realMarg = '26%';
                break;
        }

        setMargin(realMarg);
        changeSettings('margin', margin);
    });

    function loadDefaults() {
        $('.toggle').each(function() {
            if ($(this).hasClass('toggle-active')) {
                if ($(this).attr('name') != 'focus') {
                    $(this).click();
                }
            }
        });

        $('.default-theme').click();
        $('.charter').click();
        $('.16px').click();
        $('.double-line').click();
        $('.medium-margin').click();

        $optionContainer.each(function() {
            $(this).css('height', '0px');
            $(this).hide();
        });
    }

    $('.reset-button').click(function() {
        loadDefaults();
    });

    function openDropdown(dropdown) {
        var height = dropdown.children().length * 40 + 'px';
        dropdown.stop().show().animate({
            height: height
        }, 400, beizer);
    }

    function closeDropdown(dropdown) {
        dropdown.stop().animate({
            height: '0'
        }, 400, beizer, function() {
            $(this).hide();
        });
    }

    $settingsOption.click(function() {
        if ($(this).hasClass('noToggle')) {
            var dropdown = $(this).children().last();
            if (dropdown.is(':visible')) {
                closeDropdown(dropdown);
            } else {
                if (dropdown.css('height') != '0px') {
                    dropdown.css('height', '0px');
                }
                openDropdown(dropdown);
            }
        }
    });

    $optionContainer.children().click(function() {
        var dropdown = $(this).parent();
        dropdown.children().removeClass('active');
        $(this).addClass('active');
    });

    function makeReadOnly(input) {
        input.attr('readonly', true);
        input.blur();
    }

    function undoReadOnly(input) {
        input.attr('readonly', false);
        input.select();
    }

    function openOverflow(element) {
        element.show().stop().animate({
            height: '120px'
        }, 300, beizer);
    }

    function closeOverflow(element, callback) {
        element.stop().animate({
            height: '0'
        }, 300, beizer, function() {
            $(this).hide();
        });
        if (callback) {
            callback();
        }
    }

    $(document).on('click', '.doc-overflow', function(e) {
        e.stopPropagation();
        var thisOverflow = $(this).parent().find('.overflow-menu');
        closeOverflow($('.overflow-menu'), function() {
            openOverflow(thisOverflow);
        })
    })


    $(document).on('click', '.document-title', function(e) {
        if ($(this).attr('readonly') === undefined) {
            e.stopImmediatePropagation();
            e.stopPropagation();
        }
    });

    $(document).on('click', '.doc-delete', function(e) {
        e.stopPropagation();
        var index = $(this).parent().parent().index();
        var doc = getDoc(index);
        deleteDoc(doc);
    });

    $(document).on('click', '.doc-rename', function() {
        undoReadOnly($(this).parent().parent().find('input'));
    });

    $(document).on('keyup', '.document-title', function(e) {
        var index = $(this).parent().index();
        var doc = getDoc(index);
        var title = $(this).val();

        if (e.keyCode == 13) {
            makeReadOnly($(this));
            if (title == doc.name) {} else {
                doc.setFileEntry(null);
                doc.setName(title);
            }
        }
    })

    $(document).on('blur', '.document-title', function(e) {
        var index = $(this).parent().index();
        var doc = getDoc(index);
        var title = $(this).val();

        makeReadOnly($(this));
        if (title == doc.name) {} else {
            doc.setFileEntry(null);
            doc.setName(title);
        }
    });

    $(document).on('click', function() {
        closeOverflow($('.overflow-menu'));
    });

    $(document).on('click', '.ql-editor img', function(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
    });

    function loadScreen() {
        setTimeout(function() {
            if (settings.statistics == true) {
                var doc = getDoc(documentAct(true));
                calcStats(doc.editor.getText());
            }
            $loadingScreen.stop().animate({
                top: '-100%'
            }, 800, beizer, function() {
                $(this).remove();
            });
        }, 600);
    }

    function saveData() {
        setStorage({
            settings: settings,
            data: documents
        });
    }

    function getImage(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    function idealTextColor(bgColor) {

        var nThreshold = 105;
        var components = bgColor;
        var bgDelta = (components.r * 0.299) + (components.g * 0.587) + (components.b * 0.114);

        return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";
    }

    function revokeToken() {
        chrome.identity.removeCachedAuthToken({
            token: current_token
        }, function() {});
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' +
            current_token);
        xhr.send();
    }

    function getToken(install, callback) {
        if (navigator.onLine) {
          var gService = analytics.getService('Writer');
          gService.getConfig().addCallback(function(config) {
            config.setTrackingPermitted(true);
          });

        var gTracker = gService.getTracker('UA-96857701-1');
            gTracker.sendAppView('MainView');
            
            chrome.identity.getAuthToken({
                'interactive': true
            }, function(token) {
                current_token = token;
                if (chrome.runtime.lastError) {
                    if (install === false) {
                        revokeToken();
                    } else {
                        loadScreen();
                        $installScreen.show();
                        setStorage({
                            installed: false
                        });
                    }
                } else {
                    $.get('https://www.googleapis.com/plus/v1/people/me?access_token=' + token, function(profile) {
                        var coverURL = profile.cover.coverPhoto.url;
                        var imageURL = profile.image.url;
                        var name = profile.displayName;
                        getImage(imageURL, function(data) {
                            $('.user-image').css('background-image', 'url(' + data + ')');
                            var img = document.createElement('img');
                            img.setAttribute('src', data)
                            img.addEventListener('load', function() {
                                var vibrant = new Vibrant(img);
                                var color = vibrant.DarkMutedSwatch.rgb;
                                var realColor = color.join(',');
                                var ideal = idealTextColor(color);
                                $('.user-info').css('color', ideal);

                                $('.fallback-signin').hide();
                                $('.sign-out').css({
                                    backgroundColor: 'rgb(' + realColor + ')',
                                    color: ideal
                                });
                                $('.sign-out .material-icons').css('color', ideal);
                                $('.user-profile-body').show();

                                setStorage({
                                    installed: true,
                                    signIn: true
                                });

                                if (callback) {
                                    $installScreen.stop().animate({
                                        top: '-100%'
                                    }, 800, beizer, function() {
                                        $(this).remove();
                                    });
                                    callback();
                                }

                            });
                        });
                        getImage(coverURL, function(data) {
                            $('.user-profile').css('background-image', 'url(' + data + ')');
                        });

                        $('.user-name').text(name);
                        chrome.identity.getProfileUserInfo(function(info) {
                            $('.user-email').text(info.email);
                        })
                    }).fail(function() {
                        revokeToken();
                    });
                }
            });
        } else {
            $installScreen.hide();
            realLoad();
        }
    }

    var current_token;

    function loadData(callback) {
        getStorage({
            installed: 'installed',
            signIn: 'signIn'
        }, function(ist) {
            var installed = ist.installed;
            var signIn = ist.signIn;
            if (installed == 'installed' || installed === false || signIn == 'signIn') {
                loadScreen();
                $installScreen.show();
            } else {
                if (signIn === false) {
                    realLoad();
                } else {
                    getToken(false, realLoad);
                }
            }
        });
    }

    $('.signin-button').click(function() {
        getToken(true, realLoad);
    });

    $('.fallback-signin').click(function() {
        getToken(false);
    });

    $('.continue-button').click(function() {
        $installScreen.stop().animate({
            top: '-100%'
        }, 400, beizer, function() {
            $(this).remove();
            realLoad();
        });

        setStorage({
            installed: true,
            signIn: false
        });
    });

    function openNavBar() {
        clearTimeout(navTimeout);
        $navBar.stop().animate({
            top: '0'
        }, 400, beizer);
        $mainContainer.css('margin-top', '30px');
        $mainContainer.css('height', 'calc(100% - 30px)');
        $modal.css('margin-top', '30px');
        $modal.css('height', 'calc(100% - 30px)');
    }

    var navTimeout;

    function closeNavBar() {
        clearTimeout(navTimeout);
        navTimeout = setTimeout(function() {
            $navBar.stop().animate({
                top: '-30px'
            }, 400, beizer);
            $mainContainer.css('margin-top', '0px');
            $mainContainer.css('height', '100%');
            $modal.css('margin-top', '0px');
            $modal.css('height', '100%');
        }, 1000);
    }

    openNavBar();

    document.addEventListener('scroll', function(event) {
        var doc = getDoc(documentAct(true));
        doc.scrollTop = qlEditor().scrollTop();
    }, true);

    function getOS() {
        var OSName = 'Unknown OS';
        var version = navigator.appVersion;

        if (version.indexOf('Win') != -1) OSName = 'Windows';
        if (version.indexOf('Mac') != -1) OSName = 'MacOS';
        if (version.indexOf('X11') != -1) OSName = 'UNIX';
        if (version.indexOf('Linux') != -1) OSName = 'Linux';

        return OSName;
    }

    function getKey(e, numb) {
        return (e.keyCode == numb);
    }

    function getCntKey(e) {
        if (getOS() == 'MacOS') {
            return e.metaKey;
        } else {
            return e.ctrlKey;
        }
    }

    function getShiftKey(e) {
        return e.shiftKey;
    }

    function getAltKey(e) {
        return e.altKey;
    }


    $(document).on('keydown', function(e) {

        var CTRL_KEY = getCntKey(e),
            SHIFT_KEY = getShiftKey(e),
            ALT_KEY = getAltKey(e),
            NEW = CTRL_KEY && !SHIFT_KEY && getKey(e, 78),
            OPEN = CTRL_KEY && !SHIFT_KEY && getKey(e, 79),
            SAVE = CTRL_KEY && !SHIFT_KEY && !ALT_KEY && getKey(e, 83),
            SAVE_AS = CTRL_KEY && SHIFT_KEY && !ALT_KEY && getKey(e, 83),
            PRINT = CTRL_KEY && getKey(e, 80),
            FULLSCREEN = getKey(e, 122),
            COFFEE = CTRL_KEY && SHIFT_KEY && getKey(e, 67),
            NIGHTMODE = CTRL_KEY && SHIFT_KEY && getKey(e, 78),
            FOCUS = CTRL_KEY && SHIFT_KEY && getKey(e, 70),
            STATISTICS = CTRL_KEY && ALT_KEY && !SHIFT_KEY && getKey(e, 83),
            DELETE = CTRL_KEY && ALT_KEY && getKey(e, 81),
            HELP = CTRL_KEY && getKey(e, 191),
            CLOSE = getKey(e, 27);

        if (NEW) {
            e.preventDefault();
            $new.click();
        }

        if (OPEN) {
            $open.click();
        }

        if (SAVE) {
            $save.click();
        }

        if (SAVE_AS) {
            $saveAs.click();
        }

        if (PRINT) {
            $print.click();
        }

        if (FULLSCREEN) {
            if (chrome.app.window.current().isFullscreen()) {
                chrome.app.window.current().restore();
            } else {
                chrome.app.window.current().fullscreen();
            }
        }

        if (COFFEE) {
            $coffeeMode.click();
        }

        if (NIGHTMODE) {
            e.preventDefault();
            $nightMode.click();
        }

        if (FOCUS) {
            $focus.click();
        }

        if (STATISTICS) {
            $statistics.click();
        }

        if (CLOSE) {
            e.preventDefault();
            closeWindow();
        }

        if (HELP) {
            if ($helpContainer.is(':visible')) {
                closeNavBar();
                closeModal($helpContainer);
            } else {
                openNavBar();
                openModal($helpContainer);
            }
        }

        if (DELETE) {
            var doc = getDoc(documentAct(true));
            deleteDoc(doc);
        }

    });

    $message.on('keydown keyup change', function() {
        $(this).css('height', 'auto');
        $(this).css('height', this.scrollHeight + 'px');
    });

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.max || message.min || message.restored) {
            undoFullScreen();
        }
        if (message.full) {
            fullScreen();
        }
        if (message.open) {
            openLaunchData();
        }
    });

    $('.sign-out').css({
        height: '0',
        display: 'none'
    });

    function openSignOut() {
        $('.arrow-down .material-icons').css('transform', 'rotate(180deg)');
        $('.sign-out').show().stop().animate({
            height: '60px'
        }, 200, beizer);
    }

    function closeSignOut() {
        $('.arrow-down .material-icons').css('transform', 'rotate(0deg)');
        $('.sign-out').stop().animate({
            height: '0px'
        }, 200, beizer, function() {
            $(this).hide();
        });
    }

    function applySignOut() {
        $('.user-profile').css('background-image', 'url(../assets/sidebar/fallback.png)');
        $('.user-profile-body').hide();
        $('.fallback-signin').show();
    }

    $('.arrow-down').click(function() {
        if ($('.sign-out').is(':visible')) {
            closeSignOut();
        } else {
            openSignOut();
        }
    });

    $('.sign-out').click(function() {
        revokeToken();
        closeSignOut();
        applySignOut();
        setStorage({
            signIn: false
        });
    });

    function setStorage(storage, callback) {
        chrome.storage.local.set(storage, callback);
    }

    function getStorage(storage, callback) {
        chrome.storage.local.get(storage, callback);
    }

    function nextTutorial() {
        $('.tutorial-container').fadeOut('fast', function() {
            qlEditor().blur();
            window.getSelection().removeAllRanges();
            $('.tutorial-container-two').fadeIn('fast');
        });
    }

    $('.tutorial-container .tutorial-close').click(function() {
        nextTutorial();
    });

    $('.tutorial-container-two .tutorial-close').click(function() {
        $('.tutorial-container-two').fadeOut('fast');
        qlEditor().focus();
    });

    $mainContainer.click(function() {
        if ($('.tutorial-container').is(':visible')) {
            nextTutorial();
        } else if ($('.tutorial-container-two').is(':visible')) {
            $('.tutorial-container-two').fadeOut('fast');
        }
    });

    function realLoad() {
        getStorage({
            settings: 'settings',
            data: 'documents'
        }, function(item) {
            var settings = item.settings,
                data = item.data;

            if (settings == 'settings' || data == 'documents') {
                $('.tutorial-container').fadeIn('fast');
                newDoc(true);
                loadSettings(defaults);
                loadScreen();
            } else {
                var counter = 0;
                if (data.length === 0) {
                    newDoc(true);
                    loadSettings(settings);
                    loadScreen();
                } else {
                    data.forEach(function(value, index, array) {
                        var thisData = data[index];
                        var name = thisData.name;
                        var content = thisData.contents;
                        var size = thisData.size;
                        var savedFileEntry = thisData.savedFileEntry;
                        var active = thisData.isActive;
                        var changed = thisData.changed;
                        newDoc(false, name, content, size, savedFileEntry, active, changed);

                        documentAct().children().first().children().css('opacity', '0.6');
                        documentAct().children().first().children().first().css('opacity', '1');

                        counter++;
                        if (counter === array.length) {
                            openLaunchData();
                            loadSettings(settings);
                            loadScreen();
                        }
                    });
                }
            }
        });
    }

    loadData(realLoad);

    function openLaunchData() {
        if (launchData && launchData.items) {
            for (var i = 0; i < launchData.items.length; i++) {
                var temp = [];
                temp.push(launchData.items[i].entry);
                openFiles(temp);
            }
        }
    }

    function closeWindow() {
        chrome.app.window.current().close();
    }

    $('.close-window').click(function() {
        closeWindow();
    });

    $('.maximize-window').click(function() {
        if (chrome.app.window.current().isMaximized() || chrome.app.window.current().isFullscreen()) {
            chrome.app.window.current().restore();
        } else {
            chrome.app.window.current().maximize();
        }
        if (!$modal.is(':visible')) {
            qlEditor().focus();
        }
    });

    $('.minimize-window').click(function() {
        chrome.app.window.current().minimize();
    });
});
