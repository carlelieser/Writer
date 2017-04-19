// Writer
// Version 5.5.7
// Author : Carlos E. Santos
// Made with <3
$(document).ready(function () {

    require.config({
        paths: {
            'upndown': '/assets/libs/upndown/lib/upndown.bundle.min'
        }
    });

    var $html = $('html'),
        $body = $('body'),
        $topBar = $('.top-bar'),
        $documentList = $('.document-list'),
        $gDocList = $('.gdocument-list'),
        $mainContainer = $('.main-container'),
        $navBar = $('.navigation-container'),
        $sideBar = $('.sidebar'),
        $sideToggle = $('.dumbass-indicator'),
        $settings = $('.settings-container'),
        $modal = $('.modal'),
        $bg = $('.bg');

    var $loadingScreen = $('.loading-screen');

    var $installScreen = $('.install-screen');

    var $toggle = $('.toggle');

    var $typeWriter = $('.type'),
        $coffeeMode = $('.coffee'),
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
        $gDocumentContainer = $('.gdocument-container'),
        $settingsContainer = $('.settings-container'),
        $feedBackContainer = $('.feedback-container'),
        $detailsContainer = $('.details-container'),
        $helpContainer = $('.help-container'),
        $fileContainer = $('.file-container'),
        $templatesContainer = $('.templates-container');

    var $docButton = $('.open-documents'),
        $settingsButton = $('.open-settings'),
        $feedback = $('.open-feedback'),
        $details = $('.open-details'),
        $help = $('.open-help'),
        $file = $('.open-file'),
        $templates = $('.open-templates'),
        $gDocs = $('.open-gdocuments'),
        $modalClose = $('.modal-close');

    var $new = $('.new'),
        $open = $('.open'),
        $save = $('.save'),
        $saveAs = $('.save-as'),
        $print = $('.print');

    var $snackBar = $('.snackbar');

    var $statisticsBar = $('.statistics-bar');

    var $saveDialogue = $('.save-dialogue');

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

    function createAudio(path) {
        var keyAudio = new Audio(path);
        return keyAudio;
    }

    var randomNumber;

    function getRandomInt(min, max) {
        var number = Math.floor(Math.random() * (max - min + 1)) + min;
        while (number == randomNumber) {
            number = Math.floor(Math.random() * (max - min + 1)) + min;
        }

        randomNumber = number;
        return number;
    }

    function getSpecialAudio(enter) {
        if (enter) {
            return typeWriterSounds.special.enter;
        } else {
            return typeWriterSounds.special.space;
        }
    }

    function getRandomAudio() {
        var random = getRandomInt(0, 8);
        var keys = typeWriterSounds.keys;
        var key = keys[random];
        return keys[random];
    }

    var typeWriterSounds = {
        keys: {
            0: createAudio('/assets/settings/typewriter/type1A.mp3'),
            1: createAudio('/assets/settings/typewriter/type1B.mp3'),
            2: createAudio('/assets/settings/typewriter/type1C.mp3'),
            3: createAudio('/assets/settings/typewriter/type1D.mp3'),
            4: createAudio('/assets/settings/typewriter/type1E.mp3'),
            5: createAudio('/assets/settings/typewriter/type2A.mp3'),
            6: createAudio('/assets/settings/typewriter/type2B.mp3'),
            7: createAudio('/assets/settings/typewriter/type2C.mp3'),
            8: createAudio('/assets/settings/typewriter/type2D.mp3'),
        },
        special: {
            enter: createAudio('/assets/settings/typewriter/enter.mp3'),
            space: createAudio('/assets/settings/typewriter/space.mp3')
        }
    }

    var defaults = {
        type: false,
        coffee: false,
        night: false,
        full: false,
        statistics: false,
        focus: true,
        font: 'Droid Serif',
        size: '14px',
        theme: 'default',
        line: 'double',
        margin: 'medium'
    }

    var settings = {
        type: false,
        coffee: false,
        night: false,
        full: false,
        statistics: false,
        focus: true,
        font: 'Droid Serif',
        size: '14px',
        theme: 'default',
        line: 'double',
        margin: 'medium'
    }

    function changeSettings(key, val) {
        settings[key] = val;
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

                    $(correspondingDropdown).children().filter(function () {
                        return $(this).text() == capitalizeFirstLetter(value);
                    }).each(function () {
                        $(this).click();
                        setTimeout(function () {
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

    var newDocumentString = '<div class="document-item"><div class="material-icons">insert_drive_file</div><input readonly=true class="document-title" type="text"/><div class="doc-overflow"><div class="material-icons">more_vert</div></div><div class="overflow-menu"><div class="doc-rename">Rename</div><div class="doc-upload">Upload</div><div class="doc-delete">Close</div></div><div class="document-size"></div></div>';
    var mainDocumentString = '<div class="document document-active"></div>';

    $('.sidebar, .settings-container, .document-container, .bg, .option, .snackbar, .gdoc-loading-container').hide();

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

    Doc.prototype.setName = function (name) {
        this.name = name;
    }

    Doc.prototype.getName = function () {
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

    Doc.prototype.setContents = function (contents) {
        if (isHTML(contents)) {
            contents = createTempEditor(contents);
        }
        this.contents = contents;
    }

    Doc.prototype.getContent = function () {
        return this.contents;
    }

    Doc.prototype.setSize = function (size) {
        this.size = size;
    }

    Doc.prototype.getSize = function () {
        return this.size;
    }

    Doc.prototype.setFileEntry = function (fileEntry) {
        if (typeof fileEntry === 'string') {
            this.loadFileEntry(fileEntry);
        } else {
            this.fileEntry = fileEntry;
            if (fileEntry === null || fileEntry === undefined || fileEntry === false) {

            } else {
                this.path = this.fileEntry.fullPath;
                this.setName(fileEntry.name);
                this.setSavedFileEntry(fileEntry);
            }
        }
    }

    Doc.prototype.getFileEntry = function () {
        return this.fileEntry;
    }

    Doc.prototype.setSavedFileEntry = function (fileEntry) {
        this.savedFileEntry = chrome.fileSystem.retainEntry(fileEntry);
    }

    Doc.prototype.getSavedFileEntry = function () {
        return this.savedFileEntry;
    }

    Doc.prototype.loadFileEntry = function (string) {
        var thisDOC = this;
        chrome.fileSystem.restoreEntry(string, function (newFileEntry) {
            thisDOC.setFileEntry(newFileEntry);
            thisDOC.path = thisDOC.fileEntry.fullPath;
        });
    }

    Doc.prototype.createEditor = function (element) {
        var bindings = {
            alignLeft: {
                key: 'W',
                shortKey: true,
                handler: function (range, context) {
                    if (context.format.align != 'left') {
                        this.quill.formatLine(range, 'align', false);
                    }
                }
            },
            alignCenter: {
                key: 'E',
                shortKey: true,
                handler: function (range, context) {
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
                handler: function (range, context) {
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
                handler: function (range, context) {
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
                handler: function (range, context) {
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
                handler: function (range, context) {
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
                handler: function (range, context) {
                    if (context.format['code-block'] == true) {
                        this.quill.formatLine(range, 'code-block', false);
                    } else {
                        this.quill.formatLine(range, 'code-block', true);
                    }
                }
            },
            indentParagraph: {
                key: 'BRACKETR',
                collapsed: true,
                shiftKey: true,
                handler: function (range, context) {
                    if (context.format.indent) {
                        this.quill.formatLine(range, 'indent', '+1');
                    } else {
                        this.quill.formatLine(range, 'indent', '1');
                    }
                }
            },
            outdentParagraph: {
                key: 'BRACKETL',
                collapsed: true,
                shiftKey: true,
                handler: function (range, context) {
                    if (context.format.indent) {
                        this.quill.formatLine(range, 'indent', '-1');
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
                        'indent': '-1'
                    }, {
                        'indent': '+1'
                    }],
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
        this.editor.on('text-change', function () {
            doc.changed = true;
            if (settings.statistics == true) {
                calcStats(doc.editor.getText());
            }
            if ($('.tutorial-container').is(':visible')) {
                nextTutorial();
            }
            if ($saveDialogue.is(':visible')) {
                closeSave();
            }
        });

        if ($(element).hasClass('document-active')) {
            removeAnim();
            editorDOM.children().first().focus();
        }

    }

    function applyAll() {
        $fontChildren.filter(function () {
            return $(this).hasClass('active');
        }).each(function () {
            $(this).click();
            setTimeout(function () {
                $optionContainer.css('height', '0');
                $optionContainer.hide();
            }, 200);
        });

        $sizeChildren.filter(function () {
            return $(this).hasClass('active');
        }).each(function () {
            $(this).click();
            setTimeout(function () {
                $optionContainer.css('height', '0');
                $optionContainer.hide();
            }, 200);
        });

        $lineChildren.filter(function () {
            return $(this).hasClass('active');
        }).each(function () {
            $(this).click();
            setTimeout(function () {
                $optionContainer.css('height', '0');
                $optionContainer.hide();
            }, 200);
        });

        $marginChildren.filter(function () {
            return $(this).hasClass('active');
        }).each(function () {
            $(this).click();
            setTimeout(function () {
                $optionContainer.css('height', '0');
                $optionContainer.hide();
            }, 200);
        });
    }

    Doc.prototype.getEditor = function () {
        return this.editorDOM;
    }

    Doc.prototype.getDocItem = function () {
        return this.docListItem;
    }

    Doc.prototype.setActive = function (active) {
        this.isActive = active;
    }

    Doc.prototype.showCreate = function (name, size, active) {
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

    Doc.prototype.show = function (index) {
        $documentList.children().removeClass('doc-active');
        this.docListItem.addClass('doc-active');
        $mainContainer.children().removeClass('document-active');
        $mainContainer.children().eq(index).attr('class', 'document-' + index + ' document-active ql-container ql-bubble');
        this.editorDOM.scrollTop(this.scrollTop);
        this.setActive(true);

        if (settings.statistics == true) {
            calcStats(this.editor.getText());
        }
    }

    Doc.prototype.create = function (name, size, active) {
        this.setName(name);
        this.setContents('');
        this.setSize(size);
        this.setFileEntry(false);
        this.showCreate(name, size, active);
    }

    function isHTML(string) {
        return /<[\s\S]*>/i.test(string);
    }

    String.prototype.replaceAll = function (search, replacement) {
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

        indices.forEach(function (value, index, array) {
            if (start < value) {
                return value;
            }
        });
    }

    function getStyle(element, styleProp) {
        var style = element.attr('style');
        var index = style.lastIndexOf(styleProp + ':') + styleProp.length + 1;
        style = style.substring(index, getNextIndex(style, index, ':'));
        style = style.replace(';', '');
        return style;
    }

    $.fn.getStyleObject = function () {
        var dom = this.get(0);
        var style;
        var returns = {};
        if (window.getComputedStyle) {
            var camelize = function (a, b) {
                return b.toUpperCase();
            }
            style = window.getComputedStyle(dom, null);
            for (var i = 0; i < style.length; i++) {
                var prop = style[i];
                var camel = prop.replace(/\-([a-z])/g, camelize);
                var val = style.getPropertyValue(prop);
                returns[camel] = val;
            }
            return returns;
        }
        if (dom.currentStyle) {
            style = dom.currentStyle;
            for (var prop in style) {
                returns[prop] = style[prop];
            }
            return returns;
        }
        return this.css();
    }

    function filterCSS(css) {
        var wanted = ['textDecoration', 'textAlign', 'fontWeight', 'fontStyle', 'marginLeft'];
        var filtered = {};
        wanted.forEach(function (element) {
            filtered[element] = css[element];
        });
        return filtered;
    }

    function createElementHTML(element) {
        var elem = $(document.createElement(element));
        return elem;
    }

    function cleanHTML(html) {
        var htmlParent = $(document.createElement('div'));
        htmlParent.addClass('htmlParent');
        htmlParent.html(html);

        htmlParent.find('br').remove();

        htmlParent.find('*').each(function () {
            if (isEmpty($(this))) {
                $(this).html('<br/>');
            }
            if ($(this).attr('style')) {
                if ($(this).attr('style').indexOf('text-align') > -1) {
                    var prop = getStyle($(this), 'text-align');
                    prop = prop.trim();
                    $(this).addClass('ql-align-' + prop);
                    $(this).removeAttr('style');
                }
            }
            if ($(this).is('p')) {
                if ($(this).attr('style')) {
                    if ($(this).attr('style').indexOf('margin-left') > -1) {
                        var paragraphIndent = getStyle($(this), 'margin-left');
                        paragraphIndent = Number(paragraphIndent.replace('pt', ''));
                        paragraphIndent = Math.floor(paragraphIndent / 36);
                        if (paragraphIndent != 0) {
                            $(this).attr('class', 'ql-indent-' + paragraphIndent);
                            $(this).removeAttr('style');
                        }
                    }
                }
            }
        });

        if (htmlParent.find('meta').length) {
            htmlParent.find('meta').remove();
        }

        if (htmlParent.find('script').length) {
            htmlParent.find('script').remove();
        }

        if (htmlParent.find('style').length) {
            if (htmlParent.find('style').text().indexOf('@import') > -1) {
                var importText = htmlParent.find('style').text();
                importText = importText.replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, '');
                htmlParent.find('style').text(importText);
            }
            var tempElem = $(document.createElement('div'));
            tempElem.html(htmlParent.html());
            $('html').append(tempElem);
            tempElem.find('*').each(function () {
                var css = $(this).getStyleObject();
                css = filterCSS(css);
                var html = $(this).get(0).outerHTML;
                var element;
                $(this).css(css);

                if ($(this).css('font-weight') == 'bold') {
                    element = createElementHTML('strong');
                    $(this).wrap(element);
                }

                if ($(this).css('font-style') == 'italic') {
                    element = createElementHTML('em');
                    $(this).wrap(element);
                }

                if ($(this).css('text-decoration').indexOf('underline') > -1) {
                    element = createElementHTML('u');
                    $(this).wrap(element);
                }

                if ($(this).css('text-decoration').indexOf('line-through') > -1) {
                    element = createElementHTML('s');
                    $(this).wrap(element);
                }

                if ($(this).is('p')) {
                    var paragraphIndent = $(this).css('margin-left');
                    paragraphIndent = Number(paragraphIndent.replace('px', ''));

                    paragraphIndent = Math.floor(paragraphIndent / 48);
                    if (paragraphIndent != 0) {
                        $(this).attr('class', 'ql-indent-' + paragraphIndent);
                    }
                }
            });
            htmlParent.html(tempElem.html());
            tempElem.remove();
            htmlParent.find('style').remove();
        }


        htmlParent.find('ol, ul').each(function () {
            var indent = ($(this).parentsUntil(htmlParent).length);

            if (indent != -1 && indent != 0) {
                $(this).children().not('ol').not('ul').attr('class', 'ql-indent-' + indent);
            }
        });


        htmlParent.find('li').each(function () {
            if ($(this).find('li').length) {
                $(this).find('li').insertAfter($(this));
            }
            if ($(this).parent().attr('class')) {
                if ($(this).parent().attr('class').indexOf('lst-kix_list_') > -1) {
                    var indent = $(this).parent().attr('class').match(/-\d/g)[0];
                    indent = Number(indent.replace('-', ''));
                    if (indent != -1 && indent != 0) {
                        $(this).attr('class', 'ql-indent-' + indent);
                    }
                }
            }
        });

        htmlParent.find('ol, ul').each(function () {
            if (!$(this).parent().is(htmlParent)) {
                var cnt = $(this).contents();
                $(this).replaceWith(cnt);
            }
        });

        htmlParent.find('div').each(function () {
            $(this).replaceWith('<p>' + $(this).html() + '</p>');
        });

        htmlParent.find('span').each(function () {
            var cnt = $(this).contents();
            $(this).replaceWith(cnt);
        });

        htmlParent.find('p').each(function () {
            if ($(this).parent().is('li') || $(this).parent().is('blockquote')) {
                var cnt = $(this).contents();
                $(this).replaceWith(cnt);
            }
        });

        htmlParent.find('table').remove();

        if (htmlParent.find('body').length) {
            if (!isEmpty(htmlParent.find('body').children().last())) {
                htmlParent.find('body').append('<p></br></p>');
            }
        } else {
            if (!isEmpty(htmlParent.children().last())) {
                htmlParent.append('<p></br></p>');
            }
        }

        htmlParent.find('strong, em, u, s').filter(function () {
            return $(this).children().length != 0;
        }).each(function () {
            if ($(this).find('h1, h2, h3, h4, h5, h6').length) {
                var cnt = $(this).contents();
                $(this).replaceWith(cnt);
            }
        });

        var cleaned = cleanDoc(htmlParent.html());
        return cleaned;
    }

    Doc.prototype.setEditorContents = function (content) {
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

    Doc.prototype.load = function (name, content, size, savedFileEntry, changed, id) {
        this.setName(name);
        this.setContents(content);
        this.setEditorContents(content);
        this.setSize(size);
        this.setFileEntry(savedFileEntry);
        this.changed = changed;
        this.fileID = id;
    }

    Doc.prototype.loadFile = function (name, size, fileEntry, changed) {
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

    Doc.prototype.save = function () {
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
        closeModals(false);
        openBg();
        $('.save-dialogue .save-text span').text(doc.name);
        $saveDialogue.show().stop().animate({
            top: '50%',
            opacity: '1'
        }, 300, beizer, function () {
            qlEditor().blur();
            window.getSelection().removeAllRanges();
        });

        deleteIndex = documents.indexOf(doc);
    }

    function closeSave(blur) {
        closeBg();
        $saveDialogue.stop().animate({
            top: '55%',
            opacity: '0'
        }, 300, beizer, function () {
            $(this).hide();
            if (blur) {
                qlEditor().blur();
                window.getSelection().removeAllRanges();
            } else {
                focusEditor(documentAct(true));
                focusOnElem();
                var editorScrollTop = getDoc(documentAct(true)).scrollTop;
                documentAct().children().first().scrollTop(editorScrollTop);
            }
        });
    }

    $('.save-buttons .delete-cancel').click(function () {
        closeSave();
    });

    $('.save-buttons .delete-confirm').click(function () {
        var doc = getDoc(deleteIndex);
        doc.changed = false;
        doc.delete();
        closeSave();
    });

    Doc.prototype.delete = function () {
        if (this.changed) {
            openSave(this);
        } else {
            var index = documents.indexOf(this);
            this.editorDOM.parent().remove();
            this.docListItem.remove();
            documents.splice(index, 1);

            if (documents.length === 0) {
                newDoc(true);
                closeModals(true);
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

    function getAlign(prop) {
        if (prop.indexOf('ql-align-') > -1) {
            var align = prop.match(/ql-align-[^\s]+/);
            if (align != null) {
                align = align[0];
                align = align.replace('ql-align-', '');
                return align;
            } else {
                return false;
            }
        }
    }

    function getMargin(prop) {
        if (prop.indexOf('ql-indent-') > -1) {
            var indent = prop.match(/ql-indent-[^\s]+/);
            if (indent != null) {
                indent = indent[0];
                indent = Number(indent.replace('ql-indent-', ''));
                indent = indent * 36;
                return indent;
            } else {
                return false;
            }
        }
    }

    function cleanStyles(html) {
        var temp = $(document.createElement('div'));
        temp.html(html);

        temp.find('*').removeAttr('style');

        temp.find('*').each(function () {
            var prop = $(this).attr('class');
            if (prop) {
                var align = getAlign(prop)
                if (align) {
                    $(this).attr('style', 'text-align:' + align + ';');
                }

                if ($(this).is('p')) {
                    var indent = getMargin(prop);
                    if (indent) {
                        $(this).attr('style', 'margin-left:' + indent + 'pt;');
                    }
                }
            }
        });

        temp.find('ul, ol').each(function () {
            var type = '<' + $(this).get(0).nodeName.toLowerCase() + '/>';
            var items = $(this).find('li');
            var start = false;
            var groups = [];
            var counter = 0;

            items.each(function () {
                var index = $(this).index();
                $(this).attr('data', index);
            });

            items.each(function () {
                var index = Number($(this).attr('data'));
                var thisClass = $(this).attr('class');
                if (thisClass) {
                    if (thisClass.indexOf('ql-indent-') > -1) {
                        var thatClass = $(this).parent().find('li[data="' + (index + 1) + '"]').attr('class');
                        if (start === false) {
                            start = index;
                        }
                        if (thatClass != thisClass) {
                            end = index + 1;
                            groups[counter] = {
                                start: start,
                                end: end
                            }
                            counter++;
                            start = false;
                        }
                    }
                }
            });

            var list = $(this);

            groups.forEach(function (value) {
                var start = value.start;
                var end = value.end;
                start = list.find('li[data="' + start + '"]').index();
                end = list.find('li[data="' + end + '"]').index();
                var falseEnd = false;
                if (end == -1) {
                    list.append('<li data="' + value.end + '"></li>');
                    end = list.find('li[data="' + value.end + '"]').index();

                    falseEnd = true;
                }
                list.children().slice(start, end).wrapAll(type);

                if (falseEnd) {
                    list.children().last().remove();
                }
            });
        });

        var ulOlCount = temp.find('ul, ol').length;
        for (var i = 0; i < ulOlCount; i++) {
            temp.find('ul, ol').each(function () {
                var type = $(this).get(0).nodeName.toLowerCase();
                var prev = $(this).prev().children().first().attr('class');
                var index = $(this).children().first().attr('class');
                if ($(this).prev().is(type)) {
                    if (prev) {
                        var prevNumber = Number(prev.replace('ql-indent-', ''));
                        var thisNumber = Number(index.replace('ql-indent-', ''));
                        if (prevNumber < thisNumber) {
                            $(this).insertAfter($(this).prev().children().last());
                        }
                    } else {
                        $(this).insertAfter($(this).prev().children().last());
                    }
                }
            });
        }

        temp.find('ul, ol').each(function () {
            var indent = 0;
            var first = $(this).children().first();
            if (first.attr('class')) {
                indent = Number(first.attr('class').replace('ql-indent-', ''));
            }
            var parents = $(this).parentsUntil(temp).length;
            var type = '<' + $(this).get(0).nodeName.toLowerCase() + '/>';
            while (parents < indent) {
                $(this).wrap(type);
                parents = $(this).parentsUntil(temp).length;
            }
            while (parents > indent) {
                var cnt = $(this).contents();
                $(this).replaceWith(cnt);
            }
        });

        temp.find('*').removeAttr('data');
        temp.find('*').removeAttr('class');
        return temp.html();
    }

    function writeToWriter(fileWriter, doc, blob, entry) {
        fileWriter.write(blob);
        doc.loadFile(entry.name, blob.size, entry, false);
        openSnackBar(false, false, entry.name);
    }

    function exportToFileEntry(fileEntry) {
        if (!fileEntry) {
            console.log('User cancelled saving.');
        } else {
            chrome.fileSystem.getWritableEntry(fileEntry, function (writableFileEntry) {
                writableFileEntry.createWriter(function (fileWriter) {
                    var extension = getExtension(writableFileEntry.name);
                    var doc = getDoc(documentAct(true));
                    var content;
                    var blob;

                    var editorContents = doc.editor.getContents();
                    doc.setContents(editorContents);

                    switch (extension) {
                        case 'html':
                        case 'htm':
                        case 'wtr':
                        default:
                            content = cleanStyles(qlEditor().html());
                            blob = new Blob([content]);
                            writeToWriter(fileWriter, doc, blob, writableFileEntry);
                            break;
                        case 'md':
                            require(['upndown'], function (upndown) {
                                var und = new upndown();
                                und.convert(cleanStyles(qlEditor().html()), function (err, markdown) {
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
                        case 'txt':
                            content = doc.editor.getText();
                            blob = new Blob([content]);
                            writeToWriter(fileWriter, doc, blob, writableFileEntry);
                            break;
                    }
                    var truncated = false;
                    fileWriter.onwriteend = function (e) {
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
        documents.forEach(function (value, index, array) {
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

    function loadDoc(doc, name, content, size, savedFileEntry, changed, id) {
        doc.load(name, content, size, savedFileEntry, changed, id);
    }

    function newDoc(newString, name, content, size, savedFileEntry, active, changed, id) {
        var file = new Doc();
        if (newString != false) {
            name = 'untitled';
            content = '';
            size = '0 KB';
            savedFileEntry = false;
            active = true;
            changed = false;
            createDoc(file, name, size, active);
            addDocument(file);
        } else {
            createDoc(file, name, size, active);
            loadDoc(file, name, content, size, savedFileEntry, changed, id);
            addDocument(file);
            loadImages();
        }
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

    var typeAudio;
    $(document).on('keyup', '.ql-editor', function (e) {

        var navKeys = [37, 38, 39, 40, 13];
        if (navKeys.indexOf(e.keyCode) > -1) {
            editorScroll(true);
        } else {
            editorScroll(false);
        }
        closeNavBar();
        focusOnElem();
    });

    $(document).on('keydown', '.ql-editor', function (e) {
        if (settings.type) {
            var navKeys = [37, 38, 39, 40];
            if (navKeys.indexOf(e.keyCode) == -1) {
                if (getCntKey(e) || getAltKey(e) || getShiftKey(e)) {} else {
                    if (getKey(e, 13)) {
                        typeAudio = getSpecialAudio(true);
                    } else if (getKey(e, 32)) {
                        typeAudio = getSpecialAudio();
                    } else {
                        typeAudio = getRandomAudio();
                    }
                    typeAudio.currentTime = 0;
                    typeAudio.play();
                }
            }
        }
    });

    $(document).on('click select', '.ql-editor', function () {
        if ($saveDialogue.is(':visible')) {
            closeSave();
        }
        editorScroll();
        focusOnElem();
    });

    $topBar.mouseenter(function () {
        openNavBar();
    });

    $(document).on('mouseenter', '.ql-editor', function () {
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
        setTimeout(function () {
            var editor = qlEditor();
            var scroll = editor.scrollTop();
            var nodePos = getSelectionCoords();
            var endScroll = scroll + nodePos.y - (editor.height() / 2) - 100;

            if (key) {
                editor.stop().animate({
                    scrollTop: endScroll
                }, 300, beizer, function () {
                    var doc = getDoc(documentAct(true));
                    doc.scrollTop = endScroll;
                });
            } else {
                editor.filter(':not(:animated)').animate({
                    scrollTop: endScroll
                }, 300, beizer, function () {
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
        if ($saveDialogue.is(':visible')) {
            closeSave(true);
        }
        if (element == $documentContainer) {
            calcDocSize();
        }

        qlEditor().blur();
        window.getSelection().removeAllRanges();

        if ($bg.is(':visible')) {
            element.show().filter(':not(:animated)').animate({
                left: '0'
            }, 200, beizer, function () {
                if (callback) {
                    callback();
                }
            });
        } else {
            $bg.show().filter(':not(:animated)').animate({
                opacity: '0.5'
            }, 200, beizer, function () {
                element.show().filter(':not(:animated)').animate({
                    left: '0'
                }, 200, beizer);
            });
        }
    }

    function openBg(callback) {
        $bg.show().filter(':not(:animated)').animate({
            opacity: '0.5'
        }, 200);
        if (callback) {
            callback();
        }
    }

    function closeBg() {
        $bg.filter(':not(:animated)').animate({
            opacity: '0'
        }, 200, beizer, function () {
            $(this).hide();
            focusEditor(documentAct(true));
            focusOnElem();
            var editorScrollTop = getDoc(documentAct(true)).scrollTop;
            documentAct().children().first().scrollTop(editorScrollTop);
        });
    }

    function closeModal(element, bg, callback) {
        element.filter(':not(:animated)').animate({
            left: '-' + element.width()
        }, 200, beizer, function () {
            $(this).hide();
            if (callback) {
                callback();
            }
        });
        if (bg) {
            closeBg();
        }

    }

    function closeModals(bg, callback) {
        closeModal($modal, bg, callback);
    }

    var elemToFocus;
    $sideToggle.click(function () {
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
            case 'md':
                content = toMarkdown(html);
                blob = new Blob([content]);
                break;
            case 'docx':
                content = '<!DOCTYPE HTML><html><head></head><body>' + html + '</body></html>';
                blob = htmlDocx.asBlob(content);
                break;
            case 'txt':
                content = doc.editor.getText();
                blob = new Blob([content]);
                break;
            case 'html':
            case 'htm':
            case 'wtr':
            default:
                content = html;
                blob = new Blob([content]);
                break;
        }

        return Math.floor(blob.size / 1000);
    }

    function calcDocSize() {
        $documentList.children().each(function () {
            var doc = getDoc($(this).index());
            var size = calcSize(doc);
            if (size > 1000) {
                size = Math.floor(size / 1000);
                doc.setSize(size + ' MB');
                setDocumentSize($(this), size + ' MB');
            } else {
                doc.setSize(size + ' KB');
                setDocumentSize($(this), size + ' KB');
            }
        });
    }

    $docButton.click(function () {
        openModal($documentContainer);
    });

    $settingsButton.click(function () {
        openModal($settingsContainer);
    });

    $bg.click(function () {
        if (!$saveDialogue.is(':visible')) {
            var highestIndex = 0;
            $modal.each(function (index) {
                var currentIndex = parseInt($(this).css('zIndex'), 10);

                if (currentIndex > highestIndex && $(this).is(':visible')) {
                    highestIndex = currentIndex;
                }
            });

            $modal.filter(function () {
                return $(this).css('z-index') == highestIndex;
            }).each(function () {
                if ($modal.filter(function () {
                        return $(this).is(':visible');
                    }).length == 1) {
                    closeModal($(this), true);
                } else {
                    closeModal($(this));
                }
            });
        } else {
            closeSave();
        }
    });

    $modalClose.click(function () {
        $bg.click();
    });

    $new.click(function () {
        newDoc(true);
        closeModals(true);
    });

    function readAsArrayBuff(file, entry) {
        var reader = new FileReader();
        reader.onload = function () {
            var content = this.result;

            if (content.indexOf('<w:altChunk r:id="htmlChunk" />') > -1) {
                content = content.substring(content.lastIndexOf('<!DOCTYPE HTML><html><head></head><body>') + 15, content.lastIndexOf('</body></html>'));
                newDoc(false, file.name, content, file.size, entry, true, false);
                closeModals(true);
            } else {
                var secReader = new FileReader();
                reader.onload = function () {
                    var content = this.result;
                    mammoth.convertToHtml({
                        arrayBuffer: content
                    }).then(function (result) {
                        content = result.value;
                        newDoc(false, file.name, content, file.size, entry, true, false);
                        closeModals(true);
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
        reader.onload = function () {
            var content = this.result;
            if (markdown) {
                content = convertNewLines(content);
                content = marked(content);
                content = cleanHTML(content);
                newDoc(false, file.name, content, file.size, entry, true, false);
            } else {
                newDoc(false, file.name, content, file.size, entry, true, false);
            }
            closeModals(true);
            closeBg();
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
        files.forEach(function (value, index, array) {
            var entry = value;
            var path = entry.fullPath || '';
            if (checkForPath(path) == true) {
                closeModals(true);
                openSnackBar(true, 'is already open.', entry.name);
            } else {
                entry.file(function (file) {
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

    $open.click(function () {
        chrome.fileSystem.chooseEntry({
            type: 'openFile',
            acceptsMultiple: true,
            accepts: accepts
        }, function (files) {
            openFiles(files);
        });
    });

    $save.click(function () {
        var doc = getDoc(documentAct(true));
        doc.save();

        closeModals(true);
    });

    $saveAs.click(function () {
        var doc = getDoc(documentAct(true));
        var name = doc.name;
        ExportToDisk(name);
        closeModals(true);
    });

    $print.click(function () {
        var html = qlEditor().html();
        var copyString = '<div class="ql-editor" id="print"></div>';
        $html.append(copyString);
        var copy = $('#print');
        copy.html(html);
        copy.css({
            fontSize: settings.size,
            fontFamily: settings.font,
            lineHeight: settings.line
        });
        window.print();
        copy.remove();
    });

    $file.click(function () {
        openModal($fileContainer);
    });

    $templates.click(function () {
        openModal($templatesContainer);
    });

    $templatesContainer.children().last().children().click(function () {
        closeModals(true);
    });

    function updateQueryStringParameter(uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            return uri + separator + key + "=" + value;
        }
    }

    String.prototype.replaceAt = function (index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }

    function constructHTML(array) {
        var htmlString = '';
        var itemString = '<div class="gdoc-icon"></div><div class="gdoc-title"></div><div class="gdoc-date"></div>';
        var tempElem = $(document.createElement('div'));
        array.forEach(function (object) {
            var thisElem = $(document.createElement('div'));
            thisElem.html(itemString);
            var docTitle = object.title;
            var date = object.modifiedDate;
            var readableDate = new Date(Date.parse(date));
            readableDate = readableDate.toDateString();
            readableDate = readableDate.substring(readableDate.indexOf(' ') + 1, readableDate.length);
            readableDate = readableDate.replaceAt(readableDate.lastIndexOf(' '), ',');
            readableDate = readableDate.replace(',', ', ');
            thisElem.attr('class', 'gdoc');
            thisElem.attr('data', object.id);
            thisElem.find('.gdoc-title').text(docTitle);
            thisElem.find('.gdoc-date').text(readableDate);
            tempElem.append(thisElem);
        });

        return tempElem.html();
    }

    function loadGDocs() {
        requestAccess(false, function (token) {
            var url = 'https://www.googleapis.com/drive/v2/files';
            url = updateQueryStringParameter(url, 'maxResults', 50);
            url = updateQueryStringParameter(url, 'q', 'mimeType="application/vnd.google-apps.document" and trashed=false');
            url = updateQueryStringParameter(url, 'access_token', token);
            $.get(url, function (files) {
                var files = files.items;
                var html = constructHTML(files);
                $gDocList.html(html);
                $gDocList.css('background-image', 'none');
            });
        });
    }

    function docIDExists(id) {
        var exists = function (element) {
            if (element.fileID == id) {
                return element;
            }
        };

        return documents.find(exists);
    }

    function loadGFile(id) {
        var gdocExists = docIDExists(id);
        if (gdocExists) {
            gdocExists.docListItem.click();
        } else {
            requestAccess(false, function (token) {
                var url = 'https://www.googleapis.com/drive/v2/files/' + id;
                url = updateQueryStringParameter(url, 'access_token', token);
                $.get(url, function (data) {
                    var downloadUrl = '';
                    var xhr = new XMLHttpRequest();
                    openGDOCLoader();
                    if (data.exportLinks) {
                        downloadURL = data.exportLinks['text/html'];
                        xhr.onload = function () {
                            var content = xhr.response;
                            content = cleanHTML(content);
                            newDoc(false, data.title, content, '0 KB', false, true, false, id);
                            closeModals(true);
                            closeGDOCLoader();
                        };
                    } else if (data.downloadUrl) {
                        downloadURL = data.downloadUrl;
                        xhr.onload = function () {
                            var content = xhr.response;
                            var extension = getExtension(data.title);

                            switch (extension) {
                                case 'html':
                                case 'htm':
                                case 'txt':
                                case 'wtr':
                                default:
                                    content = cleanHTML(content);
                                    newDoc(false, data.title, content, '0 KB', false, true, false, id);
                                    break;
                                case 'md':
                                    content = convertNewLines(content);
                                    content = marked(content);
                                    content = cleanHTML(content);
                                    newDoc(false, data.title, content, '0 KB', false, true, false, id);
                                    break;

                            }
                            closeModals(true);
                        };
                    }
                    xhr.open('GET', downloadURL);
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    xhr.send();
                }).fail(function () {
                    closeGDOCLoader();
                });
            });
        }
    }

    $(document).on('click', '.gdoc', function () {
        var id = $(this).attr('data');
        loadGFile(id);
    });

    $gDocs.click(function () {
        openModal($gDocumentContainer, loadGDocs);
    });

    var $letter = $('.templates-options > .letter');
    var $notes = $('.templates-options > .notes');
    var $MLA = $('.templates-options > .MLA-essay');
    var $APA = $('.templates-options > .APA-essay');


    $letter.click(function () {
        var letterContents = {
            "ops": [{
                "attributes": {
                    "bold": true
                },
                "insert": "Your Name"
            }, {
                "insert": "\n"
            }, {
                "insert": "123 Your Street"
            }, {
                "insert": "\n"
            }, {
                "insert": "Your City, ST 12345"
            }, {
                "insert": "\n"
            }, {
                "insert": "(123) 456-7890"
            }, {
                "insert": "\n"
            }, {
                "insert": "no_reply@example.com"
            }, {
                "insert": "\n\n"
            }, {
                "insert": "4th September 20XX"
            }, {
                "insert": "\n"
            }, {
                "attributes": {
                    "bold": true
                },
                "insert": "Ronny Reader"
            }, {
                "insert": "\n"
            }, {
                "insert": "CEO, Company Name"
            }, {
                "insert": "\n"
            }, {
                "insert": "123 Address St "
            }, {
                "insert": "\n"
            }, {
                "insert": "Anytown, ST 12345"
            }, {
                "insert": "\n\n"
            }, {
                "insert": "Dear Ms. Reader,"
            }, {
                "insert": "\n"
            }, {
                "insert": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat."
            }, {
                "insert": "\n"
            }, {
                "insert": "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan."
            }, {
                "insert": "\n"
            }, {
                "insert": "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius."
            }, {
                "insert": "\n\n"
            }, {
                "insert": "Sincerely,"
            }, {
                "insert": "\nYour Name\n"
            }]
        }
        newDoc(false, 'Letter', letterContents, '0 KB', false, true, false);
    });

    $notes.click(function () {
        var noteContents = {
            "ops": [{
                "insert": "Your Name\nInstructor's Name\nCourse Title\nDate\n{Course Title} Notes"
            }, {
                "attributes": {
                    "align": "center"
                },
                "insert": "\n"
            }, {
                "attributes": {
                    "bold": true
                },
                "insert": "Heading"
            }, {
                "insert": "\nCreate bulleted lists by typing \"-\" + the spacebar"
            }, {
                "attributes": {
                    "list": "bullet"
                },
                "insert": "\n"
            }, {
                "insert": "Indent lists by hitting tab at the beginning of a bullet (or list number)"
            }, {
                "attributes": {
                    "list": "bullet"
                },
                "insert": "\n"
            }, {
                "insert": "Like so."
            }, {
                "attributes": {
                    "indent": 1,
                    "list": "bullet"
                },
                "insert": "\n"
            }, {
                "insert": "This allows you to have multiple levels and therefore a comprehensive hierarchy of text"
            }, {
                "attributes": {
                    "indent": 1,
                    "list": "bullet"
                },
                "insert": "\n"
            }, {
                "insert": "Increases productivity"
            }, {
                "attributes": {
                    "indent": 2,
                    "list": "bullet"
                },
                "insert": "\n"
            }, {
                "insert": "Makes learning easier"
            }, {
                "attributes": {
                    "indent": 2,
                    "list": "bullet"
                },
                "insert": "\n"
            }, {
                "attributes": {
                    "bold": true
                },
                "insert": "Headings in this template are bold"
            }, {
                "insert": ", but you can easily change these to real headings by hitting CTRL + ALT + 1 (for a top-level heading) or CTRL + ALT + 2 for a subheading\n"
            }, {
                "attributes": {
                    "italic": true
                },
                "insert": "You can access Writer's keyboard shortcuts by:"
            }, {
                "insert": "\nOpening the sidebar"
            }, {
                "attributes": {
                    "list": "ordered"
                },
                "insert": "\n"
            }, {
                "insert": "Selecting the help menu"
            }, {
                "attributes": {
                    "list": "ordered"
                },
                "insert": "\n"
            }, {
                "insert": "\nAfter you're done with your notes, it is recommended that you save as a .wtr file or Writer file as it is the most supported file type used by Writer.\n\nKeep learning, and enjoy!\n"
            }]
        }
        newDoc(false, 'Class Notes', noteContents, '0 KB', false, true, false);
    });

    $MLA.click(function () {
        var MLAContents = {
            "ops": [{
                "insert": "Your Name\nProfessor Name \nSubject Name\n04 September 20XX\n\nTitle of Your Report"
            }, {
                "attributes": {
                    "align": "center"
                },
                "insert": "\n"
            }, {
                "insert": "\tLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.\nSECTION HEADER"
            }, {
                "attributes": {
                    "header": 1
                },
                "insert": "\n"
            }, {
                "insert": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.\n"
            }, {
                "attributes": {
                    "italic": true
                },
                "insert": "Subsection heading."
            }, {
                "insert": " Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat:\n(1) Lorem ipsum dolor sit amet; (2) consectetuer adipiscing elit; (3) sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat; and (4) ut wisi enim ad minim veniam.  (Lorem et al. 14)\n\tNam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.\n"
            }, {
                "attributes": {
                    "italic": true
                },
                "insert": "Subsection heading."
            }, {
                "insert": " Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.\nCONCLUSION"
            }, {
                "attributes": {
                    "header": 1
                },
                "insert": "\n"
            }, {
                "insert": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. \n\tNam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.\n"
            }]
        }
        newDoc(false, 'MLA Essay', MLAContents, '0 KB', false, true, false);
    });

    $APA.click(function () {
        var APAContents = {
            "ops": [{
                "insert": "Full Title of Your Paper"
            }, {
                "attributes": {
                    "align": "center"
                },
                "insert": "\n"
            }, {
                "insert": "Your Name (First M. Last)"
            }, {
                "attributes": {
                    "align": "center"
                },
                "insert": "\n"
            }, {
                "insert": "Name of School or Institution"
            }, {
                "attributes": {
                    "align": "center"
                },
                "insert": "\n\n"
            }, {
                "insert": "Author Note"
            }, {
                "attributes": {
                    "align": "center",
                    "header": 1
                },
                "insert": "\n"
            }, {
                "insert": "\tFirst paragraph: Complete departmental and institutional affiliation\n\tSecond paragraph: Changes in affiliation (if any)\n\tThird paragraph: Acknowledgments, funding sources, special circumstances\n\tFourth paragraph: Contact information (mailing address and e-mail)\n\n\t\f\nAbstract"
            }, {
                "attributes": {
                    "align": "center",
                    "header": 1
                },
                "insert": "\n"
            }, {
                "insert": "\tLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.\n\t"
            }, {
                "attributes": {
                    "italic": true
                },
                "insert": "Keywords:"
            }, {
                "insert": " Lorem, ipsum, dolor\n\f\nYour Full Title of Your Paper"
            }, {
                "attributes": {
                    "align": "center",
                    "header": 1
                },
                "insert": "\n"
            }, {
                "insert": "\tLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat (Lorem, 20XX). Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.\n\nMethod"
            }, {
                "attributes": {
                    "align": "center",
                    "header": 1
                },
                "insert": "\n"
            }, {
                "insert": "Participants"
            }, {
                "attributes": {
                    "header": 2
                },
                "insert": "\n"
            }, {
                "insert": "\tLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.\nAssessments and Measures"
            }, {
                "attributes": {
                    "header": 2
                },
                "insert": "\n"
            }, {
                "insert": "\tUt blandit malesuada quam, ac varius tortor gravida eget. Vestibulum id ligula leo, ut accumsan mi. Sed tristique euismod convallis. Nulla facilisi. Etiam vestibulum est id orci interdum vitae porta enim blandit. Cras sit amet arcu dolor, at venenatis erat. Vestibulum accumsan placerat mauris. Morbi nec nibh nibh. Duis ultricies posuere nunc. Morbi at tellus quis magna vestibulum eleifend. \n\t"
            }, {
                "attributes": {
                    "bold": true
                },
                "insert": "Heading 3 is the beginning of a paragraph ending with a period. "
            }, {
                "insert": "Maecenas ullamcorper bibendum consequat. Pellentesque ultrices, eros eu tincidunt pretium, magna leo volutpat libero, non bibendum diam nunc eget urna. Vivamus eu tortor et dui aliquam vestibulum at vel augue. Vivamus elit dui, porttitor eget egestas at, rhoncus in justo. Curabitur tristique, elit ac venenatis volutpat, eros mauris iaculis diam, vitae rhoncus erat metus vitae eros.\n\t"
            }, {
                "attributes": {
                    "bold": true,
                    "italic": true
                },
                "insert": "First Heading 4 level in the section."
            }, {
                "insert": " Nulla congue egestas ante, id ultricies orci dignissim commodo. Fusce placerat, libero eu pharetra pulvinar, lorem dui pulvinar nisi, et semper orci orci vitae magna. Nullam sodales, felis id feugiat scelerisque, tortor nulla interdum mauris, ac porttitor odio dolor eget eros.\n\t"
            }, {
                "attributes": {
                    "bold": true,
                    "italic": true
                },
                "insert": "Second Heading 4 level in the section. "
            }, {
                "insert": "Duis sit amet ipsum pretium erat accumsan iaculis vitae eget risus. Donec ut dui in lorem volutpat fermentum bibendum pulvinar libero. Nunc imperdiet eros et mi posuere pellentesque. Donec tincidunt ipsum eget nisl ullamcorper eu placerat libero ullamcorper. Maecenas id luctus ligula. Cras condimentum eleifend nibh sit amet iaculis. Suspendisse placerat sollicitudin mi, vel ornare augue hendrerit ac. Nulla sed suscipit sapien. Cras pellentesque orci lectus, eu consequat enim.\n\t"
            }, {
                "attributes": {
                    "italic": true
                },
                "insert": "First Heading 5 level in the section."
            }, {
                "insert": " Nulla congue egestas ante, id ultricies orci dignissim commodo. Fusce placerat, libero eu pharetra pulvinar, lorem dui pulvinar nisi, et semper orci orci vitae magna. Nullam sodales, felis id feugiat scelerisque, tortor nulla interdum mauris, ac porttitor odio dolor eget eros.\n\t"
            }, {
                "attributes": {
                    "italic": true
                },
                "insert": "Second Heading 5 level in the section."
            }, {
                "insert": " Duis sit amet ipsum pretium erat accumsan iaculis vitae eget risus. Donec ut dui in lorem volutpat fermentum bibendum pulvinar libero. Nunc imperdiet eros et mi posuere pellentesque. Donec tincidunt ipsum eget nisl ullamcorper eu placerat libero ullamcorper. Maecenas id luctus ligula. Cras condimentum eleifend nibh sit amet iaculis. Suspendisse placerat sollicitudin mi, vel ornare augue hendrerit ac. Nulla sed suscipit sapien. Cras pellentesque orci lectus, eu consequat enim.\n\nResults"
            }, {
                "attributes": {
                    "align": "center",
                    "header": 1
                },
                "insert": "\n"
            }, {
                "insert": "\tMaecenas id luctus ligula. Cras condimentum eleifend nibh sit amet iaculis. Suspendisse placerat sollicitudin mi, vel ornare augue hendrerit ac. Nulla sed suscipit sapien. Cras pellentesque orci lectus, eu consequat enim.\nOutcome 1"
            }, {
                "attributes": {
                    "header": 2
                },
                "insert": "\n"
            }, {
                "insert": "\tLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. \nOutcome 2"
            }, {
                "attributes": {
                    "header": 2
                },
                "insert": "\n"
            }, {
                "insert": "\tLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. \n\nDiscussion"
            }, {
                "attributes": {
                    "align": "center",
                    "header": 1
                },
                "insert": "\n"
            }, {
                "insert": "\tLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan.\n\n\f"
            }, {
                "attributes": {
                    "align": "center",
                    "header": 1
                },
                "insert": "\n"
            }, {
                "insert": "References"
            }, {
                "attributes": {
                    "align": "center",
                    "header": 1
                },
                "insert": "\n"
            }, {
                "attributes": {
                    "background": "#ffffff"
                },
                "insert": "Lastname, C. (2008). Title of the source without caps except Proper Nouns or: First word after colon. "
            }, {
                "attributes": {
                    "background": "#ffffff",
                    "italic": true
                },
                "insert": "The Journal or Publication Italicized and Capped"
            }, {
                "attributes": {
                    "background": "#ffffff"
                },
                "insert": ", Vol#(Issue#), Page numbers."
            }, {
                "insert": "\n"
            }, {
                "attributes": {
                    "background": "#ffffff"
                },
                "insert": "Lastname, O. (2010).  Online journal using DOI or digital object identifier. "
            }, {
                "attributes": {
                    "background": "#ffffff",
                    "italic": true
                },
                "insert": "Main Online Journal Name"
            }, {
                "attributes": {
                    "background": "#ffffff"
                },
                "insert": ", Vol#(Issue#), 159-192. doi: 10.1000/182"
            }, {
                "insert": "\n"
            }, {
                "attributes": {
                    "background": "#ffffff"
                },
                "insert": "Lastname, W. (2009). If there is no DOI use the URL of the main website referenced. "
            }, {
                "attributes": {
                    "background": "#ffffff",
                    "italic": true
                },
                "insert": "Article Without DOI Reference"
            }, {
                "attributes": {
                    "background": "#ffffff"
                },
                "insert": ", Vol#(Issue#), 166-212. Retrieved from"
            }, {
                "attributes": {
                    "background": "#ffffff",
                    "color": "#000000",
                    "link": "http://www.mainwebsite.org/"
                },
                "insert": " "
            }, {
                "attributes": {
                    "color": "#1155cc",
                    "link": "http://www.example.com"
                },
                "insert": "http://www.example.com"
            }, {
                "insert": "\n\n"
            }]
        }
        newDoc(false, 'APA Essay', APAContents, '0 KB', false, true, false);
    });

    $feedback.click(function () {
        openModal($feedBackContainer, function () {
            $feedBackContainer.find('.feedback-email').val($('.user-email').text());
            $feedBackContainer.find('.feedback-email').focus();
        });
    });

    function createDataURL(response, node) {
        var reader = new FileReader();

        reader.onload = function () {
            var data = this.result;
            node.get(0).onload = function () {
                resizeImage($(node));
            };
            node.attr('src', data);
        }

        reader.readAsDataURL(response);
    }

    function requestXML(url, node) {
        if (url.indexOf('data:') == -1) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.onload = function () {
                createDataURL(xhr.response, node);
            }.bind(this);
            xhr.send();
        } else {
            resizeImage(node);
        }
        node.show();
    }

    function resizeAllImages(time, margin) {
        removeAnim();
        setTimeout(function () {
            $('img').each(function () {
                resizeImage($(this), 0, margin);
            });
        }, time);
    }

    function resizeImage(img, time, margin) {
        removeAnim();
        if (!time) {
            time = 0;
        }
        setTimeout(function () {
            var windowWidth = $(window).width();
            var image = new Image();
            image.src = img.attr('src');
            if (image.width > windowWidth) {
                var imageWidth = img.outerWidth();
                var padding = $('.ql-editor').css('padding-left');
                var real;
                if ($('.ql-editor').css('padding-left').indexOf('%') > -1) {
                    real = windowWidth * (Number(padding.replace('%', '')) / 100);
                } else {
                    real = Number(padding.replace('px', ''));
                }
                if (margin) {
                    real = margin;
                    real = windowWidth * (Number(real.replace('%', '')) / 100);
                }
                var marginLeft = -1 * real;
                img.css('width', windowWidth);
                img.css('margin-left', marginLeft + 'px');
                img.css('max-width', 'none');
                addAnim();
            } else {
                img.css('max-width', '100%');
                img.css('margin-left', '0');
                addAnim();
            }
        }, time);
    }

    function loadImages() {
        qlEditor().find('img').each(function () {
            if ($(this).attr('src') === undefined) {} else {
                var url = $(this).attr('src');
                requestXML(url, $(this));
            }
        });
    }

    $(window).resize(function () {
        resizeAllImages();
    });

    $(document).on('paste drop', function () {
        setTimeout(loadImages, 0);
    });

    $(document).on('error', 'img', function () {
        $(this).hide();
    })

    $(document).on('load', 'img', function () {
        resizeImage($(this));
    })

    $('.submit-button').click(function () {
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

    $details.click(function () {
        var doc = getDoc(documentAct(true));
        getDocDetails(doc, openModal($detailsContainer));
    });

    $help.click(function () {
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
            }, 500, beizer, function () {
                snackBarTime = setTimeout(closeSnackBar, 5000);
            });
        } else {
            $snackBar.children().first().text(name);
            $snackBar.children('span').text('was saved.');
            $snackBar.show().stop().animate({
                bottom: '0'
            }, 500, beizer, function () {
                snackBarTime = setTimeout(closeSnackBar, 3000);
            });
        }
    }

    function closeSnackBar() {
        $snackBar.animate({
            bottom: '-' + ($snackBar.height() + 100) + 'px'
        }, 500, beizer, function () {
            $(this).hide();
            clearTimeout(snackBarTime);
        });
    }

    $(document).on('click', '.document-item', function () {
        if ($('.overflow-menu').is(':visible')) {
            closeOverflow($('.overflow-menu'));
        } else {
            var index = $(this).index();
            var doc = getDoc(index);
            setDocsActive();

            doc.show(index);
            closeModals(true);
        }
    });

    function isActive(element) {
        return element.hasClass('toggle-active');
    }

    $toggle.click(function () {
        var key = $(this).attr('name');
        if (isActive($(this))) {
            replaceClass($(this), 'toggle-active', 'toggle-inactive');
            changeSettings(key, false);
        } else {
            replaceClass($(this), 'toggle-inactive', 'toggle-active');
            changeSettings(key, true);
        }
    });

    $toggle.mousedown(function () {
        $(this).children().css('transform', 'scale(1.15, .85)');
        $(this).children().css('box-shadow', 'rgba(0, 0, 0, 0.1) 0px 0px 0px 8px');
    });

    $(document).mouseup(function () {
        $toggle.children().css('transform', 'none');
        $toggle.children().css('box-shadow', 'none');
    });

    var src = '/assets/settings/coffee.mp3';
    var audio = new Audio(src);
    $coffeeMode.click(function () {
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
        animTimer = setTimeout(function () {
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

    $nightMode.click(function () {
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

    $fullScreen.click(function () {
        if (chrome.app.window.current().isFullscreen()) {
            chrome.app.window.current().restore();
        } else {
            chrome.app.window.current().fullscreen();
        }
    });

    var focusMode;
    $focus.click(function () {
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
        }, 300, beizer, function () {
            $(this).hide();
        });
    }

    $statistics.click(function () {
        if (isActive($(this)) === false) {
            closeStatistics();
        } else {
            openStatistics();
        }
    });

    $fontChildren.click(function () {
        var fontFam = $(this).text();
        allEditors().css('font-family', fontFam);
        changeSettings('font', fontFam);
    });

    function convertSize(fontSize) {
        var size = Number(fontSize.replace('px', ''));
        var em = (size / 12) + 0.25;

        return em + 'em';
    }

    $sizeChildren.click(function () {
        var fontSize = $(this).text();
        allEditors().css('font-size', convertSize(fontSize));
        changeSettings('size', fontSize);
    });

    $themeChildren.click(function () {
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

    $lineChildren.click(function () {
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
        removeAnim();
        resizeAllImages(0, margin);
        allEditors().css('padding-left', margin);
        allEditors().css('padding-right', margin);
        addAnim();
    }

    $marginChildren.click(function () {
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
        $('.toggle').each(function () {
            if ($(this).hasClass('toggle-active')) {
                if ($(this).attr('name') != 'focus') {
                    $(this).click();
                }
            } else {
                if ($(this).attr('name') == 'focus') {
                    $(this).click();
                }
            }
        });

        $('.default-theme').click();
        $('.droid').click();
        $('.14px').click();
        $('.double-line').click();
        $('.medium-margin').click();

        $optionContainer.each(function () {
            $(this).css('height', '0px');
            $(this).hide();
        });
    }

    $('.reset-button').click(function () {
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
        }, 400, beizer, function () {
            $(this).hide();
        });
    }

    $settingsOption.click(function () {
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

    $optionContainer.children().click(function () {
        var dropdown = $(this).parent();
        dropdown.children().removeClass('active');
        $(this).addClass('active');
    });

    function makeReadOnly(input) {
        input.attr('readonly', true);
    }

    function undoReadOnly(input) {
        input.attr('readonly', false);
        input.select();
    }

    function openOverflow(element) {
        element.show().stop().animate({
            height: '180px'
        }, 300, beizer);
    }

    function closeOverflow(element, callback) {
        element.stop().animate({
            height: '0'
        }, 300, beizer, function () {
            $(this).hide();
        });
        if (callback) {
            callback();
        }
    }

    $(document).on('click', '.doc-overflow', function (e) {
        e.stopPropagation();
        var thisOverflow = $(this).parent().find('.overflow-menu');
        closeOverflow($('.overflow-menu'), function () {
            openOverflow(thisOverflow);
        })
    })


    $(document).on('click', '.document-title', function (e) {
        if ($(this).attr('readonly') === undefined) {
            e.stopImmediatePropagation();
            e.stopPropagation();
        }
    });

    $(document).on('click', '.doc-delete', function (e) {
        e.stopPropagation();
        var index = $(this).parent().parent().index();
        var doc = getDoc(index);
        deleteDoc(doc);
    });

    $(document).on('click', '.doc-rename', function () {
        undoReadOnly($(this).parent().parent().find('input'));
    });

    function openGDOCLoader(callback) {
        if (settings.night) {
            $('.gdoc-loading-container').css('background-color', 'rgba(0,0,0,0.7)');
        } else {
            $('.gdoc-loading-container').css('background-color', 'rgba(255,255,255,0.7)');
        }
        $('.gdoc-loading-container').fadeIn('fast', function () {
            if (callback) {
                callback();
            }
        });
    }

    function closeGDOCLoader() {
        $('.gdoc-loading-container').fadeOut('fast');
    }

    var MediaUploader = function (options) {
        this.file = options.file;
        this.contentType = options.contentType || this.file.type || 'application/octet-stream';
        this.fileId = options.fileId;
        this.metadata = options.metadata || {
            'title': options.name,
            'mimeType': this.contentType
        };
        this.token = options.token;
        this.offset = options.offset || 0;
        this.url = options.url;
        if (!this.url) {
            var params = options.params || {};
            params.uploadType = 'resumable';
            params.convert = true;
            this.url = this.buildUrl_(options.fileId, params);
        }
        this.httpMethod = this.fileId ? 'PUT' : 'POST';
    }

    MediaUploader.prototype.upload = function (doc) {
        var self = this;
        var xhr = new XMLHttpRequest();

        xhr.open(this.httpMethod, this.url, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.token);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-Upload-Content-Length', this.file.size);
        xhr.setRequestHeader('X-Upload-Content-Type', this.contentType);

        xhr.onload = function (e) {
            var location = e.target.getResponseHeader('Location');
            openGDOCLoader();
            this.url = location;
            this.sendFile_(doc);
        }.bind(this);
        xhr.send(JSON.stringify(this.metadata));
    };

    MediaUploader.prototype.sendFile_ = function (doc) {
        var content = this.file;
        var end = this.file.size;

        var xhr = new XMLHttpRequest();
        xhr.open('PUT', this.url, true);
        xhr.setRequestHeader('Content-Type', this.contentType);
        xhr.setRequestHeader('Content-Range', 'bytes ' + this.offset + '-' + (end - 1) + '/' + this.file.size);
        xhr.setRequestHeader('X-Upload-Content-Type', this.file.type);

        xhr.onload = function () {
            var data = JSON.parse(xhr.response);
            var id = data.id;
            doc.fileID = id;
            closeGDOCLoader();
        }
        xhr.send(content);
    };

    MediaUploader.prototype.buildQuery_ = function (params) {
        params = params || {};
        return Object.keys(params).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');
    };

    MediaUploader.prototype.buildUrl_ = function (id, params) {
        var url = 'https://www.googleapis.com/upload/drive/v2/files/';
        if (id) {
            url += id;
        }
        var query = this.buildQuery_(params);
        if (query) {
            url += '?' + query;
        }
        return url;
    };

    function createUploader(content, token, doc) {
        $.get('https://www.googleapis.com/drive/v2/files/' + doc.fileID + '?access_token=' + token, function (response) {
            var trashed = response.labels.trashed;
            var config = {};
            if (trashed) {
                config = {
                    file: content,
                    name: doc.name,
                    token: token
                }
            } else {
                config = {
                    file: content,
                    name: doc.name,
                    fileId: doc.fileID,
                    token: token
                }
            }
            var uploader = new MediaUploader(config);
            uploader.upload(doc);
        }).fail(function () {
            var config = {
                file: content,
                name: doc.name,
                token: token
            }
            var uploader = new MediaUploader(config);
            uploader.upload(doc);
        });
    }

    function requestAccess(interactive, callback) {
        chrome.identity.getAuthToken({
            'interactive': interactive
        }, callback);
    }

    $(document).on('click', '.doc-upload', function () {
        var index = $(this).parent().parent().index();
        var doc = getDoc(index);
        requestAccess(false, function (token) {
            var extension = getExtension(doc.name);

            var content;
            var blob;

            var editorContents = doc.editor.getContents();
            doc.setContents(editorContents);

            switch (extension) {
                case 'html':
                case 'htm':
                case 'wtr':
                case 'docx':
                default:
                    content = cleanStyles(qlEditor().html());
                    blob = new Blob([content], {
                        'type': 'text/html'
                    });
                    createUploader(blob, token, doc);
                    break;
                case 'md':
                    require(['upndown'], function (upndown) {
                        var und = new upndown();
                        und.convert(cleanStyles(qlEditor().html()), function (err, markdown) {
                            if (err) {
                                console.log(err);
                            } else {
                                content = markdown;
                                blob = new Blob([content], {
                                    'type': 'text/plain'
                                });
                                createUploader(blob, token, doc);
                            }
                        });
                    });
                    break;
                case 'txt':
                    content = doc.editor.getText();
                    blob = new Blob([content], {
                        'type': 'text/plain'
                    });
                    createUploader(blob, token, doc);
                    break;
            }
        });
    });

    $(document).on('keyup', '.document-title', function (e) {
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

    $(document).on('blur', '.document-title', function () {
        var index = $(this).parent().index();
        var doc = getDoc(index);
        var title = $(this).val();

        makeReadOnly($(this));
        if (title == doc.name) {} else {
            doc.setFileEntry(null);
            doc.setName(title);
        }
    });

    $(document).on('click', function () {
        closeOverflow($('.overflow-menu'));
    });

    $(document).on('click', '.ql-editor img', function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
    });

    function loadScreen() {
        setTimeout(function () {
            if (settings.statistics == true) {
                var doc = getDoc(documentAct(true));
                calcStats(doc.editor.getText());
            }
            $loadingScreen.stop().animate({
                top: '-100%'
            }, 800, beizer, function () {
                $(this).remove();
            });
        }, 600);
    }

    function getImage(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
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
        }, function () {});
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' +
            current_token);
        xhr.send();
    }

    function getToken(install, callback) {
        if (navigator.onLine) {
            var gService = analytics.getService('Writer');
            gService.getConfig().addCallback(function (config) {
                config.setTrackingPermitted(true);
            });
            var gTracker = gService.getTracker('UA-96857701-1');
            gTracker.sendAppView('MainView');

            requestAccess(true, function (token) {
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
                    $.get('https://www.googleapis.com/plus/v1/people/me?access_token=' + token, function (profile) {
                        var coverURL = profile.cover.coverPhoto.url;
                        var imageURL = profile.image.url;
                        var name = profile.displayName;
                        getImage(imageURL, function (data) {
                            $('.user-image').css('background-image', 'url(' + data + ')');
                            var img = document.createElement('img');
                            img.setAttribute('src', data)
                            img.addEventListener('load', function () {
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
                                    }, 800, beizer, function () {
                                        $(this).remove();
                                    });
                                    callback();
                                }

                            });
                        });
                        getImage(coverURL, function (data) {
                            $('.user-profile').css('background-image', 'url(' + data + ')');
                        });

                        $('.user-name').text(name);
                        chrome.identity.getProfileUserInfo(function (info) {
                            $('.user-email').text(info.email);
                        })
                    }).fail(function () {
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
        }, function (ist) {
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

    $('.signin-button').click(function () {
        getToken(true, realLoad);
    });

    $('.fallback-signin').click(function () {
        getToken(false);
    });

    $('.continue-button').click(function () {
        $installScreen.stop().animate({
            top: '-100%'
        }, 400, beizer, function () {
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
        navTimeout = setTimeout(function () {
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

    document.addEventListener('scroll', function (event) {
        var doc = getDoc(documentAct(true));
        doc.scrollTop = qlEditor().scrollTop();
        qlEditor().get(0).scrollLeft = 0;
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


    $(document).on('keydown', function (e) {

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
            TYPE = CTRL_KEY && getKey(e, 84),
            DELETE = CTRL_KEY && ALT_KEY && getKey(e, 81),
            OPENDOCS = CTRL_KEY && getKey(e, 68),
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

        if (TYPE) {
            e.preventDefault();
            $typeWriter.click();
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
            e.preventDefault();
            if ($helpContainer.is(':visible')) {
                $bg.click();
            } else {
                closeModals(false, function () {
                    openBg(function () {
                        openNavBar();
                        openModal($helpContainer);
                    });
                });
            }
        }

        if (OPENDOCS) {
            if ($documentContainer.is(':visible')) {
                $bg.click();
            } else {
                closeModals(false, function () {
                    openBg(function () {
                        openNavBar();
                        openModal($documentContainer);
                    });
                });
            }
        }

        if (DELETE) {
            var doc = getDoc(documentAct(true));
            deleteDoc(doc);
        }

        if (getKey(e, 13) && $saveDialogue.is(':visible')) {
            $('.delete-confirm').click();
        }
    });

    $message.on('keydown keyup change', function () {
        $(this).css('height', 'auto');
        $(this).css('height', this.scrollHeight + 'px');
    });

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
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
        }, 200, beizer, function () {
            $(this).hide();
        });
    }

    function applySignOut() {
        $('.user-profile').css('background-image', 'url(../assets/sidebar/fallback.png)');
        $('.user-profile-body').hide();
        $('.fallback-signin').show();
    }

    $('.arrow-down').click(function () {
        if ($('.sign-out').is(':visible')) {
            closeSignOut();
        } else {
            openSignOut();
        }
    });

    $('.sign-out').click(function () {
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
        $('.tutorial-container').fadeOut('fast', function () {
            qlEditor().blur();
            window.getSelection().removeAllRanges();
            $('.tutorial-container-two').fadeIn('fast');
        });
    }

    $('.tutorial-container .tutorial-close').click(function () {
        nextTutorial();
    });

    $('.tutorial-container-two .tutorial-close').click(function () {
        $('.tutorial-container-two').fadeOut('fast');
        qlEditor().focus();
    });

    $mainContainer.click(function () {
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
        }, function (item) {
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
                    data.forEach(function (value, index, array) {
                        var thisData = data[index];
                        var name = thisData.name;
                        var content = thisData.contents;
                        var size = thisData.size;
                        var savedFileEntry = thisData.savedFileEntry;
                        var active = thisData.isActive;
                        var changed = thisData.changed;
                        var id = thisData.fileID;
                        newDoc(false, name, content, size, savedFileEntry, active, changed, id);

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
        openGDOCLoader(function () {
            documents.forEach(function (value) {
                var doc = value,
                    contents = doc.editor.getContents();
                doc.setContents(contents);
            });
            setStorage({
                settings: settings,
                data: documents
            }, function () {
                chrome.app.window.current().close();
            });
        });
    }

    var screenTimeout;

    $(window).on('mouseenter', function (e){
        clearTimeout(screenTimeout);
    });

    $(window).on('mouseleave', function (e) {
        var from = e.toElement;
        if (!from || from.nodeName == 'HTML') {
            screenTimeout = setTimeout(function () {
                documents.forEach(function (value) {
                    var doc = value,
                        contents = doc.editor.getContents();
                    doc.setContents(contents);
                });
                setStorage({
                    settings: settings,
                    data: documents
                });
            }, 400);
        }
    });

    $('.close-window').click(function () {
        closeWindow();
    });

    $('.maximize-window').click(function () {
        if (chrome.app.window.current().isMaximized() || chrome.app.window.current().isFullscreen()) {
            chrome.app.window.current().restore();
        } else {
            chrome.app.window.current().maximize();
        }
        if (!$modal.is(':visible')) {
            qlEditor().focus();
        }
    });

    $('.minimize-window').click(function () {
        chrome.app.window.current().minimize();
    });
});