// Writer
// Version 6.0.1
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
        $simpleNoteList = $('.simplenote-list'),
        $mainContainer = $('.main-container'),
        $goalContainer = $('.goal-container'),
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
        $focus = $('.focus'),
        $editorScrollToggle = $('.editorscroll');

    var $settingsOption = $('.settings-option'),
        $optionContainer = $('.option');

    var $fontChildren = $('.font-options').children(),
        $sizeChildren = $('.font-size-options').children(),
        $themeChildren = $('.theme-options').children(),
        $workBgChildren = $('.workbg-options').children(),
        $lineChildren = $('.line-options').children(),
        $marginChildren = $('.margin-options').children();

    var $documentContainer = $('.document-container'),
        $gDocumentContainer = $('.gdocument-container'),
        $simpleNoteContainer = $('.simplenote-container'),
        $settingsContainer = $('.settings-container'),
        $feedBackContainer = $('.feedback-container'),
        $detailsContainer = $('.details-container'),
        $helpContainer = $('.help-container'),
        $fileContainer = $('.file-container'),
        $templatesContainer = $('.templates-container');

    var $docButton = $('.open-documents'),
        $simpleNoteButton = $('.open-SimpleNote'),
        $settingsButton = $('.open-settings'),
        $feedback = $('.open-feedback'),
        $details = $('.open-details'),
        $help = $('.open-help'),
        $file = $('.open-file'),
        $templates = $('.open-templates'),
        $gDocs = $('.open-gdocuments'),
        $goals = $('.open-goals'),
        $modalClose = $('.modal-close');

    var $new = $('.new'),
        $open = $('.open'),
        $save = $('.save'),
        $saveAs = $('.save-as'),
        $print = $('.print');

    var $snackBar = $('.snackbar'),
        $goalSnackBar = $('.goal-snackbar');

    var $statisticsBar = $('.statistics-bar');

    var $saveDialogue = $('.save-dialogue');

    var $email = $('.feedback-email'),
        $subject = $('.feedback-email'),
        $message = $('.feedback-message');

    var beizer = $.bez([.17, .67, .29, 1.01]);

    var $SNEmail = $('.simplenote-email'),
        $SNPassword = $('.simplenote-password'),
        $SNLoginButton = $('.simplenote-login-button');

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
        editorscroll: true,
        font: 'Droid Serif',
        size: '14px',
        theme: 'default',
        workbg: 'default',
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
        editorscroll: true,
        font: 'Droid Serif',
        size: '14px',
        theme: 'default',
        workbg: 'default',
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
                var excluded = ['font', 'size', 'theme', 'workbg', 'margin', 'line'];

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

    var goalSnackBarTime;

    function openGoalSnackBar() {
        $goalSnackBar.show().stop().animate({
            bottom: '0'
        }, 500, beizer, function () {
            goalSnackBarTime = setTimeout(closeGoalSnackBar, 3000);
        });
    }

    function closeGoalSnackBar() {
        $goalSnackBar.animate({
            bottom: '-' + ($goalSnackBar.height() + 100) + 'px'
        }, 500, beizer, function () {
            $(this).hide();
            clearTimeout(goalSnackBarTime);
        });
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
            if (doc.simpleID) {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    uploadNote(doc.editor.getText(), doc.simpleID);
                }, 2000);
            }
            if (settings.statistics == true) {
                calcStats(doc.editor.getText());
            }
            if ($('.tutorial-container').is(':visible')) {
                nextTutorial();
            }
            if ($saveDialogue.is(':visible')) {
                closeSave();
            }
            if (goalExists) {
                goalCompleted = getWords(doc.editor.getText());
                goalCompleted = goalCompleted - goalStart;
                var complete = goalCompleted / goalTarget;

                if (complete == 1) {
                    openGoalSnackBar();
                }
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

    Doc.prototype.load = function (name, content, size, savedFileEntry, changed, id, hasGoal, simpleID) {
        this.setName(name);
        this.setContents(content);
        this.setEditorContents(content);
        this.setSize(size);
        this.setFileEntry(savedFileEntry);
        this.changed = changed;
        this.fileID = id;
        this.hasGoal = hasGoal;
        this.simpleID = simpleID;
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

                        doc.setContents('');
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

    function loadDoc(doc, name, content, size, savedFileEntry, changed, id, hasGoal, simpleID) {
        doc.load(name, content, size, savedFileEntry, changed, id, hasGoal, simpleID);
    }

    function newDoc(newString, name, content, size, savedFileEntry, active, changed, id, hasGoal, simpleID) {
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
            loadDoc(file, name, content, size, savedFileEntry, changed, id, hasGoal, simpleID);
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
        if (settings.editorscroll) {
            setTimeout(function () {
                var editor = qlEditor();
                var scroll = editor.scrollTop();
                var nodePos = getSelectionCoords();
                var endScroll = scroll + nodePos.y - (editor.height() / 2) - 100;

                if (Number.isNaN(endScroll)) {
                    endScroll = scroll;
                }

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

    $simpleNoteButton.click(function () {
        getStorage({
            credentials: 'credentials'
        }, function (simpleNote) {
            var email = simpleNote.credentials.email;
            var password = simpleNote.credentials.password;

            if (simpleNote.credentials == 'credentials') {
                $simpleNoteList.children('form').show();
                $('.simplenote-notes').hide();
            } else {
                credentials = simpleNote.credentials;
                initiateSimpleNote(true);
                $simpleNoteList.children('form').hide();
                $('.simplenote-notes').show();
            }

            openModal($simpleNoteContainer, function () {
                $SNEmail.focus();
            });
        });
    });

    var root = "https://simple-note.appspot.com/api/",
        root2 = "https://simple-note.appspot.com/api2/",
        credentials = {};

    function uploadNote(content, key) {
        jQuery.ajax({
            type: 'POST',
            url: root2 + 'data/' + key + credentials.authURLadd,
            data: encodeURIComponent(JSON.stringify({
                content: content
            })),
            dataType: 'json',
            complete: function (jqXHR, textStatus) {
                console.log('success');
            }
        });
    }

    function appendNotes(string) {
        $simpleNoteList.children('.simplenote-notes').html(string);
    }

    function loadNotes(data) {
        var noteString = '';
        var items = 0;
        data.forEach(function (item, index) {
            jQuery.ajax({
                url: root2 + 'data/' + item.key + credentials.authURLadd,
                dataType: 'json',
                complete: function (jqXHR) {
                    var noteData = JSON.parse(jqXHR.responseText);
                    var noteContent = noteData.content;
                    var newContent = noteContent.split('\n')[0].substring(0, 86);
                    var tag = noteData.tags[0];
                    if (!tag) {
                        tag = '';
                    }
                    noteString += `<div class="simplenote-note" content="${noteContent}" key="${noteData.key}">
                        <div class="simplenote-icon"></div>
                        <div class="simplenote-title">${newContent}</div>
                        <div class="simplenote-tag">${tag}</div>
                    </div>`;

                    items++;
                    if (items === data.length) {
                        appendNotes(noteString);
                        closeGDOCLoader();
                    }
                }
            });
        });
    }

    function getNotes(key) {
        jQuery.ajax({
            url: root2 + 'index/' + key + credentials.authURLadd,
            dataType: 'json',
            complete: function (jqXHR, textStatus) {
                var result = JSON.parse(jqXHR.responseText);
                var data = result.data;

                var notDeleted = function (x) {
                    return x.deleted === 0;
                };

                var filtered = data.filter(notDeleted);
                loadNotes(filtered);
            }
        });
    }

    function authSimpleNote(credentials, callback) {
        openGDOCLoader();
        jQuery.ajax({
            type: 'POST',
            url: root + 'login',
            data: btoa('email=' + credentials.email +
                '&password=' + credentials.password),
            dataType: 'text',
            success: function (response) {
                console.log('login success', response);
                $('.simplenote-notes').show();
                $simpleNoteList.children('form').hide();
                credentials.token = response;
                credentials.tokenTime = new Date();
                credentials.authURLadd = '?email=' + escape(credentials.email) +
                    '&auth=' + credentials.token;
                setStorage({
                    credentials: credentials
                });
                callback(credentials.token);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('login error', jqXHR, textStatus, errorThrown);
                $simpleNoteList.children('form').show();
                $('.simplenote-notes').hide();
                closeGDOCLoader();
                credentials.token = null;
            }
        });
    }

    function initiateSimpleNote(auto) {
        if (auto) {
            authSimpleNote(credentials, getNotes);
        } else {
            var email = $SNEmail.val();
            var password = $SNPassword.val();

            credentials.email = email;
            credentials.password = password;

            setStorage({
                credentials: credentials
            }, function () {
                authSimpleNote(credentials, getNotes);
            });
        }
    }

    $SNPassword.keyup(function (e) {
        if (e.keyCode == 13) {
            initiateSimpleNote();
        }
    });

    $SNLoginButton.click(function () {
        initiateSimpleNote();
    });

    function simpleNoteExists(key) {
        var exists = function (element) {
            if (element.simpleID == key) {
                return element;
            }
        };

        return documents.find(exists);
    }

    $(document).on('click', '.simplenote-note', function () {
        var content = $(this).attr('content');
        var key = $(this).attr('key');
        var name = content.trim().substring(0, 12);

        var doc = simpleNoteExists(key);
        if (doc) {
            if (doc.editor.getText() == content) {
                simpleNoteExists(key).docListItem.click();
            } else {
                doc.setEditorContents(content);
                simpleNoteExists(key).docListItem.click();
            }
        } else {
            newDoc(false, name, content, '0', false, true, false, false, false, key);
            closeModals(true);
        }
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
        copy.find('img').removeAttr('style');
        copy.find('img').css({
            maxWidth: '100%'
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

    function getReadableDateString(dateString) {
        var readableDate = dateString;
        readableDate = readableDate.toDateString();
        readableDate = readableDate.substring(readableDate.indexOf(' ') + 1, readableDate.length);
        readableDate = readableDate.replaceAt(readableDate.lastIndexOf(' '), ',');
        readableDate = readableDate.replace(',', ', ');

        return readableDate;
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
            var readableDate = getReadableDateString(new Date(Date.parse(date)));

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

    var goalCompleted = 0;
    var goalTarget = 0;

    var circle = new ProgressBar.Circle('#goal-progress', {
        strokeWidth: 4,
        color: '#1ddb99',
        trailColor: 'rgba(0,0,0,0.05)',
        svgStyle: {
            width: '200px',
            height: '200px',
            left: '50%',
            position: 'absolute',
            marginLeft: '-100px'
        },
        text: {
            style: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                marginTop: '15px',
                fontFamily: 'Roboto',
                fontSize: '18px'
            }
        },
        duration: 1000,
        easing: 'easeInOut',
        step: function (state, bar) {
            bar.setText(Math.round(bar.value() * 100) + ' %');
        }
    });

    function calculateGoal(completed, goal) {
        var percent = completed / goal;
        if (percent > 1) {
            percent = 1;
        }
        return percent;
    }

    function renderGoal() {
        if (goalExists) {
            if (getDoc(documentAct(true)).hasGoal) {
                goalCompleted = getWords(getDoc(documentAct(true)).editor.getText());
                goalCompleted = goalCompleted - goalStart;
                var complete = calculateGoal(goalCompleted, goalTarget);

                circle.animate(complete);
            }
        }
    }

    $goals.click(function () {
        openModal($goalContainer, renderGoal);
    });

    function goalSet() {
        $('.words-to-complete').css('border-color', '#1ddb99');
        $('.goal-options-bg').show().stop().animate({
            opacity: '0.7'
        }, 200);
        $('.goal-options-checkmark').show().stop().animate({
            opacity: '1',
            top: '50%'
        }, 300, function () {
            setTimeout(function () {
                $('.goal-options-bg').stop().animate({
                    opacity: '0'
                }, 200, function () {
                    $(this).hide();
                });
                $('.goal-options-checkmark').stop().animate({
                    opacity: '0',
                    top: '60%'
                }, 300, function () {
                    $(this).hide();
                });
            }, 800);
        });
    }

    var goalExists = false;
    var goalStart = 0;

    function saveGoals() {
        setStorage({
            exists: goalExists,
            start: goalStart,
            target: goalTarget
        });
    }

    function loadGoals() {
        getStorage({
            exists: 'goalExists',
            start: 'goalStart',
            target: 'goalTarget'
        }, function (goals) {
            var tempExists = goals.exists;
            var tempStart = goals.start;
            var tempTarget = goals.target;

            if (tempExists != 'goalExists' || tempStart != 'goalStart' || tempTarget != 'goalTarget') {
                goalExists = tempExists;
                goalStart = tempStart;
                goalTarget = tempTarget;

                if (goalTarget === 0) {
                    goalTarget = '';
                }
                $('.words-to-complete').val(goalTarget);
            }
        });
    }


    $('.set-goal-button').click(function () {
        var target = $('.words-to-complete').val();
        if (target !== '') {
            goalTarget = target;
            goalExists = true;
            circle.animate(0);
            goalSet();

            var doc = getDoc(documentAct(true));
            var text = doc.editor.getText();
            doc.hasGoal = true;
            goalStart = getWords(text);

            saveGoals();
        } else {
            goalExists = false;
            $('.words-to-complete').css('border-color', '#db1d1d');
        }
    });

    $('.reset-goal-button').click(function () {
        goalStart = 0;
        goalTarget = 0;
        goalExists = false;
        $('.words-to-complete').val('');
        circle.animate(0);

        var doc = getDoc(documentAct(true));
        doc.hasGoal = false;

        saveGoals();
    });

    var $letter = $('.templates-options > .letter');
    var $newsletter = $('.templates-options > .newsletter');
    var $notes = $('.templates-options > .notes');
    var $MLA = $('.templates-options > .MLA-essay');
    var $APA = $('.templates-options > .APA-essay');

    $newsletter.click(function () {
        var newsLetterContents = {
            "ops": [{
                "attributes": {
                    "height": "67",
                    "width": "71",
                    "background": "transparent"
                },
                "insert": {
                    "image": "data:image/png;base64,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"
                }
            }, {
                "attributes": {
                    "align": "center"
                },
                "insert": "\n"
            }, {
                "attributes": {
                    "background": "transparent",
                    "bold": true
                },
                "insert": "HeartWorks "
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": "Weekly Digest"
            }, {
                "attributes": {
                    "align": "center"
                },
                "insert": "\n"
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": "We have a surprise!"
            }, {
                "attributes": {
                    "align": "center",
                    "header": 1
                },
                "insert": "\n"
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": "Lorem ipsum dolor sit amet, consectetuer adipiscing."
            }, {
                "attributes": {
                    "align": "center"
                },
                "insert": "\n\n"
            }, {
                "attributes": {
                    "height": "389",
                    "width": "622",
                    "background": "transparent"
                },
                "insert": {
                    "image": "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABGAAD/7gAOQWRvYmUAZMAAAAAB/9sAhAAEAwMDAwMEAwMEBgQDBAYHBQQEBQcIBgYHBgYICggJCQkJCAoKDAwMDAwKDAwNDQwMEREREREUFBQUFBQUFBQUAQQFBQgHCA8KCg8UDg4OFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCALuBLADAREAAhEBAxEB/8QAugAAAQUBAQEBAAAAAAAAAAAABAIDBQYHAQAICQEAAwEBAQEBAQAAAAAAAAAAAAECAwQFBgcIEAABAwMDAgQEAwYFAgUBAg8BEQIDACEEMRIFQQZRYSITcYEyB5FCFKGxwdFSI/DhYjMV8QhygkMkFpJTY6IlssLSNEQXVOKTNUUmGBEAAgIBBAIBBAEDAwQCAQMFAAERAgMhMRIEQQVRYSITBjJxQhSBkSOhsVIVwTNi8NEkFvGCQwf/2gAMAwEAAhEDEQA/APmzb1JROh08q4juFtAPkfDovxpMZ0aqNAR8PlSGLAS5CgE6UCW4qxH7SulBYsDQrr+IoJFjTRVPTxoYxQ6rp4+PwqQgUiAlPVQAoKfC/SgQtqg+ooaAkdVBr+Fj5UmNHHEmypovkKQzhXpYXT4/GhAMSlGgdPECgaOROG4AlCUJQdKBhielSECqi9PGkSIchP8AUy3TQCgBxiGyKPHwPjQMd1APkt7H9lIBfQBup8KAFNRVVfAUwFKiEG2iaItIQ4D5L08vM1Ix0IdTdP8AJKBimlF2qQNR/OgBS6G56BtAkKALShKgXXwpMYtuinxABH8KQDgOtj0BJpMYoAAg9ehF7HxpDHAegGlAHSFU28Cltf4UFCgrVAsulAhTUK2sSmnh5UCOoVQ9b/hQA4FHT5JSZQk7Qdf+tCJO7kcHInx0NCKO3CAG5/Z8POhiFIbgBCf2UgOi7UI+I+FAHgpUkXNhQMUxULTpogt+2gGdbdVKJ1S9AhZsV6DTxNAHfIC3l40gOqAfSLon+FpjOgAoLgfwoEc+DUTzWgZ4fURcebeo6LQB5A0ktsUXXWgDzgo8dSBQB4ooRy6eWtAzrmtI3DRddKAPElOuvQf41oA5qV0H7KBHr/SvzTpQM6UsnwJFyEpDEH6U8bg+N6YjhI+oi4OnjQB5Nx3L6fxNAHrkL+Xr0VOlAHigATwvfSgD3qUtuVoA56ghUi3X9yUAJPpsQh1Xx/yoA4VSyEAa60AcPW6hOuhoA4ShUJ4igDm5v8ENA0dUatIBGtA2jjnFF6aoKCWeDXSbRGCXG1hZTQEh+LwPLZpaMbEepIRR4dankg1LTxv2q7gzwN7TGwlR1K0S34HBoHbP2Xbi5uNm5ji90Tw8NPi2rrSzaJvVQbJjQf8AHw+23xC17VdjiaHfe90OjcNdV86uSYIjK4GJ04m2+sdeqVPEloLj49jYi1NpH8KsQFk8cpcjVDhdRSgTKzynBSyu/tQg3vbXyrO1RD3GdoTzI50YAIS/Q0lUaLDB2mIwFYF6/EVXFFQE/wDxsOF7N08qcBA2e1WFv1OB6AGiBQODtp0Z2tlc3zW1EBApvBzNP+6SnnrSgcBcfEH8xXxXQ0nRFqzQNmcE14JBAd4jwrlyddPY6qZ2is5uDlYjnEgub4i9ebfFap20ypkNLnAEtdZ3SuR3OhIDfntBN1X+FZtlpDBzhuCHrc0pGC5fMDHjJB3G5+fjTkehif3H5Z3KRSQsiUlfX1FdGHcyyOUYXl4k7XOBb16i/lXrVseZarImVrxYhQemlaowaA5SEP8ATop/bTJYOetitk8hVCG3AEKmn7KciEOYbEnW9/xokUHWPey+hqhBLMhpKG56LQIOgLfZe9t1VCdKizNqENkuLpSToP400Z23GjqQfl1piPDxS41oEdDioNiB4eNAHiQLkrQBwvcnQ6XRbUDEEoQmn9NAFv7K4sZOax72q0EIP+lcnYvCO/q0ln0BBxwiw42NQNACmvBs9T3ZI3N40ncAA46km4NaJkyQeZx4Cgtuir5VqmTBXsvAUkNaSVHqPlW6sZWqQmVi7S4OVBcJWysYupFzRW6qehFapmLQBNCBuKX8tDWiZk1IHLEFPU+FaJmLqDubIw+mqI1GA6Rj9yEBaoz1TJLGz0uXEdE6WrK1TorkJnGzggANzohrF1OhWJbF5BzXBHWRV0qHU0Viw4HJMJ+oHqipWLRomWDG5AtQOcvgPEItqydSkw1uaC1XC5GviaiCx6POc0EtciWPlUwMlMLlWuO1xuPwqWhNEszKDvULAi9EEBMU24g7iHagjQnyqCkExZUkTyHlWqFd4UhMkWTNkauoNgDe5oEJ2H62lD1A0pQNDsebtcYnWSgAj3htQ6a/9aCRAe0k2QqhXT8aQwScmJ25vpGpPVKTKQRj5DHgNdrqP8qaYmh19oy4rsbddf31SJR81fdfu2XnOXPHQyH9LASHNb5WFepgxwpOXNedEZ8Q0INK7DmOOuFCEdTQB4tR38/OgD2lgv8A4elAHVW+rfLWgDqDpcfvSkBbm3bt/KD+NJmIsArbTT40AdJ3C4+AFvxpDQsI0olh+6gBSKu0IB/i9ApHGg9Rbw0tQM8fSSOnX/OgaHAiFTZv7KQxYS6aW/b4UQCOi2unjpemIUHBQfNflUiH2uuHC5oYxI6EeKA9Kko8QtungP5UACyKRuJG64SgaEREqq6dR4igokAfSCeoBQeNBBx+5bhV18KAOtd6kQ60hjzSAABbxNIDoJuPG/4+FMBwEddVuBakwFgrp1PhQIdU6FE0UeNSUKaCPSdCdUv8TQIX4i1/Lr1oAUCjbeCHpp0SgBQJCpqpJoGOA2CBevklSAtWkX1TzoYC1CAgr8R+NTAxwBTogAULQB1QultU8vGgYoBTtPw1uKBydIBOo/EgUAKIFlGlh4/hQSKBJBaCnj5r4UFHUJH77dKAPEFf3HpSA6AbBV6oR50hir7imvjQI9HYkXF6GA4TfU26UAdQAeWpHwpAdaNptctt/lTA6fpBCANvegD20WDQjgNFoA6LBBolxQUdCC3VwUKtAjg8QSF1tSEKJAFzdVPUJQB5oO5df4fKmM8jmlFRaAOBFuiKRagYq4JsRb4lPCgR51tPzG4oBCNoJvcWQdaBnnAlQutmg60AeBIAJJBW3+RoHIkj1EX8r6nyoEeB6u108BagDpUN08l+dAhKk21I06JQM9YIpt40AeP9XTw6rQBwpqevQWJWgDi7QhuBoB59KAEqp8RQBwkhoC/j40AeALrNYXdAgJv8qGwJDE4Ll8xwEGLIfiD8KnkgnUtHF/azuHOc0ys9thuvypTZ7FQ2Xrh/sY0lrs15clyCStWqWZMfJfOM+0/B4TWrjtcR16fCtFgCUi04fa3FYQDY4W21tWqwpC5kg2DGhsxgaD1tqKuEgmRbJGF4Y0A/Cqq9SWIycZ8hFjrZPGuxLQ5bM7DhAAePif21aJC34xMYKqRbypiYPHBtVrrgnShEQLlhbdRprTGN42PFK7a4fQb0CJSOKKEaAAX+FIoQ+di2sPDxpDB35EYUg66LQIbOQAmhIoAaflOba5vagGMuzZATZFoFJ79cUsL9VoCRTcl7wpQBbigDkkEU4R+h1NS6p7lptFW5ntFmSr4fQdVFefm6aeqOvH2GinTdt5kD3NepYLrXl261qnes6Z5nENa1XafGksSB5GRPMYUIjd/SLr++h0QnkMw57j8cl4DQbapZDRUjkZpzHEsc9+1nkCBqK6qXE6yVPO4QkFQF/AV0VuZvGV7N4p0ahPml62VzB4yFlx5GkghAPHWtkzF1aGXAjUJfWmSJOoBJU6UAcKg7VC9D0K05JY0QW6anX4mmIkMR7/YLSfFeuvWosbU2I15O8gX8/OqRk9xtHadTqlMk4gGvp+Gh60DOjdqo+CfuoEet11N/JKAOBBqPgtADmNC6WRG3C2Pn1pWcFUUsvnbs54x7XgfSinS9cGXU9bD9ppfG90l7Q1dx8/E9a8+2M7q3knY+TGQwB7hayDp/OseJomNTwsms0IfzFL0JlELl8eDutr+BrRWJaILM4woba+WvWtq3M7VIDM44gu9Ogsa3rcwdSGyMQtd6fpH+FrZMwtUj5YgHOCXFx5itEzNoHkiHy/CrTM2gWSAO8zqml6tMydQZ8ThodelVJk1B2PLkiAUm5t8BQ6yNXaJPF5QCzj8fjWbodFchO4fJABpDvw8qxtU3rYsGDyqI3d4LWDqdFXJP43IRyAHdr0sRasnUuQ4ShN27cD/G3SpaGmO4+U2J/qCNGh+Ph8ql1G2TWJnsfYEA6lfwqYE0SkGUCTdPM/hUwIkosguaGgrp/g1DQh5r3BpDDfUtNTA5C48trQGuCEWNADqNk9YT+IogJOumdFd3qb4jWgBYyGFmpt0oFArc2Qrbw8qAOM2s6BzOiXqRyQvfHcUfB9tZErXbZZWlrboSK2xV5WJf2qT5SkyH5M02RIS6SVxdfUKa9pKFB5jctiAh8U8fGqA4LBTcEovwoA4VTdf5UAdBuEKr460AeJC/6etAHgATZD4E2pAW8FFJOnhSZiL1IGhpAKBB06XUaUFIU3Xy8D1oGxwIDf1HqRagg6HEEEut1FAxS3110WgBYIAW4KoB49KAZ1tiTf4dKTGhS3S/qS1DAWF6eofwpAOBXKtvDxoAXqSxTcKOlIZ1U9PknjSGxlzST4NItZKEJAjSjtnmraZaJCFxLAiKlj5ikI683UWvprQI81XXKr1Hw0pAOt0I1B1+XhQMV6rqfMDUJQIWxQNoCoLn+dAClWzb9F1SgBwFAiqU18FqChxptqoF06UCHAqFQpOhWgDrbEL1ub/hQAq41sTcLegY4wogKp0b8KQDjXIp0CeKUgHGgG5NkTxoGdBVotbSpAW1QnqJA+nofNaAFgi/W2o8KAOtIFzYCw+B/fQAppuegstAHQoPl+40FHQEtt8z/wBaAOgFf6mnxOqigYpu0qXaj52On4UhHSSRa6at8V6rSGdaASuh1tQIWCA6+nUeNAHhpfQWFvCgDtjYaHqP2CkB7afD+S/CmAoqXANA6EnpagZ4kKABbUr1SgZxSFABT91AhYQggFFoEeJ1Gn7aBo6BZdFNiKAPenb1QeOqnpQB5V9IFwLeNAI6XOGn/SgDhUkHQIhPj8aAPaBTqdR1BNAxO70kAk3S40/GgDwIAQ2st/DyoA4CAoOh6JpQBwOU/wBSfvoA843vbofECgDhIVdenxoEcCeYGniFoA84izumg8koGICu0aXJ+/yoEG4nEcnmOAgxnuJsLWqeSGWni/tj3DyO0vjMcZ8jelyb8BxZeOJ+xpcj8+Ukj8qVSpZlcfqX3ivtTwGCAXRNcRd1q0WEWha8TtrisVGxY7A1v+kVqsSQuUErFi4+PdjWjy0rRVRLs2dM7IxYD40+QoGn5ZRGiwFvKlyHBz3pHAKR/l4mlI4GgQbKvh5JSGSGBilfddqdOiVvjoY5LkoY2bbD512HJI2IgFQXHhcU0EjT3Wc1Qnh0WmAE9xY9EKG/jQJs6VchVOp6UCExFJboFv8AOgQ5lZLIxuc70pp40mWQ0/KBz9kKE6fOkKTsb5nhXKCdSaBbiyS1q62uaAGzmtYTYG2lADbswOP0qSP30Dk415LkaESgQXExEa6xFA0FtkiCDS+tUI46VSQvyNrUhyBZWNFKxClRaituWrQV3k+HIDnQhPIda4MvX+DpplKFzWNPECJmlqHU3Arzb1a3OqtpM65rHar92uvjaszRIoPLN2k9PAD+FaJllWy9yuIG5xCqiIBWyFBBZcBkCbbJYda1TIdSEyeNJJVqk6HrWysZWoRM/HOCkNsug6CtVcwtQj5cZ7Dooq0zJ1B3BzSBdT186ozaEuBKWUg2600EBWGP7bmLcXvU2NabAEwIe4Joq9KpGNtxvcqKbdPCmS2cVt7KDagUnFJF7eJ6CgZ0oFW63B8qAONY97rAknpQC1Ll27wD53B72/8Ah8E/yrjy5D0cGEtLuF2ekC48NK5eZ3cELxcWWJwI1J08xUtyUkWHCyZYlA9PifjasGjVEzj5m/qo6uPlWTqaSFAtksttdthb+KVMDkFyMJpUAEu8tKaYyEyeOL/yoNDatVYzaITL4dzyRs+CftrZZDK1CGyuIe0qWp8dbVtXIY2oRORg7D6b6hE+dbKxk6EdLAQp2ofPyrRMxdQR0QIJ226r41aZm6g7oQ4KQnVB51UkOow6ItUtF+nzqkzN0FxZE8JDm9FuKGkwVmiVw+ZLCkl/HxrJ0OimUseDzDXEBrk62PTyrC1DprkknoOUs0KPG9YwbyScWc2QEu27upJ/lUQMIbkuivGVciEaClxHJMYfLN+h9nEKetqzdQJzFz2lC13he6gVEA0SmPkKNxdcanyqIEFunge0L8v86IATHmmB203YT01Q1LKgk4p2ShR10T9x8qRDPTwxvBMZR1kAtr5UDQx7ssPoN2iyjrSGEwSsk2gEBdfDytQBiX3n5t0mXHxMLzsZZ6FRXodXH5OfsW0gyZvpDSL9U/nXonEeJsSuuq2oA5ddf5LQB4oNL0AeII1N+g1oA61CSDdAoNABOFjnJyooW6uNz5Cos4RVVLLMCSgI/wClWc4tqgIfx/6VLGKCEqtIYohQgsiG/TxpwDZ0OJFyV60hCmqBYrax8FoGOD1AdSOvRaAFghN2nitzagDo8Tcnr1vSYClFgiDyP8aAFA6HoPxvSAcaSqaIaBoc6hyk3/bQBxRqtj1XSkDG3+m+tkApIQM4He4apfzploJgcgIItqQaQMecFCrbr4+NIR4G9v8ArQA4PypodfCgYtri1QNB160CFt3FCl/K9ACwl3CwuPNfOgBe4aix6FakZ1vibFPp1/ZSGPN+kAXKIfOgTFhCm4LZfP8AbQB0kABB+N1oGONcNEQdB5+VSApgLdtj4gnoD40ALba4t0SgYv0hxICjRV0I/lUiO+koB8D8aBiwhsAg0oAUHaDwFAC1tY6D/H40DR0rqmnRf30DOhxsi3NACgVG4my3A60pA8WoR18PHzpgLUfLr4XqQPJZdV6D+NACvpQkf+agBQO0kr8PJKBniXFqkIPLxoEK1Fyrgbf50gPBHFL3UimM4rgoIQ9F11oAUfBSpN6AFNKgkhQDf/HWgDxAPVXFL/uoA8UIKWKIvRPhQB4ka6eKa0DOgBN3yKamgk8oB8hoTe/nQUdHXcqgaaeaUAcLAqoieHSgBKuS3ghCdfGgDzkcNfhQBxEu4XF7/wAKAOO9Kjonw6+NAHEUhoHq8aBBEPHZ+SR7UDnE+pUslJtDJ7A7B7gzyCIC1pufgal2KVWXDifs5kyOa7NcmhI0+VKWy/xF84j7VcHhAe9GHOHXVaqtB8Ei4YfbfEYLR7WOxpCIQB0rZUQpXwTEUcEQRjQ06hBV6CbY8JE01VPlVSRAv3QNGqmnlVSKBBld4gDX8amQgbL3IRuKfyoHB0XQanrQKBRbYeJphB0RPfZrdfwpwJsPxuMc4gyeQT4VvXGzK2REsyBrAh16fCupKDkdpFkAAE6u8KokEyMhkYsb9AKJAAarle76Tr4E0FCHMD3KV+PQUyBzaGtvcftoHAMVL3OH0jQnSkEAWfA/JRhejet/GkxwMY/H48ABkK+Kn9tOBQFmaFo2D1Hp5UDOui3MLiLa0CIbIheZUaEKoBSAMx8ZxaNwXoKYBYhDUBBBF3UAOsHz60gQoBV6HrTAblY5Ot/8WoAGcJLA6joaYDaOQAguXoaTAjeQ4eHkY3NLLpesMmKttzWt2jL+5vt5nMD5MZXNCnaR/GvJzdW1dUd2PsLyZLy/ES40zo8mL2nssARXJMHdRplVz+OQEtBI61asW1JXZsN25C2wNq1ViGgV2ChUoLddB51pyIgByOOjcgRSLgG1UrEupC5fGK47R8jetVcxtQhMnBcCUFvOtlY57UApMZzVKJ4VomZOpzG9LyHDU0MKA+dEWSb+nQ1VWRkWoHZVaL9DVGZwAgbU/wAloFB4kj06eYKpQMU2MvdqoOh6XoGlJaO3uBdPK0yN1NhXNkudmHFLNV43j4sKJrAAHmxIAslq869pPUqoQU/HaACm69yf5VmWMOxmkjaAo8P40pK4nmwkFRfotKSoC44neJU2tapkYbCHINgUAol7eNSAWGORXkAdU/ZUDPbcYOIu5+njTSAAy4ccKHua0XKakfIVpVNmdrpEVLxxmH9rFfJ/95JYHwtXTWhx37NSHz+3Xv3OaNvm36TWmqJrmrYrOTxEzFDm+j+rUJ0vVq5rwkjJ+PNmgACtFczdGCPwntKon8fwq+RDoDPxnAWCeB6rVqxm6jJxy6wCA/jTkjgMPxiocOvQVUkOhxkk8F2Gw6XvT0ZKTRKYfNyMIbIVPifCs7UNq5SexeZjkChwaUHXWsHQ6K5EyZg5IPRu4FE0rN1NUyRizQRc+roR5Gogckri8g6I67m9POodS0ydxOXaQGlwBXoaydQZMQ5MbwDuUO+k6EGpYh95XRTqo6/jUtDTC8XKEbR0QBSdTUwDJJuW0+ppCjodStEEjqtkXcVdoAVGtKABsppghky4ztbE0kqf6RSgpM+Yu7eTm5PnMjIkNw4gXXrXtYqwjz8tpsQh+pOvjWxkJKJcdbeNIUnrkoLDz0/ZTA9r0RLlaBnWl3VEvegBSkn0hB1pAWjtXjvel/UvsGlQU8OhrlzWOvBTyPFCES3Suo88VtFz46HxSkxCwhvfx8BSA6R/AIdL0ximgEW0FiOvnSEKahICqLoaBocXRQvgnQ0AdUlyeGpoGdCaEhUVD1oAc1Cm58tAKAOtHkrh4+VITFtIBPiUQeVIEOlT6vHp8OhoKRxAEJ1/MfBKAYggEEtPkU8+oNAQDyoHBNV/yKCkykPwC+3xCg/OkMIPz+XlQSIUC5XcQQOtIB5u225AifBUoAUL2X4jyPjSGLDSChsT+4UxC0F0CEWNIYskAB2nUjW1EDFsv6V8L/JTUgKGgDenSgQ4y1lvey6mgELbZLaGyUDFtF/pNuo/dSgDu7xVdSdTSAcHRHeY8BQwF6kLYEoOhSlAzq+kDxHpNIGOEHxT91AHWuBVX2GvjQAoEuCtCkaHQWoKR0AgeI8RQJnWkO9QGl0OpoAcUtPVNAPGpGdNy4aFbE0DPXOnwJ+dhQIUSUIGunkKAOhxIC9f4UAeKqpQoNxP86BitwSyAWuSaQjvqBVSi2TrTA9ud8A7r4jyoGdUtCfSOh8aAO/t1sT4UAeLrgaE6C60hHS4nS3igpjFNQXRB1AvrQB6wKN0/Z5X8qBnQToB108/KgR1u5xO0FxW4AUigJQfi8Jy+a7bi4M0hP0kMcQnxSnDIeSqLRxP2r7v5QtIxP00Z1dL/IXrSuG9tkZvKi3Y/wBguVexrsnK9Q/obYfjWy6tiHlY4/7BZIBP6t6jUEA0/wDEt8h+Vlczfsz3DjzJA9s8akFxBa4fGsL4b18Glckh/H/ZfOc4OzS4DUjolYut/g6El8lw437R8TiXnj3OUKpupvS/GzRKpa+P7T4jCaPax2r0QeFXXGN2RPY/DpaKERgDVK2rib2IeVINHCFo3Epp0rb/ABzH/IBZMb23FrSt1IX99RbA1sXXKmOw8fPM0OcQAutFcFmO2VIUWY2KvuSAW/N1rdYDB5xLZ8In0uBFhr41X4US8w8RE56Cw8760nhGsx0wAFNwDdD8Kh4mWsiECMatICddR8aX4mV+RCmiAFHSBPI3qljId0GxsxQFc5v4hK2WIytkCopsNrka4XFworStF4MneT03L4OOgdI1p6KQBVzBDfyNs5nDkd6ZA7oADYUyT0maZPTDr4nSmMDe5ocHyep/4UAIdlssBrYUA2KbMHL5eI86BDjpAQjbDzoHI1I8tbujClLD4UmMh8l2c5zvbCg3+dKBDEWBnzvWd5LRYDS1EMWpM4uB7J9V3aIfKmOAmct27WWTVKBgbcZskm43QoiUCgOZDHG1AAg/GgqBmYhwUhE8KQMGaXBCLD/AoJCWqimwNgvlQUjrg0EqbHpQMQIQ4hp+ofw0pktCmYzDchPKmIJZjRgKg8z5UihqeCCQFsjQ5vgRTApvcnYvFczG4OiG8qhAvbwNcmXrVua0yOph/c/2v5HjHPmw4zLADdrvqryMnXvT+h6OPsp7ma52D7TnRTwmOVthutXOnB1pqxAZWGrjsW2pI8PKtVYfEipMWRrnNc3SwrRMloElxA+yW/BD51SZEEbk4DL2v5+fnWqsZ2qReRxzCC2/yrZWMbUIbIwDG4Oao8K1VjB0YxJE2WMsdYi4B/nT2CJIyXBeHEi4PhVqxhajGnYshFh8bfjVSRxZ1uMShIQXUdKJDiOMeIHAotk8qUSOYJ3ju5ZMIBwaV03VlbHJ0UzwWvjO9MaQtbK7agRT8a5b4GdlOxVluxM+DJAcx4c0i1/GuS1Wjrq09iQEbHEAX/dasmaoV/ab9TgHDx8FqRyIOVjtN3Dd+U/xpQAl3LxRq5zw0dRpfzquLJdkho8x71seNzz1e6wHhWixMxvmS2HYGZeZIGSSBt/9qLxPS1bLGkcls9nsWTA7d2D3pGiEWV77k1UHN91iTw4uOfMY3D3WtOrrL8hTmNi/wtLUkcntfBnZugb7bnaDVv4UcmzDj8FN53tP9JudLGAv5gPSaZrTJdFNy+2xINzAguAW3C1Gp30ypkFkcDPCN3tkgk36W1p8zaE9iJn45q+r1HwaDVq5DoAy4Dj6tiIAQT0/CrViHQGfhvsXBFSrVjLgMSYwFnC/lr86pWIdQOSBoulj1rRMzdBpscsRbtd6NCmg8KcmfFoMg5LJx0U+lpF/jS4otXaJnE5wD0vd/OsbUNllJ3E5ZjgEK6KlZOptW0kvBnDoUIQqOtZtFyS2Jy743IT6To7UJ1+FQ6lFixeTZMAd6ka/Gs3UTDmzxvQtNxo29TAkwiPLfEfUQP22P86mBklDmMeAhsbDqtJoTRG92Z5wuAypGuRzmEN+Y86rGpsDeh8yzSmSeV5vucS4+Zr2VseaxolSATr40EngbpqSUHh8KYHjbwPw8qBo90UuIQ0DFBCPj086QBeBiOy8iONhIYoXxNTZwi6VlmlYvGHjoGNYOgc75dK821pZ6VVCKyBZdRqf8xXqniCg5pU3BGgGnypNAKa7xP8AlSGKKKV6aGkB0WaCVXr4fKgQtpVGjSgYpRomvUeVACggagK9dyXFAxwHVbap40CPKCbAlPlahgONK6hPClAMUw/1Da3QHz6UAPC1tCBSKQjcoT/oV/lSBnCHH+A6GhggeZBtQqG6+PnQykOQuKgA60hhZUlB9Q0v40iRF2vU2KC4pjQtm13UEmwI8/FaTGOgBQbINemvhSELCeaWANMQoHaCtx0HjSGKQjQKB8vOgB0N6ixKWNIBTSLrdDSGKCFSFd8bLQIdBaqkgAn6RQM6CEQdTd1IBYCIlyOn7aQxxShcR6SP20CFAopIOnjQMV0X53/yqQFFFNyB0HnQAsFfSTcj6iLX6UFQeJG4aEjoTZaAHCfqI1JGlJgcClLoUVBoKBClRL+OtrmmULU6WNtW+fjSgR7cSRtXyHkNaIGdb5IiKRRACgTdU/yogR4EfEnXzPT50gO7tNq2/GgBSq5LJrfT9lAzw3aELr8qAFJ0WwsD50AdaQlyifwpCOKbK3ov4UDO/mCnTyv50wO2X1C2goA6COoUfz60Aat9tvtljdxYzOT5Qg4z7sjCgJXVhwK6lnNe7exsvH9h9pcU0bMWIAIvpC2+Ndyw0XgwZNtPB4QAhgaABp/0rRVS8AGQ8viMA2MAFVIBP/LY5BXU3PnQA43Mx5LEp1/x40tAHGtxHkl5BHVbUDFlmKbAgedLihq7GXQYrujb6+NZvEivyMVFj4rSdE8r/tprGhPIwkTRNTa2/j8K1SM25AsmaeVQymIi3Yk7i54J3GiAkKa3KarRdvh1FIepB8zxU2W0ua47060mpJZWsaHN42Q+68lo6m5+FZpNDH87vCDj4i+WVrA0EqSi1btApM15f77+zO+DBj9/ao3L6Smt6yeRhqRsX38DXhuVE9l9QbD4ilzYalnj5eTvLCEvG50kTn3b7bi0g1cKxm9SOd3B3X2wDDne5nYgVCSd4Hxpa1IUoO4ju7uPmpE4fAmBOskhIAPktCs3sVyfgtvGdicxyOSM/ncuRzzcQNcWsb5JVqnyCxt6sveFw2HgsAYNzm+OlaGqqg1xIajbLf5UDB5dBb1dKBAhQnVfhQA57zWEjRo6UDGMnlI4B6SruoFKQYGzkp5yoaQOq2FImQ+GWVyKjQelMqSQjcoUnzQUipHPdanif30DOIH+o/y+VAh1rNpKajwvQB7a4jabA/voGNugWxPw86BDYgDUK28TQECjGjbH/B0oGJaQAooAWgKoVoA76AV3ISbigQoeotDSuqCgBp7Hnqt6ZIkgkhbOJogYLkYsWQ0tlZuBCFb+dEBJQe6PtlxPMse5sQbOVIc0AH51xZepW2qOjHmdTEO5/tvynByOkZEZ8UKhAWx8a8m+G1D1MXYT3KJk8edxbtLXAoh1FZqx07kTkcY9vRRofFPlWisRxIufDcN1rNH+BWkkQR0mPGdwJQgKCatMXEjcjFa4IBb4eNWrGbxkPNxznElosNPC1aq5k8YDNC9pTp5aVqkY20BTH16ePnVwZOw8yOMgscgBUimQ3JHZUCOKAfuq0ZtArDtcWu9TTYGqEOOQEOjsn7KTAkuM57O459nFzG6g1lbGrG2PM6l04/vlszQyRxD1v0riv14PQp2UyXHN/qgTA/e8J6Wlb+ZrL8TOh5kkJXLlcrnFrT4a1SxpGFs8hWNw8r/U4Erq951FXCRzu7YnOdFgTCPIkcYrExssv8apM3x0lak7xXITxwiXHgZFG9BcrIG+NSynVInxm5swb7LDsBCyOP8ACpYKqRJYWNFgOGfmOMjV3WGi+FShv79ESDe/eLOQMeJu5UVwobQv8KzUlkmZj8px72se0TlnpDiDtNUjCtXV6mS5eJn8byZY+KR8RJ3SRfRuXqKXJnqf49L1nYmmcPHyEQc6MRudqWlVI8RShM869b4noQmf2c8HcI01XYEPzqHWDSnbXkrfIduPgBcxnuhLEa/hUJtHYrKyKxmYkjXbSwxjqCOtaqxLqAHBcSUCgddPhWvMz/GCS4TGhD6idALVXIh0BpcYNUXCJ6elUmZuoFLC21tdRatVYydQZ8JadwUdPCrVjF1FRZuRjnU7R0ohMFZonMDuJzUEztOlZWobVylhx+ViyBua/T8axdDdWRK4/JPYQjlHh4JWbRck5ic0SQF0Q6+NQ6gifg5CKRtyCDYfyrN1EPx5Dx/ca4gn8o6ipaKITvrknO7cfG624oh1rTDXUm8KphW4m40WvVPNOFxRXaeHlSA9Y/vQUAdboQLDT/pQB1etlFA0LZGXOAYSSdF8TSGXftvjWQxjJltIitXqRXFktJ34qQpLI3Lkb4OHh0WudI3kqPx8evjXrHhnTZqgXJUDwFACh42A08DUsYuxsT/jpRAjrbgi66jyoQCwnpT9lDAW25Ty8aQHUIGq+Y60FCrKettL0COld2iaJQMUCjigQG4HWgBwIbnpdfKkxDoG4oRcWJpDR0aKbWKgaUAJIACHpqR40mNDD7sI0JPXT4UMaOtSyj+F/OkUGbkCpYfKkIQQlvzDQUxCmlAAiOunl5UhjoI0Ov7fjQAsAgekgg2HU2oEOBW9bN6pQMUFJv8ASq0gFtPX6v3fCkwYsG5IJRF8KQxQJsHdKAFgbhqEHh40mA4NSDp18KaAV9NvC9IBQLlQEgOoAWCVXTwHwpDHFIUnUdB4UgFBdxJNkVeniKQHRd1z420tQOTqkjVQbAoiUDQtHfT1/gKTEdDjpq4+dMZ0oQbfBf50DOqRc289P3UCOqQ79woGLNlNgOqdKUiOKlhckJayj4UIBxpTTTrSA4XIUcbigZ1riqu0oAX8ELbgrpSEeUBLWCITf50xiteqkG56rSEcJaL7rAX8aYDkUGROW+zC963BaCdfjSlDRPcd2X3DyLh7eM5gd/Uopcg1ZceL+y/L5ADsuTaCAUH7apJsribz2f27HwPEQYOphbsC6GvT60qsHJesMJ5VphDk01FdRzshAHOu5U1PlQJD/pDV/wAWoG2NSZLmISTa1/OgQqPPe31bkT8L0AdPLSn0A28aUgHYuU9AXOc8hF/hTAMjmfM9C4gC2qUAFPz8bDjDnPBc0aL/AApjBG9yRuftjj3AaOGiUpFI4OfaiPZtHU/CmEj7OTinu1wXztRIhQmc71NcnzpjB5nzO0uEv50AAT4wyFZILEIHHVaBGX/cH7Zcpz7CMHJdG0BUabHytWF8fwQ0ygcX9h+cEv8A714EYv6alUbHysyxQfYVjpWEnchuCKp4xampdsfbiPiIGxxNDU1cEC1pWsIaqWp3Z2DkAfqmNel7haplNIk8HgOP45uyCAN8wAKa0EklsFyMaAn5Ra3SgqQd2wKguqnwFAwSWRrSo+RoEBTPQooAF18FoED/AKmCMpuUDwpSADm5cko2RKwaHxTxpMGwWLGJKuuSqJqClAkgzHj06eI+FAyQYiBLeFUAsSFoRbeFSMVHvKudqutABkcrWtVfG9BUjjZmkIDegBbZQSLdFt0oAU54JJXT8aBjcjvTbUdaAAZZw0Friq0CkZ/VtFgVKfGgUjEuXILtch0SgUgZz5wSpIoCR2PlJANb6U0As82xtnPC0pDkLZzkaoSD4L4USEjjeSifZdeopyOR/wB+N7VH1EWNtKJAEysHFzY3MmYCCNUC/tpOqtuCbRmfd/2pw81r8nBYI51Ww1rzM3ST1qd2PstbmLc52tyHDyuiyoSGA/7rQUSvLtW1XDPTplVkVHL48SEgeBJt401Y24kHlca5pXVB+6rrYTqRzsdwcrhbQWverkOIPnY4iwpJE9QFvACro5ZN4VWULIynGZwJ9K3Tyr00tDwrOWJ3brD5CqIEI8epbFAfKgBL2rY9evjQMFkgKqBrTkmBja9gJQ9LGmI8CS5NEv5UAKLHtO78CLUAHYPK5WG8bXEhvQWtUOqKVmTg7xkF0dv8f86zeM665a/BJYPfMoe1krjt6DwWs3jNlajLI9kXPwe7jvZ7zRbxXyrOILpeAjjM1/FxyxyML5QEAd0TqKRq6zqKw+W5HMyS2APchACafCoZ0qlVuP8AI93cjxp/R8m18bdFcLgHyog2x4qvVBPF9qf81jO5LDmc8SDc10ZumvTSo2NrZlRwya4vh+4ceMsY6RB1e4glNBUxZ6kWyYwXP5zkuDe1/JMDoAUJX1GmpNq463Whdex+S4fnT+rwCGEFJWyHRxHnamlJ53bx2oXXNg4mdnt7PdmAQmKzR8XVrojwrcTOu4cbDw8n3c/JiGMbDHhvPboaUTsKrun9pSO6eQ4F8KYMOxx/NL9XhWbpB6+LI41M/wAmeZoLgxGX+fWnWsmjyERLnuJRLG5ro/GYvKHcXx7uUlEZc690YLmk1BPNeS5Y3YETBukaAUv7hV1/Ko5GVsi8Cs3srDkj2MP9weAtVKxHMqPI9k5MPriG5t9LitVcejK1NxM+M5JGm3VDV8hOg2w5GOQWknwFG5CTqSmJz0saNlt0U+FQ6GiyfJOYvMRPQh+g6fyrN0Nq3J7C5d7QGucqahbeVZOpfInsXlWv2hrtTpohHWodS5IvvnJdLwiKoDrJ0tTxLUjJ/EyVQOik3PT8a9A88RbwVRoaQC1C2PxHhQAq+7wPh40AdB2qgR386AJHG9nEYcic36Cs3qbKK6scf3nkRkiJv9oIga1QgpfgTJfa+gc/vhscIdEz+6QF3BXL4AaVK6+pb7egaHK4kLt6X0+NbnIeBciqCNE0oAXp/wCEXX460Aeueq3IBsKAFhUQEfECkAv0r1B/waTA6LIHadfhSAcBuEKddenwoKOhdQVHUHxoFIoeA1oCRbSBoFI1KdaBngQqfiKAHmFFQ+YNSNHibkXK6+FqAZ0KAAqqLJQCGnrcg2RCOtJghDCvS/VdUpFhcRBaFVydKBHilzovhQIVHdhUovT9tADliAetri1IBaAFSUQfC9AC2qLapr5gUAOBw1drSGKbcWF9D86GMWClxp5+FSAseQXyTofjQIUCTo7QWIoAUEJUJqulAxzcXNUKLJ4/jQAsFqg32m3ypALVyjRRSA60KVJU6eP4UDHBcAjz+VSB0Io1TqtqAOlXE30KE6CgpClCaaaigQptxr8KBo5ooUFpsQPLwoGKDrFAfj40Ad3byDp4L4HxoA6CLghUqRCgDuCoV/N4dKfgBZsQl0tSGeO5qfBQv4UwPaG3+FogByOKaUhrInP3LZoJUeNSBP8AHdl9x8oWnHw3Bhurx40SBceJ+ynNZRBy3bGn6g0JrVcbMfGdy/8AD/ZDh8UNdlrI8ePU9TVLC/ItC7cd2FwWCGhmMyydK1WFIOSWxPQ8XiQANbG1u29gNK0VEhc2EiKNug+Hl5VUClj8RDSWePWrpaCLKUB8lAJI9LoqV2SczRW5W+0SvyAoMxouKKoAbr4UAR2W8khuoBWkwGWzOIDF+IHhSAIgDV3EKRoBTQB0WQ1qJYHzSmAiflnMBYxPiKJECtyPceXzlR1P8KBBkWfjwhWs9XyokaYzNlzZB/tjrqnjQKRcWPlvU/SNQb0BAQmZH+YhPilAx6LOym2eQQvWgA6PKjePWNrvCnIB8E0RTaQmiUSMNZNARt2g38BTDQIZLjtaAg3DVRSkBxuXCAgNxqBoaGB39YCfSCh/D5UxDbsl6nw1pDgElyg0nc4D4UDA585gUAFx6Dx8KQSR+RlyvJDfSPKgQE8ylpUkuNxQIS2I28fDrQhQLMKldRpfy8KGOBbIXAhdOnhQMI2taEIUqp+PlQA816Abfn1pgeWQknoqj40QB7c4C1vAfGgQv3CL/tF6QxTZD4oBQNCzkliKQmqeFOAkScvat0P7KQSMuzN6XsRZNaAkHnmaQb+a0CA/cDXENIVbigQw/IdfXyHjQAgz7+nklASIcjtddEoHAHO2EAl7w1oupPSs3ZI2rhtbYr2f3TwfFztjyM1rSSAFcLCuW3apVwelj9Vkupgncbk8CWGOeHIY6Fw3MeHAhDXbifNaHk9jG8Li2g7J3JgYzdrshpJ6qP311LDZ7HBbt467tAEn3I4PEJEuUz06q4dK2r0sj8HHf2/Xr/cgeX7x9rtBDskOHgAq/hXQvW5H4OK37D1l5IrO+4fYvOwuhmmY0usRIE/eKyyeotbdFY/2TrryZ9z3b/C5W7I4mZhaVd6HBwNeF2PT5KbI+k6nvcGT+5MoeZw8zHmMtXVCL/CvFtS1HFj6XHlpdSmBO4JzyHEbQenlUKxcle7u49uBxViVdY/KunBrYxzP7TIfrkcgKgm/hXrI8V6ng1HWNx18qZMDoTaqrbWmB3c146KuhqQOe2t9FpgNvhN1sOi+FADYgaL6eHWgQ7/Zd6X9fzChDB5sbaP7ZVuqiqJgH2lLa0CPNcC5E2+PxoHJJ4fJ5mIEgcUPRf3VLqmUrMs3Fd0tfLs5BoREbINb2vWNsZ14+xG5ofbHJcXjZQfHt3PQBT6XVzOjR1u/Ouhae7O2IO7eOE2MG/qWhLams5ZXWz/jcMg+yMjmOy3PxMjGLmAnaHBB+2nMandlrXKtyeye78vOyhE71NcQrcZu8t+KWqJbMfxUopkM5Ti35vHE5z8WGF30y5JBlvfTxqlU513OD0Kjxb+E7alkmxnvz5dTf24F6WKVfFLcjP2LZUN819x+Qy/7AyhHGtsfFGvluo5JHLTrsq0mTzHIFxhj9mN/1SPKvv5laytm+p306rYy3hooj7mbIZpVupJ06+VYvLOx1166R2eDHLdgjslraimrst4kRc/ERSBzwxCNDrbrW1crOe+JBHBsmwcsmMEsVPSLoPCumZR5l9GXZvISqjnEnVxdqB0rODKB6LPjl/3Tdfh8KQoCxBjzt+rW4HyoQbEdndu4uS0l7Be+4eFVJXJoqfJdjF7XOxAp89fwqlYtXTKbm9vZWM47oyWtVTetVcbSZF+3LEfSSE0BqpkhpoLx+WyIP9w+kdenhSdZGrtE5gdwMsN58/hWVqG1chJchyAz+MlhLlQbmJ5VFawzSzTqUJ4AeQ7x18q6zgEkkldbaikB0La/yFrUAKDg0XF9EoAdxyC7cT+J8KGCGMyc5U4h/Jo4U0oRna3JwS0mNhY3GkOH91wUJYColtm9qqtSI4hkUvItjeFjuv8Ag1pdtI5sKTtqXQFp0sf3mpKFKLEq4/DpQAr0hG/T8R0oA7qNyX/xegBQQO1t4jzpAKABG4aJUgKJA+H7KBimusrrDx8aBMWwkbUKqVNACglxofx/bQM6xxAQajpQMdupDbjwFAC2korteg1vSYHSHkggoU1PnSA8EF2/9KBoQ+9zcHXzoGN3LvL8DUjQVE70o3WgIFOUhQgKIngtAjgO0kanoaBjim9lXrSEOLc7j5IfKgBwEJfQi3maBig43F9LHVPGgQoXC6MVR8RSGOMfdfkt6TAcHgT86QhTEF0vop8KBiweiWGnl50DFByo1uuvhQwFsJ6WW4CWqQFbjqL+BPjpQAtWlp3X/nQMUCCANDqV8TRAztrhEJ0U2/ypQAqypodD5+dIaFDb010B86BnQG2FyPK9AHUT1O6G56UAKC7LXCKPKkAlU9JCLqaGAoOvtLraeC/jSAdhbLK9oiYXnQNAUfsptwKScwO0u4uQLTj4MuzQ7gnzFTyAuXEfZfn831Zh9lrtQBf9tEWfgcMvnEfYzjYCx2a73T4O0q1hs9xwvJeuL+3Pb/HACLFYrbXaNK0WFeRckiy4vGYeM0ezC1o0RorZVSFyDmNYG2aE6AedaESIdI1umvjSkcHQ579BYhKQQKVPqKkXI8qAPNaXeq4Oo8KAOoQpW3lQNHpGh8Z/ALrXTjsYXqV3OxiJD4m461sc7RE5c7MeIlF8f50mSUrO5/bPsjchVLXNYuwgjAzJ5Ua65PWqTGS8Ty4gnTQ/GqW4BG2ZwAjaQOlUIUOOnI3EEqdegI8KAH28XOi3UooSmEDrOJyHOVwUeXlQAdFxr2EIw26mqHBLY8DmNDXN/AXoAfOOHBS1B/GkUkCy8eHhQ0C3SkKBl2C9ug+VAQNlk8aBPM2tTYgqOZ7bOXwPxpDCGSbyocR8aAHg1zj6XLTAcPvDRydfjTAbeJSOq/h8qQDJgc4qdOnjTAT+mQE/4vSYQIOO0u06WcBdKQ4EfpBrof3A0BAj9Oxugv0W9AjnsH4jUEdKAFhu1R+z40AJEROug/fQAoNDTuHgFGgpyApS6w6aHSkHgSRuKkFfA0xHnIWga+dIY0VCnoNRQA2ZDuQFen4UANK8kA/z/fQBxFJuhSmwGMgkAgKg86QEfIC0bgSCqhTagTIrP7iwOPaf1ErWgBXX61pXHZ7I5snYpj3ZQef+8/BcQ14jk9yRUY1vX8Kyz0vjcQdHUz4s2qZnnK/9wXMSr/x2O1jXaFxvXHF35PVV8dfBTuQ+7PdXJKJMlzFvtYbeBpfhT3Zou5x/iiu5PMZnISe7NO98jtS5xN/nTWCi8Gj9lmeicB+J3JzvHsEWNnStgFhHuO0fD4104rfjco8ftU/yP5khH3RkznbkZEjydd7iB8r19T1e/jskmkmfnXsvRZqN2q20Fse3JALXEqNTqte7VprQ+QtV0cNaivZ2+lbVexPI4YHE+kp4U4HyRJYuPksaocWhOhS1VwT3Od5EnoP/AK7LhdtKyxjUO+r8a8fuepxZ1tDPpfXfsGfrNJvlUIdntn9MXpkT6Xar4V8J3fTZcLlKUfqXrP2DB2tJh/DM5+482QzFYHK1pBUdFrzuvWHqe/2LJ101MhjlQlet3A6g16h5cju8WPQ+AulASeMm0eDUXSgkaDvUUN9aYhxkzgUff99IYZHJC9h89AdaUCAciX2SovfQ1cBI2widC0XPXzoEcaZoiFu3w1QeNAahAZFOFH1nyuBSAYfAAAv1+PwqgPMY6NXAKNP+tSwH4zuKEeodP3UgD8fNycOzHEA32L+41LSZpWzqzU+x/uOYWMxM14YQEMjlJTyXwrntjNLZJRauU727fmb/AO4a7Ocli70NCedZ8WOtroq+Z9yYsVhj42OHFbokLdz/AMT1p8YNfue5X5u5Ob5mYDHhfM9xT3JCSR10qHY1riJHF7R5rkEk5KZzWG+wHTytWLs3sdKVK7kqe1zxwaYolJtuI61latjpx5sc6CmYOTIdrmIW/S1osfnXK9NzrVk9ghvbmRIfUELrku1X5VPOByGx9pRkrMSSUQeFL8jJbPZvb2Nh4UsgZ6kN9a0pZtmV3oynmfDxQ8j/AHASNv8ACvWWx4dtz0PIRzPa0HzPla1VAkSeO/cpJ9RCk+fhUQSPtnLVIcWtb4H+FIQXFyTmAh4BTVdPnRImg5kmNO1uwjql9U6USSN5PHYuUwh7GuDunhVSUmyn8v2diPJkgAaSpNUrFqxSeQ7XzscuSNxGuig1orD0ZBS4k2OURzep+Iq5JdRcOdNAAHH0npehoas0DTyNLzI3r+IU1SM2xG8XHibmiCZOGQCw/afCiAk8tyTp5dKoQ4X7GlNeo63qRvYRjPHv7uovpVPYzx7hGXOXwp063UpU1ReSwLxjvanMxP0gpVXRnicOS9D42HXQ1JZ4EkECyXU6+NIBQAKlfN3xoA7ZAgQromooAWHJ6T8b2oA6uoTypAKHgUvrQAoIRqAOvXSkwFtIGtlv+FIaFh35iARpQOToCi3xWgBYRSoulAhwXQ6eK/wFJhJ4IgPTRf5UhilKBp0Oht+2gYg3Ol/H4+dAxDtqhD9J0JpMB+NQ5BZfxpDkcdYC/wAz5UCbEJdVvfXpQA62wsipdT+2kA4HBAoQnQfzoAWCFQouo/jQArVF+ZNvnQA41URbeHjSGL0I6Aeap5CgBYIUWUeNJgda4AjdfwHxpDFq5yoU26+PwoAWHF7VFksgoAWFu5DfxteiAFAkNHXTTqaAFaBEQ+I1UUmhi1QAqp6p1NIBQLbKpP4UDYpqgkONm6p4VI0eDvk06H+NAC2uIKtITUlKAFM3PKMaS7VGjcaUibJjA7Z57kwBi4MjgergQL0uSCS58P8AZbuTkC12V/ZZ1CXAF+tEWew0n/Q0DhfsBx0JD86R0xFw3wrRYrPcIS3NC4v7Z9t8W1oixo7aK0ajrpWqwIXJeCyw8Vx+GzayNjUGqCtVjSFyY8ZMRoRpHhVwkEsR+tg3WudCmhp6CHP1TQjtp+JvVaCF/qIyEILV0+VAnIoPgeoDtqoCfBaUINRv2RuN1K9PCs3QuRwNQDomh8qIA8XtBQ6eXjSHBx0jUO2/lpSkcCS977af460pHA5EPFU6+FXRwybqSN5RgHqIRuldvg4mtSr8pEZ2ey0BpN/OhozYLxnZnHucJJSHSEqS6p4IEiwRds4MUYEQCn4adavihwGQ9twM2kNB1ogOIZFwTGeogfA+NMA0cXGl2hfLRKYh9vGxCyAJQA8zj4larQEuugvQA6MLHvYfCgBJxImuJaPhSkY2/HjKgC1vxpAediA2Z01psaGnYaqUX99qQSMHAa5AbfuoAQePHh5eF6bDQSMFTZL60ggcZiODvTqn7tKAQ4YUN7nx/hQUccwJob3PilACXRrcBCtvhQIaLTeyDypgJLNpsCba+NCAaLVUoaQzghabDqVFAjroxoBc6JQAgxAi/Wy0yYPFh2oNT0NIcHiwDpQOBJa0IB/mL0AIe1xIOp/clAmhtzEUrY0CG3BAQB8KAGHsH+VAHHEpbQ6pfWgBktINyLa0xAWbPFAwyyu2tHVapVkm1oUmV98/dXj+JjkxsF3u5RCCNt06LbSvT63StfVnzXf9xXH9tNWYRzPcHL85M6fImd7briNpIaK+gx4K12PjMvZyZXNmUzlRKqAlWlEX514Hs1DPtPQOaAEURJVx3DoPOvBZ9ekH42IZCGtjRbKmtQ7pbnTi618jiqJBnBTveEKJdVsB5VzX7danv4P1/Pk8B0fBSsDnF1whQ+Fcz76PZx/qd/Ig8XELuChbJ/GoXe+DvX6lWPuYg8pDg+gklzbbuqCvpOh7PJRa7H5V+w/rXXd2q7/QLg5+PJG1pC+I/ea+w6/dplWj1PyXueoy9Z66olsN7pXB2o8fKvRq5Z4eTQmv1O2MNFbScXDUZEjnuv8AOpLiBwxNcNxHqGjuoSlaqtuFburlOBkcCzuSaLhspvuNmO2OQpuB1r5nv+pxtO1NGfd+n/YsyssWTVMo3fX2M53t0HMw4jPhlSou5tfHWbo4Z+l0avqjJsnEysN/tzMc0tKEEXFaVsmDq0DNkKp1CoFWrRmcDl6+dqYCt6p+340QB5rj6iLaKlAjjwJPS8qOhpgG4eNEQUKO1AJrNspIdkxZWAkDc3ql6JHAPZv+l4+V6qSWh4PikjSVN3iPGkAyGEOI1atqpiFe2WBRe6k1IwiIiVxaSjkt51Izm2SFyg3at6YC25ck023KncY9EVKztU3x2XktvEcVxczBIx7SQFKnRNfnXn3tY9fHWkSGcZ3Hj8VnBkjfQDYNHSuimOVqcOfM5hGg4neXG5kbRAWxHTzodYOOW9w52bLMGOBbICdEsh0tWbXyNNodi9Z37NpdqKxtjTOime9Q1r23BCEIiamuS/Xfg9DH209wlsbnbVt4gdBXK6tHUrJ7DWQyBzHROO9bENClKacD3KVznZZyVOAAwLuR59R8q7cfYjRnNfAmisjhM7i3/wB9hLAfULlR+FdtctbHC8TQeJNzUT1WJ/lVGDQpC0Aqu5VtfSgljjHh8ftuQg9KBofa0xbdt2re+ngaQEpjze4GglBqvjSExcsYXRfKyJ500Sxt+DFLGHJuPg7xPSrQuUFa5XtvFydwMYaTqnj4VUlKxS+Q7TniL3xjcBoBWisXJXcni5YnpKwtRVQJVJhEgpxWg6W61UmfAQYQFQKvzNEi4nmxhb20A8qAg49qsJB10TpQhW2GcWRjXua6y+PWqZlRwdyJBI306DpTqhXcjDXljdjSpNkpsSehoAcAttdBWRqKBUE7lQ/s+VACgSbhC/z0oA6FCBV1TyoAVucQf3UAKIIRCgsV60AKHW3zH86QClP5goNj5AUAKBKlUavh+ylACgpK3VES1qQCgRYOudG2oGLBVCFUHUUCYttlt8VpALJZuTTwpFHCm1EuBdbUAcI6gH+F6AEaIfmFvcUmNDkRVOt7n/KlAx9VOig+PgKcCY3uKtWwPilOAQ43wFitk0qRji6qAVunkOlISYthQf4+NqBiwQCAVUi3woAcUkJr1B+PnSGKUO229GtulMBQsAoUaHwNKBDgOrW/4PlSGhXl8iP3Uhizc2VehoA6031VLg+ZoAW1wIcCEA6HWgEOA3uPjSkYoINLtWwpALa4vQC7iLWWkEkpgdu85ybgMPCkev5y0hv7ankgLpw/2a7p5JzTOGwRkaEEkChS/BXFmgcN/wBv+GxzZOSldI7q1UB/CrWKzCF5NB4j7X9s8WBsx2K1LuAJrRYF5DRFng4/h8ADY1jCLoAK1WNIJYQOQwo7MAJ8h1FaaChsRJzbGA7GAeR1tTkXBgM3LZMqIdg8PjSdiuIK7Lme5HPJ8z/KlJfEcY+Qk6rotMQTEPbcHIrietBI5LkPBRoAQ/spyEC4pXuu4oOnjQDQoSkahPNKJFARHKVabkgUyWPidzhewGo0pMEJTem2/UGsmaSLbGhv0FvjSgJHWNHwGoqoEPsc1t/263NMTBc3FGQoOqWOlq66OUcl1qQOZwkz1MZvoDVtGQzBxudGQS7rTQiRgZOxNwQDoaYEgzJe1o3dOnWgcjgzipToF8KAHm5jkugIFAhQz0sUQdfj0oAU3NcT4igaHG5upVBqLWNAjoy2u0160DODIjvuTcdfKkCFjKgRSQlIDj87GBQvB8UoAa/5DEuTICBoKbA4MyCS7XA+I6UgFiRhCqPgetA4PF7V8fGgQlWqV+C0FHdvTpqR/nQKTntgq1D8NaByJ9hvW48PCgJE+2BZfl5UBIkxN10oASYwijXwoGIdGQFUfCgQn2lU+NACHBQLXFAHHDciD50wE+1oLr0pAK9sCyX0H+VACTBuPn4eXjQEChiNA+lES69elAQedgRjUKtwT/GnqKBs8cHAtDUPU0BADlYRhjL3/QPCqSkhuDGvuP3LlxxP4/jgr3WLhcDzNe/0ukn9zPh/d+4eNcKGDzcNkzzSSzgume4uJPjXv1xxofDvtT5OHh52K0BQl604sn86ZXOd4iZrnlo8Ljzr5n29ISZ95+s9hWlDPFduZUxbI9p2dF618V2O0qH7Z6j0t+z9z2LTjcII0bsV2q14eTs2ufp3U9XhwrbULPGbET0m9vA1zfkPcrVLYU7Ae2PQ7h1qeRWg1JxrntILQqdbmqWSDO6lNFT5bgJhK6baoIVB1+FfSdbPW1YPx73nrMtMrtGhCNwZIJv7YLXAaJXpY7urlM+Ky4VdRZFl4zIlx9rX2KKh0PhX0nU9otrHwnsv152m2InmZTJHAGzjfaa+jx5q3UpnwebrXwuLKGSEckSKLHw+FdCOFpinZJAUNvoT41XLQSqX/wC2PaeZyPIx8vkxluPH/wDq4cEJJ/N8BXi+x7SrTij6v0XrrZcqyNfbU3DkOHxcvH9jIjD2IhVCf218ddK25+p1TqvqYr379gOL56GXJw4xFklSHt/cRXDbA661OquX5Plru/7S9w9tTvEmM50DV2yMBRB42qK5mtLGjorbGfT42Rju2yNRDe17V0VsmYurQ2TdSE8hViOgmw1TrQI9cW8f8a0hntxBtY2PpOlAEhjcpJENsnqiRAtql1GnA9LLiZLUbZ3QHxqYgqZAZMaYLtKponjVSQ0NtGSDf6R1PlTkUBw2keohPw1pDEzTwwgEFXjWlA2wKTk1BLbO8dfKrgmQT9UXkOcvklApCoeXyMZBDIQD9Q1CVLqmXW7WwUcyWV/uyOuahKCm5D8TkHxvDlQ9PCgaLtwndk+OGh7t7RY+NqytUDROI7k47LIa70uQL41HEWxYCIJGtcx4LFBHjpSIEn3SEJsdR0rK2NWN6ZrVH4wbB6NJFiLhK4b9Zo9DH3F5CYYInBGhXKh8E81rmdWjsV09hzIxcKeMxzta4GyN1XypK0BuVLl+2oXs34Y2uHQ9beVdFM8GVsKZTp8HksRxErCW+KEaaJXbTKmclsLQLhZTnT/3U3NVB0H41tuc8E1A6OVhsNp186jYUErhcbK43Tb4KoQaVW5NnBNswGRtVwVRprrT4mXIjM2IsUsVStvhrTEiMdIXKHJt620pjAsl0Klr9pedAvhpTgoi8vh8fMYSWpboi3qkwkrOd2k4AvhHRU6nxpyUrFcyeLyICWvag61UlTIA6NFUKVv/AApyAy5pAvp5aVSJZHzs2PUXJv5/OtEzmshthJUOChKZA5E1ripselJl1L8gHx/ZesjU6EuPH6hQAsEoQBuTVLlKAFWLQbrog1oA7fegPkp8TTAUPT9R0/bSAU0j+BHwoAWChuAD4a2/zpQB0EbrlP3fhQAto8Px86TYCza5uUsRSAUNDey/jQAojR2gTxoAXdwUkbv4/GpGdVdAoBRfKgBJFx46L0SgIEANB9P4UFI62zl8NB0+ApDCboAelgl7UxCXWBsL3+VAIW0W3EInh5+dSMcVbJbQeNqCRQISxt56kCkVsODaoUK7VBQB1ArUKm5Q6UAOLcFunnZUFAxYu0glV18KQhbduqp5jzpMYoEdLeKdaQxYI29E06pQIcahRbHw60SBJ8fwXNcm4NwMKWVTbawp+NQ7oJLjxP2c7y5NzTJAMZjtTJcpSTb2RS1NC4f/ALeoWlj+VyjKWj1NFgfwq1is9xpfJofD/ajtHiWh4x43vaikgfxq1gDQskOHwHGACKFg29WgL+FaKlUVqOO5zHYNsEW7aPyhB+NXK8DhgkvM58hOwBgNl1qXYfEFOZmyE7pTfRLa0SykkKbi5EgD5C43Uk0QwHWxSMXb/K1MJHGQk3cfUfwppCk4+JAqerwGtECkcx2NaQSPV53poTJERwkK7X9xqiWJPtxgkXpAIIVSeth8KBnS4NG0XoAWxygDw/hQAQx4HpHxpkwOulY1u5wtTkmBcTx9bbLolKBi3ylrUAPw8KzaZSEB0ztBbqBUal6BMcbiVcFtpVJMTZ6eURAdAnU12U2OO+4xBkhxsdPHxrVGYXua76gD4imTB0NjcCEF+poExQgieFIuulAjwwYyfSf+lAzjsICwK9D4UCE/pLIvpXTzoGd9hFTUGgBoxO1A+PhagoS9haLaHzoEwZ0Ur+p/jQJDEscguHG3hSgGDuikcbqaQCDEVVD5fE0AKAkafS4+nX50AONy5GFS5E0IoAfbySXv1AoAfZnE3It4fsphI/HmNNtGnU0MEPMyW2BdbxH8aRQ6J2AJr4H4UEnfdjcAqLoooHB4OZbTwHnQM6CCVKKelulACSxpJPVSvgtACTEihBfprQMQ+FwB8ToNQtAgKciNS4gBFJ0CUm4LrWdiLyO4OJx2kz5cUY8C4furB9jGvJ106WW21WQc/wBye1seQRuz2vG5NzdBXNbv4l5PRp6Ps2U8Sy4XJY2fA3IxpBLC8AiQGyHSu3HkrdSmeTm698VuNtw9su3UqTWhzC/1DgfVomtOQPDMAPqP8aYGX/c7v48IxuNCnvTHYLogAvXtev6yyOWfIe+9m+tXjXdmSM7txJnOfPCHOdq4kLfrX0iwRs4Pzm3es/5VOHk+InBLokDz6gALCtOFvk5bZsb3qOxDgMgFpIY46Fw0ND5Angf0As7h+Hlc27CCVeVB0rxva0dscs+x/W8tKZoq5Dcft3j3xbcdw29APPwr8i7uO6s2z+s/R93G8KVRbO242u6EAJ4Wry5Z9T/kHZe1xrp5a2FGo12UWHD+1ufyWA3NxQDvAO3UaV3YunkyU5I8Hse/xYMnGxXOW7D5jjmuEsDvSfqAtWN8V6PVHp4Pa4MuzKjl8S9tpGHw2on7aVMrq9DsyUx5aw9SNZ2vG5ZE+RHXrXpY/YNbny3a/W8OVzXQi83hchriIbgAhtv31309hV7nzuf9VyL+LAnYufA0K1Wt1616OH2v43oz5ztfp186i1ST4iQ5eZFivf7HuFN0oJaE86+iwfsVF/M+F73/APzfs62xM37tL7R4EscWfnvOSoDmoRsHy612ZPbrIvsPBwfqP4Lf82r+DWsDiMXjYmxYzQ0MARAnlXi3yO71PrsWCuKvFLQekjiaQXuAS5U1nEmrsgSfLwYm+t4HQCrWNvwZ2y1ruyqc5P2tnRugzjC4EEI4tT41r/g2t4OK3tMFN7L/AHPnr7h/bDtLkny5XFujjlN90RFz5isLeqy11qPH73rNw7I+d+4Oyc7i5X7WFzAUDmhbVwvlRxZQexjtTKuVWVR0MsL0lYQmi6VashOrRxxB8/AUxHg1T/CgDpamn40AcAuE+rxpgPxZckKFN3WpaAm8TMwcmFzJvTKRYpaoiCk0QWfLtedjlbcDoKtEMjHSPf8AU4r1piEloGh+HhQB4aX+VADuPC6aZrY7+XlSbHVSw+Vr4UjeLiok1aaOxydCSfAUMkkcTJfG4E/jSLksvG5xajt5aLaGpY0i4cd3DkwNAa8vjPQ61lBLqXTje4cSVm2X/dsq2VfCpZEMmI8tjwgcC06Efj+FBI8MhI03JdQD51FqJmlb2q5kbj3l5c5x10Ggrjv1vg78fbXkk4o4XNVwRvVTXG8bqd9clbLQZysDFyGFrmhzdCOi060s9hWyVRWMvtLAmkcY2AAm4Gnzrvx0slqedlzVew5/8cw4GBrSFaUBTSumDlWSAkNZANrXIB4Wvp+2mRZyBy54jdtcfT0va3jTCCucv3Nx+IpdKHkW2Nv+J6VSqOGig8v364q3DIa3wFzr41qqgVN3cnIOyRN7mpuF8aviKS78XzrsiFrShcgW+vzrNopMmW5Zc0dbX6rSENS4sGWoc25FiUFOQILP7cZIr4gGl2h10plKxWc3hcnHcVb6R1HgaZW5Eux7o4U5DiI9iO7SBuHUU5J4gckD4j6FQfwq0zJ1gvilAnzrIsUL6WP8PhQI60dAfEmgYpV0ClwutMDrSnwH+FpALJT1Ebl0oA8CNALW+X+DQApt06r1FACkQBTcgXFIBTXeohb3t4/GhgOR9CLDz1FSAppRVuRqtqBi2lLdFt1T8KBClsFRdPKlAMUo0aNP20QMS7XUHwPmaQxIRS3x69FoA6xCNqaf460ix9QdoSyWWmSziNJLR0NrrQCFM3WRyH9iUhiw4WUqn7qRLHTrrbVRekULCAdL9fOgBTVBTx8fwoAWHBfVqeh0oGLBKWQdKQBWHgchmH2sTGlnXRrGkp+yodkC1LNifbruedHzYxx2O0L1Jv1Sod0aLHZ+DT+1fsDj5sLMzmM95Dr+0whgTz8a2pR2UyRbG1oaZxf2o7H4ZgLcFksjURzm7j+2tPw18gqlngxeLwmAYeHGwNsAAP4Vaql4NEoHZM2cANi2xuOhAo5FJSMufmyC8rgfwpahBwQTPPrkJHS/WmDYr9Gwf+I6UcQk6MFtz4+P8aOIcjjoHKjQARqVtSgaZ2GC4Lrn9qfCmkDYY0gNTw8KokQ9pct18T1CUAJAQKdPEdUpAda/doETWgBRYSQjfO9MB1oeAT0oELbC6S5W3WmIcDWtaVKjSgDoiU2uR86AFt2tQEWH+FoA49LuFjZEpAJDXOO0m2qaCgAqMbCir++qJY4Ngsm4JqtG4glpY0XsaUBJ6TIDWoD8elZtwUlJFZ+T6U0T8BRXJA7Y5QBDm3sQNU867K2TOS1WiVxs0GxJ6W61ZAax4e1Wn4pVEwOglFVU0XrQJnRI4AAfG1AChISQFK0AhYmUC6pSBni8uCnQnUWsPCgIOFCn7/jTAaQKfKwKap4UDg6BqEuUXwv4UDGnMBH0oPKgQkwhFTTpSGNSRNAt8h50BAg44cLhD1okIGJMQDzPglMloGkxSETUHpSgDgjdHqUFIBXu2DFv4LTCTrJXIu9B4UDF+9IdTqNdaQjv6t7RqPAA00EsSeWYwI54QWuafETtA3J3LhQKJZ2MSylwA/bWixWeyMrZ6V3aI+b7g9vx+l/IwhzdRvb+6tV1sj8HJb2XXr/ehh33R7WiVeSgB1PrB/jR/i5PgS9p13/chqX7t9ptFuRgXx3isb43RanTj7WPI4qymd0ffTtsQyYWA8Zk5CF7E2A/Fa8bs9hxCR9l6roK91Z2SRRMbuLguZ/33bZXKXBxUKb187Zvyj9Hx4IX2wPScLiZLN2GWuCaBDWbUm9MrruSPbnL8x2lO0l7pcBUlx3FQh/prfB2LYrStjg9h6/F3K7Rb5Ny4jlsXl8OPLxHe5E4BQNWnzr6vr565ayj8p7vTv17utkSgQi4UFP8LXQcB4xtNw1POqEfP/3s4ad2ZBln/bDiCn+oV9N6qy1R+b/tNHW1b+DH3Y74vpJ2jxr6CIPiFZM4HysHgvxoCEegzJo5Cd3yokLY00J5TlHQRiQPQlV8Slef7HXEz2vQ1jsoAw+8Z8chwmJaegPSvznNhrklM/euh3MnXsrVZbuP7z/VMD2S+Qv086+V7HVeN6H7N6zu4u5jUbktF3izb65QQE61xOrPYfWRtv2h7oi5bhsiMyB/sSloHka+l9Tdurq/B+VftfWWLMrLyjQcmLCzGGKeNrwR1bpXu2x1tuj4rHnvj1qyn859t+G5NrpIWiF5BQ6CvKzetpb+OjPpel+x5sX83KMn7j7Zl4IvjLfciC+pqHy6V4mXoZcb1R930/fYM6/lBTjHiPJMjUdqQiViutk+D037fDX+5DMkWFtIe1AdFQfjXTXpXODJ+wYK+SPkn4/FdtawE9dCtbr193ucGT9pxJaExxH3N57gSI8CZxgav9p5JZf52ruxda+N6M+W73tcHZmaE+778cw8AOwg16Xc1x2/hrXudfIk4ufCd2mSG8RC5f3X7lz5HEziBjjcRhbDzN6+r69etbY/Ne/m9nRtvRfQj5u5+azQd/IyvBFwHIo+VevXFjWyPlcnaz3/AJ2YAZpZj/cc5x8XEk/trdJHGzoaHGq0ZOwPPxmPOH7kIIIcDcEfOuLP0sWZfcj1en7bsdW00syj832PxeeHuhGyYKAW6H418d3/AF9cGtWfqvpvc27dYyVgzbl+zM7Ac4sYXNGpb5V4qu/J9VbF8FcdHJC4slBVvjatU0zBprc44teoGvnTJEJZE8qBnlS1wdAR40CPFyNBPTRLXoEByuLnXJPxPnQSI+JC/toA9Yql/PrQM4PK660CJrtqEzcg30qiW+NZZXCOjApsaJn9v42ZFZgbI0X2jqK4FkaPUtjTRTs/t/JxHlzWq3VRXVXImcV8MbEcksf1NK/46VrJhDJPCySNqdUVL0mUWXByVb4eCa1m0MnsWdvpcqftNZsIJvE5OaBAHKn43NhSIdEWLA5aPJG2Qo7xVLU5M4JiKRrSNhBcdLr0piCBMY1KkEahN2vhUuqY1ZrYS7JJIJJ3dBp86FVIHZsa/VtBuLE3WypVAR/I81h4oL55WxgjQnp8OtCQQUfnPuBg47XjH9diGPJQD4eNWqlJQZ/y3fHIcg4tZIQ0Wt6Wj5VcDkrOTm5OSf7sjiOoBtViBCoHn4j9tMTGj6jrbxGtMkneKy3QbQLXQVLLRc8DPEoaHEI5KzaGS4d6fS8fHy6VIQPh/pIkQgeShfKnIgOfHimCt9S6g6fhTkCEyuDimUOZtciKBoTVDTggMvgciAkxDc06mguSHkx3scj2EeNEj0LOTZAfx/hQZHST8eooBihcBTagEKBIun40AdBNl0P+EoAULaFOqmgBXU7jZL0AdBt/q/fQApvW9+hoAWuosotagBWoIH1/mt1qWMWD1uosvx1pCFBRfVP4eFAC2o3qv5koKO2U+FAjyNWw1CBPLypMZxyqLa+PlSA40BV0uidTQUPruBJ1BUigDwu5B0uiWB8aBIUwlxWwKJ/kKQx0BxU+NqQmK8DYAfvoGPw48+S7Ziwvl3dI2l1/lUtpCLRxX257t5ct9jDMbXfmlWwPiNazeRGiq2aLwn/b3yuTsk5PJ2N6xsCX8VNLlZlfj+TR+C+wvbOAWvmiM7267yXfvoWNvyUlVF4/+Odv9uYnuDHjjDfS1QAadq1qtTTGuThIg+Snx86MxxhrQbgNt+KVhZp7Ho0q67nu3eSbhyfosp5/0bta0wZI0Zjmxzqi5ABzFJUuvuFegeee9tu0EkNP40AeOPG9ylUFEBI+3FamiDoNfnTgUijC1q/12oFIkRCxQqOopDO7Nw2pZdKAHG44AKi4+Y8jTgUiRF+Vw0ogqRCdNFpALa11gCCNSSNaAEvh3qWt+PhQAlsG0B3QfvoAdABId4ePhQA57Kt3NKCnApHIh6L/APmGtqCWzj2bnID8qY0e9kNAClR1P7qUBJ329puLHQa3phJ4xqSQPAAa0oHJ5zAoVdvXwogD25zirT6QLHypBA8x6XaNNAeoqiTxkQgt6dNdaQQKIDwAShW3hRCYLQhOXjngje9oJbewFceajWqOnFczTI7xdxvIe1kemIOVa5MPadXDNcnXVlKLdxXcUHIRe/HK0sAuN169qmRWUnl3xtMsfH8mHtB3a2CVumZNEszKNnm4JtVEwONyfGwK0xHPdUWBCnSgIOtkVy/utQEj28kXPiRQB7emvTqKAR3cD9SoT+2lIzwJJP8AhEpgOknqU8KAOEXFrHTzoENujunh/CgY39JsFINqUA2KcxdAn+VMAWVgUl5QfGggj8vLw4192drehBIFUqNkO9VuyEyu6+AxF93Li3DUF7VtWiw2ZhbuYq7tFW5L7v8AauCSBPve1UawL+6uivUs/MHm5fcYq7J2/oVfL++2EQ4YmDJp6TIQ2uhdSi3sjgfuc1v4Y2yqcp96O5MgH9HDFA06Fx3ECuiuHr13scOTvexyPSkFNz/uP3fl7hNyLowb/wBtGr5VqsvVqcrwexybtlayu4+SyJFysuWZxN1c4m/XVKb9jgpsh19D2cn82Nt5J8jQCHIbEkoa5L+4tEVUHpYf1THM3cjE+Sd3oF3BETw8FrzMnsMtvJ7+H0fVxLSpFzTl0hEhX49DXFbJa256+PBSi+1JAj5PbJ2FF1C9U1Ws4OhWstmOY/M5kLm+1OjxohW2tZWw1tuehj9j2MeisyzcZ3xyvHlp99xb/Sa579OjPRw+8z1f3aouOB9zY5mCLLTfoVIrzMvQstj6jqe+6+TS/wBpfOzfuPBw+a2Rr92HKQJ49R8R51z4b3615jQ9DvdPD38X2tcvDPofieVwuYwYs3AmbJBKNzXL+z5V9XgzLLWUfk/b6t+vkdLKCRSyNuRqei10HGUH7n8DLynCSSRNWWIKgHgK9PoZuGTU+c970vz9dpbnzHlTOjc6OUbXMJDmnUEdK+05JqT8fWNpx5Bt7HG4J8aJLhjEsDt+9gt0+dTBasQncDXmFounq08ErzfY/wD1M+g9G1/kopDnOAJBPWvhH5P2Svg5ByOXiSe7G/VAR4iufJjV1DPT6XdydbJyqydgznZMW8SH1WIGqnUV4uXDwex+0+p9rXt0XyfQ3/blJkOxOSa55LWyDXUWro9f/wDYz5D9z/tPoKMvahcfj4/OvoWj8qKT9wvuRH21jGDGIky3AiONRc+J8q9fpdP8rl7HzHufcf4yiv8AJmFch3vzHKSOkzsjcV+kAAX8q+lr08SUQfnj9t3XbkrtAg5Rs15BvclkKGuLN6nFfbQ9Xrfs3axP73yQy+bFl6o432u1r53sesvi1SlH2nR/YMXYiXxYyyLHu8tVUuQgSvHsuJ9Rjayfx1FuwGPXYLix6g1m7o6q9bI9kwd/DylrgxpUld1L8lfk2XSzf+LI7L4TNYDMxpVtztPnV1zJbMyydHI1rUHY3koVWJziblQV/EV6mH2eWmkyj5zt/rmHMnNIYQzlHsLWPaWk6h4PSvfwe5rbSx8T2/1TLT/63Ic3kGGPchVFGn769ldzE1Mo+Vt6rs1tx4Mi8nlnb9puP6G/xNeL3PbqulNz671n6xazVsuiIjOzZnv9xdrSFSvk8ma2Ryz9I6/Ux4a8aoGbmiVWvRwPiLfKsGpOxEfyPbvFcnGXNAjkdYEdamI2HCtuUbluzc7Bc6SFpdGLtTxqlk+TG2L4KzLFLA/bI0tF/K1bJowaaOA+JutvlTA7KUapRfDpQJgJ+pUJvQSJUuTpbrQIUGuPqH7fCgYpuO56dF/x0pNlKsk9wUzuOyhIQrRqlYX1R1YvtZpvGZsGZGHh4abEjqa8+yg9OlpRJT4GJkMuN56+XjWXKCokr3Idqtk3OZEE8bk1vXLBlbEmVjL7dzsSTdG12zpZK6a5kzltggcxp5cf0zNIQ6nxFW2mYurRP4mUxwVpF+vhUsCXxZwSHaj+FQ0NkpBkBfSB/KkZwSkebIx7XRuI6IfCiSXWSexeUbKxX2cOtVJm1A5LkNIJaVHiB50wQI8ylEVwRT106rQOStdy9sv5qJMeX2Z/6j1PkelNaAoMj5rtLmeKe4zRukb0cVJQVsmBAODmq1wQi206rVjEF6NC2aBbzpCGXEuBcBr4+VUIbbY3uOnhTZJIYsnQEeXitSy0WLj8raQFtUMtFjx8ne3YtwETRKzYEtjubJZ2ifAfKpYx0Ql24sO1w0RLUkw4nP08oB3Dc3qEvar5CdQZ8MbwVsdSNL1ZJG5fF4+RvLo/UdOlMckKqHRDclKCBYKoSbaX1oHJ0m6D9lAzyolvUbpQAtqj4rp4UCFLdE3Hp8qYzqkoVuDe9AjocqlLfmOh+FIYttrbUHxvQApvi36v50AONPx+J1qWB0KqpdNDSAUot0XTxtQAtXCzh8utACh1AVRp0oA6vhpQAk6FBYnqbUmUJutrnq40gH43FqeYTyoGOMY+VwjhY57jZGgk/spNpCJ/iuyO7OVcGY3HSBjrmV42jy1vWTyotUszQuD+wXcOdtfyM36ZpRWsHQ63NQ8j8F/hfk0ng/8At+4DCdG/OByZBqHncF/dUpWZf46rc0Tift72/wAYwCDCjbtCAoPxqvxfJXJLYsmPxuJjNDWMa1PAaitFRITuwqMRtsALWTyq4J1HhKhDR1qpFBkv315/K4jA41kLtvuTq8DqAFSvL71noj2fW4k2VPtbumPPiZ7rv7llJNcePJ4PSzYXOhaMmVmSwSMdtlH0uH1V2NycKqTfb3crmuGJnG7bAk6104c8aM482Dyi6NlZMxpjKjVf416CcnA1A6xwJH9I1PwoEO7ngW/wulOSTjnuXcbkePnQA42YH07bmgUHC6MFfzHwtQECnS6n9lAQKDmp6kIGv/SgIGnBi9NzqChKBCHagLf+FIBxqIOnjTEdMbbKVPhTAbLXF1gg87LSgchbRGGgkgO6CqIPAsAKHU0tBjb5ACS0C3SgIE793qBU/u8RQM6wucb6DQ0gOhdxsh8aYhEhWxIA1tSGjrQHM2qiXRKBsSSWg3Px6UAca4uJv0uaQxbToDodU60CY47Y+Mxy+ph/GqblEooHe329h5nHfPiIyY3CdfIivNz9Sda7nZhzxozCORh7o7SyPZDpGwNcqKQE8RXBTJbG4Z3PHTIjQ+0fuZiZLY8ad4ZktQFbE16+Hsp7nk5eu0zXOK5mPKhbcEu8NK9KtpOG1WiajcCARt8j0rQgcJBIHXqfCgDoB8aBDrQnhagZ0t/N0/wlAHvIW6A/CgDrdbWA1TpQA6CqGydD186AFDS3+BQBxxRdD/jWgBp+xvrcRtCa0CZSe7PuZwnbTHx+6JcsAgRNufgfCumuBxNtDzcvdqnxr9zMb5r7r8/zJIxJxiRa7WG6HzqHmrX+KEsObIvucL6FRyuU5rIaXz5kk266l5NZPNYpdSi+pBze66Que524kqp1qfzX+TRdTH/4oj5saZzzYkA6n+dQ81vk6K9ai8f9AOXDncQ0WW/z6WNZu7ZssK+B6DGe2PaW/wBzqvX5VPJmnBLwDz4riFkb6T+ZaJZXEHkwG7fRe30jxokaQG/HkaPUDa1vOpLQ210UbXOdqiBf30AQWdK9ry7YgVQV8OlUKQEyyyO9K7ToRpQMW2L2gur9UFOH4E7Jbi48lzvS8otlOvxqdSk52PbjGQhuTfySmIkcXmsvGKiQlPwNRfHW+6OnB3M2BzSzNy+zP3nwOHjl4jmnuixzIHwzu+lu6xBrXpdN8mqbM5vc+5Vqq+Tx5Ppviu4eP5THZPhzslicAWyMcoIN67L47UeqPNw9imVTVyiX9yHIidFKA5j7EdErNPybPVQzC/ul9uooy/mOLiGx3qlYwW/Z1r6bod2ftsfnXvvTcZzYv9UYk6F8ch8im3wr30fEcpFgkjab9fjTJgA5eNnst9xUvevP9h/9TPc9Lb/+SimTY+PfagHl08vjXwT3Z+zVen+gI7CYbhCnlUQbpnMffjy7mEj+odDWWSisoPQ6XdydbJzoz6X/AO3DkMEwckwvbHO57CInfVpqBXP0+s6ZGz2fee3p3MdH5W5unPci3jOKmy3OADWk6+AWvcxUd7QfB9nMseN3ex8ic93Lkc9zk+ZM5WlxEQPRg0r7fr0WOqR+Pd3K8+R5H5I+WQgm1zXWcKR6LKDdLGlIOhpH247Hm7nlbn57COPa4bGJd5HX4V5Xe7axLitz3vT+pfZyc3/Gv/U3N/YHbU+F+klxmBR6XAAFpr4rs0WbfQ/Yejk/xoS2RnHdP23n4SOTNwCJsRgLnA9AP3V8v2urmx6pyj9O9T7br52q3qkzPG8nAx2120BhITqEryedj7v/ABKNTCFTc9igJsaXDUItulCvf5JfSxvwho8niyNvEpNy1E1rWue68nNf1mG29Rh2LxmUAoa34V0U7t0eZm9Bgv4Bp+Cwn2hlQO6BErsp7Oy0Z4XY/U8dnNdCJm7Vla0vB3u6DU114+9S254XY/Xc+P8AjqRmRwmQ4GN0ZLh9PjXWsiezPDy9TLj3TIaTiM2EuSMjauoS1ao5BUOJll12Fg6uOgAvXRi698jhI4uz3cWCs3ZOYPFvdFvkAA1DpAp+Qr6rremoqzfU/NvYftWS1msWxC872lx3JKHRNjkOj4wnzIqc/p6v+GhfT/Z8i0yqUZxzXY2dgF02L/dhGu0Kfw1r57N1cmFxZH23V9hg7FZo/wDQqGTDLEDHIxzS3oQVWuWUegxhkDndU60SCqERYRedziviU61LsWsYVHh7W/TuTx86jkaqg+zFNkCLrUuxoqhDcM2VtqnkVxJPAkmw3NRyNXQHQCsrKTSraL9w2dBNtMjl8z41xXqdlbaFzxRhytBYGompS6+VYPQs5k8biStVzRfq6/zCUKzQSiA5DtPFyGlGDedHH+Fa1ytE2rVlan7aysEOdjn3WN1OiV00zJ7nNbB8HMd74kEjdqBCegrXkmc7ow7GyhvB/Eim0ZwSEEwMm4lQLp4CpJgNjyyAGgprceNNEupIQ5hYhJN7AEoQDTRMEnDyTAAHglvQJotOSIHd0EoD2kIfknwpigHyMeLIjLMhgfGbEPuPjTBFR5r7c8TyTS7FPsS3KC7VHS1WrFSZlzXYfMcRISYnSQ3O8DctXyKggP0j2Ese1D/qtRJSqK/RtQhLjQjp8aORfA4cQhwcyx6ijkS8YTjZLoHj3AbKvSmTEFgwMtsrQj1cDpqTUMpIseHMWoAilDdetZsqCWhkYGkEgKbjx86gAp7n7Q1pPT6dT86QDT8RjmKQN5BK+Z/nTTJaAZMGUEhuh1B/aK1VyeJTGqfT18evwrQyOqFshcLr4dKAFkrroCCtBSPedl8/3UDFq0WJ/CgDwKqnTr0/CgBxbWXTU0wOtIslraedAChZDYLoel6QCgVG4XIsLItACgSEW+o/6UgFtG0J0XSkwHAjQCBpr5UgFBACmvlQAoEKht4+dAQLAe52xqnxACm/kKJAlcDtTuLlXNbh8bK8HR5aWDyJWsrZKo0VLMvXDfYfuzkdr8tzcZh1aBuNz4msXm+DVYG9zSeC/wC3biMYh/JSOyZAV2nQeNhap5XsaLFVbmmcN9su2uKDRBhRtLbAlo/lR+NvdlTVFsxeFwsVgEULIwAPpAFaLGhO7HcjJ4/CjLppWMazUuIq1X4IdvkgM37gdu4iiOb3niw9sbv3Vqsdmc1uxWpIcV3Li8xCJMVyu8OtTdOptivW5KNlkkJVtuvS5rNNm3EcDSSFO3xqxDjZIm9U+NMmDJPv7xj8/t6HMhZvOE8SPTXZoa8vvLZnsettFoPn3j+VlwZN0biHC6f48q8qPg+ktVNF67V76x+cmlwIymRjfUqfA11a1Sk8xqtm0vBecWVkrdpvID6HeB+NUrSY3oWvg+dfjFuLlkgWDXG4Su/Bna0Z52fDOqLnBkRzMD2kFpS+q16acnnWrA+CQF/A0yIFjIB9PTp5n+VMIFMa82JU9E8KQMV7V1KJ0pwKT0jNyAOQ0QEnCxoAupS5ogci2tZZztR0oEdLGuCtW2h6LQKRsg3Ldb3RbUDk40SWQ660hjwYS0A/TVEyIlcxvQEjQr1FJlJCQpuSgHhSGek9NwfkvWgR4OQeJBoGd3dCE8KBDgkDmknX4U5FBza6RNoCeJoGOMjDfqKDyNqCZOOYH/IWpjOlrWtJJuLE/wCVADYFlGq1JRxznNIRE8CVBoA82RDbQBEHU0xQQ3OducZ3BA6HIhHudFA18jWGTBXJuaUu6vQwfuz7Z8hw2U/MwgWMadweweoDzSvIyYr42elXLW6hjHb/ANw+Q4KVuFyAOwWa86ELXTi7MGGbqzqjbe2e7sTlYmuhlDrXb1r2seZWR5F8bqXGDIY4D1Kt79K6DCAkOHW62oA6HOBBW3RPDwSgTHQ9QRf4LQMQCVTx8KQHVsSR/CmA40n1dB0oAWADfpoP86AOoGtU6gXNAmZF91PuN/wsZ4ji3B2fKEcQf9sdSfOvZ6nUSr+S/wDFHyPtvaPmuvhc3tv9D5t5HPysnIfNkyOe9xXc4kqSdb15PYzvJafB7fQ6VcNEt35YzBIXAtUF50FcTsezWkEnBHkTEMAJ/qA6Vjkyqilnf1ulkzuKVkmW8NujBe1RZCTc/GvPt7Gvg+oxfq2RqbOBP/AMmHpftPgDUf8AsEbP9Za8nHduPe1S9pF76Eimu/Uzf63b/wAho8VtcCCAlipRaf8An1D/APprJ4aEydsy5DdxkY0AKANTR/7Cgn+s5vkgMztzPjcSyUlt1AHhW9e5jZwZvQdim2pHS8dO1zhI71JdQbAV0rLRnk5ehnx/yqyOm4x5Jbu3LYmtUzjtS1dyMy+J3NJVCPzOHhTJIqLBmbL7Y236pZfKujFitdwjj7Hbx4azZk5HwjosZ2TJd+3r1+VfUdb1yx1btvB+f973zz5VTHopKtkPaJn7GlwVB5V8vl/kz9B67f41J0Nc5G7UPjWLOlCXMRxDxZL9KRTHuOc2PLDWkmyF37a9H19ozI8P3WNX61jWe1e8+Z7UlbJgTl+KSDJiOJ9t3ingfhX2WbrUyLVan5d1e7l615o/6r5PpTsjv7jO6sNsuNJsygnvY7yjmOr5Ts9W2F/Q/SPXezx9quji3wXCR7MqJ8GS0PheEcNf2VxVbT0PXtVWUNSfPf3Q7Jn4XKfynHQE4MhL5A38pJ8BX1XQ7iuuNtz8y916d4bvJRfYzNocyNxDdqO6npXspnylqMTyjWvgClGlb/KuTvL/AIWel6dx2alO/TMJcQVF7eI618Az9oo9BIjNgit/n51JumKkjgYbtV+i9KhmiJjtjls/isz9VxszsbIY4EPb1A8R4V7vqqVvZpnx/wCyZb48dbVcOTUue+6PLc5wA4vJYI8hzdssrD6XDqQOhNfQY+hXHfkfGdj3ebPi/HZf6mYBhY8kC5vXeeS3oGyglodqfKtGYoXxWKc7kMbEbrNI2P8A+o3rO9uKbNFV2aqvLPrztnAx+G4uDFgYGhjAB0sBXxHZy87ts/YOh1q4cSqvgNy+UixY3yzyCKNgUudZK4L5FVTY9rB175bKtUYT9yvvpDCybh+EImc4Fkj9RfzrwM/atl0roj9Q9J+susZMh8/ydwZ0+RJkSvUvJcWt9IU1yfiqfpdKKqhBMXOODkLyVFybBPhUPEKyQZFz7lbuXa1La69BpUPEZIRL3DI1w2y7QbnoPIULCPQ8O5pdyiT0i/UXNP8AAWq1YbF3ZkgD+6E1VelZvAQ6VjYOxu8YnOLZmtG0oX6hNafG9dmc2ToYsy1SDJ+dwshHRkDqCRb/AKV1Yu1krufLd/8AWMWRN10ZGjnsSJxZkR7Qbh4Qj8K+z9f7VU8H4X+w/quVt1baZJQ8rh5bB7UgIKekEAr8K+vweyxZPMH5H2/Qdrr6xKOyxNk+hwB89QfOvRlPY8WXVwwc4bQpkAJNlrK+OttGjfH2LUc0cFb5ntHjc4Fz4gx+vuRgAqvhXz3b9Qra49z7b137Pav25lK+SnZnYzsZznQI6JVDghKV8n2MOTC4sfo/U7eHs1mjIo8FKwloHyRK4/yHf+MSOKkaqtICWp8w4DzcAtAXp0TU0uZXEU6FouAh/GlyHA7DxuTlODYWE+egoklwix8V25nREOlVrTe38aTrJLypFpxmnF1QFou4lbVP4kR+dnsnnsbHCyZDWkFNVRLVaxEPJcCl7w4xhDRMHLqg/D8Kf4QWSw/D3RwuQCJJQXeCIKX4Q52Ovbw+ermSMJNghQrU8IK/KyFyeFmgc6THfuGu4WstaJi5Sch97a7e0hCpRf2jwpMTHo8pjHI47D4aGmSPtyWOeEd6Oh6ftpigMbyHqLSf8DrQQwhueQAQ9D0OtvlSJC4uQcjRKbWVbrVSLiGw5MTmjYUXUONMmDs8nvR7HR7hptNwVpi1Kxy/aPEckP7UYhldcILL4UzRXgoHMdl8lxzyYml8Y0TQiiTdWkiY+Om3I9mxw0tUOxtWsh8PDCZPSp8D6iiVm8kGixyL/wDjOQ1ZcckHXat6FmB4DsUvI8c8Ny2ktHztWiumYvG6k3g8rjSkAP2qAgP7qTREk23ICkBFAVt1FTAmhX6jdE5T6FRepogUD7WAtDj8D/lSAzZQhHmtdpzilP5TfoOtSI6qkdB/CgqRSgLZenxoA6DqGnVVFAzoeutz08RQJC06r4J8f5UCk6HFUVSVUnQUyhYJ2200Q0gFgNsFK+KdTQAoHTwCgnXWgBTShAFyvxJ86QEtxnb3O8q5rcHj5ZS7rtIH4m1ZvJVFKtn4Lxw/2S7y5ItfksZixuQ3BcU+VYvOvCNq4bGjcJ/264TNr+UyX5BCbmgoPHpWX5LvY1WGvlmk8J9pe1uLLPYwYyWoriL/ALanha27LSpXZFyxOAwcUhscLGAdABpV1xoTyBr/ANHjM3OcGgWCkDSrhImWyv8AMd+9r8MSMnNZ7oaC2NpBcV8qpJt6GbvVbspnI/e7Ha72uMxHyro96NFbLDZ7nPbtVWyKlyH3a7rzX+1CW48Tl/2xuI+ZrauBeTlt2bPYicjkOT5RHZmVJI432vcTY/Ct1RI47XtbckOOibB9dySgSqJRY+N5SbicluRilWqNzOh/zqbVk1pd1co1nhe4oOVx2mI/3QPU06r4VxWq67Hs4siuiVDnOsbfyrKTdIcayM6/t0pgMcjgYvJ4UmHkMa+ORpG0hRcJcVnkor14s0x3dLSj5O+5nYmV2hnyyQNd/wAZM4ugeFIY7+hx/dXhOjpaGfVYM6yV+pmvZXIy4XcOe+MbCm53gSOtdfYX/Gmc2Bf8lkb125z8XIwsaXNEw+oaXrjrY1yUgtzHNnaGSH1W2uHWuhOTjtUnOH5eXj3Nxsk/2yUa4+HSuzDmddGcebFy1RecSQZEW6NwcE/Fa9Stk9jzLVdWFIG+pouOp86ogU1zgPSNzuqU5Jg8HFCHi2t6APBrXC9yfGmgC44WBu8lOnkKqCGxMvt3DAN2gXpSY0Mk+2F1GhFIob921rEeHjSkIONe5oJuvTyFIYpkjkQ3OlORQIe+PwKr0pDEe492gTyoGKDC68hsTdosaAOta0FAKAFFpCeOqfGgDga4i9k08KBDgc5oAsD1TVKYHm7iFCp50COl7WWbqP3edEjgTvUkuv5UgQkyE2GqrbU0DGy7onx+NAzoAROpsv7aAEeolAVIOgoAVNjQZcXs5TQ+MhCT50mk1DCWjJu9/teyZs2XxLAWkFzo+jvh4V5ebquutTvw9jwzIseXuHtHO97F9xkbHeuKRVAGutYY8tqs3virdaG39j/cXC5uFsT5AzKaAJI3FP2V7WDsq2j3PFzdd1ZpeLlMmAIcttVsld5xhoc9U1JP4UxDrHAgqo8fjQApqhUT+FAC0OoH40AeB3ai/wDKgD25HC6JrQBXe9+5Wdu8LPlr/e2kRDq5ztB+Nd/S6/5siXg8f23eXU67v5PkrnuSmysqXIyXl+RM7c956k3Nex7i6x460roj4n9VxPP2L5b6v5IOaRrrEI3z1t4V8dMn6rxjYI43G/US7WBWm5J8Vrkz5q4667ntet9bk7V0ktC148bMZm1uptolfL589slj9l6HrcfWoq1R2TLkY0uOnQVzo9N40z0WbJI8COJ8kpsjQt/ApWxwZKVrq3oWTA4LuTO2uZgvDXC+4ECt64MltkeNl9h1se9kSR7C7hmUOwiG+JUhKt9PL/4nL/7vrL+4Hm+33dEDx7OK5zehubn+dZvp5l/adNPe9Rr+Qy3sLvCVxBw06BRTr1M0/wAR3951Ev5D7ftN3FkN/uxsjupXpXTXo9j4POv+w9PzqSWD9iXvaDyU7W+Oy37q78HUzr+TPnO/7jp5VFaag3cP2Ixv07pOMeXSsFg66+SV9H1aUT+8/NfZflum8OhjHO9rz8ByDYM3HdFI0oHOu0oenSvs8FcULhB+T9q/ZVms0yM8pjh2EjVAIAP7637GmNnH0HOeq+pn+Rhyse92ilQg6V+e3/kz9zxfwRzH2sXf+NZs2Qp8bMgEbQCPHotCGxMMUcWREAxSqAm2tdPXfHIv6nB3qc8F19C7QQMlx2W2qBfrX6JXVSfiV7NWZI8HyGf27yUfI8dMWTMTc38r29WkVlkw1uoZrh7N8VlemjR9Vdh918f3VxjMqB23JaA3Igcbsf1Br4/t9a2G22h+per9jTtUn+7yiw8pg4mbivxsuMPhlaWuBFvjXHWzq9D1cmOuSvGy0Pmn7g/bzK7ZzJM/j4jJxjyXekLsWvqun3VkUPc/NPbeot17cq61M15LILca79pVT1S1dXcf/EzzvV0ns1grUGbHuLS4G9vBa+CZ+yVroHRPaW7rEDVD0qSxmaWNq7QN2iEr50QNMN4YkvcXfUXNr3fTv/kZ8d+zr/gX9SyOjY4X6iyaV9g0fl6YNNjgN3N6XqWjWtxbGudCDoNAtNPQlvUl+1Gsx+5ONnyiGQ++1S6wWubs/wD1P+h3dJ8s9F9UfSHPd28P27gNmmmDpA0FsYIJPkK/Ne13qY21uz+ivW+kzdmNIR81/cP7oc93DLJjYj3Y+DcBrQQ8g/DSvBtltmc22P1r1Xo8PV1erMpeou8FTe+pq0j6xjXqAJqjM40qvU0MSPPkkAJBNunTzqkZWlagbsiSR/8Aq0tpWnGDgeVu0BscbQAXWsvxNZs9CigUHtZ+alBbskeOWQCARbrRxI/NGxxuRIU3PJ8L9KTqi1kncXkZp/T+2HFz09P/AFrTE3VnzvvunTPgb/uRF4vJPje4qkjLKOlexV+T8UyUUtWJfH7vyISGyO9waKa9DF382PZnh9r0vVzb1RIN7ylG0ueVGmh1r1Ke6t5R83f9Sxt/bY7J3e6baCC4nzRvzrPL7m9tkdHX/VsNP5ORqPls3KmbFixOkJ/Kxu5F8Urxs/Ztl/kfTdXo4+uvsRfIvtjzU+OMmZrY2loc+xIBIVF8a8rLRpSezhtycFX5zt3N4SRzJcYk6biLVzyzpdWvBWpInTn1ja1UQC3letEtTG2ha+C7W4qWNs8kjS9AdpO4qa24nDfKy043Dcfhn+xGHkX3m4+QNUkYWu2RvcXIf8Zhvyfb9wgK4iwH4U0SjIOV78zcmSSOIFgJ0aEH41sqlciszcpnzkudIQFNh51cA2wYySnV5vbWgQRE+QJte4XUFUNBSZP8TlTukAbK4O1uahoaNA4vH5aWFY1kZqgK9PCsWhySsPvRkMysZ3mdpHzNQUxjM4zHyg8x+h6Wv1pyJMq+c7L4yVzZAdg/N41aGJx+aaVDjqVIOq0QDJCHOa9yNcWgjpRAoJOPKOwNXW9/HwqQCIMh7QVJBJQ9f20hNB8HIyRvDJXbgCnklHIh0CzlxPcHg/TdPjVyZupyZzclip16hfjagaILO4rEnO32w1xv5Xv0oiTSuRoDbhQYzwxx9KKBoLeNc98bO6mdTqSsEMcrFbt26hLBP41yWTR3VsrbHpsDDlBY5gJOhFhUSxwivZ/acUpMmMsJ13aNtXTTPBlfAmQEruV4h21yzRtsdt0rprerOO2K1SWwOcx8hjY5R7UgujtKqDHYno5w9jdrgWgW2nUVLQJGbj4L18L12HKKB6rb99EAdaTZCh/ZQAoFPkbJ8akoUCHFShUXA60yWzwJDwCL6jypCHbBSLrrQB0EB21xUpYHRaZSDsLieW5E7OPwpp3EoNrCn41DvVDSnYu3B/ZzvXmHNLsUYsNlfJc/gKxfYr4NlhszR+D/AO3OJWnmM18lxuZGNo/ZWLzWZqsC8s0rg/sz2jxCFmC18jb+5IAXH8VrOLPdmirReC8Yvb/E4YaIYI2bRYNaOlPgVzfgk44oWtRAgGuiA1aSJbbA87nuG4qMuzcyKBoFy54Fqr+iM3ZLdlM5f719p8cHDCkdnSqgEIVqjotarHZmFs9VtqUXlfvpz+RIW8Xix47FTdIdzvwrVYPk57dl+NCk8x3p3DyMm/kOTk9t35WnY0E9La1ssdUYPJZkDPlRZREwlL8ixLirlPz/AHVokZv6h2Pke4wl5Bc1Lf46VRMElBK97wGgJRBLJSKZrCIy4FRbzFUZwSEch9JN+gW9AIm8CcSDaSvgD40FI7ld88D2a/8AVZ/KR4j23dG54UjwSs7R5NsfJPQvv26+7Xa/3JOTH2/ke9JgoJy5RchbAgfjXnZIVoPZw25KfJoG5vQr8ak1Hw8ogt5aXFVIQVzvPj+I5XiMjH5MRujcwtIfof5X0NcnZrV113OvrWtVnw3y2I3t7vaSOJ5OFK5zWL0aSgBrnqueM9VW45Uyc47m5eMzdzX7QCmtcfDQ9GzTNl7X7pxeSia15/vho1PU9aStDOe+IucGVFLGmQxSnpOprqrdPc4rVaJjjeVn4h7TKrsJxCJ0Xxrox5bY39DkyYlcv2Ll4+XA2eJwLXBT1r1q2VlKPJtV1Yt7i02Pp61RAyHFx0UC58KCh+IsDlIsNaESxT3ukBDT6f3gUwE7QUc5T0F7fGlASIcWhxDNBr8TSYI5uCBB6gdPKgZ31hougJ0+PhTgBwhuxW69POgQw8BVI9RuR8aRQoIxf6ulAzwJsOp1T+FAHd7gSp6J8UoA57huNAdPjQA/EGhqrr1pohjUse12oN1FBSEue8NAbouq0AN+to3uCnSkM8TI8hAqn/BoHoOxxICXa2PwoEecWka/I0Ae2ghR16mgDoDWKQLfsoAa3oS55AWw/jSkZxsurQhb1BvbSiQgrPdXYfF9yQOLG+3kgK0t1WubL1q31W5rjzOpgPPdqcz2dyH6mFronsKtnAO1wB6ivLatjeu56U1yo0jsP7kw57GYee8RZjbEHqgr1+t2ZUM8nsdZ11RruDykeS0eoL0S2tenM7HnPQk4pSSENjp8qoQ80qu350AL+kIq2udaAIPuTurie2cX38+ZocP9uEfW/wCArz+z3KYFq9T2vW+pzdy/Gi0+Sr9ufdbhuWnOPnj9DK5yROeVa4dFPQ15/W9tW7i+h9D7D9UzYK8qffC1KT92+ei5XPxeKxZg6GFZZg1ygu/LX6Z6bEuPM/nT9x7Nlkrh+NWYvzsIdKgsA5fTqbVw+/f3I9L9LU47AETY3uDFLnk/SOlfJ2tCk/TsWN3skvLJ/HacciNrA0kbiB0FfKdrN+S5+4+m9dTrYKtbsME8rGBoG5/nXDMHvKklz7Q+3vJd0PGTOTBxzU3OIQEa2Fd3U6d8z+EfL+397i6SaX3WNh4vs3gOBja3GxmvlbrI8BzifGvqsPSx40fkvd9z2Ow3LgmWu2JtbsAuAPA12pHiWvZvVhEeQ4EbtB8qcE8guPIiJG5PCk0Ej3uQvBUhUsDQPkNvbE+zUB6fzoAZfG1LFfj405EMuDYxp6lW/SnJLKx3N2pwnc+M+HNgaZCPRIBdeldODPbG5R53c6GLs0i6Pmf7idtZ3a8r4HxF2GqskGo8K97N3q3wP5PhOt6a/X7i81TM09EsW2QWPjqK+Qb1P1KtYQFk48al0B3FdOlQaSAzSyRANc3bcKV60yj0eUFY8u3IdE86urhyYZaq1Gi+4DhNhtcCia1+j9e3LGn9D8M7lOGay+o7tQJqda3OWS19i90z9sc1j5TCRiykR5LOhaTr8RXJ28Ky42ju9f3LdXOrrbz/AEPqJuaMqBs7EcHNDgddb18NevFwfs2PJzrKI7NhgzseTHyow6J7SHNN9aVburlBfHW9XW2zPmn7q/a7K4qKXkuMLnceSSGC4bu+Fetfu/kwtM+Wweo/B2VemtTD4YDCSCfUCVHwr50+3WwfjZG3cCEAPqpSVBwyAlWmwU/FaqSGiY4bb7zlSyFoXzvXs+pf/KfJ/stZ6xb2RhyEWbqCa+1g/JWwbk8iGKJN6u0RvjWeTJWq1Z0dfBfJbRAJ5ARYo/Klwt3E9bV5eb2ePGtNz6Lregz5rS/tQl/MMLA+Ir/qP1BP3JXzvZ9nky6LRH3Pr/QYeu1bewdj8+/kAI+Rmc+RLPkKkpYIa+N7nVbfNH7j+ve5pxWK+jR6bj8WdztpVU3E9Fry1ZrQ/QavytiLzOBx3egNVzQi9befStK5WjdWK/kcRJC5wF2g6nQD+NdKySaVsmRz8Z8by7adqoCnWtZQtE5Lr2T9s+b7syA72nw8cT6pSE3DyXpTorXcVR8/7X3GHq0amWWfu37C5fC4j+R4tzshsTVfG0K4J1TwrpyYb0XyfMet/Ysd8kX0MUyX5EWS/HlGySMlpabaVCSaPsv8nntsDb3kldRTgjkx1pVqu+dSb11Rx70cjdPOnBHNo5Ir0Uon4UIyz/dRz8ELkuSRwBT/AEivTpsfifcUZbJfIx7hCKbjW+nwqziHRO9xAado/nrQVuatwX23i7j7ZZyXD5K8gwLLjvI3P8SB0CUJSTa0Fv7Ck7V/T5HATtZh9zRNe18Mg2l4AQuDz1oTXnczbb2HJfvBzXbwm4Pk4G5EcX9vGyWEBxaNLGxI8a4s977I+w9L6tZlytoVjO7/AMjuLKZjtxjM559DXDdK4/urz7cvJ9ff1mGtfuJ3P+1XdXLcI3OxMdrJC3f7CeoDz6V09et3q0fn/slio4ozKM2LuPtnNONnQy40rXW3KG289K7oPA0ZPcV37KxgjzVdZCVv5UuInUssHJ4XJYxjJZMx/wD6br6iogl6FP7g7Dws0ukwx7UjlIall8K0VoGoM85LtrkeNeWyRktadUW1aK0j4MjPYcLG10Q0+QcBxkDlQLp+Hwo5D4ElgSmF7XEFBY+NS2HBmq9kcu0vYHOCEhpX/FzWVmhOrNpii43JxYXSRNLnkAkBdwT+NTBmmypd69sN4f2s/ET2Zbub1B/nUmqepSMpkWXE6OeMuadCboT1pyXBU8/ttyulwlOpI0NDyRobrHyUoit+Xx8u2YO9P5q0VkzK1GmS+JyjXhqusLJUwKCegnajVQWKA/hUwJoLZOC5ERbBeiCpCBwvYSSFQ9QSKCYH4ZJQxGD1DQj91VyJ4CRltax29nr0JNqtOTNqCPzCHI5wHiCqqPOrSEgJ82SwB8Li0Dz0FS6pm1LuuwVic81rds7PULbjqnjXLk6/wd2PteGTuFEOSj3+6DEdQf2WrjtV1O6t1ZaEqzgeN2rI0PcbXAACVnyYm5ITluyuPywXQx7Hp9TBtHxWtq5mjO2NWKdmcHznDEyYr3SwjUG1umtddMtWclsDWxVVPy8B4nwr0DzRW4AaW6DoKAFN6hqX6/CgDpIA2k6afGkOQrDws7Pd7eFiy5DzYe2wu/aBSdkt2EF24T7Qd78wGkYf6VhvvnsfwrC2eqNq4Ls0Thf+3GV5Y/l+Qc4lCYoBt086xfYs9karrryzSeB+x3Z3GFrv0Pvyt/PN6r/Os272NFWtS+YPa3GYTQIMWKJjbehgFqSoXz+CWjxoYT6QNo8rVUJCbbHQ+JgO2/RBaiRQzxnf4Iel6JHA06QuJYCCdfxqZKSPmXvn7r90ZfcnL9v8bmfoWcVMYHRMs94ABVSfwrvwYq2rLPLzZLJtGfHOz+TeX5eVJkOJVxle52vxKV2pJbHI3O4ZE+LGc1oXr6gFuKTEFjJAJc8g7ug/aDSQAWZIzJ2NVVFrWSqQCWDEYArjv8B1A8KBBsGQrmBt5PLqv8f30AFt5LHxlkmyWwxj6tzgPwFMl1bGmd/9rfq48UZm/Ic4NbtFiSfFaJQuDL5j5EYDAbF/zpmUBXN5buJ7f5HloiN+PA+SNejgKm2xVFqfF+dm8jzWVJl580mTkyuLnOeS7XwFZnekaX9k+6Oa7B7pHLYkL5sOdoiy4G67Ojh0UVjlx8tVuaY8n43J999tdz4PcPGQcjhODhI0EtXqa4nK3PSpZW1RKS5EwafAi3jaodmaJIoHdMuZmtkh3ENIIT415+Vts7cbSPn3vHtHdN+rcf7sbi74jwpY7xodLcwyiZhdHJ6ihGrj4H+NbKpv+QN4nuDI42ZroZC1rStv41hfFJ1VyJrU1TjPunxeJgiXmZhGwEM3nUnyrGtbNmeXhVS3CNPx+4MXL42CWD+5jyN3B3RDXRz0hnG8eshPEdyz8RIA9xfhOKgakCtcXYdN9jHL1+RpPFcri8nCyWN7XWuAa9jHkV1oeRkxujJPa0o5tgQNPKtDAS5p32+ki660BI4B0BQmy+dMQkOIKaroetA4OlrXCwQ/GkJCB7WliSpN0/bQUKMrQrm9EsaJA6CJGtJs0a0ANvaVG0aqf+tAxADibhEF6QHlPhcaUDFEgodSbfsoA8A1SpuRYGgBRkawC2mpFMQ1K9ziB1dYJ0SkNCrgK4W6pQB0kFpAuOlAChYC6oL/ADoA6HIlrdKAE/Ea9PKgDrn7RoE8f50DEOLnj0hGr80oYDcntRXneGgG62FS4HqDjk+NaS2FweRb0j+NTzqOGEQzRTFYyh87VSaYmhjlOLwOZxn4mfE2UEbdxHjSvRXUMK2ddjAu+vtRy3AzHl+3i6WFqna1dwutk6V5WTBbG5WqPQpnV1Fh7sH7kye43iuWJjyWnaN6i4rr63Z8M4+z1o1RuXF8q2eNpa/6uq17Cco8tqGWCGdpAIOnXrVElW757/43tHC/uOEvIzAjHgBW/i6vJ7veWFQv5H1fo/RX79pelFuz565Hm8vuPkX8hyUxmlcbN1a0Ho3wr47Jd3tL3P27rdLH1aKmNQIfIIY3OaDtaFU9Kvr15XSMO/l/Fhtb6EM3Lmll3klzjoXm3khr9G6XeydaEtj+Y/c+pw+wta11D+R3MjZMGvIBf/lXT7DvLsw0tjg9L6h9CazMguNiwMyGEkFwugsn8q+e7Noxs+/9PjV+1VBeXK8uJYP/ADIn4V8fMs/f8VEkjvEzRtzYv1bkgY4OlGrtrenxr0+l0L9nIqo+Z9977r+u69r2eqRqWb93svAxGYfAcfHBDG3aHylSiahra/Wur6GmOqTZ/H3tP3fL2MreOvndlSm+8Pd7JvcLoCP/ALPYU/Fa7X6rEjx1+x9x+V/sS/EffTPhIZzOB7jFvLATYHrtdXHk9Qn/ABZ6fX/aLr/7Kz/Q1Tt3vjgO5Ig7j8lpl/NE70vavi3WvEz9S+J6o+v6XtMHaX2NT8eSxua53qabJqK43seseJf0O7zpIDxlmAGqnr0ogQn9VIjtqKulIcjYzZBZzdKAPe4HXChfzGgEZz95Bjt7TyZJYmvyACIiRcFOlc3ZzPHVfU9Lo9Jdm8RqfIcmUrHMIDSCSD1+dJMi9OLhgceSWE3F7/KqM2h6QY87PWBu1UUyQKWFkYBahF0J6UwZbeDlc/G2qRYFD1tX3Xrb8sKPx/3uHh2n9SRbI5pS9enJ4LQ+6ZGKLEX00NMy4n1p2a58/bnHyyAh7oIy7x+kLXwvcX/I4+T9m9W3brUn4Jr2ASpb6RqU1riR6kFZ+4GAZu1eQbE0IYz0ri7dnXE2j2PVY63z1TR8T53b0zJZHwm7XHewf515mDuJ6WPtPZ/rVlXni/2IySGWEmPajgB53r1atPVHwmTFfG4soFNY8Rk6kG9OTKA3imSRzGRwO0hFHQ129XP+G/I8r2PS/wAnE6SWB/MCNtweqFx/hXo5vb3t/HQ8DqfrOGjm+pCz5uRnTI4Exh3igryb573erPpcXSxY19tUHF8EwbG4o1NQFumh61hZydlawdjx4rsjBIS511qWiwLLxXtAQkO8qILVo1QvE5bKxCI8jdK0FNw+q2lefn6lbbH2Xqv2O+CK5Pur8lj4aPL56ZkOCx02RJo1otbqa8e+C1dIZ+jY/a9a+PnyUGpcD9iuYz4my8jM2CIhQz8yE+ddOLo5r/Q+b7f7Vhx6U1ND4T7Gdq8aWTzwDJyNQ6RHAEfGvRx+tS/k5Pk+3+0djLpXRF6x+38bj4hFhwsijAs1oAtXp0xVooR8nl7F8rmzGMjiZJBpqEQ3t4GqdZMVZpyjJe/vsLxXcgky+Na3C5EqSQPQSb152bqOZqfYeq/Yb9d8b6o+ce5vtrz/AGnkvi5LGcIwUbIArSteZbI6vjZQz9R6Xcw9mqtVlWlxJY1DmEDTy+VWrJnpWpAJJA5lyEd0FaJnNbHAxLKA1XBAOtaVR5Xe7P4sbbISVXyPcvqcbeYr0KqEfjme3O7Yn2nveGAK4mwAUk1Rzlv7d+2/Mc6725R+ilcN8LJW7d3xpSEmrZPHv47gcV3Fzf8AE9xcajJ3EIJWs1CdaH8eSH9zM17z7pZy+dDNHAMfl2WmmiRu4jqSKG4R0YcbvZJEJFDyXNZTI4i/JynJcqQB4ldBXnWak/U+tjXWwLlofRn2t+2uHwsEfK8u0S5jkPqANvAeAFaYsHJzY+S9r7q1/tqzZcXlI2x+w0pGPS1otavSraD4q1nZyyE7o7S4Hu7AkxuQxmGVwIZIAA6/VaVqpiVoPmHv77R8z2oX5eC12XxtyXNCloHjWDTR0VvJn+Lm5GPK0wvcxzLFpsfmKRcJlt47vBw2xZbdzNC+oaIdSyxM4zlolBa9rgVYU3X8BSJlorXNdiY0xMmGAx4vtI6+VEl1sivs7SmjcGyfV4nrUWtB1Y0mTGL2c0AFybyFIuf+lczzHWsKJnE7cMAXGcWOtYafH/pWbzMv8KZcu3uaycH/ANnn3iahjf8ADp5Gt6XbPMzYlVj3cHOuz4xA5ytVblf31sjmKzkzQMabjaBciqgepE8Zl4uTlyxMcCQ7438hWOZM7+sSc/BQZcZbIwOciAmwQ+FciyNHW0mVzP7NfAr8R5tq0eOutdNM/wAmNsC8EVFJmYLtmTG7a3Q61urJ7HI6WRJw5TXPDw65RfImmTBKRzAsRQ5elTsKCQxXPawusQ7qNKhgL2gMJcm42/60JhAHkYDpQHqh0AugHyrRZIM+EkY/HljPtOJDSLOrTmmQ0yGyJYcVd5R3Uf8AWtEIi5O7puPkD8OUhw0W4/Ck6K25dbuuxrXb3JzchxmPlzAb3sBIPqcSn7K8fJWLHsUs3WSRdnuuACugBG5/4Vg0aIj8t8Uwc14Uk2JuU/gKaktIxrHxcnMeGYsEk7zYNjaXFfkK+hbS3PnEmy3cN9q++eXQw8a+CMgf3Mj0BD5G9Y2zVRrXDZmh8F/2450zmu5jk2sabmOAFfxNc77XwbrrfLNO4H7Ddn8aGOkwHZcwP+7kFQflWbvexapRGh8X2dxvHtEeHiRY7GgJ7bACn4VP429yuaWyJpvGQQAlyVfBE82x33MaIBdB061QobGX5h3ERgAagmpdi+JEZs+eTbJ2tBu0aIaytJpWozjzZrnHc7+2NHGs02aQgp2ayFNz18fj1q3dIXGTh5X3CPaaSdLUuYuI4MnKeha3aBqqU02EI+N/vtxuX299y8rkoVAz448gG4aToQfwrv61/tPPz49SK4XlMbPjMzSGTtJ96PRCmoFejVyedajRLOzYQkcb91ipCG/SiCQaSVxIIcShuR1ogZ2N7nv9JuAmv7EpokIia4uG5iILjwd0vTAoXcnPd3QZEkceO7GxWuLWva25A6+NQ5NEkUrIzORzZHHJnkdI4+oOJF/MVEmkEj27xk+TzWC3aSHTMXUINyk0SDrofVGDC9zmrdrbNC6JatTga1F/cPMjx/tzzrypcIPbafN5SlbY0x7nzz2dwMOUkk4UOQDyFQjqu4Nb4niuOwGBkAAkI9BTX/Kr2OZ2Lr2v3Nm9p8kx+OrsVwWbHWx8S3zrG+NWLxZXRm/8X3FxvPcczLwngh1ywn1A/CuC9YPYx5FfYrfMzMErw51rp8687Id1Gyic5hRZULjtHW5/bXPB0JmNd0cH7Uj5Y2ldSB5V147FTBSJC6NxWxbYDzrV1N6ZATLycORrGciHOx2uBCHROtOiaegZrVdIttJuPYHd0Ijj4uchuNsHsuWyJauDJjacnTWyehpEUe6TcCHY/Ui4+VZICX4zOyOKmZNgndCbyRgr11rpx3dXKOXLjVlqapw/M43KYrJY3+rQtNite1iyq6lHiZMbqyUDvUQ1F0rYwg9u+RREoCDpahGgaNSetASNq99g1Bp5UgEhh0a00QVIv2y4KilEoFJ4NLUUoBqlIcnSdo8CdfFKBCXShHAoevnQOBsNU3sOgoGeeUaLhKAEhB116dVoAS+Q9BYdaBimEuFyp6H40AdcbtW4Tx/bQI8HEB3TqCKBi27g0Hx0XWgQ3lZMWHA7JyHhsQ69V8hSbhDSkr8nK83lvTAwxFEbtlyVaSD12NBP41i7WexqkkSGFBn5BImymtkF3AMIH4mqrVsltIkIPdjmED3CQ6jataIh7AuXgQyTOmzElDR/bhJRoPiR1pNFIkMP22YokMMcTV9LUACVSgl6gDXHN5Fv6RqRR3llAsPKo3ZUwiUkay4Gg1QVoZiXMYWmN7fcY4JtcFBpDMl+4H2hweY38twf/teVj9bdtg4i+grhy9bzQ6seXwyq9pd68jwmV/8AH+5WGDKjRrHuCB19QaeDsQ4ZGbBOtTT+V72xOD4HI5U/3PbZuaxt1JFhXb2Ox+PG2h+v6T7GZUeknypy3fOb3Hy8/IZkhdkzPQMdo1q2AB0r5S+N2+57n9Feu6lOviVKfBK4Oe1jQ2M+sj1XVF1ritU67VDszObHhPG+5sXjQg12dCs5D5L9jcdWxFYuZEgc5wGlgf4V9Wfh7+R1+cZZEjcdo1FMnQdgkLJ2km7vym5Fc+evLG0ev6nKsXZrZknmzhkXsxOBkPqLugrxup0G7crbH3/uv2SuKvDE9SLwg0zPvuOpPjX3HplWudI/A/23Nlz9S1m5ZMzlrgvXzr9HZ+DVIt8bCfpUrrWUI6k2N+xvJsAPLSlBXKBeN7+DkR5OHK6DJjO5kzChBqLUVlD1NKZrUfKrho3z7a/cT/n2t4jli2PlImqos2Vo/M3zHUV8p3+g8T5LY/TfR+7XY/48n81/1NLeWt9SIK8M+yGJJCQoG34daBAT2kOtddDUjFNLgPBPhRADgLSVIueulMDPvvG0HtotCtBdqAv415Hs39q/qfX/AKypz/6HylyHHASuKB264DbL0rbC26o4PaKq7FoIDIxnxEjYNyoo0rc8uQH2JmHc5+1vQXpk7i2ZD5AY9SPzHRT0poIJ7hWzxHaCpVBfofL419N6fLvQ+C/Z+voshPiV8Y/uCvp5Pz+J2JDhMV3Ncli4MYUzStYmtluvyqcl4q2VTC73VFvZn2PxGO3B46DGa0BsbGtHyFfA5b8rtn7T16fjxqq8IPQFCtjr86yOor3fD9vbGe5qoIzdNa4O8/8AhZ7XplPZr/U+Syz3XP2gEkuIXzNfIz5P3yi+1IHyOEhma3ewNe7wPT/KurF2rUZ4/f8AT4O0tVFiJyOEdE4hjVaB01Fezh7lbn5z7D9dzYNafcgCYewdrbDRD+2u5Odj5W1HVw0BHHnc4q6zT9NMhyFwxsiZvBTciFaGxwI9iISNkLiXO+Iv40yJJXGbJC7+1drtQnjpVcWyHZV1YTBizOmLpowB4am9duDoZcuyg8ft+66/XWr1DP8AiMeZyyRH/wAxQfsr3sPpUv5s+P7X7bZ6Y0TPCyP4PJbl8dL7E7f6R6SnQivUr67AlHE+ct+wd12lXa+hrHb/AN6Z8UMi5jF3tFnSwlT8dprhzeoT1qz2+p+13Wmas/VGh8X9zu2OUaBHltjkI+iX0Ffga8jJ67LTwfU9f3/Vy7Wh/Us8HN8bkMBhyGPadEIIrjeC63R69O1ivtZBAysUj62pr0NZ8Gbq9X5PGTFJUPbelxY+SInnsHt7k8CXH5ZsUkO13qclrar5Vy9jFS1fuR6nQ7GXFeaM+RO6e3+Dh5PLixJWvx2yFHMRE8BXyvC6cLU/a+t7LH+Kru4ZUMnhMRm5zBvBHiuvWt6VyNhm9116rVoBZ2FyfM48k3GQAsbYgn1EfCvVxUa3Pzn23uFn0rse4/7N905mVHFNjDFiefU9/qRfIV16vwfKu6RoXF/ZHi+La3H5mQM5Ukvxsouc0OPQJoKtV+TB3kVzHN4mLiTdu9xMGPmYQD8HPxnFrXJoSdSVqX8MpJsyruru/ku4BFjyf3JovQMlqhzmiwQClsjoVdSR7N+z/c3c72zugfBjPKulkHqcNbLXJe1ruKnvdL8XXXO71+D6J7S+zvH9uwtc2L3JQPqKm/mtbY+tGrODve4vncLYuTe1c5wRtlunl5V1cDweTYh/bnIxJcBo8elLgxSFRcfOAA4qW626mq4sSYxNxr3MfHlMbJA7VjhuG34VLRSZ8+/eP7WYOPG7n+AZ7cg9WRAuvwFY2UM3o5MAM5ErmFWuFnNdakbElg8nNiSB8Ty06oLqlS0Jot3G92AtDctoLfEaVMEupYmS4mdH72O4FRdp1+VS0RLQ0yR7SWk3GlvH/pWNsSZ04+w0H48wcLE7v9WtSsKRV+zZ7AeZO3bte4J49ErorWDkdmyvcp3Pg4MJJl9yUBAiW+NWqCjyZ5zHeGVlPcISWtda37bVqqg7QI7d5ifCn94vUvNzUZayb4bwa1wfckWQxoKIQl7lK8u+OD0aOSzwyxZTdAR1CaisGbQCchxWNkQuje0OCWUgFaFkaL4SUbl+AOM4nDd6lVoXqPOuqmf5Oe/X+AHEzMmD0zxuB03JaupWTOV43XctWDlRysDWv8+h+QFQ0YtBabkBPqcdxOpTSkIfe9vpDfpQWHh86QJAeX7cUEj5EPQgHomlNbhBj3cOTI7PkawkMBKN6Cu2uxjbRkMAd7WJcuQDrerJSNn4nkH4vGY0BBY1jAoCiyeIrxclk7M+gx4rcFoPydz4kEfrejhY9FB/bSiSvxx5IbL71xGnbGwuTyrRYmQ7VR9h8T2TxfFtDMDj4MYDpGwA/ilPjZnBySJ5vHYsbN2S4NAuC4oLeNNVQubexxvLcHhk+3NG8t+oM9RH4U+SQcbMFyu9+JhafbQeBfYUPKilhZX+R+4sLV2ZjAT9LIxUPIzVYkQUv3Oyg0hjGygH6i7WlNjT8VRDPuVnODpDCxG63svlRLF+NA+X33zT4RNFjEsNw5uiGs3Zmioix8TJyXIY0OW9hWUA9bL1rHVsduKJr9HmbNu4ySHRo/ilaqrMZQVi8C5xE2a4ucPpZ5VSxTuS7/BLMwY2BGtDE0tetuCMuTOmBocifPqvwogcnzt/3R8IHQ8PzLR6dzseWQf6go/dW+JxYxynzPjyy4GU2aL/AHBqFs4LYGu5M47VTFcl3lNDkObiY4jcQC5xv6kvateWhzuqRCyd1c3I4uOQWg9G2pyAbhd38lik+7/eU3XX50SESW/ivuBxkgbFmtdE8nUePzp8iXQtmHy3E8kNkeVFO12kT0svk6rkydbIJf2twOU3dNiRjcU3MAutJpBzaHuO7J4nB5GHkcaba2E7jCVJ/bWSpqW8rag0HFYFD4/pcgQJrWhzJlX+7kskf2+zWojZZ4WG6C7tKm2xtj3Kh2COMg46F07d0rSSWi6jwoQ8qZfG5uDsfGzGDC76XdUqzngbGRLOGBNszLBNS3zpDSJfgO4cjiJxmRSbLj3sbo4dayvRWNseR0ZobeYxO4YxJiSt94BXxL6gSL142fE0e7gzKyI6eB7QkhIGiVxQdslV57jIZo3ENDgFKjxHxppmiZjvcPDZEUz5I2FCbpXZSyZD0KRyjSI3q1XgWB8R4V00Wor35UgsvbvJPlw4R/syMHpcFWxtWGbHDlG+DIr142Nl7I76a8N4jlCGyaMldpXFkx6SdVbQ4Zp8D2YzPfiO4OClvQr1FYVcGllLD+Pz5sKZuVhuIa4rJEDr8q3pd1co5r41bQ0nhuZg5CFjg8B5CEE3r2cWVXR4+XE6smAWkAXNtK3OeBPuX2oi2IokIHRIPb3gBFQUxChf1Eql08KBCJJAAQqOApAkMF63KqfpIpFiHOJXaTbr0oA4qXJG7olAxkvmkO1U6D+VLUoWQQ0OK26J5UxDZduIKkqOnj/CpbGjxeBYFSOp1oAWDIBrr0+HhTQHiVKddf20pA9uAdtFx1NEjgW5zniy+I6JTkUDUsEU7ohN6jG4P2u+lRSiQ2CXOO17UT3D6yLH8aokbZFK4GPGVpcbk+o386SG2NN9zFfJFG4PyE9criu0H/GlADD5RA/T3ZdN8p0+DRUyhwekhyMgB2TI90R/9MAsb+I1oiStAuOeWCERxsaMdoQNZTmCYkLZIHM9xn0u0FUmKIHWuAaSdP6ut6ZJEcjlsheUN/41le0GtFJRe9OzeP7twX5FoeQiBdDOwI5R51y5KclKOml3VwzF+L77j4vIl7e7lIyMWN5gLnddpSsceSVxtsdCpaluVB7m/tdgczA/lu1p2uc8bzG1Fvepy9ZxNNV8H2vqv2e2N8MpQpY8zt6YR8nGY3N9IPiR5V5d6Tp5P0rr93FnqnV7jsueMvCdIpDWjTQfhWnUXDIjxP2PE7dS0EXHyTGsDG3PW96+nPwdomsDMYi+2dxFiNKTJCosmWQgiEh66k6UhTroPSPncrXuBN7C4Twpk2bbkaTIi2kORpvqhrow5HjsrLwzj7WFZ8bpbaxNYs7ciMR7w5wHxt/lX6V1ezXNRNH4F7Ho36mZ1sv6C5Mfb8D4V1HnqxxkOp0XWlA3YS+MAKdR0FA0xfHZ02DymHlY25uRDKws2i93AJ86wzVTo0zr697Y71tXdM+tMKX38GGd4IcWA7fBa/Pciizg/ecN3eib+h1yFT4CszQZdtJsF8F8aAEFXW6D6aAFfQQqBBc60DMh++fdnF4nBHjQ8Py3uGxgN/MoNK5u31neqfiT0PW+zrgyNVesHzWeTZIXPkGut6hKBZbvJbk9zjnslYXtII/pPSqMoAsuCKR217dpN1HVKGIjpMeFhOwEuFyn7xQVJ3BzJsfIDnHYHW3dC0/yrp62Z4rpo8/2HUXYw2qy2xSOyGAvuepr7+l1ZSj8Xy4/xWdfg2r7M9iynJb3FnMLYx/+qtcEtoXfyrx/Y9pKvBH1PofXWyXWa60Wxvoc1pAP0gIlfNM/QzoeCSHHaALfGpgpMA5zEg5XjJ+Pe/Y2ZpaH+BPjWGbF+SjqdvUz/gyK/wAHyv3n2zyPZecf1IH6QlY5RoQTXy2Tp5K24tH7V0fe9fNil2hoqv8A8ywI5HW3ED/F63x+ub3PJ7v7Pio4x6s6zu7Be71MBDvxrqfr6RpufP0/ac3KbKahZi4blHNfG8BzguzRCa5HbNg/ofQ0r0PaLSFYj8/h5C4NxnB7ehGpI6GuvF3qvc8DufrGTHLx6oFk7a51sImOBKYAbP2lD8K9TF/yfxPiO1//ABnGTSBMHCZUzmkWI1GhBB6+de91/UZL/wAtD4vvfs+HFKp9zJaPi5INrQSv5g3T5rX0eH1+PEoSPhuz7vPnbm0Ik4m+yAgToep/GvRSg8C9ndy3Ivdf1daZMChtJUKhogR33I2C4oFDYn9ahKN0NjRI/wAY9Hys8DS+OeSMAX2PcE87Goar5Rdea0Tf+5x33A5TFO2Dk523QbpHHXyNeT2e318e6TZ9R6/1vsM8Ra1V/UUfuV3U1dufKQQSCXKSvlXy+fvK7+2qSP0bp+ptjX/Jd2ZP4GF313jxrczIzZv+MkJDTu+pLEkN6fGvNdbX3PYxtYn9pYeO+z3ExxMl5Kd0sr/p3O2tJS6DrTWBRJb7N7eSZwuH7A4TCfj5DoTLC4+p4uT5re3Sq40RHOz+Si9y8xxfHB2Z2vkiLLLyJI/S5r29AALJUSvBS+o1xv3M5+bFbjf8f72U0jZLAxQ7ycD/AArRc/Bje9K7tElkY/fvc+OI28Y4Y8gBbHOV2nxBsQKtYrvcw/yKeFIMz/t+53nZGz8vluYfysb6k8gtqPwxuzSvYv4WhcO1P+3Lt/gpRl5IOVkNK7pQHAeTRoKX4V5NK5bzJq+H25jYUIiiYGxtsGtCVaoqjte1t2SMeFDFd+n7LVRAuebDhYXKG21o0gCscn3Hh4+/c4KB8SAepSod0gKk3vzjv1Oxz0aSlx51n+UOIzyve3HtXbI0tPVUBqLZUVWjZkPd3fbMwSQQ+ppcQpKjbXDfLJ6GLB5Mh5ntePkWnMxWe3M/1bQLeNZLPDOx9dMpeVg5nHSbJWnYCi9K6q3TOW+N13PQ5waQxSFsmgq4Mid4/kpIWgxyFpXQG3wqAhFmw+4EAGW1QNHL0pQZupLQ5uPOjoX+k3IW6fCgzhkfz3G5HI4vtwS7JgCnSqTGjJOY4Tl8Jzv1TXvaCodqK2TRLkhmMepDwdSoPQ1ciVQ+EhgAbqOvWs2bpE5xPKPxpGo70khPiKwvSUdOO8M0fiO4YnQNSQbggtc1596Ho1ck9jMzOTkAhVrXahL3rltodKhIseJ2lEWrko8+fq//AARWcsh3H8jtTjNiPja7dYKL/IDSq5NbGe+5VOU7RMDi/CeY3LZpN/FLV00zfJz2wp7EHJPm8X7jc2N1gSCQhrrVq2OW2JofweQiy4mybxuQqNCnjVNGUA3OTmHHJaTt2kuNiCgp1WoP5MiliyuQyHy48bnguIUaArXXyVVqZVx2yP7UXXtPsd4b/wAny7WlrfUyH4CvJ7Pcn7an0HT9Y6ffkRNZB5HNe5jcb2cLRnT+VZJUqtXLNXfLe0JQgD/45k5Ti4naxi73koA0DVaf+TWpouha27Jx3bvBdo8IO4OYgdmzTgfoGOG2Ar+ZzvL+nrSrkvmcIxtjphZsvI/enuHkJHQcFjtgY5WxyFpcbjXySu3bc8fggDFx+9OWIl5rkpRC875nOeWjb4ADxrnyXXg6seJLclp+bweDx/0WA10spHqk1JPmaxVHY1bSKZyPL52e/aXCNTa5Nq6K40jP8jDMTjMWWEuy80B7UOwWPjSegnaQbJhx2n2sU26WUuWqVhNSHcZ2zymVIhiLYHAlxQ38Nam2VBWjZpnB9rZj8eKDI9OLGlnBSR5CudVdmau3EvOJxbo42QsIjxoxYCzkroVDndyTbHFA1GC+t7uNbQkZNye99vTXxHT4UchJDTskCyqfAeNTI4EPeXBNPBPM0pHBln364ccj9vc2ViulwnNyGdT6TeirixN1NT4xkLZSieoCvTOMByeLZlEOB2SOIuaurMb18j8XbDwAXhAPzH99awZDru3nMZujCpc/OlAKwDNwkzLhq2+oaUoHoADFycZ26F7o3i6hQaYQTXG96dycUQ2OcyxjRj7hOtEslqS58J92Inzsj5WDYSjTIwIKaZm8fwbRwWdj5MUWRBIJMeQbg5pX8aqTnagkuc7Xxe6+Jm4bMUY8xEjX/wBLx9JPz60NFUcMyiTtrkuych2Dns3Rg/2coBQ8dAfA1K0NG5JbFmGVGxHkyhdoaFU+AqjJompeJ5qPBPInCkY2JqumIOnimqUmSV12RkOSYvWQ3TRUoNEg/j+4JePy2ZeMHxzNT3WKRuI6JWdqKyhmlLOuqNQ4nuTB7gw/fe/2shqb2G2grxs+F1Pbw51dfUCzuRxWbgyMvvqb38a4oO+qZS+4IXZrHODdrDon+NK1raC2jKec4OeORxDbEXrupdMwtWCDxJZ8RYZnbdp9J6Vu1KME2i08fyUcrGslkLZoyCyRtvMXrjvR11R6mLIrrjbf5NX7M+4BjLeP5h4LDaKU3WuS1PKN0+P2s0+DMY9zZsZ4IIXVQR8q50zR0Hmc9Lxs4mxSA9v+4xfSatZXV6GNsKsoL9273th8swRudsnACtJH4ivWw9pX0Z5WbrOhag5rhuB10J612nEeEp+hfjQI9vcCjep60AcLnOehGvU+HhQB0uVoVFFl8qAOEhoPq0ug6mgYhxBAa39mt6AEFWWABXU9VpDFxuaWkPd8utMTGHuMW7cECW86llI4wtep6eHn40IY6UGgWypTZI2C9UNgVK6a1JZ4yBiX+VAQeORYjT9pt5USKB2MtQOcbdFpoBmUuycuLFaSyBd0jgSqDp86TcuACS/9JM7YNsBajAq/Oq2I3GsaQY4kcRvLyT4lTSTKiQGbKd6mQYp9yQkulcduvVazb+C0oDP14jhZDigzSAAPfo38TVciY1BXZbWY/wCkjf7mS5xMs35GjwB6/KlOkDgkmu/S4zN5R35Q7o3z86vYncAyeVfGAG+onwrN3NFQgM/kIY2vzc/IZFCwep8jg0AfOsbWk3rWDIO/v+43tPtzCm43t5//ADHOPBZHFBeNrjYFzxb8Kamy+ERa6q/lmD43H83yPHy8tzTHNzM6R05DlFnnUeFcl7VVoR6eFN01JDtn7gc32XmN3PdJhmzmuUoF8K2paNjHJiTNvw8/tL7m8cxsoYzOc1NyBQ7zq74qZF8M36ns8/SvKcoofdH255ztwPOO39Rxzrh7fUgHwrzbYrYran6Ng91h72B0bhtGcR5sePK6CRvqYbh3X5V7tLcqpn5L2sTx5HVkxj80ZWCNqRMH1Ftqo5CTx8wuHrfp4fjQASzJfNKGNQN/MdKCWhcjg4hrFVoutyfnVJkcTmPPJhzhxBd1KGvR6Xdt1rStjwvbenx97HD/AJeGWTFzYMgAFNx086+/63apmrKZ+J9/12bqX43Q7I/aSG/ia6meekBunV1goNgB41LZsqmk/br7eZvK5kPL8nEYcCEiSJrrOe4dSD0FeH3+8qV413PsfR+lvmusuRRVf9TfmQtaxjAAGNCIBpXyDbZ+qpJKEdMDHgqLEWIKUgGf0Y0aVB/EUhiJIHQDcQrR8qYGcfcL7iYfbuMcHAcJuUlCMiH5ehLj4V6nT6byOXsfM+39xXq1401uz5l7kmzeXllzs1zpZ5VLn9LaJ4V6fscCWCF4PmPQ9u1u3N3LsUp8Lg4NDyAqKR4V8cz9YTnUehAhQOduddTdKkoLbNCG+tu8/lWnIoBv04leZGktaQUGt6JCPgYdhveClybDyWy0SVWrbhbm0fZPsSPn3SZfJFszMQgHHUKD0cR1Br2cHtP+P8aeqPmO7+rW/P8AmyJqrPpvDxIcOFuPAwRxsADWt8fhXHe7taWerTHWiVa6JBDgQVVfEdaiTVoEkklUhtqJJBZJZWrfW99KQzGPvV21yHP8cc3Cnc4Y4WXHF/mK7+t+O32XX+p4vfefHGTE9t0fJOf+owpXNcSoJ+FcvZ6zxP6HpdDvLsU+oIzl3tagN/morhZ6khkPPZTHh8MjhKLD4+dNY3fTcuvZeF8k4aN1+yPPdu8lnPxu5kfycYDsZr09t4BUp50W9Kq/e/8AY7X+7ZMi/FMP5Pp+LL4TKgZj/p4jAhAaWi1dONLH/HQ8XPlef+esld5j7f8Aa3LrJjAYk3RzEAVOiV62D2OSm+qPlu5+v9bNqlxf0M25z7X85guc/jpG5jFsAUdXtYvaUtvofJdn9bz4n9n3IpWZhcxxjzHm4ckZHVzTtt5ivRpnrbZngZelkxuL1aI3/kg53q9PRTrWnIx/F8HP+SaiNemop8h/hYn9aDq740pH+M83MjLTcLRyF+NnhmREbHIQ7oaTY/xsj8jjY8g7o9SqA615Ha9ZTLqtGfT+v9/l6yVba1RG5c0PGgPnLht/KSelfK9no3wvXY/Ruh7bD2lNXqSvbv3w53tXHk4/j4o8ziZFJx5l9Km5a4aL4VxqzSPTeKXoDct94e4uSxjiQNkx8d7/AHI497nlh19HhUWv8s6MfUs/BOdndpd3d8POdycssWEgDXyuO5yX61FfuegZsbxo2/tz7Udtca0PzGieWyvlO4r8NK76qtTx70td6svmJh9r8XG1sWPE0N6BrR+4VX5SlhqvAQ/vHhMFQ0NsgRAKyeX6myqlsAy/cTA+pjkWyIiVP5BoCl+5GO0IbdFUVP5R8WAn7p48ZJJBTW6fhUvOiuLBMn7rYDmuDZEeB9FS86GqMqHN/ddkGDl5YJ240Mkh1T0NJvWLzy4K/C0pPi5n3F7tfy7+cm5jMOfK9zjOyV30uNmlhOwtToldMGMl/wCI+7z8jbHzibnAA5+KCi+Mkerf/Laua+J+Dqx3rOpYMruL9XE12LltyYJNJGO3At+PSuO1mtGenixV3QFHHvJle4u8R9RrC1jrSgkoskNYIgQrbhupX4Vi0aJhUfas3ONSLFVxsQ4X8qlZOImkymdw/b3LwnuIjdE8EqEVfh4V3Y+z8nHfrp6oqckGdx79k8bmoUFdaumcVqOpJYma1zdqp4g6+HWmQS+I5zEMDtpA6H9lSOCYx897lEwKDqaRnao/I3Hy2Oa4Ne02cx1yLVUmeqK3yfZuFmkyYp9mUjToU6U1YtOSm8hwHIca9JIiW9CPGq5FpHsDiMrLkAQhv4IKi10jelGzS+2u32Yxa6U7noBtFhfxJrz8uST0KUg0jjXRY7dsTNnRxFr/APiN64XqWyaikc6Nd22909K/OkI81zST6tw8G2T4mgBmWSN+5AB0O3x8zQggr/JYUEyxOaHEg2RSfiT/AAq62gqCmcjwjcVX4p2m526gL5110yvyY2wp7FW56bOOC+JwJk+kL4fKuyl0cV8bRMdu8Xi4fF42PI0fqJPVK5Lqb14vazO19Nj671/WWPEpWpM8lmf8eMbHgj9x8yowXQCxNqz6+LnLb0Q+52HjarXVsS/AmtLyc52IXw4UZWSQNufT0pvKnpRf6jpgs/uu9PgqHcPe0LMd2PhkNgP0xsHqO23qrpwdR2fJmPZ72PFWKlE5LuDmeVhjxczMllwoisWK55MbPBGqle3jw0pqkfJ9jtXy7n2zi4fDYB/9himWTUFLW868hts7jmXx/L8wUEJhZrY1KWo+SGIvtvkTOL5MkxgqXOJUknWt02ZNj5+1uKAN07nO/M7SjkwCsP7Y8axyzTvkI6A6DoFpS2NMsnH9mdv8dtf7AMvi4hx/DxpQHL4LHj4GJFdrAwD6QiHypqqE7MKGTjwkncAG2cT0q1CM2mzzuUh2F7pA1qanT8absJVBjyuKQRG7c7Tetl8anmh8WOMyWSAEq4dDoD8KEwgZfkFv5Rr9VJspIaOU4WEgC6p41HIcEB3PJ+u4jL418bpGZMboyotfrUNuR6QfF3dfafKdp8kcbOjLcV7iYZLoQtgtetiyckefkrxZFe21ShTdcXrTyQTXC50D5hh5iI+0T+i+FbVsc2Svkn5sGJBGx1zc/EfwrQwkEkxINu17EIW/8aA8kZNxcEg+mxCqlzSKkicngI/VtBvdaC1Yi3cLtfscFcvQeNSyjQPtbyvLcfzbOH2Pn42X6yhIYU1XpTqzLJVH0VxUzi10Tk2/kI1NaM5EtSRfi4eewQ50DZ426bgv4LSNNg/jOO7fwXNEGFE2RbEC9vCgcIl5pYpR+newPx3+kxooFUmDMU+4f2/y+Eldz/CsMnEucXZMDQr4j1c0eH9QrN6FIoDHe68PB/uH1A9CKYwmPLmx3tycZ5ZkRO9cXQjWotVWWo6N1cov3Ecxic3jesbcxoR7BZU1rxs/XdXKPd6/ZVtGdymRXJBQrcVxwd8lb5jjGTtVrRuIWtaOAakzXneElbI92xXeXj/Ku7HkObJQr0UsuPIInqC1QCdPCt2pMa2jRk5i8mrWwTIWW2uGrfCuK+ONUepjzqy43Lfx33A5XtqNjplycNCQRcpXO8KvtobPI8am2qNd4rkIe6uCw+ZwgWtnaHuabL0rhvVpwdVbKylE1hObi7ZIj7eW36RovjSraCL15Gidu9zPnAx8x+2YIEPXzWvW6/YnRnlZ8EbFxZODsS+7T/rXoqx5zqOkuHgmh+FWTAmR7gPTcu0pCgQHPZZVXX40wOlzyBtungLUDON3D1EW6jrSGLJG2wXbZPGmITu22JvSkBt4dMd0hDW9AdSallLQZcfb9I0JJ/GgYqN7nXcFPQ9KEECzIQ5APn0oFA1NuKWta+n4UmUIY5Xerra9rCkMKBVrQthVIgU5we39m4WQ0xDLjnxhzo3NlTRrihQ1Oq2K0Apn5n1fontXQxuFZt2+CkkDe5nodsExB8XMA+FL7vgqEORQ5r7yBkS6e44yu/AIKaTE2FMhxMBv6vKlaXsv7kpDWNTwFgKuEtWIzzvL7/8A237XL4s/l2ZmcywxMP8AvyL4em37al25bImUjAu6f+6TuLk5ZI+0eJGHAVEeRleuQ+e0WFL8be7gv8sbIpUXF99/cZv/ACHdHNznCe60IJZH5o1qCs72rj2WprTFbJuzVuweyPt7x744I8P3OVjA3T5JDiXHqBpXBfPazOxYK01SL5zvZkWVCS1oLegbonSue1WtTWuQx7unswYjne6FXRAt/jVUyNHRoyhY+RzHa2aM3i3uaAV2hUt5V6FLScmXGbn2H94sfmYDxvMbd5Gx7ZEK10q8qLHA6Wo+VSK+5n2747KhHP8AbTUe4F88bSoUDwrs6+BW0qed3e9autjGm5GRjyGORu1zSiJ++nfG6uGLDmrkrNWSOFn+5I0OftCBazNiex85pcIozbqRQOCTx3O9p0qruKNU/JRUknm73Sa7npcDT4GmSOMfJC9Y2kv/ADAA/hXTg7V8FuVWcPb9Zj7tXS6kufaHC8h3XmM4+ANjmdc+4UcG9UHWvqsP7Bgai38j8/7f6H3cb51X/H8s3Ht77ScFwbmZeauZli4L/pB8hXH2PaZL6LRHp9H9awYPuv8AfZf7F9i2wt2Rs2RNsGt8PhXjty5Z9WqqqhCg/RFTxPlSGONf1cT5/wA6AOtyGtUgKBe9A5Mt+4n3SHFvk4nhi1+fpJIbtjHn517vS9dz+62x8X7r3/4H+PFrf5+DBc+SblcqXLzJDLkSnc+Q63r6atFVQj83vnteztZy2AT4kjYH+24vQEhp1TrWebFyo6nT0+z+LNW/wyoz5cLJXQ5WOiGxCi3xr86yp1tDP3br5FkxqyejBsluLMN+M4woVDZNEqGjoBwzNAL2j3B0Lbr+FZ2aW5rSlr6JSSuBDI9g/UAxxG+0i/zrjydqtdj6fofr+bO5t9qLBhYuAw7oy33PPrXlZeze5950/R4MGsSy1dnd05PaXNx8hjt3wv8A7eVE2wfEUX5jpXPjyuluR1+x9fTt4HTb4PqXjMvC5rAh5LCfuxshoexwufMHwIr67FlrkqrI/EO51bdfI6WUNBpgKAtQ/G1bHEJfjAi+qaaUCaBJuNVvRP8AGlAiFzeCa9jmorHAq0+HhTRLrKg+YfvD9osjj5ZOY46EvwJSsjGhfbPjavbwZK5q8LHyPcxX6eT8tP4+TApe3Mts5YGENWxutctvV5OUeD1Ke+w8OXkLbwsuO0FzUd+2vVxdJY19Tws/tLZnvoP4EeXgZcObjOczJgcHxPGoLa6PxzucNsvwfUn247qPc/EteX7M6I7JoVuHDr4oelfPdrrulvofWdDtrNWJ1RfYJMqJAHG5JJ8xXEtD1QxmbJDd71cLFKYSNz52NkRluRG14JVHtBJFWruuzM70rZaqSp8l2p23yjnCTDYx5/Oz09fKuundyV8nk5vU9fJ/bH9Cr8h9reHLycPIkhcSUaSoSuuvs7Lc87J+v4n/ABbREn7P5L3ks5IAIoafHoK3XtF8HLb0D8WGR9oOdcojy2OB0PwrT/2lTF+gy/KD8T7I8ogflck0FbgDpU/+0XwWv1/I92iR/wD3SxQt2T8g4ucNBb91Z29t8I0p+tqfusTHGfZ3tdwEnILkuJQh5LtRpfpXBm71sihntdT1GPBbknqVnvP7EYL3syO1SyJjnf3oX/lXqPEV832MWRWmux+mes73XpTjlrLPdtfZ7A4yaPK5GT9RM24b0t+6op129bB3Pb1emJQjTcXIjxGezE0RxR2DU6V3VSqj5jJkd3LI/lO5Xs9MBNhc9al3IRU8zuXOkuHEoUArJ2ZaqQcnKZKEveSrr+S1nyZqkgafPmPqa4nTzU1HJlKqQBJnzvKPehBQOqGzatUM+9I8Eh3rVUUp8Khsvihp5kcN6oR++s3Y3rQrvejs1/bHK43GY02ZmPgcPYx43SyCIEGR5DAUa1t3O0q8Km6DO1TGz56ZjtMDpDNHGWkBsDifceD1CBABXsHiQN7ZISJArCev+dAtgvC5TKwXiWGQxPBUlt2k/wCpuhqLUVtzWmW1XMmgds944OdlxYnP5A4+KRGjNaCYAf8A7xFLa8/L1mlNdT1cXcT/AJaH0JwfYvGxxQZwnjzMeYB8U0Tw+JwPUOaq15N+Uw9Dt5rwXfjsLDwR/wC3aG9KniZu7Y5nYOByA9ueFriTc23eetVCJ5OSg9w/bTEnY9+Ixj2ISWEH9lWrupqrJ7mScz9v8jFldJjgskFwwix8Ersx9j5MrYU9iAhdm8XOYcqMtCoSRXUrKxx2o1uS2NlQzqSgUJ8PKholDro3xye7jvsU9B0SgTUhGPyTWk+8EQpuPQ0zN0JJ0uNlRgODZGOsh8fGmZ6oG/4vEhG+IBviP5eNZ2pJ0Y8zRK4csMaAna4a7rn5eFcOTG0eljzKxN42UGjd10DnXPwSuZmwezNVn9wlG2Add3yAqYHAmTP2kkfT5n+FIpIZ/XfUdxNtCLIvh1qoHAK+dznk3cRotvx60QMGlY2YEuAXVPFatAyEyeMimc0EekEEn9vwq3fihUU2QJG3Y50rkaInEqbAN+Nec3LPqaqEAZvchbMRgNa2UNP/ALmQXaE/IDb510Y8DejOfJetdWZzzPcM8uTI7Hne+Ym+VuO8p517eDrKq1R8x3fYtvjR/wCpAK5znPcS55Kl2td2x4W+okiyp6j+CigGfpTHgQRlGMAaCosEryOJ6PI6YgwgNABF0FKATHwC0lAi9RQA09CQSXPcURTapZUjbhIu0PEbdPT4VLRUnoZGRO3E75B1caByKfnZEiuawlLDwFDliQgY2VMx28bWPKncdaUMJQ4OPicjsh29rRaP8oPwqoCQgQ48QRkYCGx/yo0ELjbM/wBLGErYDS1NKRNhDOKyJHgzODQf3VSxyS8iCv8AiseM73gOLRV/jSI5kLzKOa5sTQANDUWFyM+737UwO5+Kdi5kYMhB9ubweNCtRWzqxtTufK/cHAZ/bOe/j81vpH+3KfzN+Neljuro5bVaZEPDi4EWQKHdQRWyZm1JZOA50SOZgZx/vi0Up6rotbVsc16QWPJxI0LQ4I0odxve5qjABOMYg9vj9K6J0oHIlkG5TtUi+0eP8qCgrgmdu5fIzYGfEW8hGV9t5QPaeooWorTBpPGYmFguJxYmQsQBrmAXUdauEjDk3uWji52PJU2AKk2FtaCSeiyI52hsFmJd/VxH7hUlIehmZGSHlCiNPmaJLQc3kI3x7UHuLd3wpSM6OQa9roshokglBa5hutqcgYt9wuwsnhJHc9wEbpeHlcX5MDQroV1cweHiPwqRmaycntku4AG4k8R50FQSXHcs+OQT4r3F9g5o086VkrbjX2vQ03j+VwuWxY922PKKARm253868jsYOOqPa63Y5KGIyYFVpAA6ht7fGuJHoSV/luKjmYXBq2RpNvnWlbajcGbc/wAMGhxaFcLj+VduO5y5KTsVdsxhf7cjQCNPL/rW7UmVbuugdFyOTEnttE8KgPgdex+NYWojsx5Gttam8didyw4cWNx7me1j7B7cXRq62rwryrOT3+CtRQaPKxmSBLAfWnpI60jn23HoJ2tkDXOTIZdrlQL8aqtibIuPBdzOL2Y2a/a5iAEamvRw9jwzzs3X8ovEEzZow9nXoq16qtJ5VqwO7A4KqHz0qkSNOV3pBCjQ0mNCGOLAW3K9aBixucu4ILKdKYoOklxIFmjr/D50hQeMgY1CFW4GutEjgac9zkDQi2+FKRo5scNfVa4NEAKY3eFFkoA64tUEBSdR0oBHVsFC/KgDnsRuduN06UQEig3p9I6X1oAbklaz0tu49ESh2BI5EXn1AKT08KSkbFz5OPjxmXKmZDE0K58jg0ADzNNteQgzLu37/favtMviyuYZm5seuLg/+4eXeCtsD86z5TspBtIw7uX/ALuO4OQc/F7K4NuLGbMzMwl7k8dgQD8afCz30E7/AAjIue7t+4neMhd3L3BkyQPucaN5jh+G1iCnwqiWrPdkRj8Tg44B9v3Hn8zr3q5ZXFIJc9rG7D42aAlBUm29i53DM+3mfJyk/t5kG4Y8S+sk/SAPOubIk6v5NcTfMruJnZUz2z4r3B0f5wULSK4XX5PWmTSOzvuXLLlQ8JzriTIdkc2oJ6AjxrLizGyg0rlu3cDOgc4xgqCRuC69fKlahksjMc7r7N9p0jomksddEt8qzrZpnYrJmRcvwWZgTnKxCYZWFbem48a78eVPcxyY/KLx9vPuq/CmHD9wn3MeQbSXm17da7cd3RyjzM2Gt1DRau6/tjDzMDua7bLZ4JfWWM1H/SvqOv2MXYpxyaP5Pgu50+z08n5MH3V/8TJM/t7kuKkLJsaRhH1BwISuPs9G2P7q61PV6PuMeb7b/ZdeGchyZo3hpQJc7h/CvLPol9xYMKfIygwBisFgRpWV8tarVnf1/X5s7ilWyzcdxksjmvleYwikan/rXj5/Zqv8D7rofpt7fdnf+ho/ZX27ze55WnDYI8Fh/vZT23I6gHxrjwvP2rQtj0+7boeppEJ2N67d7C4PtuMfpYWyZKXyXBXqNU8K+k63Rpi13fyfmPsPd5+3KbivwWL2Am0DQIa9I+feog4+0EEEnqaCRDonmzR8z1oEI9s6OKnqBYUDKH9ye8B2txT2wH/32QDHjtB/MRr8BXp9HqvLb6I+e917NdTFC/lbY+aX5U0sj5Z3F88hL5HnUuNyTX2dUkoR+R3mzbbmTgyHNcFbVEcQmPJjcDYL1pGbowHI7YyOSL5MPHdM0fWQCQAb18j7jrqj/Itj9R/VO9fOvwbtEb/8DOQ4ODkaLGMWSvhc3sK1/ifvHQ/WL5ItlcImMLtlmAz2w2+gW9h/OvKydq13ufd9T1PX66+1aknHxUYYRJD7i3AA+Vcjuz1tkDzcHiOI2sMbybEG1P8AKxaCGcBkwu3teXBqK03KU/ySBfft53vyfamYMLOY6ThMggSNv/ad/W0fvrs6vbeG3yj5f3fpq9ujtXS6PonFyI8zHiycd4kx5GhzXt0LTdFFfW471upR+OZsFsVnWyhj4BJ0v0WtDnPOQn1Cw1Ca02A2+FjkUelNetCABz+Hxc/HlxcmJskErS1zXDoRWlLOrlGWTGr1aalM+XvuL9voO1eYLYGLg5KuhJFh4ivsejnWWn1R+T+46lunlhP7XsUd3AxSFNor0nQ8VdpoGf20w/SE8qj8Rqu4yQ7Ydm9p8tHyOGDsUNyIQUD4+vzHSufN1VesHb1/Y2xXVqn1P2/LxncXGQ8jgyCSKQDcRqHdWu8CK+Mz4HitxZ+p9LtY+zjV6ef+gRlcIwk7QB4HzrnOx1IrI4BwfZnwpQLiAP4yWEu2NV3wSkTxBncflvduLTcXaaAPfoMgANIKE3UedORQGBv6aNxDgvQUmykiFzuVySXRwlCLr0TSodhjEORO5wfIS54dck2FTIIMj5F0bnFSngvSiRnRyx3A7ihCC9qJKRxvIN9wElWO66j8aBhUMmDOCJbbjfpf40ikdm4fjJwNpaVVfnU8UMi5+1MEOJ9LRoD4jyqeA5ITku1sONxAcPP4Vm6FplbyuOixfQz1NP5RrasLaG1SAnw3iXdF9Go8qwbOmtWdixSwb3W8R4JWVrHTWhDcvzfHcakbne7kPcGRwxjc98jyjWtA1LiUAqap2ZtHFSwH7ld48p9ru2ndm4L24vf3cEYl7gyInLNgYkg9GEHDRxBWRPFK9XBj4r6ni9jLztpsfNikv9RVxXc49T410nKdbLLGUDiW6lpu0/Kgcii4SyBsce17yGhjBq42AA86A3FSwZOHPJjTxvhyYXmOeGRpjkY4atc03BHgaNxall7R+4Hc/Zs+7hM98GM47pcGVZcOTxDojofNqGscmGt9zbHldfJ9CdmffftrnxFic+W8Dy0iNY97t+FK7/TKnoXwf+NeXl6lq61PQp2K2WpqP6kuayUPDmvG6N7CCCDoWkWIrhag6ZQTFltliLXOu4X+FUKQDMxcTJYWZEYkjNtyeoVJqmUznuxMfLb/AO3DXRn8pAUU1d1NVZPdFBz/ALe5PHhz8Vzt+vtmxJ8PCuqvY+TC+FPVFe93KwnFmZEY9qgEiy+NdVbK2xyOjQzkSxuY7YQ4lEd0NWkQcjM+ON7JD4p5a1QOgTH3BG22ST4L0pwZNQR3K95Q4zNuOhcND1/GqVJ3FME32P3Bl8njzy5R9Ad6XAp8j1rz+zRJ6Hq9Zu1S1nL9y27aTcAdRXFB2IW2cORkh01W60oGLbqXA+kjVfC2tMY4dyhpKAC1rEL0oEOH2y0mwaiknSjYS1IHkuYx8ba1paXOPoH9X8qzbdtFselg60fdbx4M9z+4XESTZk+yB5/2W6FDpXTj67eiN8vbpRTYpnJ8xk57nRtJbA42aLkgaV7GLCqHyPa71srfhEft2lfDXrW55woNCWKE0FHi0g3XzHnQOD9MpckvuxjWsXV3QfCvKk70gd72JqrvEVLLQOZ3K5rGkpZoXxrOSjoiypBuKtH+L0aki/0byP7r0Z5H9lOAHoosVjt5b7h0DulqRQ6csuJa1gC9EX4UcggXHjZ0qHZ/EU4bCUg+Hip3ge49FKVosb8mTyJBsXGwRIQNzm9a0VEiHeQmOFrPAN/GrhENtnnvYELR063/ABokUAU89imlZtlJlZ5R8ioAiXrCzLgiXwSTsLXOG09KiBplC747M4/uHBkxckNGU0LDKE3ApYU8d3RjtXkfMvMcRm8DnycdnMLZGOLWkhA5o0K161LqylHHZQ4IqVyODiSCPpcOnhpVohot3B82MyMYeSn6xoRkp/OPn1rZWk5L0JNZpC4gF0cdnLoCelUZiog6NWvKNQuB8KRSKnzbJ5M7/kIpCzKiTbI1QSmmnSspaOmJND7G7si5wM47Jfs5RnpexxTf5t866FaThyY4Zf8A9SxkzceI/wDtsf1yvJ+twslDRmif47ktp3PO33Lub/S3oKQBck7ntMrV2OJMdSUDScpjYMZl5HKjx4k+qRwav7aRUFS5r709icHZmWeQyWj1RYw3er46U5K4sznuD/uT57Mx58PgcCLExZ2GMyz/ANxwafLQGkaKhnuN3XhsxGjLYZ8py7/BSVpltIRN3xkxs9njMdsAIR0j7uNAQDcN3Hyz+4eMyp8l7mxzsO3cQ1C4WSssimrNsLiyPqzNY6Rm+MhHAFGjVeleDEHuyQkkGQSWuaA2930FciB5bj8SVjt7wXXQNFq0q3IjNOb4aRpe+OFzWjQohrtpc5r42VxZIpNiljwhaT41s1KMqOGaBxPKStjxpXuV4ABcDoRXiZscNn1mC81Rq/aneTWsbBkHcDYFyqFrif2mlscl5B/Us3REX1f1HnQc+wTA4RubG53q0Eg8aqrIspLlwXcL8RzcbLlDm6B/jXpYc7WjPNz4J1Reo8hmXEHREIir0r1qtPY8l1dWMvUopuLrQCOEO3IwW6/ypgd3ktLWFDoVokcC40AIKL+NzSQmd1QkJb4mgDqAEdQeg1NMTOkPBWw/iKbEcQALoNVGt6QHFJIAC+BpFHXShrUcPlrTEeLXKZCjWjWpgogec7v7U7cj9/muZxcMM+oSTNa63+lVqXaoGRdy/wDdf9s+HdIzim5HN5TR6f0zEj3dPW9LfChNvZE8kjJu4f8Auy+4PNuMXa/G4/EYzwWtkkBnmv1UoBVcH5ZPJvZGVcz3D313XI6TubuDLymvN4vdc1gPkxpAo4VBVs9yPx+IwYEdt3u6mSq5FKqQYHMiaABY/lApFC2mR4VrUXRbUAKMJJBkkDPALQA3Ll4WMCVDi0ak0QEojo+cyp81kUUhZAD9PRRStXQql9S88f3Pg8fjvblSAEt9QGhrjeNtnoLNVLUi+O72jn7o44Y4/wDbNnaXuRCQvSreGK6nLfs8rQj7h4nKx8/ChlA3BzGoNBp1rnhMG4B+Y4zHyYCwsaCbFoF/+lY3ojWljGe7Oxc/Ke840RQkncnSuardWdtbpoynl/t/kxEvmJjcLtOhWuyuci2JW1JPsz7j8z2Bltw80uyeLUD1EktbXZS7TlHDmwzufS/bPL9ld/YcWV7ME5ePW0hpcDXq4u5aIk8LN6/G7S6o73N9le2Ocx3S8NAzFzmhG29LvjXD28F760cM+l9P3sPWsllqrVMI7n7c5vszKficlA5sbT6HtHoPgbV8zdWmL6M/efUdnp56TgSQ72OzO7l7gw+Hg9TJnDeddrfzEVjbByaqt2ej7PtU6uC2R+EfbHB8Xh8HxsHHYbGsiiaAU1c7xKV9r18FcNFVeD+YvYd2/azWyW8h7neFk6Guk80UwX3qvimtMBaLZU6LregDjoNQt/GgTAOSljwMWTJyH7Yo2l26rpR3tCMcuWuOjtbwfLHd/KZncvMT58y/pw4tx4iVAYPLxNfe9TrfipB+H+y9i+1nd29NkVl0BafUy1dcHArDEkZSwTwqWWmSfbXbef3JyUXHYMRLiQZZUsxi3JP7q5s+auKvJnd1erfs5FSnk+ne2u0OK7f4ocXDA1+9qTOeFc4u1JNfE9rO87c7M/Y/V9KnRqlRa/JjX3G7RzO18p+dixmTj5nEscBZl9DXwPc6jw3/APxZ+++g9vTtY1S7+5FQj5Br2sc4bib3Nec0fXPH8BzMiLcAwow/l6/jSM3VwdmzYY1Y+NXEFHoDr8aarJkDjkcdzrSFgH1H9iU+LKg6eYxmN2lwcRY/5UcWDoWTtP7m5fbuQYj/AH+MJ9eM4oQPFhXWu7rdq+B/KPnva+jxdysrSxuvbvdfC9zYozeLnEm3/ehNpIz4OFfVdbtUzKV/sfknf9Zm6luN1/qTQka4g/lI+Ndh5IpzowhP1E60AwTL5Lj8CEy5U7YmgFdxAq6Y3ZwkYZc1MamzhGBfdPubju4syHFwCJY8ZVmGg8hX1nrOtbEpfk/Lf2P2ePsXVaa8fJnm1Bt2r4JXuSfHiNpJA2onlQOTkkBeERKGhqxY+xe6sns/kvc9UvFzkDLgFwP9bR4j9ted3Oos1fqe56v2tunln+17o+nsA4nJ4cObiubJDO0PY5twQdK+JyUdG6vc/Y8OauaivV6MddxYfdPgfCszUZdwMZNmgnqqa0BAOeCav0r1H8aAgHl4UXDWeQ+dAQReT2q6YGxXx6/jUNCgiJezHAEBiO0PiamA4kfJ2tlRE7WEtNyPhRAoAJ+3c7crGuCdOidaUBBFycLnNa4uY7xQ+VQxpA36fKhJifGdhKg9BUjGJXzM03L4JYfGhsBcUmRvRr3bhdtzUjAuV5zLxW+qQhyXF9BWd7QbVrJWZubzcklZHBp/G9ctsjZ01xDDZXBRJIbauJ1+dYOx10xENzHdPFcSw+7I1z0JLRqDUpNnSqJGb839yczM3xcePaiAQvFreZrauFsm2StUc+3HenA9rc/ld2dzYU3M8tg40j+2IA1rsVnKEoyWfcV2xj1NIGtdlMUOTzs+bkoRnvNRT87yOZz/ADvK/qeSz5nTzzPcDI+SUkkoSqA28q6pOFVI48TxxcgzrkopDf50Sxwjv/x1z74uUyU+YT9xNHIOIJJxHJYwEoh9zaQ4PiO5CDra4Ki1BMDXJcjm8pnT8lyEz8jPndvyMiUkyPfYFzibk+dNR4BsZbI36Xt1/MLEddaCR1gLSTERMxw/uRuCFPMfyoGmXDtP7ndydmuZDxeScjiiVk4nNJkxwTb+25d0f/l/CufJgrfwb0zOpv3Z33Y7W7vczF9//iuacg/QZjw0Pd/9zLZr18LGvMy9a1PqjvpmVvoaGFQskch02nUCuTQ6EzvtTRephD4iLN6hddKlouTv6fDyFZkRbgR9SKlQWmV/uHsvFy4HviY2dhFluW1Ss67FrXcx3nezM7Be6TDUsbcxkIh8q7sXYT3MMmDyisjNlhBx8lntyaEkIK6009jlaa3I3OR0LyoDkJ8jWqM2UvIe6SUlxUjT+dbrY5rGndlubjcU1rSFcpeG3/GvL7Clns9XSpbYcstAa0GxQHzrlaOuQ+M7iC83N/G/8KyZSDGkBrW9VUnWkEDUs/tge5dg0H1E+SDrSbSLrV2cJEZkZObmxZDsZh2QABzHFPqspJsErKXZnr4sFMSl7mZ8x3BBgZQbivGZmROV6+uIO8POvTwdZ2WuiPM7nsa0cV1sVbkuVzOZyDk5mxrz9Ija1jQPBBavTx41jWh8xmzWyvUFam0oCTqBpWkmAkNINz6nXQGwoAUwpYeP7KC0zq6rr1TWgcn6UbmIXPRFv/jxryUjt5ocDccgSPco12/yq1SSfypHf7DTujb6nX9Q9Ka1X4yPzC/1DXtcx133Ctt+FV+NEflYIMb3HNc97yLqFQJ0tT/GiHksFxxuY32owBGSpPnVcELnYOwpIYCGzMBQpv6g+dS6ItZGTjf9JBAvYdKEWJUC6HXqVpNgc9zaP7jg0FUva1LkOBn9TCQAHgg6Hw8qNWJtIRJlNcS1jVd4qgquAncGJLi4PIPgBYA0/wAZPMi+RwZZI/7RUhS4H+FY3xGlbkC6OUem5vp4/jXKbIj+Qx4LvmkYxzfmalpFmYd/9t8X3NgvjYwnkYb4+SiX8DWuLJxcE2xckfOnIYeVgZMmHmNLJ4XEIQi+YWvVq+Wxw3TQMx72IWEiRqEOBRHDSrkziS4dt8u3kIv0khH/ACYKNYSge0dfjWqZz2rBNPBhCSuQPuqKAdESqIIzkMNrjuJUuFtqJUtGisVjIxsnj8tmVhyGHMidujcFBJHSo2LiTSO3/uHw03Eh/MTtw86N4bOH/mT8wHnW6tKOS+PU9yn3v7fwhI3jceTOyCLOKMZYIENTILEyk8x98O8uRh/S4TouOxtAImq9PiamTTgihZ/Mcpyj9/IZkuS4kkh7yR+GlBaSAWgdAEJpjOtBc4N0HnolIcCtoBPVF/EUxwJuUK69aAHoJPaljlH5HB34Gptqiqs+yOKzJs/hsHJYGsbLjxuXX8o/lXg20Z7ac6g2Vx5eXOcXOQXTqtQ2WiHmwREllKkldaUmqZE8vxrMqAkNVLIf8Xq6WhjakzXneERz3MCdFuErvx5DjvjAeIyv0rTiSkhy+hfE1nmpy1OzqZuP2ss+DnyRyNc1xDgnwUXrzb0PdpeUaR2t3k+Atx53bmL5Eoul65XVod1yRpWNn42a1rsd4JchQFSKk5+LR3IzBjAQPBfvKgjp51ckxJL8B3nkcbIMbIe5+MbBxvt+FdWHsOhx5+tyUmm8byWLyEYkjfuBsmt69imRWPHvjdSRDTqNTpW5gMBu1zgXArqtSU2OH22O3uufDpTFMnmv9wbunjpSGd91XoxquA/CmApJC1XI1o+pbD8aZJXue767M7aC87z+FhBqkxvmbvt5Ak1HJDMu7j/7tPtXwyxcScnm8pqgNxo9sS/+J6US/CIdkZL3B/3gd38kHx9r8BBgRu+mbJJnePNGoFo428snm/Bm3N/dn7v90xmPk+4p4Md9/Yx0x2hf/AF/bRwr5KizKeeJdlyGfksiTJmd9TpXueT83EmqULYfD5C4cDExwNkYB8Tc3pyNVSCt7WKGgEWsOtSXJ5JX327SNVtpTlE6sU2JgJMr1OvgKBwIkzMPHBDiL+NqcA7IAyO4G7SI2lzugFkogjmReRy2TKLu2j43/GnBLsR8mQCEc4uOoFVxM3c4yXIcphBB0BGtOEJWt4D8biM/PcLvepsAp0rO10jSuO1jUewvtRzOfnwZEuO6HHY4OL3Ag/KuPLmnQ68eJI+xuDwjhYEGO5/pjaAPG3jWCKnUmB7TmoWqfPypwgkDzsZr2EMbqOtY2qjSrM57k7V/U73OJ/8AC0KltK42mjrrbQyXuDsxwDwYdoKkPfd1aUytHRCZVeNd3B2VyAzeEmLQ0rJDfY5K7K5kzmv1z6S+233u47uGOPj8/wD9nyg9D2yEAOPVK7sfYjRnl5OvGprGfxvD9y4LsTlYWZGO9v1IFAI1BrfJix5l92pXV7ubq3nG4ZWuyPtTxHaHck/M8e/dBI0tgjd9TCf8q4sHr/x5VZuUj6T2n7Pk7vVWK25qzHdRa1eyfDM6ZLALcigDm94aALAUxMU3JcxDrTBCnZKak218xQJmO/envKbGGPwOOXD3h7mRtt6BYD519J6jrp/8jPz79q71klgrpOr/AKGQx57ZgBs2DRfhX1SZ+Y2xwKe+J5vfxFMlJoVHgMzZI44kMsjgxkfVXFBWdmqqWbYla1lVbs+kOw+y8HtbjGCNu7MmG7ImIuXHp8BXw3d7TzXfwj9r9P6yvTxf/k92Wx0QsUS2teae/IPncTh8jivw+QjE0MgRzCNFrPJirkUM6sHYvgvzoz58+4P25Z2zM7ksMk8bI47OoYdUr5Ht9G2K2mqP2L0v7FTsU45XFjLc7kIoGl3vAkdBa/UVhj6mR+D3c3uerjWtkyJPcoh9TnEsJQgq61ddejc8fL+x9TwxT+48DJayORuxdSFFxT/wbmC/ZesvLIrJzo3yP/SPIQrdbirXUuaL9k6z8gj+cmhUBxcAboKr/DsO37H1l5JTgfuDyPbXIx8jxuQ+GdpG8EEskYqlrh1Bq6dW9XKPK73uel2KOllMm54n/chwWRiskjxpv1IaPfgCI1/keo8K+s6WF59G9T8Y9x3a9O01TsiN5P7/APK5YLONxGQE6OlO63wFe/i9XRfyZ8P2P2PPZRSqqUHlu8ea7iyCeUy3SM1ETfSwfIV62HBTHokfNdrs5s+uS0gjc32/Tv0611yeZ+Idi5Rp+koR0P8ACjkS8IVDm7yrkSqTMrY4HzLE9RvAd0+dOTPixxvtRtUvBd5m1VoS5Zs/2T7tjlxMvg55QWYbg/H3HRj7lvyOlfK+3wpWVkfpn6p2rcLYbvbVGpydwYrCGMe0/OvnT7yRs9wQBSoA12g3oCTg7jxzrobfKgfIcbz+K+4It1oHI5/zOKb7hbwSgcnByuE4kNINIJEnLwXroBolASMyS4Fg7aFuv86AYJO/jG6gIbKdKWgIjsgcGQ4uDUI6pScBBB5je3AC572AgLYjpUPgEFZ5TkOEhIdiyND1s2yFOlZWtVDVWfP/ANwPvHx7eTk4/hePkzsiB5idLpGX6EN2gkgEJWdsfI1rbiVGT7l9zYMns8hxMONIWteIpCWP2PChyG9xoazeBM2rnYxnc19yeb47I5fiIopeLiUyx40ZkcxqKVIJNh1SivXoU+3ZFAwsruLuXnMDg4w2TkuTyIcPGa8ED3Mh4Y0nyutarDVEvtXZauf7amxI/dwAyTjxk5uHx7TZ80fFSexkZR/8cgdtH5Wita0SOa2Z2epns+dPlOLY3mPCDjtjDupQE/E0xagJELXneSSPq6nWmILaeJJILNXtJNz6QL/jU6jGpf0rVkwi5rvddtG4hIkCfNaYi0dkM5Hl+Zx+OJbk4Ws8UpQ+025DXghwKedDSE20i58j9v8AF7nPIy9nQOzWcaWskxMuRrc2V/5m4T2gfqNv9BAk8jTSIVjL+U4HIwA6aIOlxo1ErXNIkjQod7U0BsT0OqUyiLY6+gWkNHXOa5xL9P6wn+DQDOujdHGHlJYCbP1avh/pNAjQ+0PvF3R242PBy5Ty3ENG1uLku/vxgf8A2Uxv/wCV61x5erW+q0Z2Yuw6/U3Xtf7mcB3HCH8byDYchoBl4/KIjyIz19P5h/qaUrysmC9Hqj0seStyzw9x8c5xMuZACeu4Io8q5mn8HSqhA57HicrMuGSM+D2p52NZOV4NVQVkDiuYjDZWs3PCB7C0r+BqZY+LKXz32yizyXQuDwvpcNa3p2HUHSrMx5/7Zc9hNk9iJz4gp9Km1ehj7dXuceTrfBnM/A5uLKWTxFrwUKhD+2u5ZqvY43ga3DONyMzipgWk+2qIdLVFkrGtG6l643mosiNDaXwN/wDHzrhvSDvpeSdxDkShGtUG+7QfjWLNWSM0TsSL3Mp5O76GNsXHw8UrG1kjbFjtkZL9sdg9xd15MeQ1roMcP9Mzgfbb5NTU+dZqlsmx6DyYuuvlgX3c7i7H7H4HP7C4Rg5fufObt5LN3pFiGyqWm8h8K9LD1dZPF7Peb3/2PmR0jn+kWbr6RXsJHz9nJ4OsiWNEEj3pTcDqNPhSHAlQCpRT18SaQCVQAjp+xKYzhNlXXT4UAfpKA9tyCjr7RpbpXIAQ0smG1SvQa3qhCmCUAAORAUWkM4Ax7Sih+rz4GgaHo3NDQNXkoD4igIOl3tld42k+lDpTbBjoY58VhuaSikJrRuIPx8rIghEMjQ4t/OD06VPA15aHH50hSMI1Sgc3VaOIc2Dyw7pDJuc5CCWkrfyFUqomWPNjbdjhsD0T4+FVAjmw79uzSw+ApgOtO0ljvzftoA8GjaSFDj9JN/lSgIK13PxmVHGMrDc4RCz2N6L1UVw58bWqOrDdPRlGkic4uMhUHTceorhk7II/Jx45Glg+vW3WnI4M+757Kj57EfPG1sWfAFjeUBe0dD510Yc3FmeTErL6mD5OPLjvfBKwsljKPabaV6yaZ5rq1oMR5E2LM3Ixnlk7CHNI6H41onBi1JonB80zmcR59oPy4Qs7NDf84+etaJyc9qwSJcyOAOmazeCNjx1Xp8qZEEB3ByfEsaPeyI/cH1Bvqfu+ApNSaUTRnnMZmHmSD9M1QDeQ9RUpGjZFen4jzpkndbE26DrQM4VbfqQQKBHSRYDQaJQB3cdykINPGgcidSfE21oA6QCddDZKAOkrb5i/Wgo+svtpm/r+zOJeDudHH7KXX0m1eLlUWPYprVF4bxj3jfI0mMdOh6pXNBomA5/GDa70tAH1EXNQ9DVMrs8DWOduAcn4AUpNSqc7xTpmlwAaDo0j+Fb0tAokzjlOGkY8yRgg3IUXrtrkTOe+NrVDeDluB9ma0g6+IArLJTyd3Xz+GTeLlyRoWqEChD51xWqerWwbm94c1xfHTTcbke3ksQsLrpfVKeLArW1MO3ldMcrc27t3kX83weK7Md/+MJIWOmdoVLQTXFZxZopJpJ/QfbC+OcxOaXR+PRAdakpak1xfcWRwUwETg6AlCNbdUrbHldDmyYFc0nhu7sblIWjeA7+ldPjXsYeyrnjZeu6E82QyKWi3ibC9daZyNfBE813Z2t27C6Tn+Yw+PYwK4TzNDj8Aq0nZBKRkfP8A/dj9sOF3Y/EnK5yRihrsaMsjLh/qelqFy8IXKpl/N/8AeD33yLHxdr8DjcaxxQZE+7IkIPlZtOLeWS7N7IzDnfuP91+7HvdzXc+VFBJY40EnsRJ4bY0p8UJVs92VP/i8aST3MvKfk5BuXPJeSdbkkmqUfBXBfIRFi4kZ/tY4Qixdc05KhBbQQ0DYGjwbapHJ1XEoLoPDrQSLbDI/WwNiTrQMX7UUae4/cVS2goAZkzsXHGoVtkW9NITYBNzzW+mIFztB8acEOxGT8plSgjcW+fjTgl2AZJwvqfuOp8KqDN2Gvce9doQDw8acE8mxxmNPJ63adRqSKXJIpUbC4ONVDtJJ1Ws3c1riLJwfCRT5DRkhWaIK575Drx4zeuzuA4iERCPHY54S5AJWuG122bNRsbTxWO2CNrWRgEBLfzFNGT1LHjbdu3U2At41SQgwNQDZGjvO9AxL4HvJ3gl2vgPwoiSpG5eN3tQt1v5Vm6SUrFZ5ntiLIY5Rcn1AD+Nc18cHTS5mvNdnCIu2R+m6qNawmGdlbopOf2XKJm5GIHQ5DHbmPYdpaR8K1rmY3Wtkan9v/uXPxft8N3U4sLUZHlldrgNPga9HB2ocM8rP1W9Ub3xvIYuXA2XGmbIxwUEFVBr2aXT2PHvVp6krG5zkG709K0Rk0OhrndQR1K0yRRZIqj6QaAOBsupai/vpgKuCSb3S9MTPmL7tZM2T3pltJJEDGMYvQa2r7f1lYwI/Hv2HJy7lp8FMbM6NWud4ftr1z5t1keEu5peDYeFIiCzdgBmT3bxUT12CUu+Ja0muLuuMNj1PUUT7mOfk+qWP9AYNE00r4Bn7miJ5rurhu34Pd5LLbCQpbG53qKeArfD18mVxVHB2+/g6qnJZIzLmvvfkOkdDwWCjNG5E5LV+DRX0GH00a5GfDdz9u1jDX/Vmc893X3B3Gx0XK5hdCb+0z0M/DrXrU6GFKIk+Xye97l7cubX9DNOc46TGjkmiO9h0vdRpfyr5vv8AqXjm2PVH6B6X9m/O1jzOLfPyU6fNkeQ0lNty74V819D75OReI+WV7pAjw0KCT4aUigyKDIc0SBA4ajp50hjzo/SY9obuGpC+ZoExsYRBU/3G9B/EGmIJj4/GiDHlojcdei+Vq0x5LUco58+CuajrZSmSUH6R6QRWkadoBK3Pga+u6fsqZFxtpY/Mfa+iy4G74/uqEQYpD1XcurhXtpHyVrjrsI7nJJpVwZ/kGTA4AgdPzUoL5DJ/URn6lGttKC9GNy8l7ALpHXApO0FrFJG5PMZU/pjlIHkbVm7tnVTr1rujW/sZgcg3G5Llp9xZM4RxE2JDNSK+e9lkmEfYeiwpO10tNjV2vmFmsc5xKKb/AIV4Mn1w6mYblhNlFqJHA4GZe0lyt8F0qZGcLsqM7g1y9ALrRICHO5WchrQ5oW/SxqdRjkQzoCdxJJsNSKepSCzNlCH0uLXEX6JRqMHbmPYz3MuRAzW+gqZBFX7g74xscGLHerm61jfLBrWjZRcnvXMkL3MkOx2gX+dc7ymqwlfyufy5iXSTEKT16Vja7OimEhp+5uNx5WxZuYWRP/3pGHc6Nn5np/pF0pVTsza1VWslZ+1v3J4HsXleRxe5OHi5bAyJ0jzwG+7A9u4b2FwILXghyWI6Gu97HlvUh/uvzWB3Fzg5TiMUZMHsxxNmf6pCyMIxu4ISGtRrd1+i0kOqAvtN9w+X+2Xcv/L43GnN4+drouQwJCWtfG4ILlU2lHVpInWQqHuXg8377cH3PwPHRcZxx5jH5CDi9w9mJwAc6PcNGulBIHTdVEtQaX3TxZ40ctxHHYrsuTDy87uLtnFYXMly+2+cd7mdjwFq75+PnLvdZ9RYdyJVboz03PlvkcQYeQ+CKQPxGf7WQiNkjH0u8FTWoNBr9K8eogjcLKoUeVMaUim4jTYgr49L0BA5/wAZkEAsB8UoFBZO1O4Iu25HnIg9vJc5uzKIWMN3BQ8C6eJFJoGpN54KbtzuOJ3LY2RH7/CSHPGFHKzHORkuG4TMNhZwHtOBFxehODGyGu75uA737d4r7ptLOG5vnMvP4nkYJA1sc3Iccxjo8p8aAf8AuYngZDEQlTrWr1Ulao+e+7eBx+GzMKfABdxHN4MXKccFvGyVzo5YCephmjkj8wAazNEV5AQbAtNif5UCFRySQuLoydpCOYfpcPBwoAcGOJ2PlxgCY7yQL6gP6m9S39tA4Go5Xtc2RrirULXAlrm/Ai4ohMFZrYl8Tm8onZPNLLGTdwcfcCdU0Nc9sK8I7Kdl+S08Zh5/JwGfic1+REwK9sb3b2Af1MNxXJeK/wAkehR8l9rD4md2YSOZkTtY7QqUFYv8bNZvXyXDtvuXv9s4hxfcyGGzTIDsX41yZceOJk6KXsbXgTZUnHQHkGj9Y5v/ALiL6gvWxrz2zaCsd2nsFkL3c77LJU0jT3FStac5+0rhO5k7+1YeUb+u4dpdx0rv7Jf4CvRrldd9zC+KvhhvGdlnHlb7pKE+oIunlStlbISVS3gY3FxRxxN97Ml9MMSKvmfCuW94OnFjeR/Q0HsT7VZ/LSs5/ufdDguNoXhHOGo2r0rTF13f7raI2z9uuJcKblN++P36Z2+2bsH7dvZBJCDBn8jALQhEMcRH5/6nV6uPGvChHiZMrrq3Nj5Slklle6SV5e+R2573nc5zjckk9TXWlCg89vk5ENv9RQBOnSqIOqRpYD8KBHWjVenzpFI6Lgi3hegDniE06GgQpqaHqpoGfpMTtL3KNyW/0p1SuUD0bmuYZnDWx2ar86QgplwS5xVtyqdasY0m552m2pCXK1I0LnhZMxscgDiCLElqpppRASPNdHAwbg0N02tFUIdcpIG0lhvTAcY0v9QcRdEGlqQ0KDQdx3Aof2UDFgh7nNCiQeB1oQHZpo2uBlLRZfUQLCqFoReV3V21gsccjPj9xmrGu3n4WpqrJd0vJXMv7ocdu9nisKXMe0+khpAJ/bV8GZPMvCHOJ7h7y5HkYnz8UMfi3H1sedrkPW/hQ0gV7SXmaZhZ7TgrHBC7oFrF66M6dmZ7zvBnj37m/wB6OVXCT6WAeFeZlxOrk78WSVBXJg7d9YHg2IdPjXPBvJF5ePGAS8DcfpMhU/hRASZl372WzloH8jxrSOTiBL7bWyBo0rtwZY0Zz5sfJSjFXNcxxjlaWyMPqabGvVWqk81isTKy+PyRlYUpinYvqBsQdQfEUxRJHZ/PctnSOGRkuAVNrPS29WZEaXEnc8qeqldPGgR4pdRroehoGcKIuo0AoEeUH6emgoA8LttY+etAHFKoRpqBQB1SbN/ZcUAcUaKh6rQEnQ1xO1nqGqi96CoCI8Oc9AweOutS7I0VGz6f+yU4HasOEQkkMj7pYh19a8nP/I9PFpVGqtExb60IB0XSuVm4iWF0jS5PI2rOCkQOZgdQ1SeidaRsiEm49z9zSAnj1vbrRJUkDyXbEUg92xBsRqlXW8FNSUrlO2fbduijLXhSCdDXTXIZvGQzWPikbDKUeCqmlZTsdeHJ4YzyXH5PKNZiY5DXukafWUBQreljuq6s17ON5KqtdzTeC7gyOKzImOJIaGskaNCgS1eVZS5PTddEa3iZOJy3H7oij3Ns4WKnpSTk43V1ZES42T75G0Bgt41OxagqfdP3Q4n7fO2wS/q+bGmFEbA+LzXd1+vezlbHD2c9KLXVmU9xffP7o91tex3Lu4jjCoMGIfY9Pm76jXuVxJbnzt8jvqlxM6nyMSaQz8llz8hlE3c9zpFJ67nkmtko2MG6rcKxHRkLiYSEmznX+dDNKteEHBmc8BXCLxA8KkvUc/Sxgq5xkJ6HypSEDrMcEgtYA0W8qcjgfER+skAeA6fCkM6fZF3EO8PlRAhiTkceC1vFCf8AGlOBOyI6fn2hx9v1eBp8SHcjJeUypQUIa0HUHWqgh2A3ToVcVJVBrTSId0N75ZCPbaT8vGnBHJvYeZhTSXerU6aVLskUqWY9HgK6wLuhOo86l3NViJGHjdrfUgb5Vk7m6oHx4sEIUXC3J10rNts0VYFsaSdsbSUNibUi4JziYzHK18r76lrayszWpsPanJxwiL2ozuKBXKv7K5XuUzWuHnny4x7khaDbaCiCgyZdOOBAa0HcUsNa1qjNk1HCS3w8a1JHBAG7kAB1BPl1pQB7YXhG+oG1rCkUMyYbXAbm/GodZLViNz+Gge0lw+AT+dYXxo1rZlH5fhgFOPEpSyWSuKyOytii8v23LlscyaMRgak21qU4OlNMZ7Z7r5vsPLbFLJJncUXI9hu6MG3p8hXbh7Dqzlz9VXWh9H9r92cX3Bhx5WDMJGvHqatweor38Oet1ofP5cLo9S1RzN+oAbdFrpTOVod93c1V1snSmSMTSva0ht39T/KqAGOYWkNUuT8VNBJ8r/dPNezvTkmFWlWqvw6V9x69/wDAj8f9zjnuXZSf+QaCATca+NejyPK/EER50hsqN8NFpyZvGW/sjlTg9xcVkoNrZ2B5P9L/AE6/OsOzXlisjTo3/F2aX+p9B9/98Q9qcS32QJOTyAW47B4pqfIV8h0um81tdj9T9z7ZdLEo1tbb/wDc+auR5fkOVy5M/kpnTZDzd7zYL0aOgr7HHiriUVR+S9jNfPfndy2OMyCWDafUllvXRJwuuouWTcwBwUkWShslLUis2EyRua0/2yEc01laso7MdoZSuR4B0bXZELFBVRrY618z3/WO330/2P0X037Bx/4szn4ZHxYEjWpGxHG5B6Cvk2mnDP0el62rNdR1pmieFn9PQjSoNAyHDz9+9rmyxKfS4XvQAXj4Ge9zxtcXAK0JYl1AQPt47NlJjlhc0s8bCkSx5vFMYNz5A2dRY+FUrCdUx33fZDXPerGlN7fLxFe30/Z2x6X1R8f7T9dx55tjUWCyRt9wEEO6i4WvrMPYpkrNWfmfZ6eXr343UATsiZjXNLVC6da3kyVUwXIlyHM2xsQnqdKTZrWqT1InKwZJH/3HEk3SsnVnZTIlsH8B21m8/nxcdgsNz/ekSzG9TWGbKsak6uvitnvxqj6q7b4aLgOJxuLhiBjgZtCC58Vr5HNl52bP0jqddYMaqi1YLMRGrGgN1IsKwO5ExjwY0hLREE6UFwPO4zDe0AtF9bUoHBxuBgs+oNt4ItAQhuRvHsBKBiakdKAREZXJ8JAXB72eYKKtTyQQVHmO+uFxGyRsLXPujAlZWypAqtmT873rPkzSCGUshJVT51x2yNnXjwlC5HuPEYZJMnJB1KKDesYbOtYys5nfmDCyT2D7j+i/uo4mqgqWZ3Ty3IFwa7Yxx0VE8KbQ/wCgJHDnzRZb1LnOx5S7dYAbVcQvkKrHZcoFmq+DKlmTPx3BuPIjdrNwJUXCnXpeu88bYHi5GWNzQ3e0f/duLNKICRyfl5iNp3l2hL3k0QPlAKyaR84l3ETkrG5hQggqETTSmQ3JtHa/3JPP8fi8Fz75W8phSjIwc2CUwZkU7AgnxZvyTJZw+mQWcDU6rYniEGTh+c5bH7hBw8TkuOk9x+czAbLxmXlwOt+v4+/6d7h/uPja6JxvtFKRw0UnlcKXIzZJpfayAXOV+KWviClUYG2DfDypyaJC+O4jFyZmxMRrj6S15AI+C1MjaNe7R/7fO7u72mTio8SOJrdznzzsisuo1WtVZLc54s9EP91fZHC7dx3t7jE/uYzv7/8AxrGZEZYQEc2QefjWdrt7FVUbmIx8fwnF9243t5Dz2qydznjIaTIIWera5jDclBbRapTGpT12Du6u9ncjL7EMbmcTDk5ObxuDKd0gy8zbvneBbc4NHw0pyFaxuUvluSyMpuBjTOL2cdA6CEf0iSR0zgB/4nk0DZG7gVBUeH+dBIl52q0H0u1PSgBsEtIdES13i0kH5UCDHxQPx2ZMkoZNISrQ1AEspAoLgHkY+I+qwcha4XBHkaCQjB5LL43IZl4GRJjZcZVk8Lyx4+PQg+BpWqraMulnV6G7fa/7lQdx8tidsdy8bHLyOSHDE5PGaGskMbS8iaM2aUH1Nt5V4/a6vBO1Wev1+07tVZqPO95dn9qYz25EkRkH0wwoXrqiivLWK12ep/FSzGO5PvHy3J+7Bw4OHin6X/nc3zrvxdKNbGVuyl/Ez+WfP5GUyZcj5pSVJcS7XwFdqrWq0OZ3tbc0f7e5XP4D24xjMnGOP0OCIp6VxZ+L18m2OY1NH5TLixYg6CPflzkRwQNCuL3FF+FcTvCOzHh5v6Gs/bT7Xjj8f/5P3O1r+QDS/GgkCtYSFFiK7Ov15++xl2e0qrhQzn/uG+/UnDRy9k9rZH/47kZtz8yI+jFjePoan/qOBv4V6Sry/oeTa/D+p8fue57nPed73EucSSSV1JPxro2OSZ1Eqi2QeOtMTPAHTqOgNloEeREHiq/xoAUAGq65tb4UAeJCg9R1/bQI8SRY3UrQM4Qdtinh8KBM/SprWBzJNCiOsu6uaBimkXF2giy3AogDiNRA8r1KWBoAebISR6b/AEk9PKmORUUTiS+QoG2Qi99KAFgs3q1wLblfy+HWiRCZ+Y4rFB/VZsUQCg7pGggp4U4bHKRXc77kdq4hOzIOU4CzYGk3W9ygq1RsyeWqIeT7lz5Hp4LiJ5nnQvBIPhYCnwjdi/LOxwZv3R5tyxxxcdiH80gbGb6qSppxUmbs637f8pltfnc7zb3xNBc90Li9gA1KqlHJfAvx2e7BsbG+3PG8fPymLFJygx3Nikc9UMj9Nf305tMCiiUj2N307Aw4eTxeAhi4kv8AabIwjcHN1Dj0PhT4a7gsnmBeR3LnnNDs3LdN2vy7C3GyYvS7GeejiLgtNSqoHkc/Rkl2rzOXw/JO7U56USRv9fGZZKiVrrgFx1Wi1ZQ6XacMvOZhtzMV2JkRgqPkPAisL1VlB1ptPQy/msDI43Jfi5QK6se30tc3415l6Org76XTK7M7Hid/claHXIA9TqniaSAzyROY10cBc7xfa9EAmZN9w+zxlF/M8aGnMYFysaFuo8RXdgyxozly4/KMqjc5sh1BFi06r513nCRGc0typPDUfO9aIztuMAlQoSgk8T0PwvQB4W+JoA4oT9/zoGcUnUp0A6UxCgHPKAFT8aQ4YRFhZBILvSOi+FS7GiowmLjorbjvPgKh2NVjDosZrSGxtA8fjWbsaqiCIcVz3hrUXrUtlpam5/bJzsfCdjNUIjmgdSK4MjlnXGhsHHZEczAx49f8awAkxHI9qFoaPLw0pQORmbDiIcV9WlZwaKxDZnHM3bmtIARSdL1LNVaSPOIzcY9u5wKAp4dKk0TA8ztmTKb/AHAI2nQmqWgciic92tg44c4yK9tynStq5NYCDOOYc+NjxE5zZIjua4a2vXRWss0eRqv1J7js9ubi4+UbF7AT/wCLqK4MtOLaPZw5OdEy69s9wz4WQ0PeDG7ULZF6VyNQzS9eSLL9yPuDx3bHaUnI47g7lcxvtcfEEX3DqT5CuvrYvy2PI7OX8NZZ8o+zmcjkSchmPL8mdxkke4qSXXOtfR1SqoR8w5u5tuFf8SJAkr99tBpTkHSdxePwkMUok2bgURpo5AsSTkl2wuRGIwHoiVmbwdLI2BHvBJ1v4UxaDf6rGYUZ6vMU4JbGJeSay79rAenWiBcgCbmQSjBuHQnQfKqgjkAzZ+TIUc/aOob1FEC5AT5lJVy+I8qqDPkNOlc6zfqWxpwTybHYsPIlAsjfHxpOyQ1RsOx+KZq8bnO6aWrN5DWuL5JBuNFC1EC+ArN2ZtWqQ5HiyTmw2s6E9al2LVZDIseLHsl00HnUNtmnGBxsUkv+23Y03U+HjUyVA6zHYy71kd0AHSpbKSH2Rue4NYNqaAeHhSkcElhQNikaRdy6NvrWbZaRonbgynhggagQKU9WuprCzKa0Nl7Zw8hsYcQbJ+PxpVMWaLx0TgxrwEJ6eeldKMWiagicLHROtWkSwpuOCLhLKQa0gUnSyKIAnQBSaThD3BZZ4xfcAKydjRVAp3tlQAF66eFY2cmq0I+fHMhNg0AXQK6sHU1Viu8lwjJQTtUDU9K57UZ01sVTP4BqODmbg7VAlY6o6Vcr0OPzHa+V+v4GYxEFXQn/AG3DzrTHmdHKJvirkRrfYn3NxO4Xjj854xuVjCPhcQAf/Cete/1u3z0e54PY6jrqjUYJI3BdyhLX/lXqJnltBIZE4bQD6utUiRBwoAUa2/iaYj5o+9fBMb3h7yWmx2OAGliQtfZeqfLEflH7JOPt/wBUZwOEIP8Atr4FK9ngfM/5Jx3HvhaT7ZSjiH5U/Itsk8DmlgLS27SLXoYQmTHNd0cl3BmRZnJv3SRxtijZ0DWhPxOprHDhrjmDfs58nYc3cwoI/wB5jlXRVrY4+LOQzxB5AcSbVKYWq4LXwHbnN9yu9vjMVz41R0z/AExBfP8AlWWbs48SmzNup67P2bRjrP18F5h+yM7mj9dyTY3kK5sbVAPxNeHk9zXwj7LD+pX4za44PsJiSkA8o4r0DQlY/wDt/odn/wDScf8A+wZl/wC27AmY5OSSYmzmtS3w8687t58ef+2Ge9631+fp6fkdl8FO5r7Fc1wEr5QG5nF9JWA7gnjavmM+V4tWnB+h9DqU7OnNK31IRvEYWGwxMDWyE7S09CPjpXD/AOxr8H0i/VcrU8kId7zL47Iy1On9Rsoq136GNv1bOvKGP0nJhyybS93glq1r3cbOG/692q7KSKyOG5PJJlH5iqXUfA1suxjfk4b+o7NN6MEl4rJbG0TxuO0792uptVrLV+Tmt0c6/tYMuXG4+zjvcQVLNpN08q6cXbeJzWx5/a9R+errkoSOFxXOcv6IOJyA5oUEMJafNTpX1XV9xjyaW3PzT2X6vlwPlj1RZMT7T995qObg7Y3FFe5LeJCV6L9hiXk8Snpu1bapfO3/ALAOlkE3cMxciLDErQngTrXnZvZ+Knu9X9be+V/6I1/t/sLt/t/FEPHYjIm9SArjbxrxsua2R6n2HX6WLAoooJ1nDYbFcIwCLVgdkD3/AB2I0LtAQeVA4Ee9gQ+gOCiy21oBEdnctjwtJ9xoOnSpbBlA57vjGwnljJFA1LfGs7ZIBVbKTyH3M5CQOijA2XAPVEsa53mZosZQOW7onlc+SfIRp1VyW8PlWDu2dNcRROa784/E3bZTLLpqt6mGzprRJFA5Tvnks8uZCdkZKAjWqSKmNivn9ZkvJlkLiSqGhtDSb3CYMNHAoSSfilRaxoqklBisCbgPHwNY2Z0VRJ5DH4vB8tmNbta3G9rcb3ne1tq066m5zdtxjM35QMbN7TQEa1rXeaC5r0keKwAIoK+oBSt7UyR7DxzyGScVrgyZ7T7BdYPkFw1ToT0obga1GnQTtJa5hD2OLHsIRwdRIo1JrkoAG4UjnASmMLMwI+39Sap46+NIodw+6ORwXbZHe+0aTApJ/wDUNfnSgJHn83g5bzMQI5nDULE9fi2xpQNMS7OmIJbkkjUBwa8fIhDTHIRid2dx4BIweUlx7f8AozTRaeQclKCYQvK7w7pz2FmVyuRK14RzJMiZwPkR1pjSS8ENJkzKr5AwE/8AptT9rqAA5MmGMEt9cjtXkkuPxJpikZxZXszI5QxkjwpMch9JaQQQfC1MlDT0DyW2YCUuqDwWgQlscjw+RoO1ib3j6W7jZfjQB3a0D1ElNUoHA62VsLopYAHStDgdwVdyj1NPhQEhWfxHK8QGQ8hjOx3ZMbZoWyja4scNzXBpvcaUDIwC6hPIUElp7Pw+4C/J5fg4nvdx8eyaaNqmMTq23gSFrl7FqpQ/J6PTVp5LwLMOZmTuM++TIVHBylyjVVrFNJaHdZOz1LNwnYXJcmWkxmOEpvJHSufJ2EtjSuH5L/idgYHCwjKz3t9toUSEoBbqtcVsztsdVcSQn/5jxcGQziuFh/U5R1e0ehrRrbyqLY2lyZ0VqrWSRtX2r7NE2UzurnwJZ0H6aB5AETP6gPGn1cStbk9h9vL+OvCu5Gff372ns7jn9vdv5Ad3HlggSNIe3Gj0Xb0KfTXsVTs/oeFZqil7nxRPLLkyyTzyGaaZxfLI8q9z3FSSeprqhLY4rWb1EOKKvgqi1MTZwkDRdFSgR0dPK9ACkUqR6holAHQDo4qFU+FAHCNPDqaAaO23aE6G9AIUQA4tOhuEoKg/SlrNp3OeXJcAWAFc5MCZTDGkk0jYAArtx8Lre1JAQub3t2rxu8TcpE3rsYfccny61aq2Q7JFby/u/wAO07eLw5816+hybQ4/gTVLH8i/IgId3/cXnFHE8M7DhX63tJKeKvQVXCq8mbtd7BLe2/uDy7Wjl+Wbitep9pj1JHWzEomqEqWe4xndk9m9vujd3VzEsmQ8F0bL7nN6nqbUKzewOiW7Jf8A4rhMbAgzu0uDh5rHkH++56lqXuHXpS/JTSWykV2Z3jl8pzh4ybHxsSBrXlmK1iPL22IB8R4U7VhBS8vYvnJ8fByOI7Dzml0M39DiHDzUaVmtDdpMo3Idt91dtw5P/wAbzH5nFTMd7uFN6ntaQhI861TRzujrsAfbeLB5DG5nguUYDLkNYWxkXc1oILmjxGtO+jknEk5TBm4PI9n5k/E5+HJmcBmKx+1pcx7XfTI03Rwp76kQ6uB7tLgMzPnzeJlx5P8A43k7nCaVu323j6HtX81FrFUpOngKzO1OUxseDjOV5jEjwsN5fjZrj/7hoBs0eVTI3Rl+4nuPh8t7OMgz/wBRmRRgFxsZNouQutZtNHRWyZzubg4uawvZf6chl4nE6ORUNYZaclJvS0MxnOwsjGkdjyRNgnjcWPW5Vvn51wtQdsyRwgJe5x3y7Tc/lpDOTYjvbc5jWxblCEAk+K+NA5Mf7/7IOLI/m+IYXRG+XE0WaT+YdUrvw5fDOPLj8oyvlGJIyTo8Xd4kWrtRx3QCUBQH4GqMxIKBGm60AKYx73egFylLeNElJNhMXHzPUl20f061LsWsYVFx8TbkbnakHpUOxrXGgxmO1pLQAB++ok1VUOsxyRbQ+NRyLgIbjgdPxpSVA8MZoHUg9alspIlOOxAX7nBT/j8KytY0rXU2TsTG9pzIg1zw78rW7ifh1rktqzWzhGycN2N3LnvbJFi/pmO/NKUKfCta9e9lsc1syRoPHfbHKELf1eb6/wAwaB+810LpuNzG3YYuf7XvBWLNLnO+newJb50PpfDGuyytc/2jmcPEcrIjMmMLOlafSD03DoK48uC1dzpx5uTgo2ZO+Hc3HhAA6i5NcLZ31UlfzMzMcSHyq06Nba1Q7G1aIrnIYxymub9ZfoD1AppnRBQ+e4Tc5xI29bDp1FduPIYXxyQGA44K4ZUsBJY5UuenlVZa8tTbrZOP2snsXIcyQBQb9b3rgvU9ettCh/cLlJ+T7hjwnO3Y+GxscTV0W5/Gva6ONVxyfKe2vyzcfgCgZIRoGsGjiVrtPOUsL96CAgyT7idOn7qQ5SGncqwWx4t5BQHSjiJ5BqXOynK+RzYWdAqmnCIdmwGXPiAsszxoSbGmKQSbOyJLA7B1A8/OmS2DPkBKlxJ/nTgTshv3nGzQidOppwRyE+1O86FD5+FEoUNhEWC8gbhuJ/L4VLuaVxskcfjQocQgWsnc3rSA5jYo0a31eArNs1H2RSSHcG+2PHxqZKSHooYWnrI/+NJsqAktcQN3oaNB1/CoKgUyJjCu0uef6qTZSQRscWgPsVselqksdjx9xSIFxI8CAtKQRMYPbfI5rgjSA5LIl6ytkSNFUv8AwX2+e8sdIza61yOvwrneVjg1Dgu0ocfa321IRLWWpWpFmaHxvGloa3aQlh0bpXTRHPZlkghbG1oJuLECuhIzYW6ZkSWQ9SfD4VcwJVkalzQfUTbQFf4Vk7mioDzZMhadx2tbfcSgSs7XNq423CRA5ncfBYQd+pz4W7SS71Aolcrz0Xk9TF63sZNqMgOW+6Pb+FCf0Un6qboG6L51hbtPaqPe6n6xnyv7/tIzhvvBw3IZ0XE5DCzPncA1jPUAToqUVz3/ALkX7L9cfVry5I0B5Y/6G9EREFdb1PjkRGVhOkBDAIwfzG5rntU1TgrOdwcbiTI5z+ptb4Vzup0VuVjkO3o2yDIwmHHyWHdHK07XA+PiKSbRq2rKGWjtP7o5fDvZx3cx3NB2Mzunlu8PjXrdbutaWPJ7HRnWps/Gczi8hE3IxJmywvHpc1Cq/Cvex5FZaHiXxurJiORhAO5SR+2tjFmUferisYx4PM2Vh9h6dQ82WvpvS5YbofnP7j1ppTKvGhkrC17bMt4V9ZJ+XOUMSsc6wZbrUmlWD/o43n1heulBp+RjUmJCTt27R4JSKV2Cy4kJBDWoeh/nUwa1uy9/bz7UHmYxznLuc3jg4fpsdE90f1OP9NfP9/vfifGu59x6T0/+UvyZP4fHybxgwM4qFuJiY7Y4I7NDABb5V8tfI7uXufpGDDTDVVooRzJe9zVaocPGspZuDQZT2D1uR6pdakQWzkiDtc4Eg69CKochEGe+VjmuRzXC7TcH8aT1LrZp6FC72+3/ABvLQS53FNbi8mAX+00JHKR08jXidv11bTaujPtvT/suTA1TJrUwzj+L5vkM6fDx+MyIZIHJLNKC1iixAJSvIXVu9IP0DL73q0ry5TJe+H+3k+W1p5jKZApRIbuT412Y/WN/yZ8x2/2ulX/xqS9cf9ueyoWCOWaWaQ29bkH7K76esxrds+ezfs/Zu9IRMw9g9jhrQ+IPRPrcqltbV6GFHn5Pedm3klsXtfs7FCYuJAF9RIaCTXTXrY67I4MnfzX3sSuPjcLjjbCxjLXQAWFbqqRxPJa27HxyXHRjY17QU0q5MwTI7j4zGUvlYB8Qq0m0Ekc/vrh4f/UCf1L0qXZCIrP+53FRNcYn3GqeNL8iCWVHkfu20gshbdbuHRah5ikmyv5v3KkeFZ9aXJ6Gs3mGqNlP5XvHOyj7k2TtamgcQKxtkbNlhKPzXfnG4rS2fJDpBqAVNqz1Z01xJGfcr90Jpi5mBGjTYOJX50+JaSRTc7uDmuUefemcB/S02ohIsDZjPkJMhLndCb0cilUMgwyBZBWbsa1oSMOK0EXJJXSsnY0SJDH4+SdyNYVNgBas7WLVZLTxPaeROWvkj9NvWiGua2U2VII77nwwcNw2BxMJ/vchOySV3/3cJVPgSa7ejLlnm99xCMczn78mU6eo+deseQDaRkn4CglisaKTImYyL1TEgxhv1OcLo3z8KGJFmwc7G5FrjnkY+SfQM0D6nCwEo6fGs4g1mQ7N4+LLkYOScY3PjRvIY0fuBz0sJGAjd4FwQ/GiQaKxyOFNiSlhLZmN+meEkscPmAfkRVpkNEeeh/Yaok4FAKOItqNDSCRQlkGkp00J8KBpsW108gUPXoQSlA5Z4wSuQySqNSFoAbcxoUAkuW5P8qBD2PD70rImROfM4oGjXRf2UMaQ63j3P3FgU6I09KQ+I27FkxXD3C0B3pc0O1AuFb1piiBiVwLiGfT0HS9BLLl9qP8A45id3wc93ZF+p7f4GKTk58IhW5WRA3/20Dv9L5S3d5A0TAoBu4+THMZ8nOcnM6XkuR3ZeduA2xySOc4RRgflARKhSabIqdz5EVZB9NfYrh4uJ7Hm53Pkjgi5PIfK58hDVhgHts11Uh1fPewu7ZIXg+g6NGqT8iO5u5vtzLykcfFYzJeSc8CXMYNsQHXTWuemPJH0PSSrP1I7k/ufx3Fg4/ERCeYekORGr0KVpj69rbha9a6Gcdwd5c1zLnPzspzYukDCjUr0MeBVOLJmZpf2s7cxcNmNkZjQM7Oc17i4Jsj1a2+i6mvH7eV3vxWyPd6uH8WPl5sa33n9ysftjhszIwy1uMxrW3UK8BNjU8TXb103ojx+wkvuZ8acxzOZz/KZXMcm90uXkvLySVQH6R8BXtVrxR4d783LAEO1CEHUimZweJW50NgnhTA8E01Go6WoAUCAiCw8etAHAp+oEAXJoJkUtkAQoqeNBRzct/xFANilKEqfADyoAUqNBIUf41oLPtufN+5/MEx4sX6BjrhxDWBPi5TURVHM3ZnWfbXneQSTn+be9pILmRl0ij5lKPyLwL8dvLGoO3vt3j5s/Hy+9m8nhNc92LkLH7hYFIZoCafKzJiqB3d88Ng8bi5vbfF4uPtyBFn407AJ2RHRzSNVShUfkbsvA5yPeXcnAdyQSZc4yu3ctomxY2jayTFkS9vztOtNUTX1B3at9CA5XmncX3X/AM725nSZWDvE2x5ftaX/AFREOslXWmkMztaLSi0/cv8AS8929w3dOCPcidIYXuCej3GrtI6EOCVONQ4LyRZcirdv81nds/pM7hso5LJyf1fGlrkbsK3RQFFw6qsk9yK2ddif5Z2Jy74+8u1g9mWx7X5+Ez/dgmJtIANWn81StNGO2v3VNT7d5SfmOLhzcnGfBk/TPG8FpDm6kA9DqKwsoZ1Vs2h7K5/huOlDcvMjjffc0vG4eSDrTSYOyRWeExe0ua7llzuGml/5XHBnbGFiiJNiniD1rRz5MapTKIrl/uTzUObkce3jmYsuM4sfHMd5HmPGqrTQi2VldyO7u4M9ro5c9zY3AlrYUiCeFq0VEZfkbBeH4flu5nSx4bffkgID3zyIQHaa+HjQ7Ko1V22Lzxn23zcaaPLzOREMsLhIwRC4c1PzHx61lbJJrXDBpER9yNhe5rwihwQqdFrI6kVXvDtuLkYHcljRA5cVpGj87B1Tyrmy45Nsd4MwlY9y7Wu2tJBDQg/Hxrkg6tyPlY55NwifTq6/nSkqADIxg8OL2b2v9JDtCPAjrRI40MT+4/Y+TgFnI8ZEZMF7yXMAvET0QdK9DBmT0ZyZsLjQz1vG5BQvAHl1rr5o5FiYVDxrWlS1f/F41DvJqsYYzEtYAEeGtRyNFUeGIpDl6oVstS7Fqo8zHU6H5damSoH2Y1rhG66dal2KSHxAz6XFfh0pSOBxuNdAP/D5/GlI4JHC4fIyS0MYUPU3B8PwqHeDStS+9pdkfrM2CDLkGLFI8Mfky2awHqVrDlycDb41bPr7sP7e9s9uQxvwDHl5RALstxa4m3TwFenjw1rruzy75LWID7jf9xHZn2+nfgY7hy/Nx2fiYpHtxH/7yTQfDWrtljYitXYxh3/dv9web5FmJ2zwsGRM5yMwoIpsmQr0LmkJWLvfeUW61S1Z9Z9gcn3Pz/bGDyfdfGjh+Ynbumwg7fsHS/RfCuqjs1qYJh/dkcx7b5EYeIc7LOPIzHxgn9yRwQBTbWpyqatFJxqfOnJcHzfD4wl5fBmhjLRueBuYClwXDRK+evitXdHv489bPQrjoP1IIjZ6X33HVDXJB3JwBycXIHbSS5i6j91S2bpgeVwIlbuey5BQG6DS9NWKKRznbDGnc0AKVtf91dOLL8kXxzqVnHdJjSmCezAUZJ0Caa1reqalF4czroyg94xux+5JJXkbZAx7T0ISvU6v/wBaR4Hsv/vb+QM5UTghlIadWj+FdR58jZysZgCN9xx6mgQh+dM5GsDWDQINaIHIJJMpO9xd4H+QpwS7IbMrlRoJcdPALTgnkdbjTSOJNgb0SkLjZhcfGtBBfe1ulQ7mqxBTMeFqANFgAT1qHZmqoh9sIttYqdSKmTRIKjxnDq1vSokqB9mOPSCC/wAamS4H2QkGwDR4AXqZKSHmwEqEW6qtrVLZSQ97Wg+gno2lJUDrINC0KCU/wamRpBuPxOVkECNu0E1DukWqlo4nsmfIcN6k2JUGsbZS1RF74jsVkaOMQLTceSeZrC15GXfjO18aJ7VjBY26J+81G4naC5YXExAABoYQAvia0rUxdiaxsfHxwXkBBqTatVFSdWcze5OI4tnuZ2VHDGPFwbQ89UdWLpZcrhIhnfdftFsRd/yUIjBSzgTWb7P0Z6dPQ9i/9pTu5/vzxfGyxRcPDJyIkHqe0bQPBD1Ws/yZL7aH0HU/VrNTk0KDyf387tla6PBw4sTcu2RwL3fGqWOz3se/i/W+vj/kmytO+43eXJPcOV5WV2O9dzG+kAHzF6m2Jf1Pd6/qetTXgiK/5BySTTSPfGQVdI4kWo/Gj1XStVOyK5zPexY04mAS6Z3pe9bADoK68XV8s+U9n+xYeqnXH91y4/ZfujC4zkyMqFr8/IcNuTL6iF8CdKefHB+ddj2GTszzbPq7j8tubEx5nVxC+koL1gmmePaSTEURRpbcjqSVq4QpBMnF9JDWlDolY2qa1ZXeQwpULgxoPV2tctkdNWU/meHjna4TvDTrYgVkdFWV7j+7OU7Byg/jsn3sMH+5iPcXNLfLwNd2DNar0ObN1a5EbR2H93+B7v8A/bQy/puTZ9eNLZx/8K6ivew9pW0ejPn8/VdC69x8bjdy8Dlca8AzOZugd4SC4r2+pn/DkVj5v2nRXa69sb87HzZJlScfPNhZjPayYHmOVjrEEFK/Q6ZFdSj8GzdW+O7rbdBEfIwykbrt/CrOV42h9+TDIBtjagsrQhK+NAMYypo3AAQhoAT0/wAaRe+wA6WEtcGsO6/SlJbqz6i7b9mbtrjRigCA40e1o0CNH8a/Pe3P5rT8n776vi+rj47cUGvDImLIUI1aqLXGekAZfIxfQAB4r4UmwIeTMjkdsaC9wItoPjUyJjsDXSEl1mjQDqaYIOZOIW7wFNxtAoGRmZlkN3vVu42aqdaTYalD5vm8vGldHC1WOKOaBdKwb+A5SRze4ZxuDnbXlNq2IpchpDcnc+aGru9KG/VP50uRUAj+7s5paGSuIb0Uop8aXIriP/8Az/kMdzWh5IAup6nrRzYcQZ3fnKSE753eo3aCbijmxcAefvvkEPtPLWohJJWjmJ4yKf3FnSuc6WVxffUlPjU8iljBJOVyHHc6UgdQTapdilQDyOTaGq+ZE8T0/Gp5M1rjK7yXeHE4O73J2+4BdoKmp1NljKXyv3TiALcKPe8EAHpT4lwkUzlO8eb5Mlr5iyPUNYopwVJDtimyf7kjy9xPVTRI0mPw4m621bqOgqXYtVDIcMEAPsPAeNZuxoqhsGJusxl+oNQ7FpEjh8RkzuRoJXoiisbXg0VGyz8b2dPKVlG1upt4a1z3zHRXH8l04ztvHh2tbGHvGii3xrktdsuILbjcMkYEgAaNWtsaiZGzGPv7BiQ8zwLY3kSDGkdJEAPo3oCPMpXt+uf2s8Tvr7kzC5iC86i9h1Q+NeseUNOKgAXHUUCYXjY8skgcwEFm0uDfS9pBF2p1GooEi2ZeVxHceyR0kfG90tJZJnEe3gckAUa+UAJBOgRzk2P1KFajVFkW3M5ft/KOPlROxpGI79PIC6N7Oj2EG7T4tKUQmEwIl5PCyWgGIxPX17PU0nyT+VENDk5/w7c5r3Ye14sQGkB10F7+dEigDdxeRizOL4HSMaPpPVfBKqQgYa+HGyfcEDZmAOBjmB2qRY9CCNaIAYbC6Q+hFJ+kdOq0AEswsh49RO3QEedEjgKgwIGOJmkbE2MK90nx6DUn4VMhB6XlII8d/H8ZF7ZmCZea8f3XtFy1n9DT16mqRLYAJnxv3Qvc0j8zSl+lMTYPK5znguKk6klSp1oEI9tBu6DX/HWgILOcM4XCfoQEnzHNyMonVrW3ij//ADjUN6mqroVuZ7nFCdwFlVRbzqzNiWoXNsR1HzoYJS4LtPynKuwMXi5Ml4wcOJsUUDCWsDRfQG6k15fCrtJ9JXlWqRHOc1gJcUA6aVpE6EtxqDZOSWsAjRTcVrSsnNmywlBI9l8S3n+6MPFyfVhMXJyh02RBUPxNqx7mT8WJtFdHE82dJ7bm3nO4+SYxepr5JGBpYU9prD5eIr5/FjcSz63PkhwjNPu13UzluTbwHHSf/injHbiWkkSzOAUn/wAP019D1cfGss+Q7uZ2vBnLtgftYVB66H512HnniCLKE0oGkKPXSwoKOJpa2ooJZ4EggG5PTqKBNiS4tsHKfxoJbOqHA+ICADrQNanmDYEAUHRb2oCIFq7RQvT+S0hnQSAqfjpTGfX+Lnc53S3NB5mYctBF+ow8KP0tnaz6g0jQjwptJHGnJPfbnvafMkfwPMZHuZZviSyWeSPqjf5jpUZKeUaY7/JNd69mt7khGdiFsHPQMAx3A7RKBfa4jTyNRS8blXpy2MZxOJ5HM5OXjJI/Z5ZgeWYsgRz3sClg8XEXFdLa3OePBde3GTd59o5fa+TE+LluJeZeMnewsIBN2FR42SsrPi5NarkoLB2T25y+RwWf293Jx5hwZxvgldt92OYdLXIW4NK9lModKuIZzB7Dk4PhOUxOcz35XETJMcbGaXSRuYV3tB6prSeTXQPxwoZH8Z392t2zhOwOC4+fLJeXPnyUQk2Q2VE6VfB2JVktEEcB9ysbAyy3N46DCwJXL7uMxDGHFfX/AFA0rY/KKpl+Uavj50WaxmTilsuLI3cySMqxw8QaxcnQoexh3f2E7je6s1CGxTluS21iJBpfzFdVHocORQwn7ecl+m7owGzAM93fCHLZ7Xi1/EGndSgxaWNA7+7YfzOM/lMJjXcpignY0XlhFyLdR0rGloN8tJUox6AgvkblEOY4/wBkAIhA8utdBxknxfM5/C5jcjAcGSPaWB21Q4HoR5UNJl1s0wybk+4udLdk+TlPaXNkijJRDoS1vjUwkNu1jSewoO48TCfictB7eE0l2M95WQLq0jVK57teDqxK0al0bZyglEQNFynnWZuZ53r2+MQ/8niN/wDaylZmhfS93VOgNcmWkam+Oxn821pcOo/LXMdSAy/1Fsjl6Dwv0pFoDzImzwSQPYHwuHraQCLaUS0PQzXnO0GQyOlxY0jd0AUj5101yMydEV2XiXRENfEqanoK05i4CW8dE+ws8FB0tRzDiKHGMP09Tc6Kf50cx8Bf/FOLtrG7nN0S/klqXITrBNcb2B3Jyzm/p8RzYyn92QbWjzvqKpSzK2Stdy0z/aHM43icrk87MYuPEZDHGCVI8TT4uDJdhNwQ/FdtwnYZXhwch9AUoa5bXPQrXQv/ABvC4cMbPaiVxsqdBXM7tlqpN8njPZwOWyOEPkkicA0hQqJRW0MTrOhhknM/cDiYZMLFysqKAgtLY5ZGID0sa9GtqM47ddrwQfFdoc/3HlbTE57pCpQFPmaq2etdh067e+h9qfZbmuzuwe1Mbgu4MfG4XlOPi3TchI1rW5Kknd7iKt9DWmDPV7nJmxulixcl/wBz32z46Qw4k2RyDlTfBEkdj0c8tra2dLZMyrjtbwWj7dfeTtf7kz5OFwjZ4s3DbvlinaAA0lAdzSQarHlV/BF68XDL5kQR5UT4ZmNkY8bXscAQQR1Wtmk9GhJtbHz3zvb/AOn7r5DiO38OTJihc0mOJpMcTpG7tu42t4V89m67V2qo9vr56un3MF5btvN4bjZeT5vKweIhhBdsyZmiSw0A8TWb6eSJehuu5ROEVF0DciJkzJTO2RocxzfpLHCyfGuCyPSraQDM4+BzHegA+ZU/spJwaIofcXB7y4RMLnoqAdRXXjyfJNqSZZ3hwGbLA2d0ZE+MoHiWnUeder18qTPK7mF2rPlFAeTGS2RjlGqhD+2vR3PE1WjPe/ts1qeAqoJdzgZPJoD5eVGiF9zH4sCRzlet6h3LWMOiwnNBO0W8eprN2NlQJGM9AXOaB0Ty6VLsaKo8II9SS74VEl8R9kG1EaGjxOtKSlUfZjkpuPySyVMlpBDcba0OFgbbutTyHA82NunUdBrSkodDC7QIdFOtTIwiLGfIbAkjQeNTJS1JfB7eysotDYyhNZ2ukaKpceI7GdKB7rEPgRZa57ZCoSL5xXZePBtBjBcPkPjesnaR7lrw+DxYGbpA2MC5XXXqaQob2RJCbiccGSSdjY2gqXOGnzolF16+R7JkZnd/9o8YxJ+RiCaBhBITp50lb4PRxep7GTZFT5n75cVikxcXE/LkcEYQABu81qksj+h7mD9ce+RwVDmfu13lycToo8c8dBKNnvFpJTqQTb8KfCd7Se/0vS9ar+WZ3yPJcpyDnfr8qXKeTf3XHbbwFdFKVWyPd/BXGoqiMly2YyGGP1fmAuK2VGzPJ2li1qhUfI8nKpBbG1pW9yKX46oVO5nya6JCmZ8+Sgd6pQU3Os1KXBGle3a/iWEHLx8ON0udke2G3ETUJdRxdtjS/dp168stuMeCscj3Fm8mXY+L/bxlRAOldVMCrqz869r+0ZexNMX20PcZ2/mZrhsifI9xBQAm9VbKkfIKtrOXqax2f9suVlnhmmifE0EEag2NedlzSdFaQfTfbPGz4WPHAWbi1qBxNYUkm8FrH6loTa1SNa31MdBL4MlwAO0J+6oaZSaRGZfETzKDJ8S2sbYma1yIrXKdqRZDlLnEhQKxeM3WWCncr2hjbNmz1FUcnjUao3rkkouX2RyGLkNzMF7oJoyHNliJa4eFxW9MzC6rY0btL7s8rwAi4/ufdkY7PS3MH+4nQuHX416eDttb7Hjdjpp6osPdvb3EfcXD/wCd7YyozzDGq9gKCVoFg4dHeBr7P1ntVXRv7T8695+vvN/yY1F/P1MaflTcdkOwcmN8WTE4tljeEcHCvtKZU1oflmTr2VmrKGiWxOQa5rWudcjSt0zz8mJkoJo3NBJWqOXi0Lb7Qa5BZLGwQ0mIvv22+5GJwkg7d5mUR8fI4nEyXaROd+Vx6NJ0r532XSeT/kruj7/9c9x+D/hy/wAXs/g13IlZM0SROEkbh6SLr8DXyVk1oz9TVlZJrYqua57py1wduVQBoB4VkwC8THfIzcSBe58qpASbGxxlFBb1KUxkdyXM4uEx4cQXjT/BpNwBmvcXebd8h9wBn5evVLedc1rlVrJn2T3ZM6VzXO3NcUKnxrLkafjPR8+2eRrnWLQi/wAKJHxEO5ZvqLXkNJ+NKSlUaHJNujtVvrSkqAaXJLkLihPQ/wA6JGq6jTsxrGITcHxokfEEm5zFiadzwD+xfGkUqkJnd88dhhwkmF/BNaqC1VFT5T7kscHMwGOcSE3HSiClBVc7uvm+QBBmdGw2LBanBUkM5s0ji6Z5cT1JNEoIYsYjuot1J8Kh2LVQyHD0ICp/GodjRUC4sQN2kKV6DQ1DsaqoYzHe8hrAgI6CxBrNsuETOB29kZQQMcSTe3jWTyJFrHJceL7La31ZQQBEF9K5L5pN1RFx43gMeFGQw9fq8q53aTSEixY/Bs2LICGrZLdajUUkjKzjeLxvdypI4I2X3vIH76ao3sQ7QUXnfu/2zwxdBgrm5AUEhC0H4V2Y+ne25y5e3WuxgH3I7kzu7+Uj52ePYGRiBsbD9DWkkG2mte3gxrHWDxs+R3aZU4M3EkjZi8nj+9A28WRAjMiNdUcbPH+l3410nMGw8HjIc2GQ53GDXIgBDoidPejPqj+P0+dKQSGVGNIHB4MsJAjlbdpGoXxH7qYEn+mxOakjnwHx4vKqsuNIQ2GVw/Mw3AVP8qUimAbPzsnBhPH5bXPDZHOkwcoB8bWuCj2nC7fixyUkipBOLk42LNiyiyUYkRJyYA4FwjcC0mN/9QVRuFDkagt02b2icLgnY3FR8lm8Wch3LzGR0LeVx5pN8YmYwh0UsQOwOjOiVkuUm3GsFEdnZcU5bBLJ7Jf/AG2uWzVsL+AstbRoc5YYcWDkuQz34GeMPjcaN02/kXM932hbagA3vBP5el6UjRBDmMkObtkjDtCjW/lqoQSEOn5LKUNkfM1xXbEwgD5oBalCAj8iORpPvSD3NNpO9ynxS1MTG3M9p7hJ6HNABA1v40yWhUUT8mRsUTTI91g1upOtAkhuSMtahbtQ3B1J+NA4JHh8IZWSHSjdiYyPmGm535W/M6+VS3BdFLDeWyX+3I4uHuyKvj5n+FTVF30K2SfiutaGAbxcTJcyNrkDWuDitrC5rPI4qdHXrN0Wl0kORI+EXDArjoK8/i0fRc1ZtETPIZ3/AKeJvpLtfKuiqhScGS/O0IYyVmcWMb9ARfOrroY5E7PTwXP7fxu49nI8k0pM+MY4cQqAhTXk9+3Nqp7/AKjDwVrv+gTNz5xcLIyYZFkYEDiQDuNrVePFqkLs5oq2Z2XSZD3SOJdK4lz/ABK3N69eI0PlnZ21Z4lqoqnx8EpgjjQwjwoKOBRZdD+/S9AHnkFV1UbSNaCWMOe7cuh6dfwq0YtnNzlcNyuOlrUDFtcjEcEPQ0mWtBalPMi3+dSUdsLEW/jQEntzQEOiX8jQOT69HancbM3E7i7ZxnnHmLMvHY1wbJA43dG4OIULp4inzTUM5ODWqJHC7E5vlO4zznI48XFMMrciRkLrl4u7aBovWod1xgpUbcmryZGLj4rp5ZGxQtu5zijW/E1zwdMmbc9392ozk487A4ocpzMB2MzS3ahbYEHUp0tXQqWjU53dSMDuX7n8vvPE8V+hZIpMnstYSToSX6r40RRbsJs9jj8z7w8ez354JJSFc72mMkQdVAuaEqCm49xH3dzIHiDuDDje5dj5YFZK0ebDa3hTeLygWV+Swct2b273fgN5rtyZseVMFL4xtjkfqWyM/K7zpK7royrUVtUZTy2BynC5bsDlYHYsipHuuyQdEIsRW6aexzurW5Mdt948t207/wBqDk4ZKy4Tz/bcOu3wPwqbUTHW7qyX785zh+44+N5Ti5AMgxSQ5WO6z4yEI3eICm9LGmtGVksraoq/G5UeJk4j2tR8MzJmqbhHBUPgat7GacM+lIpo5A2Vh2AtBb1G1wVVrj2PQTkyn7h9qt46cc9x0AbhZDkzGAIyOY/mBGgd++t8d/k5ctI1RRQ1ZdjXWf6vbcSoK9DpW5zlg7Z7nn7VyZMl+MZsWYFs8YcAfT9JB8RUXryNKX4sl877scnkbRhwxYTSCoJMjk8b1CxF2zNj3bHf3Ls5kR58kvI4WWjJNjCXQu0DkaPp8am9UOmRzqazKyOeJ0E8YfE9pa5SoIrm30Z2JmQdzcA/hc4tY0uw5rwP6D/ST5Vw3pDOyl5K27Hc1XPH9xpUlLAea1mbCWxF9yFcQthp+NJjAM3AD2ua5CxCC0XA/drU8ikVTP4dgeXD1KUNlTyrRXKSE8b2NyPMPc/Dx9zGENdI47QFCitKTYxyZK03Lbxf2lhY0P5Odz0KlkQ2gL0U10rF8nDbtfBYDj9i9pxF+RPi47maucQ+T8Lla0Vao5rZL23LLxOVh8xg4/J8XIJsHJaTjytCAtVFT41rBz6pnu58bd2xy7CFTDlATx2k0PYqr1MV7NxXz4cL3EBoDSXdQgrzMu59BTZGr8RiQCMA+tAtrhK42bSWD9MyVrWNYAwnqKBJwRGd2JxfIPL5WqTdGhF8qNUWrE5wnaXG8XCG4WMhb5XPmpp8XuS7loH2fg+4HDl3MZsmHgSOIiixw33CGlCdxBr08PVdlyk83N2GnCQFjf8AaH9qIdr852dnuaQf7+S8MPkWs212rrpbs4nks92XrH//AHU/Z/i/0sD+O7cwYxue0ubHI9PFVc41adKERLMv7v8A+8Lsviw+HtTDm53IaqSp+nx1/wDE8KfkKh5vhGqxNmDdyf8Acz9yedM0PE5EHb2JkOLpP+PYDkHd/VM9SvwFZO1mb1wryZLy3L8jzUj5+WzZ+Rynnc6fKldK9f8AzEgVMGsJbH032JKOU7G4fMMrWAwe09bndES028bV4WekWZ6+O/2r+gZLFE1xLGOlOqus2uWDrVgPIxBkxlp/MPpYP2rSK5FO5rtR7lLWo3q538K6aXaJbTM45ns3G3ufK0Peq2CDyvXo0zs4MmKr8FNzeBx8Z52AdNfOu6uRs4L4UgYYiLtb5aWp8iOEDox3kdGlUC1LZSqODGaDtLju6pbWlJXEdjxmIoCkGw1pOxSqFNx2Jfr9KVHIuBbYWBEG5pQ+QpSOB5sAQ9OiD+FTI4FiIBEatvGiSoCsTjMnKekLCV6oiVLskNItHG9lzSEOnULbSx+C1hbLBXAunF9kYsXrLQ5vX8KweRmnDxBYYsft7i0OTLGwLZpIBXzrJ2k6adbLbapH8j9yu0uEDmwvGRM0p7cQ3HS2lXWlnsj1MfpMtlNnBXc372ZM25vF4Pt2O2SQ1qsNvJ7PX9Dj/uclR5L7g91Z7XDIznxMdoyK37db1awVPexdDr4lsN8Z2/3z3HGZMHGz8uA/+oN2wg+JOtP7F4JfY61HDaRe/t79m4+43Zh5/N/47Kw3EOwn/wD6w4dSAennSV3dwtDh9h7ddVJ41yT8+Czdu4X2m4buV/GStmx+bgHtwf8AJsSKR7dDe1ZpTvJ5vb7vayYlaU6v/wAdyW7g7p4rLymdnd6cNBhw5BI4zlsZobjuJ+nQWNDlqLI8/Bkti/5cF22t0ylYH2k5T/5PLj8vjuye3HsJj5BrmhoB+kp8K1VWtD1M/wCyu+Oa/wAvgzPvXtmLtnmZ8DGyo8vFJLoZYiHEAnRydRW1bnp9DNbsY+VlBEYWOGExu+sjcS7QClZn0HWw8XD3I/lubixz+m41u+cWLwF9VaY8berPnfcfsGLr/wDHgh2+Rnie1e4e6Mge3FJLvNwnyrW+amPY/Oc2fP2rcsjNo7R+wc0gjm5ciKPqyxJT+NcOTsu2xNaVqbVwX2/7e4iBseNjtEzbF6KXFNK5mm92N2ktGPg4kLrsLC3olqFVITbJjEiil9UJuOulbVSZlZsOZCLAKGgWHnWnEiR3axjN7iGsF1rRUZDuBSchxgOw5Me4G4LhrQ6Mn8tflHf00ORHvic17HFS9pW9ZvGarJOxD8hxcAYQyMyOGpOi1hbGbVuypcjhvafae0MaRowfsNcrRvWxSuY4SF6uOvS241ScGq1KzjZPL9tZf6/iZ348oPqudpHm3Q11Y8kaowviVtydf3R273nF+n7qxf8Aj+YTbFzMA9K/6x4Gvo+j7nJhcW1R8h7T9dxdlSlFvkrfL8Py/b6SvaMrjXH+zyOOd8Tm+ZGhr7zq+yxZ1Kep+Ud/02frWautPnwC4vcEbGt3uW/j/GvTWQ8G/Wb2LLw+Yeby8fj8UbsjJlbDE3orin7Naq2atatvwc1ene11Su7Zu7Pt72H2lhxZnPhmXkIC6XKKM3eAaLJXxvZ9pku3GiP1Xp/rnVwVTunewTm/cvtHj4WY0GS0RN9ETYtAOnyrxbZZcs+opVJJLZHsbu3geSkDIchhd1Qqb1HNMuGSkOVjsHpk3MKbANUSqTAgOd7qgwGvEcgEjQbEov8AKoteAMd5/vnJyZZY923o1p1PnXK7s2VCjZfIz5Ly57iOo8Cazk2VQP3i9wdq5tgTQaQFNnRqPKIFXSiRRIiXPaASHIn5v4pQUqgcnNRwkMLx5k+FPcviROb3ji44R0zSR0VDVJMISKvyP3Df6hjBzityfLQ1aqS7Iqud3RymcSDIWMeVIbqlVBHIjGPkfKTI9z1QlT40MEpYdFEn1fIC+vSsmzetQqOFfpaS5dTcis2zZVDI8JyesIPGodjRUDI8RR6GE+egrN2LVUGxYEj3tCku/pb1+FQ7FpFg43tbNySAIi0eJF0rG2VGqoW3jezcTFYH5ib/AOnX/C1zWzNmioWnA4qTaGYsAZHo1z9a522awiw4vbxDWunJLiVTp8EqNRSc5Lm+3u3oy/kMuLHLAvtqHOt8K0pitbZGV8la7szHuP74tAOP27jbgFWeTp5jwr08fS/8jzsndj+OpncnI96985BihGTnKfphXYxfF30j8a9GmCtdkedk7FrbsOn+3ruMwXchzfIwY7mva2SGJZHNH5gX/TuA/LXRxOVZJ2ISPF4TP5xvBducgc+SUgQTTN9ljybkerROtS1BpyIfuLD4DI5vD4Dt9kZMBfFmcq1QMnIILnEAlAxqbW+NVWSG0VuCTNwGx5+Fke08lzN8TkkaRq1w6gjxtVgSw5Di+WAbnxx8fnJ6cuFp/SyH/wC9jbdhP9TLeVSADn8fmcbK33WFsb0fDI1wkjkH9TJGlHD4Uwehx/LzzRNhzmjJiboXn1tC6B3hRApBXDFIc3GlMZfrHJp8VoAU3dA1rmxAu0eV3A+YpFzBz33S7I3FzXAepxX8upNECmQjIyGmFjYHF247nNd6kGhsR/gUkgk63ks1o2sLYx4siYy6eKVUCEOlzck7ZJJJCbISSD8hS0GCZTJo3NdJtbdGNCbreVUQwYOMsmpc4m6+fWgQZBlSYMnuY79rwx0ZcAtnhD+IpNSVsCpJkOjjYN7iQ1jR1J0FPYTZamRx4OMzEjeoYFyDb1Skepw8hoKxep01SSK1m5Jyshz77R6GAXRorVKDns5YKbdL+FMkl+Gga8vc8epA0p0W/wDCsMrhHodSktsl/abFjvDPQ9y21+Fc0yz1FXjVgsUIiIkcVeAhHQVbtOhljpx1Yt4DijWm9ygTXrUlwvBYuHlMHDywMBOU+b09LolcOWs5Je0Hrda3HFC3kr/PvDJmYrHNkUh0hZpvIuE8RXoYF5PE719YIyHZGf7jCSz8q7a6GeYhqZyuJDNoN9vhTEzx9Q0FgVTxoNBLegTyWgDji4BdSdRQRYQIiXbnFOrRVSTxOtZYWUpYE9aUhB0EglflSGd3EfTY0hiWm5cuup6CqBHdxPxNIGfZfF/czkTzUL8xrGcQ8iKSFjEEYPp3g+VJ4lEnOsjmDWzHJIxr4pdjGo8PCFroz8dFrlOgx77r8xnTcoeHgkDMDGYyV8TVAfI9bnxSurDVbnPkfglPtLwXH5GJNzU4ZNyDJTHG1wB9poCqn+rxqc1mViqjVIdrnekI0G3UVhBsOl0m4B0oa0+pW/VrTgJMa+62Jwg5iGfjww8q9rv+Q2ohuCzcBo5K6sTZy5N9CU+zsuZ73I3d/wAdtaCv0+8vTzSpyxJeJs0bl+KwObi/RcpCyfGcPS8hHtf0LD0rBWhmzryMp7l+33JcA1+RhuOXxjPUyVrQZYgNd7R08xXVTImct8bqVGWaBrWyANex/gLBR/PpWpkNxuc4FrGoqFpARw+H8qQH0P2xmnO4HjZ2pITC0POhLmekqPlXHbc7qbErk4sWdhy4eWwS404LZYDcuaRf8KlMtpMx3O+3XOxctLi4EW/EapiyXFGlrrtXzFdKyVS1ON47ToGjsrD43ae4ubhxSgJx4kdIAfI+PS1H5G9g/H8knw3F/bj+8/H3cjNA18xZOpc4Ri+1tlPlUWdjRKgFgd4cpyGRLh9p8dh4jo2ukjj2j3HsiuWt0Up0puijUlZG/wCKLF2Z9w3c5P8A8VzMLMbkirsd7AQ15Fi0g3DhUXpCNMeTloy5crxePymDJhzRgukHocRdr+hbWFq8kdVbQzJOX4l3FZL8DIYfcaCdxChy9VNcFqw4OytpIpmLNJs9pigak9D51mWO/wDDSTL+oc1rTcg3HypND5DbuL46IgOG/wCKCs2zVSyM7j7tyezOHmyeNw45ZJC1NwO1qFFKa2rq612nBzdnDyRi3N/d3uTlXPifnvZE76oMYGMfBRevSVTg4JFMyM7ks5xeA7c76nSOLnEn51WiL4t7H1P9gMnIzuxYcPJd/dw5pYmqE9O5f40quWc2WrT1NUzOMGZx2Vh2JyYpIk6K9qCrexnUwzs7hMzEklwcpgZLA50MofoCwkaV5GZ6nvYrTU0/jcUQhge4Fp9Ja1BrXKzYsGMImNCsUDVx/wA6aE5JBsQIDoowP9SWC/GqhvZCleTpEu139zQaN9SD5U99JB6AP3E+90/2X43ieLh48c3PyuO7I4/KbIIsZjGu9TXkKSQT0r2q2tSqW547q8lnB8591/8Acp91O5mSY7eTZxODJrFxzPbeh6e44l34JUu1mbLAkZLm8jlZ0z8rkMiXMySby5MjpnlfEvJNJI10QG/I+posvXxNVAnYYdkhujvUSpqoIdxk5rA6x3EagX+FPiTzPo77F8qzL7Pl4+ZwD8bJe4NP1Bjwq15Hap9x6WC32mgZU2LCpdIHJ1W/4CuF1R0qzZFP5YsJZBC550G1qCwqINEA5EmflNO4xwRjq4q5PKmtCiq8txMUpc98j5SSUDAjfxret4JaKXm8Ej3FsQN7E3KV1K5i6kXNxIbuc+yjTRD8K0VyHjGDxbFsOgRPH50+ZPARJxLGuaXFHKdL/jQrh+MT+jYAjFcuqeVHMHQc/SSuRoGwG7Toq0ckEMWOPmJDSCXDQDxNLkhqhI43b+RLtdJ/bjT81h/hah5EjSmG1tkPOdwXGO2zy+9M27owFqfuZ7GD1OW+px/eBhLmcXhtCgDe/p8KFinc9rD6NeQWbvDuJ3pbmNjK7tgGnktUsNT1F6rBXSENHu/uh49v/kZBHIrTttr4Gn+GnwXXoYqueIE8Z2SN8+S+QE3Vxc9af218Hr16ySjZEx252XzfcfINwuMxHvyHjeN42q3xulTbL4Wplly4utV3u9DR/wD9x+RwToc/vTOZg8I8pLLj+t7XH6QbIlTZ2SmyhHh29/XK3TrqbFyn+2fZcHF8d3V2jif863BkbLlQOeHmaJn1enx8qiy+3lV8vk8Zezz2yPFn+2Vp/Um+X7lz+5+GbyH215FuFkcbefgfbbE/cPyuai0Wtz1r/scWLDTBfj2FyVtrFa4rujj/ALk/+3yyeA+4HHelkzfQXub0P9QUXBpuvL+vyVnxvrfx+/EyP7ng4jvN0nA95FnA96YKDG5FQyKZvRwd1WhOd9wxO+JcsX3Uf/QF7p5jtvg+zI+1c3kf+f5qMA4eW1u/23NNvXVaNQdHQ6ebNn5qvGr3+pROT+4vfHOca3j8rMGNgRgR7YP7ZcGhPURenCg+r6/osVbOzrqylZnM4PGMIl/9xkqoAKq49TWlMbtsdvb9n1fX04uHb4RG4cPcPdeUMfAx3BstkYK2twxrU+A7vvez2m1X7EbF2P8A9vebM6PK5s+036jE36ivia5b9l20rseGqVrvqz6A4L7d8XwsEbMWERuaAhACmuf8be5Ly/BZ4eHx2AbmlxFyTotWsaJ5sPjw4wPTGG+QFyPGr4Ih2Z6dsYaQGqouoU0NIabG8LCm3bwSyNbNSxNKlGF7InMeFjpYvf8ATj7g2QlBYlNa660+TkvbRwYj/wBzz/uEYY+P7H3w8fF6sk4xSVzCOiXr0LKNjyHa1rQz5g4nhfu8J/1eNLmPmjuY5y9y+RBrmvnqvB1LrclKN5x+/wDiMSTg8HieRkwu55cZp5Thpy7azJFnMBd1VdvlWq4ZFocb543oatw/ch5IjE5KF2Pnhq+270gjxC1xZsXE9Xr9lX08j3IYjZWkBXqfpZpevPvVHpVsVLN46SEkP2xs1IRXWrmaOitiuZ/EQzBxaxXD6nPuR8BQnBclP5PhxETvuqoPEeNq2rcbUgmDzHJ8KHw4Ti6CRPcxpR7kLv8AylRXTjzWo5q4ObN1qZVFlI+zhO1O6HlszncDyDwNro/VjOfpobtr6Tq+9vXS+qPje/8Aq+K82x6Mt3Y32+7i7O704LOzQ3M4Z8wDc6A74/U0gbvC5r6V9+mbC4ep8ZX1GbrdulrKazujVfvTxmVyvFwvhXdindtGhb418xkk+7tX4PmrMfLDKWStIIsovpXO2bUqPYXcM2GA6CUxvGlyASKymDXhJNQ9+8rABJHlEueFNz0o5sX4gTk+7snkITHK8l5Kl+q20pO41iK5kZfuu9xx3lL9TapNVUD/AFjQ8gm7tFoL4nsjLija2UuFrlLCmg4le5LvDFxgWMfudpa/yquJUJFbyu8cufd7I2jQEnpVKouSIafleQyij5neSdaoUtgTmlxDnkvcuvW/SiQ4nHxICSPgBQmS6iWROVRr4eFDYKo9BjrOANTqB4Um9C1XUsMGHG5odtRw8Li9c1rHXWodDhuBQN2/tU1k7GqQdBx5le1oaXOPTotQ7QUkWPje18rMRWe2xRcdQfGue2VI1WMufE9p4WE4OlaHyALa51rmtlbL4wXPC4SXIb7bGe3EbF/UfGsZZacExBwOJhsMsrR7bR6ppT6Ra+tENi5FX7h+5nZ/bTXMEzc3LZpHDcL4KK6cfWvc58nZpTfcyPuT71dycs50PFM/QY502rv/ABr08XSrXc8zJ3LW2Intv7ffcD7j42VzHGQuyONxpfZzuUyZPbxo5XerapuSn9IruVUtjgvlc6l37c7I+3nZXIw5vfT39ysgIOThRv8A0+KfghDnp52q9PJhazexUe8vuZJLyj4u3XjE4LHmceL4nAjEEQjVGNlLbvJ61SYKmmoF93u/uP5btztHsHhIDG3gIpM3uHMI2PyeYzkdK1Bq2IAMaTTElBlUUrsNxfE7blEFoc22xpF0PiaZpsE4LXwf+/KMs4RMNy7cC0kfCgEtQfEXcR0W6jqlALYdAa3eAn9wbSPDzFJjQbw3KScX7mJkQDM4mf05fHyFAR/VG4/7co1a9vztSYmXrk+zeyec7fw8rs3LkHcGNhNZyODK8AZEzXlzMqPegDtnoycdVa4B8e5pSh2RMGX5WFkYUr4pm+phTe0ktKdQbWpyOBpjniykfA0w1HG5UwG0PUKnqC0BIsZU6kqw2uS21qUDTFfq5lG17APJg6X60QORt+XI4/7rnDwB2j8AlEEyDKNTofDUUxC2ODbxn1jQmgcinj+3vKAuT0jX40CJrgsLZC/kpPS9yxYdvzaOk/8ALo3zqL2NcdZ3Fdy8hizSRQYWLHiBsTIpmxFx3OYPVI4uJ9UhuelFR3cFeKAeWq9fKrMTmt+nh1oBFk4xohwg5EdI4uBPgLCuLLrY9vqV40HXPc4lAQdfGog6md9rQvPpPTrRIKoom6NCNKLa5pDDsF8jdjQNoMjSHLofFelZ2Sk1VmqwQnLxNhz5Nz90gXQ23Lda7cex4ef+QJBvnkbDuCE3B0/GtGYoRKQJHNYFa026i9IY2L6GyUxwKuLD4keVAzxBRdBqOutAQeJQL1/ZQIb0JUFTcnwoFB1b9UIoA4qDaaAO7rfwoKOWshv4a0En0oNjQki7wEVNbVvBwM1r7ddyHO48cRnSGTLwgsJLlL4NNOu1a5MtYcnTit4CO+OycbuuKLMw3txuTxmbYpSDslYq7JALjyNTTJxKvSTMv+K747QzPewop8adNrpMYGWN7dUICgj4iuh2rZGMWqT2J90O9WtMU3HsyJWEBTBIwOd8qz/HX5K52CpOe+5/Px7IcEYUDwWyPZH7PpOvrkOnwoiiBuzIfI7YxOJjZn87mxZMj5GmbDxJQ+f21u4vJKonSqV52IiNWXEfcbtXgcWLC4HDklYz6I4wGNH+ok3NR+Ozcmv5KpaB3a33JZzvMHi+QxW4cc4P6OQO3rI0KWu8F6JStj4qR1yy4NBYIj9LmvKFrwQV+Cdayk3KX3N9vON5Z0uXxAjwc4lMiItccd5PVB9LvMVqsjqc9sSexXY/t3wXDxtzeb5jZAw+2DEQAv8ASCVK1f5G/BH40t2WXhO9OzsDGi4rj8qRkEDkY+dpTc8rd3gT1qLVZqr1WiGP/n2Xlc5ldruxo+N5Ut28fkTOL4XSkbmBxtZ4Ta6nw0kn8jO9j98ZvKZuT2/3CBFzsDnGJUj3htnM+LT+IpXrGxWO7ejO/cPtR3I4x7h49gHKYgBmZculjjuE8260Y7iyUnVFQynP5jDi7r4ktx+cwBH/AMrDGLFxs2drR+Uiz6120Zj9UNZEcjhF3RwLDGWSD3WRqTj5Q+pqD8jtWn5VS+GQ5mUd5fkDy+dh8rw2LNHzEjg7NxomEgZDDZ8bgLB2qVK03Ktq5RuXFS8jJx2LLyEQjzZI2unYdRJ1FrVzM7q6oF7g4WPnMZtm/rol9l6pc3Q+RrHJTkjStmmZHmZj4ZpMUMLJo3Fr2kIhBvXns76qdRuOb3kD3etUDApJrNmqQUYAHtdsa2xDg4qRUF1IjuLhX8xhnHY0yh3j9N6qtoclFCj+xrpZTK+ZsUTiu1lzfzrq/wApwY/hrJb+F+0fBYTgW4xmewI50pJv4/Gua2azN1SqLd2iMXt/m5uHjDWQTpMxjUABFnJXb1smup5ncx+TTGDR7TY3Vpr0zySmc52dnT8weY4SF7zOn6uKNpcS/wDqb0+NcPYwNuUd/WzqujCsvG7f7Uh/V9685h8QxF/TSyh+SfhGxStYV6r/ALnB1W7K8IpnK/8AcZ2BwjnwdpcDlc/K0I3NzHDGx93jtKuI+VdVcVKrRSZcsl/oULnv+5P7lck32YRx/E8ZIWl2Ni44c8xhwJaXvJOnhTs5TRdcTTls+oMBxmwoMljAyPIiZIg09bQdfC9cKR0tnzx/3G8FHjcZi5+NITDBkACFSWxCTUMXQElTW+G2sHPkolqfOD8hrVvogN67YM3ZAcuY3dtB3HyvVQZO4y52RM7cm1o6miUhOWebAX/WS74VLsVWgdFgyEAbAwakmwqHY1VDWvtdjx47ZWukeXSEHbFrb4VwZ2d2OsI2HBMboRJFjDcdHS2Ov41xNG0jj+PzMkXJZGDt9PoF+qmoguSMfxkULiBJucT9LVeVHmakuRt3GmVjgxnpKq6Qr+ygJILP4aNivc+wN9tgR4VasIrGVi4vqEUN1R3Vx/GtVZighJOPzXkhrPba42Lv2LWvJIXEQ3jY4y733qHdXaL5LTVi64m9kxEmdxGNHtmlb7jPqAKk+CJTizOivVvbwDnuXhmR7mtdK42RLiq/HY6KdC1twXI7wmaAzAxmxkiz3jcdfKmsE7s9TH66ldXqRmRy/KciT+pyHNjsA1vpFvhWqpWp7ODr1XiBmOJxcGi7j1Ph8TRJ6tMbmB54dCP7Jvo7oBS3NrJ0X2lw7Q+2Pc/dsXvcbgGSBy/+4erIyfDcfGsnkbcVUnDl7vV6y/5X93wX/P8A+33koeBfkwchBkcxjt3u49pADSLlu4daT5rXQ8Wv7FieRVdHx8GifbbgOw87tWKHh8XGm7qjjLcqLLCuE4N7eA8qmla2Tj+X1PL9p2+3TNys3XE/gpHfP3B5zhppe3+Y4eHi+Wxw4YmdibozsttMZS4rOHbRns+t9fhy/fXI7Ve6Yz2b94OZgiGF3lhO5TtYqJMp8ZcWdNykJVTx0b5L4H7T1GJ254HwuXXuHuTu6LBZyH2o4zGm7YAaJBEwe68n6g0Dysauf/FQj5fBhx2vx7LfIBPH8b3C3E7xiyW9qdz4Lgzk4pSIwXN1bIxbr0qVDlrRml73xN4WudHsVXN+43Z0HLT8nLwzMruLFJjj5GAj2JXD8wAo38HrYfSdjJjS5RR+Cgd2c/ld8cnFyGcWMnjZsYwCwaLgLVJtas+t6HqKdeionJX8ubHw2iXKcrGD6CUC/vp1Tex63YyYevXndpJFbzOeyORk/TcZDsYSQtyq2rrrh462Pz32f7M8v2YKwvkunZH2b5ruSVmTlt9rHcQXPeoJb5CscnZjSp8dwdnyu5bPqjsT7X8L2zjNbFEHShN0iK4nyrkVXZyxWyQoRokeFEwbYwB4DU1vwOfkE+21qM1P4mqgUnWxkKGtU+VEBI4yCV9gEb52tVcZFyQoY8ER/uepwuguarhBDsxnlOW4vgsJ2by2ZBx+GwKZMqRrAnkpvWyp/oY2yVXkxnvX/ub+3PFxS4PFOm7hyntLXsxx7UA8P7jk/ZVrHJz2zzokYF3J/wByHePcnLYkrns47jsUtY2GEb3mIWRzjqUrplpHLwlyzUuG+9fbOK7HzVOTFO1rcona17COoFcueqs5R0dazpKZH9/f/ue7xyWdwDkm4HKBrVkYdsoc0qD6etY0xW8G+TLWyhoB7o++GNzXcfDY/CxGRsD4YZspx2mRrQGlyD+rrXTm1pqcuHG3eT6K47Iky8NkhAAe0Eflbp+NeX4PaQHn4Hpeg3NPyC/vSua1DetipchgTtcSLMAJI0H41g0bqxCzcWye72KejtB+NEGnIgM3hva3Oc4C+gt/g004KmSBmx3RqNoHnoK1VkOC9/br7lydqZEXG8xuy+35HAEfU6Ak/U3xavSuzr9m2J/Q4O101kUo3LuoRc/wgy+KmZNBMzfHLGdzS3UKa9vkrqUfP3o66M+WO4MTIhzJfehLHNcigWJVK5bGlStzAtN2XHjUlkfOFUBu3XSnJSI6aTIYFY8rqQ7/ACoNEV7I7wGJKcd7d72WJGi/GqVQ5JEXkd4ZMh/tx7SNHeXhVcBcyMyeZz8wf3ZSGHVgpwEyChjkDn6qq0SOB5kKhWhXAJ5Umykh1mO4IHDTRPCodilUIjxdzkAVpHwqeRaqdmwQIi4C3n0oVhugIxrUJKBbVTZKQdxmPJLliVjVY0fCps9Cq11LXhYc87gIoypOqVx2cHUi3cf2pPNtklRoXr5+Fc1shoqlow+AxMcj24TNItylgR41z2uaqpZcThsl7WGVI4xfa3zvWUlsnWRcHwOJ+t5TJigj1AkcASPhWlKO2xjfJx3Kb3B99+C4tpx+3cQ5z2Ahsps1a7sfUs9zhydqq21Mc7o+43dndLnMzMt0OL//AA0SsAU9a9HH161OC/YvcpjokV73IepJUkeNdMHMJjl/UO9rH3F1mgp1J1qhSfb/AG/ldtd4dgcT2Bw057c5jj8RuO3GY4RtyJQ1XyA6PLneoh16dWmoOeyPln7n/bzvntHkZP8AmzJm4m7bHlNDgL/1Dp+6jYurKR23x2dyfcXG8fxcBl5CbIacWLVZGK8Ek2AG25NgKGWnqQ3PnIh5fOfmvZNyz8iV+ZLE4OibM553hpFjfqKEJsio2OllbFq57msaB/qKVRO5Y8/BxWRs/QZLpc9hcJ4QP7UTGHa1Cep8KCiJ91pcWTs2uK/3GBL+YoGJkaWsBk9cakh7b/imlAhIlc1S87mogK6AedApF+/JAk2JI5pd9RaoROhqYKkW7msyUf8AudsxBF3BF/CjiHIPlhfDiunnwomtIDg4vcVDvBLEg6hbUDIGaV0jt1hfRoQJ8KozkSH+lwT1G6aBKAEucTc9NKBHDqALCgZ4BxNiLUCFILDVelAyU4Dhn8zmmCR7ocDGacnkJ0tFjx6ournE7WDqaG4GkTebmxRMdMxnt4sQDMaDUtaPpb8fGsVqdP8AFFSnm957n7Qrip862OazljZVD50CFsUvAVSKTHVSyzRRmNrGgEBoDUPwrhbln0ONRVIdZcgNueh8KlmqFCNzwSun5neNTI4HBAXH0X22LnaCiYGkdI9oEBxd/UmiUlqxWWhC8q1pmEjR6X3cF6+F67MbPFz1hyBLtW5XxH+VamJ5qC4/bSGdDhpobhfFaC0cCDXTROqUDOtJUkkINDQAnde+h060CYncd376CTwU6BCtqIA4URKAPLqLL0PSkBzSwt50xH1j3twD+J5NzcdjhgZDTLA8DRv5mE+AJq8dpRy3q0yE47lM7is7GzMMbJoDuUHVv5mnyIpusqCU4Nrb3n27/wAfi8jPycUMMrdxjJWQEi7S0Xsa4+D2Ormh/gO6eG7lkyY+KkLn44HuMkBaS02D29dq0rVddxppmcdw/cDurA5GfizHBgTQyEbYxve5n5XguHUeVdFcaiTC13JDfpu+O5XOlIzc2MgFS5zWBfFUCVf2oPuZPcZ9o+dyQ180sWAwhS15L3NPy/nSeVIPxth7e0exeCc+LnOUfPlwktkgZ6SClhtbfzqednsh8KrcsPZmX2LmZsmNwXHe1kxjeJpY1DtvVriSh+NZ3VvJpR1nQs/cMXcUmH//AK3OzHzGKHB7Qd56BrjYGprHkq8+Cg5vfvM/8Bn9vdxwS4vcD49kOVH6A4hwKuA8hq2t1RNyjB5HEMa4Xt6fufsXLbCo5PBy3T4m51pHlg3sXzH0+dDtFhVTdSJ4Zje6uHd2xkRNx+4OPEk3EPcjTOLmTHfpfwWqejkmsNQxGJDN3Hxx4n23juHjWOPGPLv7ssUZV8Dj/Uz6mfhS2/ow/l/UXl8hHyv6Ll1mxu68MiLIaGEnIayzJwlw4JteNaaS28Cb/wBzaeBzcrk+OxMzKgdjZT2LPA4fm0sPA61y20Z21coqPL9kcbhcllZzOZi4vjcoOM2OyzgH/W0X+gm6JY1sruNjC2NJzINxvcXYvasM0XFOl5GWYpMQPS8x9FcgodbWErVr9Rlnf3N5z3R9u8S2DepLms9x/gpQAA1X443YvyPwia7axfuC/k2chyM4ZiOQTQZBs5psdrBoRUWdY0Lrzk0KNjWyOddHFFJKW6+VYpHSVHvXtVvJxnlOLjH/ACETT7kUYQzMF/m4JXNlxzqjoxZI3M8i9xN4IhjS4AG74HwNeez0FsSmLFiPaHtBkksA4lQlQUtCSiDC4MfppYKbeVABTNrNG66b7fg2kNIJiwJ5hufudEdU9Fz4LVKrYO6SInujt7i+BysXku4+4sHtcwH3WnIcH5DmJcNjB3FRXbi61k5bOPL2KtQtSv8AL/8Acb2DwMJxe1+Oyu5clg9GVk/+0xV6FCNxHyr0+SSPNWGzZkvdf/cD9y+52Px4uRbwPHu1xOKb7PpPQylXm1S7NnRXAluZhkZEk8xnypHz5Dirpp3mSQn4uJNSbJJHGzbb7tq9RepgrkdMzXBwcfqBFzajiJ2Pt/7bdws5XsDt7Oer5HYjIpNx1dD6P4VwvRs13Rnv3lc3nuNyuHmmZAR6ott1cL1lS8Xk048lB8rz8BnRSuje10iHX6QRXqLMjj/AzjeImiALgI/2rS5j/FA+zBYPyueRqthU8jTgG43GZmS9rMXHRdNoJNZu6Rao34LTw/YPI5srXZQMbeu8qbeQrC2ZI1riZtXZXauJxDY2ljnucFdYN+Rrktds0eiLrJiva7+wxkTBclB+CmswTgRJjhzB7295/pKpSKTAJsco4RxhgAKfOoZoiIyZo4CffnbHG0JIXkagedTJ1Y+vkvsmyq5veXaMLZY350c727lYxSfMCtFjs/B309ZmfgpvK9+8TtTi8V0jjq9w2jTzropgs9z0sfpfN2U7ke6+YyXbYw1q6Ft0rqrhXk630seKEq8iHnnzsh3/AL3Jc97Lhm7RfEVsq1Rdetxeo37UZRAfc6E6CmbLBXwj0UA3uLShb9Q8vKm2VTrKR5kZlcjHej99S3B10xc3psSPEcPn8xmNweJw5czKeUaImlyeZSwrJ3SNW8ePfQsnK/bXvPg8V2TyPE5EOOwB78ixYBr6k0rP8i86Cw9zrZXxpebFcdHHNH7bHAnVy3vVT8nrWpWy4p6n0t9ofuLxPP8Abf8A8D5WccTyMEPs40kL/b3sGhY7o5aScLi/Pk/Nfb+uyYs/5qrl9D2J9uO2+1Y8vl+6u75pMPIkJMbMktMrSbByOJJNY8Krd/7Dt38uZKmLDD/od4fhftr3Tky5HYPKScN3JhEyY8m5wL9v9TCUc0mhUrb+OjNe1m7nXS/yVyo1/sO8ny/Gd3wTdn/cvAbxfcMQTC5Mo2OUJaSN58eoquU6W3OXFTL13+brOaeUJ4gds/bftfI4fuPnYOZgyVc3HDWv9J6NAU3p6LR/cTlXa7+ZXpR1a8mecP8AdbM7S47kOM4SJuLxuRO+Tj3ObukiY6/W1TV3WiZ9Zk/XMeXjkzPWDNOU53ku4OQyc7ksh+RLM7fK9xILk8ha1bKkHq4OvirpWulRL5oY4xNMz2oQEYxR+2kk2exbJSlOV/tSIfI7lhjWLAaZsglAegWtlhb3Plu7+zYcKdcX3W/6BXb3YXc3eGWxIJHRPPntatO+atNj8+7GfN2nOSzg+j+w/sRxnC7MjPgGVktAPrALAfga4L5L332OdcaGx4fb8cEIbjxCMMs1wCNAHnRXC3sZXypbskOKzsTLfPj4eTFkTYpDJ2RPDywnRU0ro4NaGKyVtsTMeLK649N7nrV1oyJ1DYuPkkbuDC5PqKKB51ssbZk8iRHnnuAx4pZpeVxIIYHbJpJZ42tYRqCpqq1ItkS3M07u/wC5H7WdriSPHz39w5sZT9Px7VhXwMrkbWqol9TmeedjAe7/APuv725l8kHauLB29xzgWhzP7+Uh6l7gg+Qq1Qz5WsYtzHcPcfcE/vcxnZXITFSHZUrpAF8ASgqkkhrH8CcLgM7PcDtN+jQhWsr5kjqpgb3NJ7Z+yPKc+PVAY4iAd7gnzrjt2n4OpYKosmb/ANunL4LA7AnJTVjLhfnpUf5Vluh/49X5IV/2T7rfIIQxznlBtaP40f5n0F/ir5ND7B+wEmBnxchy7h7kRDhE31uJF7npUWzWua1x1otD6IxMFmLEyID6QgW5/wAqaqTIbj8Fn8gf/b47nA6OS1vPQVVcNreCLZq1Do/tg/Id7mflNgadWtHuP/bYVvXoTuzC3d+A2L7XdnQ+rKbLlvWzpHkBfg1K3r0Ma31MH27vyGDsfsmEA/8AD48iWD5G7ifxrZdTEvBm+xf5A8jsvsfIVkvBYpJ6mMWFH+Li/wDEFnyLyQed9oft1mAn/iWQSHrC5zD+w1D6WJ+INF28i8j3b3YPGdqx5GNxeZkOwMj/APZJ372sd4s8KrD1ljejcCv2HfcqHd3YjskSSsg95lzvYFI1p3ozJNGJdxcE/jXuc6MowoQQh+a1zMtFLzZmAaIFIKdUoRrVFH7i5qPEhMUTh77lDB4edquqNdigFr5HOlepe5T+2tjKJHGxBFPW3ials0VR9mN00C/HXpUSWkFx4bSUN3H51DsaKoWzCVSiB3j0+VRyLVAiPDJ6Eg6OSy1LsaKo+zG2gF5TqGt6/Oo5F8TskNjZXu+lrbj40SNoh34OS6Z0RYQbBE06pW/JQYcG2XPtngH2jkjLnklQL2OlcmXL4OqmLTU03iuCdFESyEtkAQEoVNefe8m6qTUPHzwR7nMMgAUg2aAKy5SaVoQWb3/xXBbmTSNdktsI4vUSflXRj69rmWTNSnnUqfM/ePuDLYY+Nx24cRCe+fq+N9K9HH0ktzy8ndb/AIoz3k+c5HkckzcvyL8ki7Q5xcB8BXbWla7I8+17WerLX9s+7e1O0+6MPuPncJ/IQ4AdLBE5gMQnDSGuc02O3UDxovPgWhCc/wA1x/c3N8lzHGxtiblSvmdC0bWtLyvpB6U6JrcG0QBwonH3XvJBP0mtSIJXgcVj+Uw42hFlb6Rqg9X8KlhsbBI5sEX6gye17aEyk7Q0jzslYoUSETf9xfCcdx7uC7vx/wD5XhtYWRPYn6mIpYGRwR7V6G9dFW41MrUgyPuXlT2Xg5bYsNvG97dxtMuRDGSHcTxk12Y7U0lmB3POobarJ3M2zuPyuNlGPyED4ckta8xP+sB43NLh0JF6ZTR7DYIZGZLk3McHRM8XdCfAUDRM8RIMaaSfJbu99xOqgHUFfGgAzIhxcoOklY17SNRY2P76BkTNxWVBtmxQXMkBRmrtqfmHhQAA9scibB7UmhGjSfG+lAoEAvhcQ8bHmy0EsSRHJ/olJQp9J+VAx1+RkmL9NO90kQu1i2DkRQOml6IHIGTdUtQQcLgTYddfjQBw7idddaBig1ei206LQAoMHQIPHWgCX7XweG5LuHDwefy5OO4mYyCbKx4/flDhG4xsYzqZHhrPnStMaFVS8ly5XGg7Z42PtPFA/XGQZfPz23HLT0Yu7+nHafV4vJ8KizkvHXyUXk53ZD2xsO2ONQPNx61VRXZGHUAFDqtUZnggCfv0oEHcTjOyc2NjRuU7iPAMuazyOKs6evXldIsxxpS4HaSF1NgK4OSPf4sWyIiwG82uBpSbKQ4I3f8AqKb2a0eFTJSQ46N7vSu1pQBoFKRwLibG0bdoJIIIGqeC0ikiB5bDdENzR/bVdx6eVdmK0nkdqjREubdAADqvjXScAlAW3087UpGcNihIsVA/jQApAAEIK+NAziXCJt+FlpDPLcqE6UxCSLHrfpbSmI4qBen7yKAPD1XJslIDxIGlwtEAeWwUIKcEyfoR3LwjOf4qbFjDRmxbpcVTtPuNGi+DhXPS0MLqUYVJi5c+Y7FjxyXscjowNztwsWkDzrt5eTlgmsD7bc/nbJ5Y48RrigknP0gdQBWVstUXwZbuJ7Y4DsOZ/PZfOOmkx0gmdER7QfJ+V7Wqb9FrK1nbQ0S4kxzPcvEHhP8A5rg4MXKsjPsTShrWyQtVPUCCUB/fUqr2G7KJJbsvurF7u4z9fHGceeJ3sZOPYCNwFiEuQRcUrVh6lVcrQxzL7l7jw+bl/wDxhOcnDyHtaNxcBteRtMehBHSupVTRyy0y+4c/a33Kikg5HHjwu6pIvbE7HFiln0yRlfUh1abpWLmj+hsosVPtvkM3sXuR2JyDf7TnnH5CMre/plb8NR41pdK1dCKt0ZvDJGOib7TgYy33GOafS7chDgfFK42daAuX4vjuexJMDPia4SNPtZAaPcjf/U0+Rqq2aZNqyijdj8b3ZwPMzYZxjJxL5C3KKhrfT9M0anU+Fb5LJr6mFE0yX5/s7tzJzn8tPnf8bkPdvm2OY31jV7VKg+KVNbuCrY0RHH5vY3aGT/yGBJNymcXOBnFyC7UglAF8apq1hVda/wBTmZ9yZcnObDw/DMOW9QzJczc4jqTtH401SN2S8s7I9IfubzqiJ7sKCwYpEFuoKXTpR9qF97DMT7WPneyfmeWe4C5ijJc4g6t3upfkKWBvdlm43sPtfjkeMT9TL1fO7eV+AsKh5GzWuKqLPDBjYzdmNjtiY3pGA352rNmkIIja97VLvp16DyoGdEw2732BRf8ApTA77zW2CknQgfhSkDPO7+EbgZTeRxsdpxp3JKB/ttkPVPB1efnpDk9DBedGRmG2WRC0bY0tsCNTVATXLB0yScMchf6Aq2SMIb+ZvQwklMbHc1P7bWvZcbzdf21VayKSQkzcvjhDm4mK3kjjyB2Txrmo2fHISRocdHAFW+ddGO3BnPlo7V0PiHuOQN7h5aXJdPNI/JkdEM575Z2ROeS1jnPJKtFq7p5amWKqqiDlyHEEfSR+BC1UIp3BXzN8dLrVwZtgsmdG0H1hRqmtNVM3cYOXkS+mJpQ/mPQVUInk2OR42XORvLjushsKl2Rdas+pPtFmSYfaOHx2TkufHDvZHE0ptUqleVlf3HclCJnumOCbHfNFjf3GXEkl1tXO9zWjM0z+CzOXaXQxlziimNoYz/6j41pW8GrWhHYvYGZJL67EKCyMGRyjz0FW8pCqi18V9uIt7fexwXFLvKkfIVk8jKhIu3GdiYkIBkja1CiFGg/IXSsnZsHYtOL23x0DA97NrW6kowfLrSgFL2Fzcp21xIc/JzYMUx2due1qfiVpcl/U7KdHPfarKxyH3c7DxzsGcckgoHQtsPmdapKz2R6mL0Oe2rhIp3Lfe7D3FnC4T3FwKPlsh+a01hu99D2cH67TT8lp/oUTlfuh3ZybpQ3LZhwABrhC1CD1uVNb161fJ6tPXdamyUIp+RyHIZznS5OW97jcve8kn5LXQqJeDpS0+2ENOZFC322sR7xuEg1JPT4VZVqqmi3Yy6JgUvUKi3KBacnP+JLdsJMMftOEayOT0hoRPnUy5O5468XGp7HwmRB0mSy6Cw1TzJod/gzw9OtfuvudiikzJRDhxPkc87GMY0vefCwpNxuRe1d5ipo/a32G7958uyJsIcThEA+7mHa4tPUNCmlNn/FHiZvc9XA3ryf0LY//ALb34+JkY0PPRT9xNbvjwWABpiBvu6hfGpsrf6/B5+P9iSelGqvybH2Ri8LxvbP/ABPbOJFgdy4cIgyop42+6zIT63pdzSeo6Usdq2Tj+R853nktl53beN7FO477gdw8LzOV2t91MRgxJ3FseYGrjlr7WGjmn9lZ/lacX1R69vV4suJZeo/uXjyVT7ifY0YuG/uXsVM3BlWR+BHchhuXROGo8quIUrWp6Xqvffd+LOot8mHODsQ/qWxPjljOwkkte06H4GqX3H2llWq5pSi//afI7Kf3CxvfLZJ8eYbeP997nwMkPWQEpUNJbrQ8H2+LMsSv19GaZzfL/bv7b8+3I7cwYeSy8gue4QSL+nBuA0iyHwqJStNdTwsPU73sccZPtRlnf3fGV3xykebnRthjwmuZixsUNAcQSp6mq31Z9b6r1NelV1bkpDXTzyl0r1AX29yp8BVwkj0cVPufhHJcfILf1GZkENb9IJUCmrLwgyde/wDLJaEgGbuPG4+L9PC1k0xKlGqvxNaLC7anh9r9g6/VrxrFrA2FxnP93ZTI4mPMbj6YoxZK1dq40fBd32nY738nFfg3jsL/ALfooRHn86Fcfpx29fIkiuDJntfY8+qrQ+guA7SwOJhEeLjtjY1A1rQLJWdceupF8rZZP0eT7MhxWt/Uhp9oSrsLhoCnQ101q/Bzuxg3dvdf3ExM7JH3SfhcDwTo3ycNgcfOVc2Io4uRC5db16OPJO54ual/LK92h3v3/lzZEH2s7fdlx5Racnk8qL9NiANs0vleiirtRMzpd49mbnyv3g7Q7I4TCd35zWI7uX2WnL4ng3HLd7yXATQL1dWXD5Or/I0PnDvr/uZ7k7jflcL2g7J4Lhs4XbJMuQ551O4fQHDVoNWqtIiG3LMg4rtfufu2Z8fGF+RteXZksspbjxL1e9xQk0O1alrE7Epk9qcDwEb4uQ5Mcln/AP8AB4A/ttPUGQ6/KsXlbeh01wJbgUXETZpbHjYwxISbRsG6Q+S6mptmg1riNF7W+zfK8j7cskH6eFxH9yb6iDdQ2uS+ZvY3VKo3Htb7S8NxAZJND784RXygJbqBWENvUrkaRg8VDA1ohjHtoEtsb+ArVUSM25JRmBG6NHo5uhaiNTzrXgiOR7/j4lSKIOOi2a38aXDUrkGY3FyzyiGAe5M+wijsLeJrSuOdFuRfIkXPje08PAjE3JbZJdfaH0NPn416GPrpbnn5M7exJSZsMbfZgY2JrAgaAldRzwASZCn1HXrQMGkk3Eqb/wAaAGSQAoOifP5UANvcC0jp+byoAaJQFDYaHoaAG3uB11VAtAA7y8OXolgKTArncPavC9y4kuLnQ7JHggZDAA9p8aztRWGrM+TPvF2F3B9voJM9kRz+CkIEedE0lse42EgH0nzrktR1Z14siPnx5mzJjPI4ue47lOiVextuKbC8IpVbAAfvNTyKVQiPG0HXy6/Gok0SDYsbaAPG5QLas3Y0rUkIsQNG4owaKdUrNs1SCooQfpYp0LjoFqJKgeEZcdoWRxsAywtSbKQdDwuZkAekRRixHgKh3SKVZJXC4ARENgYZpTZznfSPnWLym9cZP4HYzppRLIzc7UoKyeZlQkXzC4DjuKiimzHsiMpbG17yGAvcUaFclyaz+6zMrXhag/e/c7uycQCPjXZOdKxxiDgsTXjo4jQ104+paz1OS/cqloDfdPO7eg7C7Z5jheddl8hzOO3IzuOx3Ae05zRvjO0KNjlad3Wu6mClbfJ577N7ayYLku5NuFJmDjzFiEhvvObdT5m9dqa8HPvqQ0X6fLL4Z5JDONDo1vgvjVBCHosDEhaXuHiVeVoCAbKnjlYYYQrXahEFNEEYxr8WUOY7Z4gWWrJCZOQeyLe0JGD9bgjd3h8aNwGMHuSbi82LPxwJZ4NxjEn0AkIpHWiBSM8x3dznNuXPy5HsP/og7Yx8Gimqohssf2gn7Qwu9cbuLvxrpu2e22HlpcBo3nNyYSP0+On9JkIL/wDSKtGdpOYncmJy3dXPfcvueEZE/wCokzMHjH+qObPyHExMeuscQ9RHkKlgqwikZ2bmcrmy5uXI6bMypC+R7lJLnmmVuTYjhllm44sG9m0NkS7Qwag+dBYA5mXhyPDQTGCjhq0igQTiZrHyqug/2Dbc4aBaBk7h8m2AuLr5r/rUWY3o1v8AGgAXOw8fknukZthyNCRZril18KBEHlY8+KkGVGS0AlvmPEEUBsCiLb64nb2N0b1C+NAoFwiOR5a4IPEaigNxvIha2Xa1doGp1oCBjaCpU7fHRaCThPQCw60DOhygDTyoA6CSEAKeGn7aBF37I453F4r++MpgLsaQ43bsbx/vcg0euZOrMdp3L/XtFTa0IuleTB38z/wvK4/JvijzsqOX3/YylkjkdckyA/UripHWsqqTou+JWMvKflPdNMxrXPLnekBoO4rYDpWyUHO3IiSDbGw7gZXBSFuF/wAqJBoH2knaVv8Aj51RJcOxMCTIyMvLbEJBFH7YX6Q55Vfigrg7doSR63QpLbLi7jYpHf8AuT6yP9ttkrz+R7UA03HFrSIxtA8P2Xpqw+AG7GLJC1t3fmJNjVyKBp7DGQH6LZi00IQ6dgCNb6r6fvogGxqWJuRGWzII3CzdbkdatOGZXqrqGVTOwpsKX1t9F9rxdpHlXoVumeHkxWo9QZSbi56mqMzxXd4KNOtAjhtdVafG1IZ0W+H7qYjgBAJIsehoFJxBcjrTBs4fGy3KmgQlW+nw0AFA5PFfH4UEs5qliF/GqkD9HGybdpkLSwC5BG1CFWvPNCvdz5kvb+FJy3C8dFPM47sstHqa3/7QhoUjxrWmujZFvoZ9y/3Bz3Hi+X42V0Mkd87Aef7ZlabFOrHA1vXEloZc5ZG9ucnx+X3Jl8dyO6PiO4w+GWEncI5ZDujcpt6Xmx8KdqwpW6JT1B8PJ53s/leR7TZNGw5h/TZb8gb4C15RsiHxB1puLLkPbQkMd/L/AGp7tx2chN7vG5DGvfJFaKbHf+Zvmw3pOL1Gk6sE70xZoO+cvJ4xj8kZToc/DmhBeElaHBw2ggtJFOlprqTZfdJbsr7Z87mB3LfroXcxkvbkFsDDjsa9wClrvykVP5ktPA/xzqHcx29j5uNjz97c9iwcpiNGOcqAt9yTG1AkaNXtP5hUK78Ip1XkLwu/O1e2uPj4jjJsnkYIR/afLdVKoHORAulH47WHzVQDK+6nKzFh4biwC4kGzp3/AB2tqlhXlk/lb2GGyfcvuAEF0uJEfUzc0YzCx3Q/mt0p/Yhfew3F+2uXmOY/l+SDX/mDd0j0+LqX5l4K/DO7LRxvYPbHHj+7juy7IDO9xaXL/SEqHkZosSRY4WYOJGzGxcVsDBYbWhpC+etZuzZcJD0U7du0tAcT6S4ag2pDQsEhwEbVa+zyToB4UgY9HkMaPSWuZoHAr5FaoYr34y5Hna1LEBPipoAUMhtvaf8A2wUA6nzpSB0PnMhMu10OjUt+w0hhDXRBjnvkDYh9RLg0gIpUlAlGgyh9w914XMTM4nhpY5uOxpN+byB/2nPau2OL+og3cRXNmt4OjBXWQbFMbtrF36I7QfhXGztQjP7l4riIyJ5dzgfypr+wUlL2KgiMT7n4EuWMWCRoeTtV7mi5861VLIWhb5O4/bwxlSymNoIaSiN9VQ2JVPlz74YsUfd2RzeEC/C5BjJHPaEDZgEcCnU134Lyjny1ddTJ5MieY7YIyU6nSutJHK7NiTiTvIM0iNKKBRyFwb3H4+PhUENJctiOtTzLWNBUeOW/law+HVKhs1VSX4jh8rPyY9kbpPVYn0tFZXukjStD6Q7C4V+PxftOs9AfbjHh5muFuWdFqstGXxhyIxG97Guao9uznE+Y0rFtGlcV94YPj8PxWOCMnLhaWlHh8jVDvDYDUSjor18ttqscn5/sfhInOyuRgYGWc3cPH+ltzRyXwdlPVdm/9sEVlfdbsHAZuxZn5TpWq1sLdoRfHyNVq/B6GD9e7GR6tIqvLferKnwpf+A44wyghrch6bdq+Gq01Sz3PewfrFKub25Gccx3z3tyspfkcq5rkLDHEPbBDvKtq4K+VJ7S9djxL7UirSYUkjDlZjny+v1mSQkqnWuhQtkUutpytsOiGOKNswgaSNA6zTRJ0rHVLklqceTsYN7TK71IBZvktCFZuEtJY07GiO7cdx1GxUPz8aqTC2Kr3ONxIWgzyBXIrGqqj+BpNhTBWXZjjcZ5b72Q5VuwIh/ClyN64G68rP8AoNGQyudHDH7hbYu1aF8Up7GFsvK3FLUunaP2t7+7wxnZvB8dHNgh5i9+R4jj3tC/E60k+Wx53c9pTpW45N34Bu4+zed7U5B3E9ytYydqOSF4kDglkTp0vWXNHsdHJXt4ldP7S8fafv3jexs0RcpxULsPLdvbmtY108PRQXdPKpVocvU8v3fpL9qs4nxa8Gi/cD7zw4nIcbm9m5zsoMUZmFKwDEljIVVKO3DolF8zu/t0PnPW/rV7VtXsKJ2fksOBnds/drinZuFMeK7nx4yz3YX+3kROITUfWxauFm12sePmw5/WZON1zxt+T597gzu+ft13gJM7LJ5eAn2crcZI8iJpQG+vmOlZqmv1Puutbqdzrca1XH48o2TtrvrtP7zcQ/t/uiJsHLNaAIrNd7iWlgdrY9K2/lpbf5Piez08/rr/AJcTbpIR9uO1vuL2dzWXxublxZHZ0RcY5pHHe5rgoc0H6T/UNKmlbUeui8mPs+71+3RWqoyfQyb77yduDusM7ZMMj5ot/JOx3B8fvkoVSyprQqrlKPsfQZM760ZNfiTLIBIcV0oa2SRjgwhx+lvkKu28H0OJW/HO7CcUy5ixwMLQATuHqDU1SoaSOrFe11FUOR4bI4zNLMJ37k9sGwA6nzpOxVMMS7OSGzOchwdzHf3ZQTsY1LfGtq4nY8Du+8xdRNP7reEQksvKc1KQ3c1jijWBevkK6lWuM/Ou97js9y2rda/BonZH2d5DmHsnzw7HgKFXD1H4CuTJ2vCPOrgS1sfVH28+2mD2/gNbjYex5QmWQeojxU1zKru5YXyJaI0vH42OLoCQFG3+ddNcZyu4e3HYwXRvUAa/OtVUzbOyzCKCWcoyGJpfK89Gi5NUJsw37u/eTsPipMSFnbUfd+biLLj5OcgwYnubqx1y4+Va1VZlHDe9rOD507j+5f3K75d+i/VPx+Lk9MfF8c39LisjFw30IqeJNaPIluyfwsneyfspx3JRDlu9edbgYIKyYWGr8hw/1PIt8q5rZzdUS3ZB/cvtHtGLl4MbsLEyosOFm2V8pkkMrz+ZSLVFexG5v+OjIviOF5OHF/45k72QSHc7GjJDnu0Uis750zophXyaH2x9pM/OLHZQ/TQuIsRulINwnhXNbK3sbQkbb2x9tOE4FjZW4zWylAZZfXKT430pKre5Dt4RfMHjo2ACOPatvcf1TwFa1qiGyWixYY3AvuRo5/j1tWvEmQoQuIDkAalnv/gKviTJ0tDRucfgXafhQAoCadzYcePcXo1hdpe1hTUtwgeikvvE8fjcLigE78x4WWbxPgPACvTxY1RHl5LuzEZGS6VVPwX+NbMhKAGRwcF6nrSGNu9ViAiX+dADMiBC0KB1oAb0KFbaEdBQA3JYKoI0WgBJA1PyNADMoCKiDoTpQAw9W2JKC5FKAGS0G3zWpEA5+Dj5mNNhZkLcjCyGlk8Eg3Me09CDRCgNmfDv3s+047B51mVxbT/8Z5MudhElfZeLuiPw1b5VxXrxZ6OC/JGaRYwJBCuK6aACsmzrVR4RtZ6ZHDVdrdfCpKCowT9DQweNSykwuCMPeGxgyy+PQVDcFrUsPH9v5mWAZPSw2d0FqwtkNa1LPx/AQQlojZ7krUVNK5nds0SgtGB2zLluHuM9IvtaCBesnZlyg3Lk7R7Ui9zmMyKBw0xmkPlPjYVpTDa5lfOq+Sh8598IYmPxu08ERrYZeT6ifAtb0r0cfS+Tzb9x+DMOb7n5/uCQv5nLfktP/oqQxPICvQpjrXY4b5LW3O8f3V3Fxb2mPIfnYRAD8PKcZTsFka5ym1U6yZptF94nuntzksQywsjjez1SwStAcx/UIaxdddikkUju77gt5FsnD48Lm4gckhRFA8vKta0Jdirxe5ix+9Cd8UiEPF6sIGJMx0hO5xIP4rTgUk52v2p3V3nycXD9qcXPyPIT3ZFExUb1e9xsxo6ucQKh2XgvjpLJruvt3hPt1m5HD89lxc73ZjbWvgwJRJx8Ej2qQ6QXkcwlEb6VqlV7syd/goro8rkZveynbWlytib6QLWtoK0JE5HFbgX4/qA9RYb2PTzoERUmO5rixCD1adRTFAkuLGBl0ddw/dpQI4XytjbGXf2lLg3opstA5HscmBMgsWTWJ50CHWgEiUx9hLsmB4keSsjT9d9fjQUgne16uanufmXQJ5UCI9+G6V+5g2SLtY3o49aAGzLNjv8AbyGlW2XR340BIdBmFrAR6ovEaj/xCgA05IyWtgkR7HlAD4fHolA5BMjh3gS5PHuLoYigBs9UvYa0EojfenhcVGyR31OAQlOlAwN5dI4lVd4nxoJOHW+hoENghylbm60AKAJKE/G1rUDLD2Z2jnd689BweI8Y2M1r8rluSkX2cHjscb8jKldoGsYqLq5BTSE9Cxc/3Hi8pybY+Hibh9q8bD+j7f456++zBjUh8h092YrK9bqfKsbqWdOJwii5eZNmPfJImwuVoS7R4eOlaVrBja0gzi4eSdRcUyZOOcSjipDfpXUUBIppO4k+FAGsfbtuAe35YIshpz5J3vyICQHhrQA0p1CeFeP3E3f6H0HQdVSPJOTQGQkMBQXDnWBrlTPSgBeHQoZCsYVWr4VSHOhHy5DZf7cbSTojbAdetWkLkATwbpB7jiVugPjWkmT1GHs9vQBrTdet+lMGMkkuRvqcn1IifGqIkdEJlZtkAeCPp6fGiY2BpPcaf25gTBzgHRyEXEZ0+K1az2Rz261GBydpq4e1khT9LXD+VaLOYPqfDGXdp5J9InYR4Xqvzoh9R/J0do5KL70Z8TfpT/Oif8RryKj7Oy3BTkMDOguXUfnQ11H8hcXY63ly0A1IFqX+QxrqfUId2bxULPcfNJI/VCUCVH5rMr/Fqt2RWTx+DAXCGNV8TuI63rVWbMnSqImeEuKgI3RBWqZz2Qz7KLb0j8fxpyRB9j/a3u885xs3BcmQOYwP7by/1GWH8pQ9T1rjag0ZpcZh2Fpj3NYNr1RSE0/CmZMx37hdot44Sczx0Tv+Pe4mXHaLxFx1A/o/dXVjyTozK9IIJvZ+fzPDYnN9uh+TlCT2M3FUB8cjSrJWKitI18KvmloyFVwX7untSHuHiuN5HuDKZw/NQRCPOlc4Fj2ixCghSCFHxrCuSHojV1RFcv3f9vo+HweJ5Mv7hl4sFmPIGnfYJd+hCVVaW/3E2vIFF91suWKPB7X4OPEbCwQwt2mZ7Y/AbRYDwqvxJbsnn8DrcP7pdyF0eZ72NhvALXvf7A2+IaLmnNKk/cyV4/7TfqJPe5nkwrm+uOJqr/53KRU/mjYtYvktvHfbztPjHM3Yv6o/ldkOMgA100rN5LMtY0ixQYuLjx+zhwtxSl2xsDUA6L1rOzbNEkvA+XuEYDgXyAAh6dPjQA4CJg0OajzdTZwT9lMGKZL7YLZDuY1SHOt+NApObg0ExN3Fx+noR43NADhLDdwBe4KWuB3Hw+FDGhbZItjnH8ujeo+FEBI25ns7WMRweN4c0f1XuB4daQMCy+Z43jWmbkMuHGjIQuyJGxt3a23EJRyAoXM/fr7a8K0xx8keQyGqBBgRukCjpvKNH40KrYyhcr/3L8vmj9P21xEeBFo2fNf78vxDGoK0WMUguB3HyXeM8bu6uQmzo7luIHGLGC9PbjQfjWqxoxvaxfswtg4ZuTAxrf022ONrAGjY8ojfDxrDs401KNunkatBE8r3KeO4xWPa7LcEAYSQugsLmvMrWWe09EVHC7S7t7ym9/IZO2Fx3MlmWOPyRpuldPOtdERE6suHFfYiKWX3+Z5J/tq0jGx0aAR4vNS8tohEQpNHyeM4njsEYcYMrWt2Brle47RZV61y2RpyZlHevFjnsV+J+kbE2G4klIGnVBRS3FltSjJIuwuU5DkP+P4vEm5LLefTj4UZf8FItXbXI2c9qVruW3nPsB3h2523/wDIM8Y7ciNvu5XEsf7mXDEv1FLOTqBpWjbRjWybKbg9ncrySHGhe5hA/vEbGJ86yeZI6VhbLNg9h4OL6+VzoGEXMYIJBHmTWFs53YfX5cm1WSLe4u0uCeIuMg/Xzt6qgHQ3Nqyi9j6Pqfr97v8A5HxRH8h9zu58uQw8U0YLAC0NYVJXRTpTWFbtn02D1ODEuKpzfyyr5E/cuVLuz+SmaGEucz3it9dDWyrT4Ol9WyeqVUhUcuK0maXOnkzHlQwucbgWU+dLj9EdOPHSjlMQ+KSQNfJIm31oWE2Bvc9fCmoRpmdn/QW+fBGO9k73vlN4mxtQtHiR500rSYK9Me7liIXRTe2x8kkETwri8lzVHiG+FDTR11usqhtoJbx2KxxBL2wj1e87RHdVPTyqeTHXCkAvdiuj9vHLsmUOKoNsaDqetWk/JLtWIr9zHYGOe5HmKUO9RYFG34r1FJ6GuJWs2nAnH2Bwga1z5nPKySANZs6ihk49HG/1CMXCyuXzGY2E2V7GuQQ47C8l+gBIHjUt8dzLtZKve3CqL5xX2U715WUQOwThtc0EZeX6WINQQOvhSq7PweJn971MNHFuT+hYsX7M8Z2nyEOT9yMuXK7bkbt/XYLS2KKYfkn1cGnQOFO01eq0PHt7zL28fHBpf4f/AMGy9mYH2v5zhczF7KxMEY2x2NJG6IOkBRAXtd6nDqta1VLqFufMdl93rZFbNyQZ9rOE5Xs7i+S4Pko2t9rNkmxZIf8AafBKAhauieFHXraqaYe87uPt5KZKPxDMK+4f2178g5zk+YbiO5PFzJZJWT4x3PbG4qjmG4A8q53R1bk+69T7/rLFXHPGyUGX5zZMacQ5AEbmi8Eh2ua4WIKoaEfZVzrIplQCyvlEYn9D2s9Ia8+SjzqkkZZG1qK4/neR4TLi5fict+NlwOs9hIBUKQV1qnVM8rtYKZ8bV9UfRuFgcD91OzeOye6vainf/dGfDIA6B4UEgu0VPU00Jp7s/L3fL0uy1hTj4Md+4nHdr9t85ij7f5sjzjt3ZORuRsUzdDHINV1NRVp+ZP0H13+RnwP89EiLyO8++OU4b9Fl9wZRwZDtfG552ldA5wulU4T+Trxel68ckkmRLDiY7GxYu2XJNnyFqM3HqSdalzOux7VKUouNNxILooZMcNE7wSdzGgMLj0v0pjSarCUsGORjcWzecj9MUO4L1PRBT4u5lkzYerWbWVSsZ/M5fIvdj4LCyJfrGprspiVdz829r+yXzN0wrjX5JvtP7c833JlNjxMZ08jj9SEtHzqMnYS0R8msbs+VnqfT3Yf/AG/43FRxZfMOa7IajtiLtTUXrkavfVsr8irtubTxfAcVx7RHi4zHFoA3uC6fuq646rZGFsjZOBjI2/3nqP6eidK3Sgxep33NzWtijQIm7y8hVSIKxePzMp+7HgfO7QPNmfibVdaWZm8lUibh7MycmNzeQlYyOQEPhbdWkIQflW667a1Zz2zrwVXE/wC277SQTe/yHFP5MtcZI4cuV74Yy4r6I1AFWurVHM7tsuPH/b/sHiWBuB27gQtaEaRAwkJ0Cg1osFF4E7NkqOM4eIbYuOxQ3yhYPh0rThVeCDxweLNv0ON5gwxn+FHCvwMjcrtntbLJbkcLhSFV3HHjB+RAWoeGj3SLTa2I6XsPthzD+ixzhP8A6oCifIqKyfVxvwbVz3RFZHY8+K4vwJhOSFcJP9z5dK57dONUb17Phkc7GmgeBM0wydRJd9vAVzOjW50K07DrDHH6k9ZNi67r+VVI4Ousu920eL7uI8hSZSQOcgNO2JhJH5nXN/Co5FQTfakUknKGedpLIWEtJ03Gyj4V09ardtTl7NtIRacucuVvQ38q9N7nnAJe43cCLL5igYhzm6FE+PWgUjSEekqiWoGJKbrdeqfvFADDnADaU3GwPnQAzvLXHxIRDofGgBL3EWDbeC2KUANSEEIbLoDSAYO0bVsBZdaYCXFzbjrofLxqBDDnr+ZA4dNLdaAMx+8/CY/O9icszIia+TDYMzHTUSRalp8SDXP2F9pv13958ZvwHOAL3e0waA21rzFc9x1HMfhpJSGY8bnDQuIQfGm7oXAnMPs6eUb53FrRr4ItYvMaLGWbjuAxsciPEi9941cnpWsHds1SSLZiduyNhGTykjMfGHVxDWgfMisW2PkkBcn9xOyO3AYcR3/I5jfyQBGH4uPjXVj6trbnHk7Va/Uz/uH7vd0csDBgubxPHkemOD/cIPi43r0adStTgv2rW20RQJ5ZMl5mypHTSuKl8hLlPW5rsSS2ORuWJjhBcdjdelMB84zg7aWo0C5PnSAWzFhaQ5S9wOvh+FEjgFy4mRz/AKpsn6fKbdrmo4FOjh4GmTEDcxwuYYZ4QyHNias8ZNlFvQTcg9KnYtRZQJ4Hj+Wmm2wYnv4z1WEgpu6GssmWqNsWG1v6Gm9o/ZjJzmS8lnxOGPjRPysoNCthgju98h/K1tciz2yW41Ox4aYlysTjfvX2Xx32/wCd7I7U4fJweayZHw4/NYrzA6aEgBkzpGEOUFf7fUV6NMartueTe7u9djCWYUcMbZE3zOcr5XFSV+PnWpnECj9ez+lE+PiaBjkQI27nInqX/wAPS3wpjEZGNBktHuIHlEI116/voEQmXx8sNydzOko6/EUCaAZhIvrt4Hpaglh+EI3yBjwSwgIF0J1oKFT4r4HCTHUXUeINAhyLNDpgcwEOafraEW1tyUDCDNsILjukeLSD6QPAUDPbhMrZAXtI8ep8KBA83H5EDTPjrJCBci5avjQKBqGe7nNGyX6QCbX1+FAQS2DmOL4scKxjCF+K60DLbn8Hx2XgiTKDYpnMc6OcENJ2jVDrey0EmZyt3EPa3b0I86BwMahBoPCwv4UCONC3H4DW1AhaAeo2JueipQMsfbPLclxnG8/Hx00sDOUxmYOYWO2xz4xkEhx5Gp6g57WuT/TSbgqtZBeTyYGxNjiiLXFm3cbOL/zPd5k1K1ZbIVzPbeAUJCaFfOrMoEuJc4k9Oo86AOKqNUbqAFMJLh4anxoY0GxzvhcJIXGOVpBY9hIcPnUtTuVVurlF04v7gZLWNxuab7rWoG5bPrHT1t6/GvPy9RPWp6+HvtaX1LQzFgz4m5UWQ3Jgf6gI/pC+NcTmriD1a2VlKcg2TivjDgdsLRcedNMGiNu2VYmbkN3nStDMZdje6C95L3L0sPOqkD36ZAidfpFrGiRHfBqIBYAWPzpgO3ao3Hoqa+V6QpHDC8WHpCanVDfWgBTG2s0tC3OpPyoBjzYnCzRbVeqfzoJTHGsbCN6eo2JPiaBSKMhUxhpebLtvTgXIFyopnDbJ6FH0g+rxqkZ2ZA5e1hIHwIH8TWyOVkNO1Sf6Romi+dbIwsClgVXAlPwqiDe5IG9p934POOEjeMjnjHIiElrjiuIDyCOrR6gPKuaj5KCpcH0F7bWzyxSyCdoDTBLEfTLHI0PimaRq17SHClDRkJnmL8eTeA8BhDYCBucg0vqtHkc6GOZ/fHc/Kyu43trEfx0jCWOhw4yZAQURxIQV1qlVq2YSJg+2neXPPGTz+a3GgcFPuvdNKfH0qgpPLVbD4yXHiftZ2vx7WuzGS50zEeHTOAZu6na1LVk8zZSoi58djcfx7WHBxYoGD6trGsUNHiADWbs2UkiTif8A2wjwVJcJD6gF8KUlDoDQA0vTeQpTUCqDUSJBLaQuAYDvJFhexBpCOOR7mtDiS6zSbAkXFDQ5F++UBNk+oAW8NPOhCHIpbNczbsaDtB6haY5EZLWTSskl37YVI9RY1XBEIGvzpAhufNxcVgnzHNgQH1ykMbtHgXILUpApXOfer7bcCCMrl4smdg2uiw2uyJU6t9Nh+NNJvZFGbc9/3S8azcztfgpZHAI2fOkDGeRLGKT8zWqxPyRKMy5r78/czmS9rOSbxsL1/tYLBGUP+sqatYkhTJQcvN5LlJTPyOXPlyuKufPI+U//AIRNaQkLUXBA8uDWg66ALRI4JnDhexHOGtypSpkriWviOei4sh3qcbI1ulvM6UuSF+OUSWf9w+S5jkON4xhEWP7zT7DTr03PPkKzyOamuHGqWjybHwR4eHZJAyOaX+pPdLSRopryj0WXfCzpnNWKLZoQ55ACdUFTIBrZJ5wAN0gRS1NrKNRqATNJhiIllZC+6Nj9brHSpY0exO2O1cOIct3FK/MlkaZv0QJaxrNVkJropjS1Zz3yuYRasDujjeOw43YWHj4bMtgfjRYkbQ729Lubr866q3SWiOa0+Qb2YOTyv+RkbI9wDo1kXZfoB1FETqyU9dD5z+9/bvO9u5o5ngMmdvamS8MMbWlhx8hwuwp+RyekmsfxVT1R9v6ntUvVVaUmRRslLGSPbLkyuJIY5xcL9TThf0Pu8deFVo2/gOgxXtxzk5zDG0FGQgEE/wCVQ7LZHfipfjyuoEyY2ZLI5rS1kTPU50TrbU0JolIi1ctvp/QMhjbjmHes0iKd7UZtIspOvzqW5Ol4uK+WH5Ekgjjklmjix2t2t9hrbL0BNylZomP6IDmyTjscMcuynOG07QsYW9jr8atL5IveFpqdgmhxYy3JhBleBtY1wf6fBy360NN7GMVqpa1EOzGgCGdrcSJrlAYNrj4HqKfGNtTamVxr9oDK/DlnDJXzZbiCfbj3BhXpVpNfQxzPFZw3az+hIY8efybjHwXESxjbs/tMdKSW6lGjVKh6PVyT/nUxV4pcPqy18V9mvuL3AQyPj3YET9u7KyXCIf8A0hTVqX4PD7X7B1qJpWbf0I/uLsTmuxMo4PcMe1xUY2U0+9DOB+ZoCFqf6qi1nMHs+r7mLsY+VW/9TZP+3fkOFm4nL4xjomdxtyDNNCWNDnQ6NLCbnS4p0ST+p8L+0fntkn+z/oNfennPuT2/yULY+REPas5LcV+A3a8O6smcVO/w6UZJmGV6Dq9PsL79bLw//goWR96u9ndv/wDCzTQTYz2ugmlki3vMR6SKq261DTejZ9PX0fVx5VlqtZ2+CpcL3Nyvb2dHyXAyvxMkOD45WORqC5a5vUfGlwnU9vtYadijrdckz6r+2/3Y4vvTDbDlPZjc/C0tyMJ3p37R/uRg6ha6aZJ0e5+Qe09RfqXlKaSUHn+//uF9tedP/Lkc52pkSOOFlSMIeA9xPthzfzNVAutYq1qvc9PrdLqd3F9v23RIP5z7QfdZph5SBnG825WFuQBjZbXop2v0cfI05rbfRkL/ADvXW+23Kv8A0Mt79+2HH9r8UzP4vlmzTF5D8fJLQ98RUgsTQjrSmGfTer9tn7V+NqwZ9HIBHDjH2nghXEeq+t/Pxoa8n2GKyhV0ZJ4ufneyYnyOdgON8eN/txA+JARbisbI1r18fLm6qRrOmk5OWON2D+lxogNrSPqI1I8jTrVV8yaL/meqiqI3JORK448THtYtmJtbuGgIrRRuzDNyu+NV/QXH/ah9zNmYxrFNksR8KlvWEbV+ynLJZJIr/IdxHc6LDBdIfzCw+Qrrph8s+I9j+y0o3XFq/wDoNcT27zPcuY2JrHzyyOADGgki9VbJWi0Pg82bL2r8sjPoTsX7AsYIsrn0Y0If07UUnzNeffPa+xHGtT6B7Z7f4zhcduJxeIyGMBCWALbxNOiMrtss7PQ0uneg0axa3/qYwONyn7drGNjZcEm3+dUrEwSfF8HyHLkGFn9kf/tMvpZ/5R1rfHitc58mWtS4YXbXH4SPm/8Aczj8z7MHwbXfXClucVsztsS4kDW7WNDG/laAmlbJGD+o26Qpquq9aBwNukdcr5H4USECDKpKHTpRI4PF4AJdcH+NEig5ZzVbdtAJCXX01H8aChBCBAUI0pAI3ka3HRPGiQB83Dg5BhbKxpd+Vws4HxB1qb41ZalVs6vQpfIY0+BkexEzc5/0SgKoHiToa8vLjdHoeliyKy1Ex8dNKjp5A1LlrblfjULG3uU8iWwZBjQwtADNx6uNzWqqkZOzYVh8hjYGW0ySDa8FjgqkA9T8K0x3VbGeSjaJZ+S07lcrR1B6V6H1OJop3dn3A7Z7PgEvN8izGMn+zAu+aT/wtF6yvkrXcqtXbYo4/wC4Ts8v2sjy3MITeIgT8UVb1zPuUXydP+LcvPa/f/bfdR2cTnNfkgKcWVY5fk12tbY+xS+xjfFau5ZijwdqtA6on410GQy9zXD1Iehb/GgAaRrmj0o9pGmpUUAcDvSS1xI/p6hPDxpAMyOcFsoOo8KYDDiRucwg2VzT18/jUiENkLSjygN7edIUg8hI3EFW63ubfCgZQfufmtxezuWfGUkyYv0rAigvlKBBXN2LRRm+Cs3SPmPE7V9LZMp254Cqa8R5H4PooJnC4h6hmHAZHaBxCNvWbsNEu/jI+MxX5/NT7MaELIGXA/nSrNnC3Fa6qpKly/3YxsP/ANt2zx6kD/8AWpxbws2u/H0p1scF+78Iz7l+4u4Ofe6Xlc6WRqqIGuLY2r4NFd9MVaKEjhtltZy2AswQ5HB1uhRSlbGIZHxzJAjn3AVq9fjSHB48fHF6ZANj7AG/nSHA0yKCFrvZJHiD8bITTEIn5GGIFuRcaj/Sfj1ogckPk8z7ry3DjL3rdAgo0W4tXsSfB9j9z9zy/wBmB4iJA3IQ0D4kVzZOzWp1Y+ra25q3B/YuDEY2Xkj7mQNWM6eVedk7dnsejj69amlcN2Vx3EsHtwhhaPSNqkJXG7WsdMpIz379929w9mZcnZHFZD8I8jjBnKux3IJ8aYBwgJH5bq4V7vUwfjrPk8Ds9j8lvojB4Y2wRAgEEAGQrdz/ACrvOUU6UqCbgKA3oBqSlITPbtxDSgsSCfh1oAU46tQhpC7Trt8D8aYxoqVG1WAm50AH+BSEecd0bmkBwQFHD+rWmMCyeNEhc7GCtUrCToi9aBNEXudjPIT0jx1BoJ2DsfLa4IXL/OgYqSBsw8JX3DfAeJpjByZsV5AR7D+U3B8aQmx6F7HN3xO9f5ona/LxoANxswhbotnN0/GgBnIxosovljAiI1A+ndQAMJMnj5gzIB3MITd4ap8KBSE813Hm8q/c5I4WtbFHCz6WtaNPxoAgy5x10H4UCk4Vt18T8aBHhoU1BWgYRjwS5czIIxue426oKG4GlJcIcHHjwHYK/wBhPVIDtJeLl6+SWrmdpZ21okip8lksyshpia1sMTBCwgEF7WfncSvqdW9Ucl4kDHUsCLY9DVEHL3TTxoA91AGvTqaAFsBJLSL9CClAEpFx5cPXN600RUPxqWzSAGUvY8x7Ve0kFP51RLJvj+6+WxREwZDY2wj+24MBJ8Q4CxrG2Kttzema9di9cFyuN3RjOldG45sTkniFm+Th5GvLzY3jf0PdwZ1lr9USU2FG12x7trRfYNLedZJnQR8zGM9AKEiwF7VaZAM5pGvoHVupSrRMjLhuBDfSw3XrTAdZA4p4CymgkIYy20Kmjlvp/CkASyDawEkkro3W/W9CCRxsR37QC5Qga27l/hTEEs46SZGP9KXsbj4mpkTFuZBjRubH6ZB+dth4amhOSWV/PyFBDbkWLhp8zWyRjZlfySCQ5xUD/HzrZGDI2VdxI63BI1rRGLGCNdnyJ8KskkOT7n53mZTLn5mRkuI0e8ho/wDK1BTVEjPkzbPsr90Hy8Xi9ic4xz83Ae5nAZgIvhSFz5MaVSp9t/rhI6FzdKyzaKUJJm2MnDmNcIQqpufa3iK55kcDqYzGTPgjbHO5zXSSNAaXk66XVKrlIoPPkaGt9wF0bmHcVUgeSUhhMT4tzBI5r2OADAbOaAFF6JA7HM9hLXgSNcdSEKIlMB1z5GsDfpBP0Eo3T91ADTRHJIfcLtyq4kqPAoKACm5EjW7N7NrDtewG6Dw8aEwZ52bjYMUmTlubHjtVz3zObFGjQqqSiUmykU7mfu99teBa9uZz8M8zEXHxN2S8k3tstb41SVn4EzNua/7oeOZvj7f4GbKe1ywz5rxGxfHYxTWixPyS2kULmf8AuA+6XNF7MTIi4nHeE9rDhC//AFv3GtFiqtw5MofJZ/dPPvEvN8hlZrna/qJXFq+QVBVpVQobBIuGlKb3tBuClDsNUCm8VDGrZZfMogFLkVwQ7HjceDtbueQdGhVpSyoQ/tgjAPstjH9UhA/YaA0Gn8vhQN2+81xujYgpUeZo4sXJIFfzpf8A/qsBJ/qebfgKfH5Dn8DDszlMj6pRE3RG2TypaDizLV2TwzZuSjy5979qX1vprXNlvodWKvk3jhJH4hEasgjUX1d+FefZnSX/AIyQWMcZkKL7s5RgHkKlMCxtjfO1rXOfILARwtIafn1+VVEkuyQQzh87cBDhSNe4KXNj3Ot/qfpVLE/gX5agfdHZmVyHDuhzMgYu4gNbu3yBBYv29B4VrwaWpje68FU4Xtzlu3eShl5WUZ3FyAR4suNu2RPAsJPAO6Gq4nO7yXrKz8lmLJCyT2ZRGXRvaNzmuNgGjretnsZyEcf2/HyeDkYXNNkz8LJjMWUMhA07hq0JqDpVKk7m+DPfFZWro0fMHf8A9tMj7eco7OyC/I7Zke7/AI7kYxuDevtTAWa4eOhrmyVa0R+r+p9xizqb/wAkihZefzXKn2OMhLMI2L5EKNOpDtLVFa1pvuezfudjs2VcNYXywp8uDhwl2Rl+7LEjWRwgFhcmpJ1vU62eiPRy2rjprbb/ALkZl53/ACQhDHtdlSuQhqucjURWiwrWtVU8q3bedqtHLZIiGbGjlbLHuyWkBshdoNCqWQrWbep61Ovaq5W1YbxfEc73FmM4zhsTI5D8skeHGdjVHUoGr8TQkeV2u/TFaL2VUad2v9gO98svkz8fH4uEgtb+qk9yVOqtjBQ/Oh4r2PGv+zdTFPFOxO5/2N7VwmbOd7tx2yxAmIj22qVVHgkn5UcOP9xw/wD9SZ8rXDDKK33P9lee4XFdznB5EXKcc0B4Zjx7JRCblwYCQW/Ck01WXsez679lxZcn48lfx22+hG/bz7n8r2O/KwsbGhyI8pxcIJQjY3Cy7gFb51Muv3I7PZ+qw9/y6tH0t9vO88fvPhv1W1mPyWMfbzsUG4cRZwGu09K68OXmvqfl3uPV36WWP7XsyD757I7Z7/5eTjc2R/H9zYsG/Fe47S+Nws5rSdsjF1GorPJVWtC0Z1+r9j2OlXnVcsfkwLu37c96fa/NHOYchkwIHB0fIYe5A6y7hq3XrasrVe1j7zq+16vfq62ifNWbB9uPuTwX3E4Z3b/eceNBnysLTBNtZHmAW3xr+cHUD5VdbJ/bY+P9n6nN0MizYZ47/wBDM/un9qsns0u5bgXul7TySGZATdLiuWzXOIUtPR3TrU2o67n0vqPeV7X2ZPtt/wBzOeD4DjOe53E4rO5I8djTObGcosdINzjYHb4+P40coPX9nl/Hid1q0aL3X9oMn7fuxe6+A5WaXj8KaL9TO8D9TDIXWkYBZzB1bReY+T5boe2r208WSst7fU2HlPuB2nxfA4ub3LyGNyDciJssTMcNe+Z4ChzYr7ST46VXNRrqfNYfV9nLmdcdXXX+h8zfcXvLi+4uefynEcczCyHsG97bqRo9/TeliW1NK8tdj9C6vW/w8f47Pnf/AKIgoceXMxf1XJZrpnsPrGQ8pfQNXxFDcPRHs9Xq1rWb+f8AQVkzY2I6DFijijjkRzmMBd5+s/yqUmzqtbHiarVbjZ5KLEyd8URljxkQCwLz1BNPg2ib9pUbUSkdPMZfKzvysp7YWAI9OjR56Ck8aooDrdp5Zb+2qIjP7qwYGPjwBJkZNwJnn0j4DrW9cDtqzwO/+0YOunXD99/nwRGLi833FK3Ha18gJX2426k/Cuh8MZ+f9n2nZ7aiz+02nsT7A5mX7Wbz7v0uMRu9vR7gfFdK4MvZdtjirjrXU+gO1+x+K4GIQ8PhxsjQLOR/+cb1yQ7Mq1oLczGxoEE7jNJpsZYA/AVrEGUh0fvCO6Y0ejV+op5CtFJDgfxwrgIY3STuKNdJckrZBWi1IbgvnBdmxtEedzQMk2rMVfQ3/wAXj8K9PD141sebl7E6VLZvYGljGhjGaNFgnlXdEbHFLe4xI8WuSfhSCBh0jPqcQFvf9tIqBp+TF0I1/A0DEmdjvSvzpSB5rmdRfw60wPOctkufCgB1paG2K3BSmgOkq0+C6dVpkoac5y/wTzoKEOLSAVt0FToA0SWj/T06kfKgCL5YCTHdLYPjuOijqKi6lFVtDK5Ly0MUY2eom39LfmteY8iqejWjaAMjkMuckbzHGfSALW/eawtds3VEgYx7GlxN3audZfIDU1mtC9yCz+6+e7af7k8Ds/hmaOZ/vRs626pXVj7Fq76nJm6/wU5vCdh/cXu7K7mnyX8lkmKMx8XNua3HYwbTYICCb61h2LcnKeht1a8VDWpbP/j3amNG2GPisYE2DGxhxIricHoJEJl9qcHDOM7jGf8AGZ7XB7Swlyubp6fy/KlzjUVsfJQzaeHycnK4Tj87NaW5c0IdISEuCQqeaLX0+GzdE2fOZElZpDj3tfdwAKoTqD8PCtTMac8sUfj1HzpAMPLFVdmpCXFEgJDgbuPqNwf50mIYe0tsPpKHcPOkJid7A0hx10cB1oGR+Y8wqY7k2DVuKTYPYwv7nc5NznO4/bmBIPY4ojI5B2rP1DgjW+ZaL15XbyToel08evJkZg8NjjbK/wDvPPVxRi+Qry2erMk3BitYSNl7IEQX8qzGDdydunmuCy8Dazc5hMTX2Ad+VwTqK2pbi5MrJWUHzdyWDPxWQeL7gxf0eSLQZabYZStl/pJ/CvcxZVc8nJidSLmxmY7iJiW3U2unlW5gOY0sTHH2yS8oi+FIAuTJKLaPbZDqQPCgCKy+WxsYnc8PW4GppwEkS/leQz3e3hRkAlNxH8KTtVDrS1mWftz7Ydx9yPbJK0tgdcySqG38BXHk7Va7HfTqPybf2r9lOE4tkcua39TOPUrrMXravMyZ73O+mKtTUsHhsTDi9rHY2JgQNDQgtXPHyaNjz4i0lGkkLtaNSRoKcEyeyG8DyPJcj2hx/Mxf/IeU4gZXZszXtDczOdG738cqbSxkI1hQlK9fF06NTJ4+Xu3Tag+W8j7M9xZnZ8/eo54cx3PhZUuL3P21I2T9bxew7YnzOeS7+40K123b0Br1EjzOeuuxmszJGyfp5IzFM0gyMcELbID5j4UG24O0eop4pbVXUCHBtcF1JUlx0sUpjQ6xwL0UA6L+CL8NaAFOhIaUS5CEFQhRP86Qg08QIsN2dmTsx4Gb3h8tjI4LZgGpOgAoFIDkxDBJdmxSYrmxxyw40gBnmZMN7XgflaWncCdaUyUAZEWPNHHkCUTRSBDba6NwsGO/gRRIiKycWXHcXMVAdRVEs7HmPA9t52rqfH50BIZMyaGQw5UL4ZdrX7JmujdtcFY5HAFCLg9aUlDEkCjcw3VUpkwebklxDJgWuARsg1QeNATAVBN7bml92tQsAuCfE0DJaKE8lCTKPdCfWR6hQOSM5bgZ+OZHPua7GntGRY6+HyoJIN1iR4a0COX0GptQIexsbIyzthb6dS51mgeJNDcFJSTeJu4lhbFC3Ic9C+ZpQoNGgHQVk/uOiqdRnluVnni9lsboGPA9wJcjVAfA0UqkLJkbIMuVQOmlanOzh3dddaBHtb9OvlQAuON8jgGpuKoTZKBj7o4jCJfcPuqhadE8jSKglePZyceOXMY2LHP05WSNob5tW5qXBpWRqeXho5XSTSy5krrvIAjYXHVKIYvtTEf8qxhAgxI44igcEV7h1vRxHyXwXPsPHbHn5mZiFzYJYGpGFBVzlT5JXB2nNUmep0lFmy2ZMReT7x2Aj6WBS4Vwo9MGEGwO2RgMXVymqkkZdiFznFyoOqKb9avkSxn2Ax5RquNr3KU5J0HhC1PWECj0daQ0P+09xDGM2dQ0BXHwokTJHH417gsh2hty0XcnnS5CmA5uNjwM/tM9Qapd+VPEuqJECzZQeBtZ7mwWefTGP51SRLInOmiDd8z/AHNS0mzRboBWtUTZkDkuL1I9ISzj+OlbIwZEzbW3A3WuSOnlWiM2R0zmkq27gg6p8K0RmwdzSik9LAaVRAEeTmP+20Rp1RTWvE53Y5h8pyODnY/IYs7o8vGkbLFILEOaVFN1UQJWZ9ifb/uyLvDgcPmWIchrdmVC0qGTNCOBH7q821eLg3LhCsZcx42qdzdXI43/AApogS9xcd8O17rnahCHr+6hgKYjXe4/8xDTtXUnwpAP+7IHvaC1rWqWnUW6HrTlARnJd09u8BjCfleXxcSPdvf7k7S5yfUAy5/ZT1e2o9ig87/3Ddr407ouB43K5kp/uhMeEkC13hfwFaLHbzoPQzfm/vZ3/wAs9ePGHwMAsGwD3Zfm963+Aq1iqgM/5TleR5eQyc9zmVnuJJLJZXFqnVGqlaKsbITAWniYUEbA4N1+FVqKai250LSsWMq2sAL0oBWHRlZkt4sfVAC7qtEFSxZfl/8ArTRwsHilAagr83AYEny5JXf0MsD4XogmUtwZ3MQN/wBjGBdoXSHcUquIuaGH8nyM9mv9ttwNgQUQkLlZjQxp5XF07z4AONDsiuDH4sGECzdz9EFTyNFQMZBtF0YBY9TUNmiqSfGcdNnzsgwsaTNmeUZGxpeSfINBNZtlpG0dn/ab7iZj4WDhcnHjcie7tx2f+Zzyv7K5rLka/kVTbuH+0mLxDWTc9ysMErT6o8cb3ly+oe4/+ApLD8mds7LQ7K7V4DbDDjROaz1PmyX73uJ08gKf21MeVmF4H3C4Vxe4+1itjHob6QSfBqdK1rlRDksLu5OPixf+Q5HMhwMEtXfM4BQerQT1rfnWJJSbKJyP3d+2omyt3LNyGtYmxsbi5xB0Za5rB5KmirYpXHfcvCy8ufI/Szcf2e1wjhyclzf7znatLTcA6isk/wDYbqWnicwYby2Rx/4rKlc/j8xvrBCKIpDdD/STrVpwYw1oSedzeTBiOmke+OST0sx/zEIQCB0K1o7ARMfDz8nxWV/8pgc7guRb7c/Hyptcz+pVJB3BVqFV7m+LNbHaany99xO0+V7OyZ5WtyWdqZMpZxcz2kRpqY3uGjgND+aoVU3J+kdH3LyYodocbFNx8GabG3NUY9y1jSrnk6HyqnaHB62PDbJhd3/BePkleA45ntt91j4t7juEae40NVQ5UNYZb/B7Hq+sq4eSXFv/AH/1OZuW17zi8e2adjiUnd6QeiJpTonuzTs9rT8dE7fUuHYH3F7l7ChlfxMzIhMAyTFnbvEzn2Dk/qbpaoejlHn9r1mHtYksyiDY+yPv9kuzjx/dsbIpMly4uWwIW7rJI0W2r+FVjy2W+qPlfbfrtMeNXwTp4HPul2DJyQf3H27imXMlSTkeNiAcJGk/7sY/q/q8elZ5MU6ow9J7tYf+HNt8/AZ9rIvuBwj48Pk8ADtpCWtmkAnxy7pG0kktd1H4U8PJMj3+XpZfvx2+/wChW/u12THFy7OR7XwMsSZYdLmwQwGTHF7OBaFBJBVtLLVVemx6/wCve5dqcM1lC2nczzsbvjN7S7si5Z7zDjl3s52K1SH45s4nqHA3A8qS+3VH0fterXvYHXzvU+mO8u28fv8A4LDn4rOYzkIduZw/KRuIJ3C4JCEtcNa6clPyKVuflXR7lulldbqa+ancIzds8MMPvPncbN/tAPnyg1hLOrCpO/4kUq/aoszLM/zZeWCjqm/BkXfH2b4rnSO5ftxnNx5iBPHx7H7sZziVJgcD6Hg9NPhU8VErVH0XT93er/F2ZjaWWrtzvt2PxkXbX3WgdxnIOxUZlZbd8WfFoVAUBwFnD50ucKLLQ5M3rbXyfk6j56/7EXF3J9m+wMF0nbrcbKzpHOcxsKyZDrklXSD0ACkmjXJ1fY9mypeaoy3v37xch3hx0nDMLMXinObMIo/VM5zTYOeacN7n0XrfVYOp93LlcpeIY8TC3TbpWM9Toj+UOtrr+FRbV6H2uBVxYuTBRA8Sf7bdjrrtLkDrrfyq50ORKXsiTmwztaS8StAD42kBr9psCRWasd9k2tXsN4+PIHyOfHHG4NJMpO4hLjU/uptnI8TvfloRvI53DYOPtkkM8z3Fz0VXEaVdK3bOPu93p9Wj/Jbk3/uVufMzuTH6bEaYcM3LRYO+NdapWur3Pzr2Hu8vZX48f2U+Pn+pbO0ftrzHOzMbiYUsrSm6YsIYAeqm1Y5Ox8HhUwqutj6i7D+1mH23AwzRxx5TgskpAe4nwvXn25Weuhq7JbGm4vHY4YTFC/JICbnWa0iqVF4MXbUI9kuZ7cryCdI4bn5npT4j5C2wvgQRNEDFQkDfKT50+LFItrSxXuCOGkktz+FUkyWaN2p223EhZy2ersyQLC1w+hp6p0Jr1+vghSzyexnlwtiyuP1XVvjXacQzI5jBY7T4a6UDKP339ye3ex8IZXNZQZK8E4+Mz1TykDo0fvNqwyZa03NqUtbYwzL+7f3U73lezsnh3YHHGzMqRoe8g9S96NH/AJQa82/bs9j0K9SNwP8A+Hfd7kz7vL92uxXG5jZNI9wPwj2iud5bvyb1wUXgfw+0vuXxMnvY3eEkj23Yx00u53ycXVDyXWslf49X4LnwH3F724R7Iu6Mb/k8QWfkMA9xoGp3tsv/AIhW+Lu2T+7VHPk6mmhtXGchictx8PI4Eglxchu9rhqPFp8xXsUsrKVseY1DgJXajv3VYjxcvqF6cgIdJ6wCu5LedEgNP6uBAPX4mkA3I5wPpsU9V738fGgCNz3scwsI1CkeIFAGde4Ji+SNNriUeq2Xz0r5+7Tsz28f8UdkmYxqNeXSOF3DU/M6fKok0g85zhH7j7MFivpA+ZvUtwixvc2RfZiMzdEPpjK+JOtRMbF6EFB29xXF58vIYEDYMuZpZNFiDZGQSpXprUNsqqQvIyjH6HPDCTaKL1PcV6msZZrK3LR2z2Vn8gWchzURweLHqZA6+TkeAK/S3x616XW6drfdfRfB53Z7aWldy6cjMCkcLQIWgNja0IGtHQDyr3kkloeI3JHmQoC36HWXoookDm9GkscbWF6W4DfpkAIdtK2CLemxIS4kD1O2pceZWpAHMgILXtVuu0UEyDTzMYHHcHNI1HT4ihjSMu+533Fg7Yw/+PwXiXuDLaRjxk3habe4/wD/ADa5cuXitDpw4XdmP8A4NiRxM+XMTJkS6udI65Jca8W7lnt1okoLZgyFhDHPDnC+xqueR8axaLksOM5qAge0otu9TylKCJJGPa1pDdU9Usuq+QpgVzuvtPhO68J+NlQieYtLW5LhtDD4jxqq3dXoDqrbnzp3b2Zz/ZkvtStfyHBg/wBudgUxtJ0a4+H9Neth7Ctp5OHN13XVbFLl5iHHKRAveVAQFU6L4V2rU4Xp4BGO5nlH7GK3dZrWqpX4VFsla7l1xWsXztj7PcvyhjnzWOghdcvlBLiD4DWuHL3Etjux9T5Nw7X+0/B8M0GXHbNMgWSUAq7Ww0FebfNax30pWpoWHxUGFGPYjCNQgIjQ3yFZQU7B7AxqF5DxqGtqkS2OOc5zS0ANaOiXT4eFOSUC/qAxwRu9jLuOthf5VMlNI+Ju7uZyuf7gl5Pj8t+Fy2HO4YzI3mIOdDITHLE8Jtk0PitfTYlFUfOZfubN3+3ff+V92uSxZcXPh7b/AO47iscw42ZOxv8Ax3duCxqvws6KzXSuA9Tfz/WxHVsjmtWHJEdxds9u/dLDzud7MwHcT3Rwof8A/Kuxy7dk8dIHbXz4r0/vYpcNRdmjk1MteUXW0bmK8lwObxZDp2F2MVb+oaDttZHf0mhMsjk2+kC6WGtiNaY0ea4BSXIV16gnr+2mA4x5JC6CzviCoT8KAJLk+Znz8LjYZULONkdJFGAG+mUbXhfEgAr0pCgmuI47iGcUWTxDm8WVk2Q7kJ2u9zHMDWvZBG0HcXuBezboTSE2RPL9uuMz3cMx2Rj4rQ7IbtDZmNlJc33IwoaE0/alTBSsQUoLHFmTGY1vsJCI7RD8KpMbI3K44NJlxiob6i0+NUQ0Ecp3NyHMQY0HMPdl5WKPahyZnbpmwtCNjDzcsb+Vp0qYCQKGcHR3xHW3kaoBZ2TEBFJ6eNACSJsQkJ7kKgOS4/GgCc7e5fisKSSXPdIcZoJ9tty5w0afD40CYF3J3LJzs8L2QNgxcZntQRt0RVJPmaBSQL3OeS8m51TyoAN4fjDyvIwYa7MYuacuZy7I4l9RcRoDpRMBElt727sd3f3Jlc2MLG4uCQRQQYGAz2saKLGibCwNaPEMUnqaz3N19qIPEkxZWyz5bnQww6bSPUQLNTUlx/CiA5AU/Il6LcIm0XQVSRFrADi+d/pClx6CqIFxYk8pADFcfALf5UpBKTs+MYHuhf6HNPqJPU9EoG0S2D21yE8X6mdrcHAs45mX6Gkf6Wm5pOxSox5+ZwnFEt42L/kMoWOZlD0B3Usj0+C0obKlIicvOzeRmByZXTTPIaxmoubBoFUkQ7SWXCwMbtR7ZuYxY83mJIxJHhSoWY5doZWj86aN/GobKqiNySzP/WSSMayZ7TI0xtQNeCCAB4Ui4TRo3ZOE/F4gzSDb+ocrfHZGNo/GvM7Npsev1axQnnQPDQXN2teNwDruIXwrmR2Cf06APc1AvXX50xA74XF77I09dT8KoQN7LmP9DCZCECBdep6CmSwuDjZJneoOuV2joPFTRIpJCKGGBvoG5ASS36Qeo3daUktnvdT/AGR7vQhEhB8/GkMYnkejXyneBo53oiCaIOtOCZIzIne76j/53gNaAv5W6k1qkS2Q08hc9xjG4iznyWb8AK0RmyJncN13e67/APBQ1qjJgU5LiQ4hw6Bth86pEsEkAAJJQ+VvjVkApb/TYeNUQyKEBXz1WtpOfid9r5+PlSkfE077Kd4f/Fu4v+Nyn/8A4r5ctjKlAzIFo3L0XSsM1ZUl1R9XXdAZZDtlU2GtvHyrlTFBC8lzvHcVG/LzchmLF/8AbSvaxoB0sdflRM7DVTOOY++vGYkjouHwn8pJECP1Dj7EC6WJVxFaVxt7jhGb9w/eDvDmmugfyI43DcoOLxw2OQ9DITuNbVxJClIz+TMZJIJREZZSV92Yl7iTrcrWvEnkeM2bL+ban9IRPCnoLU8MHIkCvcVPiVp8g4sV+jx4R/ela0+Cg6UpkcLyNuy+LiUNDnu6EdfjRDFKGn81tQY8DWkaF2op8RckDy8pnym8u3ybZPwquKFybBts059Rc/oXFTRoghscbhOJBeg8utS7FKgTHitVGgnwd0BqWy1UKELWoSQweA1qWzRVHo4twG1hcNAXVDZSRdPt52BN39yWTxzeTx+KixIhkZGRKC4mPcGpGxt3OU1na0FPQ13jvtr9pu2i6bMGb3LlsaAI8hIMXeChcQxHeYWsHlITnYuXD95YWEySLguGw+HYz6DjRNjcToAHAKfjUO7C1YDz9ysvBDxJMcjLKuKuO1Oi3qebFxkoPcv3A5jky2N0ggbGojLSV81vRqzVUSKfmdyZ72+2/JkeCVIc5apVL0BsTurIxA4QNMs7iqG7VCa0Oobg3O92T5EbZu4M8zyi0eIx5IY3ooVPlVKjY1FSrN74MEpfx+E0yj/bdI3eGn4GtvxfJDvJG8ryXdPc7geRyHmJv0Qt9DG/Bra0XGoJWZrv2p+6nI8ZJF2l3W4fpMr+xjcjIEaC0f22yKU10dWV18Gn4VZfU+gOE7d/9yZ+5cn9dLjRB+POx39iYSG3/mCaU6JPc4bKHqW3Hxm8pN708bo8dhETIZFAsFUAVulJA9ncJ2xyvH5XBTYkOfj5IMWRBOkm4Pv6RoDax6UOqZriyulk1uj5U+7P2e5/tDZm8M79R2a9SzLdGGz4pBszIDbgf0yaVyOnBn6X6/3Fu7RYZWNmXZGVG7bgQTiSMJ/eeHN3EeJFZpeWfX27FeKw0c/UlsHjswEyZb4jiMBRrhsaqajqv76ztdbI6cXXurS4ga/Wsjm24GO3Ika4E5DgA2M6eknxWnx01YrZk7JVXL/4F8vmB5HvsDzH6DLF9TiNQD4A0qKAz2S38m1fZj7iyxGLs7n8lzXvA/4rLyCfQOsTnO6H8qm2lWrwz89936NR+XD/AP5I0b7pcb3ph8IeT7ZzEhx4y7OxIAmVsb+aN4Vbaj5iryJ+HoeB6ivWeXjmWvgx37efeblu2s39NzM82fwmW8OmlncXZGM4lPcatyPFtRVup9Z7X0+LLScK42Xx5J/7v/b7E7i453d/acbDntBzcqHFd6MuBwBdKwD84F0GvxqklMo8b1ntr4bfiyvREj/2+9zcvmdv5HGchC48ThSAcVmvQgseVfCCSqg3FFHD0MP2HHRZleunIY+8n2/4nKx+Q7rgzzicwT72zKmPsPDGoWRsOjnIoQa1NkpL9N7C1GqOsr58kD2r998fie3sXAn4UHk8cbC+INgjeG/nLR+ZPqTWnLWiPWv+uvs5fycoq/8AcqPdv3H57vXFc3l2wYnGsf7mNA1g94E+mxKlUNZtS5erPp/W+owdRck3qUTHZiYw90RbpTZjXkvLl8RVts9LFTHV8tWyS9qFjGvZBiwyHY+MOB9wg2sDbXpWcs3pjx0snCkbGD/yOROc1z4ywrIGDajdSbpY0+XFQicmJ5rOXomEibFZN7sDI3NarG+5Ifba0DUHVamGy3atXJE5/PYjH/qM9jQwAsbDA9AjfE1tXE9keZ2fZYsKnIytZXPZvIyvZx8XtB1gQSCh611VxKu58R3v2PJkmuBcfqTHbHYHM9yZLWtY6VzjdxBLR/Os8mdV2PmWr5HORyz6c7G+yfB8Pix5HJYQycsAEuns0W6NKqK4bWtfc0bS2NZ47h8bHaIsVvsxNH0Qs2fJaSoZuxORYLIXAshbuH0ukO534Vql8GTYU2Jwj3SqRohO1lXApONgVpdEC4aI0bGD4k1MBIpWxN9ZUkKdg/e4+dDGSnbnGx8jzMDCxohjHvym77N0buNrmujBTlY5uxfjU0579UC+ASwr2YPIB3mxLTbQr40AVLvTubG7X4HN5rJvFis/txfnklcUYwJ1cSlY5bqlWzWlXZwYdwfZU3O8g/vP7hMGZy+YRJi8dKd0ONFq0bPED8teFazu5Z7dKKqhF83xQxtx4yGRAI2NoEYQdA1tJabGgLPmGII1Gga7js18tTWdrwXWska/kcZqxs3TPJUsjCW+V6z5FRA/j4XJZrmxANgZIjWQtCyvB/0jr8a2pitYxvlVTWe2+JHb/DRcaCsoLpXjRodIVICeFe/ix8KweHktytJIOfdRZwua1MxDilwbkoh0SgBt22Qp11HjQA2XGP0u0XXw8qAESyMjaN11+h/nQBQu/wDudvBcNLJEQ7k8gnH4+AWc+aQIvijRc1zdjKsdTXDjd7FPwEw8THx8yVZmRtab737gFNh518+rHucYUBzppHAOha2Fuglm9T08mim2OB6HEMn9yfdIf/tJ7MTybVVr8ibHJZS8+ke4W6D6Ix8qGUmCY2Fn87nDjsBpnnKb44fTFGP6pH6AVNcdr2hBfIqKWX/he1uI7dTKmazP5Zt/cIWKE/6GnU/6jXtYOpXHq9WePm7Nr/RB+XlPnc5+87tVruOMD9w3ebHx6UhjEqb90JCdUuPgQaQAjn7QDotwBdaCWzzH2JYVUqn8qBnnytLVKqqEeH8qQAGTOILNJczROt6GSY/9y/u/x3a7JuP4tzcvuBCEZeOBbK9NT/prlyZY0R1YsLtqfMuRzmZyvIv5PPlfPlzOL5JXk3XzP7q4rKT18dVVaFl4XlyDtdJbTYzwXQmue1TaZL9xXLQxMarmxrba31OvWDRKRY4s8RubNE0QghDJL9RXUga1BSqERZL5X75Fkcqh71DQf9LRrSaGHNn91wMm54bZD0PigtUBA1lwRclHJjTQh+M4Frw8Aj5f5USyloZjy32M4vLzxk4sgx8d3qLWgF2tx5fOuqvZskZPFVstPb/234Th09iFrngf7r0c792vwrG2V23NFVLYu2LgtgYGsAa0aE6/CsoKkPZsYh8Op0WqEce8SDcX7QNQCgT46USKDpdI9BitFtei/E6mlqGnkIh4ueRxMiofqaLN/mautGzO10h3lsbF47huRyC7a+HEnlJHTbG66V0VokzF3bPztmcZZpHm7nOc5fNxJWveWx4z3Y5j50+NPFkNe4T4kjJsOdjjHPDLE4Pa+OQIQQQtXJm0T+J3x3ND3m7v3iuSdidzMndmR5uOA2f3pPra6M+mSOTSSN1nAmhaA1JuuHzfZ/3f4uXl+Cixu3+/mbG892jMQzGy5D9WTxu/6o3n64T6mHxF6my8krQynujsmXCndLxkZjcC4zYUnpId19tdP/DSTNSlbXtOwtIcLFpCEEdCDVki2oSCXAG3Xqv8qAPF6tHp3AlATofhTGPYOXlYEgnx37BuDnN6Fy9OoIBNxSCCzDluGhxHtxZf+Ln3DIZBB6jlO373QzTSeoM3BWDz1oM2iu50kfc2RkvnB4ePHjmnixWtEkMsgCsaHKA0k2J08KTGiKOTx8cWPh8f7mR6C7OyJijfcN9sYHRo69TTBSDy48U4JcEkIUJY3KXFA4An8bnMjmyYYJJMTGLRkzxtLmRh5RpeR9IJsppigRHklpQi+gPh50BIWJ2vDYgFiaFQ9T4mkM47EbKxIbudq3w+FMTQHLFLATFM3afqQ2+dAhOJi5XIZUOBhxOnzMl4jgibq57tB/OmItfL5GN2/EO2OOkZKyFJOUzGj1T5TVVjXdGM0aKjctFYkyN2tj4U4BsHBLlBut72SmSdG0Hq7wGn40AS2KOPEImy3mNoO0wsar/kKlyaqCXGLlvjbNC1vDccisyckpI4Dq1mvwqCgT/kuI4x/wD+K8Y5eYCpzsxHI4dWM0Hzpw2KUiMzuQz+RldkZ+Q+eQk/USg+A0AqoIbkEJ0TUrf4UyWXbs+LF4HhczvDLijyOTlecHgIJUIZIQsmTt/0CzfOk2OqA2MlfIciZ7cnMlc6TLfJdwGpJXqazbOlQhmHDfLkw40X15MiNYPysVaVnCkday4NjihixcdkMLdjIowzcdSg87CvGbls9yqhJHQZHloYNxKX6ftpDk4TJJGSihtj0APiTTA9BhSSNuqAbXFS1gHivWiRSGtxsOJrQ/1SELc7IwB4Lc0pJbGpGsk2+0N4Zo5S2Jq9KYgZ4DGuU+8epd6YgPIdacksbkO2LfKdo6OfZgGh2t600MjH5DpC50LS/b/6slgP/CK0ghuSNnyRvVP1EuoXQH91WkRJFZT5JCjyS5VLG9K0RDYDPsaPXZNWt1v51oZgchcfUBtjOh8qaJYK/YHekq7xqiGDu3OKONvDQWqiWI9oAeoXNVJMCCw3Aanx0pgN+3ISrV3NIcC3oRoV8qANyy/vtnt7S4vDxodncswfFyGbMjomCIBoLW9XPCG9cyxa/QpmVcnyubyk7sjOzf1Ezr75nl6E+DfpHyreqSJI2Vsbz/dytylUBtVyRAlcBgAIc8r0FqBQhL+Qgj/2oLi4JIpwEjMnLZJBDGtYngFo4idmDSZmXMSJJTcIg/yqoREsGIJQvUkFNb05A62NxXYCo6aUNgkEMxXvO5zgLfT8KXItUHo8eJtg1UspqGy1Um+G7c57nZ243CcfPmSusBCwuHzKIKwvmpTdm1cVnsjTeP8A+3Xu98AyeczMLho3aRZDjLMpuPSzxrht7Ck6anVXq28lJ7s7M5PtDkWYedK3JhmaXQZeOxzGP22c0h4Ba5vUGurFmWRSjK2N1ZDNiY09GKlvqcfhWjZMBmPiz5Lg2KIu3WDpNPkBUNlpF17P7d5CHl8HLOU7AYJGh2QPTtY4o706uCdKxtkTLePST6Nl7aw4HRs56UPheN2JyxtDKzVHEfS4edZwcbYxPh9q4TS7FkyMsRer28SB8rS4DqUFDgSTZn3Jt9szI7HwYCC978p4Dy3/AMAUg+VQdFamfcl3N2zhteDJJmPYSG7SI41PXxNbKlmVoipZ/dn6wluNjnaNGgWI+PWt1jjch3kRhQd0cy4Q4kT2Rr/6bSP3UN1qNJssnH/abnMtwlyWkOKFxlX9tY2zrwXwLpw/2dx9zDlP3lbxxNUgdVIrC2dvY1VEXXF+2vHQMEcGM1hFg+Q7nL+6ufmzaqgh+4vtljZELmFnubgRvTaG/IVVcrR0V4i/tz3ll9r5R7D72meeFzHgcRzExLjjTBAyN5P5D0vXXXInqLsdZZKzVfcfTDYs/Nj/AEkMwx3ANbHkhDvYAA6RortWq0Pn2o3JXCweO4OB36Ue5Nu3F31SFxsSvQGtEkiQOaF+Y/IkzMeJ+LPE9mZBKC9s2MQQWFuhJX8KiyNK2aZ8u/cv7V8f9vjld49q40mV2mBufBGDMeOlcQbqpMRWxP06GuLNS1tj9J9B7vFjo6ZP5eDEMnlocktfgYks5Li4yyqGaqgHl50q443aPo8ntlkj8VHf/sSUOfzn6D2/0jIcdz0e4RhUXoPAnrWdq0nc78ObO6Tw46j0z8YvklfjyvlAD0BDWNIS7fGwShI67aNtrYYdyb81zZPf/TA2ZDfa0LouoqlSDjeW1/MI3z7Vd1d6Z/bv6Xl3+9iRNLeMznPDpnMa5HRyAf0/lJ6UT4Pyz3WGmPO3Xf4H8r7Xdhu5PK7k5SaU4U7m5Aw3ye1jsc76k0chKlKbaQsftu06cK7h+b9wuzu1eMbx/DndBDGsEOL/ALLGm4O5508UrPmohHR1/R9vtW52UJ7tmK9t9/8AOcNy3K53CzNjxsg7pYWxh0D5HOUSMjNmoeoosml9T7d+pwdqK22xpKSJ5TnM3mc6fK5WeTPyZV2xSEgNef2IE6UJaHtYej1sK40rt/uRfIT5GW6OJjAyONvpjiHpK2LupUkVdUluPLLfGq0PN4+R5jOS725XBIgfU5Ra9HM2/wAVwp0JOLCwsdkR91z5G2MbgGq4XLVPVaxdrNnXTDWlUN78NrZJ5IJJM4/7e1HI3yI0Ip/dMToZZaVf3RqRZ/XNYZsp/uQucWn3HI4NcNCfKttDyWssa6KSB5jnQ17cTixucwbd4Ck+aePnXRTF5Z8p7X3dcX/Fh1fl+DvC9n873DkNAhfI53QKQBrr0qr5q0Wh8Tf8mZzdm8di/YMnZlc0HPZYnHjCAk3Cu0rgtmtbY0Va0PoHgO0sPh8ePFwcePGYwWEbd0i+Z0qFRsh3LVFgtia0vG3oTI5fwArZVgykJjgG30EvZZCuxoHxp8QkUrI3ENcPA+yCdOm51GwkeG1x3bd7l6kvKDzNqYDrgHgGWT1HQN9RHkEsKAEI0g7QA4fnd63fgLUMJLZ2OnvZzyfU1kbW3CAEklAK7+p5OHt+C2ueBcXH7jXecLGJV22N/DqRQCM8+5PGN5ODh2yhpwYM0ZGS1wJa4xscYwU19V687uqaf6nd1P5lbyMzEiaXSOdIem07R+Aua8l3R7CqwJ2dm5JDcWEQwae4m0H5m5qJbCUjQ+1+G4Tm+1o8XlcaPLlhle2WQ2kDnHcCHBHaV7WDFS+OGjxc+S1ckphkfYvbcJ/sCaMaOa1/8UWtF1KLZEf5GRklg8ZxnF7hgYzY3kIZXeqQr/qctdFcda7IydrW3HnkuBa4EkIV61RJwEOVRtPT8KAEEnRw9RuT/JaAG3vCbeqemgAaTJDR/dKDoTagCnd4d+8N2rjukzJQ7KeD7ODGd0kh8h0+Jrny5q0WppTG7bGGN5bke8ebPM8pKSIjsw8SNS2JguQP4nrXg58ryPU9rBiWNFyxQIiGFwb1IYN8hPS/RayRq2TuKNrfeAETOskvrcvwrdKDNsLjkEzg6JjslLl8lmr5LVLURI8Z2rkc+8y5Uxi45rlkkbYW/KzxP7K3xdZ5N9jDL2FTRFvgbx3E4h4ziIBjwNKuT65COr3dTXr48aooWx5d7u7lgL3lVetyocOnxrQyQlyuI/K4+pdGn59KBjbyGgiWzurul/EVIxqRjoXKy4Bu3T8KJENOMbnAsCOBu0i/4dDQKAeZ7IrglzCLD+k0gZXe4O6eI4HDdn8lmR4uKwf7sjkJPgBqTUWukVVN7Hzr3599s/mDLxnahdhYL/TJmvCZEgS4aPyD9tcd8rex3YutO5i2RLJK4vkJkeCquN1NyfOuc9BVS2BjN0+oopTQfGmNhOHyD4nox9gfpjFyfBaTQJl24TlJNrQP7Ybq4EOKf+I6Gue1TRal343ko9zQVO8KXg7nE/E/wrmaLSLLDJJMB/6UX5j+b4+NIJD454IgI3u3OCIRcr8dBUwSHMmc4WRjbegXd8zUsofZuII9LG9Han4JQMJh9LUibcf7j3J+/SgR58zGIdwcSCWglB426n5VLcDg9CzJzCGsiIYfzPsPk0fxoSbG4RL43De4d2V6y1fSPwC1usfyYvISsUMULRsGiAuQIPiTWySRi22Ol+4ENs0H8pDR83GnJMEbnuw8vGyMKeP9TiZEb8eeNp2RuY8FrgXm+hqHbUqD4p+532l5n7fZhzIFze1Z5D+k5CNpIj3H0xTf0uGm7R1evgzq6h7nm5cTo58GcvaXNLvzeFdSZzg0bBq8EuLvSliCLmqJRJQZJLY4solzIyJIMiNWTxPFwQ4IbfjRANSadw33IhzYouM+4Zdn4QAjxO58YbsmEGw/VMb/ALjR1cBv8VqHUWwX3J2QJoYeSx5GZeDkNMmFzGGRNDMzp6hrpcG4pTA00zNc/AyOMmEOVEYlUscASx48QfOtJAEHpJ9KOAAJ0CJagDq23gAmzWhdXC/8aYxU8YkY6N4VEBJvfT5UgAm4Ra1zC4loP+3dF86AgWIY2psCXS4Uaa2oEcDSpkYTutcITcopXxJoEONmlg9yOJzmRytMMzWPLWyRnVrx1BTQ0DIyfjyFfEhRBsF7kKfwpkwBte5jthBQC40udKBE1xHKcfgtflZAdNkNT9PD0Dh1PkKByR2fyUmfPJkTAOfJpbRNAPBKBSaF2fP2t2l9te5O7eSd7v3F5eSPh+zsNyj9Jhv9WZyQ6OsDA3wNWogh6sheX7LyOG7J7f57Ojkdzvc8s+bgQBy+3xMH9oSyt1WaRSzybWU6wawVCCKNzzHNJ7Z0BSyjxqpEkLiaxocHsDw4IzVV8h1WkPYmsPtfJ9oZXKys4nAA3GXK/wB1y/0Rak/Gk7D4jo5ziOHfs7dxDNmCx5HLAklPmyO7W0obHPwQebm5udOZ8+V80x6vP7lqoFIyPSLi/wDKgR5VGt00oAS8kglAOgItamIlXTTSY2LCD/bx2pGPytBKm1QzZEh7znD3E9suu/b1S1zUFzJce1uNfC7/AJbOaRM8JjtNi1hH1J51xZrzoj0OvjjVlrMzXeuQ7mAK3cUCfLrXI0dkhmMJctixRBkH9cx2M/DU1LFIYxjYw1zUl6mST0RN/wDCOtTI5HDI97TJE0kIVlmtEB5N604JkakZCxJZh+pmFmyS+ljR/pbqaJCRMgeSPekETDo+QIP/ACsH8aBCFijIMDPMTy6L1saBojMkwOkc/wBWTPov5V1rRCZD5r/dVryS7X2WWAXQEitEZgGSkI2vIaDf2mar51aBkbM5/h7bV1JuBWiMWR8pbf2xuS274VZIJIxxO97wB1+FMljBNiIm2PU/vqiBqRrWEbvV+2qQiUi4TKfd4DR0OpC+NQ7o04skMfgGvKIXnqSNx/kKjmUqCpeDkiKPbtOjQ66/IUcw4EbkccWAlzFGqGw+VWrEOpHyYrWK0oD/AEj+daKxm6jHtH+kC9ifGqkmBD4VAAuB4USKBl7ANbIPC3jTkTSGXt3fSFBPhVEwcbjuP1ADwBpSHEdbjtAPpBX/AAlKSkg/B4fkeRf7eBjSTON/7bSdPOs7ZK13ZrWjeyL3xP2f53JY3I5iWLi8Yo5ZjueR8BXFfu0W2p0LrPyaV2Z9q+BgkZO7h5edmaVE2R/bw08boa8/N27vZwdmPAl4Nc43j8Xjv/bwTtxXOHpw+IaAU85DpavMtdtnUqolv0z4HDJiZDggG+Rmv/UZCj4lAqUkNlJ7q7Z47vHjOT43PimyM+WN2RByRYGezLGfTIzRf9Q6trvw5Hjco5MlZPnrD7MysbNkws+JzcjHfsl/I3xBDndCLivYeSVocqpDLvw/bMETAQAGGyxAag9ZHfwrltdmygtmFg42NGXtYrmXd7Q3W85HW/CudstMHyfvNm9rwScTBEzIxA3+3FMPeDfJa6sctGN8SbkzTuH72d68t7kbco4sb7e3B6fSbAKOldCxLyYuEUGfJ5nk37553vc7UvcStbJVQpbDuM7TzOSla1jHPcoAcnpFTbKkJUNY7X+1uBH7UmcPdlVfbH8hXHfO2bLHBqvH8Hi4EAixcZjA2xcgUE9UFczsWqMnMfiY5U3Hc02PguugpasvjBOYvH+2oiY1E9ZDUB+KWqkgY5+ggYB+ocxo6MXrTdUEiTgMdEXRwFzOj3lGp89al1KVij97dj4XMYUjMnaGa7GDaAfI1Cbqzsw5YZX/ALbfdjO7UzIOwe7S44Ecgg4nnXtc6UNe/wBMUjnat/Lu8K9DHk+C+101nXOn8luj6XwZXOYXbVzmge/GCPQJbsBPgBevQq5R8vZNPUKa6Esf78zZS36msu3cP31WhOxBZD4sCKb9Lgl/F5bj+ricwua50xDSS2/pTWsnpsaVu05W58r/AHu+13Ldj58fN8A6PI7PzSTCx5awYM7yVjICbmu/I75Vy2x1rqfpHpfd5ckYtJS08GS5UUuLjtfNzkQnLQ4xNU7C7UKF0rNNN/xPqexbLSuuZJsbx2TCJ74uQ9wQH3A5CTfqCattfBjjx5OGmTkelEom97JjflW2sBG1i6oE1KXoT00NK1srTdO3/YsvbvfvOdowz43D4RjGQRIWSPc5HAJuYtgtZus/3HF2ulhz2+7E+S+oHm96d1cvNu5GSVxcp9mNocEFiiqNKbxVL67XXUUxcX/SSEdlZ3IPLuQmDMdoDC0lqloNkY39tXxrXYqvY7OZ/dFaocj5HJmkdFDskjiYWtIjLWotk20uC8nVTtZLWaqk0voPTnNd7T5HF+bkIhIDA0C1v86hR/odirlqlP8AKw9BHPDHNA5xLowT7cZVzvmNU8ql6nVSrxpqx5kuZPMJpiImQgOaZFcbaa/uoaSRVbZMjl/akFZE+5j8zMnG571kLW2tcbQlRHhHU3WteV7QkQGb3gMRjoeMedyo6UDaUI0rpp1+WrPjvZ/s2LAnXD9zITDxuf7hyY8WEySukO1kbAb7rJXS1Smp+f5/adrs/wArODcvt79hMmaSObn/AOyHhWwMG+Qkf1HpXFkzu2iOSqVf6n0d292JxHB48UOLjx4jGpukKGQkeK61isbe4rZWWzHwmMZsjjdK3oXHYxfnWqrBk22GsI2hrnhoBI2xDTwVxq9CZOtYXlYWrMNXEb/2mwoAUYnPT3XKQvoHrOvgLCiAk6I2BwIYF6l53EfIWFCQHg5Q5gWRE2pdPGzbUDPOcbbgIm39JO4/Ha2340mEDckrEAar3/0ov/4IqZGWDszLMPKPxZ/QMiPbG1xH1M9SbRoors6ri0HJ2qzWS9OW4HwPwr1DzBkohtuT9hoGmRnL8ZFy2DNgSna2YemQXcx7SrXfI1jlor1aNcd3RpmVZsEXC5T8bJiIzIgiP9ZIXVvRDXhXp+Nw0exXJzRE5HJSSqGF20LuDU2hPFxtWbsUkL4TviXt2dzsTIjmLlMmKSTHI0atLjo7+mtsPY4Pcxy4eSNH4f7m9qc0GR/rG4GY4KcbLPtlf9Lz6XV7FOxWx518NqlnblRzN3McHsIUPYQ4EeKitk52Mdjgmam0lE6qn41UikbdkRDUguFgfEUSANPyONAHOlkDQNXOKfvqW0hlN5z7ndr8W1zMjPjfkBQ2GE+64nyDVrG2elfJosdmZH3d99MuRksXHbOOxjb9VkHdMfHYzQH41wZO23/E78XUn+RimZ3nmcrmPlgbJkF5WTMyCd7x4KdB5VwXl6s9KmJVWhbe3eej9sQ5GQVP0QwlPV4W/nWLLaNM43KnfG1sbGYsCAe8+58yfGmm9jFomcbJxWAFu/LkNt7ijPkDZBVpoza0L1272/LmRN5LmS6HjnI6HFALXS+a/wBP769TBgb1scObPGiLDmZhO2KJIoYhtZEz0taALJXpJQee229SPfIHOAeFI0d/GmI97xjO14O06PFx5LQKRovt6UI6NW1/CgYkOJarFcOrD46VACGv2lzDpdW/Dw8KBkPzHJ4XG40uZyUpx4IgrpdriUAsEaCT8hSbgUGKd2/ezlEdjdndv5+Y8ktHIZWLOyLyLI9iu+aVz2yPwdOPEnuzEOfj7057JdyHcbM6WRyuG+GVGDVGt27Wj4CuKzbPRx46VW6KtlxuxB/tSQFU3TMcwn8QKnXydE18Ec+SN5csgevUkBv4VQtxtwCB1yDoBZt/21RLR2MOuAUCroq0hE9xGQ4OaCVaDoP8JWdkaVZonDTxRIWne8gAkWsvia5bI0bLhiTySN2qfVqNGn4+NZMRKQxxsA916AGwYF2uFSNB0UuQZAfb9ths1+hPyqRsLEjY3FqK86NRSg1KX/bS2BakjDi5eZG17dzIujih/wAhVKrZLukS2NwGNCkspDna7nHcfxq1ijch5GyTaxjAfbYGg/mJQH4DWtdtjI6S5jB772xg/wBdr+TRc/Ok2MZfk7hua0tboJJrNP8A4WC9TyHA27eUfNIXeAeEHkQ0UgG3hjnKQXp9IcLBOoYKeggHNxoM2GXDzYW5uJO325sOVokY9iaOboBTUkvY+Y/uj9iZ+FdNzfZEZyuNeS6fggfcyscIpdEdXs8tR516eLszpY4cuF7ow0MMbB7jC1/qsbEOVL/Cu9HGLjexztsxLSdJRq34jqKqQHPedDOXxuaW/S/b9DwP6h50AWDtXvTmu0p3O4hzZsCck5/AZZc7DnU3IH5HJo9t/FaUEtGoYR7Y+4ONKeFaRntHuZ/b+Sn6uEdXxu/9WMf1M+aVEQJMzrnO08nj3yyYu/IxYyS5hvLG1uqjqKasXBXnqHo5RbaCiENIU6+NaCFhzQin1Buvx60DGSSrtrjuJt43C/soAcMbDclLAOLbqoJKeZWgBmVpALvpBV/mOgCCkI4VBDAdxcPUW6ldQPlQMSZQ5gUBdq+RII1oECTxQTBykh+qj9pHl0FMQKzAyJpG4+Mx00ryQ0MCuKUCgOxO1uZzJA18TcWMWdNO4MaAfgVNKRQT7eL4XB9mPJL+UyIhtYxxIha0lSGsHne9S2aKoVmZb3FjeUyRhxBo9jECvmczRrWMCkeQqJnYtQCclxAm9uXOa3hOLAMgyMpoOZOdLRi48gaacCepFv53jeM3R9vYYEmh5HKAkmJHVgNmg1SrIpgjQOR53ML5Xy5M4vLK5XBo09R0AqtiZksuPzGH29x2VxvFwQZGTlAMnzpYw97RtRzWE6fGs9zRQkVvKnZJiiJ7AXiQOZL+bafqaaa3BvQAS3X4fxqzM4br+xfKgRwn0lRbp0+FMkMxZpEDOjkABuSfIVLNastvDYMW6KXOkDiw/wBuAfT8Xu/hXLks9kd2Ki3Zf4SzIaHt2xsRd77N8LDrXA0d6YdFBFARMTuP5ZMgenx9LOtTI5JB0on/ALjWo4Xjkns3/wArB08KgaFNejw6UCR7Qvuyj0Kf6WDWgGOmV7gHPcGs/I+UaprtjFBJ4SK5srBtaimaW7kB8KQAzpoZJTtccic2LnBQD5fCmMYcGkuY6QzFptE3RfjQCI/NljiYfcdtafpgiuT8TVoGRkm4wna39MzUk/WQvWrkhkRPJGwObEwyOX6vCtESyPmBd65nI0/lNrVojNgBkdI7bjtQE2cbmrIG3xsjG6V5c83LfH5UxDDi54cE2M6k9fhVEjGxrQp0/qNVJJt7e3YHN9TEaLAv0H/l0rznc7oEv46CEtGz3GjUNVo8rClyYwXOxV+ljRb0oFOlUmBV+R45wcfSfFDrWysZupAZWGGC6AED5fP99apmLqQ+Q5kZ2tO49QL1oiGNBsr9GBocp3FVvVSRB1uI1xQkyPP5W3/dRyHwJPA7U7i5J4j47icmYu+kthen4kAVnbNRbspY2y+cH9hu6OQ2TcvLHxMLyCWv/uSoT/SLftriyd6q/ipN69b5NL4z7Ndh8C1kkzZOfz2uCtyXtx8df/CLoK4MnazX2+1HTXFRF7h7f4uMRwYxxsHGib6IePiY1SL3e69cNlfzJ0pr+gxLxjo5XMw8SNz3G00xE0vq1TcQKSnyDaD8bhObzGlgglcyEBfeyGxMJ/0sbqlVA1Ya/TZ3HTRjlslnHYLSXE4g3zuOlidFocPYNtyw8TncJuLccxMedMrNPvTO+DdAaUCbDpcPFyEnmbk5kYBDXTgQQB3wACtSqTjYIKP372pldwe1yPE4rJjx8RaXY8SAwx+pzL2eW6tPyrow5Y0exlehQsCQehzYPc23jfkKQBr/ALbbfjXZYxgnW4XIclBsc724ApO4ICNbMbb8ayY5RTuY7QxcuJszw/Y8Eta4CMtun01pS7Q25KNmdrQYz9rmqPwd8q6FkZnwJLhu0jmSNcInFpIQFuoNRbKXXGanwvakeC0DaC5v5QAlc1rtmnFItmBxknp9ppDFQ7fDzNQGhMxYLWN9btoI+kFTbwHnTgUkriR+n22QEA6uIAPy/wClaVRDYY8NAHvS7Wm/tMIUoPE/yqmSJilVywwB0hAK7fl9Tv4USOAgYubkg+9PsZ1azWx6k04bCUhw8NivPqjEhIu55VPxp8AV2Zj9y+yeK5fElZDF7mQ1p9v2ArwR13dKzni9D0OvntVyAfZX7icpxuVj/bjvFshyWuMfC5bgj5wnohmlcV9P5CfhXdjy/wCw+9065a/mx7/3I+hpP0OIwY73mfLeS72Y3AEkC4tXfKPlmhk53IudI0Y7Y8YNGxQSSCPLUigRB85xXD81hZHa3cWK3L4Dk1jbGWus8AuIDwu0g+ptZ2NsWR0co+N/uL9usP7bc9/x+dhSf8NO4u47mJS5zJYhfaQB/uM0cOutctufhn6X63sdHPiTyL7vMsp45TgYi9vGQSydXPeRsDvJpVKlUu92fQYO90sU1xJ2/wCw8eYxHPZmTY7o2MZtYInljVA12nxPhSVH8nRbv4mlayaX/wCvAzJnsmicPYkDTf3JHkEn/SBTVCrd1ZKtqj/q/wD4HsIZmSyQw4ckLSwl0oebHx8QPGlaF5MsF7ZdeDX1F40LnsJ/SMkcbBCjgiISPOk2jox0b3qLyc1sQa6DHAmTbK9gLtxXqlraWoVZ3ZtfsrF/Gst/6jUTIsZwyuRcXSrujiRSCfEdKdlOiJxutPvy218IRJ7m/wB6WN4yJUMUcbtqL+a1EQiLWbfJzLew3yPN42KhyJnySsRpiJ3Gw/dRXG7bGPc9rg6tfucv4K3lcvncvJ7UIdHC6zR1/GuqmNV1Z+eez9/m7bdafbUsnaf265Pnp2iGH0k+uaWzG/PrWeTOlsfP1xeWfUP25+03F9vRsyTE7Lz3tR0jhsjBN6423fc0bjY17DwA2LYHNjYNWwjw/wBRq1UxbJKKCONHRx73/wBZG93wU2rTZEjvtvmKzPNiu0etwHkLAUQEi3gM9MbWm/5vWfwGlADhcCgcVc4BGhT/APgt/jTEL+pWrtGnqsSRr6W/xoBIYdLG0k/7hbYh2nyY2pkpIT78hjDQPbb0c70qD4Nbc0pKgac5XJI4uAtt+kD5C9QUNe65p3xlBdS21uun86UjgI46HObkNzsUO3xOD2SP9LVHn1WtMUq0meWHWDU8PNZn47Z2Da9EljOrH9R/KvcraUeJasMdIIJS4OhGtUSNnW4RwUDzoGiG5zt7j+4McQ5jC2Vi/p52fWw6fMf6TWGTEsi1NaXdXoYR3z2l3twXuySROzOGZ6m8hhMc9rWj/wC0haC9p/EedeFm6t6P5R7GHPS2+5mE2TLK8AFxBus2qjwjb/GuHY71DGjmzNHtvkMpJLnNej3KOga3Rarm0H40wvE7k5PAIGNPk4Un/pxwzPBP/kBQVos1l5It16vwSg+5ndmK5sQ5vLMrgmxRI4L42NbLt3Xkw/wqsazvuH3YT7cnK5b5XNH9qJ4D0+DRan/mW+Rf4SKtzfdvIaZk2TlyOCiJ8z3uX4LUvsN+TSvTS3Knlcvzs5c1mzjIDo4o6VfBo8annJ0Lr1qWLt37Rd9937J+N4Od0Mv/APl+WJxMYDxBlG5w6+lldFMGW/0Rhk7OLGaOfs72F9vMSLkfuLy8nP8AKO9UHA8af02NI8dC7/cc1eqtFdX4aY/5anBbt3yOKqEUXO5nH5Hm8jM4bi8TiMdGxsxMRhbDHsCJf6nJ9Tuprz8rTcndiq0tS2cTnwN9t2ZO57gF9td1+hTRK5ymjaew+3I83Fj5vlYPa44+rAxpPrmT/wBRw6MXQdfhXr9Xrf3M8vsZ/CLtlZj5iepAAaw/Sg8BXrHnEe9D6lLh/Sl/nSASQCgBFxcdPGmAjaSEefQ3odQPKkhDE00cbQxqFrCpJ0+VApBZs6GJZA72yPUS4hoA63NqhtIFJWuU+4HafFPP67mMSOUBABKHuC+IYtQ8lV5NFSz8FYyvvh2PCSP1cuUf/uoHn8C5Kzeepaw2ZGu/7gu12Oc1mNnSAaO2MaD06uqPz1+DT/HsJZ/3B9vAkSYOcLFLRnT/AM1L89fgf+PYeH3u7GzyYszEnDHgKJsWOUD9po/PX4E8OReR08/9l+4/7fJYnEylwt+qwmQOH/mDB++rV6MXHIgbJ+yH2i7iidLxeEMffcT8VmOAv/pV4/ZT4UYLNepSOZ/7X4g2R/bfcLo3NUCDk4QQvQe5CmviW1m+ubLtvyZ3yv2j+4HakrpeS4Z+TiMucvAd+rhTqTsR4+ba57Y2jqp2KWHuKnjY3c5rngI0NaF2nS/hfWuKyOtal1xcqRrWRulUgKY2BSiX80rBlJEzhyxh7Y2MLyLgM9SLqpNh++oGWTDwMucIoa0pcEkn4uN/wppSZton8TicfFG6ZPdJKtA3Pv8A461qqpGTu2S0R2lrY2BvTaBvf+Ggq+RMC0Yx39x/91dB/cf/ACFR/UaEvlL1EaMH+j1yG/UmzabcjQywESOc28vU/XInm42FTAz21+rUAd9bwhd/9TrD5UgOOhLgNhJOji3qfN7r/hT4ikYlMcYMTVkeLezAu1eu59GiAFlE5BG8QtJH9mD1P+DndKBMisiXGxHO9hxdlNvsiHuS/EnQU1CJhswX7mfbjD7gy5+YxBDw3JXLmE/2sh/jIlmuP9TfnXZh7Dq4exhkwK225geViT4mRJhZcbociKzmu0Ph8QehFesrJqUee6tOGcDCyPcgVfp6ofHypyIRI0SKYTcDcY10/wDCaoR3GzsnHyIsuCeXHy8Zwfi5kBLJo3jqHC4/wtIlo1PgfuDx/cu3je9ZI+P5mX0QdwsYGYuQ51g3LY20Z/8AvW+k9UqHX4FMAHe/amdw+a5nKxPxuRIaGzFXRTMDQGHcLFpam1zaaZRSJQ5qxPAZING9ClrHqKoBveSUeCC+wSygdP2UximEsA3W3BB5knx6CgDr0aPW6zSrl1ISwpCG9uwEghdqOHQBwsB40ANl4cobqQAFC6aBo66UAIlEcAMkxDQU2sBUpqVPTWgTJXtDmuMxOVnmzYgMgs28XKVIZKvqBA13NsDSsCJLkc+B8pdmS7G79rcSEb8p7jctawfxrNamqSQ77GTDCZ8r2e2+PI/3sg+7yUrTpsj/ACqKICSCk7j4/jXvHbuKRO9Q7k81Jsk+Batm/KqgXIgMnMy82d2TmzPnnJu+RxJ/bpVrQhsYSSUtjibvkeQ2NrRdznFAB8aZLZr/AHQMT7fdo4v2648sHPcg2PP7w5Bie4rxvixA7o2MFXDqalip8mXYoyMmZwgaTCCLEKdqoPmSabNTvLR/p5hjqPcYP7m3+rwqUKzI8kGyW8PAVZJ1sbnDcnoNiTpQEChsCCNu4j8x0X4UikgmBWu3u1/q8PIVDcmlUTmHm+yboAEKnx+FYtHTWxaOP5ohNx2f6nnc5fIVzWodNbFlxOSYXh5Kucnrk9b/AJN6VhapsmSgcqvmkETfEo+d3wboKygqRTXzMJkaBDE5FleS+Ujy6BaYC4Z7O9gGR12mWTRvmvWk0JiXSRyO9TnTuPp9sLtt4npSHAl8sUb0lcGh12ww+WikfxpjQzLLkStUNbjwEJuW/wCNIojZJ4GPa3FYZpivrddoNaIkCyoZJllzZCjbjo0eQ8apP4BoiZJ3OBjxYy4L9ZFlrVL5MmB5ELQGyZb1kP5BrarT+CGgZxfI1IQI4f6tAEqiAcwsjCs9RbcyPsPiKZIJNO3UuvruOnyFWkS2CufJJduvif3VcQZyfSxhe+8bFAChzylz5V48nojM/Hu2AzyC35m+mx+NNMCPdJgMjPteqyf2wpJ01pyWqkFymHnTuLcXGMYIu6S5Pwq6tIGiPw/tf3TzTH5UeNIMdquknmPswtb1Jc9LVb7FUYug+3sPsviCDznc8M2Q1d+Fw0bs2ZfAvTYPxpfnu9kS6oFy+R+2fEtaMThJMiZpKz8zmhocRf8A2MbcfktOMliZqtQJn3Rl4wuHDfocJn5f0PHsVo8nzqf2VX+O3vIflSCcru3vbO4yXksvPzf0LMP/AJNkb8j9L72K2URB8ftMA+s6LULFSePkv8jakheJzec7ni/VMmZDG7KZiB+bmzlXOY57ngbwSGNapra1K0cf9jKuR21Izi8zkeYZyUuPDjnF4qP38mQvnc97XSe2322+4ri4n5DWqtjrXfyKt3c7l8hm4fKv4nGiiz3RMa85WFPlbQxzA8qA8kFio+1jT/Go5PQn8rmEiTzO4eZ7eyMTEfPmifLhjycf9FyD5fTMUaHMlaS1wIu11Z1w1spLeRpwWH/95feHAzsw8/lpsTJ2MlEHK4rZWvY76XCTGKofhWH4KW1S0+hqsvHfRl04L78dxsDJMvEj5LEaAJJeOlZmAeO6CYCQfCsb9VeGaLKnqaJ2992u1u443s4yLEHMB7XPZs9mZgT6TE9CvwrkyYrV3RrW6+Sf7X4XZDNj4/NTZmPLPLlyw8zM/IdEX32xEp6R/TUXfLVwi1CJjnOYc3G/QYmY550c7b7ULEtYAL5VCKZROR4njsGVuRjZgMEoDsgtbsDZSbiy2NdmO06HNdAM3MYsALMZ29xsZB6WfNb1bEqkTJLk5/uFFZoAwaeS1JqqpHcPsybKd+oeCVKl4Cn8TYGlyZcotGF23HgxNMrtjfj6r9FqNw5FhwcCBpHsxOlQoX6/gTanBDZNMhcxgEsntRm4AuR89BWsETImOfCYUw4Xzyk3LQgUdNx/hRKHDCWw8jlK6Vwgj/MGXP8A9VVDYtEHQ8Xjs9cgMkg6krYa3NNV+SeQQHYcJaN6uF0Z6itXoIcEk71EEbYm/wBUnqJPwFPUBYwNwXIlMg6BvpC/AdKfEXI6/CgbE6NrAg6N+n5+NJ1Q1ZmO/djsBvK4ZzsJ/tZ0ILonsBDwv1AJesJ4P6Hs9DtPHYI+xPf+Tyjn9mdytdN3NgtP6fLkA2yYEA2hr3Af7rfP6hXoYb6/Qx9v0saqs1Got4+GfQOA9xx45SPax5ADG131EHr+Fdx8swl2PBPGWua0R/8AqHqXE3+aU4lCWjKD9w+yeB737Uy+1uXa2Z7mufxeWD/dhnjHoeD0LV9XiKwtojq6+Thb6HwpyHbfK9ucnN23yPHmDkoH7JPccPUEs9vi1wG5tc1n5bP1X1lMOTEljpv5Ff8ABSZMhycrMx43xNWOJ7i1UGm3oaz/ACpaQz27+sbvytZQvAz/AOyh2yS5+7Jc68cLTI53gCXIgolvwU1jxx/yavxuESTulYY4jOI7l0aDaPBXUoNrZOT0lDDMnPxX7IpmiRoaXBQ9xHRCiKPCr4pnLfLmqmk9heOOTkZsLXEAmSRm4RtPmUTTpSfFGWC2Z6g2VkYXEsc58zH5r7vY070BNvUfCnWtrGefv9fp1mzm7K7kdxZ+QTHht9sAbfcT1IvWuquFLc+J7n7Nlyfbi+1fIVwvanKc/ksbFDLl5EhTawE38zoKL5VU+aavlfK7bZvfY/2Kk/tzc44R7fUcaD1vN9C7QV598rs9Ddcao3zgu1uK4dgjwMRrHN9PqG9yJ16VCr8kWs2WeKJ0Y23ld0DRvP8AAVqkZyHMja1WK1RdH+twPwbargkf379rnq5bNv1NvpbTQj3qadpaGNNm/Dr6Qp/GmAkiGM/3XkHQt0Dvi1t6UDOumcwI0e01xA9fp/AC9KQSGXPaXIHlxH1AekEddL/jUlwJMzGgCMbWAEgNs3/HxNS7IaQ3isyMpzhGx0jiVDWhWgfGwpJNlNpEnBwuQ5zXTubDGNWs/uPI8AXI0VssLe5hbKvBJw8fiYY/sRj3P6j/AHHp87Ct1RIwd7MdLl6DcLWvVCQw7nRwb3z7wZER0Q9TnAdCB5ULOqbg8LtsWHhe5uJ7hjEvGzhszf8AcxZEEjfEp1C9RXbTNW+xx2xuu5KF7RYhD49K1kzObzuT9ui/GiQFRyOBLmqCDc6WoYQV3nuxeze5dz+X4eCXIks/JiBx5/8A64i0n51hfDS+6Na5r12ZTMv7C9rOLv8AiuRy+PjNjC725mn4vIDv21x26GN7Sjsr38i3SZX8j/t7zZd0eL3DjxY7ijmDGeyRw8S4OcTWD9d8WOhex+agcf8A26clGTGznsHHxvz+3DMZnfFzjao/9a//ACNF7NL+0kI/sFhxNEUncP6eHWQYuMsjiPF8jj0q6+sXmxFvZ28IkMf7Hfbjj2PyORdl5kbBullnnbjQpqrywD/8qumvr8Vd9Tnv7DK9nBa+C7d7L4Rn6ngeEw8VADHliESOdaxZJJucfjXXTFSmyOK2a93q2yr/AHO+6WL2rie2x4n5jJYTjY7nIGj/AO0k8GDp41GbMqIrFid2fKHOd2ch3DyEuZNK/KyJf9zJf6dw6Bv9LR0ArxMl3Y97Fg4A+M6eR6mQNYChDVA8PnWDNoN1+zHYre5pXc3y8Jb23x7w0FytGXktQ+23xY3/ANQ/Ku7q9fm+T2PN7efioW5v+XkNnO1qBrAmzTa0BBtTwr3Dx2BmYhoEh3NX6hQAiRoLEDvMLY/KpYAr5ANTc6dTbxpCKB3f92e0+0mPx+SzhPnRg7MLFSWcHwJBRq/6jWdsiRpXHaxk2b96e/e6Xvj7M4R2Pjn/APaSz33AaXcUjFcl+xB14+tJXcvtH7ic+w5PcfNOLnXMBkdKG+RDNrBXBftI76dVIhZO0OI45xbk5smZkD6mQIxoS5VwWsP8hvZHVXr1RBcliYGO4uY3a0ddy283EpVq9mX+NEFkZMKBrJGsYOpcgPz1Napsl1QCXukADJPToApaP2KTVpkOo0cnJY8+1I8vS7gdF6jpVGbQ8zluUgRZQ/wY8KT+FGgoJbje7czj5WzNa7HlCJPjPMThfyIoWmxm6J+DV+1Pvjz+K0x5mXDyuLE1Xw5yR5Aav5JQhPzBreuayOS/Xq9jZ+1vuH293K5kONMeP5R1hhZLg1zj/wDdyD0v/FfKuuuVWOO+G1R/uDsbt3uB8k2dgNgzUQZWN/YyARe5aEcv+oVN8NbBTNauxn2Z9s+Q42Z8uPKMzjgS8BjdkrR/raNfiDXmZupauq1R6WLuJ6PcleM4vEx2MKFyBS2NFCeLtBXDsdDs7FhxSHhIUZF+Yx6fN5/hVr6EQFAQNURl0pOoYdrV8S860QkOWLbvkbtFo2lS2P8Atx28Xm5+VUB5rgwbQhY7o30NPkurqnYB729sYa9+xh0YBtC/AXNOAFGMMaT6Y4h1fYfJvWnAgcvDyDA0yBtzLKdsYTwFKX4Gjko91gfkyrANR/tx/wCdP+ooAv1j5CYsGEzNaUaU2Qheq9UqJ+BwC5bY4oyeTyg0BP8A28FvxS5pP5sOPgjp8iZ2K6PjIG4eNp+omABPiQOtHJeBR8md85x0cu6RrpM17SXGd/8Abgb5haaY4Mn7v43C5hjopkmzYVbjvgakcI1QuP1Dyrvw3dTDJjVjKs/jsnj5Tj5N0+iVl2O62P8ACvTrdW2PMvR1/oBvsFB9Y0I1q0QJD2uJ9xxa5PrCISPGqA41z4yWHRyuLNWlfA+YpCNG7N+5UvEcSztnunFHcvYamOPjXyCLkOPL778Gd30jqYpP7Z6bTTJdfgN5bsfD5aCflft5yTO5eHjb70uAGmPl8FvUZGK71+nq+Pc3zpCTM/e3YfbeC5gKEKjgBTLgbbd5DjZqFriNQOgpCHGRBC55AVAlyimyn99Mo5tDgGN9Rf8AU7QBSmlIAfInfisVqM9xu5jrby0EgHyoJIiR5ldc3/pOgpiepM8P25lchCeRnlbgcRCf7nI5B2sUdIhq93glJsaRLS93YXBsOL2Vifp3uUT87ltEufMTrtJURt+F6jjO5UlTyJ8jKkfPlSunncVfLI4udfzNWKRsOQnp/jpQB1TYWQaLegQZwuVJg8vjcjCQMjEd78BcA4NkZ9JQ2KG9J7DqtQnO5DO5jPysrPldkZWW4yTSG7nvcVcTS2LSUklxeVD2wJs6Ru/NLR+giKK2TTe8f6VO0eN6W4bIrbveyXunkIG8lznu0U1ZnGolpjb6Wj3HabjoD5AUFCwyST1SEJ08PwpNlQPMjARwAXx6/hUtlpDjWm5IRo6nWpKHmeg7mm3RdflSLQdBlFgBJLTa4uUH7qhopNk1g8pJGT6hE0/n1eT8TWNqm9bFl4/li4gQBHp6pnITfrWFqG1bSTMeS19lMs7hYD6AfMmsmjUdlkaxoZkS7nnSOK2nj5UoA9CZ3hT/AO2x2hQBYn59KWg0cM+Ni2xI/dkvvd4E+PjShsoZfj5GQP1PISe3Db0KBbxokGCS5ETDs42IucEJcQgXS1VHyICyMfa79RycikBBEqaeQ1q0/glkfLLPkE/o4xDC3WR1gQOtaKCG/gj5GBp9wf3XG5mksz/OrTM2gSfIjicd7t7r3NgvkK0SkzehFS5L5XJGpcdSdL1olBm7SJZB7jj7g3HVVQU5IgcG36YxvIsEsF6VMln1CnIyua3Hh9qN4VXWv4mvHk9JJLcSeDdPIPdlkyJHFDC0EqTbQUchch/I4ztzthjMjujkIuMa8+jAYPezJOg2xNUr8apTbYzeQq3Nfd7iOL343afCxQ5DA4sz89pzM3a0KXNxmKGaL6zW1cLe5k7mZd59592yZeLH3YcwxZrWZED8p6wnGkIBfFDERHb+k6Gxrppiq02vBlbK00hHc/CRt49+B2/ymVzPJ4eQN+TjRmHjp8PIardhO0MkiIAeCbr5UsWTWbJJPwPJRtQtz2Bl8dh9pHtbl3cZBFK6aTMmka/MzDkyOBjkiMSbHRAbR6kKkGpty58qz/8ABahU42grLI+0MBY3zZ3JkWY9rY8Nh8f63V0N5bfCMIxr6hkvdeC7EZx8PGH9FE3Y2HIyp5mBhO4gtVoQm6VCwWmW9TR5qxEEa3msWJrGQcTggNJc3dG55BOurq1/G3uzH8iWyOt7gjjJLOK49oIR+2DYo+TqHjndiWVLZC8bn8OGcTx8NjRygFolgfNjuAdYoWv60PG35BXSewdxfK9vYvIM5KOPP47NAIORHJFnM9XiyZoJ/wDqrO9LtRpBpS9Vbl5JHDw5+S5bP5bG5PE7h5TKYTBFmSHBzmSBwIfGyb+24gDbt3VFrKtVVp1SKpVuzs3LKpy+VzMfKzO5nGkxuae9pd/bOPINvpCNaADYfUK6kquujlHM229S2sZyrsZmVnxjuHjogP8A8YQksz8YC6mVqSNT/WHNrkfGYWh1rkl8l67U+4vOcLCyV2VL3D23F6pnu9PK4bDZXtC+4wf1BflXJkwVfji/+5tW7Ru/b3euFy/FOdi5Dc3iM1paMhgUsUKjrK1wrgtV1epvKYxNxrYcKSbGec7BlGzLicFcGr9QHXRfKlI2irS4UWK7ZK4OYfVC7bd7CbWv8/OuhORErxbooSAcQyyIDHJKdjASfC5NJlSWuOCWWNpnnEUJFhGBG0EeZvSJHoYMJrw5jXZThYuQkD5utTQB7f1UhDSkDLIGhSnzqpYBkHHxl4fOXSAGxkNlrRL5IYYXYsCHeGuB0Fzrogq9ELUcZLkTD+xFbo6TRB120SwhD7cR0hDpnueDZwB2tXyApwxSgiOOOMAQsCL0F1qoJkkI8TJLS/20YiqQgHma0VWZu6Q1JJx+OUy8+GJoG4s3bnEDWwpwvJP5CJHdvaL5Bjt5CR0pdseGRH0260vsF+Sx7J5TtNsRnmbkZ0b1EcTxtDyfIUcaLwL8tj3C5nLPnkl4/i8TiMaduw+3CwSkAfmcilAK2py8IyvdvRuSyY82R6cblSWyflnUBklrbQNPhXSm/JjBVeW7i5PIeYMVuyCRYy02fsBS3UVm7MkF/wCOyZ8ZgyMwy5jg+TGhiDhuLPSC53TXa8daTo2OYKN91/tce7+2cjuDhgH93cQHNie0EOlgaAXwOaeovsP86zeNQfR+q9lfDkVeUJ/9D5Zj4w/pn7pI3yPLVe/c15aLlFsPA1hzP1zF1G6S7KzfkMZ+pIH6bHA9BL54YRvMbRoHOt8ajTyzoyabJf7DUGAcn2XT5B/TEl8jUILWtuhItVO8GVetfIk22kCcjznC8SXQws/WSNNnvdtIQlE22SnTFe55XsPbdTp6TzuipZncXI5g9uN5awm4Bvcr+yu2uGq3Pz/t/sGfLKp9o1i8XlZsg9xS5xsDcn4VbukfPNXu5s2zV+x/tFyPNSxSzwmDEcbveFfpZGj+NcOTO/B1VokfS/aXYPF9v4scEMO57BqR6iT12t/ia5kpcsp2+C+42BDGGt2hP/szqv8A4W/xrRVgykPb7ce2F5Ci7WG/4Nb/ABq9ESON93c2PaWNJG0SFPwa3pQM6WCJx99xBIsp2N+TW3NVBKO+9saBFHtX8xPts/DU1MlJHXPVS5/qP5W+lP4mgBDXSNIbHEWbj9QF/wAStRJYlzXPPraT0JF/3Xpi0CMXi8zIIe5ghaBbfb/8GrribM7ZUiWg4bDx0dO4zSDXdZg+Da2WJLcxtlbDmtaPpbtaCg/KPwrVL4M2/k67c1pc8iwtuO1qePjTYgaTLijHp9YW5Poafh41m7QaKjZH5nKEREiQMjHRdjStrJc1hbIb1xlN5HLkkJ9thAP/AKsv9qMHpb6nV597Sd9KpFcnzZsF5mZkO91rt0ckf9nYR/8AZgeq9RXM67FWwqxZOP8Au5znGtZFyDI+Qx9A2b+zkWGgdcH5ivRx+wfnU87L0V4Ldx/3c7XyWNfmmbjnkK4TsL2Dy3sUGu6vcxvfQ47dW6+pMw9+dr5TQ/H5fFcPytMrWu/ByV0rNR7M53jsgn/5RxznKzNgd4bZWHX51XKpMMZm7v46JXSZUDUH5pYxf8aOdUHFkNmfcntvFaTk81iRBvVsoe4H4NWoeai8lLFZ+CvZ33o7WjU4082a5q7fZjLW26bnJY1i+1ReTVda78FaH3c7o7h5BnD9ncN7vIz/AO2xx9+QN03OARrWjq52lZrsu7+00fWVVNjQeD7DzICzme/uTd3BzIR8eC5ycbiu8GQhGyOH9bx8BXZSjWpzXaeiA/uR31idncJLnSo/Jf8A2+PxDb3ZzoP/AAt1dUZcnCo8dHdwj5G5Tks7ncubkuXyHZWdlO3SucSfg1OgGgFeBlyuzPpMOFUqDtw5XbGtG8jRgHTzrGTZstfZPZ2X3VzuH2/jOXJySDLM0WhgZ6pJHHQBo/E1tho8loObNl4Vk+xcfAwOE4vF4LiIvZ4zj4xFjxNs5BcvPi5x9Tj419JWqqoR85azs5Y09wcAH2S24WINUSJkdtB3IgA9Y0+YqZAqPdfe/BdmYLs/mspsMTQRDGDuklJGkbNSfHpUXukVWjsYJy3fv3K+7EkuF2rju4Xtnd7b857va3M09UouT/pj/GvPy9lHoYut8kt299oe2uFAzOaH/NcgoLp83c3Ga/rti1dfq5a4LZrW/od1caRcwJMj2+N4fDdlObeKGBmyJo/0xs6fGsVV3f2o0dlRasKd9su4uWaRzPIRcbjuC/po/wC8/wCbWED8TXZToWf8nBy271a7aj+N9n+xIHAcj+r5V4N2Sy+zED1/tRbbfOu2nTxr6nLbv5LfQNb9t/tzjSe5H2vgSuKgGVhl6dN5OldCw0Xg5n2LvyG//EuyDf8A+OccNqJuxYrJ5ltV+OvwR+W/yyPzewewc1xGT2zxxKXc3Ha0EHx2oaHjqH5bfLK5yH2K+2PItcIeJPHueLOwJ3xEH4Eub+yoeGpa7N15M65//tnEcb5+1+cL3IS3D5ONLjQCWPx8XNrG3X+Dor3fkxzursjuvs97T3FxsuLCSGx5jUkxXL/TKxW/IpWDo0ddMtb7FbjxpJnt9tpLfEi1+qVDcGu5d+3cDlGNb70pdCLN9w/SmiHoBWLyitTQ3DtL7mcpwrYeN7m35nCKGQZyF00YHgTeRg/pdcdK6sPY8M87Lgfg1qHLxc7HZl4U7cjEnG6HIiu1w8j5eFeinJwNNPUi8/i4chxk2NZKPpFxE49S5o6+dcmbrVvqtzpxdh10ZFmKZrnNyCjmWDXeloA/pYNR4V4tqWq9T1KWVlKCGB0m1pYSAhBeF08GCw+dCRQSxC/1uMjun5yPw9Iq0IcL2tVXBsqjaGjfIf5UAdBf5Y6/md6pSvUU9wG55MfHdvmKSdDIdzyn9LBUuPI1Ixvy8xfai9qHUzT2Q+TdBS1f9AaSAZ5+MgeA9z+TzU/223ATwAsKizX9S6psamm5KZv96VvHwnSJnqlI8LVMt/QqEtxDMFmKz3mRtiKerMzSrj8GUKsCdiO5DIjbEJN/6s6fqso+3A3zazU/KhsUFH5n3J2OlkJlgaVDsj+zjjzZGLuA86clpGeczixylwx2uy1F3J7eO1D+UDWuiliXUo/KwwytOPln3kV36aFNoI6r4iuylnuc9qJ7lN5DhMrGa6eNjnYuoX62r4j+Nd9MkqDzsmF11IdACjevjWyMBO8hGuChdKAYsSAH0lVQW6r0IoESnb8MMfcfGSnmZe34HzM/V85EJHTYMbij5YxCQ9waL7RrTE1JuPdHG9kcm4HG5Vnf3FStjfH3vwMMeFzWNZJG8hxbkEwBFns2vI8al6MlSZzzPYmRBjHm+GyYOe7a3FreWwNxjaW6syYXATYzwbJK0eRIpyUnJV8lscB3hwI+ktd9Qcev8qCj0TGMa+dw2wtAJJtZPSB8aBFfyZjkzue5U8fAeA/dTJLOeM4ftjGx8vnkzualjbNDwzfTHC112nJcNSRfYKnVlBGDxfJ94FnM9zZp4ztaJ3tnIa0NiaGj6MePRzunp+dJtIIkiecxO3Y8pzO3XZLsIMG2TMQSGQD1Ehtk8KXJ+TRVUECF1Jv4CrMj1xqbLQB5QQQSPVdFoA8x/tSB4C6g/wDhNESNOAzHy3xO9yBuxyqHuKALUwXIw+YzSGRxMspUl79B8BTSFuc2PkQvJITXpRIQPshYGggeRPj8Khs0VR5reo66OOvhSKgUABbW1vGkM6iBTYeGv4UDgW0OB6N8zcpSGdaQu5oJJ1JpMJH4pALu9ZBvdBUtFSSGNnbEDnW6MFtfE1Lqa1sWLB5CeRobv9qI3LgUNr1haptWxMY2dBE8tgjMsjjdx0+dYusmqtAY4SZSy5Mgjj/LGD1qNiz0UwYS3AhBREldZoI1KdaH9QHP029rsjlJwAb7FqZfgpMElzHygw8VAjI9ZkQAdTerS+SZI/2W7nOlXJyFO4OKRtTxdVCZH52Xjw+qSUSOaP8AbHpjaa0rVsydoK7l8q6UpH6j+UgI0fAV0qkGFryAtikmdvkO49D0FXKRklI+1scQ2puf4C9TuWkkccdwR9rfQ3woA6WlrdRGzW+tAj645HO4bgsc5nP5oxcZqkuc65d/Sxgu53kK8aqdtEd9rJGZ9x/eOcP/AOO7dhPDQTu9ts7g1/JzbjbaHHbCD4uvXXTr+Xqc9siMx7uf3NxDOM5XPi9uDmRJIHPe+fLkfjybZIp5CdwcbFG2INq68SraUvBhkvZQ/A87AZwXcGH3hxk7u3cAOjyIcTLk9/Oa8t9bY2fU+M/lMiWsVrP8nOro1yf/AEKWOHykieU7nxJsiWWLHOa900uRFNyP90sfMVf7cIIjYCegrSuJx8E3yVIbO53lORT9XlSSN0bGpawDyY1Gj8K2WOq8GTyt+QKOOaZxZE1z1+kC/wC6rbSIUssPE9hd2c2dvHcZNMuh2kCsL9jHXdmtcN7FzwvsF3lKjuTdBxzTce866nyaCa5L+wxrY6K9VvcnMP8A7bubyHsBzA6FwUytG1qldC5F01rF+yXhFrqfULyv+3KPC2R5XNGSeRpc3HxmNme0jo5DrS/9i/gb6iE//wDNPLS4hzG8mzFhAUfrI/at5oT+6mvY/wD4kvqfUznmuwH8NnO488lhZWWXiLHhxpDJLPI4oGtY0EqSetdlO1yUxoYPCk4kjuR7a5jhpf0vI4jmSsH9yB4DnN/DSta5K28itR1LD2n3nzXBZ0bccx8hDECz9BybBOz23hC2N71cxR4GufLiTXx/Q1peWW+PgsPkhN3N2PPJx+ZjOBzuIkKS47nG4C2dG46LY6Vyu7WljpQ/gdvN5+Q8jwIbwveOKssmMz0YuUliY2n6HrZzDaoeR10tqvn4K4LdDvE5uX2/lS9zcJjPxoGO9rurgYwjGuNjPCw6XuR0PlTtFvte/hi218Gv8VzDI4YuYwXNyePymD3IwfTJDJ+4/uNccR/U0kXy/GYzwyfALpMOZZIJCSAx6XavT/UKqthQR/FtyWWjaMYknc5C94TUK6wrUbaLfi48AYJJy6WZB6pHbreS2ogmQ/8AW4kcYJcGBpQsjRT8aBxI43LmmauJBtebB8hVF/fTkcQF4/H5Mvry8h7zqQVA+VUk3uJ2SJPD46KRpkja0NYFJcQ0AeKuratJMbZIFZXK8FxbyM7lYY0GkQ3jXxFhV8Ut2ZfknYh8/wC5faOFGDiCTPyXFGNd6GBCmtDtVEy2V+b70SFsrMTjoscoscwALgQet+lS8rjRBwfyVV/eefyuV7uTy8rXSECJwe4N2rcEAoi1k3ZlQhX/ADHC40/vyTF8wHqeHF3qGoCHRKEheCZ4/neODf1TshnHYwR0c8rQC5uvW5NWjN1b2F8j98vtzw0b8eQHPehHpbq4ddxKp8K6Fb6B+C27M/7g/wC6HChxxDwGA+TIe/cHSus0J9IToatKwfjXkpfav/cR3k7vbDyu6Mgy8DlPONk4Q9DGsm9IcHH6SwkEGtLVaUydWHHS81to3sz7J4bjBnF0+QQ0NLW4r2lriYgPS8OH9QvV49VJ51qtOCdg4+GDeBKHRxkuL3BtgqkFyCtjODO+8Pvt9tOyJXxZHJDOzovrw8MB4c9viRZfGsbZJ2O3H1b2U7HyN319zOwO4edm5nt3t+XifddI/KhLw+GaR5XeIzZhJ1AtXLbDezP0j0fu8PUxOue3P4RU8j7kOOIzHxcNrHRuLmPJJsQiFuiUq9NzLZ0dj9zwpPhj1/6FZz+4ua5ZzjPkO2OQBrEY0DwRqCuumGlT47ufsPb7OnLjX4QJDx80xBcq+OlauyR8/wAXbfUtfA9o5nJyMjxobGxfoGr+01zXzJG9cZv3Y/2ixePMeVyTGy5NixryWMXyH1GuC2R2NtjceN4qLDxxHFGIox0QQtPggCuNNIzbJzHYjA1AyFwIDvoH4XcatCYSyEMaXSOdtKIT/aZ8P6jVCHIZG7S6OLYG6uT22H5m5okIY610jiTvTxMX7AXmnDAiOT7m4HhY9/IZ0MTmXRjvekXQC2hNMUlE5n7x8ZA9w45j3NBI96VC75NGlSy0myr5n3m5L2FY4x7wdxtHuU/BalMrgyp5v3a5TQ5Ttu5WxmRxI8NDr8aSq2PiQOR96ub4wSS8ZnZMOc8guMbyPWL7iCo8rVrTG5M7tQfTH2J+5HJ/cjsSLk+VAdzmBky4HISRt2+6WI5kqaAuYRu866NUclkjTTkRxuIc8b/yts9w+egpyhcWwaTlWhxbANrlug9x6/uFQ8nwaLH8gRzjNK4PJe8aCNXkfE6CsXds2WNDR/UT2A9voE/uSfibCpcstQhs47I9waN0hBLtv9yRfNxs2oiByVblm+p3qIP9EfrktorjYfKuLIddCocnmxY4LTtgkKgMiBmnJTx6VytnTVFVkdlvl3yhuHGfzTESZDlCWF0pSawif4vjGTQe02ORrHFX5eTIWE+bWVpVs57JEjL2Xx+YwfpJ5XOKB0zmsMJ8yCFPyroUwczQDl9gcfBEW/8AIPlmTcWQQtDhfoQVSqdo8kcJ8EFJ2UIA6TIyXMhaEaXJuC+K2qPystYkIg4PiWDZCZMqXxJDGA6qoCn4VH5GzThBL9sfbrlO9eTPGcUBHBCQc/MuYMZjr+rxeR9LNfgK6cGG+V/QzzZaYl9T6R7S7Q7d7E408dwOPtlkT9byEoBych46vd0b/S0WFfQ48VcahHgZctsjlj/K5LgwtPpFy5zk2hoCkr0QVo3BkfHfffcU/f3c0/Ihz28HgOdi8W1ztrSyMnc8r1eb/hXgdrO3bQ97qYFSslfOLDGr9voGrydjPx1NedJ6DY1JK1mj/QUQD0sP4XNUiYPpX/t37cHHdr5PdmZFtz+Ze6HAUJswYSit6/3HqV8AK9/pYlWs/J4Xcy8rQvBqcx3FLtenXqev/SvQOADnexqbijgOn8aAMw+5n3TxuycZuBiN/X9z5wTA42P1H1WD5ALoug1dXNkypG2PE7szPg/tlzXc3Jf/ACr7n5ZnypfXFxe7dtbrtcxtmgf0N+deVkyt7Hq48dao1F8ONx8EeNjQx4sMQDINzRua0D8kTbCuSx0oP4btufm3DNzHuxeLK7ZXI6aVNRG02aP9VdeDqu+r2OTN2VTRasuMQxOLxzjcTE3Hgbd20Evd473G5r2KUrT+KPJvktf+QEZy8uk/qVWi6fCrMxD3GQgusUQOvY+dAxuVp3bX2C2cNHeHwpCG5vUd12khQW+PmKAGnO3p7npQel40/HxFAzwCO2kpJqmigeNBLR2Rx9XVw0Ui4+ditA4A5oMTMxZMefHZkYsitmxpQJIXdCHNcCDScME2noY13n9mMPFL+X7Lg2tKum4o+trWou6D/wDQJ+FefnwOJqejg7OsWKdx+DEHMbK8ult6APcePH06NryW4PSmS3YePHkMdizwNEbhsfH/AL8zh4n8rf4VCbTBpMmOBzsrszODWl+T27kvImxi7e+ElNrglg7/APK0N69Pr9iNGebnw+UaksEsLZYHiXGmYHxvbdrmnQ166co8xqAHIjjkTePUARHIqf8AlPiK582FXX1N8OV0cATno4RDdPM1VijG1gI/qPjXjNQ4Z66cqUd9ueXaHv8AZYBeKG7j8XVMDGJMyHFIhjd/ed/6UIEkpT+p2gpNwOBkuzkMs72YUZ9RLnb5011NgvlScgMR8hEP/wC14z8qb82TKDtJ8VNzUcl41ZfEWYJsx/8A+Msp066Y2MEb8CRRHLcE0h5MXDIiaW4znelsOOPcmI8z0ohINWNyTnHcGsY3FVfU/wDv5T//AChU+dDcDSBZGbR+oyHCE9Jco+5KfDazQVDHCIfMZb3WM2tBX9Xm/Vb+lmgFTJTRTOXdFLKXRsk5TNJ9JPphb0/AUJlxoV7O4vMyIyeRlbi490git8POtlaCHDKryHFYmJE/9PEPcI/3H/UAvhXRWxk0UrMY2Nzg95LiSRurrTMLaFa5Di4sh5kiDYSdXGwcfFOldVMhy3xJ7EHk48sDiyZhHgR18wetdKtJyWq1uNM9MjANSrivgiAGqJgdDioIcQR1GooAexpZ8bKbnYGQ/B5Bh3MyMdxZfpuRKQi18Z33E/KMncTJ+P5p/wBPcnDn253NRA3IgCRzMtcEfKp4ksG7snhzMf8AWRsxsqUqRyOCDC2S/wD6mObMf47bUk9S40Kzk8r+o43Hwtu2aJxc940futf4aCtCWw7go4OMh/8AkPIRNlZCSOOxX6T5I0e4H8jP2mpbFEFg+3nbmB3VyvJ93d6Tub2jwgOXzEgP9zJmdeLFj/1SOt8Kewm9YI7n+ayOf5HI5N0H6Pj3vd+i4uAFuLisdZrWNHpaSB6upN6zN0iFdH7eO+d2m30efSiStkRQIAv/AIWtDA5ZB1/gKAFtie8F1gzo92nyoHBxYmIxjDI49SPT8hQMXsc8q93wJ0CUmxwx9sItdPPQVDZoqjzWqSRqbBx6p5UpKg6Ldbm69aQ4FlptuKHq0DxvQODrWoLekeNAzwuVb8ydaAOtAuUV3iv7KQCrA7HfKkB0BzglmsFAxwPEZRo3O/YaBoNx53tT9Q9G/wBK1nZFpk5g57tobjN2uWzna1k0bqxN4rQ1oly5FBvc2vWD+hqmSMPIB7fZ4+JEu6V2lvCs+PyVIh8TZnLM92VJ/S0+gJ/U6mUM5GTBCw/qpUg/+wjO1g+LutUkxSkVLlO5N64+EAI/Bgt+PWuimL5Oe+VeCCcMjJfulJcSVAGldChHO5Y8ImQgNPrk8G6BKmSkjzg4+l52s/obQBwhyLZjE+dAHmkXEQUf1mgQuGB8soiiaZ5XWaBe/wAKUpDSbJ7nu5Od5KWTm/bn5CZhSXlfbPswtIu2FgURhNHkVFMdVpsO134BHYvCdw8M3KixzxufCR+o5aaVxgc1VIlBX3H/ANOy/jT5WpaN/oS0rqdvqBHuHG4jHGL2+1z5w7e/k8oB8yon9phVsY8xeqWKXNiXlVVpqV+SXJyZXSyPfLO8qXOJc8nzNbpJKDFudfJZu2/t13V3S4u47BkdCArpC07dviK5svapj3ZtTr2uaVF9kcXtfjHc53g3Ilgicxow8WN0uQ9zygDYm+o3OtedbvWu4odlesqrU2rtH7e9nYkEWRicS90wYyYNzWe0wNcFCjVR+YV518129WddcaS0LzJJw+EBizzMgjRp/R4LA3cfAuAWsS4G5mSTubJxPHsx26ifJKvA8UK0AVnuHujtDtxjnd29xRumAJGBjvD5LXQMjU3ramG99kZu6M+57/uIPD8XBynZfbToeBzch2FDzue0GH3WJvaWsVytB3I5F6V24+lLas9V4Oe3YWkIzn7i9w9wc9j8hh5XeMnMdy4s0c0WDxsRi4yTDkAXY4XD2ruO4olta6sNKJzxhfJje1npJWo+Ogye5sfme28E42RG2CVnCY7JM+Vmcxg3Sx7LNaXje1rnWNbO/wBnF/7iVPuksnC998Z3Dl8k3vOd8OYZ2TSZ0rGDIc+SQMkVjQ0Kw6t8PhWF8FqJcDRZVZuTTeR+0vY3N8dku7YyXZPKRPIgzoJRNEZI/U6Ha3x6DUVzrNdaMvgnsUHtnkX9vcy48uUkBdHi5qJC5j3AOgmBF2HS92mnlTspqXVpaMuXPYLOK5NvKccduJM0ZEcqrIGKjl/1xO9Lv6mEGsl91QThi+Vc1s8POxtDchzAzkI4x6JsOVGFx1VzTY/I1NZ//YryK7WLsDkcvt9rzFhNJy8BpKsIcQXN+Fw78au+qnySi/8AD5mGHy8XyLzHxucA/Hf0gnBQqT0JBaa52i5BuQbm473QY72tlY7+5vCbo+jm/KtcbknQfxYJZdrsickNFgqfCregSix4GFjjbKGhxIB3a9Oi04CSYjdFEFkcxrG6HU/jVLQncU3lceEICXnqui0+Q+LG5JszmIpcNkbnxStLWhg2hRonWnS7bgnJjXGTHuUyiJpsdw2RxSOicxl3ekoV6r51qcakgMuKF0bpABGgJIc9SbaD40F6kFJkGBI5yAxTuDXevaihehvS0NFV/ABJy+PHG0RNkdIBtsdrNbmnyRssFmA5ncssDi6BzYyBZQC6+tLc1WBLcgOR5zleSAifM98bFIDz6R4oK0VfkPtWxCOxfeckiyPN0bWycGVnJJ8b2xk5bkih2t6k3qXkEqFsH2l5XJw35HsvcQNyoQB5rWSznRWiTXybR9s/u7w/ZvZc2D33mvHO8A4Y3F44cT+oxpGpG0+JYbGrrk+DfsdG2aL0Wnkyb7k/9zXdndsT+I44f8Xwu9JI4iGSys0LdwuAfGuitLW3OP8AFjxb7mG5mfPnSiRwDWNUNYNAD56muitUjmydhvRA7YnyEWseugtVSc8Nh2Pxr5LlpToUrN3NFQmMPhi8ta1u95QgDr8zWNshtXGaX2v9r87kXRzZbDDjkB2m2x1Vzv4VyWzeDdUSN+7W7LweGxWDGxGueBdw9It1Mjta59WJ2Lvh4G07htiaUJe30gAf/eOuflWiRDZJxRx7trA+R5/+zG1vze+/4VcCgIa90bSjgwtClkQ3OU/1ONOCSH5Xu3hOFCZ2TG2dArS4SyIfEBQPnTgZQ+a+8nHxDdhqXRqjpSHBx6I0FB/5qQ4bM35/70dx8o2XF910URU7AQ1rQvRretWHFFEy+6MvItkZBcx1ntVfktOB6EQ/nvbDh7ign0KfUPGnwKV0iNn5txO4+p5N1Km9UqEO6IyblXEuUI49a04EcyNdkyPcXAHwAaFcV0ATUrWkQZTJ9z/YXtnM7D+2uLhcoH4/J8nNJymZjzH2/a98AMY78xcGAKPGuV5JZrwNJM004WJixj/1JQY4kPUAXJrNsfGDrmAM9byRb/7uMeW0XNJlIIaNrfU0CKyKfbZ8gL0A2PtfI5pc31tBu8+iIA9b05aFuMzPY9ro2bp/9EXoi/HrU2Y0iq8viySExTS7Guv+lxQpB8C7pXFkqzrrZFUysRuE0tc6PAY+4IHuzu+JNcrqbqzIB0D2PMuFj7GOXdmZX1W8jUmiY9xufj/qAHudyWSxRtX+235fTammJovOLO+aIDNk9pugii+oj/HhXVV/Jy2XwPSMkaCMeL2WD80nqcfNB/GmxIr3IwxSOO7fmTNs5ttrfMn6RWFjWp3tLsPme8ORdiRS/oOHgIdyGVE0+hh0YxxHqe4aAaamuvq9Z5ba7GOfsVxqPJ9E8RxXD9s8VDw3B44xcCD6YwVe551e92rnnqTX0lKqqhHz17u7liciVu13Qi4J0NWQZV95een4bsjP/TuLM3kHN47FLfqack+sjxRgdXN2LqtJN+vTldI+Z2RMxYmQtBGwbI993D4NGi+dfMNy5PpkoGpYn7t85duP5pSp+Q0okBWPx2VnSR4+O0tmme2GOWQfneQ0W+daUXK0E2tCk+4sfjYOI4zA4XGAGPxmNFiRhpQj2mBpI+JU19VVQkj5azltgs04adr9OjyEa7/OqZJnv3N7/g7I4Y5Ebf1XNZv9jiMEDd7k5QeoD8rdT+Fc+XIqovFjd2Z32F2bNgZc3d/dU/6/vHPcZHkDccVr/wAoLrAoUKaaCvGvk5HtVx8VBeXZ7omu9trQEKuYm7z3PNqwdmbKontzj4+5OUfHkPeeJwx7uS6MlrHr9Ee/6nbiLp0rfrYnkv8ARGPYy/jqX7ImIaIyGsaPSyJtmbW2Ab4JXvJJHhNywYykPBJVjdfEfzokUnW7Jm7rhwUAtsPilAxsowqu9VG4Xt40gGXkXO3c0/UOjk8BQI81ikbDdELXIXD+dADCgkgKoKOHgR4jrQAlyu9Kq4Irfh1atACk3s2yHc0CyhPlQAwjwQHtLm6hw1HkR1FJgMl/tnYUBed0ZH0Hrr41LYGcd49txxZY5fCbshy3pl47SI2CU/nJaFIf1868rtYY+5Hp9bN/ayPx8Mta0TOAiJO2KMFjT4WHqd86847iYZFEyFzZg1sDm7C2WwIOvpprQl6k12fmubHkcKXPdjxf3uPe8EEsP1tv517PVzclDPL7OLjsTM72kmO7ZBcA9a7jiBJ5J2p7MXuSlAWOdtah6kjUV53ax/3VO7rZP7bAWTkQMGzNy9xGuLi2ufEi5ry2/k9JfQQZcqNi4OPHx+LYGWZA8+YFJt+NCojcZZgxSvOQ8PzX6uyJyY4R8AdRURI5XgdMzXNMbXPy9v8A6WOPagaB4uNVoIb/AFT5ljYS5Av6fEG2Mf8AjkPh5Um5GkeY9sKwB4a4/VjYQ3SE/wCqT/OpmCpPSz/p9zZnswY36tafcyX/ABNJuPoUk/6guP8AqMmUDisMgm7svKJc74hdKhS3oU0lqxOVw2OH+5zWYZpSrvYYdU+F6vh8k8/gjMtwDTHg4oxo/wArk3PPiQOnzokXF+Si84cbEe5zyX5Dyu0LJJbWwqkUkVDk2ZUzHOeP0MB1c/1Suaf9PStquBtFTy8CDa6WJhD2BBNMbp/pHnXRWxnapX8nDe54DW7339brAV01sc1qkdl4kLAWTn3Hmxb0H4VtW3wY2qvJB5PGvYXSxjc0aNd9YHx610VvJyWxRsRx+s9HdR51qjA9uDV8bfKgBh8jzr+XQ60Elo7ewsLkeA5F2QyWPk25kTsbOa8mMxiM74pISEJVC14IIuDascl+LSN8ePkpIDnDCeUldAAGMaxh2N2Nc5jA0u2qbuIU+dbVehg6wxXMyJHg4xcogx2BDdC71Gkh2LI7k5sTgMTtxsgbxUR/WZWO0D+9lnR7jqdosBWcyaqiIzHnnmaYA93sF5en/ptc4bd3mUsKBgHL5LSWYkLh7UIunUjz8q0SM2yObE6RXNKNGrjZtMkUDEwelvuv/qdZoI6gdaIGKDZJXB8pU6AaC1IaUjzIALgWvr/CoktVHSxEIQp1NKS0hYbc9SLjx+QpFQKQfSSngOpoCBQBGnpZ56mgZ4G4LW36vNAHNp3biVJ18EoAWrWhXIPIaeVIYpoe7QbR0pAe2sY6wV34miRwdcxxBUgAaCgD3+iNuup8KRQtjdhDpDYdOlDAkcfNeDthHqrNotWJPGnEjwZC6V/SMafM9KzaNUyXj5ENaWvO/bcQss0J/U6snU0VgDO7nZEwQsIlk0EcfpjHko1qq4ibZYKzk5WZyMm6c+lpKMFmgfCulVVTndnY8yFrEWx6Aa0OwoFuUBCdjUsB9XzoHBwbk9I2N6roaAOAOPpiaCdC46XoEeDdzkKvkVABdT8KBlp4TsblOU2ZGb/7TFKfUPW4eQ6Vz3zKptXE3qy+8fwnFcJE1mDCjiPVK/1OcfjXG72sdVKpGV42ZnwcXNFzec88JHKz9FGz0yZToAWNbG5ARHtKOJt869OyTei1PMTaWuxXeS5WfkXNZsbj4sdsfEitFGPIePiTetq04/1MbWnYku3Oz+a7lyGwYEDnBxUvRAg+NZZc9ca1NceK1mfSfYf2K7f4mKPL5Jn/AC3JovtAJAw/6nnVPKvBzd219Foj06deqNSh4+DiYhGcyHCbGR7ePhtQADQLqa4HqdK+Ca49rpHmbDwzLmSOB/V5F0H/AJlpob0IjujuHtvtxzpO6Odgw7EmFjgCfINarqumK1n9qJd0t2ZJl/fHg/eyh2Lw7s92FtlyeTzS5kMbHuEYeWtDnkbj4V3rptKbuDnedNwig8t9xO7uc7rz+F785LIxMXBe1s2Bwz/ajmhJB9EjAS5WkFp/GuxYa1qrUUt/Jz1yO1nVlMwcr/45yHM4onhn4TkYcjDY7kWh+UYJ/VFKGsJc2ViAg7ta6WuSTjX6GKlPVkl2B2bzPe+Fl8LwLhk8ZiyRzcj+um9rGjlIIZIYGH1FAb1GbMqWTtv9DTHRWTW5b8zsT7W8PnN4LvTvuaHk3NaXQ4MQgxGNfYK4NcEsik1hXNlamtZLeOq0bNr7S7V4n7dcLFxnHZLMjGY/3YeRlEbJXMmO5ofK1A4KfSa4Ml3kcs3VeJiveX2D717g7u5XnsN8E/H8jkOym5Hpge0vRQ6NoRR4t+rWvRxdylaJOTjv13ZyTfbudx32E4XPfz3Kx5/cOZOMzH4fGO7+8xuxpQLtB1c51ZWVuxb7VCNE1jrqVHtbnW94cHkjmYWOyZsmYZMmjS6cl7JB4Fq7PhVZsf47/bsPFfnUvuB7/wD8IdHyhL83iM9mM6dw9UkEjdgXzLSAfhXKl98LybvY457IG8VG5xbBJPNgTqLGKSMonwsalrcSYnBl29x8Q0PG5uI1rwBdxDnxFy/IVT0q2Hkl28nFLm8zx7fXkcblscGAX9rKia8L0IDg6odYSfyJbk1CMrI4o8htmdkYJDXzPadpjOhU2JA/ZQyvAXj8hje1HO5r5Q+8YbYbxrerAlIeWyHtc2FjYW2VLu+C0MaQa2KeQj3JDtchDQVI8almihExhYEbRuLQXN6nUA+K+FVWorWJ3HL8P/3bJRHJGC6J3QOA8K0T46mbXIwn7gZXHx8rNl48cgypTvynRENjdIquICaGsPzWbOmnWrBnObzUjh6Y2xAXJJLih6361pLZqsVF4IDI5N0pOwGQ3XQD+FWqhyS2I3IzJnANlkDG9Gt+pOlbVojG2RgaP3Oc1iXXdIVP4VqkYO4Zicbk5zwzHikyXH8rBZPOiUidy88D9tOUzNj89zcGBV9pg3SuHXyFY2yrZDg2Ptrsbj+IjEkWO1UA/UZSH5gGsdXuDZbP0cEjTjsZLkmwIa0siA/8RRaGpBONTHfuZ2Dj8gx7WsjjlvIxkIVPIvqsd+LPRxZmqwnufPPL9ruxXmOKMhwcdx+pxXxOlenTKmeZlo2R8XESB4a5vqGjdStW7nLwZJY/E7XtAark+keo3rJ3Nq0LbwXZ2TyMoa8bI9EA3u/kPnXPfKbVqbN2j2Dg40bXCBoyGJ63D3ZRqpU+kVy2s2aNpGkYfHQwbRHtfMAgT+9J+J9IqUkZtyTuK6XcG7WtS4K+7KECWGgStFJLSQ7l8jx3Fo/lcsRK0uEkp92QgdNjbD51qqkcvgoXN/evhuNk9nGWVyEF07mhh29QGp+01aqKGZr3H96OT5Jj445hFC65DTtDgPENSq4tjivkzfku9ZMtyTTPkc8ruX0hvn0SrWFhzS2I2blZ3kMfKAOgadaOIcgGXkyHbWuUg2P7LmmqidiPnzjuJaT13AaKelaJGTsBuyd/pJV3UjSrSIkafPI5tvQn7qqCGxh70G6R1hqp60xSfSf2P+xec3M4/vnvGJ0Ii25XD8Lta+R5LVZPPuUNA+prNVua5MmSdEdFKxqz6gbDGyRz5nbso+ohTNMuqEmwrCDSQgTuAR59vdZP92Z3wGgolgOvLYxunLYW9HSndK74AaUAjokklvDGBGt8rJOn/l60SOEh1sMc79z3SZhB2gkbIG+Y6Gkqp+QbHXtbaIybndIo/pP4VQpkjOTifFCTI5mHGtgLvPy1rHIjSj1KHyUOQZS/jsMukNnZWSoXzDdTXn212OysEDlYMM5Xk8p+bkhVxYrMA/8AC0pbzNZNGvKNhMUGQB6YWYkLUIaCFA/1O0/ChITaJbjeTZCSyBZZR9UgNlX+o3rRODO1ZLFjzjIYWZBc8m4ibYfs/jXRVyZPQM4zhpub5CPicMtYZCr9nqbFGNXuS1v2mujFg/JaDLJlVFJsvH8bh9v8ZFx/HM248QVzvzvkP1PeepNfQ0oqKEeFe7u9Rt7i4lB6CbOHnVEA0qgFmjksulAGHfekPzcngMJhe9jDlZZazUva1sbfw3mvK9hb7Ej0ugvubMwfwUpfuneMZuv9cjvJK8FI9uTzOCiY0zMSP+qec7nnxQGiRE92niYEfdPBxf8A6w5+fjAzSWaB7gRP8q6usv8AkRhmngz6gzWl80j3OQbiQU8fGvqT5ki8x5EZBNxclbEedS2B83tyWd3d85veGUA7iOPkdgdvRzH+3shKPmDBclzgUrxO1lm0I9vrYorJZ38ts9Dne5uUgyBGX6Njbr8TXnydkEXm8zcEuD0FgTuQ+TQjQnnUtlqpaOO7y4Xsb7dwdwcy8l/KTyvhx4yHTzyNdsZGxfANUnQCvc6zVMUnj9lPJk4ozLlvvh3hyW79HHFxWC47oYms96ct83u6jyFY37Lb0Lr1Et9SHH3T7sdM1z+dyWAJuPttN/MJas/z3+TX/FXwTfGfezuDGnaJcrE5VhKOZK32JCn+pqXravYt5MLdY1jtX7hcB3RIzDdu4/lXC2HkFQ4p/wCm8IHfCxrtplVjividS1zNe1xHnqdLfurYxGiWmRxUteACANQT1CUAdk2OBEn1NKNlFiRQAy5pabuQ6NkBW3gaAOOd6thatulyR8aTAba6TS6g/XqvgDRIDUga5pI9MhUluov4UmBF8ljsnwp8ZPTJGdpabhwuC35isclZq0aY7RZMoGI/IcdsEYxg4IZHDfKb189B7shwlwMaUtmd+oywPpJ9xwPwFAtSS47NyGchg5UrGY8bJGholcPdeHnYWtAsAhrp69+NzHNWalpzYWmV7QAdriCVQhOte9J4jIvIR5dHKBseDGVs4DTpUWUpjThoi44Y8AB5MeG0FPel/uTvT+lo0r569eLg96tuSkeGSWf3vbR5B/8Ae55Up4tjFzUyVAlz5JwJ3kvhAtk5R9uEJ/8AZx9fnS1f9B6De730GO1+an/qPWLFadfpGtTBQLlZmNG4Q5k5y5jb9FiDbGD4FKTa8lJSPY8XL5sZbHG3i8PR21A4jzPnTSbE4X1HYcTisRxPqzslo9bz6m//AFaUcarfUOVnsGOny8prWOPsQaCOEIU+OtXLf0J4pA2UzFxw4NDfcd1+p2nWotBSIXOhzp1HuDExUu4IZSD4HpWcmiUFWz8KPAa5+MxsLhd08vqe7zU60DUlQz8TKyd7saJz3Ou/JmsEP9IrWrKaK1l4uNA5MpxnyWlWxlCAfJo0rdNkwRGfBkZUZlnAxohYOKFwB8hpWtXBDqVrJxGxvcIAXnrIdV+JrqrY5bVIyTFla1S4vkVC0fz8K0VpMXUiszEjkcpOw6NIsfnW9btGF8aZE5UEsG7cFbqHD8flW6tJyWo0BOcDdVNUZl24KE43bLJHghskj5j+4furjyObnfiUUKZKXTZEjh6jI+x+JrrWxxPce5K2Q9guGANvc+kUVFYKly48gNlJQbRvC9RUJamraaPPzJZIBDANsbVL5HFNfCmkS2AAxMPoBkcDcu+kfCrJO7JpT63W026D8KTKVZH2QBpC2T+NS2UqjojaAAmvU61JpA4Ah0v+JA+FIcHdnVpv0P5r+VAxYbsUj0aK4m586QzgPp9AU9SaBHmtC3V7ulKQHNoA9RCIqD91Ejg96nelvoH7qBnCI22Pqf18F+NIIF7XvKOs38F8loHAkoCBH06mgIFiNxG57gAKJHB10jVLI2r4npSgBIDT9avfZGj9lMBTHEO26kfkb+xTSY0F/rGxNuSg0ay1vOp4lSMS5WTk+hpMcZ/IzqOtOEhS2LZjNYhf6ettTSbHAslLNRjCqrqaQzjSLliebjregQkOAXaN7j9TvCqCTxYLFxLiFRvgfhSETnC9rctzjmmOMw4rjeeSzfl4msr5VU1rjdjSeF7O4rgw1zG/qMwJunkAUOP9I0FcNsrsdNcaqTE0+1u1U8ep+NZQawReRkXLQbJ01+FWhpGC8tymTzGcciUNawoyDHZZkUTbNY0dEr3K1VUeFezsy9/bf7Zy9z58D+Qecbji5ZJUUoNU8zXB2e0qKFudWDBL1PqftrtLiOGYzD4DC91rAB+oyGhn8OtfN3yWu9dT11VVUE7yOVx3BwyZHc/MQcbAwXaHtZYXLQuvyp1o7bahySM07i/7iux+AxAe3uIm5h0zzDBmzM9rGc9tnASOBVFulehj6Vrb6HNfOlsZ13990vujk4E8zOUi4vHhymYsvD8b6JTHKzc2SOVpJkZ+Uuboa68ODEnDOfJlu9UZ93I/huT4rEMUL8TmYpjLlcjlzve7Igkb9DmuLnFzHBWm1q7MU1bT2M8jTW4H2txGXyvLM4vtVuTyHJZDdkuxxxoGsW5e5pXYP9VVltFZsTjUvQ3rgPsTiyNEfP8AKPyZxtbPh8aRCxhd0fJeR3zIryrdr/xR3fjT3Irhu1P+33uHm5+zcaHOw+5o5JMfbkyS48rpoiQ4RucS0kHRpF61eTsUSs9UZKmNuFuXTtr7V9gfbQbuZ5KQTco52P8AqM2f9PDNsO9se0FrdydCb9Kyy5r5fG3waUoqbFe+5PZ3b/eeZhz9w90cFxvbvGe5/wAd/wAWwDMkxnm8cjtzl0XTXSnhzWxSqptsWXGshTvuT35NzvAxdndnwuxu2o444JuWz3+z70UAAaxm/wBW2wJteujr4lW3K278GWWzelSmcVid2IMTjM3luSyDE6f9PjyzQY7oIyGyPa57tz2sLhv2iwrotwesIzSsl8gfMduSZDMgZvJ4UedA1s8QY90vvskCsMcgDnSbwuqbSENVTIq6QZ2o7+S1/b3jZoI34WTE79PLHudE38wVSWr+Ya/srn7F09Ua4quqgu/dUv8AxHY2eC//AH87CZCQ4+p3iCf9La58Sm6NruEZ7z/3Oa7K42PGwcuDF42b9RmQ5Tfa94+2GghRbr8RXVTr6PVamDzQy/8AbuXD3L3jw+VixOZFDxTMp0Twj4/1Uj5ACmqCuO9eFHPydCtLB+C5R2d353iyJ/8Aae6NrRqoxyI7fBavJWMdSK2+42jAZyvIdu8dsyoceBywyRZMgbubGfS7br4iuFs6EheVxk82KceJ7HY+Ojsh3tGMB40IOpt5U62CIG8NkT9LMC3CXOh+VdBnJYcNkDdrSDuN2lFsfM1SQpJiMo0OA9AJVbJ8VqwOZ+Vj/p3xMa6VxbtRoUDzWk9hrcxzvPjJclrsklmP0cLOco0XwrkShncraGWZfEq1wGO+R/8A9q7RF866KidiIn4Z7FMuRtJH0x63/bWysZsbh7fysl2zEg01klsfw1Wr5pGTq2XPgPtwJ0kzCZ3KECbYh5Gs7ZfgOMGmcR2/hcbGI4omuc30+zjMBcPifCueW2BasHDELmkMbDuFre7Mv7hVpESTkeHGwCRwLpOhf63adGiwrRIhsMawysDZHERH6WnWx6Mb/GrgUlb7s4+J8ABY0lp3NDgVA8BG3+NY3RtS0GH9zdtxe85wYryVa14T8GMunS9FLM3bTKbL29I6QRiEhzrNCIQfJjK2/IRwLFwPYLnyxvzTsbZY32cetmMvUWyi4mp8V2zFhCERwCNp0dKjF6j0j+NY8pBouGDw+RI0PdG440YF5T7MI+Olq0rVsztZIjec747R7b9tk+aMqcLvgxz7cTUshIub1uqIylsy/n/vk57ZY+OYzHxAPyEtHmpBU/OtFVsTSW5lPM/cXlucmR2RZn0OcSoA8Gqn41usUC/IvBVMvmp58hzXDfkA7mySK4k62HQGtVRQZvJqDTcj+peyRoLh/wCrEbNK/wAapKCHaRou3x+1I5RG7dE4fUAehpikUJyxgYFAA6638T1qWgkYdMpIGnlQkLkIMqncqfD+VOBSIMjlLulwE6GqIkXjxzZU0eHisfNmzODIceJpe97zYBrQCaT0Gk2fT32i+xeH297Xc/3Ax4s3liA7C4mQh2Nidd8xNpJD0Gja4smadEdNccG6jnsdWlr3TNvtbH6Ywni+wrn5QbcZFx83jyn22zBznXMOKFIB8Xmp5yPjBIY+XJua1u3GaRowb5iDe7jTVhQSeJjlx3tZckl00xVyeIWrgTYcyOF/+2DkvPpD5LRg+VaQiZHXbAkU8jnFbxQCwHmlNqNyZFhkr2ekDFib9JABdt+JsKfF/wBAlAkkEABdjxiWUlPdkJdp5n+FYuqNE2QHL8e+SJ5zJhHjuCFrTtB/ia5b0fk3rYqUkToiYuPxA2Mf+tL/AG228tTXM0bpg7+KkyAJcp+7wL/REPMDrUQ2yuSQ7Dx+wLixe4PzSvJjjHmpuaviS7BbJHRgiRxmDR6oof7UQA/qcdapf9TNm29kcGeC4cZGSxjeSzwJZmsFo40VkYJuSBc+dfTdfEqV+p4WfJztpsScs6uVetkCBPOuk5xhVc5Br8dPGgBqZNpaVIHQ/wAaBGRfdkw4j+NzpXljHe9js2D1OLtr0BHwrx/Yr7Uer6/+TMxl5IQxb2Rx47HXEsp3SuH/AIRevEPYiCDz+UcSrGlzuj59b9Wsb/GmVAHxnONwuf4vLyJjvx8vHk2m59MrSUaNLeNdODS6ZnlrNGfaM8u57ixDHJ6mnUFrvUCK+oWx8q9Csd2SzYvAcvkYh/vswsh8Kah/tkAgeRNRdwmOv8kYJxcJ4jjcbBwmtYIoWtc8KC4n6nbjdC4rYCvmLOXJ9KlogbJy3sc7c4SvVA1n0r18vxqGWReRmuaXe+jQLBoKu+QGlOBoqXMiPkOQxM6V5/R4cRZFilxRsridzkJQL5Ba6Vf7YRgsf3SReXmOY073IxyBguCvw1P7qlI2IzKmfKCGBFHq3hfntFh860SFJHHGD3bnuMkmoJUn+QpyRBN8TzeXxz2x73z4zL+2HEyNTqx62I+NNWZlfGmfWX297mf3R2vFmSyjJyMV3sTzD/1Gp6HuH9SWd5ivVwX5VPFy0dbFkeGOJMStd4C6fBK6DAT6mta5dwJQ9VXqKQCQ4OAUoFKjpbwoGNq/arEQE7mddOhpNiGnPbZ7dyi7x1H86QCJWPd6vpJ0HQ+Hz+FAAWRlNixcmaWwhje5/ltaSprOz0ZVVLRjR5ZrYlzcsRxu9QgxiQ8gn+rWvn7bs9+q0C8XNyJId+BjtwsYf/tU/wBSeN6gcBnGRtyuRxRE+XlMn3Yx7t2wx+sfmNreVaUU2RN/4s1jPcJJ53Nd6i9yjrqlvGvovB4D3IqcHa7eNbfL+FIRAcg+PGzHyumhx/dDXbyPdyiSEIaDYaWNeL21Fz2Oq5odbIWNM8cYxWL6s3Nd7jz8Gmwrj2OvcYjzGZMobiwzcllflkm/2x8G6AUpK4hUvH8hMA7l8sY2ML/p4Sg+FqfFsnlVCsWXAwmbONxlf/8Aay/vHU006r6g1Z7s8Wz5nqyJTs1IVI0HQCjUISEnIxMcMiiBkk6RxtU2PgLD51LaKhsfLcpx9zJkOPC4oQLvPl5UT8i0OyTY0LTHC0N3D6iA55Pl5/Gk2ikiLngysrd7DNm+3uyG/wAU1rNyWQufhYuP6picnJaFG8bkPk0WFA9SA5DHyskI8fp4AqgJ7lx16NoTKKdm4kbHS/8AGxCTIKgTuKMaequOp+Fb1sDK3k8c7cf1k3uSAK4fS0fEdT8a2V/gh1IzKxwY3RpYkFrI1KgdPhWysyXUr/I47mXJ2bySGC7rdPKt6WOa9SHfjyepxaGFLlxV1dCZzOpHywgEIrnk6HRK0TM3UZEGK3d7uKyaN+oChw8w4aVcmTqvgOyedzJOOj4uNjGYkLSxllkQ+LqhY1MlO7iCsPa/He1xF2lWnULXTucbQ5JLBOPcmVsq+rb+alsN6jYe0ECCJPN1z+2nAhXtyPcryXDw+NEj4sdZjhpub2vUNmiqENZqehtfWpLg8Axp80+JNAQL2lFKh39I+pKChaEf6Wg66kmkApoch231Um3zoGdawuIH1HqT9KeVKRwd2NaCCdUQUpCBRa4/6G2QUgPBgBQAuOi+HWmVAote4rIUHhQKDzbBGt3eaWpAd9om8r/SNR4UhnC9oKxAFLeSmnACULyPcu7+kUAKdtBT839Ldfxo1ASQUU+gf0DWmBwFyekFg8epHwoBBEeI5rfckIY1Vv8AUVqWykghha0ERtDWp9TvqSpKEoSS4KT0e796UAcc6NpH53G3iFoAQhJRxsL7W/xpiZI8VwnJ8zK2LBgJjBRz9GN8y6s75FXculHbY0bg+wOO44Nn5EjMyho3/wBIEeXWuG+dvY66YUty4tYGtDGNDY9GsaiAdErA0B55gxp2nc7wToKY4ImeVxKa9B8qpFAbt25AinqNVNMRRuwOyI+TeOQ5KVmPhROAkmmcI42rckuNrV39nsNaLVnl4cPlm4w/cv7bdk4v/Edrtk7k5iKJ00j8VqxNDArnFzkCN615H+NkyObaHf8AkrXRblN5b70d653N8bxGVlQdq8RzEHvw8ljAZThFKHCN7nBUG4bXABRXXTp0VeX8oMbZ7SkZtjczyc45WPuSNubPPFLDDzGTIS6KcEFkjDJq0gXAbcGu10rpxMFezmdiKg57HxeA/wDjmRK7kOMGT+tjxY/SxuTt2bg8jfcWIbrWtqPlyWmhkmkuO5q3bn2yxuK4eDme/OS/4PBzA04fF4TS/Ok9wK1u4gu3H+ltebl7Ds4opO2mPTUsZ7R+0OJk8dh832dy2FFzUzcHA5fknPDJcp49LCWyKxzuiiorkzNOLLT4KvjpJpf27+2fbvYeTyY4neYeRla8MyXB00UcY27A43LQSt6582d5Wp8FY8SrsZz29xPev2f+5Gby3dc45Ds7uSWU5ee1xe1rRKRDK8FNj4w4KNNq+FdWS+PLjiu9SKVtWznYV31L2Fy3fmF332ZyEEnc/FpPnud6OOy24wQf3XgN90t9KjX41Fb3VOFk+LC2NTyKh3p9yub+5mNL2xPixnh8maJv6TBj91zZlWIvypUay4PqFq3xYfxPlOpGSyvoU4dp5nG8LLlifC4aSV82PhsneJsk5+Kvu40268Ti0KxwbtcovW7yp22kySaQN3dw/b87xP25LnCXGfHvzeTe1uLO3Y1xfGHpIHBy+lCDV4cll/LyRkp5Q5y3fs+XJ70+a/IzPedludgMGFEMmSEQPcHD1I9gDXhqNd4UseD/AGKtlUFOfzOU1nsYTWYWOm3ZC1Dt/wDGVcfxrqVPk5bZH4NX+zvIZvKQf8JlRSSsxZfcws9hb7kJeSSHbk3N3dOleZ3Eq6o7uu3ZFg+5uQzku6uG7DwyyL9M/wDX572bWtjyJG7Ym+pwCgeoAnrUdf7cbuwu23CKBzXHd1HvPF4Ln+YbzoypWSZ7Uka2KBhV3vMka3YAwL6fT4Guurp+OUuPwZWrZWh6o0ztPk8bi+G7s+5kzGwYeQX4/ERIg9jHHtQtYPAkCuO9W7Vp/ubTCbKV9nJJ5+W5fNyw54dEGFwCn35ZDITXT3NKoywas3lnbXd//Jcfl8jyfGYfaWNA536Mte7OfIVRzj9IRx6dNa8tXpxhLU7eL5TJZJ82SfFmY0S5czY9jcmVwZHsbqABqlRVFtkVgT4/GNayPKGU2Z5L09QY4hUvXUjmLHj5spY14DYR1MhBcnwFUMkYMhuU7fG2TMk8/wDbt8EFUMJyjIIknyGwNKjZCL/BTrQ0BTszExxI90GIXMcv93IPpXqUN6waNkU3leObPI7e8yuPp9vHCNHxNIpEPD26wzMBa2BrjaMAyv8AwFVyY5LjxHabIWtkMDWBbzZRVxHk0UtzJssUPHQsVxa+caDd/ZhaevxogUyS2PivbHseRHHc7R6Gf/pGrSE2SGPAIWB7WEscoJ/2mp8/U6tEQGB5bHtHpjbf+hnwU+omqkUCwVG6JqB35rxR/Mm5qgInk8d2RA4Peka+sMPsxqR/U65+VZWRaKrLwkczXNhiMkbR6nJ7Ufze71FfKsDZDGP23EE2CxCezjDbuU/1lSaIbK5JBrcDh+Bhdmcnl4/F47bOaCHSu6XL7rWtcTZnbKvBTOd++XaXCRyRdvY78nkV2jNym+40Efma1xSuqmKDntdmSdy/eTubuFz2TZzxjk+lg9Fulm2HwroWMjkjPeQ7iyXuV7jI5x1dcIdVPlW1caMrZCKkz5pQ8SSEEFWRooJrSEjJ2kajk9uUSOBCXaOoc7p502CYp87pXe4WncLAi34mkgbk9vBIUpqjR50COOmOpsn40BJxsjz6rgdB4+NAjhchTTUj/rTASpKlvTrQIsXaHZXO97ZToOKDYsWJBk50wIgjvpYEucmjRWWTIqLXc2pjdj6a7V7Z7U+2kIyOExmM5VzNuRzGaRNlPX6hG02YF0DfnXmXy2vudtcSRI5Xcc+Y4OZG/LIO4TZBEUSf+H/KsmzbiMnlMzLLWyyPymOKRwQj24gfBVqG5KhItfb2PP7jWzbY9Ux4PU4nrpRXVkWZomHiTxRBwDcZoQOlehcnnXSkYNknjmNxHtxyZJb+d5/tj5aVqiWgxzX7d+RKGhxswWCeAS9UTKFtMzh7eJGIox+Z38v51Wq2EJk9qIt957ppTq03H4Cpagf9BLzPISGt9oBAD9T/AJDSlqPYCmwoi71kGQlQ4+t58gOlZukmiuRuZxry/wBIEXjJKjnAeTdKxtjKVyOfgQs/uObveLCSW9/ENrJ0SL5sDyBsKyn3Fs0ydD/pYKyZe5JdpcGOZ7kwosmFzsOFxyZvd6sh9SBo6EpXV08fLJ/Qw7GTjQ2rJkLg5SLqvgF8q+lPCI15DiU+X/TypANaFCUP9Q0FAHnhyKqJq5evjQBn/wBz+Hm5PtPLfiqMrj3NzItgBcQy0gavUtJ/CuPt050aOrqZOF0fN82Qxu/2iZHhPpO5xXQmR1h8q+Zg+mghcnPepIKlyl7YrN29d0jv4VoqktgsAbv3M+vVgjBRehJN3X8KtaE7n2B9ue5Iu5O2cYOkXNxYmNev1OYQgcPFHAtPwr6Lr5OVUfOdjHxuyf5DGGTBJBIFErHR7x4ObtK+GtbWUo504cnzVzT5uIzsnis5pE2K8xOiAIuPpcp1Dghr5nLR1s0fSYrK9Uytz55e/YXuhY6wY0K4jyAv+6soNoI/JlAAaG7Xjo71vP8A5RYL5mqFsQmSyV5c9PaYLB7iHO+G7QfKtFCJYC7EAILWucdBJIS1p+K3NXyFIw/FLSr0cT4+hg8PM05EwmDiciVm4sOw6ucCxh+DdTSdgJfG7Y3NDpmbI+jpP7TUHgwXNZ2uB9DfaTgJu3e1Jct4LYeTyPdgY5u1IY27N23oHm4r2OpVqss8fuXVr6FxcRuJhIa76gT1Pl4V2nAda6KSz/7cjrBLAkUDB3lzLOYoJ+nrt6pQIT6SfSqapoQdAKlgcLwSA8JtPpdoR8aAGZZfaBaquOoP0OT91IDO/ul3TBx3Ft7fhk2cpyaCR7bvixl9Ztf1aCuTsXhQdfWxcrSZhgtbiAPx4BE3rkZibivUN/nXjs9mdCVj5LDePcc1+fIDeaZ3tQNcLdUH4CpFBduwnZHL8s3LkkL8Di2+86PHbsg90q2Ni6uv6vlXZ1acrT4OXs240jyaBkNafVH6XKrm6jX9lewzxgdztoSUflu7UIfKkMqHMP5I8kyDi4owHxNc/Ke3dtCkAAm2leR3P5I9Tp/xkaiwcVkrZOSyHZ2W43apel7o0WFcMHbykmm8k5jPZxwzDZ/TGj5iPPoKrkvAlVvcaLSrpJ3hgP5nEuf+JqWWo8DTcuIO24UbpZDol7DxJsKSYcfkjeb5fjuExzk9y8izFiN24rXJI5dBa5Jqq47WK0Rk/cP3mzPVg9o4n6PFcdv6qQAyFetrN+dduPrJasxtkKZh94d78Nmf8r/yksj5DeCZZYXgnRzPCt7YsdlEEp2TNv7E+4fb3dhlw427O6MWMSZfHqH+nT3InabFN+o6152TA6a+DVZE2XGT9TkNWR4igS4jIt/5jXOzVEfPHC1u3Ej3nRzyUb8S43PmlIaILL46fIeDO4zvAJEbBtYE8F1+dSaEHm4UQKSkCyMgZdfiUuaaYFO5qCD6Hf2l+mIeqRD18B862owhlSyYZ2PLIGGFhCtaPU8+JJrqT0M4Av0gh3PkabkANRXEO6kmyVqmRABl4BmaRjt3HVz+jRoi1rWxlaskRLhRtBLlL9v5Qjb1qrGDoBS4hZc+losQR/KtFYxdQR0LUKBT126D4+FXyM3UHdiOcSgBahXwq0yOMjLcRu8BjCTqgCCnyJ4CjgNZrdx0Y26ClzH+M7+ke1Qm0nUalPOlyHxPCDadoarluW3pyECvZJPqKLcBt6XIIOiIMHqIC3A1PzpSODwY4qWjaPE9fhRI4FNi6gbz/UdL0pCBYazch9RGo0okYra5zgfpZolIIOHaD6Qp/ZQAotJCyFEuQaQQIB2giEKvjemMWY1aDKfUL/OkEHVDQQ1pKXUUxjZB3AvduJ6NH76BCpHhhuQCtmgXPxoEN3Iv6GE3b1K0wPNG36G7QfzHWgY5FjSOBdt2MBu9/h40mwiQpkbGJ7AXxkd0qZNIOofqJUhAXG4HypCOHbuO4+479lAzhc5zkeQB4DWgB3CwczOmbj4MDpZXJ6WDcfn4fOizVdx1q7Gh8B9tI2BuTzzg5x9QxYzb4Pd/KuHJ2fCOqmGNy9w4kGJC3GxYmxQtA2tYABXK22dCgcbGWAqBtBv4GkIYysgJ6CGjqnWqQQQuRkD8pUjUDxq4GNtG9qu11XT5JQAr2lIDUJTTpTIkge6/+E4yfHi5TAdl8e7j9mA1j/ZEOax4exzgLEJZwOorbCrWWj8/9Dks1Uq/FYHcnc/LN5zgsaRnLNiGNlf8Qz2oHEN2uc9xRrS9qBwGtdNrVpXizGtXZyiy4H2r7wf3RjcZyEMfGYsuOMiblQRkOZEXbTG1xtvX8tZPPThNdTV43yJTlO5/tL2DyUvF4fb57q5XFd7eVm8i9QJG/UBuBH4Csa4s2VTPFF2y46+JLb2VJ9vvu7h5U0fa2LxGbxs8biyJgDm33NdHIwNUK1CDWWWuTA9bTJVLVvqkWDvdvYnIcvhY3Ld0f/He7eCyGZ+BPLtB2yNQEMkbsfG7TyNRj5qrisplWSe7Irk+6ey3TYnKc93NP3tyHFSfqeK4vEiDMVk7AjZCGAMDhpucbdKmtMmyXGSnG5mHL/czvPm+92c9jZ7ePyseOXFwuGwf/dvbBMm4OA9JcShJcda9CuGlccRP1Obm3aRWJyndvN4+Xzj+Q/8AdxNyIwOWnEk0rsc/+4x4onERMmDFe1jx6ktWVqUTSj/Y158lLAMrM7NxJ+NzGRZHcsTxuzYJpTA3EmicHxvYQ0Rlrwdskbhbxq6LJDX8TO8T8kZxvcPOcuxva3FyiXKyocjAbiccwe7PhyymdsMjzYiIk7HatFb3x1r972RlW06EHzmRzfb3KzcZyWL+j5fGLPdlnPvT/SAx29ygq1EIrala2UpyjK1nVwV3JzcrLkM2VK+eYn65CXFPnW1apbGFrSxMcMshAYCq9L1T+oobL3259pO7eehbl/pDi4DwHCaUgbgb2CrXDk7tKuE5OqvXbNN4qPivtV2/l8xnls/ttMeDH9LsnMAVoaNUabu8q8609i8HbVrHUy6GXjeR389z3NPZnc1703JzY022fFnBOxjoHAmRpRv0uRPhXpOV9qWlTjUNtzuPdrcRzeYGcG1z3dxdxgQvleXOkxOKa4Oe9xKke4lh4fGlltVfd4X/AHHRNb7kv93u5sOOPB+33b5//E3BhondGbSTtCBp8UVT51PVxv8AnbdkZr/2os3204g4uFx+FjQOn5DIe3JzgwK8NN0J6AhNa5O1fk3J04K6GwNw+XizxPlSRxQIQDI4OcI36I1fKuFRB1NElsZkOfHDG/KeW/7j/wC3AhGpA1FqpSSBYmPiH+1nzNIaTtgxmpZtgABWzZkkGRPixMr2XQGac+uMTGwb08qdWMm4eRlLfXO1hH/oY4Q/C2laJgKnzWQq4tZHGdJJCsi+Ca0mwghcmObNmDvadM1V9yY7Igfh1rNlpnP+BjlG6ab3QCN0cI2Rp5k0DklMXjIoQ1uNG1jDd7o2j/8ALdQkTIdHikEe2FTqLgfFzv4VcCCGRAAlgPnsCkHrue61OAH4GlrhJE/dI0fTD63L5vdYVUCFtDl3AjcNdh3v+b3WHnTGKbkwxfQ73Jx/QPdf/wDUfSKJgOLZ39TI5fec1r1T0/35D/5tBRyE6gU5Y93utb70gCO3H3HBdP8ASKhlIrHPd08TwsL5eVy4Y5Yfphc/dM5Bo1osF+FNY2x84Mj7p+/jo92P21jfpxtT9ZK4GYfBLCuumIws9TFub7y5XlZnTZOVJI56uJcSbk63rqrQwteCBky5JFc9yp9KlVrSDJ3kZbMdq7inWqghWOOO9ha76SOnQHwoGdU2GgCa+VIZxW9fq/G/+VMJFB5PpGhRKQCHOuHEWHXpTJE77ktsVsflQM6Hu1/6UAdjilyJWY8EbpZnkCOOMF73E9ABSegb7GodpfarHfF+u7ydNE/WHh8YgSp/988KGr/SL1x5OxGlTsx4Pk1iHPZx+FFxvFRwcNxkbUixsYAuKdSUUk9TXE3OrO1VgXFBkyvdk+2jhf8AVZhQfENNZtjJPB4+TNfuijl5WbdZye3itPxOo+FQ2Jlz4vtp6tk5TIEZUBuJjhBt1RfqNCUktmgcVxX6aJrcTHZjRg/7jgjr3Uj+ddNa/wChk2iXjgxNyyvOW9vUJt+aWrRJf1IbZIx42ZIwPRuPjjVyhrQPif4VtWrZlayQnJOJj48jcWYP5BFbMW7mD4rc1pwRk8jBsTIycr+xknZkhHOZEfS5v9Qd4Vi0zatk0Gw4w3AtaXu6hv0j/wAxpqoOw+YbHe8Bb+1Hr/8AUauCJGyNrCxgbG8quz1O/GkykBywhygNSTxXc78dAayaLTImfHjUjckmojZ65CvUnQVhapomAy43tODLQlOnrlJrJ1NZLf8AbjAZC/k89zSJEjga953OIKvK+Fep0qwmzzu3bZFrnkJeWaPALtP2V6h54KTvsEa5bEaoPjSA45QFFiLKeo6g0ANjQmK/QsddaAGZAyZhbIwPa8bXRPHpcCEIcPMWpBsfI/3L7Wm7N7in48h0mBOuRxMsl2iBx+hoCBYz6Svka+d7OD8d/oz6Xq5vyU+qKVHjSTyb5nekn0kn0/IafgK50btk9i8aEaSE3BSSEUjxUr+2kyORqv205o8HyEOHNKIsZ7wWeDS+z2oOjhf4jxrt6uXi4Zw9nHyUm8Mniy498DxJDdqtIIUdFHhXuppo8VqCifcX7dRd344zOMe3F7jhZsiySUZkRi4hkICtQ/S8afCuTsddZNfJ1dfsPE48Hzzm8BzPD5ruO5bGkwcxS12NtRz06h9y8HxBSvEyY7UcM9uuWtlKFDi/aFg1rnWI+sr5pYVhIcpI6fGhD9rElkBJbt/uO/8A0RVJgDwcRkZLkY25vYe5J/8AV9IpyTJKY3b8ETjJKNz9SQPcevmTYUOwtyTgxBG8Nx2ATOG1hb/clcugB/kKmHbYJg0Ptf7aZMskfK90ri4Z9UWAm6aTRPddfa3xGteng6c62OLN2ktKmnvcQAxrQyFAGMCbCAEAHSvXSg8lsDOP6lj9Lrq0myHSkxCEa54Y4WbZTqviaYCHl0J2P9Q87n5UAeeIpAu5FRRo5u3yoYSCyyOYS0u3NIsUsTUAVDvPv3jezsNzJky+blbtxeNaSTcWken0gL86yvkhG+LC7sw9+bymVl5fMczkM/5TOIc6R/rlDUs1sYVBXkZb8me1jxqqGJop/wDdyEa0/TPluuuvpjHSstDaAnjcLN5bKgw+OxX52bkOEeM7J9MRc63pZaw6k9KdauzhE2skpZ9FcDwv/wAZ4LH4eKUT5bVk5DJaNofOddo6Nb9La9vFiVKwjwM2XnaR6V8gO9pCaOIsv41oYSNCYhlw10RKKf4eFICi8vktl5HMZjyyuZG9sX6Zvpj3NaC4uNuprxu1abHs9Wv2DTXBsSzSew0i7IiGgnwJOtcknYgzDmkk2Dj8ffv9Je76F8V1NR/Qt/U7yvI8LwMLp+5s+Nha0vGI0+pxH+kXPzrSuNsmTLe4/vfkzOdg9m4n6eAK39U8AuI8QthXdXrxuZc/C1M8mg5Pk8l+XzWYX5chUulJfIRrp0+Nac1XRFKje5FZ3LcRwbRG+cTZhuYmet9uh6CrrW1ybXpj+pU+T7p5LkQYo3nFxCoMTD6nf+I100xKpxZOxa2ng0P/ALb4HO735HIY0H2ONkV7yie5I0fPSuXvP7EX1Vqz6gZFHOQ5XT7L7n+iMEeA614p6QiUNGpdJIq7RYX8qTKRH5s52bA7YNSyMK4pqCdAlQ2WkVbkC96iJWh3p/thXuTxN70JlpFen4nb7jyfbJGoIc7cfFx0q0xtkLk4XuFwaAXIQ92gTQguNz8q2rYlkVkYMUZD5HB8Z0GjAltOotWiuQ0Qs7JXOs1xWzYwLfEAapW6Zm0CS4ke0q/1gAgWLx5LoBVciWiIyuLfK8ll2hyOIKNC6K461tW5hbHIJLhkuMcYMr22QaE9UA1rRXM3QafhO3bMhvrNxEy7/n0FVyM3U67Ccm1w2D+lhU28TRyDiJ/Thlo2kDy0XzdRyE6jRxlcCAXgKCG/SvmacigafC1voe5D/S0U5FA2YnBvoGxo6lKcig57JBJa3cn5naX8KchBxGNW/uP6N6UhweMbi0F9mapTkmDjdoIETST/AFGgEeEJJ/uH0m4HhRI4OlzQgiC+J86QjvtAnfI5D0b/AAokIPe6PoibYdRTgYhzUG6Qq64LG0CEF5+l3pb0a3UmnAjzt6IP7Y6nqaQCUc0KxvkXuGnnVAPRY75iSm5NZHWH4VLY4CBHG36f7kguHH6amSoFXl+r+47oBZn+dBRx7g1N3rdoGjQUCOOVw3PO1v8ASLfOhAdjjkme2LHBLnFGtAVx+AFDcbhEl54D7b5eXtyeZccPHKH2AhmcPPwrkydlLY6KYfk0jjeM4zhoDicZjtiBHqciucnVztTXC7uz1OqtUgnY9/kvQeFSUK9Mbbi/QHzpkkdkTk2FhqCb2HSqQ0RWTvkGqN1B0vVIbBBGmhXoSbqvWrkQZHE9wV4+AHWpE2dkBAuobYfCgg82f7Y954sXBZXKyM5mRzomoxzX+6LANDmkVarlxPlGhj9l1HksvYXag+3XvcO3mG5GJny72Y8wbFJ7yI3be69UrDPlebWDTHj/ABqBmWfN7W+4z/12TLNwHdTW/pXSO9xuJnQ/+l6rNa8aVtWL49N0Z2TVt9Cifebszs4DM57huRb/APKcqVksvFxvErJLbZC1rAdrj9VdXVz3lVa0ObNhXgg/tx3p3F9uuK5LDxRjMkzXsljZkNM0zHAIXNjjU6dDVdnHXI09R4G6rUhOX7ld33z+NNzWQzIzyf08OdyZ9jDYHFRGWxglrSfE2rRY/wAdNJ/0JtdWsSU8fbzGcx2/y2XmZHIYeRLhQN4xgZjN3M/tTsEZDS1rwjw76gbViuUppb/JrumhmXl24j8XNx8HB47K42KJMjFj/U5gdHEIpfcDfRsefV/cuD1p8OWjbc/7CTjVeAjH7D7y7k4Ud28Dx0efi5sxmjkyJ4/fklB2ueIbNXx60fmx0fGz2Dhay5LyW3uD7RQs4WLl+3+UPI9zcFPFJz/HZJaYCCxshiEbQEI8PzCufH2221ZQrbGt8PlM53x9yO3OOfxfP9o8Vx+Pzk2HJjZTI4Tj5nHyubtDmuYgcNQhHhVYeva2lm4n/cjLlVNUtTNu5O5sr7kZXCHOx4MbloI24U+cHFv6hyoDIthfTwWu7HjWFP4OWz/KTHb/ANtI58tsXJyvjEUnt5LAnuNDfqQXU+Fc+XttLQ2p115Nf7U+2fBcrGcbiMOLFbA878zNV0hLTYJ5615luxedWdix1WxNc7m8L2Hw75+V5B5giWMpb3j0igj/AHnpWdKWy2hIL3VT547r5X/5+0crLysGJmxvLeO4CTcyCHECj/eQt91xuQdfGvcw1/D9sf1Z5+R/k1kh+D7elilx83kMc5M2Q4N4vi23kyZuhI6RtNyeta5Mk6L/AFIx4mtWaNzPKt+1/DzwGZuT9xecb7mbki/6WJwQNb4Jo0VxY6/mtP8Aaje9+C+pl3beDJynJtnmBlYx4kk3lS9yqV+Nehlsq1OXHR2sfRfaP6ng5wXySMmzA332sALxH+VoQapXz+Zqx7NFBqeJjjIjbJj4gebH9VlnxvYG4rlT8GkI9HxbhM9zsh0ykbWY6tZtJUgk1pz8GXEkAyODaBDHj7jdkTQ+QkDqaHYOJTu/e8+3e0eJysnMfC7kWNLsbDdIH5UkmoYGtKtB6k6V04aWvaFsZXaqFcDzmPyfFYWfBKI8fOibPGzHbuftkCo4+WhrayhwJbE0xwid/bYzeSEkf/elJ/cPmahsY+xZZElf77gl/qK9bD0ipGSIax6bj6VVsY/uPt0t6RVJgEuDWOBc0B5uC4+48/BrbCqkUHXSOO0lm3oDL6nH4Ri1UI85sarkvLjYhrzYodNjP41I4HDM4o1jAyPRZPS0dbMb/GqCBD3scP7rnPQKWPRkZT/S2pkYBmc/xWGBHNkxhgB9LXBG2W7Wnr5mqVZE7QVHn/uRxPFnbjO98NVXn/bafgEBrZYpMrWZj/dP305B7pG8U0Mkco/UPcfSNPS1tvxrdYUZ8zH+V7kz+UmfkZs75pnnc97iS4mulUSMnlIiXKe8XPoNz/jxq+Jk7NjLpBZD6T1OtUiZOA3U3K0xHmFNweEJs0AoKQkKBO4bjcfvqShQKr4nU60DEo1pPif2LTGc3A9CgsCPKgR3rrcBR4KfKiAg8Sxvmtk6k+QoGW3t/wC3ncHO7J5IxxuAl8jJBa8jVWsNz8TWF8yr9TopgdtzUu1+1eF7ea4cVE/P5KQFjsotX8HWAFcOTK7b7HXTGq7Fn/4uVGNzckRl9/Zh9byflpXO7LwbSTXHcNLIAMHE9qP8+RkASSEnW2g+dQ7BoWri+1I5ZGSZLJORyF+h94g7obgNCeVSpewmXfA7akij35sjMXH6sYQCRrqf5VosfyQ7In8LExMYhuBimV3Sd4XXzNzW1arwZ2+pKy4rWI/lMlsfURgAlPMD+NdP4/kweSNgeTl4IgY+Nx2tkaBtllCg+JACAVooWiMXdtlX7i774fhmlvJ5/v5ouMdh9x6uPVrbNArpx4L5P6HDm7ePHu9SO7X+4HEd05c+LC1+NnREuiikv77Wi5a4WJHUCqzda2JT4I63epmtGzLgP9tshLm7B6CLEPB/dXLCPQkmcbNdOuNMgyGXLWlGkD8wPXzFKTRahLQHMRo3jqnpaPiaQxtxUlg/uHTYz0sUeLqmzKSA5nh3oBuLe3D08i6s2y0gR7A0o+URxm+1n1lPE1EFjEg9oF0bWxNKkvkNz/E1DKRauxi1uBnq8yO95pLiNo+j8or0+n/Fnn9vdEtkSEkqVQ2N7A13HEMBS3T1aOPw0oA46QkXueh6rQApQu9tnJqbKnjQA1OQ5oey66kGgCr98dmcZ33wT+JzHNhy4j7uBnbQXQTDQgHVp0ePCscuJXrBthyvHaT5gzO3+Q7e5TI4nlcf9Pm4rv7hd6g4dHscbFh1aa+eyY3jcM9+uRXUhuO15AkX+2w+kH03H+p1r+QrIoLYJJIkYxxLlI+qNhPw+spSGX3tj7gTYYijyJ2x8lC0++HtXFy2N03AfRINCR8a9LD2I3PLzYVOhqnC90cbzxczCl2ZbP8AdxJAWyJ4tX6m+Dm16tMitsebajQVyvE8VzsAxOYxGZkAJLWSC7f/AAPHqB+Bp3pW2jQK7rtoZxyv2Z46d0knG8jNDG5THi5LRJCF6Kza4/Na4b9Gr1R2V7jW5DP+zvMxEGKfCyGaNZudCwWsrdt/xrlfRv4Zuu3Ueg+1PMkNbkZGIxuiNc4MHW7WgL+NC6NvkX+VQl4/tdiNIbn8q97BdzcaNrAg8C5U/Ct69BeWZ27nwWXiuC4Ht+3F4TGZRscyX+7OR/43Lt+Vd1MVabI5L5rWD3Pc55eCQ8qoJsVrQyGCrH7B64wqsI0820CElQW+2fQLEG5HW48KBjcobI1vRzlLXtKIdf20SIHkkexu14DmG5tdakCO5blOP4vCfyHJZcWFjMAc6SdwZ+C3J+FS7JDVXYxXur72ZOTLJx3ZETnFw2SchM1EPUxsOn/idXNfLB24us3uZk2RsuY7K5DKlyuSc5X+24yyOP8Aqea8+92z1qUVVoS0ebHihT7OCur/APdyXN+J0NYQWH8OzP7gz48Ht3jn5/JZDtrJ57n/AMRWzQOtXXG7OERZqqlm6dmdmQ9lRvy83IHIdzZbNuVmaRQMJ/2YB0Hi7U16+HCsa+p4/Yz83CJ7IlLiS17r6Ob+4it51OEFbkFsgU3QDxaT/CkADyuXh4OFlclI8wQYkb5pWk3AY0uTzU1NnCKVZaM14TKzeQw4nyxubPll08nuXIdM7dZo11618/kfKx9HSipVImszF43gcb9b3HlxwIFYyRwdM4Jo2PpTribY3adig9wfeL0zcf2zD+maGe3HK9DM7/V4BK6q4PJPJGafpMnm8r3+TzJZHyX3SlxBcfA3t8a2d1XYSo7PUZyub4HttxjcfdnaEMMYD3KNL6BaXG+Qt3x4Slc13ny3LExx7cPHcU2w2eR4F+uldWPAqb6nBk7VrbaFfTa0l2o1I1XzroOTdyesSE0OifxpAbp/214x/W9x8gG/3GRY+O0dAHOc8qdOgryvYPSqPQ6i3PoSTILY2+4/3HX/ALTSl/M+FeUegkCyyFzlHpdo1jVWok0SA5SJSjnF4F3NYUaF8XUiht2K57S2NjWsFi4qxoHiTqflRBEkVkYDCS6QCRoVN3phHTTr81obKRA8jj73oW7yG7YwFDbWUDqPM2pqxaRXcvFa9xaQXzNH0Agp0Qu+lvyrZMGiJmxpXtLQxGqjiDtZu85Dd3yrZMzaI5+A/wD2owciUEERsajQtrNGqeJq1ZENHXcW1gEWdIXyBQ3DgG9w/wDG76W01choFZxUoYjWtjcB/cZjlWnzfKdKvmS6gUmK4ktY0PT1OLPTGD13PN3VorGboBmAPdZvvFtmtaNkXn8aqSXUakhjagmeXlUbCz6R+FXJDqDyQSEgAeyF/wBtt3Ea6U0yWhv9IGNVA1r77na1SsLiCvbE1yNJkeNLVcktCTDI9n95xAPTQJ8aJJgbIaz0xMV3V1MUCXQndvyHBR9A6L8KYQJ3OerYmkJfcRQI57Tbulci/GmEHC4n0Qt01dQIacwAhzvVJqWg0AdLtouUGu0an4mgYkgixOxvhq5aYmJ22BaNhUgvdqlMQ9HjvlPpbuIP1usPlSkaQQIIo3gXml6NsgPwqZkpIc9TgGyXHSNlmj40IoRuD27nBG6NYNKCVqddue3/AOzj8NCaSKQ0QxgIaLLZxUFaZLLT2/2Fy/Nlk87f0eEUJnmCOcD/AENNc989a7bm9MLe5qXCdq8RwDP/AGcAkykR2TMjpCT4Hp8q86+W1zrrRV2JgsW2oHU6/hWcFHDsj6ArarQhiTJaGnYUJPS1utEACPySUTwQA+dMBl0UjiryPDxtQMafAxxvYa3FNCbFMxomgFNdAdLUyZOvYiXAXQnpTENe1GbvPj5CgkpP2/m4LsnvrmeU7ncIsZkT34GS5pcj3yXAF/Ulq7c/LJjSocmNKl22Ubv3umTne9s3m+LzZXYb8hkuBJIrHRNYhADVKIQtdeDEq44aOXLlbvoy3c33D3H3M/Aj5aV0+NnP24RcBh4hmjFyD9RK9ba1y1pWux1O7aI+PBw8Mul5TkG7Wugmdx+F6JMiFspiy8cvCuZPHq1bOq+Ta+1E/wCozPyvE8TmRT8Litwf0onxf1WZI50+VjvfvhmdGy7ZmfSToRQqWa1//sJ2S2KjPk8QJ3zRY7suVznP3S/24gXFbMafHxNdaVtpOVusz5H8TuPIGVHJmxsycBhDpcAEwRSNH5Xe2hT51FsSjTRlLLqbJy2b9uOA7Qi7ffBP25J3nFHmci3jntzzi+0fTG/3Hbgx4Q7Aa82n5rX5b8TttairG0mfcV3zldvdsc32TiObyPCZ8xdiZE4dFJG06uYAfSSQHa2NdlsCvdXaj5MK5HRcVsU6LkuSinnL82fdKWSTP9xyySRfS5xW5Hia6bUq1sYUs6vcf5DNzOZyn5uUsuRMQ2SXagJAQEpalWqqoRVrOxYO2eyeRzc3Gc/FmmxQ8OlELSdL6m16582dKrRtiwuZPqHD7Z4jCyIeWzm/p37RI3CXc55A0cf4V4LyN6HoRBA9y/dXgu3ff4rtnB/Vc/OHOdgwu9zYWguLpHhdoAvtbXRj61r620RlbKlojDM3n+TfzmD3T3pEOYxs5ZOKkw5yI4HRORzGsQixKFjm3r1FRcONHEHG7NP7gaLhcjmOYZuwRk8xPIXYnHY8bYQ5jiokygz0xgL01q3fio8DVJcsuPJ8vxP2wgmkOQzmPuXkt2nIYjsXj2Imxg0sOlc1MbzaRFP+5V78P6mOT5GfzedJk5kjsjNyXl8sjyrnOPia9RJUUJHDLuzc/tL2RiZBdNnkl0bRKzFY0l0g+XhXidzP4R6uDHBueLhY+PjMbiY8eKYAfaknO6YLrYa15LsdsD2Vy2NhYz8vksgNhAtkZb2wQWGqdaKzZ6IHpuZ13L9/u1OJacXjnP5rIjUBmKPZxf8A+oUJ+Vd+PpZLfRHLbPVGP9y/fPvfnfcgwp2cPx7wnsYYSQt/1SlXGvTx9Klfqzkv2G9jN58x80jpsh7pZnlXPeS5zifEla7lVLY5rXk+jPsvy/udmY+JkPC408zGtc5EY5+5iNCEopryuwoud2JzU1IZDWoZPoGrpPS3yRovXIzYOhyvdLHfgXehp+DRc0pAkY9zihejHKUHoH4C9Eik5PzXHcS0uzciPHiAN5JGwtPxJO41anwpK0Iqb7ndiwAxz89j2UmLHUr/AOa5rVY7/BPJDLfud2mYmjjpzlSuciQAACy3c65+VHC3kpORt/fT8lz48RjGNHp3SkHz0Bv+NTxEyscn3XnTl7P7jt9kNmt+AGlWqwG5U8/l8XFjfk58vthgsAUcUvoUraqb2E0luZB3T3l/y2Q6PDa6PEYSl03eZrtpia3OK+VPYqMk5eV3Fy3863g53ZiQSn+dkpi3Em58engLUCPKEXU0ALDilwjf30DR1LBOv7FpMcHXFwT93lUgespAK0DPW6BSmppjFRMdLK2KNjpZHFBHG0ucfIAUmNJvYufEfbLm84xzcsRxWC+/rG7II8BGLg/Gue2dLY6a9dvc07gOx+I4YfqOKwGunbYclyJD3HxLWaBK4r5nY6q461LTi4ByZGtHucvM0G6bcdp8FKAp0rB2+DWPksmL2znyBpzHtxIEtjQN2u2+FlJqGwlMtPEdlsiR0GMGNB/3Z7EgdQ0fxo4tkuxa8fhOLxQPeLsl4AWNFai9GN/jVqqRMtk/i4mbOwNxMcY0IF5XAAgfE2FdCpZ7IydlXceZBxsQ35Mpy8hpKgXCjS5t+FarCluY2zfA1lc4YIpD7jcDGGrgQCQf9Tv4VulOlTlveNzN+Y+6Xb3GmSLj3O5PLj+sRemNToHPdr5pXXi6V7b6I8zN7PFj0WrM2577gdzc0x8H6tvHYTzePHIALBct3A7lNeri6dKbng5/Y5Mmi2KxHDIj3zTPV7txcHkuctw1T+6u1VjY815Jeo+3KkwHDKglOFNG8GKWNQQWlQWnRtJ1TUPVDre1bJrc3Lsj7hY/cWO3j+RmbDz8YAexzgG5LB+Zifn8RXz/AGus8blbH2HS7qzKLfyLwJSYw573CZp9D2/U0gf4UVwHqpk1i5bs1m1zfcyWqrV2xnzFSzWrTHpXtXZLJ7kmrYIhaw0KfxqWaIHme90ZjJ/TxgAiNoHufs61DKRGyK2YOhZuJGr/AFvI8hpWbNRhzmPJDiXSeAR7wPJPS2oHBYezc6OPLysXQzNDwAS4kxaqdFQ16HTtuji7ddJLPkI5yIrPHpXpnmgzhsTafMrQAraJFdovXoo8aAEkgBwe0EeJ/ZQA04pcEbdXa/jQBwtB9Jvb0p1WgCud29ncV3fhDGzx7XIYy/os9oBkhcRon5mnq01hlxVutdzbDltjcoxvku0M7tnKMfKRh8ptHmPd/Ye1dWPOh/0oteHmwWxv6Hq0zrItAKdkcILnPfM06ln9piHoXG5rkg2kruY6eQO9otjhYF2wjYEXrI7+FMsNwe7crGw4uPy0mx4AG4mRHvE2M1pX0yAtJF66a5mjnvgT1RbuN+7fcfEs38tjs53ho37GZuO4RZQalla5NyD+oCvQx9o4LYF/QufD/d3snm0hj5RuFlP0xeQBx5AfJzvSfxrsrlqzneK1S2xZbMmMvhkZPCQP9sh9vEFpNackzJpoU+YIAXDadAbHSmIafK1Njz6v40ANvcLbSCCNfOgBova0hSqhLWKpSAQHgq5rdyDW6ik2BF8jzPG8W33s/NhxGoodNK1lh8TUu44b2KLzX3y+3/ECSMZx5HIA9UODGZGucP8AWUaDUvIa1w2ZmnO/9wvcXJsMHbPGx8dGSQMqf+/OGnRNGg+dYXy/J1U6smdZQ7g7lyzyPO5M2VIq+9kPIavkCgH/AJRXFfsLZHoY+vG4ou47Di9n3DlPJV0UCtYT5u1Nc82tudfFVEbuSma4RMZg4YHqIRpTxJpriiS6dh/bLle5Hx5sUTo+MX+5yuWC2Ilf/SabvPwt5100w2vvscWbsKn9T6H4Lg+J7VwP+P42JHyD/wBxku9Us5S9+g/0ivQpjrRQeRkyvI9R2TIG9zDcJ6QfqBH760bMUMK9oLgoaDuH+OlIQy9ch21iCWSwaQgd/I0ikipd/YIyeLhwOU5SHiuKErX8i1x9zKljiO5sMbB/UdSa5cuTwd/WwuZZmfM/dF+A2Tj+0IP0EYGz/kZwJMl40VoNm1zVxLdnpT8mffp+Z5ec5/JZD3ySuIdNM5xdewcF0rV3rXYmuO1gfN5rtztY+25zc3LCl0bEfcjr/GoSvkKdqY/qUflu9ub5IvjjkGLjH6Y4gGkDwUV10wJHHk7VraLRFcLXbi97vUStzc1v/Q422daqq2y2aOpoYzpAFnEALpSQHPcAPoFvDoacCbPoL/t5jdH21zOQ4/2snNYzRD/aj6noBurxfYP7kvoep0/4s2OORbwjc1pQTH0sF9Nx/hXmHoIJbGUc96S7SrnPBbF521cfjRASKd7Th7pPu/0vd6I9LADwFJgDTOdKfbcTIWgKgJBHRBr+NSMBmEKEyAukaUCEKF8SfS39tItERlYn6ppjHrGgY0lsd/6pDd3ytTTGR03CtCQNaJnMKNhjarGk9do1+LjVyLkN5HGY/uBmQHzTtA2YkJDnqB+d9msHwppszkh8rGc6IhjGx44I3QwHawEa+5Mbu/8ALVpiIl+PH7Ensx/2gNzXn+zjArcku9Tq0TJAHLO9rA0ZCXav9rFYPADrpWkCBciGCR4Mx/VTNKBkQSBqXsBVJsUAM0MjyjnI0+kxRhUGvqIsK0ViGgabDghYpdsd1Q7j5erxq1Yl1BAChbixgodpkdewKJ8av+pGozkYkjl/UklqhW9PJUqk/gloY2MdaCNUtvdanJLGZcbaz3MlxTUsJTXolVIoBiXyFIGo0qA4/wAAKpEQcGKQC+ZHEH6fjT5BB5zif7eOwFuhOoppksaMDNx3uL5eoGgTpTTCBt6ghoO1Amxn1H50xDO1zLvSMJ9KqSKYhLiB6m2aB9TtaCZFRQvlIMLd5N97rCiR7hjcaGM/3nGaYaMAUVLZokOPO4esho6RM1+dIIGyPa0OxnlckVQjzQrNfbal11I0WkUcAYwJG3a0fndonlQImu3u0ec7nkH/ABuM5uMCj86cFsLU8PH4Csr5a13epdcbsat2/wDbrhOCTLyf/wAYco3WeUJEw6qxht8zXn5Oxa2myOumKtdfJZHMc/1EWCgNUIlYGx0sb+a4sNLimTILPIhRqJ1tQAFJJuXZc6FF1qkAwYZD4+rXp8APKmB5rfbsR8P+tAhS7gFQOuVH7qAk5tCEOKN1A+OtNCk65zQ1QEAHU3vTEByzlUabG27wFNCGy9oQPO4OuEv+6mJlb767ah7j7ddy3bkwzooAJN7fqcxmrXt1Y8dQdelb9fLwtFjlzU5KUZFxXBZXIZIhLHAGwQXVLV6t8iqjzq4m9wzLzcvAwn8JyYlfDDkuyIICdrY5doaXtd9Q3ABQLGorVNyjV2a0ZFzctkvDmwpjteVIhsq6qdTWvFGXOQNzpHep5Un6jqaohthOJx+VlvAx4nPJUo0LUO6ruyq0bLXxP255rlNGe0ocW2VXNCp5LXNfs0qzor12yr5UE8T3Y+RE9mRE/a5jgQ4Oaeq1vVqJM7Jh/FcFyvNZYxMWB75HLta1pKnwqL5a03ZdaWsaZxf/AG/91Z+FFJlOi4p3ubcmTJ9ZEbgoIaDY1wX9jSr+ToXVcGpcP9q+yuE444+TG/kZbb5ZUZE141QC9eZftZLuTsrirUa5P7h9k9lj9Fxr4mzsGyPCxEllc51kXRvzNVj62TJq5C2aq0Mk7u+4/cXJckMDkmzdv8Pmgl8sBE+S5jlALnL0OrWpXq4etWqlas4smZzGxXciDEaeN5DtbI/RcthtkZyPKMfJFjSHRsg9z1Ne4EhzQoNb1b2stPBFq+UWLtrtHl+UjHJzZBweJhDjP3HyADI2Nd9X6aN3X/VWGTLVaLf4NFX5Ec59xOI7awZ+A+3bHN95W53cUw3ZWSdCWk3AqsfXtZ8sn+iJvlVdEZb/AHsuYve4vleVc4lXOJ1JWvQ0SOLVs07sHsHNy2nOlgOxoVr5CGMcfBpPWvL7PZWyPQwYI1ZpcXfHbvYMLmZXLROzCL4WCBNM09QXiwHzrgXXvl2X+51PLWnkofP/AH75ifdF21iN4+MEhuXMRPkFbr/S2u6nr6f3anJftvwZjy/cfOc/McjmOQmzZCSVmeXAL4DQV6FMNaLRHLbLZ7sjC5xKRBR5Ba1MpY9HiSPu6zTdB0pNopVbDsfj0RGqTYf51m7mlaGu9iGTjMWIRja1x9ewAuX46CvPzOWd9VCNc4+d00YLW7nlCSu4n4uPh5Vws1kn8U+3G/IlcIo42l8zzZrWAXJcfAUa7Ikzvuj7gctzTZYOyXOwuEx/TmdxSt9TzoRA03PlXXTFWv8AL/YzbcaFZ4rg+HyJhlcljZ/O5y7vd5GUhjyRqGBdPCrvla20RdcU6st+Fx+JIYo4+JwYQ0oGew0ekXIvrauZ5H8s0ioflcP27kMljzOPigchMeXjeiZsn/hbYj406211ZndNL7SpZHHT8JmHGinObx84EkWTG4H0u0a4dCo0Nb2S3Q8WTlo1qeOTnvftYm0Wa5rUUeZ+FSlI7KGZp9w+6onuPD4xjmymADIyxct/0A6fGu3BRpScXYutjOC49blfiDXYcUnty3IoHJ0kgAFU8QlqBHEBB6DwoKQoAAhFBKlKBjlg31FNE/mKkBJtcj6UvQULginypRFiRPmld6WMiaXuP4Um43Gqt7Ft4r7Zd48mBI7DHH4l/wD3GafbaE1trWNs9K+TauGz3L1w/wBmuLAAzsmfmJyitxR7GM09VebmuW3afjQ6a9eq3L1xva/DcDCIMIwYb2oGw4cYlyXf+KRymuS2W1joVUtkWXA7ezZkGJitx2qN2Tleue/XaND8azbYckTOH2nxrZW/qJZeUzGG8QQs3Hy+kUpHLLdg8H7LQ2RkXH4/VrLyfNx0pqvyZt/BMYMGND6cDF92QlH5D1Hku43PyrRfRCf1JaLjZSRJnTNhiJRu7+21fIamt6429zK2RLYJZkcdiNMeFjiecBd7wjR8ANa3Va1Oe2VsjOd7rwuOgYeZzmY7HArEu0p4NYK6K4730SOLJ2KY9bMzLlvuu6Lezt7E9zaQG5WQUaiW2s8fjXpY/X/+TPFz+4X9i/1M65rnuV59xn5XNlkDijYSSGM/0gC169OmGlNkeFl7WTI5bkiZAGgY4KOJX0jYWtI1C2WtTn+oTj48EJdNI1jGBty/1PuUuLqtWZtsZncZHo0lzHm4Kj5p5Cga0EuZjSSPAd7YADQHgkOtckdb0oK5ODsLsjElZmY7yHwEPx3tIDw9bOBFTakqHsXTI6uVubf2H38zuaAcPybo4O4I7MkJQZLW3Jb4OH5hXz3a6ro5Wx9f0e/XKuNv5GhxOZ7m1jy6Nv07bEE38q4D1/qGjMLD7LyIgwL6AGh7epLvHyrO2h0UfLc43IjC+2rt35vpYfMuNzWUm0DbjJI0hyMjVDrHHb/8J1IegNM2NrS1uguWgbWW19Iv+NS1A5G2cnJxuRByDNcZwfsb9Jj/ADtAFrtWrxZONiclOVWaSZIMmGPKxXB0MrQ5jvFrgor3U5PEagDe5wIX6VPTSmIUPT6onXsg+VAHWu3g2TafUB0NADaoqOBBuD1XwNACC/0kWa/ROinzoAQ4ucS4n0hAQegoAHzMTGzIX4mZCzIxpbmGVoe1Rpr+8VFkrKGNNpyZz3H9tJFOV29IJUVcLJKvaTf+24naR/4q8zL0/NTvx9nxYyHmsTLwMkwcjBNFltJBhmG1LagusnwrzLY7Vep6FLJ7EGZ4z9B3Sf0Rj3CE67tKk2DcCHJc8tYxsbn2c4/3JEVfhSkhpPclcntjheTjEOS5xyCdwdEkkhJ19ICAD41pXLZGTx/AFF9uO4+Ka7L4fmnYLSSY1lfjvAGihpLVror2Y3MrY5GY+X+8/HufHhcnm5cLdXOMWQ0ny3gGtq9qvyZPr/Q4fub95MRzYsiIvdcbXYjHu067TWq7Nfkj/F+gV/8AvI+7YYyTIbFC1yJIcINt/qU1X+RX5I/x18Aru/vuvnqcfPALfTvhx2xi2nqdUvtV8stdb6Fc5LlPuly7jju5nLmk3EPEM6Rn5sRKzfaovJtTqv4IX/4PlTyOk53lzLkk3x4t2TP8CSSBWNu78I3r1YJI9ncTgD3J2NhaAoOQ73ZTboxqAfhXK+ze2x0rFXwJYcbcY+HwTK8f+vO1GNI6hotWbbe7NeKQNlYaybuXywCULcdl79EaKuv0QOIksvb/ANtO7ef2niuI/QYVl5LkP7QQ9WsPqd+FdePBe25x5OzSq3NY7a+zva3AvZmc5Kef5WP1RuyBtxWO1GyHQodN616FMFanl5e3a2i0LvkSyuIG5YS0BsZsxo8ABYV0aeDhlt6g4nYGolhq03I8waQDYBkJc1rpGFQP6gf8eNAQB8zzPFcDjmbm82OH0emIEe68eBaKytlS2OnHgtbcx3uz71Zu5+F2tC3BiPp/Ukbp3jyX6RWEux3UxVoZ3Nk8zzM0mbkvklc515HusLa/srJtI6VL2Ijle4O3OHLhkyHJ5AAKyO5DvjcCitbW/oN3pTd6lD5ju7lOULo4nHFxbgRtcS4jzdXVTCkcWTsWtotCAcqlx9Tjr41ucrYkFzvpWgJOnaLkqSel6B6HTIbIES4GtKAbGi4hyOuD8/xqiJEqCTe5FqAPp/7F8e1n29gmlAAyc3JmHuXY5rXBn0jXSvB7rnIex1dMaNTgY0MMpYZnfSJpiGsHk1vX5CuI6h6Vjy8AkukCelFA/wDLp+NQy0DzZDG+uT0gfnUE21v+UeTahloB97IytpxWFsB0lcDHET4hurvnS1KSSFw8a/IcQSchB/c3ABjb6ofS0/GiGS7pDjsOBz2tDnZczTt/TYpsPJ8pCAeTaqCecjc+G5zHxSObEGr7mHieljfH3JTp50hJyRE8DBAX47GMwgEdI4lmO0jxJ9UhpoCFlhc8GYN/UEC2RkD24APBkdVIQQWfFFkBzWE50ygkFu2Bvle1aVYQRUmEZ5HBDJGw+mOIpHfoT1rRWgIGZYosIBuS5rC1qGGOwACWtc61erIkFDTkn2sWL249AQgU1WwgWbjoMdzpciX336bQbKOnx860VpJaGXxSzWiaY2omiW6f9aacCgAyIIoCJJHB7whKaj5da0qyHVAsu55EcDdg+ono1datEsGfisaC+ckg3IJUqtVJEDJfvdsgj2hUFtfGnAhBAY1wnRz/AKi1mtMkZfMU2EbR0jZ9SedUIaJLWIXNhj+oj8xqkKQYyAL7IAbqXO61REjTGyTvHsj3HE/UdBTEFsxIo3bsh3uyC4Y24HlUyPiEOe4tDT/badGN+qpKg4G+2F/22XuLn8aY4EEEhGBFvudqaAk4Q1qhnrd1eenwpiYXxnD8pz2SMbi8Z+ZkD63NCRsC/mdoEqb3rRalKjexq3bn2pwMLZmdxyDkMrX9G22OxPEauT8K87J2W9K7HVXCluX8ObGxsOOxscLBtaxgAaALIAK5DfQae0uKrpp4UANFgbdL9BTCQaZ/qJuNETRT0HlVCInIklLthI26ECqQxcJYdSdx8OlTqIIe6MNLRcgIDolUSAyv2kjUaqdaYzzXtA6N6KL/ALqBDTpwVa3T4XtpTQA0riQCu5bWpgI9qSQKLAdT1pikV+nAXUk6dFpyQjJG9wDB5HHl7SyZo8rLAE2M0HYrrFjhcOHxFel+JP8AmcH5I/iWfB7x4/Ad+n7q4Q40ryWM5DjGgAubq723Wch/pNYPA3rRmiv4aAu7OK7f7uZFyHA83jO5CEbZsPI/9tK8agj3LE/OqwXtjcNMzy1rfZkLwX2q7i5qVsbWxwxG5lfI3afhtJWtsnbpVGdes2aNi/YvD44Quy5Zsub6nxsYA23gQtedb2FntodVeul9S/dudhcTDPCzFwnYOQxpcHyxlzCEstkrivmtbdnRWiXgskvAQRNLhG3Hn/M4Nc1ob4gEgVlykuFJT83snsWLlRy/PZkL53jdI2aeKNqiypuJNdKz5WoRnwrMhA+5X2/7ee2Di340mQzSLjcc5DySEs4D+NZrrZr7lu9UVHJ+9/Kczn5OB2hwz8nkmse97M1yOPtfUWxturfBa7K9BVSd3oc/+RLipnHd/dHd0nLYWLzHLiXjM72pz+gcY4DHv2ytRt9zCCCtehhwY1V8Vr9TlvktyIjm+I4rKyZpeChlxYoJngZOQ/ZjSxL6Hs3esOI11rbHdpQybUT1RaMDtnuHu98WSMU5kOO1u7PzG/pcFgjbt3HQvIA+dczyVp/+tTaOW4Tl53YfZyvyJB3X3C0q2KMCPjoHjQBos6lWuTL/APihcq1KP3T313B3ZIG8jkJiMtBgwgsx4x0AYD++uvFgrTZanPfK2Vtse56ueAEUk1vJitSY4zl+N4gtnixBmZLfU33/APaUHq0XIrC+N30mEbVyVp/Uf5nv3ufnGezmZro8Rv04uP8A2YwNERqUsfWpTZSVbPZld3LdRuNk18zXQYcpOshllJQI09dNKchDYbFxxcWmS66glKzdi1jDo8ONgSyAKh6p0SodjZVQXBjOLgGNLydAlvwFQ7FqpZ+E7Uz8yVrns2sB0kso8hWF8iRtXGazwfbMeNEwEFyag2RP9Iritkk32LpjNxcSEzZEgjgjCveen7hWO7E2Zp3P3DP3lzUPB4UssPb7CPdYpYJUNtydDXfSiop8mTtLLLiYnG5DIWRsbDi4oEEeLZrWlhu4tGpd41yWmdTqo9NDNPud9xs7g888B2w39IAwOm5It/uvLujFsAPGu7r9ZWXKxwZ88bGd8H3P3RmctjwN5Kd+TNK1rXF7ijnFN3kB1rryYqKuxz4812z6M4rkuRz/AHMeB5lgxUifyDka2Z7QjyCRcLXj3qlqetXXQDk9iflGYTJdwbGXTlvqjaxp1UeFUpVRNqZMs72+4e4ZXEcA8+2T7cuYLEhtiGpoD4134cGk2OLNnlwjLiC9xLiXONydTXacD13OohCW8qAg8GeaE+VMriL2J1RfHz60pKg4Awua0XcbAC5PkEoBKSz8F9vO8+4Gh/GcLkOxnfTk5Df08RH/AIpE08qxtmpXdm1MNrGhcL9gc6RzZO4uRaxjT68Xjx7pTw956NHyFclu4vB0V6vyW6D7SdgcQxpzYmvkHqcciV00hSwVoQX+Fc77N7GyxUWyJqCTt/io/a4jCgxmsCe4WNaQB4NbesW7Pdmui8CW5T82RceGTMeoLS8bIB5poamIH4JKDjMmcLyWZ7MIu3Hg9H7dTScAmT3Eca+EJxeBsXXImG0Hr/4jUh/UscPFOAB5LJMrrH2Gelqnptbc/OmS2idwMSd6x4OPtaPrIalq0rV+CHZLcmW8PiY7fe5TI9yRA5sDCHn/APRFdNcPlmFs3/iOOzJWejjYhjRD6pXo6X4+ArdV+Ec1sje7KhznfnA8VI+PkM12RltG0QQLK5fPoPxrrx9XJk8Qedm72PFu5ZQOZ+6vO5i4/ExxcdikbWPUmYhLncdK9XF0qV33PCze1vaVXQpk2Vk8lMJ82V8r0V0krt5AOpvXo1olseLfI7OXuNew/YJdpdGvpUoSfG1UQNvaGhpaS1ziD7bgoJPkb/hRAkxQdJE9qkFu5FNyT0HwpQNWTGnzhS1rBK97lkfq4uH5QOgpjjUb955c6E/2wTvcA0nSwATSgcDxlhDfdke9jwHC7AQG+A86pslIGyMlrnRRM3OB+hihuxmoJsoNRJqkhbJJoZYnML452bXwlnpcz/UHDqtJpNQ9grZ1c13N0+3/AHpHzcLOO5iWNnOoWxuDg1uQBZQF+sdRXgdrqcHNdj6zoewWX7baWLzE4NhOPIr3NKtLwhBHU+Vebue1MOQmOV0e4u9cgH+67Vy/0g2FZ2rB0UvO4olwc4SAkgLYq75mszWBl7kYXORseu51vx8f21DKQK57JA5zTdtlIU//AE+FZv5LXwS3Z/cEWPkntnMkCOWTjZnGxBKuhJ0UdBXrdXOrKGeZ2cLWqLnM0Lex6HolegcIwwOaSRZL+VADu+6xkB50PjQA05NzmgITdB40AI2bx6T6j+X46GkAgOc0FpGpUrr+NDAQdvt7b7Oh6qvSkIaYSQNxU6X6+R8DSBAPKcdxHPQHB5nDizsV6qyZochb4HUHzBqbUVty63tXYoXK/Zrhcje7gcyTj36sxZT7uPfooRw/E1xX6VbbHZXt2W5VZ/tj3TxTHOyov1uOz6Y+PdYp/UCjq4L9S9djqr2qMbZFyOH6Tif8TELbpWFshH4IDXNbHZbo3VqvbUeikxnv9Akz5ST/AHHXC9Lm1YvQ0j/QfyZ3BGzzCJ/5cPGG+Qr0UUp+o4A3l+MN8bI8EPFnz/3MgnyYFNSUNDBfltORJE6VvTJzzsZr0iFKRyIdxEeQ24fnACx/2MNoXVOtKGaciM5B3H48boXTe84ekYmANkZd5uFz+NNBDIxvGc5mN9vjsJuBE+x9tpfI5epci1oqWfgHaq3DMP7X83lubM7BlnlJA97KcIo16qpJ/ZXTTrZLeIOe/bx1LXifZ2aXaeU5duNA1VxeOYNx+Mj/AODa7cfRX9xw37+mhauE7N7T7ZeJuL42L9W0Xy8oDIyC7Rd71T5V3Vw1qcN+ze27Jt+Q6dSrjK1ECob9B5Vscz1BnOL0a4p0aoQW6GgUiGNkMgjAc5xsGgKPwqRwRPcfOdv9qYz8zn86OB4HpxYnB07iP9IrK2RLY6qdd2Mh7k+9vJ8pE/B7WxP+JxDZ+bIS+d/kPjWNrN7s7q4aVMze/J5F0s0uS9xmcsss8hkcT8XEoKi1oN1L0RE8tz3B8NLvkcM3K27RAwhAU1JFFeV9hWdK7lL5bvPmOTDo2yDExSNvsQq1QPEjWt64Ujlvns9tiubzdTc3U3Nbo5WzlyEGnn49aYCtrQTuKhopDOOeQoFh4DofOiCWxr3GtafO4KU4JkSXkFPy+NOBSKUG+qnTqtASJLtoJtZT8qQ9z68+2GM3j/t/27jl20nF999txBlcX6WA11NfPdlzkZ7WFRRFvjzRK8iLdIYwN0rztjC/6/5VzHQjj8pzmexAfcB+oglsQHmdT86zZokOYmNLkPDXMdIUVrQ0IE8AdP8AxOpQU7QGhsYe1jw7MyCUGPCfQ3yfIPDwbTSMpkdkxTIfbzJfQPpwcWzQf9Sf/nUMJEP9tjHQQjawBHQxEMY3zkk/eBSAj5ZGSN2xxNnDFuVjw2eaavTxNIaIXJkjmmLoA7ksxqhhTbjRJ0A+kJQVBH5OHJkSNGQ8504/9GE7IIz0U9acwOSMzYMOBropniaRvqGNCBsanS2nzqkIAfHnZjHfpoxg4xAV35k11S3yq5SAhMnC4/Ff7k6yzi9/U4k2X4eFapsUAbocrJc1sJdDAbyuFnFOhPSqTRI012Hht9SSSD6mqrg02v0vThsQ1LDmZ4IjSKIH8qj0/HrVJpAA5GNj4zDLku/uHQJcg62FWrN7ENALDJlGSPDicGNCl7ha/WtdtyIGjhxNcWyu96Yi7W/SLeNPkDQiWJsTW+oMf/8AYxhXp8dEpyQ0BS4zi0l7hAwaNVXm9WrEtEW6dkZc3HG551kfWyUmLYNvlmejQZZf2CrhIkIZiNa4HKdvebtiZcBal2+BqoUVjajniOMW9ttiU8UqS4PAkNs32WnqbuJoASHfUIgjer3eNApOHYtjvd1cSdo/lTCRWPjZObkDCw4n5eZKUZDC0uIPmlDaS1BJs07tv7PZEoZmd0ze2w3bx0J9RH+tw0+Arz8nbW1Tqpg/8jTsTjcDicduHx2OzFgbb242hoPS5Fz864bWdnLOlJIWWEqht+78acAzxjAQu06DzpknnhGoAn8+tNiAZGuQpYjQDzpDGHw2JJ6JpamEkTk4sm5fwPwqwAzII3AFd1MBRyXOAaDtvbxtQAw6QkhoG4+KXpoQ9H7jm7gLEWstIGLbivkRABTTIbH2YYGoUNveiSOQ8MZqlRt3dD4eNOSWxmVrI0dqB+K0BJhbOKk4TLnAkyeB5EnY1uRG50QYdW+6ASPilew7cl8o4VSHoEsgz38k3l+YiHLRQgfo/wBDMx8TU6OYfUAfgDWba4xXQaWsvUjI+QZldyTcv3FgkYEbXLhCJzWybQQyNbfNxNausVVVuZpt2lkA/lJBO+bFJwgvoige5rW30Cla2WNRrqzN5GnoaDw80sPARczk9x5YMuNkSvjgytr4p4fTFEWOJc4v18Erhuk7Qqo6k3xmRvtzubl+QxGZHM9352I52U2EY8c7i90LW7nvQlB4AmqyYlVwqpk0vZrcg8LnZM7PyJuc5TMyeMxnEx475pDJKC4hrVBtbU1pbElVcUpFW7dtWRnK8c7/AJXJZxZmzOL3b8XIe128xuuA5dHDQ1tRrj4kysrctCU4T9dxuPm40ox4Y8wRFz5X7ZmuhdvaWFhJF9R1rHIlbXU0xyif4vtnned5zI53isfNnzshxfI7CjOPC0yBHf3JUQHyrK2WqpxcQXw1kmj2Fg8A1ju5OZ47g2NV4iD/ANdm3uQNQCfhWX53b+KbGkgKfvjsLt927t7iJOb5Vi7eT5d26MOHVsQq1hy2/k4X0E8tVsU/uP7h92d0LHyecRhaNwscCCBoHQMYi11Y+tSmqOe2Vsqu9OvyFdEGTZ7efy/zKdaIEJcbqDbotMUwebvkPpaUGlEj1YTHhSOCuKNTpUuxVaMNiwGBoBaB8bX+JrN2NlRBjIWjQeSiwt0Ws5NEiTw+Iy8p49uIhtlsg/GodkjRVbLNxvZbpEfkOVp6NsPxNYWym6xF14ztTGx4w3YGOOiBCfiTe1c1sjNlVFpwOPgx0DXKRozqg0PiaxdmxssmPhuMJkADI4/VK86AfHoaEpM3oV/lJv8AlZ/0zCWYca7I1Ulwtuca3rWCGyovixsbNE2GA6TH3Nk/NvuocBbStU2Fq6HZeYGPLJBi+mV93BwDiHOF0TpWVqtmuNpIi83tdvcAY7OyGSQx3DXsDtpJ0a7VDWlc7oK2FW3F4XDdt9qZYHssZ7rS1krkaoAKlTpV8rXUnPaqpsDnu7Lx2focOZmTG5XP2+iKJLD1aFqeFN4kwpZ13KVzvfEuPBk8Tws535RIzuRYULwdWM8G10Y8Os2MsmWNEUEuc0r1VCa6zjOORvmdLUBAje4+kK5fCnApC8TDdM4e7L7LCbuQuP4CobLrWS58Vxv29x9j+XPIZ7xdzA9sMZPgjVNc175PEHVXHXyaFw/fXZvb+09s9q4uHI2wysoe7LayguWuS1L2/kzqq6rYLm+7PI50hc5rsqQfQB6Y2lP6Rao/AaK6Es7s7m5M+2+V0cR/9GEIf2UuFagpbJTA4bk8sCSd3stdd75Crk86zdl4KJ3D4XAaUDHZeRooBenT4AVnyYNFswODz5wA5MSEBAxt3ofPQUtxNomsLiOPxD/ZjOTMnq2nc5evqdagWpZ+O4TmOQAcGtw8Yhd7vPzP8K2rhtYzeStSah4jiOMIc9js7Ib/ALhB2tX/AMWprqrhrXc57Z29heZzDIYnOdJFg4jR/tOPttIPitzW9ay4SOW+RJTZmfcz9zuFxWHH4xreQlYqoQ2FrtLk3Nd+Po2u9dDyM3tKU0rqzM+Y735/my8TZbosIOd7cOP/AG2L0BIuRXqYurSh4PY72XI/oV0D3AITI55J/uFxUFw8660jzm2dfEwFJWr1dIAEHl8qaJPFzWgh7VY0hu5jrOBpyPidk9xzmkLtsTtOnTb/ANakaYhXr9fqAVp/pH7UpiHHZO0NjChwO0PsgHjfqaGFUDte7eHbiVUBegTX00DgU31He9zmxtADkU3TxN6ChiXIeHf2mqHBS5v1KdQVoZVTjWbZG/nc5C54I1PUUEs5JIQ8slAkOsjgSpHy1SgUQNsc7Gla+MPilaQ9srLFqXBb86iyTUeDStmnKepvX2/+4uP3C5nEcu/2ebawNZkSWjyUHRNHpqOteD2uq6Oa7H1nR7yypVtui9hrmK0EFtzIfhoh6V5a1PZn4H2TmNN/9touHu0Pl8aztWDqrdNQNTSO2iV21sem+Q7Vvpf1H5VizZIAlflNjIjjG0qgIIYOthqfnWTktNEJyWHNktYGySPzYz7mO6GwilbcG1gKVLOjkMiVqwXzsvvlvOA8HzTmwdxYo2yMJBE6D6mn+pOle7gzq+h4uXC6lrlJjfuAVmmvqHyNdcnOcZMD6XKn5bpp4USAp7NwVxufD8RTAb9TtrHEDVCOo/gaTA5IoRjrEfm6L0WpEMPL2mx1/Z40CPODW6XafqXp50xjbnBdSBqXDVPCkAprXqFUNvc/4/ZTA8XXEbnenp/1oGJkf7jDG8NlZ1ZIA4L8DSiQTaAMniOFzI3NyMGFzeqNDbaflSsniq90aLLZeSPd2h221j2wYX6YyXe6GRzHEeTlJFZPq434Nl2rryDx9odt4RL8aCRsjx6pHyF8nycVqP8ADxjfbuMv7U4JrvflZLkOapHvSlyH4aVP+HjD/Lucl7c4HJJORjvmjCH23SuDW+HpBFqtdXGvBP8Al3HMXheC43143GY0TtF2hx/autaLBReCH2cj8kkchgtGGxuIsQAAvyrVVSMndvdjD5HjcQbqNDYmqMxsF0mv1D6h1C+A60gG3gXAIOqDxPhfrQPRCBA8u2MB9w3Ruq+C1I0R3N9xdvdtRPfzefG3IbrixuDpCugPhWNsqR1Y+u7MyTuf7z87yh/47tfG/wCJwZAQ/JkAdO4eSfTXM7t7noUwVqZPmZDH8hJmchI7LzLl+TkFQHalFtS3Who7JEByvdvG4BePc/V5JX0xWY3yFXWjZnbIqlK5XujkuRBYHCDHIT22W/bW9caRzXzN7EEXf1ep/j1NanPJ4tJ8m3F6YoFehtiddE8qBzAgzOK7UQa9bUQKRsuATx8Db8KcEyNbkNrFOv7acEHlHqI06mnAHGlPMDx1pQBwdStj/CgB0MDgGrukegaOt7UmzRKWfZnDQR4XE4GAFlGFBFE4fRANjBqdSVr5jI5s2e9VQoJaJn6p0Zez3QLBsnoiah6MFz86zg0klYcSCIgZEjnySKRGB/cKHwFmipgTsHytZ+nEeTJ+lxjZmLFeV6f1IpNAkJfkbWiGBpjsEx4k9z/zu0b50mNDLnv9p0LW73SFHCL0QtTXfJq75UgI+WT3T7QH6yRg/wBpg9vFiQ2XxTzqSkgX2Jcx5bOTk6AxQqzHb1u7qlIcoZzJoIG/p5f/AHMqbWYmKoiCn8zhc0DSlA7sTLyWJkFuNjhdzG+lpHQfAU0KUBf/AIrhDm4sX6iYWc8fS1P31TFqwDIwORnL5XyCODVGhEFNaDkiZ2cbhlxiAnkd6WgepXHxOtqvVlEfPg5mS4tmBZC+/wDb0DR0IqlZITIjLhwcAl8r2ukT+40eo+QrVNshgcuTnZLXNgi/Sw/T78npsfLw+FXCQhlvGwud7kjnZMoHqkJSMFNVOtDuCQicONmEyBqEQw+lijxPWmgewFJHI5oE724rHf8ApNQvI+WlaSRBFZXJQYIMGK1oeChJuR8Sa2rRsxtdV0ICfMmyXEFXkm4Gl/E10qqSOZ2bFMxCCHZDkXSJn7jTbBVCwBGjQBFGR9IUvIqSoOhpaAWpE3UuN3edIYln1EwgE/1kWU60CbPEKdfckHhoKATOgPkkjhja6bIkO2PHhBe956ANAU00hM2Dsr/t67m52KLkO6pP+B4l6PZhgbs6Rnm3SP8A81/KtFRmFsqWxsWD9veB7XxHYnAYTcZqI+f6p3kalzzc15/YwWsdGHPDI3JimxpNrgqix8j415TUaHpKytqCEgguBFrL1oRUnkP1Eho6E6VomQMh7SUtbx8aYmLILgrbrdb9aBDfstCucbooWkEguQGkhQCeoGlUBG5ARfT4q49EpjSIl8BcSWjRKoY5Hh/1WU9EKKfHyokTYZFgqga0W8Ra9BnyCBhNABbdDYHxpkye9otAcSC06eSUyTrntY0lPM/Hy8aBEbk58TGqHK5UCW0qkikiDzeWEgcAbC3hWiQ4M2w/uz3FHCcbk2Y/KwOG1wyo2l/n6hXovq1eq0PL/N8ipO6+yuSLZMzt/wDQSoj5MOQtBd4gBKX4rrZlfkTDzn9iGIHC57lMXc1HRSASMXqPUNKlVyTqkVyQgjtx5cYe4seVANv6vCjJd4gIKIsvBKaGfY4d+8f81x21FY12IGqQdLGxpw14Zci48Htowt9zuLAgH1bYsMbgeoVKl2snohqBT/8A4Njx7X9x5E5JUtxsURg+SoKX/K9kP7EIZ3F9u8Kz8DkOWI6ZM/ts08G03jy2+EL8lUMn7pY/Hent7tvjsDXbLIz35PirutV/it/ybIedeCB5T7i948s0tyOXnZE+3tQO9lg8kYla162OuyMnmsysyTPkcXSvc95KlziS4/MrXSlGxk22NGQ/FfDSnAmxIIN1v08KBScuUt1slAmPMx5HkDReopSUqsLiwWnUFxHhUuxqqBkeKwAfuGtZtmnELgxZJH7YmF7vFoUipbNEiaw+2srJ2mayXIHqclYvIkaLG2W/iu0YWASGNriOrvUP22rntlN644LPi8Xj4wDngHoXAW+ArB2bNoRNY+IjhHHGVOltKzkqCTgwCHt91123K+emlS7CJTCZFkZbcLCi93IX1u0Yxv8AWT0+FVWjZnayRD99d7cbjBvaPBvMhY8f8hlXR8nUDyB0rsrjhGEvdkLDmPOPIZEa0NILnn8L0noC1ZUsvk+L44l360b233goh8l1qkm/Bo2kBZXffakrfazmB5ttyYFZJ+A1q1huZvJQgp++O3INwwJeQYxVaxrwGnzvV/gs9yPzpeSv5/d2HklRiyZMn5H5kpeAPJotW1cLSMbZ0yHzeczc9rYpnCLFaDtghGxnxQa1pWiqZ2u7EYVQEXGgHQLWhkxJk6deo6fCnApHIsaSQq8oNSPCk2NJsOhxGk+hiu8D5dazdjVUD4sUN/3CFudo18qydjVVDMfEeQDGwDoC461LaNVUnuN7dyc6Qf23yDRUQVhbKkbUxyXni+08XG2nMkDQRZjNSv7TXJfK2bqqRdOL4ZwIbgYO0mwmlCfH0isWyi04nbjXPa7kpiWg2iH0r/4BrUyBZcHjSojwMPy9QumlmjpVVq2Z2svJZ8btPLkax/LTsgxiP9shXE9EaLfjXXTA/Jz2ypbE7i43F8dC0YeLunAKvlCgX6dBXVWlUc1stmQ3P928FxBMnJ8ikrgjcdh3vPgAG2FdVMF77I4Mvbx492Z5yf3RnkhI4bHETQv/ALiY7nE+Qr0cfQS/keHm9u3pRGf8pynIcs52VyORJkuav1vNiejQNK9OmKtVojxMnYvkf3Mg3wFwLnxiEPOo+rafFKtoz5CvakZFHE0ucSLNI1afOlAtGea1/uAANjaOngPnrVQTyEt98NLZYx7ZdYa+nxpIdtTw2ul2Qsc/ebMYNxc7pprQ2luOqb0W45l4OThTiDLhlxZS0Oa2UFhLT1RKmtlbZm1sdq7oacEY5rQNrkO4C5NNmZwsExBLWlrrFT9RNMRzdE07mt9TSQ7aUt4g/wAKZOordI07ZHkNdcu8PAJSGhBkjYXBQ15KLsDQAPFaBoaDSBvjYCNqej6SCdT4GkxjUUZc5zY3K0lHi+vkKaFZ6HXt2SNRxcBcNd++9IVddREX6xk3uskfGWH3YXM9LmkaG1JpPc15OrlG6fb37jxc3BFw/NzMZzLW7IHus3KDfPTePDrXz/a6ro+S2PrOj3lk+225oJmiMZimsXaAdPCvN30PamBzBgblZYimc0Tn1QzTHw1v4/CseBvXJoTD8DGhbucDO4WJeNrF8QOtU6i5Fb5gsYw73lrUQRsVjCPgLurlyI3qyhcvisAGXBKcLKg9cOQT7bmkX0F9aypd0cmlqqyLj2R92sbMMfC91yDH5BqNg5CT0xyjQbz4/wCqvcwZ1ZHkZcPF6GnOBa33oiHBwCgGzmk6tNdu5yMWyZzUuo0LTTAU5HAllm2XwHkakBkybQWuVzQFB6j+dNAcAsHtFrFw6UANOO12ouT5qtADbixRa+hIpAcZP6yP/TIQtPQ+VAHnSMXcPUNNw8PA+dADLntJRUQ28R8fKgBTZQ8Bxt4+fwoAHcSp2q7qOgP/AEoFIn3GuTd6XBQR1+FEhoDuIdZw9V6QhsPcRtP1KQotQA0yUPVsgR5sfMjSgBG4xORzVb0XVB4+VKQO7nbWtS5/J5GgDzI5JS1sR9xCQQNRSmBpTsRHPd0dudtY78jmskPkZf2ITucSPFK57Zl4OvH13YybmPvXzHKN9jt/EOBhvJbHIATIQtlrntdvc9CmCtdTNs+UZUjsvOc6fMaVlfI70B48SahGrfwVLmu+cXAjONiES5ABDjH1J8TWlcTZhbKqlB5LuHkuSJM8rhG4/wC00oL+NdaokctsskQCVX838Kowk6Fd9XXU/wAqYzhQKoAWxP8AGgRwyDREGgBvQEjZKm50PySmTI37in0kJdelqqCZOOJ0Isqj5UxHA4+F/OgDl0Unw1oGdO0Hqo0vQB5u55SNo8yApqQRI8fG6DLizXta90D2yNY4K0uaVC1ldyjopWHLPqjs/n8XnONg5CWb++8JIwX2v0RrR++vByU4uD1laVJd4JNoD5CMdir7jjunctreHyrnYwsZG0CHj43RvcdznAb5nr1U6UhnGvjBLQ1z8kn+5DC66+MspVPMNqSkNyZKgQn1EW/S4/0W/qd/GkWhtsk2W10ZVwZ/+yQHawD/AO8k/elSMRLmY0AGPImTKNMTGURtI0U9fnQVAid2dMzdyEowMMJ/YiKOLfA0pDTwDQZUQc6PisUPI/8AUcUATxogGedxnuEzcjNuaPUd52M8bBbimKRrfixq3CgDiix2QXsiC6UwYPLg5OaZDmP2xD6Wko0eI8gTSmA5EVK/jOObtgYJ5vp9IRXHxPWmpZUNkZktzsiLfMmFjuN3O1+IGp+dNNIqCKdxuNCs0MHvSXXImO1oI8F1WtOTZMEbJC/JyBsDsyRt1TbAx3RF61fIUA8jGqYsh5yZjZ0EFo2J0XSr3ERPJ8g3AgBlkbit1bExDI7w0ulbUry2ItZIp2dzs+WSzGjLGGy9Svia7aYktzivkb2A48V8pByHG+jBqfjWsmUSGxY4gbZImk2aLvNS2WkKQNB0iaOp+pBSGcD0vCwucf8A1DTASS15Kn3HG6DSkJnXSMY1ZHoCEDG2FOARd+0PtV3V3W0Zssf/AAnAkerkMtqOe3/7qOzneR0rRVMrZUj6F+3XaXY/ZzmjhsZuRyiBsvLZIbJkuKX2k2YD4Nq6wcbyOxqRR7RIPV4dVrUzGJIGSEtcAqfK2tJ1kabRXeY4NszPoJJUg15ubrTsduLPBQeRwZuPmLkL2L+BFeVajqenTIrEdNlKPwJTwqUanontN1JUWcia0wYUJgdVDvHQUyREkyg7bW/yogQG87rBw8vnTkYK+EHoqf40oHI0MdzyDtVpKjdTCQiHELUBudU8qZlZhYhRqmydelUZjUrmhABtAVPOgZGT5bWaiwN7+NNDgh8/kHtZ6XItl/fVpFQVnIy5XPJa7cD9Q8PnWiLSg4wGQEnrqdbUwK3zn2ry8XJki4+RuW0FW+2DdvjW+PvVa1OG3U+Cp5nZ/NYJc2fGkA10Ufsrrr2KPZnNbr2REzcdmwk743NuiEEVsr1Zk6MYME/hc/hVaEcWJMeRp5dKegoZ5JimqH9/hRoEM8YsgoA0nzIPXwqZHxZ50T2fWSCfG1MIGnbW3adx/jTgQ2Xk+Q604JOAqEXWiAFCN70LQoB/xaiRpSERYgcRu16DpUuxaoGxYbRoNOpqHY1VApkTQgSxHWwWokuArHxZZNrQ0JoelS2Wkyf43t10qGVpcLKth+FZWua1oW3A4OKIABgQdGj96Vha50VoWPF44NaEYLBEahQH8BWDZqoJnG4+QINECEIE+PxqGIm+P7cyslvuuiKKAXO9LP21LFzSJt/EcdxELZszIG9w9MLfSo1QfmNLi2Zu8lb5flsXHhdJkyswMJviR7zx5BbVvjwk2uZf3F91v07Xcb2652NiFRLMP9x66qa76YtNTmtfXUz7/wCZNx5nylhnmXcriUXxWtvxGbzIj+T7253kgWOnMcK/7bCQDTrhqjK2ZvYgJJ5JXLNK55HVxJJrVKDPlIixRTfofhTJPelNCU69KAFE9Rp/KgZ7d1162pBJwNdK/YLHxFMJkNxsQNCuKuOpqGzStCQjxz0bbzrJs3SDY4fUWhSbWbWbZokTWDwuTOjtojYShc7UCsnc2rQuHE8DiMLQIXZM3UDT8Taua1zoVUi98V29l5AbvLcWGxHtIqeZOlc7sXMFq47hcHGAGNCZ5Lq4eo28XGokC58X27yOen9sxx9XMG1B5vNXXG2Y3yKpacLtjjsM78qT3JToyO/yLjeuyuBLc5rZ34JGXLwuMY5+5mHjIFcSAU8yb101xy9Ect8sKWyocx9yeHxN0WAH50jCiMs0nwU3SvRx9O9tzx83tcVNtSi8n3xz/KF8ckpxMN5I9mI7beJKrXpY+pSp4eb2OS+z0KzI+MZISRsj9S6Q7i5fAmuxJLY82zb3GJdm4EaAIGf0k9T0qoMmCOOwNiePWCULdL+NAHny+28sa4bgNqkAhKGSkB+7kOc8teocRdw26fuqTVJHv0cz4nOia+UlylwDn69TtVKHZIqtG9hp2NMxzIg1GoHOJsCeiLekmlqHFtxBu/Y/Z2BwOBHyGXGx/JStEs8zgHNjBG5GhLW1r53s9i17QfY9PqUxU5Namd/cLvTA7leMXDgjZFjSEMzTeRwBQtB/pJr0upgeNS2eN3+ysrhLYouRBPC8OnUBw3MD2lqNOiKmtd8zseTDW4gziFhNiyyH6SDRIRIz7x2ksZuB/MLEr1NNMUC3ykSbEL0AcGOVFoEkJ9+OR2952OZdpSxPUFaQ2tBAc4Dcwi59YJQAn4UwHGkENa0OBGnzuATTRLZ18rGudI4/3UJLgPS0eApDQg5CMJj3bit0FgR4UDj5BRPJAQ9pLZYirJWkja7qR4VLS28GibTlPU2/7e/cKDnI28NzR28xE1ox8s/RkDRCf6x+2vB7fUdfursfU9Hvq64W3NFyBMyBzWoZwEaXlBuOhUXFeToe4iaxuULm/p8l6zbRtkFy9yJtU6J5UNmickNzTcxjHOa0QuP5z63n5VzZEb0aM95KOPHWfLlLJFUOm9TyfJlcbXydVSocuDyAcIoiXG7cuZQQnRrR0q6XdWO2NWQf2z92+4+xpWcZlyN5Xh9f0sriTGmojeqtPkbV62LsSedm63wbr2r9ye0O82Nj47NbByBu7AyiIpmlNApR3yr0a3TPNtjdS2iR0ZR11sW9DVmY62RjmB+qgq06+FAxtyLtYUW5oEMvHpTx6dR8qAGZAenS5oAQiWRTQDEl+xyH81vKggQbkkEH+l3W1BSG9zlLNWqq6UCY26TVrlBJRfCgQ3K8KNxRwsXfzpDGHSN3o4en+rpQAy56Hy/eKAElSoIJZ+U+FAHWslld7YBkvYDp8/Ck2luNKdiN5PuDguCc8cjmNdksCjFicHOPkTXLfMlsdePruxkvdX3P7l5J7sXh2/8AHcbv2gxfW4eDna1z2ycj0KYq1KTPmRzQOfzMpl2nc/e9QD4EnxrGfg2Kbzn3D43BY7G49vuygbG7PpHzrauKz3Mr5a1M15XunluVL2yT+3DqIm+m9ddcSRw2zNkNvVq3vWpjIkO3XBt1WgDwLCU8PGgBDnj+A8FogTYlzlu438KYpOEnoFPjTEJIW5PmlNCElGjonWgDg6jQjr5UxHGlqXv5/CgBW0u9LQvVU60pGERYb3ep9gdB41Dua1pIZHDGw+kbhoqIDWbcmyqkPsAJ+GrtAtQyi8/b7uB3C5iMcgcUMjugPQCuTPTlqdOOxvHFZzMiMTAubIfU7f6sgjybo0V5dkdKJf8A5eCNvsSFzGOPqxovVPIf9TvCogqJHhkZGSkW0wQ2IxsdN1+kjzpSLQ2+TExy2KQe499hjYxJYXeDna/jSaGOPx5spgfnyMwsKNyx48R2EAefWoGhuOdkaxcPCASQGzuHj1C60in9RuXGhx/73JzGbKNwxSXE/CgJ+BH63Iynsh42NrGInuIrgBqD8aICBz9BHjh5z8gFxBXd+3XSkLTwMnlMcEs43HMkgTcgPSmJ1YJkCSXazk8n21T28aJ257j8BegpaDOS+PGY0MiZA9wJL5gsg6eluoNCQ2Rb4Zsh7pY4SRY/qst1gB/S02p7DSA5DC57nX5HIYm1rhtiaeiIL1XgNyG5nPx+OYZOayo8KJFGPH9Z8touVrTHRvSpNrKpQOX72yMgHH4WD9Jj3AnkCykdLdK9HH1o1scV87exVxHJkye7O900pPqc8klfKuxQtjn33C48fYEXav8A9XyqZKSCA1AS1ojb1c76qRQgOBtGN5P5nafjQJiW3J3n3ZPHoOlMDjnbWo8+n+kUCRO9tdn9yd3S7OGxfbw2n+9nzH28dg83nU+QqkiLWS3NZ4Ps/sbsQNzuQ287zrLtmnaDBE4X/txHU+bql3SMHZ22Hua745flmujww5sZsHBQgGiCsbZGVXDO4F2hyvK8byRdmSukje5SCpReorP8iT0LvhhaH0XwnJMysZr9ytcOt69Cl5RxupLMR/0/IeC1sQIc0SDa4bmdT50CmCv8tw0c7HODQ4kda48uBM6ceVpmdcr2/LiyOliBLVXYNF8q8jJidT1ceZMh3SNChCHDVv76yOncZnynBoug1XyFMkbjynuIcSNg6U4AI9+MgtanRDSgQtgBQIq6eZoRNglmM5xUhQdaqDNsdDRGPO6+NUSDzTbGAuIDT0OlA0iFzs5rNw3XOp/lTRaRDyzmQ+lSTdfP5Uy0iPy2Of8AX9CptXx/hVJlATsZjXf2xfzulVImIcwi4+TelUKC9OkmLg+TbGwKAGWUOrz+KNHZjMOBA8o0CNpKkyepvnrSbgYHm8Dx8oIKzyEglrAEIGlvCqWSy8kcUQub2ZgyStBx4cZrbuBClDW1c9kQ8VRMnZPb0JLshjI4UP8AeeRG0FoXrTXYyPbUl4qIp/LZn2/4kubG52dO0WZAGhhOn1HSuzHXNf6HLe2OpRuQ7ndkFzcDHZiQOVAPW9PMmvQphjc475vggJZXvJc9xLjcqetdKqc7tIlqn6dDogstAbjsePIRuJ+NDsNVC48JoGl9Stqh2NFQJZCGot/2aVLZoqj7IxtRqX1S2nnUyUPxwuktG03NQxpSTOFw08jg57Trr+zWs3Y2WNlpwOBDNqhXaWUW+NYWuzorUtGBxLiAAw9LD/H76xdjSILHgcI972xxxkyD8gBco+VhWTbB2SLHBwGPjN97lcyHEYE2hzg6Q+QaKIZlz+B49wds8ZIG8djyZeUNHPFvkDarVGyG29yN5TvnObBJPlZkWBiD8jEMidE8K2rjIbRlfcH3TgxnOPGEzTf/AMRKdzj81rqphM3kgynm+6+R5id0+TO57jfb0C+ArprjSMLZZIKScyE73dbkVokc7tI2XEn9ulOBSJvt29RpTEdF0A01WgDzgU062oA4QVJDSU/CgBbWSusGEr40pQ4YRFgzyH1Da1b+VQ7I0VGyThwWxWFnIhAvWbtJvWkEhDhBxQfT4m1ZOxqqhkGNEHBpO5w/LqtQ2aKpP8Zxc0rmmOMRMNgXBSvlWNrGtalx4zgoGbH5Ty8BEaf/ANEVzu7NEi7cTgSFrf02P7cQCGV4uR5NH8awbLgt/H8dxkEuOOXyfbZO/wBuNASrvHaOlOleRle8Gh4uDwPFCL2YjlSuCh8v0j4NFdtaJHJbK2J57vDi+IiXkcsQEhY8dtnOS42tHjXXixWvsjhzdimPWzM+5T7uvlc6HiYBjNS2TOj3L8BpXq4uil/I8LP7VvSiKRn8zn8zKZeQypJ3ONju/tgeQr0qYq12R4eXsXyP7mDCbIYCQQyT6S517eFanPuKZlBzCxDr6h9SjqR4LQORtkuwKWskYvoJ6D40wkSZGvT0hoJ9TWuJH4U0Sxl88ZdtiXaT6k60BDEFv5orNUo0p80NJgJa0iNvvPbuk+r+n4U4Bv4L52D3jwPbmHLi5UT/AH5XF0kwQs2N0AW9eV28F7uUz3eh2seKsWRb4+5+webyhuY100n0MfAQAnigNefbFmqexTsde70WpcNrJIA2Jv8AYkZtQ2GwhOvlXA3ZOT1ITUFNxeyOye2HScjk+29+8yRSZT9zWLfa1vl0tXY+xlyKEeeurhxOXuRXeWA/v1kUXD4DgMS0HJyt9pm0XLQ1FIPSunBk/D/JnJ2sKzr7FsYznYuVgTvwuQhdFmQPLZI5B6gemuor2a2VlKPmr0dLQxkODnDb6QbOIsA2rMhLppCQ4PUr6fDyokZ5xJG6QbnvB8wniaBCmQO2tFw1yqhHqFITsIY5pkPsuKAaE2JpoTOte9XRTO2uCEqAPq008qBiHCLe3a5pcB+U2PxPjQMS+P0nRoRChufO1MExqV8mLsfFOY3Ahys+oEaEJWdlpHg2o9Z8m2fbz7gR83BFxXNvTmWtDcfJeQ2OdrbAOXR4/bXg9vqcfursfUdDv8/stuaTsDpg3eGNUBSTZ3iK8o9uT2ZNmSY5YPS5S0T6r+NZZK6G2OyM35Z2DhZT3Sh2VmP8PUV8CTYVwNHfVtorHJN5LNaXyvGJjJ6mt+oDW5OlCZooKrOMWB7m4cLsiZ1nO/Lp1cf4VaHMkFmtEDzkzZDYJrFkcKhwI8EvXXTI0YXxJlw7c+9H3A7Xhi9zJ/5LjbNbByA3FOgbJZwrtpmODJ1kzWe3f+4/tPkGsbz0E3DZbvS+T/egU9VbcfMV1Vyycl+vZbGlcV3t25zrWycVy2LmNdZjYpW7vm0kEVqrpnO6tE27JP1G3gQOg86ok57zHgNJVwP4UwPAxlFNhq3+VIJESbZAjfqOnknjQIHPtr6wh6eB+FAht4QEqq2JH7FoAGJc0h2qdP8ArQB18gKh3VV8PGkAy7aHXKtNyE6+VADTXB0pawby620Um0hpSRXPd19u9uejPy2yZbgdmFEd0gt+YjQVhbNGx1Y+u7bmU879zue5yQ4vESt47jEIDYwr3Dzd1+VcdsjerPQpirUpOZky8Y4S8llMMrwp3FXILqVqIk3V0ild0/cLAZH+lwJDI9T/AG47NXxXrWuPC5Oe+ZIzflu5uT5X0zS7Yf8A7Np2g12VxpHHbNZkIXA3A+NXBk2xPQKF6fKmI8UaiHd1vQAgv6OCOPzoA5uJW9x42tQScOoNvM0Aebtupve/hQB0uFkCrY0wE7txIKAJ4UxHLfPrQAi8iAadbUAExYrnbQ5QDqnh8ah2NFQMZAyMelt/2Vm2bKo8GGwN08fpFSWL2lASh6jwH86QxQFtx/8AqI/dUyMLwpjj5DHtJYh+v83yFS1oXXQ17tPlp9rYfcMTHWLgd87lWxJ0rz8tUdlWaFjy4cTR60LgNsUXqmd/43/yrjKJGJ+XktDZHMw8NoA9sEB5B8XVBaaH/wBVj4gMPHRgnWSZwIaulupNJjOFkUUhm5R7nOBUNk006NFIaFHOyshIsCIRMJ+sBX38+lQVHyOjCw8KIy50yuLgXAlXEi/xpoUnP1uVkgDiomxxElv6mQBqeKAfvoBKAIwxOlSWR2bPHcsjH9sFerzakNajMmYrTDG9GqhxcQXVNHyH+FBUDBBhaTI9mGSgIb/cmT/xarTQhljDuM2FilzSCX5WUV6aoaBkVymdxmCDNzOasLQuwFL9Ahqq1s3oJuNzOOf+5uTI04fb7BhYosZ3BXkA2IXrXoYuot7HLfP8FBknyM6Z08zn5WQ8qZZCXFfjXoJKu2hyNthDcPb6p33AQMb1pNjVQtrChc1vttGrihP41JYkPAUwN3vGsjqIASQSSSS93lp8KYHHloA9w2SzBpQII4zjOV5nIGLxOM+aRVO0WA8XO0A+NVoQ2aDxHY/bnBhuZ3PkDk89oDm8fC4+w13Te4Xf+6oteNjN3b2LNldxcxyUTcPjom4fHxjZHBG0MYG9NrRasLX+WFcTe57C7bmyJBLlEyPcV3OJ1PxrmtmOvHhLPi9uxxNaS0J0NctsjZ1qiQifi4MeQPjCm10uKK2C1NC1duck+AtY19hYoelejiyHmZMUGgY2a2ZgduQWJFejW8nDaoYxzXC1v8dK2M2deA5QT8iNaBERyPHsyGOLQCE+a1jkxqxtS8Gec725Ixzpomlsguo0PlXkZcEPQ9TFnKdkwyAlkgIco3L/AArmOzcjXuka5GlG+YS5NUhhWPveU3ek6/HrRBLJvGBawKAqJu8xQkZNhTptrUJAt+FMmALIzo2hzWHUKQv76BpEPm5peTuchIselBaqQeQ+SRzgVQL86pFpCIY3sQtNzrc/EUDOucfG9NCAZpmxhGpu6gVaQEdPI9zSE+fxq0Jmgj3XAvjisi7n+XUVxDYHLOGFZHmYALtbYeelVxknkR3J96cVw+6SfLjg3N2CJqSPd0RBpWleu7eDN5kjO+W+7UgLo+Jx/XoMjIJc4DxA6V6FOkv7jkv2vgoPK9zcxy8hdn5cko/oJIaB5AWrtphrXZHHbLa3kiSS8+PmuhrcxYpsTnpYr4+NKRwPx4biRubuU9POpdi1QKjxWjX0p0Hh4VDZoqj7Y2ghob/OlJcBDcd8iFLdCilfhUtlKoVFx0z0LW+KnWpdilUlcbgHOaHSKUvpWTuarGWLA4FrBZgCAHcdP21k7s3VEi0YXCsddwa1oC7idtuut6xdmaRBKQycZibWt/uyCwDB6R0uani2KQ6Dkpz6cPDAaOrtP2JT/GS7BZyuZdGRk5Qx4G/khSNQfhc1aoZOyIjL5jgsECbKyDNJcFSpUVqqMXMoPM/cRsYe3jmBjr/33H1IegremP5MrXgzvlu583PcTJM9+urihBrprQ5bZSAlyJZSdxVa1SMG2xHqJC/4FMk62PzQmlIxbYkC9V63pSOB5mOD59L1PIriOsxgtx6vAfzpSXxHW4xUBPl1WpkpVCGYagI1AnWp5FKg+3GQhoG93j0B8zU8jRVCmRRgeshuiDU28ahstIJY3cpjau2w3dFpFJBEeO+VwEjtdBoPw61DZSRP8Xglz2+zEZCdClqyszWqLvxnCZDtr8h+1gF2AgW1+dc1rGhcMDEwmlrIY/fkGpA6/E+FYNlwWvj+NzHNAKQN8Bc/iakTZEc9mjhecxBM4OhY0F4dcq6yha6cWxhdSaPx2XHkwRSxOBY4Bwcz1IE0roTOJohO8+24u5cBxiexnLYynGeb7v8AQ7yNd/V7LxPXY83udX81Z8mEymXFkkgymbMiF2yeN4R7SDX0ismpR8hajraGPR5sbUAeRZGJoB4edOSHUIdkTNDC2Tan0FFBB/nTFAkzyk7fc26ldP8AAoJSFPyZGqFYYxckGxNMUCW5cUpWONehc03+FEhA9Yo5se3oXaqlUTqc3bHD8tygOhBpNghMhEjvc2hzWWQO0Jokew00vUhqbdNrbu0VF0phtubl9vX9vZnFMPF4zI+TgamVG8bpFH5gdUNfPdtZK21eh9f694rVULUsXI5GZlwHE4TLhZmxkDJlcN5Yw/0gWB+NclKqutkejezsooyIPE9v8IwctzuUJ536z5rlCno1tUr2vpVGP46Y1yuyNf8AdLtFMhrJJXHHtE1rS33P/D4Aedaf4WR7mH/ssKMp757rxu58+HIjw2Yvtja1/wBUsjCPSXnyr2OvheJQ2fP9vsrO5SKsZCxzmbHDajXAtQjwsf311nBxOAuTYSNpKluqnwWgRyURxOQBHam660xIYdJJI/ehDdu1pAttpFtJC4pHsG1hLWGw0JTopoFbUS5+5zhHGZdyDf4nx+VAko3PbAGtd9IBQjUKaYJi5GiJsjhdoSx6/CmStWCzyh7dgaG9HPF1HSszZKNRDHObIHh5DoyCH6EJoflQ9V9Bq0a+TdPt79yTzb4eA7gcxvKsAbi5ZRrZmtFmuOm799eF2+pxc1Pp+h3uS433NOEkjyVZ6RYxkXafEL4V5UnuNFZ7h4s+1JmYeOJJBfY63/m865MuLyjqxZdYZmHJ/pw1z8+Yzy6xYrAt/BB/GuTU7kys8iMl0e+Z443D/Kz6pXBOgGnyrVfTUCBOO5w9zAx/baPqzMn6rdQDpWs/IAjBC2R2wnPyV9TnH+2E89Krx8CPSSYZO/ki10jfpggsAvQnrVq1vBLqhOLw+RmSiTAa7HVyxyBzmp/5ghJrT80bmbxJ7luwua+6vbTQeI57ImiGmM6T3f8A8GRauvZRz269X4LJi/e37tYAY3kuMhzQNS6EtcT5mM1uuwvkwfVqSOP/ANzHJxEf8n2yNzV3GGV7bjycKtZiP8RkpD/3N8C8D9RwubEdTska4H9lX+Yh9W3gMh/7kuy5HJNh50Y8Q1rrf5VX5kR/i3FH/uJ7Ju72M5w0A9sBRS/Mg/xL/QCyv+43tBjT7OBnveCCwkNCjzWl+Yf+Jb5IyD/uNbyOYMDgu2M3ksx52sgY8FxXx2gp8TR+T5BdV/JcsHvXl2wOyu68KDimgLHgsmM+Ta6OcEA+Fc77HhGtep9St8z9zOSzfciwGtwcAq1rmHbIvxrO1m9zpphrUz3kJI810kj3ksdebIcUB+JNzUm0lX537gcXw+P+i4wtmyhq9v0BOgrSmJ21ZjfKkZjzPdPJ8xI508pEZKhoKWNdlcaRxWyyQu5So1HU6pWphI2XBL6aFL3FASJc4EK3TrQDZzebgfNPOmKRIefGx/ZTEcW5t/jrQApLE9fDWkwOFTdT8E/fSGJRG6qpRDTA5vAHgp18KEI8HOeoaLmwpgPRYrjdwIHh8Kh2NK0DY8ZsYUgNBrPlJsqBDQ1DtC2HqNh+FQ2VB0tuF9aaHQUSMUhJDkXqrrN+S1I0dQD1D5Pd0+AoGdAVyk2/qP8ACkMdADSHKU/qOtIZcO3cxwLAx2yJxVzzr5GubJU6aM03hOWxsNobjs9+V4QvJTXWuG1TZFjiZPltEk7wyI3UlAAeiViXsEx8k6MexxkZfIwJ7pBKk2t4fGogf9QhmKGtGVycwc4LqUQ/GkOY2HTyksrfb4yMMhH1TusARr/1pAl8jLY42H30bl5IKuyJnbYGeYB1Sgo8/LleA5rjNGPU6WU+1jMQX2jV1IBpkrJ3MZ680/V7Ubfbx2/Ia/E0hoU7fEpyciPGanpghAL1PilAMGORDixuyoMfYwD+7m5rgxo+Rp76AZt3R90MeFzsXjcg58wsZGt9vGaf9LRd3zrvxdRvVnPfPVbGZZnKctzc5kyJHTPJVTZo+A6CvSpjrTY47Xtbc5Fgxo12Q/3JUUNGg8qbsJVDmM2gFgELB0/jUblpCQ9oJEQ3n8zzpRAxJufX63f0DQUAckeAPUdNGN10pknY48nKeIMWMkuQNa0bifwpgWji+0MaADI5uc7jcYcJBkP/AInflHwqXcmS6YYzJYmYXFQNwMEWMcIRzk1LjqTXPbINYmya4/tRxSSX+4Tck3KrXJfMdNMJZsXg4IBtCAC6+HwrleRs6lRIlGCKMe2wDcQLakmokcQdfINu4mw1OtBRGZDy9xa2/inn4VQh/j2Pgka4Wv0sVWtaXhmGSsluwM5zNpJQohr0ceQ86+OCfx89sgVfn0WuylzktXQPZOHAElXOt5bTXQrSZNHXEaLbw1piAsvCjymlR6kta1RaiaGrtFH7g7bbPucGkEX3D+QrzcuCNUehj7BR8jBkx5PakaSmjiNUrhaaPQrdNC2YzQ07QgHqVPGkKR0ytjB3EKBf8KZMEbk5xCqbnUDRPKmaKpGTZLpHEqfmb0FpQN7wV9zQKpPgKBjb3sIsfTrc04ENtLdvosD50xA85LirbJ9RutUhAb4HuKqjuvzq0xchTMFgu5wTw/hTkUkTzf3Z42CF2NhMfmzaNlJ2RAjw6mtadJty9Dkt2UtDOeX7+5/kwYzN+nxyv9mBWC+qnWu+nXrU47Z7MrD5pJSXPe4kqSpUrXTEbIwbbEtDnXbpQSOMxnvILig6DxpSWqhUeG0AFw08alstVCWxAAhq/hUNlJBcGDkSEbWIBZTYfhSdjVVbJPH4KVzmhwNxfoKydzSuMlMbt8fmGnTx+VQ7mixkjj8IwO9LQT1AHhrUO5oqEnDxbI2Akta1VCpoah2ZaqSOPDjb9sYL3gdAgKeK/wAKiGUSEWNlSeiMMiB6i5Q+Z8atVJd4DIeIc5wL9z1F3E+kJVrHJm8oczjRitOSSxsICiNQiVcKIMnZsieU73wuNjMWJtL09SXA+JoWOSTOua78y8oljZS0BTr+6tq44M3eClZ3PTTOLd5cVVSbJW6qYvKQ008szgXOVfDS9XBi7NiEcPUdRqn76ZIoN6ongP50pGLERIBX8bkLSkcDgjJuNBSkpVHmRX9IU9CbBamS0ghsJW4JciWF6mS+IbDjWBkGwIhd41DsaKoVDjxorRvOhNQ2Wqjzo2MBMhVLIKUlQca2aU/2wI49Da96NgSFsjhiO0q6Q/M1LZaQbjYmXlOAYwxsVSouvjUtopVbLFxfCw71KyS20v8AtrK12WqF54viMp21sMQhDgjgArh/Kua1jWILdg9syuDXEGWQD0hxsPkKxbBMtfEdv5EYD5tjAURoCAfKhIVrItcOLDG1ryBuH53aW8qcGZk/3Vf/APjqBodrC0g7U6nw1FbY9hM52N3YOPk/43OkP6OV3of1Y7+VarQyvU1cMBaxzHAsTc12tvG1Wcxn/wBx+zYOXhfznGRn/loG/wB6FotM0dT5gV6nT7PB8bHjd/qclyqY3FNtahKPOgIRCLV9BOh8w6uQiHINm+76gU2n81CIaYQJWvHt7QvQ6H4UyYEPdIik+21RZFVdKBjsb4wwuLtrB9QAv8aCIHGZDwGxe4TGfpX+ZpocC/6pnSBwS4KXI6JQwQyXSflLWOBXbqFNIBQka2MNDiJCfVqvmTVCgJxeSycOb3eOyHwzkFrixxDiPlU2qrLVFVyWpsbX9op8eft3Ja0h+e2V5yHOu87rg6qleD368b/Q+r9VZWx/UrP3a4nmMzPgz4opJuLbEGBsSvDH6fSPHxro6F6KsPc5PaY8jtK2M3g4fk83I9nHxJpZSRoxwHwVEFenbLWu7PEpgyW0SNf7I+3fGcfiR8hzWEJuYeu5sxEjGtX0oNFrwOx23a0Veh9T1OjWtZutSN+6/Ddvy4v6/HngxeagRphaWgys0QgaEdK6OlkyTD2OX2ODEqytLGMgFvpaLgkk3RfAmvaPnfAqHYSd3qtobqRVGVpHJgoCo0dWDyvQ9hVQwJzuuxod0A/MB1pSVxG43Bryri1dANACaUmlq6C5drSNhcXbvSetvGkyarQanfkBn5fbsfMn40alKGK3MIHo3m5DFTXqtMQIXLIA1pLyfUuiCpNEtDrfdYsrd7XMduDm2LSqqDqPlSalQx1tDk3H7cfdDG5X2eB7hkP/ACKbcbOcbSMGjXH+rzrwu31WvursfT9Hup/bc0uLJiyWpjuQMftKi/gRevK3Pc8FO7r7NyXum5bt9rGzF3/uurwCLlg6Gue+Pyjqx5o0ZmORjYznuMLJM3PCtdPMojafG/glc0NHZJWOT2NkLs/JORLYNxoijPwrVfQEyHczOzBsib+mgP5WhLefjWqdV/UTUjkOHh4BDp/70zvpjYNxNJ2bAmIMrKkc1qDHjJs1t3AAfmOgqIQyQj5WCB2zHe+fIJRwFwtKGxElByOWhk5DIGPigH0MsvkTrSgniMZPdWJDD+mwcRsjtpPuytUL4keFUqfI+MlK5DLfnZSZLWB8zVBiYGtb8gLV0V0QcUQHOQOha04vpew7Ts0cE/fWuN/JnkXwV92XI9qCdzHaOCr+FdKqjl5Mun2+7W4zuTKdP3Fyz8LhcUt94R/7shP5Wkqg86yyWddEaVWmptMfKcZwWLJg9iYMPGcaAA7NcA7JmtruN1+Jrnan+Qytz8vDK2WfkMkCUFS553KnS9VHwEwUzuPvnt/BDGYu7LmARF9ANbVxWZjbKkZtzXeHKcs/Y6UxwJ6YmKGiuquJI5LZWyAJ3EucFJ+da7GLYkpcLtHnqaJEc6KPgFoARuGvT+NBLPbrEog6VQhKBxTqKAPOb116J0pSB1AbafCiRweXYiXd/CgBJdY9E0ogQgqTYKeh/hTAfjxXPP8AcsPDyqHYtUYbFjMYA4AAdXO61DsbKgQxirsYrv6jYVEmiQpGkqLvuC46ClIxQYTd9hpewt5UhiyAbgK3+p1vwFIIOD1Xb6l0cenwFIYr2/VuNz/UdLUSB0KqNaXP/KT9P4UDFI1pBeVcboi0hkrxUsjiWg+23TwNutZ2RpRl54nlBAxrYWBziQNzurq471OlMvXGzF7BLmygM/M1Ubfy/lXJZGhMDktzQzjIiWoQXNCfs6VCQQMRtb7wGU/9dOpP6ZpSNv8A4z5edIpBZmdI3Y3bkAKNkf8Abx41/qd+ZKkYqKKTIUF36uRgBbZMdnwHVKljOPlx5ZkR/J5jD/tMCQR+ROlOBSN5WYzGBfy+a3EgRf02MUKDo7rTSb2HJReb+6nD8Y12PwWGMrNuPdd9ITxPWuqnVtb+WiMLZUjMec7l7g7klLuTynGI3ZjRnbG3/wAv869LHipTZHLbJZgWPhRA3bucihdK0diFUJkje2JGOEZPQBOtSmUxTEA2RDc78zjYGhiWh5zVKPPuO/pbpSKEvciB5SyBjU/waYjjhI9yM/ttOniTTgJJni+3JslwfKCyI6BFe5fDwqXYJLzxPbs7GCLDh/TscNpeLyH4u1vXNbKkWqSWbj+zTuBe1St3GuW+dnTXCi38fwUWGNOg8PwFcjyNm6okSbmsjZtYE+A0rOS0gKR7gVXTp5GkWN70VxKmmQNSOeSjSflperRIvFw3FHOZ5qKZLYcWNYzxtcpVIgHGdJDIo+lVQXq1Zol0TJnD5QOAcH+m2njXdjyScOTETmJyS2JUDr0Xzrrrc4rVZMQ5AeEVQbj4111tJi1A85xLdbEa0yQeXHbK1HdLFEsnShjTgrHMcAyZrtrARqHCuHLgk68eaCj8pjS8f6Xj+yPzAfvry7UdT0qXViu5GZ7hLWXFJHRAIgLmucPw60xjcjSF2hFsg/ypgBzGRv069PAJVQKQbe4kEBB0XxqoAXGHKFsvy+VEBI+1gcGk9dSfEUzNnC1VtcadVpkDLnI21vH59aEM+b3OJRVLhYAV754LFNhe4hbDr8aJGkER4im/7alstUCWQNTRQenSpktVDMfGkkKRMX4eFQ2WqskcTgsiZN/pBC+S/Gs3c1WNsn8PtoNUmMlTr5j41m8hqqE5jcIyJGuQfJf33rJ2NuMBseBHE3cS2Nq6yG5Hw1qZkZ0+0E/TROmcbbtGr504KbCMfiOSzCjW+zET6toqtDPkS+L25HFIWzAyyIqG9/nTVJIeSES2Dx2FHKHytRyFBoEGqpWjoZ/kbE5Gbx0E3pkiZG2z7oAunnVLREQ2QXM99cVgxmLBPuytF5DcfhQk2VEbmacx37n5gdGZSIejV8K0WNGdskFOyuZllc47i5bXrZVOe2QjZZ3yOJcv+dXBk3I2GqRuFktTEdDVsiDwFKRwOsjW+oPj+6lI0h0RkdfiNaUlQPshVT0FlPWpktVCIsXcAQCb69L1DsWqsKZitaf7hA8h4VLsaqoW2NqI0bGAfUfGobLg7tgjQk73HQC96QCxFlSlIWFjSq+PxolFJNhUHHSNJsXu6gXC/Godi1RkviduchlOY1rXXNmMBUkD9tZvIl5Nq4WWXE7GON7L87ZiiRzV94o8MksJA3VzQdUrG2VvY7cXTdtYDeM4PJh5EY+WMefiiS2SYExgjo5pd6qN0euvX4+Om5d+K4Xj4yRDseyN233A4Bo+etYXk8LNjtS0Mt/F4GMGgNYXp9QFm/BayZiWTFZBCEam9QGsjBc5KaZIY3eHgIGbvoH1PKeQsKcjYZDHMUe9oYwW3ylSvgBpVQIzf7r8NlZUkPOYLjPj48ftZR1LGrY+CXq6uBIzHHDQQ+IC5ueiCtWDNS7F7nllDeMzZPUwJjk6lLBpWhODC9S+ey95Lnkbz9I/L8CK0+pz2SZjf3Q7IPGZD+f4dpGFId2bA0KGvP5gK93qdmftsfO93qQ+SM2x8pzxu2qT9JsAPlXqSeNaoQ1z1arSJSCGlf205M4R1sjwQJjf8h8aJFCHnPYjXPcLC6n6Tp0piSOF4Lg0SqoBHUUDgVvaQgb57W6WoEdbkRtcfbUkBdp1C9aqSWjwyHPO1h9JuSbf9aCGh5rmsAkCNcbF4N7UxEvwvcHKcDmDK4xI97UkjcbPbqhHnWOXDXIoZ09fsWw2lGmYP3l40iPH5LCkhkaA0vYWuZfrevJv6+yf2s9/H7WrX3It3bncXH9we7kcTC9mIwkOe5oa1zvC2tcObFamjZ6WDNXJrVBvLcrxfEx7c/Jih3j0tLiXOXoAL1jTHa2yOi+Wtd2QJj7B7inGFOyE5s1wJQY3E+ALkvXUnlopOR/hu9UU7vL7Wcfi48mb265zfZBdPhElwLRc7a7MHec8beTze365Ryp4MjALfpBBcfSPAeBr2Nj55r5El3uEaEj6lPXyokaUHQ0AlyoBa2oNMliC6NquLz6RdNL0itTz52FGQkF5u5wpyJVgbdPkFpiLWI87QdUpSNVGSZBIBG1ulgLi1IpRAh7y1wZuQt9RBClaB7oU8ogikVr0G5F+NBKFNcyMiTeQ5Rtcyx3Ckyqu0ybJ9tvuTFkhnAc7IGZwIGLmPKB/g158fA14fa6kfdU+n6Xe5fbc1rFlc6aQOjLGaNcT9R615J7Tgoff3ZmZmN/V8GHRhScqBvpVqXcKwvTydeHLG5mEnC4PHOIlHvZOjmIp865W2dickbkYWVL9Z/TwBRsFimuvSrTSAhpp8PDeYsVplyCU9PqHzNaqXuDGXfq5P7mZKIYRcMFlGmgp6ALPMsw2+3iQ36vcm6hUkAKTkp8xxMzjuCEAlQPG1VxSGh8SxFHMkKp6iR6fhekUNRSugkd7m0udZoH9IvVvYgFyWRZKOnUS7gWub4C16tOBNEPkcAHyudG5j9xKg+n91bLLBk8SY5kyTcLBiNgRj97nO2mxHnV43ykxyrjAdL9x5sHGEAUyJ6Vv8vKmsMmF80FJ5LuXkeUlc+aQtjd+UaV01okclsjZEElyueFv8VqyJOkO6myaa0COt0I6DUeNJgNuLfLS1MDil19B560AjjiFtb40C3OIGoDqdfxphB4lotffpagRwuACdNU8aByJL1+k63+XWiBSIc9SoCDSmIdix3v+soOoF9PBKl2LVWw6LD2AEhBqrv4Vm7GtaQEMYCBsGn5jp51DZrA4ABdyOPQ9KkZ1HPC/SOhOlA4FNaPqa2/V5tp5UmNHQd7iGAuf/UfppAd9oXK7rIps29Ejg6TueGsaXEohNgKAFFrf/Wcvg0eNIYsCRwAj9DfEWNAHkZGFu+Q/PSgAnFZIXhzvRGenl51Fi0Wvjc0QkCJodJoAb1zWR0VZacHKc5+7KeXEn0xNuT/lXNZGqZacXNLGtheNsbjbGh+on/U6sGiiQAhH9p4DgbnEhuCD/W4VA0KmeItkeYNwuYsGEfSeipUjHZMkNhAzX/p8XX9NGU3Hwc4XNKAKf3L9xcDjonYeA4RppBj626uf0rqx4LW3M7XqtzJ+X7n5DmHOEjyI3G0LFS/9R1NelTBWhyXzO2gFFgzzIXpExEPU1q7GaqFshxoAABuebFbrUNtlwhW96Da0NbTgJPBjd5JV79U1FIDj3AeQBu1tMDh914KJGxL+NAtQ/juFys97TjxHYdZTp/nSdkhpSXnhOy0LXvaXyGxe4aHyHSuW+Y0VGzReG7ShYjyz1dVBX51xWzNnQsSRbYeKxcYNaGj4C6kDSsWzVIMEUcbUDQQgXraoLkFlkDQQvz8qzKQE+Ql42epx+nrTQxohrVLlLiBY9KoGMO3PcgU+OvypkhWNjguBd16aVRLYSntgoEA18KZkDvfvBBOtylhVACuY3rZD08fCmEjZldG/cxyJq3/pTTYmpJTD5Rou5GpYra9ddMnycd8ZYsLkw9oBPx8vhXZS8HDampO4+S0gElQbX/fXZW0mDqEoCC8FWnp4VRI09ocrHKQbJQJld5nhGZUZRvp6g6rXNkwqyOjHlhmacv25NhOMkbSY2ruaB+6vKvjdT1sedW3IQMQAWHq1/wAdKzOgSYgUcvUqdPwoQA+TGGAll1Onn1qkIj09ZQAre+oHhVgxZICOOvwWghii4gbj6mi7daZIh2Q1gO6y6U4GR+Tk+n1G/wC6rSAw1mMG+ktTwr2OR43FDzIf6ATt16rSbKSD8fjcmco1qFQi6/hUuxoqE1hdulxBe0kao4KEPlWLyGyxFjwe342AKLNubdNelZO5qqQTUPGxtawxtL2H61FgfLpWTZrAdLFDjsb7z9o/I0a0km2EwP4WNk5kbnYrfaDdXm7qbUEuwTD2033GvyC57jcF/WqRHMm4ONwcRrY3AILbkrRUlGVrijmsYseNtZICihAp8/CtFVIzdmyN5buPC4/H2vcH5bQdwadrR0QmmggoXI9+P2PDGhi3QFQB/GrgISKRyXc+Rklz3SELYdAEq1Ul5IK5Py8sm4KSXWJrVVMHlI6SWWT6jc6eFWkYtidpsCFPUa0xCw3W/wAfjSkqBYjPyNTJSQ81iK25TpUyUkOsicl0B6UmykgqLGJ0aif1a1DZokFthY1C71P8Kh2LSCWwu23OwWI+FTJY8xsYJ9lhleouLikUkGwcRnZLiZVjYin51Dui1RsmcLtl0hAZGX9Q42tWVshqsRZ+N7KlyntYWl254YAAjQ4hQCei+dYvKdFMU+CVx+P7f4/HkOdMIs+IuY3EDQ4bmH85FgHCs5bPUx9Jth/G9uctkZw5ngRJCyUk4rC8IxRcb3+HkK2VJUG+bsdfr1ixaOL+2mTkS/rub5J809yY47uRxUgvKlPhXVXCj5ntfsWkYawWPkO0+EyuKm4wQtjZkN9szAf3A4fS5fFa1/GkjwsftM6yq7exhuBy3JdkdyzcBy8TjjB13SAhrgVDJQPAiuTLilSfpMY+9g/JQ2bjMyTJiid7pma4AtEfpYh8T4V57UHzdlDhlrxZ42xlshDOjWM1PxpEB7XPYj2ARAi7n/UfiKYBDIQ96kum/wBT1awddKtCKf8AcHN9/jH8bizPe94LXRwhG6KhpN6mtaGIYeZM2V+BmsEWVGfoF7DR1v210/Ui1YJbDnkx5BMwkFdxcCVBFSZtGvdp90NzsSPFmf8A+8YLkn6rfjVJnNehYZo4Z43wzxiSF4IkY+6g9K1Ta1Rg0moZ88d99oSdq8g6fGYXcTlPJilA/wBouvtPl4V9D1ewsi13R8z2+s6OVsyptyHP+t7i8enXRK7pPOiB4PKhXoVUDr+NMlo66QvBBeFJRPE0Ei2SuY0Ha3YVVNV8qcgKjmc47nqwA6aEihA0d95zjoGeaXQdKZDQ974QgfUOotrTkzVRW7a9u5hcR08/OiR8dDrpHSkf3TG1bC9/IUyVoeYYw1yyblN3OWx8KaG2fSPYL8V3anH/AKMN9vZ63MRN/VT418t2+X5HJ9r0UliUFegysHje8eRl7rYWten/ABWTMN0W3wW4Brpsm8aVP9Tmq+OVvJt4O97ZnEc7xsXH8MxuTzD3t/Rvxgf7bgQSS8DRKnrq1XNv4ldl0uopuXXHibicSz9e4Sy48DW5EmpcWtufOuNw7afJ6ClY9fgwLJ7M7k5A5nKY2A/9CXvmaXeklqk+kV9FXsUUJvU+Rv1cjbskU50bd213pIFwfShHj511HCJ3lx3lqjXatgn86RXgS9drQQFJBQBAE86AQ5sC7mi5F76U4JkSGvdM50gAYAAvRNVpFt6HCIGhzijgBZ9+nSnoTqCySxP2uAPqNtL1MlqrR33ImsVxPWyW+NEktNnjGfbaWo8opsieVJlrQ82OVsW8DY7duMoNx4XoiSuWuhtH20+424R8H3NKBI1GYec5yghLNcfKvG7XTj7qnv8AS7yf2WNgblxukcxws9FKiza8j+p7yhlN7u7UxXRZHL8FjtOWW73QBP7p6kedc+THJ048vhmM8hj5OU/fyUn6eNpR2ODdRZCK55g719CAy8vExQYsBgc4FLBb1dU3uNoi5MbPyldKPbYf6j6vGtZSFAw7CbE8PkPuO08qrlIQExTOB2xQoAAB6UQ1LRUhjXSzMIysXe1FaW2KDU1OxQPk4uMglWTaR9IsB5eNXyJSGHRY7QrYJC/8ov16miWN1ENifvtE/bod3j8Kp2Jgiu6UbHjBkZY8Alxdrbyro65xdnQpfJtVsLkQlVNd1GebkAC3cq2HU1cmQokgILE0AeJau03Ph0WgDisAHQm4TVPCgBlzz4enp1pwJs5vG7rRBMit6jVAqL40QORG4AKbg9fOiAkQXJdb+XjTEcLtytt4UAORQPlTVoPl0pOxSq2Hw4TYwXPO0J16+VZOxtWgVG0IPbaG6jdoazbNIFBo2gk7iNV0FElDgDnKbJqpsPwqZA80AgEhSNCSgoKSFAbimvmbNpDFhm4BxO4ak6C1AQeu76RvP4CgBRYE3Sv3O/pH7iKQ4FMEjyjPQ06HrSHB1IIgt3PGo+PnRqwOtjyJxb0RW0svgaJHA7thxyjldIbfA0tWPY80zS3/ANuPr5jypAiZwJQ1v9r+2wWdI65PwrKxqmWnjJHyHcwmCEBHSm8rgPCueyNkWnAyYmwO9t/swKj5j9b16jrXO0WTmG+Z8fsYTBiwBBJM+8hCahayaGRHN979u9tsdHBJ+q5QKrWn3HL5urSmG12Ra6Rk/Pd7cxzDnb5XY8Dl2wxn1O+Jr0cfXrU5r5myCjxJsj1ykxw9VutdDaRipZIQQsjVsEdwELj+yobNEhwwvI/uPDeqD/KgBLUAHttA3FHO+FApOPLS5N28/h+NMZ473AF59sJYeNIAnB4/L5CUQ4MDpHqhkK7B86TaQ4ZeeD+3wL2S8gfek/oRIwR5da5MmdLY1WJmi8b23DAga3YmlkHy+NcV8zZ0UxwWTFw8bHAIaLWITp1rBuTVIMdmsgajT5H4UggF/wCQL5iTr4UFRAazI/t7iq9PD4UhQNuDnn1BF0pQXIkQ/j1FOCHY4ccu+pS46jxqoJdh2HDPTQonkPjTSJkedG1g+Fl61UCBJmvehNkKEeNADEkjQC1tz0PWqQgDJzGwgj8xCg/40pjSI92Ywg3WQmw6CgcDbZp5JNzXKAl/Kglon8HkfbRj7JodDW9MkHLfGWbB5LdtU3IA8a7qXOG9IJ2DLVFOgQjTSuutzmaC9zXrtsev+VakQIku1FRen86ZJFchx0OTG6wDkTaP8a1jfGrGtbwZ/wAx20YnPlgbtd+wrXl5cLTPTxdhbFOypTC4xptc2zmnonWueDtq0yOdM9wIWxt4VSKG2wuJ1udE/ZQJiyxwsfp87GqIA8klgUElLW1FUgI6SZx+m5HXw8/OrExiQEgKTvOoWmmBTo+A3et4N9EsK7+ZxKkkpidvMYjjGg1Fk+fiazd2aLGiZh4aCJ4YGKXDw8PhWTszTiiYxcD+20IG6BQFJqHYoMfDHjAmbUj0WV34URIpHIMfMyQY4mCJgsXkK5DVqsGbuSuH2o4OEuQC+/1uub/GtJMuRaMficfjUka9rWjUORT4WFTAmyP5Tl8KFnuOa1pYvqBBHwWrSEUjk+7cKAmUu3lT6AfSgrVSEFJ5Tvid5PtHRdiaX1qlUHZIpvIdxz5DnGSQuJHjWioY2yEHkcjLMt0Q61oqmDvIEXvc8qSRrVmbZzVw6H+NMQvbfz61IxTYzawBAuaUlQPNYfyFb3BpSUkOtgVt9dEFS2WqhUeMSNA1v7xUtlqoTHExoKDe4ELUNmiUBTYjrIdrdUFS2VATBBJJ6MePd8rLUtwUkTeH23LM0Py3I0ojQv7Kytk+DauOdyz8f24RtjhxwQbbiNTpWDyHRXGWiPtQ4kRn5FojEabxIdiNPUA6isXedjox4nfYVmc5wfDzCLiYjyT3xFpa5qASGwLA1SUqq47W3PSp00lN3A7xvFdx9wzxHl85vFY2YWxxxH+17hYECMH5vjW6xpGGf2GDAvtXJkpj4HafExuzH40mcMfJ/QclNL6psWY2bL7WhbfU1sqM8Xsexz5VE8dNCZ5ni+RZyEBh5QQ4rmB8b/7bRFKwI0gJ9LutacUjxadlXq1Zak5F3DOMSL9NEJ8yWNzGyt0dMwXVguASNa0k894Fy10Q1DxvN8y4SZ7hiMa/3MZocd7FAUFNQui0obNHkpj21B/uL2PB3DwjJoWiXuDAj/tTADdIwD1MJ89RSvXQ9n0ntP8AHzcX/C3/AEKN2Bzj5GjhsqR7RCCImjUofU0+Yry81YPs/Z9Rcfy02NUw5hE0EhsUZuS71OKVgfPQTuLkxPaHRNMnjNLYD5GpkIH2udOpG6RqWH0s/GnJRXO4MZroiRYsUlsQQfNx/hUmtWZR3TwaxuzOOamVEdwLB6V1Rzjqta47xoFlJCYWaMhnqZtlaNsrVQNd1I8a6DBqCa4/kJMGVmTju+gglvUpSZFlJsfB83DzGAJWH+6Aj2GxFWnJyWrB3luOxOYwp8LK2vgmaWlrgtyEB8iK2x3dHJzZMauoPnLurtjL7X5E4WQAYnkuxpx9L2+B8xX0uHKslZPls+F47R4IVxKHaNpRHOJ/dW5zaBHoZG1+rkQ2U/OqMvJwSNLboSCp6p5UDgXuLx6Sb6A9D8DQIVGJnEGQKRqep+QpkuBcmQCTtajluwaJ/Chiqj3vW9anqfh/lRI4HYp2uaXF7Q03ANEidRY2ubsDRfqDZTVEMtvaPfOb2k52JEPd497gciB1wHEat8K5Oz1a5NfJ39Tu3xaeDTsX7l9lclE79eDG0N+iWMP+IBryX1MlXoe6u9iv/Ilu3+4O2ORcW8BHuay8hYwMDV0C1zZK3p/I7MWTHb+KJ7KyOOxIH5GfM2DFaLmQoCPDzrGidnCNr3VVLK9lfcTtbHxzLHlmZgJazGib63Hog8K611cjcnI+7jSMe7k4Tkuey8vuLiuIlwsFPcfA4I523Vwan4162LJWiVW5Z4GbDbI3ZVhFJlDmE+oHddT08q7jzYO7Xu2kgG4DVP7aBDxfts0Fxb9KWuackQMjYWP3OdvfYj8tI1mAd2MXI0SIdSOtTBqr/KPNAadrfVa5A0+VBDOCSYvJs0GzQdNvWmNIa9wlyuJLDoQoBNSVA667RYxsIsfFKqdCUtRBeQ9GPLmhL6KRSKS8mvfbv7pQsZFwPcsp3fRiZb73WzXHw8K8Xt9T+6p7/S7r0rY2RgP6YCzXKoTTab/tryGe9K8Gfd/djM5iJnI4DXMyWjdLEwoJB/P99YWr8HVgzcdzJ5caDFc+GKL+80pI0j1NI6EVzHo7qQOXAnlO/IkEMf1bG3daq5QJoXHgQgj22EN/+0Pl1WnyFAnKGNCAHlochTxWhNjgAZlze+GsjcYwAVOlW6oJ1HZMqdqn29+64CLfTpUwWht8uXJ9TmRAgI1Qq/KlsaQee10R/uZLQwC5bdD++iZCEVruoR+5iEF53scheEUg9PKvQ6z0Z5fc3RS+Ws2I/G3wrvqeXkI0SAWTS3kR8auDI4UJ3Er8fOgDheLkXpibGXPJKoFWmSJJuFuF1piOFxVb6W6igD2648enyoA5/DpSAdjglk/Kg86TZSq2HQ4LYyHEAjVx6LWbsb1oFNaW/SN3gSEA+FZyaJQONYnqJVL+VKRitpd0VNHEIKQxYaEsN3+o6AjwFSVB5p3Wad17k6KKAHNi6j+QoGeLrnaDIOg8D8KQxboxta+VxHg2gBYbJJaMbWCyInzpDOpHHddz/wCfnSGd2TyW0aPDxpbDSHfbgxwrjucOnWjVj2OF0+QHBnoj8dKNEEydbDFEbn3JPK4oCDz3tUbvW78rW3A+NKAD8B5Y5pku78kfQVFi6lkxcoMRsiyZLv8Abjb9IB8TXO0apkyecwuHi/V58rTkaxsCOI8mt6fGo4O2w3ZVKlznfvM8uHQYzv0XHn6tp/uPA8XefhXTj66rvqYPI/BWoseXIV0YLR1lf1+HjXTMGUNhkOLBG7+233ZdS86AiobKSCWsaz1SEucOg8qko895a1Qdq3KfUlNIBndI9x2guT6iutMlndjnXcVYbkUxQEYuLk5cjcfBgdLM4oGsBJ+dS2lqy9y9cF9tMrI2T8sVQj/27D0P9Tv5VyX7MbGtcbZpPG9rYuFGI4omxsYfpAT9tcF8rZ0VpBMNx4MYelPBTWMm0Hfdcu1ouBp5UpGkNOzNrSSfWVoLgByMx8rwGhXIg+ApjSH8Z3r9QXTaR40hMmIlsUXz8aDNhjGtK3RbjxCVSIY6GglNpCrcUyR1sTCFddVU/DxqkhSMz5kcVmgAG5AtQCAHZ/uOtovXWqHA2XySAk2aDr4GlAgPI2xtLuoVB/KgZWM7LlkeWtS+jj0q0y0OY+M4NSQqT16r51LYiRhYGKXXIuE87UiWdke7dYgPFwaoUBGNyj4XbJHK1fqGtaVvBlfHJZ8LlmyNCuKH6TXdS8nBfHBNwcgDYnaR/HwrqrkON1JFmUxw2kgOT410TJnB1yaNKp0qiQHMxI8lu13VQSKm1ZRVbQUDuLtj3XOcwbX/AJXDoOteblwwejgzlIl46bFkMU9nfld0NcWqPRV0zgj2ogFhbremAh4aB/V0HktBILNAHN2+PXraqTAi5cT1EhpaSdQUFXIA742xKHDqU8VpgEnAUEsjQAofE+JU1tJmSGLxcs0g3jWwtYg9fGlIpSJdvBMij97Jc2CMWWX0/s1NTuS7CZoWys9vAYTHYOmcEaCerR/Ota1M+bH8TgmxndOjjqXkqT8602IdiXGRicfCBjBociOcSqE6kClBJGZncbMOIgytYEQEnU+VUlIQU3me/wBschMcjpJNqbidSKtUGUPl+8svLLxJIoJs06VqqkuyKpl8zJJ9T9x6BbVoqmVshFSZkrySD6T0GtaKqMHeQdyv1JPiU8Ksg9tSx0GppAda0koiHrSkYtsWnQdOhSlI4HmxkogVKmSoHo4AhKE6EIKUlqoUzHNlRPCo5GiqExRC2xvz/jUtlwPCFoPrcqXTxqZKgMx8TIyT/ZYQDZSEC+dQ7JFqrZP4HbBcWyZbjuOgTX5VlbIbVxlxweBcyATMx9kYFnuaUt4IK53eTqx4uThE9i4nb2JiMz87I3vEm12KwLLt8QNBWf3Nwjvr07TA03E5Xls2KXg8WZr4UEexdp2lWvLjYW1FbUxna74OvX/kaLS37e8pm5DuS57L93JeARjtcXDz3ONvwreuE8DP+wY66Yl/qD8TEP8Ah5uT4DBgx+a4zNe0xt9X6iGIo9ri64ULWqrB5XZ7V7ZIyN8bIO5fF433crFzJD/x/LuhyoIQf72HnEbg5rtADTg463tChfx/6oM/47JzsPlHwsZic9KI45skDdHksjA2OcdCSNaqJOX8qVlOtRTcKGCMszcn9XLO1gyoI7gho9JB1HhakkS7t7KEWBhw4o4smKIY4naAAmx+mhHjatdDhavZgo5bImJbxcDpXAFJHqAJGm7XDzHWk2aLCq7k9E7MdDHNLC6CQgF7bWd4LTTTM7Ua22ML+6/bXIdscrH3jwAc3EkeDnMb9Mcv9RTQO61z3pO5+j/r3s1mxvBkevgt3Y/dOP3NgfrIR7WREgyWOO9wd5DwNeVkpwcM07nVeC30NBxJ42hsm1XOuDLc/wD01kcBJjIO3c5yBB9drHwaKYEVyrHTRq8khwKbrJ8GikyqspmXFCd8ZaZHsuA7T5NoLKBz/HTYszs/EAJaf7zB9JYdU/yrfHf5C1dBvGmbNGJIDu3BAUQjxCGtWc7RY+A5SXjsmKZji6N31sXzSknBnesmsY2Rj5GLHNCj2yBSW3RTWqZxNQQ/dfbuN3Vx7uPnRsqb4ZUux40rqwZnjtJy9jAslfqfOvLcbncRny8XlxFssLiA4izhpuHka+jpdXUo+VvjdHDB2RSbdxvGdRWhk2eYAFMQ3Bwueq0wHVRqPbcjy/bQKDjSjw6M9L+K0yYGg5pcSvqFwPLypDaHXAhC7ToOtBIiFnuPIkVLH5jyoGwoSo1rXNIWzSP41ZnB1zywlRuB1+PnQCUnS5r4nbEJH1jp8KYohn0b9scXDx+zcCWGMB+Qrp3tHq3L1+VfM9yzeTU+x6FUsehFd29pdxd387Ix+QMbgccBkKEq7xKVthzUxU+pzdjrZMuTeKkzwXZ/ZvamKZ8hrHPYhOVkuuHDqF0+VZ37OTLojWnVxYVqA8n9xsQmTC7cxTyuYPSDG1Ymh3UgVWPq23s4Jy92r+2ilmYdw9jdyNZk9wTYrWiQmWXGi1Y12rtvlXp4uzSeEnjZupkh2gokgTQFzmuG3/HjXccCHXvJZva7a59nA9PnSJEAuIDt3pPyNASdZ6XruVbBbXPhTB2HmC3tgDcT6vFNUoIkEnhXVy3UEWtSg0Vjrow0N3BT+BHmKByNySEvcw2Z0J8D0NIaXkaMbg5A1Eujbg/A0FSKLWHaXNJAQh3UOoBWZrX22+5b8dzOA7hyCICjcbKdcNHRrj4V4/b6k/dU97p9yFxsbQ/25B7YeHRyAOa4XamoIPUV4rR761Kj3T2RByol5PjC2LNajpgE/u2uvnWN6SdOHNGjMunw3xSPaINs8ZIcXKCD1rk/qejMqUDvxBKwe9IQ0+pzWaL00okAN+JhwOMm1oDbgu9TreFOWxoich5zpCcWBzwhAefS0fHxrVaLUIGhx8mOQZsgh5RdoKD4UcpKQ27ExGuc6WfcBe2q/KjkWjsbmOf7eJjoDrLJ1PTWkOCv96Zj3Tcex8ocWB4IaAgK13dVaM8zuPVFI5gFpiBAUgkfOvRqeXkI1GlBusLEHwqzERI4MsPHWmhNjX1WJSmRInQaXPUUCPLZdEoCRPzUjQfzoCR2PHkkKgW6notJs0VWw2LDY1HEKeprN2NFSAtjQiAL4nQVnJskO7UADgqrbQUpGKGgJPp6LYUhi9gsfqI/MdKUjSOggG3qIF/AfKkUKDC+xVymw0FIBQIb6dX9GiwoAUIyRvkKMOrelAxbd5G2BuxCCXUhnQ1kRJPrf/D4UDgcEU0xBXZGbIKmYHA7sggCOu89danVjiBO/InVrAGtPXRQfOmBxkccZ0Msq+HpokcC3uItIVT6YmWoQCTuAV5Ecf8ASNT5UwORoVbAE8XuAtSAdhmZA4kH3JSLu1ANJoE4HH83LCDHjj+6Qhdqb3oWP5B5CP2zZMnuTkyynp4VrojPVhcOFG1wdkkvl1EYsB8alspVDntVPcIawfkFqiShJHpQD22KqaUFCGv3K2IWNtx1+VBJ7YwFpP139J60wgUxssr2wQMLnOO1jGAlzj4ACk2gNE7Y+0fL8oGZXMLg4jkPsp/fc0//AJIrkv2UtEaLG2axw3ZvF8JA2HEgEberzdziOpPWuG+V2OquNIkZIYoAjWjxt++sZNEgGWctd6T/ABFJsoFllJUuN0U+FA4GJJkX9pHSmUgSR75XFrFcthTKCMXEkkJNz+IpEtkjFjhiNGvn5UENhzTtCAXRfCqJkIheXAG+7pZP8CghhHuMjaC5yAadapIkGn5Cxa30g9elORpETkvlkdtapafxpFIdxMQgB0pvoCf40E2YXI5kQIJXxC9aqSERGZI+ZyN+gJ86mTQBbhxqXEeptxfX4fCiRnZJGxjaFDuhF6ENIZ91xRbeINMcChINqhDovWgmBjc17l1KkeSUDSCsXNfjlCVYNRdQKut2jK9EyxYXJDaAT6VUp4V3UyJnnXxNEzj8nsABILTYP8/Oumt2jktUl8fOY8I5yr1GqV01vJi6wEa3Bt0IulaEMHmiZIxHtDm6AnWk1IJwVfl+BjmaUaqfj/gVxZcJ14szTKFyGBNgvJeCYxo4Dp5157q0z1aXViMcigC41vZT0oKEsbvBRQ7XX+FMQp+KXI7U+OgtTRJFZuE5o2uCtBVRpVIEzRcHtEubvyAgalmp00UmtGc7uw7lMLE4Xi5suGMGVjf7anbud0G43T4U61lmfKSlwjK54uysppEW0HYCoaR0HjXQ0qgEmcY6sddjUBA6p4ihAQ8/cEMHuPkkDWtJLFNzVwTBUeY74jaXHEcS86ucVP4VSoElE5Lueedx3ykuuSpU+WtbVqS7lcn5SR5IBJKISa04mNrgUk8kjvU9T1Aq0jJsbKnUIaYjm0C5umn+VAhTWAjVOnTrSkqBYiIF7kWTWlI4HWxEnRPKpkpVH48fc5UJHna9JstVCWY4ChxVNAKhsviEMiUowBnitRJaQ62KMON1eemtTJSRI4vF5uYAGRlsZ/b5VLskVWrZYOP7XjYQ6Y7n+ACn8KyeQ2rQteBwbi7ZHGImrYnWsHY1SRZcLgWRBpkuernCsXeS0NZ3NZOFJkcCycHGym+7hR6bZmfUw+KiropUnd07Vrk1Ffbdnb/McpkYvPsD+UHrw4XFI3gfU1BqRrXbRePA/e58/XrOPY2jGOFiMLGBkLWNLjGxGo3VUrpSSPzu+S+RzZtkY/uOLLkEXGxnKE7HiOQWaJG6NcOlPkUuu/7tCAg7d5Odj3thjwJZ5DI4McQGr9QIbqXVCqdNuzRNeYCsXGxYcgRjDfkBiwyiYKImi7UB6LSgh2cTMHMidzYonZzw6Qh0bP06hj72b4AiqM1WXCC8TByMjEjk4yEQZBcWyMI9SdCp6XpMF/LXUloe24Yvak53NDXkJGyQgEyaoANfKsrZEjsxdbJf+K0JThuR4d2a3j8DFfKwtc92SWoz3WlC13g4Vn+Vs77dD8deTLFLjtlaWOYrXBNraUtMxtRWUFa5rt/HysXI4/LiE/HZTDHI117Efwrp/kjzVz6+RXp4PmLM4vmPtR3htbM88ZK5YZAfTNjk9U/M1a5stOSP1fqdinsetP8AcjcuI5PFy8eHLxn745Wh7Cw7nFdQT0ry4jc+fyY3Szq/BPx5bWAP27CdXH1OK0jAYzJjKCQLm203K/CgaUFRycKZ2S6RxMdjc6J8OlJstA+XhYzog4D3XC3l/n8qhMpMo+dhu4zLM+3ZiPd/cjaPp/1CuylpRneodCIiBICDuCtRS0+dUc5ae3OekwZWY8oJgeLeAppmV6SaRC6GSGPJY4BRdyePStUczlFK+4XZ7O4cA5WG0R8pAFheNX+LTXodXsOjh7HmdzrLIpMCezKhlkxsiP25oztkjNiCPGvfraVJ85enHc8JWsQAekFKsiBB9vYXgncehU0gOskeVICnW/jTE0Nq9pB1OqeBNIBTy97g16obeaUwhIcijIem4lv5XHr86Ym9D294Lmbl2H8KBQOxTALuci2IOiCgloX7gUkEBp/wKAg0v7YfcKDgV4TlnJx8rlx3m+x1eZ3Ou7/dU9jo9pU+22xtsGU3Kx3S48jCJh/blZdAdDXhxxeqPok1ZaMzrnOwOf5rKEnIcy5+I9yBoahDfBBavRx9qlVotTysnTvd6sne2OzMDtYvfhkzZcrUdI83IF0Fc+ftWy6M6et064dfIfzvL5eFjyQ4vGu5CUsKt0CHUedZ4qJvVwa5rNV0UnzpzeBycGZPlZuHJhxSvL9jWf2wDqAlfS48lWoTPksuOyctEXIpYjRc6rW7Oau4xucx4a22tlW3hUljxkY2NqhSvzANOSeLGd8jwrdzls0+ApFaC4/QSCQqXcVNNCsdd6iHrZNdaYkByCfIJD3FpUhqeFZs3q0hMZMRDGv3OQhHHoaEFlOo4XKNnuAF3j40yY+h6djY2tLXg7vD0pSZVW5NU+2v3Hfhy4/Bc7LvxnJHj5Mh/wBseBPhXk9vqz91T2+n3I+25uW5jh6QCwgEPYVDh4rXinvJzqird19rjkInZ2EwfrQPpNg49FrC9JOrFkddGZhkcVmCUjNcYZG2fC0Il9K5LaHpJprQByMSDHJa1o3AWL7n40KRjJc1rQyGMyOIIBAt4m5pFAGRA+ZTPJ7cafS3UirmNgQOXYeO0x48ano9FK/DrTUsqAN4yJVY92yI6hwunkBer0QFQ7zibFk4TCrWhhLV+Neh1X9rPL7n8kVHm3kyxkIEFvnXoUPLyvUizK5b9AhPlWkGEje5yXA8qCZOKg0XwNAjjb/CgBxkEkigCx08B50pLVWwyLCaELhvI1PSodjatAvY0JtA8LWCedZs1SgcQoi+aedQULAJB0QauPSgaFhpW2vUnS9IcChdUG5+i9ADSHAoNL18egFh4CgYoBrSgO5wKbUtSCBzY515D7bddq3pSOBTGlythbY6uNBSFOaxhJlcXuI08xUjgW1k0+jSyMftokB1scMC+5d3VdbUtWNHPclnT2gWxjrREblPU82KGJ3rJklJJA8/OgGKc6yv9IF2xN60hHv7oBUey3y1NMBIDr+y2/5pHCkNiXCNjjvPuuGg+PSmQNOLtvrOyMX2t/dVJCkQ1s86DHbtYfqearYQXDhCMEhHAfU82HyJ1qXYpVCY7f7QAb/9p5ipKHmkXMQVwu55pDkTv9StG5+m7UBKBCSPUspVx0B0tQBwyHUI0dCdfAUwL72l9pO5O5zHk5EJ4zi3If1eS073j/RHY/M1zXz1WxpWjZunbf237c7UjDsWETZhHrzpgHzFPDoPlXBfLa250KsFge2ONUb0v1tWEmkEdlTBrSibksB+FIpIi3xyTFUQWSiAkFkxQ0FDp+alBUgMkaBEA6pqvnTGBOhe5wAaVCqPL+VOSpJHE4xULwQSLjX8aCHYl4MZsbVA0sSDVJGLZ32wlrKCp8UoYHPasiKeoogJHHuEDTuXcNPLxqkiZkhs3kS4ljXDwQHxpM0g5jl0jd7yQLEg/uoQPQMBgHqciD94pknf1DXFGm2hpMUA7vWPVdyomiikAO+MNKk2VEoKQw9qkhtgRf40FIHlZtVpu42/jTRQG5Og3DzF6YxCEt0ICA/GgR4h5NhfqutBI61ASRr+9acEnTkPiKtspuvwqloS6ySeJyLjq47bWPhXVTIcWTES2NybonqqtNiNCF0vXVW0HDehYcLk2vABIIdYha6qXTOZ1JP0vQscqaofnWpEDD2Arb0kXGooCSC5Xho8hrnRgFRofDzrnyYk9Tox5YKFyXAvx3uLBuYt2jofKvNtR1PSx5ZI7ahFkHUdEqDU656IEUJc/GqAFyJGNYdx3BOtNAaXzHcmLxsb2mRpySDsbY/v0retZOBsyzmO6p+WnByZgsbrQqjf8JXUqxsNCsnvfBwcTYx7W7WpsaiuqeDZRRub7+95rhAjAhUhVT41tXGK1kUbO7jyckkNJLSdLmteJm7kRNPkylXO2/1eN6uDJ2YM4NDr3spJ8aaIG06G9/wpkiUNglz/AE0BB0MBvZCbrQ2NIW1iuCDcToKUlQOtgJN9fDpUyUqhcWGTdw2jxFS7Fqo83HjYNNxCVEmkBLYjY2DfAeHWpkqB2OEueGxsLnaAD9lKSoJnA7X5PPkTYWtP9IUp4VnbIqo0rjbLRB2a7i3xx5OO73ZG72bggI+NYfl5bGlaQ4LBh8FI5o3NEY/pb0+dZO5okixYPBQRAODQosHE6+V6ydg1RKw48MRIawKv1dP21ElpBJMbWlzj7rh+UIGp8TUlJGe90NOTmibHH92E72Bnl5munG/AWXkq+d+u4fLxe4eM3Mex4ka5q+mTqCmi110fg+jwuvdwvHbc+g+2cTA72x8Lu5sroZJIxFl47HI0StCEEeddNFJ+bdzHfqXeJr+jLa6PiuKxgIGNhjjAG8NT8UrXRHl2s7eZItnIZOeJ4+PA/UxDdGXt9DgKUk/jaepzF4nlpcoZUsu2I3ewrdpH0kHwNQ2kdFaOyhIPxeKwImy/TMYnl7oWkWeQvyrntlk7sfTtP3MZGRyWYyP/AIuEYTUIldIELSvUnWsXZs9bHhxY9zmVBxWJKZOVmPKZjB72PAu4h8d/T0W9QdtLXelVxRNcRyD5ZGyjCGPx0zA9jiNj2vOoeKqqOPPxqv5akjkcmI3bYyXF3hoPnXTXG2ePfspbETn8wIo9+XI2OLq5yBoPxrVJVOK+W+RwZh9xP+D7y49/C47XScvjn3cadgH9vzH9TDoUqL28nvemzZenlV/7WZ99tO5MjhuSl7X5V3sP9xzYw8ptkHQL41w58f8Acj7/AL+GnYx/lobXEY2IJ5QFub6/DrXEfKyPmVjU9pquNg54T9n86RRD8mwF+579zurRdP4UikRrnkhwiar23Ab6iR1vSgaApO3sjkGuc8BsT7P10+NWrQJ2RAv4eTiH/pSv6VzyYXu1afD4Vsryc7FB72Sljjt2hN3QrpVSJl37S5uNg/4/LfujKbD4f51dWYXqXPbEW72lWrZhuvnWpzsy77o9njLMnP8ADwrkRM/9zC0XeB1tXr9Psx9rPE7vVn7kYuyR0jS1zSHDVpsQPCvYPEag6BdSg/1CwTzoA4GlVBUdUoGcdMIyLKfE/spyRApkj3EE+kBV6mgbWh5+SjkVWm1tP8qJJVTwLdp2Jcr5k0xtCghs6/TcPGgJFLsLRtUqi+NMmB1z3tJLHA6Ilz/lQSTXG9289xLf/aZsjQD6WglLdErG2Glt0dFM96bMmnfdHu+UNgbkOdK4jbtCk+QrnfUxnVXuZWbN2d3IOVxoYcyJ2NyrGLLDIELx/UFrxs+Hi9Nj3utmd1ruK7n7jyu3MYckzGGZgNVsxW7QbLalgxLI4kOzmeJTGgngeX4LvfjnSxRMkib6J4HtBIOll8aeSl8NoDHkpnrsY59xe02dr8m2XDJ/4/M3OiZ/Q5pu39te31M7yV13R873essdtNiltLbucgACgGuw89oaa4ncgXcbL0oGJdKQjW2A1FDGqjjHRhWkkgWIH76ciaPMkZ9Rag0S+lMTQ3IXE7gjVHXUDSpLQiR8cYaGgOk0AIt+NIcMT7TpNziPULuPX5UBMCHbCgcBu63WgpSNby2/qBH0kaIKktGp/bv7pHixFwfOyvkxpXBuNmOuYy7xXpXk9rqz91dz2un22vttsbp+ra9sL4HiWF92SC4IN1rxdT3Z5akR3T2+zlGnIxnCPKaFuB6x1FZZKSdGLLxcGW5uDHjyuEzHGdhvu1JHxrhco9Or8kfN+qLXMhi9uMjV3pKHrehFkdJgSEHe4ud12aL8TVcgQy3j52jexoYCPw/8xqpKkZfhL/dksRZRonm49KaYyh9/BrcrCe36PbIQfTY6CvT6ezPJ7u6KRyjw723BSEKeVehQ8vKRnTQnxrQwg81rtOnnagUC2ROePSpTxpNlqshcWG0XeFIRR0tUOxsqBQY1rbaqnkKzbLSgXtKW0HXpr0pFi2tK7kS/XSk2A62M7h6bnU9KmSoF7UdtA3H+npSGhftOKt1K+lookqBftNYEfr1Y3xHjSkYtsUzgrv7cfl1pSOBbA0I2Fu5wsXHxpDFOiY1HzO3O6AUpHApgmmVrBsYdbXNJjgeGPDjkulILuhIX9hpS2Akzyy+mAI0JZEtRHyM9+nZH6p3bpDo3W2tKQiBb3IOkcZ6D6qY2JDHm7B7bTdz3XcSaQNHm7B6Yh7kh1eaAg69jGgOnO+TUN6rQDQiSc7S5ztkY0YLG9NIhsG3yyuLMVhB0VNVrWII3C4eOjaQ6dxlk6sB9ITzqHYtVC3NbGNiJ/TG3yN1qSthDwV2PuukYsB8aYhMhcPS70powIh8aaEeIkMZK7Fu2kMdaSGn2xtYPzfxpAWntH7ddz94yrxeKY8In+5yOQrIW+Jb/AFH4VlfMql1o2b72h9nu2e1RHk5TRy3Ltv8AqshoLGEf/Zs0HzrgyZrWOitEi9SyBhCBP41zNmqQFJPucRc/zqGy1Ujsh7ioXWwA/bUjGW4rpSHv0HStEQ7HJGsjYjrpZOiVRMgD0etrGpZcjDsMuFjpdQaQSeZhsbchTqP+tNIh2DWR7VGiaeHzqoIkWFQJ11PwqkiZFBiogsQCvmetOBSNzyMiahIRbpQC1IPLziSQxykWSkbJAMcNzLKh6p4UoKkffkojV2+QFDJPMfI64KAaAXFIBxjxoL+Q0vTAW6RQGj/OkCQlwAadx+WpoGCyygubt6r5p50ACPc96blINlNNFSIEakAeCoLH5UQEi2xKi2cVPzFMgU6MAE/m0B1VKAB3scqKiFPIVQHPYKodQVb4UCkdjj2kO023+VPYhuQlmQdSEPUj99dNLwct8YZBmviKxnpcV0Vfwcdqln4/lvcRo6pub1WuulzmtWCZZK2VpcxyW9Q61uZQIey24qAT+NAiNzePinDkHqN/itZ3orGlLwyk8vwb43GRjUI6DQ152TE0ejiyJlQy8v8ATrGfS5pQhKySOohMnLdKUZobnw/CtIGkD/cHI7j43lZHujfPjue728hgJaW9F8K7cTq0cVl8FGY3uLkHPfj4srnO/OWloPXU1vyqiIY1L2/ysg9zMlbGT+Rqud/Kl+RD4MAl4uCIHcS9y9dVquRLqAZBjYEFugCXWrM2AP19R+fWmZsZIKoRp1piOBm5fAeFEjgW2FxTY30mw8vGlI+I83FCoQDr8KmS1UJGM0hHflvbwqXY04j8bA2zGgg6pUyCQ+3HJ+oEdQOlRJcB2Lx2TkuDIIyVKAgJek3BaqWPE7JzThDksxpZgh4jMjvQwPOgJNZ852Na0lwHM5LtDt7JEU3/AL8hpUQENYHeBcb0cL2NLVVQHJ+4vKTvfFwMDcGNw2eho3IP9R60Wx0S+4MfLwGcF3FzbJ/e5Sc5UZajQ+4b51xWdFojseJtT5LngdwQyXa4OkA+kEAL1tQ8bMVBL4meJSC4l276Wjp41k0XARNlAu9v6gEJA0AH8amBjX6kEo9ytB/2wUaR4LTgCM5WFspMjxtj/oYNapMTIPBONHJLxWYgw8on2nO1Dz4+VdBpgzPBkVlsP9nd1ZXYfdDuK5GVeHzC2OdoNml30yD+NdWO2knd7vpV7eD8tP5H0GwY+e0QvcHQTAXWxBvY9VrpdtJPzHHVu0eSYx+OwsSIMibo3aD59K5XkZ61MK3epDy8VzXIwBuflbWbyojG1WNPpQ9CmtYtNnr1yY6bIRPB/wAEYjh47sibIGx8pKm30r/OlA1f8n8nEDU+HmzEzZ2X7cT9MdnnqLVSq2Z37WPH4ljE8uDxkbZcLBfIQfqHqeotuU1p+M4Ld213Elab3f3Dy+Nm5PDmNkvHSubNxs7f7h23AJ6bhpWiUbGd8arZVv8A3eRnj/uC7lsaJ0bP0+VmhwxJJQsTMiOz4n+ZOlN3ZNuiqvXx/wBiJzM7KzsQyc5niHFc4u/ulrH42VGSqD80bqzdjsphqrf8dZ/+Sr8p9wOKw/0Z4yH9VyuASyLLadkbmHUEAqQvjQ5Pc6vpMuRvk4rbwZj3DzPIc3zMvMTR7M553OELUALTraqShan2fW6q62PgtUbR9vO8Yuf4oQ5Tv/xnigNk3FC4CwPia87LjdWfMd3B+O0rZl9OUJ2NYxqr+XRq+KamsGjz0wj/AIwPa0SHeB+QC1/8daSQncLxuHAavtiJnUk3t5UQS7hIwo2M9X0t/MfS3/OhikguV47GzYHQsidOPE+lrU+N6ScDSKFPBNHkuxclw9yOzHJ6SDoh8q3qxMU2bY4FS0tICt8qoku/b3chyQ3FnT3GhN5sT51pVnPesFiD3zAgoWOBCEarWqOdqdzEvuV2Y/hJjzfHMLsGVx99rblr/FB08a93qdnmoZ4Ha6sOUZ21wez12DvUo0+VekeU5Q2Xu3q0gAaJrSKSHVQLodV8VpkwNu2mNWhT0oGIDECpYlQAaQxTSXEAhHap1vTQMfbNtVjyrT0PXzpmbqOj23WDgUGlylMhaCWye0qXLuh8KJgfGTrZfc2tdY+FOZE1Bqv2fl4WSbIxMqGOTkF3QSyIpToF0ryu8rpfa9D2Oh+P+5amkd0cXPJhHkuKYvM4pD4dliU6fwrzMNk3Ftj189GlNdzJef5Xv7uFwwJ8CRkJHqhY1GnzJr18VMOPVM8XNbNl0g0L7W9r5nbWNJLyXoyMpCIh+UD+NcHczrI0kel0eu8allW+8XJv5HLxcDBgfLHhq6WRrCfU7zHlXV0K8U2zi9jNmkkZS9hYdrwWn+hzSD+2vWTTPFaa3EMJdIWgIg+dNEvYb9JKFu5bAhb0itTo2lm1AE/hQBwOAUE7Vv8A5UD3ESSuO9pOtgU+dIaqNtdYNACEWJ60FM9tkUhh2kqEHj5UEA0hcwlrgSCF3CpNlAtpeGAueoOooHoNyvcoDQE6eVJlVNP+3H3Ql4qaLhedcX8UfRFKdYyf215Xa6vLWp63W7Tpo9jc4nnI25ET2yY6bo3gqrToRXitRoe6mmpQBznb8HKYwmgcI81v5gNQOlZXpJ0YsrqygZPD5EcpZlel4sGn1PI61wvQ9JXT1GH4MMZDtinX1m1ilhSZUjbuOmn9BIDG6uk9LU8gKQ0weXjoANxDpi35NH8KaY0yid/cLNncY2aOMCXGJMQTaA02I81rv62Tizj7NOSMYy/dDhFIPp1bXto8O/1BwHOKNB3fsFMhahEeIX+p1yt/BKl2NVQMjiAPpaqXtoPjWbZaQ6IZHWfqL+A/ZU8ilUW3HJOikanoKnkVxHm46k23O18hSkriKDGgof7kljtbSkcCxE9xIcfgxvQUpHA4McNQvKNugGtKSkh1rXuCMG1o6nVDSkqBTGxxuRoL3+IoGkKdCvqmcGtOoF6mRwca5zj7eOwJ/VpamA83F2N35BuOnhUyEHHzkuEeO1B/Ul6UfIzv6Zqe7kOK6odacgxZejEYBHGNXHrSBDQBc7+0P/FI7WmAn+0xyg+7L4+dACyJC3fkEMA0At5UANPmABbCNkYRXdapVJ5DAmU7IAXyarrVwS2EQ8a9x35J3P19sdKl2GqkgyOOJm30xs6MA9SfGobZaSR4biDt9EfQ9aUDGy0AOEdk+qV38KsliWvLQkAKEIZTc3oA6GxtsBueqknxpCJztztDn+68oYnDYT8mQFJJiNsEfm95sPhWd8ipuaVpJvPZ/wBjOB4YxZvcsg5fkGEFuO1W4jHC+mrj8a4b9h20RsqJGpxGKJjYYWtjgYA1kbGgNaBoABXO2aQekeSCAfUNT/jSkwQHNHucvQ286zaLTB/07nn0hADZaXEbsMy4wZuJ8bk1SQpkZJDU2gAqg+FORQCPic8lxJI108KncNhkY5bdwKdSBTgUi3x7WlNG6W8aokQEALnC17+elECYtA0KENgiVRJ5iEKltQnlQhDb52hUcnnVBBFZ2QXNc1pUr06UmaVRDyPhgJkkQOJQm60FDEmZ7gIYfSKQ4FwgkFTrYrclaBBTXI0q5OlvKkwPbkDUKBVHwpDg77zR6VKrcA02BySYEkXBI/d4UhoFc1qXHxTT5UDgQRZA5NNf8qaBnWpdLHqP86ZAsOaHjb0Xd8aAOlCbanU0CPe00ElzbjqBVEydc0NAKD5dVpomRl7nbbhXL+yqENFpIcpIUadaAeo60uaVPRP22Fa1vBjegbBM9jw4IOoIN66VZM471gsXG8q4oHHa8AW8a6aXOZ0LBFOydqiznag9R5V0pyYNHHRp6SFHhpTEC5OJHkRlr27ih9Q/ZSspKraGZz3R2o6RxeAQ8C0jevxrivig78WcoUuDJhy7Jmo8XW4BrnTPQVky8Zrm5bXCVola03LrNoRkiC5CNjmkEgxom1vpYo8Uq0KSm8zk4+wxtcC5ttrbftroqjNsomfkF7nAANb5G6eddKMLMhZApQCx8asygHERJ1WnJPEUMchS5AKUlKo6zHaqtBPQnpUuxfEd9tumiap/ClI4HmQyOs1pQ9dCtTKKgLi46RzQoVf8WqZK4smuP7az88sZBC5xefTYrfwqLXSNVQlsbhOIwJJBzmU2B8P1BwVxI6ADwqZs9joWKNWCyd+cfw07H8PitnfC/eyWcKCBoC2tFhb3C16pAPOfcDuTuqCTj5HCHjppPedjRDbHv8aFWlDGtW3KREYfEbkdOS5x0HRawydj4OvHh+Sbx8NrAC1liEUCuG12zurRIPZiuQP0+Glc7sb8RvLx58V7cuA+2qAp/jrXodfKrKGeVnxurkk+P7j5HDaPdZ7kS/7jbOA1ra2JMxV2W/jebxs+FEIXVpsSTXLajRsrSSLombGiRI41UAaj41kaITMS6MxwoAiKP86SKgqmdiN3PEbSSD6XaAO1F63q9TO9SH7hwJOTwYOXjbuyYf7OU0XIS4K100cOD1/W9ha47GqfZ3u1/Ncb/wAHyEy8jx4Hsl13SQ//AMtdVH4PkPfett18nOv8WbXgZHvDZK4bm2BPVKi+M8rB2J3HMnkMaEkByybbMXw61Cxs3t2a1RD5HIvDTJI4Njd1UAa+daKkHFfs2sVfme6IMV78OPc/kNpcyBgO4tbclpNigobgvHgtfVlf/wDlmfkZUE+A33uPlYHQHQueCj2SDUJSbOxdWrTT3Kz3R3Bg8b3O/kcDLOLLkQe1mx46PMlluNFHjUzKPQ63Wvkx8Wv6FdZzvJy4T8PiMaPD46J3vPmmIMoe8rv+JrO1l/U9XF6/7uVnJCZ8kOazIjnkyOTz8geiZriQ13n0pS19Eezix1xvRQRmJwMWJtfzOSIipBj6hBY0WyfCPUpna2Jkd98RxuG3D4jj4/1LVbLmSDdvbpoay/BZuWyeNruWyp8R3JNwPOx8vG3WTdNG2zSxx9VdNsfJQcXcsnoz617ekwOX47F5LGkb+myWB7UNyuoPwNebxhwz5W8pwWqJuJEQRtJTXqTVQiJbFTPVu4AMCfW7UHyFZstEXNELO9T3g2fIUC+TazZqmMPgfJZ3qPibBPhUjkr/ADvAtyml7U96P1RhouvSqWgmU2Rjo5HxyMaJ26gXK1uS0Ijmmx52ytBbt66VSZLRoXbnOw52O1jykjfGymtUzmtSGH57cfNjfivY18M4Ie1wVfOtK2hyjG9FZQz58717Qf27ybnAH/jp3bopUQNJP0/Cvo+tmWRfU+Z7OB43oVhwhVxsdyIT4V1nGI9Abtc6/wCNAI9uDUHX8BSHApjmkjonU/upknDMC5ABu6/GiQgQ+RxI2hfEeIpSNIdZNEGgNBUi41pyTxOHa4+20+q274HW9BSQoEMagcoHitBI9g5s+HO3Iw5nxztKxubYqKThqCk2nKNM4D7y8hiwsw+Uxv1UoKe80ne7415WXpJuUeti7rWjNU4HuFvLRslZgPg9y7nyWP7q87JjdfJ6uLJz8Fgfkw4Tn5OTMxsTBfcQLVgk3sbWsqrUpXJfcDsiLLcBLG66uIYCFrtr18rWiOK3Zw+Q53Hdnd24DpI4IZ2P1ewASAnRRUfky4nqU8OLNXQxHvrs+TtLkGyMJfx2Sf7Tzq0/0mva63ZWVfU8Hs9V43oVMTFqo1R0HSuw4+I2ZBbabrobJSHB0l+8OcQSTYfGmA2QD6XD0qqr+FIfg6SGmx3dNptTA8SrnFxLQionWkKBJkafW4gABEHj4USCQ1vDgqEKPTapk0iDrSwgK0tdp+HnRI4CeM4fk+byhBxmK+YrdzR6R8TWN71rub48Ts4R9D9h8Vzfb3HswOWyvf8AcG9kevtl2gBrwOzkre32n0XVx2ovuLHyOU3CidLPMyCIfW57gES9cbZ2FA5v7ldjxEsnynPyV2OmiunzqLYrWN8eTiSkcWHJjsyMZu+CZokjkku47goQVwNawd6tIl2M97SHDduCoRb8BUwUmMy4rQ5HfUPygA2+GgqkPkQPPYkb8X23DfM/6Yx6j86ujhk7mR8x2M/Ie/IfEMdFKOCW/nXpU7MaHJkwJsqMvEjGc6ONnuOBTd+UfOupZJOT8fE8zCeSFCtHTQU+Y+IpuPq0NUA9AjR8TUyPiOhjQQELneA0ApSECtjGpvKr+Vui0SEHdhdYjYD0GpokcDghY1vq9Hw+pPOpkqBQa54LYRt6btCfnSkZ3bEw3PuSAXGoU3oAc9kShZne2wai4+VKRweBY07cdiD+qlIxbcRTumJQ9OlElJHH5DGf2sYK7QWpJAcbBI4+5kvQfh8qck8R1jkBETQ1oQ7zapGNmRu87B70i/WbtpgckLFBlJkkOjRoPCmB18b3t3E+2wX8LeBFAmMmaNhXHG46Fx0+VVxJkGlmU+o+7IdBqhOlWkS2Ox4E8rWvnd7UYT0dXLQ7JCgkocaOJiMAjjFy4fUfnWbZokOjcuyFup9Tza1Io81gBt63BSXHQJRICJCAS1/rOoHQGmgYy8lx3SOQf/ZimQOwY8+U8QwsKkoGMu4/GhuBwbH9u/su3lfb5LuglmGoMeBGULuvrcOnkK4smfwjWtTf8XD47h8RmBxWNHh4cbdrYoWBot8NfjXE2bpCXPLtPp1PitQ2WkJBdqNOv+dAzqi+i9R1J8KaUkNixEE3v11C1oqkOw3O9rGkoh1AWk4GgB73SKmhuprKTQSzFBCnQdKaqJs8+INB3WKapVQSwORp6adQdbUhSDSOKkEJbpoo60CB3OaDcqNLfyoHA0/JA8wT16+NUTAO/KKblsuugoQ4BZcgyEhpQdTQVAFk5DYmEkoRoT40ykV6WWeedArh0+AphBI4uKQ1rnOvZT1ApDbCiwNAIRwunRPEkUhDZcxupJW9DGMvnJVosFQtH76RY0HuAVUK2WgDwnNgPGw8KGAve8o06otrW8qQDi7U8enjTRLPEqARYaEaUyTg12lVOnnTgQUxigbj0RfHxWmkS2OgBo9Nh4kXT404IkS+Nbss7wFtaoUg5ia0LoP3eNApEEAAAiw1T8LigZ4hpJNyPDypiZ73NjgUsbeZHlV1tBk6yEw5jQQ0uQj6fH4rXVW0nLfHBO4PJubtZI709HC9q6K3g5HWSwwZbZmhriA86FdRXSrSYtDj0uBYi3jViBpomvZteAR4UokCndxdsRZUL3NG5uqgI4E1y5MXlHVjzQQOdLEGBziXu1QWFq40j0mUvneVBaYm3JX0N0VOqVtWoij508koRyMb1TVfDxrpRk0V6WB5JLAlypd1+VapmTQIYADuc4k+f8qJI4nRjvRGtTqDRI0hxmOXORC9yr42qZKgMh4zJm0btB8PDwqXYpVZI43BDXYXHy1qHY0VCzcT2LyOaC9kQhhEbpd0npG1ouVNZu5cJCHZfavAYjMnNmblZqlkmDH6iANCXCwquFmaN1W4w/7tnBEA4HHGLHCwtIcA6Rz3L6txq11/k5rXnRGd5OTncpkSZEhc73HF5c4kqSV61vyrVQUuVh+DBhjAfkkItiba+Vc1srex0VxpbkhFPA3KbjojnD0FoG3yrC1W1JsslVbiSf6qDHikneQTCPXENa5/xuzg2eWtVMk5xzcbKx4sqM/2pBY9V6iuLKnVwzuw2V6yiRjjhG2IIrvpB6/CsNdzpUBs3HsngdjlqlwsURD5VOPLwtJllxq1YK62OXGnkxJgWvZY7gFPUJX0NbKylHhOrTgkoow/a1pMblXczUHpSFJLMzOQj2tmeJWf/aG5SsnRGisTHHZ0MzXBVcB9PVDqtc9qwdCYPy0ZkYXRjS7YwNfwp0GyvYPIN4/OMWSAMbJAZKxLBetdMSjnl1asvALkul7P7gh5rh3O/tOD7D0Fh1FuhrWlnGp9S6073WdbbwbVh97cryfGN5jCggZxMjNzst7yDG4D1MLRXRybPzLL0a4snB/yFdvZ+fyHE5WVkTg8lLI52A15DDIxugAOgNCZl2MFa3VUtPkjeey5ORwoOTnmOLjsd7PKcbI4MDSLb2nqmoqXY6uth42dUp+GVHN7qxxjw4OMH8rm8bJuw+Qa3YBH0a52p8Khv5PXxeuvZy/tT3RA8nPyTwZs3Nj4+OUmcYmK5Cd2txdTWPOdj2sHSx0+rRXOEy8hwzocaBuSQ/czIlu9jSUU1WTxJ3uiWwUIcPHfIOQynz5JCxY8N2vBulqly9h/0EZHPzR5UeDBijioHBodIlwD1U+NCppMyaLFJDdyO48GJmLlPyMqNWTvJVrl0INaY2/KNa1gr+4sNrJcret9xXzKgPKCQ5+g1I1qkeJ2M9XqbR9iO75nDI7fy5HOgi/uYv8AUFN2iuLs44co8l35H0RgzPmcAxu1pN3/AFPQ/urjIRLiJEtf+pxVx/GnA0xp8RJVjN3W+iVNqjkBl2MejVkc78rNL+JrMoGfFJK3Y5wjUJsbc/jUsclM7l4kYzP1cLmskb6ixt3u+KVdWVqVGd7/AGnTXYugOvwNbki+N5GTElZLG5Gr6h1WrJak1HicvFzsYTxEekKb3DqtOTkahnOb4bD5/jJMHPiBEoOw9WnxWtsWR0co582JXUM+be5OBye2uSfx+SCYwf7Mn9TfjX0mPKr1lHzWXE6OCDe9pcHXTQkmtDOqF7mPtbyJ1pigU0gNVVS2tAjjS0Elw2jQnVKEJnXBrnjaUtZPDypiSYlzRFdw1KEigcyLAY1y6tT5/spiciS9xUCzfBdaUhAh0akPBLXC5JNItOArDlOJkRztIe6N24Le4uKGp0FMOUb9wH3N4DI4duTnyCDKx2gSQNF3INR514WXq356Hv4u3RU1M577+4Tu55RDh7oMaF1triNw869DrddY1rueb2exa702KHuVxe52t7nU13nnmtfZrF5Zmbk5SPZxrmbVevqd5CvI79qtL5PZ6FbJ6k796cvEj4PGxHkfqnSB0eigAVj0E+TZr7FrjBhYlA0QFw/drXvSeDA09+1HNAKnQGpY0hW4OY1rC7dq7wpk7C3ANbsHW5oAZbI0SFdenXTwpGkaDj5HOCIENqbM0hj03FyegPl1qTTyEYmDyPJTNgwIHz5BTaGafPwqLXVdWaUo7aI1Ltr7QzS+3m9wP2Mcn/t2Hw8a83N3UtKnp4OlOtjTcHjeN4KInFiixcaJv1kBoHxryL5LX3Z6+PFWuyKV3Z93uD4JhjwnDM5EFFbdoPxpVxWt9Db+ph/dH3E5/uaR36jILIHlRE1QB5V11xpEcmVGZ5MTiqlFQnwrVEyfVHZU0Ob2xxUznFxdAxtrEIPE18/lUXZ6tH9qJ33Ve1kYLiqe3GFUjxrODRaD54maVrXZr24mISoa36z5HrSHIuXExIsdzePxgXEJ+pmFv20mEszTuDi5BI+eZ/vy9XO9MbR8K0rYZTM/h4p2l0TBI4fU4DawfzrpreDN1lFdm44RP9sLK5FcERoroVpMnSAZ0DV2TelNWM1+BqpJgbdhnc5rB7bCFCaoaqRcRTMIRjc5Gt/qOpo5yHEQ2AvUQNubAuokIE/pxFeQmV/gL3p8pFB50Usrle4MjVfw/jSkIEl0bPRANxX6vjQMdbhzSndM4pqlKQOvkigGyL1OSyfxogbOBss1pDtYugslAHm+0CGY7fcPUnSgDznMaSXO92YdB9INAhDg4t3ZD9rTpGPCn/QDyuILYR7UOu49aAEuyIIRthBfIbF1OJJdgaWb807i49Gt8T5VoqkOzPQQz5QRjfajH5jZaG0hJNkjj4cMI9DVeU/uu6J5VDsaJDoCEket40cdBUyMWQGlXnc7XaNKQz0jtoV5+DR5U0JjX9x4UnYwr5UxoXjY2RmZEeHgwSZOVMQ2OKNhe9zj4AKapJsG0jWuD+xXI42E3nO9pf8AjscDdHx7CHZLx03nRnw1ptQjntlXg7xPFYE/ONx+OxmRYGO4bWtuSf8AU46muHLeEa407G8cUwYmIxrbAD4JXncjv4wEukLnFeutLccCmMBQEfF2hNUkJsU9paLC2hSyVUCAnzNYfQSvjrelICP1ZFyVd4a/hT5BxGxvk9RuKkY/FCNXHw8qEiXYcc9gajU86sQI9pdrot/GpBgz0buU3HXolISAptqm9uh6HrQiiMyH7SpdYLfxoGAOkudrkC/j505CAeSXcFJUC4HhQMEkykJaxL6H99MBmRz52lmo0KD99Az0OK1hBcFIuSdPhVCkKc8Nbe/9PkB0qQB5JyBqniSNRQMGe5fh/EUANkH4DqvnQWdLCVaF0+dAmxQZ53JN/D4nzoJk457wC1twDcrf4igpM6wPJDiSU/xpQJsd9UhDT4dKCQuLHO0WXz/aLVSRnZhbY0IJAJHh0qoM5OBm0ldFUDwqhSJe9jQUHhbUUwQO+RhPivSkA0WkfVe/7KBiHODRfp56igTAMjLY0FCVboDrTSGkQc3MvY5WXuhCqba1rXQp0TJ7iOZbI0Aklp1BNb1scWTFDLRh8iWAFpWIWPka3rY4LVLDi8jHJGPcILUCO+NdKsZtBLirVVba/wCdWQNPFi112G5VFNBJiuZM6QGEkyv/AKGBLdL15iPfKxyODkFxLvQw3trfzrVMllfmwi0na0vPjqlaKxmByYEr2lQgI0Fk+NXIoEN4h7/9uPeiLS5BxDoO3CQst2gLYW/Gody1jJTA7eZLIMfGj9yQ2aRp+JqHYGlUsUXa+Px+M7P52ZmPjR/WwFJPBU8qzrdu0I1pFqygvnO+/t92zhxDtvGZyWTJEN7pAoY82Kr/AArpribephyb3Ml7k+43cHcE73Om/TwOaI/08PoZsaERBXQsdUT+Qq8ePk5L9xBR1iXXp2yKoljtYk8Xh2BHOAdJqAdPwrjvnO2nXSJWPEa2wb6gNOlczs2zoVUhvNx8eTZDkEs36Ft60xOyM8rqtwePFfmMjZixFuZiPsP6m+KmtnZV/k9GcnF2ei1RNx8EDN+szXe3+oCSwC1/nXG+z/bXWDup051sH8ThZGHC7Fx3ERlxc1zrAeN6xy2V3NtzswY3RQid43iJNwmyJHSvJVr22AWuDLmUQjrpQn2lkEjY5XAPNmr1A+NcMNqUa8lJB90cc6cf8njMJdHaVLEt+XhXr9DN/Yzy+5ha+5EZxPIxtYI3kOcehOn4V61qnlplhhY2aMSxuBjB9Tfj8aybg2SDf0LGuM+EduUBYLYk61m2aIjMjn5cWX9HyEJjlNvcH0H59KaxTqindLcg84NnV7nBoGiVrXQi2pI4Rfy/ETcdI7++xvpJsS3UXoejk6el2nhyfRkZ2t3TPwZzO3uRLhxU7leEX25G6EVu/lHoez6P5WstNyfzfuViY0fs8NibMhoRubMd8ijw6Cphs48HpXZzkf8AoU+fuXmeVz2ZWV7mSd+6RjrggdLWpuqg9mvWxYqxVQTmXzGflMJibDxeKRs2MALrDTyXpWEJfUwSgrOb7UU+F+ie+fObKCHuUxu8lNaKdZ2N66oRm5zsblsp2aP0EkzUkigCAuPWrVdNDK+eld9Rjjecm46OTHijYZC4PZkPCuCeA86dqJ7mVVkyOdkAcpzGbysvu5ku9w0ACAD5VVaJbHoXy0x1iSLkyI2sV71SyCrSZ43Y9iktAV+e8+mFpuEUhb1qqHhZe7awqCLNyXbQSWu1aBSbSOTla25rX2f4DkMbmBkxx/2nN2ucba1wdnImjppWEfVnF4zmRtcRdAC42b+FciQDmfy/F8ZA6fMyGMa1frcGtCeFUKYMt7j+8+AJHYXb8Ls7Ju0FoPtgj4Xrox9W199jG+atSY7J7o5XmsV0fMY/6eUXGwICD51WbqcVoZ4u0rOGWIxZU6oRjwix/qIHnXmNQeimgDJl4/GH9tvvz+V7+dRsUpbKDzuByHvvzvbazAP+6zT51vSyG0Q+9siMUFmrHjwHjWxDQfwXOycXmiI3x3FJADrVwZXUmqYmSMqFs0LlbqgK63/GqTOZogO9O1MXujjZMctDc2P1Qv8AzAgHTxrp6+d47fQ4uxgV1Pk+bOS43J4zNlwc1hZPC5PiPEV9DW3JSjwLV4uBDAC0ILofVotaGTepwAE7QbfDxoExbmhvpJX59KZO4jaC4no1PwoLnQ69SAnWgSPNawlQbiy6UAznuNDtoIAF1/60gSOKHFWnyJXRaBwxe4nrdtgmtMTOKGlDqVB6igFLLh2H2JH3Y58zskRQQn+7G36yP5Vw9jsfj2O7r4PyODWYPtd2vjSQTmEy+yCXbjb515r7uRnprp0Q5zffHbnbWN+lw3MfPF6WxREJbxNTXBkzOWVfPTEoRhndHcuZ3PyBzMtyMH0R+A6BK9vDiWOsHh5sryOSDLgAHLcm5tatjGBPuOuOn7hQOB2NxKtsHhNackNHjKHuKhNA5KJFxYh5ZtLo9Re99KTKQ7jYuRnytixIXzTHRrATc+NJ2SWrKrVvZGk9sfaPLyduTzkghgADvaaUJGqEmvMy95LSp6WHot6s1nie3+G4LHb+ggZFEBeUp+KmvKyZrX3PXx4K0Kr3Z91O3u3d8Ic3MyQELI3KAfjWdaWtsdGhhndv3T57ubfD7px8J2kLLW86664UhOxRTI5xO8qTqTetjKRO8DyAsB8KUDk88gxvHUtv5LTQnsfS32qxJcvsjjJ8qb2oQ0tatiWtNeH2dMjg9TFb7UaVgf8Atoy3j4QxgKnIk1HneueDSQl8EMo3y/3Zdd8hRg8060gkYypvciJjYrY7CR/pYE/pFIEUfm4mzuc4sORPoOkYPwpo0KTlQshm2ZD9yn0wMsAfNK2QyMy8YzvAhaImNsALuINXW0CaIufimRt3BwYpIQ3cetaK5LoCHFlIIx40YimR4/cKvl8kwMuxo4Xf+5Jkd/SdKc/AoOuhkkUNSOLUADodaJCAfbFETHA0vl13ahacyTB0cbPIr5yACijSnzgXE5I7DxRsYFeUIDf40lLCBrZk5Jv6GO6DpVbCg8IYYWhrQJJG6kdKJkIgZle0PAkJe7/7Nv8AFKYjpY97QZyIWdGixtQA0zcCRjM8i9wsop7COP8AahO+R3uy6Aa3qlqJ6A8s8hvO4NYNAOlXWqIdhtjJ8lBjRo3o8i1VMEbh2PgRRFrnpNL1JuAetZuxaqGHY1N53O6Rt0+FSzQ44PcVksxbBv7qAFucg/obqTQgkZ3SSBIgjG6vOpppAzoDQQGgyPNgEJU+Sa0bkmr9ifYXuru32s7ll4ThHIfcnaf1EjevtxnT4urWuOTG2aq2PpXs/wC33aXYGKf+Cw2jKLf7vIT+vIeR/qOnwFbqiRy2u7GbfdfuYnfixOUvVoAPWuPLaWVSqkhft/xXtRNyXtV7ypJ1ryc1pZ7OGsI1BjHHbt0FgE0rnOhsIYxtl11860SMpHAWMu4o0Enb5VaJeoLPkBzCGfQLWtUtjQD7ZkPiOoqC1oPx4YVOg8ei+FNIhsJETYhu6/uqoJbkYe8qjdPGk2EDe0pp6V/Cgobkk22HqHj/AJ0EEfMS5d2n76RUAGXNtUEonl1pDSIWfI3EtjB9WlMoFV3XpcjpekMHkY59gEaLppagTG2Ybn3HW58vjWgh/wBgNamn7/jSAS9+wrqh0tQAO+dxQakqo6UDGwy/qF0XxoA85qogt/OgDwYHKUQ+PTzoCRe3UD5nX4UCPOY0oXaH8q6eaUwODG3hDoNHU0KQmLBBARSelEC5BDcZrQHOsRe34U0jN2H2lg+kXHzKVRB1Q0X1Ki/j/KmIGlySiD6tFoKgEMpd6uvTpf50DSEFxUkm6+k9PnQSckkbG0knUadEPnQMhs3kQLLbw8aaRaUlezc57rAqD1+FaJFwANfuJ6n6asYfiyOifviO2/yvSZDUlj43mQrQSN5CEEpWtbHFkwlkxc9AJInX/MwlflW6ZxWoT+FyjZW7TcD6mHxreuQwtUkjI17A5psNU8/GtkzJoy9mI1SY2hg6H+QryJPdYBmccwuJlO/oPP4VaYiLm4wSEtiiRptucEATyp8hgr+Hxmeuc7rX6DWnyA6zDb9OLCS3S+g86ORUBkPDuBByCCE+luiVDsA/yEDWYMrcBWZYBdE5guHdDaim+pNtUZF3H3Ln5o9vKmc7IcrJ43WAe0oa9BY1MnFSzrKRVW48+QqEln9R0UmtLZUjZY3Yksfi44x7koUdV8q5rZm9jqriVVqSZjZHjmaJoeTYJ56Vzat6nRMV0FYM0ga4Txn3/qYzxHVad8U7bGdM8SmLk/U8lBG/CB2Mck7RYkUVVcb1Jta2RfaSreLwo42nIlVyAti1cguhPxrn/NadEddeuoUjpklef/bRtiIRpkJAAHSoVVGrk6eMbEm+X9TB+ldEZMlqK8D0oeoFc6XFzOh0bodgwZHXzXOZCwLs0v8AClbKv7QVXuyRbyEEMRxcdxA2f2pdfx8K5nidnLE8mkIr2VyOTj5GM/Lf7ssb/Q8XcW+dehXHW1WqnBbK6tSFP5HlOVmAi3RYKEFfzDpWCx0xKfJ1c75XEaEJm4ruNzAwAmF/qY8aL1FezgyrJWTxs+J47sm+I5GNyMMm1vVfw0ovUmty1RywODG7iyQ/QRXNarN62UhOfx0fK4xgewEoNpIuCPA1NLQx2RQc3j87hZi2Q+5jqUcmldiixzy0OYOYMfJgz4zvAtI1t2gdR50mhvVaD/dnFY/tjmcNXRORzmAWvf8AZSo9YPoeh3ZrwZAY+PxTom5WXKS17SrWm4I0Xxpt28Hp2yNvQczO5IIoWRcVA2ANG07rlx/q+KUVxvyZOvyyM43l8YZD5OWY7IjIVgW274Vpar8C4Dmd3C7Kjjgx4W47InbopPzg+Rqa0jcfJUWpCZuS98pyJiXPdbe9SSfGtkjlyZsWPUBlzWBqtfuPQaJWioeTm9n4QGcmeUIPHUVfFI8fJ2r3HoONnnd6gSNPELSd4OdVbZZOK7VnypWsZE571s0DWue2Y6K4jV+1/tTPKI8jP2wQqpB110rhvnk3VUjSY+X7R7FxgPcY7IaFLWkLWVcd7vYVrpFQ5r718ryBOJ25ilhcU9w6p5AV6OLpvexx5OwkQ+N2t3b3RKMvncqURE7vb3Wv5LXfTDWux59+02Xvt7tXgu22OlyWxl4avuPRfjW5xWyOwB3P91OA4GJ0XFBj8kC23QH5UNToVjq25F9h/cRvfcc+PlTCDIh9TmL9TRr8xXz3bxcHJ9HgvKLeySON+zChL/8A7930iuA7U29wHkziOYWZkpyZHC2MwK0p8KEBm/Oe9x0jnOY2DGJ9DB9QWuujklkTFmv9yx9DjY9QulbwZyX7sfuZ2HlDDzHl0bijCTpUmNqyjRpgcgOkYSpKgg2oOdqDPvuR2ljc9gnOw2pykAJRou4dfxr0er2eD4vY8/s9fkuSMGkjkieYXq18RRzCUIIr3DxGoYkvew7xcpY9AtEhCYtj3FpMn4nWmTHwKY70kgWHUWpktCXv9IKKunh86Q0ht8hb0JddPKkXA25rpXAgr0t4/Cgex0f2lDgUHWgTFRzuJLm2Ph505E0Ka6S5cV3Ig+HUUA0iX4HuTO7dzGZuG8hCr2brO8bdaxy4lkUM1xZHR6Fk5/7pc9zY9jGf+jxiELIyi+dYYupWhvk7drFImknkcXvkLnHVzjc12xBx8pEguJRNx1UaeVAmhCP3AF1/30hjjZGgkPAU28aaIZyUkOQD1Gy9E8qGOp7Ggnnf7eOx08xKANFS3G5qlJfO2/tjyXJJkco79Lj6lhFyK4MvcrXRbnZi6drbms8PwPC9vwJiY7N9g6UjTzK9VrycnYtfc9enWrQiu5fuPwXANkbLP7+UBaCM+ArGtXY6Zgw/uX7sdxc17mPBKcfBJO1jCWqDXXXAluS7lBlnfM4ySuL3nUuK10GcjTpDodPMUCk8X2sVtYUBI2Zg1VPy0NApHMGSGbLjE6/pyQHp4GlbRF0cs+rOxM/ipeFxcfBvjwta1rnWa0joleFlT5Ns9Cu2hfmTskcHxkPACF77MH/hbWUFidzZpnOHrIH1vs0eCCkUmCZoBJj9wzvH0xt0C1LLRX+RxppGvjc721Ce3GL/ADNS2UVHkOIihO96RjVxN3kfvq1bwNakZG10pMOHGdunuuHTyqtioGMjjYYiJXu9+cBbG1qasEAcuNPOPpEUA0UIEPjVKwoIueHGxysY96cWC6LWqbJgHOBl5Lvck/txmwaAg86rkkKBsjF49D9Ul1A1py2LYHL8rL2oNkXQ9fOq0QHW4+LB/wDey6BoC3NKWKD0pQLM7aNWxt1/ZQhA36fIlaXECHH/AKtCauUhQJYxjFjw2F0i3kOtMmBErIofXlP3SDRg6+NNS9gegDNlvmG0H2olW1tK1VYMnYFYXyu2Y7S57j9R0rQz3DIuO2vXKdvkB+hLXqHYpVDCNg2uOwD6WDr41JcCxucLD24+vibUMGdaA0FPSzXeakY0rnEiJXdNy+FMQktjBV7i53h4mmIufZv207r75na3jsUwcav9zOmBZEB1Tq75VDskXEKWfT/YH2X7V7JEeXJE3lebbrnZTQWxn/7tmjf3114qaSzhy5W9EaQTucb3Bt410I5WQPdXKN43j3uJQofK6VlktCKqj5ozHz9zdxljHF0THElPFdK8vJaFJ34qamydu8MzBwmK3QCvOanU9JOFBOtjaAjSOt6aQHpHgKBr/LrQ2EAMsz3FOnQ1HIEhAie4+oFFAHgtA3oGRwBhvr1Twq0jN2HwGap6egq4IAZnXDSVDenQg1mzRISAPqIoSGJe1ziQlhdaIFIxJGgKnTzpwKQGaQD0tv08QVqSiGymF6qTfXyNSMDMDQ7aR6k/waYSeGONpKa+GtMUnW4jEFgo6C4q4J5HnsYxtkDQFJH4UQKSLyZhtKG40FI0SA1MmtnKqeIoA8Gi90J/D5UALDWA3QeApiE726FQ4WI6UDE7iSSouif48aAOtc5CW6XBOvzoAfjjLyCQuiH4U4IdgpoiiAfJZ3QfvqkjNnjmtRYwjl1XpTEcE27+PxNBQ2/JbFd6A6gNtbwpkwATci55RjkTUeNBUCWuLirlB1I/zoGx1jXAK+yWHWgmREsrWoAfX1TS1MRGZcznjaDbx0uaSLSIXJBQ7yV6nqatGhDZm8FwFhb8K0SARCSUB+tEA+FMJDGuBYjT6VC3pCZz3HtcCqJcUQRAfg84YHhkji06bl1StK2MMmKS1YPKNnALCGSi4vrW6ZwXpBYcDmHgiNx2uHpvofOtq2OZ1K88PfqjW621rgPWPSexEy/qcOhuaAgCyGT5ASMbAerrmiSkoB2cU0yLMS9wud2lORhLYmOcG47S4gIGjQmpEFQ8ZPIA6ZGNXQW/HxokTY87Fx8OP6NwGpI8aA3Rhfd/EQ4/dGSxwGzLPuwHpvTRK7lZuhjWFfUExsJQA5oUdE0rgvc9elCSbwwy43Qvageth41l+bi5NXg5VgjpO3OU4tjpMc+/jByhov8Asrtp2ceTR6M82/WyY3KegcYMPIbFn5DzHOxoEkDfLXSuflas1R2LGrpN7hDZHSRk4TBAzXcm0EdfnUOsPVydNarxoMxBjssta0yyfUF+kuqnoipUkpBw8s5EeTL/AG3lRGAhVVArNWb/AIoh3Vd2WjisBkRa1w9uJo9ZIVwHmelH+O7as5MncW1T3MYUeDIzIiyhk4k9pGJ9IH8jUZOvFdN0HX7js4sVrKw82Fwex2zHcSHgFGtjPWjHer08nZkx2b+hCychgYTtscZyp2uQvd9Pkldiw3vu4MZpX6h4zO454TPh8e50Md/Szp5eNS+nTyzVdprYRDmt5Qtgym+1O5pMO6wUajyvrU1xvC9NiM0Zqz5I3IwMuB5dEEeSjkOhHSvTVk0eI6NOCVxOUka1jcgkBjtvq1qL0kuloepZcPn43uZFKXID6X+A6LXJajR1KyZJ5hgy4/084aXPHoJHXzNRV6yFq6FC5Xhs/iMt00LHHHd9bBdpHgK7q2VkcetWGYHceJFw8/HZ0LpvdIbjp+RdRUWxuZXg1x5HWysVTkMKfipTjzBGuCsb5G4+YrROT6nDlTqmQ8r2b1FmpqL6VaMs+dIZfOxp3koiWqlU4bd5VQLJnAKI72sfOrVDy83sHbYZfLlZW1p+kaD91WkkedbJa4TjcTJK4KFLtFWod0FaSWniO0cjNeGQwukc63gB80rnvlSN64zS+E+2MccbZuUlbE3XaEBSuO2dvY2SSLLPzvafajPbwYmTZLbNQA+rTWlTBe5NsqRVOU737m50mDEDsWA6bFaU8zXo4+nVas4cnaXgDw+3XZRMvIzOe531BxX99dyokcNs7ZZuOx+I4VgLmMbtARxRatHJZtjHO/dWLDidBgNAIH1IOlIuuKTJ+e7/AOa5Rz2yZT2xkptaSB+ylJ0qiRT8rMmnJdK9zj4HrUyWSfaHcc3bnPYvJROOxr272aAgnrWGbHzrBvhvxZ9XDnBymFBntmEeHOwPbFCbnxFq+edeLg9muoPHkTXGPGMeN2s0p9RHjUmpG8jxsGZG8MY7LmP1yv8Apaaqrgkzrk8eTjJ/YleHSFxLWs0+C13UcoxaOYfKyQyscp9wWClL1fEmTX+yu62ZsTOPyXgzH6VPh0rGIMb1Le7HDCWlPUCQuhHlTMjIPuZ2ML83xcdx/wDrEbBr52r1+p2P7bHk9rBGqMgDZWOKKbXOleqeYONkcRtdrTJg97iI1qDxBoBo8ZRt3+GiXoFAolriCVX40DQ2A1oLgUBN0NAzzpNwAVCdE60CgUxqNChCRpQJjgBJCnoLGwpi2PPSMDcb9RQCcnIng3FwKQWR5zyRcX0AJpgkJB1CkAUhnvSAHKjvGgD0bJJHBkbXSSuttaCT5WobgcF07d+2/M82RLmD9LjC/g8j+FcOXt1ptuduLqWtuaxwfafEdvwbMfHbJO0K6VyEk6XWvHydi1/Oh6uLr1qN853pw/b2M45c4MoCCJpBcvh5VhWrtsdUQYt3Z92+W5hzsbAP6bCX8upHQrXXXBG5PKDOMjLnyJHSzyGRz/zEnWulKCG5GC8qBddE6UCEFwIQ6nXpQITJIACXkC2nwpwEg5nc4pGPT0JqoI5SKjhfJck+fhSbGlIfBAGlQAR0OgFZNm6rBq32x5iTGc7EJVjnD6vpC+Vef2KnXR6G5YnJsc5sBBkybEhv0pXAzYl2xyznbOVBu2KO3XxqYKlDxhjjY4y7Y0uGD6iD0JpQMis0ZEwd+jiEbEQyyC5+FQ0WiqchBBjuc/IccjINg3UUI0RAzQZU5/tJjxKgSxQ1SYxJfi4oAjb70+l9FNGrKB5MPMzQ73EbGFKH+VOUgI/JbxvHN9QEkx/KL66VopsSQ2Q/PzX/ANtvtM6J+ytVCIYwcPHxS4yrLPqWi5quTewDUweGB8zvZjI/226p4U0TAKz3ZAfZZ7cY1kNjVCOf2InkMBmm1DjotOGIU9APfznhrejNLfChfQWxG5PKtcrMMbGaF3Wta4/kxtcizI+R6NBlk6nX510JQYy2Fw8a95D8p2n5B0HhUuw0g9sYZHtjAjaOvw6VGpcHNy+mMAJq86kUoHJ1m0OVS93UnxpjPOkaxblx/KBYD40AIVzg0yEILhotQIm+2+0+f7syv0fA4T5r+uW7Ymr/AFP0FZ3uq7jVWb92V9h+E4Qtzu5nDleQajhAiY0Z+H5vnXJfK7bGqrBtnF4cEEbGY8bY4WBGMYNrQPIDSunrUnU5M9iWIAamifur1UefI05+wbrANuSdaBGJ/djuYRMdBE/1XCE+eiVx5bawb40Vv7c8QAf1kzfXIVVLjd1+FeVltLPUxVNcY4bGxtG1reqVibigCFaAfnY0hiDCXkAKnWpgJPNw2/UVT9tVxFyHWQHRFPn0IppESKLQ0X6dKskafJtYdpRdFoABla17txv4gVm0arYUsYG0lCLefyoJOPlAUBCQPDpVSKCPyJSXIeot41DZSQBI8OJaemo8etSUCTvREt8fAUBBHSOT1EW1AoKgQ2aUIBqD10qkyGh33m2cVCqqnwqpIgjsvIc5brexbQ2WkBbS9yuB8yKlF+Bft2N9T+XwpknLWDgADZBe1MQl7x1Oh0FzTFAE+VrXjcSnRKEhnod0rlsBqgoBsPbG1gLnoCL/AI0QQ2CZnMxYytYgPQDx8a0SDiRreUkynowkNVPILQVEErAQ1m+R23oooM2xGRyLA5ILuCBOmlMEgRplmeS9x8b+J/hRBewZBhtNyLlSfBaRDsEljIwCSFRR8PCnBKckbk5iFGkBui2/AUDSkBdlAO1H7jekacRO4SeTTot1FUAxLiukbb6dT50DkjpuMFyLeSqh86qWKSLnY9npRANKtDFxSEACT6R06UwEzv2gga29VNEgErXuQaDXz/HwqxMP47kZMZwa8ksB69KaZlaiZcMPk2TMYrxuH5gVWtEzgvjgOa2aZ21drXWsLrXMdugVDgtjG5zgCbqdaBOw97Bc7/2zN27q4J5LQKTjeJLngzlSNQLC9EjkNjxo4SGxBrWqVJCVIhbWgsc4AuOu42atAERykhkam4vd4NCNCeNUmUZl9weKM+EzkGJ+qgduAb+2uvC/BhkXkF4PEj5HEjzGIXkJMD/UP515Pamlo8HtdOyvQno8FkY3O+kD0nxNee7nopSR85zJ2GJjBCwHa8EfxrqXGupm14ImTjHQZCBu4uG4OSwNddb8kYtQcx+O9wkZSlrSCWtJIF9Sau7tVaGNb1bhkvFhFssbII9sLwge0K5anDTmpZz9nsOmiJPicePA5JkeVuychusNw7aerR1SvRhRoeM7t6lwihxc6CYZEjcWEOvjM+stI0J86wlrYSY3jS9uxGTj8uJjcRwLWW3TFx/bTfIdbJOUZxznFcpP3GO1YSG44aXwSH88ICqT4ipxYa0Tse0uzzrAzxXZvHcq3Jl42eSTN4s+5NFI3a17WG9teldNsrSj5M9Cbw+WxG9xY/L4eU9+OQ2N3GxtKNcBtc09EWsmvt+o2tCqd4Z+JL3S+Hj2tGOJBI0t/I8/UFFU6/8AG5LxPVIJOTBk5G1sgdKgJYCFPnWODlx1M+wqq2gvL4ps0Lgz/cTcANK6a3g5HUicYy47xE9xCG4T8a0tDRmpRc+NyXTvZhOidkNkADHNCm9ta47Ug61f5LlxfZHKZkboeRCYB9UTn/WKydo2Js0KyfttwmFC8+0sjwrZHlEcPAUPNYy0Mq+5WBOIoX7SJoP7fuAWe3p+FdWBm6zWpXQyiV+Su0iw/dXoJI4cua9hMePNMRuXaehpykc0Nkli8M+S+39l6zeQquMtPDdpZOY9jMeIuJ/D8a57ZTorRF94zs3iuOjblcxMGhmkYKH51zO9rOKl6Ikn918VxzDBwuNvc1UclaU6trbmV89akLPynP8ANPInkMUP9AUBPKvQx9etfBwX7DYVg8JjgiXIR7iirqtdSqkcV8jZISnAxWq17WtatvhRsZqWQXJ94cfiNc2M7pNLfCiTRY2Uble8MnJcm/a1EtqlKTVURVMrPlmcXOcb1DNAJzybfVqVGlACHFdOthSASAdSlj86Bm1fajueTJw38I4N/UR+uOWQqR4gfK9eT28UOT1uvklQaG/lsdjy7IcciYaRjRf+tcHFnYpH25vI8gBHGBjYpubIamEioREcvwnGviePVPmIdrh/V8a1pdpkMzfOjlwpdkw2OaUbqCRXoUcnNYlOD5t2JLHMx39xpCIdSL1NqgtTe+2ufh7hwIg53/umgB40vWGxlarTJLIxXOjdBM0PhdZzTcIdapNoztqoMA+4PZr+AzXchhtLsCdyuaL7POve62fmoe54XYwcXJQSd710B6Cu05FsOFrQoLvxvQJCWFu5DYDQjT8KJG0dc4k7Tp0JtQKDhbtRSpctqAO7gAGkoRYAedACvccCd1gfpX+VAQebI8qqE9FtpTkTQ6jSLuvTJEBjgNzSgPUUhyOsB2kvGv7aBMbIe94jjJc46ADr8qBpFt4D7d87zhDpWHHxbEmRQ4g+Arky9mtEdeLr2szXu3uxOE7fiDhGJ8nq991IC15OXtWt/Q9XF1q1/qEcr3TxHBY7pMjIjYWqkQPq+QFcWreh2wY13T94s3LL8XiB7UZUe5+b/Brqr11uyW4MwzuUzeQlM2XKZHOuVPjXUqpbGbs2BudqAVXwpkiC4fM9BQA2XhbdPNBTgUjD5nEAMCkKF6VSRDsKbC+S7lFJsaq2FQ4wQFEAGp8Kh2NVULjiuoBJ/wAaVDZqkPtDGhCPNB1qGy4LT2jI+HKYfyrcC5PW9YZdjWhvHE5obC18hELQPob9RHn1rzbI3gtPH502WzZhgxt0Mr7HxsahlQluHf8AtIG78gmecncuoXyqJKSkBynZearQRDCOuhqGy0V7NgwcQq1Zp+oVaSKITJw83L+pY4TfboStVoi9CPecLjbOIfJex1p6sQM7I5Lk3bYlhhNtxCFKrRFjX6DCwjvld7+SbANuKOTZDI7L3EE5DhjwqojbqfjV1jwIiXufK7bhxIOszrfvrbbcTGJYoIyC5xyJnG/gF/lVJkjM+PM4e5kvEOOLhosP86afwJkXkcvBCsOEwOcPznT5VvXE3uc9rohJZ5MmXfI4yPOjBXQqpGLs2ERYEko3TH249SzQ/sodhKpIQQwxAe03YB+Y61D1NFWDoeQUY3c7xPQUoHseDWgq9Xu6AaLQI5I4L/SAEQUCPHeWgAbGNUL8aY2E8ZxXJcxlNwuHxJczMefSyNu7Wyk6AVNrJblKsm69lf8Ab2ojzu9Jlc5HDjYDa90e/wDlXJbNOxolBt2DxvG8FiMwOMxo8XEjHpiiAaLWU+Nc7+S0IOUJpRGzqbg+VSnLgdlCLRgx7IgSL9R5V7uGsVPIy2lhLyCNU6f4Wuk5yD7i5JmDgyPJuhIHyrO7hFI+YufzJO4e4PZjUsD1Ph+NeZe2kndhqa12rxjcXFjJG0gIDXmvVnpJQizssip/jrTQCwwhfI3+dMJHYW7dBY600jNseDWgeVXBEjMs7WtIaVd0ISkykgV0y3Upp4k1MjgFmyAHILLZamS0hkF0ugQf6vOkDY62ParnBSlvIU4Aalc1qgmkwIueY/lt51DLSAC8lC7Q6Lb40kUNSepPAdEt+FMAZ0bTZLE/woENmKMEuF73B8vCmiRmVp9TT4Er+2nIgB7dzxrpqbUihIaA4lwS2pqhHnStYLJf6vwpwSwCbIaAUd1t/GqKSI6fNLVc11xcD404HA3jmTJfuP0g+odP8qBMlfdjxI/UQ1Ogt86SRESQvJ86A0sa4L0APh41pWpXGCA95+Q8ySvKOKIt7VrAw+LNEDWhout/hUQAxkc1KLNNxa2lUqigdwsyeUhvVLOHnSaAsuCwWe8nx8KkyswyXMbGw7bra1tKRCrJGZHJGQkE6ongU1oNVUiZpQ8lfktMrYVGC8AAgONtKAkKYwNKHoLp40Etj4d6UAFunh4FaZm2IkYHjyNiPM0xSRmVgskVQpFvJKotWILI/sOKmwsE6VRUjMMm4KbjRD/jSqEEfpg9u6MqwXv0oTEd/SkdLk+oHUHWiQFY80sDrE7PzCmmZ2UmpR45e0OjbsHiifP41JhJ1kEbXHf6j/V4fOgUhrCx0aKGlpQsbc/BaQxsuez6gIwfpUq6+tJjQy5zipYC+yb32CDyqS4GpMhlt6ven+21f3Uwgjsxsrw7eREwaDU00MrnJY7ZseSPadrrOe/8q/GtauGJqUUrhBJw+e+Bx/8AbSktc5TtF7VXbxLJSfKDq5Px3jwXN8W5Wxj0ooNfNRrqfS1YDmExMa5xUC2ldeLFa5z5exWm4Tx/BzZjm5Mj/wCwR6XO+kf516mPGqHiZuy77D+BFkmXJ42KCP8ATqQch35V6k9TXTaqiTk/JGxIntefjI/fxHDKhIBkZH+UjqB/CsKqGa5Mv5FruWTDbwudx45F8APJYOoA/uFP49KtycukFS5LLhZ7uY94wmuJc0H/AHHBFAA6eFa1QmUHN7jljyhPxDCXtcN7nXeXeJJ0PwrqWNRqRIvkuY5DJng5jGPs8piIR4J1VehoWNRAsfY4uBUPfUOH7nIb2Rz5DHCTEhbtBkPVx61zvE24PadqtSUM9ychAJ2Yr/bimcXODbG+t67Pxo57Z4IU52T7pmDj7h+py9D1q/xpqDht2LToEYWVl4uS3MG5wYRvJvah1UQYrJaZZqfCZE3KsYcSIvjkFnAWb1vXn3rDg9Wl00XPj/t+M5zHZjkaSC5sYC+NYvM0JtGl8J25xHBRNbixNYRcSkBzzWDs7Gcljc5Wj20YBqXXOnhSKIXkcNsjdwCvOj3FE+FKyGjOu6+3o+Rhcxw9w+dgCPDxqqXaZZj/ACXZ/tSluxCCfSBf8K7q5dDO2M9h9nZb0PtBrBq51qHlJ4QT2NxfD8YjsgieUW2DQfGpStbYHZVDn85kIIeOg9tmjXgIbV0U6vlnJk7KQG7jcrkHe7yE7i43RetdtcarsjivnbDYOOw8ZlgNw6mtTndmxL+XxMZvqc1WlAdbUBxkgs/vJsYfFEQp+l3lSktUKlyPceTku2mUodAD4+VJs0VSAnynyKSV6eFSUByOUg6J+2gBLlFk1P7DQMQNfIdP30COISQnz8aQHSx7nFrGl58BdaY4ksHbMXNcdyUGVBjysjLhuchALfnXNmdXU68FLK2iPoDEl4oNj9oh+Q8BxBOhOteJqz2WrBU79imeTZHrsFjelBCAZeWG3ZiRq+4c401UcFR7g4uTOa7Ic5ZB0GldOO8EXomilwZLsWcsdYqhHgfKuyJRypwy9ds9y5HE5kc0Lv7SDcL1z3rJpubnxXLx83hMljID0CtVbnwrIxsoG+V46DlMaXEyohJE5qEG6edaUs6uUYXorLU+dO7e2p+3OSkidGf0ryfZfqnlX0ODKr1k8HNj4OCuF5d9aqlq3ZghA+ooU/ypFD2rEPpI1+FURJwBwHUrovgKQzzXBqK266eVMDu9Tt2kLcp4fGgD28Dz8+vxWgBW4m6p4D+dAh1iuCL6+gH8BQKCy8D2XzHNnds9jHJAL32t0tXNl7FaHTj69rs1ft77dcVwqSys/UZTEV7gt/8AKvJy9q1tj1MXVrTcns/uHheBhXJmZEGgn21QkDpXHrZnalC0Ml7v+873vkxeBAY2497qQa3rg8sJSMh5Dl8/k5TNlSue55VwJKLXWqpbEO0kY5xdfqVCGmQJMiqumlApEl6Ap+P8acBIy6ZoQNUk+HlVQQ2cbHJKVdpoBQ9ASkKjx2jonTcKh2NVUKjiS+qaLWbZokOsaAUdd39Ov4VMlwPBjrIET6UpMaQRHBbebdQutqiTSCd4F0scrXY7Nh/+061lkNaI2Ht2XHjgYZP7sxsqrr5GvPvubFrx35kh2NBjxQRcWCVkytiYZl4kDAFEs1kb4GoKWp4R5vIrv/tRH8vjSYTANk4uBx43yI+Zug1NvGpKTbK7mS5eYXMx2bGG6kfhTLUFdyuOxMWTe9xycsXMY8R41UyORLpZpYiZnjGh/pbYupjG/dkkaWcdEBb1SvufKiF5JI2bFgheXzSHKyFuzoDWitOmwwafGmlaXZLhjwBCQbKn8aaa/qSV7N57jsFY8Bgml13HS1dVMdrbmNsqRV83kcrNeXTvLlu1g0C111oq7HI7tnIcGWYAyDZET8FqmxKpIwY0MI/tMV/VzqhuS4Fl20ly73dUpAeeHOO5x10bqgoA5uVpGjRdBrQIQJCLRhWmyk0xjsGO/InZBBE+fKkKMijBc4+CAVLcAk2a72V9hOa5oR53dEruN4/6v0jU9941ufyiue+fwjVUS3PoPt3tPt/tTDbicNhx4zQ1HSAK93iS43JNcrbe5o2SkuSxosf/AA0mwVSLy8kkE+OtY2sa1qP8Fi+9KZHDcFQV19XHycnN2LwXFjdkYCX0r3UoPHbEPIbuVDZPKmSY990+5Bj4z4InkPRLGuPNY2pWWZz2RxMuXOc2UXe7chA/GvMzW8I9XDWDZcKMxxtjaAAmuulciOhh8bHFPByGtEiHYLESfUnj/lWnEzkac9kblJ0tUjiQTJ5AMUL/ANKm1ilUFiyBMSpuf3GpTkqBwo4Iw36HrQAO6Ihw6tN/nUjFh7I2lLJceC1ScCaAMvkQCWsCL1NS7FKoEZpZFLnKCigfGpTLgS5vxA/aKYgeV21SBuS/xHnQMEkcdOhKhelSUJAMgJPyJ8BQSMvUA3+JqhQMkl4LRp8P3UyWMOZYh35fGqgQHPKIvUq+IPT40xkPkZwDTfwBN6pItIip80uUNCgaAa1Y4GseGWaQSOURn8q+FAmSsmVFgxEghR0HTzShIyKzyHLSylznPJWzU/GtUiloQD8uaeb1F249a1SJmSXx2PDQdXedQygj21aS8ncqAUgFR8TJkPQBGi27zokltIsGFxkOI1X3dr1tUszdgibNjhaQwgJYEWqQiSJlzHSEofEr86DRIaJe5C0KNCgsOimkUdbCNSSvQHrTJHo3AHZsQDTyXoKcCke3tOpVwsOv+BTghnN3ttLndBcC9qBDYyg0naLr+3VKZMDUmRvJI16HoPKmMjsnHDw4AKDp1FUUAPxJI1dHdpIXrTkJCcchuljoQevnSJYaGRyWVHopTrQJiHYweQEuLIirQTJp0UrE2gKp16fOmc41M5HFRuIP0s6/OkNHI5HMd/cIij1XregqDjpGNkd+naZSfzv0/E0QUkNu3OP9x6kXDWeB6VBQhzhEwhiRtOq60wAJi95d7abRfc+w/A0yoAMzEe+MqsnUjRq9KpMEU7kuNDsggf7p+kDoRoldmO2kM5MtYcokmcp7PFiPZvzIwWv8V6E142brRll7Hr9fO7Y48kBw2Wc7k3tyXF+SLiBxIa5y9fKvaVK1qo2PGy3btqXHGwuXeyWHkGSQ8ew+6AHK0oFDWnoKh8fBkNz8nLkAxYjLR3eBYNA1JPimlPj8kpkZxHfUXA8hM2GN2Y1/pkJJc1dLDoK0th5IXINf3DkR5UmbhvEQyAr4k6GhYpMb5kiody5L+SeZGPTIFpWKUaPEVvSiWhnbMQmNLBjY8rWkGV31+4moKggUXOvFZOoDyHOY8Um6N5c54R7V6j+FCkztjrMkLLBNkvL3RiFknqaTYW1NUtDV5HBJQcfjHHjlxWGfT3HEWDjqCaORG43NxHG4cZmyJg15u2Jv5TqlCs2Q0kR2XzYfCMeGJrI9DYL8zVqvknkXT7U9zjHzTxMwD45SsYJT1VydnHKk6MNpN+4/kJJo9kQ2E29Iua8yDqJfDyZot0c/pJ+nb6neFIskoEUFqr0LrmmEhMsALm7lcT43P8qbRPIiOUxsXGaZch7YoyCpcQtSqyVyMz7k5/t/HkLcGMZWQV+BPxFdWLr2e5nfMkU7L5LleRJYD7EJsGssADXoY+uqnFfsisPCij9U/wDccNQa6lWDjvlbDMnKwscWLWBFT41oZRJBZXcuLitLWuLvDx+VS2WqFd5DuyV5JifY3SlJSoQGTy82QTueV8KRcEZNlSOdcqmnzpDBwXOKk/5UAe3DTX+FAHC4uKDToKAOsZJN6YwSR0AoZSTZLcf2py/IOBbCY2aue61qwvmrXydOPq3sWrjPtwFD8yUu8Wtrhv3l4PTx+u+S6cf2nxOGntwNcRfcQNPOuC/auz06dLHXwT442KSP242MaEttC2rmeR/J1VxVXggM/iJ4nGWGQteNB0t08q0plWxN8ckpxsozscHIk3SRi4dYkDX8K2lHnXrDFSyQxBIxud+3yFMiAGWPIyWEO9DLjzq1oESUrnuH9sulhar23ca68eSTlyUjUjuMzbhj3EJYeNa2RlVmldmdyScZksY5ywut5DzvXNZGr1Rtcc0M+OzJgIcxwVwB8qzk5miA7m7exOfwJMWRqSFpMbkAv0row5XjZz5sSuj5z5jicnh86XDyQhBJY5CFFfQ0yK6k8G9HV6gJIBa1F6LWhmjpJVfCgSOJu+lQNaBnCrUcSp1BOtqQzyvVSbHUjxoAS4NDCCriTpQ2JIn+D7W5bm5Gsx4C2MoTI4EBDWF89abm9MFrbGwds/bfjOHDZ81onnCFHBUPUV5eXt2toj0cfUVdyxZvJcTw0DnTSsxomWDUAJGqJXntuz+T0FWEZj3N9544PcxeGG620SnX5VtTA3uNuDHeX7g5Hlp3zZU7n7ypaSV+FdlapbGTsRJLST1BX41ZIjchUXBsaIBiHPQbhcHqacEyNvmQem5FrdVpwTIkMfIPAUTAQ2Ew4wDdE8D4VDsaqgRHCGizV/xrUSaJD4aCNouRp/nUspDrY3Eepfh5edSXASyDY1SgAtfVKlscD0bHJtjbfxIXXSpbLSHhA1nqkKlVcPhUyVEErxnuucBEA1i66W86zsa1NG4PLjwQC7+5J0aq38a47qTZKTQsKXM5SFduyFE0TTw8axagNiSx8LFwGh8r1ddSdRUSKZJA5eRlM9vGZsjFjIdaRUAU2LiROLpnGaY2DRc1A5ZE8jA8t3yPGPANG2BPSkWivTkHczAx76GVwVfNaorUhZ8WOCXfmye9Jr7bbgH91XPwMUXTyNJcBjYYHW1hRAivcr3VxfFtdHiAZGQiBztBXRjwWtuZ3yJFE5Lns7kH7ppSGEq1gJtXoUxVqcV8rYDHBkTncm1v9Wn4Vs3BlDJDGxIYdP7j/wCo3vUOxaQ+SDrcJZoqRnnOJUklrRrQM41V9NiKBHg432jd0UmiBnPbcSHSHcSvpbcldAlIINI7L+zfdPdTmZOSw8XxBIc6aYJI5v8ApbWFsyW2poqeWfRHaX247U7KhA4/HEuYn9zNmR8rvmlh8K5LWdt2aL6FkmzAz6etk8Kh2SKVGwF+bJK74fxrPkaqkA0uRtCE6C6eNRJXEjZp35MjYWXJso8KSUsb0ReuCwhBAzo5Bp4V9B1sfFHh57yyYeSBbT91dpyETzeczCwZJXHaQLaf4vUWcIaR8yd18hLz3ODGiO6Nrrg9AteZkt5OzFU03tThWYmJGUWwSyBa81uWenXRFuhx9ydAfxWqSJbDQ1gaQ4W6mt1WDJsYycsAFrfC6VFrFpEc97pNDYqtYs1RG5EL5HfUp6is2i0x7Hj9sDUeK06iY8ZRGqoD/OnIgZ+U4/TYC3XpUyVAM8vkCDTpSHIy7HJBJ11K6UwkWYQzXohIpikQWBBe1IJBJkAP5jqBoaBoGdFYlzdQpqRyJFwQ0fxoAacxbn6tfjVEyMSvbGC4aoCLp+ymIjpcrcHHRwsQqIaaK4kHn5Sr/V++qQ+JBOGRM87QSDp0rQoJgwdrfckC36/wpkyJlyo41a0IOo62ppEsDkdJlK0H1dR4/Gq2JGn8UXMJIV2qjxqpGJj4mJjtzmoOg6CjkSEGJjRsjCuFh0oCQrE4wvcJZzbS3j8KUkO5Lb4IGBtrC38KRKTZHz5pc0hT0RLdKClUj3yl5IcVKj4X6eVI0Eta7qT/ABvTAf3saLFD4HqvnRACTKNAfD4+dMQkONi7op1X4fOmiRRn2p0PUjxNAHm5Alab6jSgkS6IP0JAS6/zpoUg743FwaQqkbhoFqgY8yNB5gXF9NdaBSOljNisRrnAq3VaRMgMkBXcG+HzGutMZxm5n1KOoPh4A0CYYHscEN+oOlBLLyz0D+88E32sb4fLxpmbQpznSA+0Pbj03G3zoCBkel4QGci3q0pFQPPnRBI4Bw0jFtfhrQNIHmnkLkjSNv8AUR6ifAUhg7NxcS0K5Sr36imxniWtO4+p66usKQDUs25rku3q7RqUxla5WCWTdIwK9iFvRTW2NwyLqUQnJSHCmgnczdHMNsrRcA9a2zY+dTm6+R0tqKmwIY5o8qJ23LQObI2xTonyrysXYtRw9j3cvWrlrNdy88J3FjS44wOSbvY70vWyjxWu1NW1R4WXFbG4ZA95thZA7A4BI43Xcn5mnz8q6sOrlnJeyRRuLjPEl78oB85XU2T+ddd9djPFatmDz8i94eA8sDFcA5FIPiaiYRpbCrbFe5LmBGP7T3OkcPUB0+dVRtk2xqoBiY+Tnt/USy+1CqF/8Kp6DrsCZmLEchjInoXFC/p8b1SegrInJcfFh4wHJyvenISJgttC1CmQZCx8xk4WNJixSEMkNx4+FaOpKZEzZ75SXOfuJ1W/xqkiWwYvMhVoVbJQJF07CZBByUc0rVeoDT/TXLm1R14lB9I8PKkTQbbwLi6HS9eWzqRbcJpY0bkBaLedQx7HszmuL4yJcicbm3DQRdOia1Vau2wnaCp8v9xc3IVnDYp2ixleEC124+q3ucts9UZ1zfJcxnzF3J5ZdGv0goPhXbTDWpy2zTsRMmZhwtIO1Tfcf3VvEGEtkdk91Y0RLWoXaBPKqBVkh8rvCV7XCGzna3pSVwK/kc7lTrvkKClJSSI1+XK5S5xIJTzvSGMGa6+PXwoASXkr6rH50AcBDivj+NAHSLeJ0PxoGgrE4rOz3BsETj4OIsKi2RLc2pitbYuPG9hu2CXNkuRdjdR864cncS2PSw9B/wBxZuP4DjuPG6KMF4/MQp+N64L9i1j1cfTpUnMZlkIDdBbxOlc1rNnbWqWyDWuDWhoCefn5VkywiKQC7Tfw+HlUjQdFIzaCbDoetSykIna2dpARSDbWgcSVqaKXBm3NB2G7j4/Kumlzly40ybh9h+OJrEJp5itpk82yhgk8rCNrfUOg8KcAiLzsB+SxCS0HRtXW0CspRQ+a4v8A46b3GHc06geNd2O0nFekBPGcibepC3U9TRaoVZr/AGF3bte3Ay3f2nABoKfhXNao7KTUnY8UwbI14LHDcKmTAonfvZ+NzWI98aNzo1LSNSR/GuzrZ3Rwzh7GHnqjA58Z+HM7HyWlsrCQ4GxQ19AmnqeHZRoMvcFVtk6Lb/rTEcIZpuSylKBiXJYG+36fnSGSvD9ucpyxb+khc2NxAL3AgXrK2WtNzWmK1jUeB+2WDiGOfkUmmCEtJtXlZe43oj08XUhal2yeT4ftmGN8gbFGAiWBQeFefytY7q1S0KB3V958bGD4eIZ7kpBaJXIinyHhWtcLe45gxfm+5+U5ud8uXM4g9FteuutFVEOxBPcDdQU/GrIEl5uRYlCflTgUiXPUFfiQPOnApG3vaAF66Bv8aYpG9skp0t086NiYkIhxQApF9brpUOxoqBccBDVAsKls0VR3amtzbSok0SHmsc8L9I8PCpbHA+IWhoc4gW0qZLgIYwm0TUZ49KUlJD4hYw+5KdwWwPlUuxcDjd7yBG1EW/lUjQ62OOP1SHfJ1AvfzqZKJTi8fJypA2NpZEPlUWaRdUab27xmLjFsmWQ5yddLaVx3tJqpLxhZ5kYyDDjRpsCifgtYBxRKxY0UW05P92U32DRaQJhDxIQHPkbDAAoaLHzpMYE6RpJhwIyZHX9x2lSUAZGJCEflvM0xVWDRaCpfgjMqOUsIIGPjgHSxtQMo3Pdx8RxReyNJskWB6CuimK1v6E2ukZzy/dXIck5Hy7IiSAxtrfKvRx9etdzjvlb2IVkU2QfSLLq7wro0RhLYbDhQREOd/ceOo0BqWy0gslqI9AfAWH7KncZxXuPpAA0PjQB219vqPiaAEkhbq4joNKBnrkb5CjQOvWgRb+zvtv3P3lIwcZimDBJR+dMC2ND4A61jfLWpoqSfRXZX2b7Y7SEeXlxjkuWbrkz3a0/6G6CuW13bc0S+DQJsuKMBrSE6NGgHgKydkiq0bIqfNlerWGy9KytY2VYBw5zwS+1ut1SoKGppwxpTU0myiMfI+R/pKdPwrOS0TPAccZJvccLKK7urj5OTj7OSFBoEDGxRsabCyJevoaqDw7OT0rk9K3Tp4UyDKPud3F+kxZI2noVGnyrlzW8GtVJlnZHGjOzXZ01y9wRtzqa8zLbweniqbjgYwihYAlgP2aVgqm9mGl7YxaxGiVcpGUSCzzPkVoPjbyNS7FpAhapVxIOvgQn8KzLHQW/AdaYSNSFqFRfVeq0hgUk22xCra3lUFjALn3CFfDoPCpgcnBCQQSPVqStkNOBNhTBt8z4VZAxKg9Wq9D40FA0kzQCg9QuB4VMgNPkMlkRBSGNOjJKp8fEUxSd/TOKKpTRSiDxo4i5DUsTY2qRqNOpWnASReRkFpT9nwpFpETk5JI3N0vrSLSIx5/UOGz6lUeaVaGIZxsk7tz1CftqibWDDgY+JHucARqL9asymSv8AIZrZHFrDsP03NUqlIj4seSdy9FV3lVDYZHE2L622/D50iT0s8bduwq8XH+BTgluBoQ5M5Vx9Dr6XqiOYUyCKAjcVIvfzoJbk4/kNhOwrqnUL8KQ1UEkyHOG4/USg20FpQDOcSob116mgo80NA9QVdAf50AKL0VzUtTEMOc4jQIbigTOiUBEP9w9f4U4JOtmLiia6mnA2eLetlICCkI61Qm0bd1kS1OADWBvpJOmpRRSIZ2WIBCiNW9Ahl4LXbdGLbramSdW5IHkKYHi07jZSRfzHiaAGCC0b2AHxH86QDbWlp/t6JdbX6UwL5vG0gANBFnu1oMzjMmM+hqyOGnh/lTHAh0km8seSwHRrLqKQ4EAGOTcUYEQbrk0FDlw8vTTQu1PjQA22QElFe86nUp5CgBL0e4F6g+fq06gUwQh8YQEqhKhD1pDAMiASNcGDS1j0PiaaZJVeVvC/CcASy7T4V3Y2cGSsOSM43PdIz2Hn+7Co3eLT/KvK7mHi5+T3uhn5LiwuSRr2K5yEWjaLfOubFkdHod+bCrqHuM5HNRYuOYZyC1LOOor3cGRXPju31bUsU3keVE5eYXlzgLdb+ddpxY6QRMWNPkv35MxjY9R8ClrUmdabR3kMKNmKZWwkRAo5x/qAWir1FbVCuGkxYsWT9TqP9tp0X4eFNrUlMYzGRxLmuAQlWucdPl5VSE2QmVyL5Xoy6daoiQBz3vXd08PGgBcWO931BAbmk2Uqh+PguJFr9OlZuxqqFs7aw/byWONh/EVz3cnTRQbNwvcuHgYwiAM84CNaLn5JXKsFrMq2RIkX8n3LyIVjf0mO8FHEo7aa6qdVLc4r9peCHyo+P4+V0+fk/qZibukJNx5V2VpVbHHbLexW+Y73xcaN8WLtb4JatYIrR+Sgcp3RlZTi7chPVUQUmzfiiv5HKTyqryQPGpKBHZD3g7yfFKAGXSOUhbmgBJfcOJ1v8RQAjcdNVulAHlFiT5UAKbG9zkYwuOtutKRpN7Exg9u5uaWlzDGw6l3n5VhfPWp2YupezLdx3aODCAZz7jh+FcGTtN7HrYejVbljx8OHHYGQRhjeu0VxWyN7npVw1rsHMaA0OBsOh8KzNUoFNeCACg0TpSGPNeAShUHytSgpDvuhiBtz06mlADjZEHgfH+SVLQ0wmORzvhdF8ahjQ4/keOwG+7nZDWNHRRpTVLW2QrXS8lZ5zv8A7cjBjxYxK+/q8a68fTu9ziv3KVILA77xp8luO/0QPKBDb9tdX+M6o4bdmt2Wz9RGwB7D7gcPQlwQdDWEFoUZp5/9DFKE00DIfksCB7HCQ73Je2pPhWlLQRasopGViy8fOEUMX0nwrtraTitWCc4nNKtkjcWvB1J8KiyKqzZ+zu53Z8TcLJkPuMFj/D51zNQKyLVIJHSf3ArehPUUjEzP7jdoQ5kf/J8ewsyGXeweHnXp9XsR9tjzezg8oxyQbS5j27S0kIdVFevM6nmNQ4JLi+F5Pln+3iRFzXEBziLLWd8ta7l1xOxpnb323xonMl5Qe48J6T9P4V5ubuN6VPQw9SNWXth47i8f22COKFgUk2KDSvNdnbc9CtFUo/cn3UweOL2YKTTJt3aotXXE7FuyMg7h705Tnp3PyJXCMlQwG1dlMaqZOxW3vcS4vctvwNakCNy+RAt1SiBDaqF0PWmSNvkAcQpHietMUif7kp9Nl18aAhjzMYorrmpdi1UJZENWjzvUyaJD4j8iV1TrUSWkPBj3/Ve6p5VMlpD7IQ0X9KdOpFS2VA/E1ziBGEXUnWlJSQ+2FjHF0jld51ElQOep6CNuweItapKSFtjjhCyHcVtSbkcBEUGRlECNpDU6VLaRSUk1gcDExJMkg9SvhWbuaKpZeNxn7hFixf8AmTp8a57s0SLlxmCyPa7JcXv6xt8f4Vg2MtuFhvkcDs9mMINw1PXWoE2TjImg+3jxb3jWQ3/waBITJhQtc6TLf7j7o0GhjkGnhdI1vtpFFdHi1Qxoq/PdzcHwTC7Ina+digRgqS4eVVTHaz0KmNzGO5/uNn8u90WJ/YxtAhRx+Neli6qWrOa2f4KWXZOY/cSXAn63fwrthI5m2wmLDjYQZPW7p8aTY1UKDWhVRrR+XrUlQe3O0b6R4nVR40gFAAKpL3L1vpQBxxF9zkHUePhTASA+QEWa0H8RQBO9u9p853PktxeCwn5JVJJ0IhafEuNZ2vVbs0VZN87P+xHC8N7fI91SDkc9qObBpAwj/T1rjvms9tDVVS2NSZlYuFCIMOFsUDAGtZGA1oHRBXM7GnFsEl5CV9gSFsEKLUO7LVRr3ZSoebD8amTSBLp4mNtfyoFA2ZTMFBI8kvSCBQx3EAuU6LSgcj0OC1zwABuJ0S9WqSS7wXDicH2YwUQ+de718UI8bPklkoXEa+GldpxEXyuY3CxHyk6A3/hUtwho+aO+OWn5vmRgwu3B7vUngDXn3t5OrFX5L92XwA47FjdK1HgKD1tXm2+5no1/iXUPcG2s1VTRKCtxEj10dfqtTI4G/eaAQl9R40pGkMvyGoSTfx6miRwDyZgaV8NVqZKgYM5eSfznr4rSHB1kRejjrqR0vTSJCmRtaLDz+dVBMnfZaSv4EeNEBIiZIwQCqL5UikRmRKXuIbpUNlpAjlsL7hqfhQM9G5wIWxJJFBLYSxw3BSp08jVIhnp8mONrl6a2v5VUkpEFmZxU3ICdaiTWtSElyvceA25Kr4fKg0SOR4kkx33Hj8PKnAnZEhBxsabgxCv1dPlVQZO4rKlgxmKShaLePyqiEVHlMyfJJDASwajQWq0aIq+RG/3W73kOBUCtkDJbClaGJMEboD41LEOESzEsZ9Hjp5UhNoMx8GKECR5v1PnTMnaRU8+OwFjAqWXT5imiUiNnke9Svo/alBaUEZJJsNiQTYfOmaCI3veL/VqnwpMAhhaBt1I+FACXzMaCWkICqJck6/hQKRpzyUc4+oepDTgY3LMNoatgtNAMqX6kDxWqIe4/ES1At/D91IAoAnyCIfCpCRwBrbIhFk1vSELbIQnh18D8fhTIH43FyAodEKnSkSzxjLkLdCdE0/nTENuYuhBN/j8DVDGPecRroLE6UAJcS/8ANcIq6EUADOlIf6f9whF+NOBSW9pdI/aXF5b8hVAPhWgFUJ1Y3+dSA64lrPT6T0Dbm9ADccildCLKbmkMWX+4fT4nTw+NAj0TT9Q9JGpF/wBpoGLLXfSGoEKuNm0AhstamwjcnUWGlJjB5SC0NJRV08KYFT5+GNhbM02AIcl7GujFY581JRS5ckYmSJo3AgG/mPhXRkor1gwwZHjtJGcn3MIpTHAFt6SdPGuXH0fk9PL7LTQrOTm52fId7i4k6DQLravTpirRQeNkz2ybhvHYGW1j3yODGkFS/r8qttGKUA8ecYnvE53EWB6BOgptIUiuQ56XOLd4DY2BABYBLUVrA2yGyeQBd6H7m/xqiJBJMqef0veS3z8KBnmYzneojXTpS5DVWSGPgOdtKKKzdjZUJXF43cq/FPPwqNTSCy8V2ryGeWiGHaHH0l376apJFsiqaDw/25kiaJc6X2makGxNarGcl+0/BPN/+P8Ab0R2Mb7rLFzkcV+daqpyu1rFN7h+5DiHR4xAAs3pT2KrjM25DubMzXl0kxIOl+lKToVSEnzJJHK4qtz4JSkYw6dQerv2eVIAdzyb6+QoASXIQnx/GgDim6aGgDgBVf8AH4UAh+HEnyCGxsJJqXZI0rjdiewe2nyIch+xOnU1zX7CR34um3uWfj+Hw8ZNkQJCes3JrgvmbPVxdWtSdZHG0XAb1B0SuV2Z3VqkPtbtJ9N0RRoutZmo612jfpW486Biz9KE3/060CPMe1iXVy+FvCgB22qDVbWpDHWsDWh0hDAFKuqdx7bkdyHc/D8Y1TKJZBq0IlbUwXuc+Ts0oUvlfuRkyBzMMCEG9tfxr0MfSXk8rL7H4KZm89n5xc6WVxXoSorvphrXY8q/atYjTNJIQXO9XU1rBzc2wrEDzNG4a7lWpsb45k3fhWsj4zGEo3Slg3HxUV4t92ezV6BMheUsgulQiwWTYNDucb6Xpjgr3L4DcgFTa5AHSt6WhmV6SViCWfCnLHfSutdWjOPVMuXC8tNBNHNASoIuD+ysbVNUzce2+Yx+axG73D32hD5+Irm2Mr1gLzYI3AteFY4IR0SnOpk1JneR9veKfyD82RSwlSzVT513f5dlWDj/AMVO0k/jw8Zw8Ksa2JjbudZv4Vy2u7bnVXGqla7i+5nF8cx0OIRLkC27oCBVVxuxUwZJzffXNcq8j33NjJ+kFLV01xJEu5WZ53yuL3lSTcqtbGbcjBd4igBB/HwHWqIkbLgCVct7UxSca9zrN+VAIdjxyT6vlUtlKoTHDtTaE8ahs1SHmxi3Uqo8BUtlJDrYyQEFzrUyWkPsgDSpOp0/lUtlQEMYXWY2x1Ph8KUlQPNia28hU+FS2WkOt3OURtQLY1JSHBDGxDI5X/0ipbKCGR5E4DYGInlUuEOCVxOEaokyCvUg6+NQ7lqpOYuGZPTiRHYiKlYOxqqonMbhBH68xxc4ptjFZO/wOCw4WGXDYGiCMWDtDbzrFsZOYghjd7eM0zTreQ3CikKCx4UD40lzJCXA7fbGlAEvGZsluyBoiiCEuFvLWgkiud5nhe3YXZHIZIMgUhpKk/AUJNvQNzE+7vvFlZZkxeIb7MCkB/5vx/lXZj6s7kWyKplmTn5vJyukme6RzrlxJI869CtFXY5bWdj0OEweuZ2556D8b1TsJIMADQGizfCoko6H3DYgo6n4UDO7Q0qRuS5ApAdILmqSjfBb0IDjSXelgQHUnpTAN4vhc/mMxuHxeLJmZTre3GFAU9ToKm1klqWqs3Psz7Ag7OQ7ynVQHf8AHwmwTo92tclszexoqpG04OFxvBYjcHisePFxowgbGAFA8U1rmbNEpGJpJJSUugt5fyrJ6mqSGvYcSrjepVSpPPbHE0OPTU/zpDQBLke4QyMEO0TpUyWkehgme4u0afT8/KiGJuCUxcO6lQf5VpWpna4YMcAJdPO9zWvEy5BuDibpGuT0rY104ccs58uTQs0bPajACJ08q9mtYR5VnI29yBDZ171ZBmv3H58YOHJEx6FE161y5r+DSqkx/svDdynLPz5bhztfIV5uW3g9HHU3PFg9uIMQBeqVgjoOzSMjG1dfH+FQ2NEdLPq4WNkrOTVIDky0cgcF6gdalsuBIdI8K7poBqhoE9BQhc5AQvj8vKhITY9HjkC/0np/OrSJkJYA0IqhPhVEs85zApvbQfCgUDE2UGH+nRP8ql2KVQOWR7g69vA6FKiTRIachcvXW9/3UDGxGOtgTayUEtnZnNjFjcBSU8KoSIqfMA9SoouenwqZKgjsrkZXA7Tu6Hx8komS1VArYZ57OCbvj1oG3AZFxZTc7pbW1NIydw1kLYmhE8iNUHjVoybkEz85uM0kO2kXA+VNbjqiszZcmdMdxIaCiDw1/ZVFD8eMIwHlD/q/nTAjc7DxXE2RxBNr1ScBIHjcfM94bIEjaLfA1cktkqkGLHtfd2lkVOtSZwyOny3Su2tuPygdaclKoKG7RvkJ3aJqPjQVALLkH6Wmw6AfzpoIA3wqS5F8qqRnHv2I1tktuoASZQLgkgi/ktOBScdIX9EI6efjTAS8lF/G6/KgZ7YNXDQKPnQA4Izu8PAItBDFtb6uocOvxoEEtaoDbonjrUCHmtG1CgKFaYpFIhvZP8JQIWwoxF0Pkp+FAmeMqbbJ5dacEjbnhVUBRb4CmMFlAIvcediKIFIyN5edtmdDoPhVwJsV7YarnID+29MRbwYiwPClLICgWpQzm823ORnTbYJ/GgY6xXENBAaBboLeVJgKZGQoP0qoBtfqg1oCR+FrWuJeLEIP+lAmzpjcHEBqrcE6fhSBDT3v/wDUcrm3uV0oKQmWRjh6Neq+JoGgKQ71IG6yoLDwvQhsis+Bs0MjCQbEbBYLV1epL1MV57Bz4OReyMu9rd6Te6V6dLKDgyY2meg7fyORia1vpnCru/FK1rY5bKAaSPI4lYpo/wC6w2fr8fkatqSUwPI5KXIVpkDWtPpaLDShIGyJlyip2m5N7WXrTJB3SSSEg6eA86AFx4znp06Umy1UPx8EdQT41m7GioS2PxpJa0NJU9L1JrCRa+F7Oz+RcEj2xnyvVKpjbKkaRw329wcJrZc1zQ4XLevzWtVU479hvYnJua4jgoi3H2BzQjiEJXTrVpHPDtuUHuH7jhznsgeTqLnqP4U2a1xmbcr3Vl5rnF0mpsNFpSbqpXp818hKm5ulSMGdISt9oP8Ai1AHCf8AVboKAE7+oNtU6UAcLls3TwFAHApsAooANxuPlyHK1pHxFhWdrpG1MNrExicFExwfK7eP6a5rZz0MfUXknMeOGBrRE0NJso0XxrktZs9GmJV2C/dbC3c8+nUX6r1rKNToTjck8CeHJZuZ4oSNPilZZE0bY2rbB4iDyHC6IvhWUm0D6FAOgslIBUa9Ao6g3vSGKDXNQtCkfuoEJmysPEaX5UrWFoVDVKrs4RLuq7lY5LvrDxCWYbQ5zfzErXZTqO255+XvVrsUvle8+T5FztzyAR0KACvQx9atTyM3dtYgJMiac+okuOvz8a6Ukjhtdvcb2E+YJ61RmzwjCXsaQChH1Gq/ilMCS41zRLG5wVCD43rG53YTa+HzY5sCIsZo0Nd8K8iy1PUWwVI10gu9WX+FrfsqS0BvYQQfpAoKGpYg9qE7joBVCkr/AC3GCWJz2NQtUhNbVvS5z5KkVgZEmNL7TrbdUreyk5kXztvnpeOyGSB1rAt+P8q57VNdzZYcxufxxzIkJAV/TzrGYMGoKB3H31hcVA9rT7s7SbAj9tarG7EzBj/Pd8cny8jm7y2JUDBoBXXTEkS7FVlmMpJeSV6nUVsZDRetyDemA25+rR/IUEtjbpEJVCTqnnTJkSr3mw6/sNMQuLGLrm5/hUtlqshbIA1qC3zqWzVVHWNatgvS/wC2pbKSHWRFw0v4VBSQ8yJoVxutwBalJcBEbHus0IPHoTUspIfZCyJS4rayVElQOjfJ9ARoRClBQ57Ucal6udb/AKVI0PRtlnJjiZtaev8AKpZSUkph8IGgPyOmlZu5pwJ/Cw1GzHisbOcdKxbNEicxuGYD7mW7RFY2/wCysnYpEzjYkm0FjWwxCwJUW8aybGHY0DA4iBvuy6F2qE9akCVg4p/+9myIFUMaenw6UpDQmsNiAR4rNjBq+pkGFT53F8LEcrk8hjQ0KhPj4A9aaUkmZ92/ez2d+HwDQ1rVb7pAP4V14+s7bmdrJIxjl+4uU5yYzZcz5nm+pIvXo0xKmxzWyNgceEXEOmOtw3yrRszgObGI2gAJtv8AKs9zRaHQ9rVDQF8/OgDxaVV59Q6UAeVykgbQRe3yoA6HEFG3NrpY0hjuNh5OVMIYo3TzvKMhjBc4k+VDaW4JN7Gudn/ZDkuUEeX3K/8AQYRO4YrLzOGtz0rlyZ//ABOiuONzceB4fgO1cVuHwuGzHa0I54AMjvElx1rjtedzXiTQyDMLfSaJCIEFhQ3t1t0NS0UI3MBQgKOvQ260gFSODQEQg9DpSY0RcrXyucnyXSs2aodxMH8zrL4eVNVJdoJKOGNqO/YlbKsGLtIZGjggt/H51rVGLCI4lIcP8yK0VSHYl8LHa0bk+INehhocWS8hj5AGogFdhykbyWUzFx3PcfUAbmk3CBHzb9xObfyvJ/oY3E737SBcAeSV52S3k6cVZLp2RxUWBiRuLfUAu6vPs5Z6da6FwmzAAWN/ZfWody1UBmm3optoF6Vk2WkCTPLiE0RCtQaHsfCL03Aoqr/nVKpFnBIxYkYBICHpWqqYuw9sa07gEOtqcBIzM/0+Hw6UhoGL3NBTS9S2WMzZDtFVw6mpkaQI5xQBxtovjUljYkJIS4/CkMc3sFzYlbHWqJBp86Fg27lP4UBBCZ3IuUo7aEQIf50kaKoFB7mW4W9K3K2pjehLQ8a3axQh8TVQYuwVHBE130oQV/jRBDsx/a0ABANUFXBADkSsiDnFwCafAUBBV+R35UhBP9vxPl4UI2WwxEYsVoUAp0F3A9KsQl8mRMT7QIYfmL2piCGYQjAdI6yKh8fjTMmwXIyY2K1tz4jwoLVSMWTIKhdnlqh8aCoEvDImFygkDX/pQgAJnuktq3T5/KqQhuzB8tf4XqgGnOchYV8LG9ADT2+dnBB5VSAGduabadF8KogWgcNxAtY6/vpDFBhClpX40DkdZEoJP0p8EqRSOtjVeigJdbGnImPNYEsCfEGkTI8GE+oj0+Q0oFIoODWnTfoPh4/GgQjcFGqgr/OgBt820emw1PXX40wBjK4khCeiDrbxpiYv3QbtCpo0+P8AlTgliUJcFsmhqiJEPeGeJIOg1piEAl3RAfPQ0xyW2MkjaAAenx+AqRi0shKf1E60FD8cwYUso0I1X4mpAfeN2159OpcT+2gk82VocSAT0voooBoXLMrAhQgG/RaTGgJ0ocFP0NsXutegoRkTxNLV9S6nQFP30DQxJK520Madx1CIStNAzsfB5+d6nNMbPMJ+yqkh3Q1ldnYJ/uzR+7MBqQtHNmbclO7h4g4QdNij2toNm2KV047/ACYXpKMd5XkMpuVJHJIXNVStejV6HDZQRBD3qSpvY9KoUMcixHud6h5LUtlKpIY/Hg3uah2NVUmMTiJZS324y4nUjSlDZUpbl24LsDO5Asc9pjYU+ASrVTDJnqtjRuM7F4TiI2yZjmukaFLU/jWiqcVszY9yPc3E8KwsxgxuwCzUVPjVwTDZn3P/AHIfIXNxnI24XU0GtcZn3J90ZeWSXSOKqimlJrxRAT5j3ld3n8DUjBi8kL5UAJJKg9FvegDyrrqOnnQBwFNfFPnQM80Fyp43I1pAHY/GTZABQhhW58qzeRI6KYLWJnE4qGIAyjc8fhXLfM3seli6yW5IRtayzQEXT4dKwdpOtVS2OSZDYgXuN+oH7hQqtjdktwebkmlpbF9Wn41qsWupjbPpoMjJndH7TySXj/Bq+KkyeRtE32/yMeCkWQw7n2DvL4VzZ8btqjs62RU0Zd2NDmNe24eifw0rzXoeoK9okkusNSp/dSkCOzuY4zj1E8wMjdWtPStqYrWML56U3Kfy3f0h3R4XoA/MNflXfj6fyeXm78bFOzeZzs17nSSucD0JPwr0KYq18HkZOxawAS55VxJOnw+VaHM3J7aBcnSmIUWiwKjzHlQM6GkFPOgR1rQnkbeJC0gPDTyBQUDJLi43SS7W9fHyrHI4OzrqTUOBEsOO0dQPwSvJvbU+grjmpaYEfEoHqNneFQYNQMywqhHqd0TxoFIKYNjnKVConh86qQGMlu5hjQADoNaSY4kq3IcbKyX3ogRJqR1X/Kuql9DkvTUdwpXFAT6hqD1Iq2QmWiTvLN4bt+eGFxc5wLQSehrJUmwrxEmS5fKz57nSzPJc8kkqtd6UHG3ICTtPgR43XzpiElyqRf8AdTENGRPUQltF1WqSJkSS8kpY9POgQuOAlCbJSkpVCY4rAEIBqf41LZokOiMDc1EcPwSobLSHRE7Ui/W2nlUtlQPNiDSFIRFDalsaQ+yJxXaAGmpkuB5sUbPqJJsABSkpIeDXOG3btaLk6VLZSQ41kbUcTuJ8aQ4Ho4ppnFsYQWHRAKltIcEnj8O0I+U7vLrWbuaVqTWJguJayGMkmykW/wACsXY2VSfxOGY1wOQdx1ARb1i7lwTkHHPY3+20Rx6k9beNZ8pAOhx41SAGWTqei1DYyQj41w2uzJNrRcMF08qmQkOxIlJjwoUJH19QT/OkJoOd+l45hn5GdrQ1quBKBelAiidz/dvCwN2LxLQ+QWEg0XpXVj61raszd0tzHec7q5fnJnSZE737ifQpIU16WPDWpzWyt7EQ3GllO6UoDY1rMGYfDC2MIwfO1Q9SkhVl1VxsnSgBSEgb9AdKBye3XRiNbp6vhQAlUIAUkdDcUAKYySQtjT1v+lo+o+QFKRpSaF2p9p+f54MnzG/8bx7vVvkCyOaPBvT51y5M6RvTH8m6dq9kcB2vE0cbiNdlEevKkAdIT8TXFa7tubwlsWw73Dz0A6qKgBMWIXO3m+ho4jbD44WsYFCJ+CmtIIkHypS0FLDrUNlIAZMS4AKb+pKzNApkbnO9VgbJqKfEUj7II2gL4qB8PGrVSXYe9LQgQkVZDY4xjnkFw00SqSIbDseLaAXa9BretaozswyJgc4JbzNxW9FqYWcIlWNDWhOl/DSvSooRwWY3I9TuABHU+BqyDP8A7g883AwpGByOQgX61z5baQaJSzB+Bx5eZ5x+ZKpG4lp8QK83LaEelhpJtPHQexjta0C/XoLV58naEORE1Gt6BDZY5wHXy+FEDk7Hi9ZFOl/LWmqibCo2NYLIWlCFP7KtGbHPeQoAoFqoUDb5A4L4WW9JsaQLI4uJujDof86k0QO97Wix/wDL41LGDOc0qGgkL6b/AMKkY28Hqb636rQOQM5EUQPRzen7KRZHZHIOeoDiB1Oh8qJKgin5silE3LcGmODsOM/KcHSAnwJ0oCScx8dsDW2Q9D0qkYWY+cgO/wBPVaZB6N1kcugLT4rTJaGM3ObE3aLnx1NUgSIOXLL1Vy3NKZNFUBme+UpG036iqgew/i8TI92+VUOvl4rTMndBUzsfBYjCHf6flrTJ3IDNzzKdsevQi1Js2VQSOAucC/6h+xaQMW87QiWKjSmADMrz4L1HlTAGf7YKdfGqAZerlJXyHhVCEOHtixVBbxHxpgwdz3BALN8PPwqkTIlqqXOUopNMliizxVuot0oAdijFlCgWPxFIQRsBvYHoTUiHUboBayJb50xHkI1Uk2Pha/SgQsuUFo18R++mhDTnNABGvh8OtMYO6XaDfbt8LfsoExL3K0q7REoCRo+qxKFLHQ1SRLZ4PDUJ10UVRItziSACUFhQSIKC5+KlOnhRIzzntYQfza/M0CLRFKQdPLclvmaRQuSQ7UP0joLa0DFxuG0Ftni/lUjC2OKbT6i7obm16CWNveYyS47RbXWgbGH5QFmn6rl2pUeFEFIb2zZL0x2lxUKt/wDpTCUSmD23kTBsmW4Ma65TU/Emgh3gm4OLw8O0UYe7Xf0Hz60jN2bCvQR6jfqGafM0EguVES0oLDp1FJjKpy/HiZrwWj1WUhXIdKpOAMV7m7PdHlOmY0lSSWmyHzr0MeTQytjRXhwpY4tLVIt+NbcpMuJLcd2xl5r2tx4CR4paqSbItZVL5w/2xlKS5aMCBQdK0VTkv2F4LljdvcHw7GyuDXvaOqWqkjneR2BOR7047jWGOBzWAA2anwq4JVJM/wCf+4k+SHxwyFo0JBP7qJNq40igch3BmZZLnPLlJ1NS2awREuQ+SxcSNaQxgvcfMn9tACAV08blaAOON9UWgDygImjdQaYHdrnXaq+CXtSGSGNxk07g9wRp1caytkSOimB2JnH4mGENc4bj4kVyWzN7HpY+sluHtY1rWtYE8xWDcnYqpbHJpGQxEnQaH406qR2aqpIw8o7efbCjqRXQsWhxvsai45P1s7BIC1hN/Km1xQp5vUsmZwWOOPZPhN3ORSBrXJTM+UM77devGUMcZ25yGcWPbEQxpG4nwrTJmrXyZU69mXZ3bnGRQxS57mRSRgFznEC/SvO/PZvQ7vxVWrI7lu7+G4xns4zvcc2yWSrp1rXcsnJ260WhQuW76z8pWRO2MNgG6j516ePqVW54+XvN7FWnzJ8hxMj3FfE12KiR5lstrMYS5IWw11qjIUGgDzoA6Edqt6BHU/zpgeselAHvV4LuvSA6G2Cg3pgdaCSl0WgCwcDA18m1x2ECx8PjXNlPQ6+hq3a+DNLE5zmBzWoCNQfhXh9hwz6fBqiWzIBhbXM+m3p/nUYbyRnxeRuOQub6R1Ww8a6Dz0NywyyEFoRo1bqT4rRJYOccRBXFev8Ag0SAPNHG/cNoeTbS3zppktFbzsJ2NN7jPo/MBYV1UtKOe1II7mZS/ingXJuFrbHuc2TYpMJWMWQglR4V1M46nnyFb66qnSlASNFzigRV0PgKoQtsDiA51m+J1pSNIJjgYB4DxqGy0h1rCQNumqLSbLSHhC5fHyqWyx1sRHinU1Mjgejje8o2wWw/fUyWkP8AtxxgucVPh/CpkqB0MfIjQEbqht8qQ0hxrWN0u/qugqSh1kc05Rv066daTaRcSSmPxTGI6X6vOsncpVJfFwnvIjhisdSlZOxoqk/i8IxoLslyuCI0aJWLyGiROYuCGBQNkf5SbFPjWTbKQdjQAOSNnuPQK7/OokCUh418gDsx6AeotBSpkA/FiLQGYbEDbbjYj50gY8+HExmuyM6UekEuujakJ+Cndw/dHj+KY/H4xofKLb+n+ddWPA7bkWukZDznenMc1KTLOUd+QE/KvSx4K1OW+adiEbBLOVlJA6k9fnW5huExxRxKGhT463qZGOJtG4n1HUDzpFQLaCVBKNAVOqUxnUAs3TRalghBcFKFSOq0IDoYXAOdZvifGqHBbe1vt9z/AHK9v6WA4+Go3ZUwLQn+kda575q1Na429zeO0PtXwHbmyZ8QzuSGuRN6kcB+UHSuK+W1zfRbGgw8cdqkACydBUKgnYfMLIggu7oTZaGhpjZ1F/VrepKCY0aPNvTSqIHHPYnn1I8KoRHzAym+n4Vm1JomJjh2HcVU0koG2K3p6GfUq26GgQ+xjyL2J18L1SIbCY4dC4Klk+FWkS2GxRENCWTTr8a1SM2x5Q0LotUSHYTLA2A6Eda7cNfJx5WGPcjQRc9V8RXachH5mS3HifIbIpHxFJsZ85/c3n5c3MOFC5XvcgS4U2rgyWlnTjrqSnYvDDHxmOLfq+pa8zI5Z6uNQi/uIT2mC5GgHySsjQ62HehJQfyoRLYQIw1vqQCrIbPH6gBp1oENyODUAC+J+WtJlIFdMpO0qT9K1DZcA/vJY69b3/wKJGNSZWob00/zpSNIEL5CQASD4jSkNo6ZGsW/q1PjemABPmgKwG4/bSKSIbJyifqd6zYf50GiQIz3ZnIFBcLgfh+NAw6HjNxDnqoK3uia2NBHIl8eARN2kAjo7pf+FNGbY45XeCePS1BIw5pDtxKj8KpACyZo+hpuLA9BTCCKyph9TiQL+onxoLVQTGD8p+xo9BPq8U8KqBNwTseBDjN3PsQNKo522yP5LkPbbthcjVQgUSVWhW8jJmlf6ruW16mToVUdggLtpJQLql0oE2OvcI2gNv5nVfOhEAL3km5RdSq6VQDPuHcAAoSwXWqgYw9iGyEnQ+HxoEMOG0rdTqt/hVoQhxc4aX69NaZLY2I1UuKE/UlzTkQtkP8ApKaEjWnJLHTG25A1HpPitIUiW7WusVDlsPGmA4AoAeRtGgpCkUqEEadfCgR3edpWwP1edAhqRyqBpcu+FUMadKbePj0CeFMQPIfSF1XXyogAWTLjj+s+oDQeNWqkyBuzJZ3bYgl0DR/GrgA/FicR/cJOl+o/GkyWFPeGjwb49KmBA75h6kPmQR/jWmkAK6YuBJK9Qgv8KoC4OlDLAK0/41qBjrLj1eok320hi2vANig6gXvSGOe8WnaCgF3AXIPxogBbMXKy3BsbV32B8tdaZLtBL4nbjR6816LfbotKTJ5Cegw8fEA9iIBnVzhf8KCZY6h1adwFwDYUhHpnsLfW7cbWb9PwoQ0wT+45x2hGnQN0T40DY5JG0A7tfmAvhegUla5jkMbGDjK5oA/KOh+NVWrYmyh5zncxL7eLGXMJ+oA3Pxrtx4mY2ypBvGdiwtd72b6RqA4612qhwZM7exPuz+F4OLbE2Nrm2BUfvrSDl1tuVrmPuRhwtcIHgkBNi6L0WqRdcZnHMd/Zec47XkN8QU+HypSarGkVDK5ifIcS55IPWlJotCOfO9yF5/nSAbL7efgNKAEFykr5fNKAPLqp+BoA5uBCDQedDAUGF6hFpDWobi8ZPkI7b6dCTaxrO2RI6KYHYncXioYPU8bni19FFcl8rZ6WPrJbkg2MBqNG1NB4J0SsGztqkthMzwxplVQDc/GhKQtaERM3Iyl+2IhNPKupYkcN87nQ7NJkSsEcrUCKqJrTrVIm1rNaioMNxQgEkkWA1puwVxstfDdlZWfH7zgYhqpWuPJ2lXQ9DH1J1LniwcZ2/gmLPla4C/qIunhXnWdsltEeiuOOupW+W+5OJhsdFxUbR/rOldWPpO38jgzd6tdjO+U7t5LlHkzSuLTceFepj69a+DxsvctYgnSSTOO5xP7q6koOF2b3PN8xc9aRECg31L/CgZ1EUn6fCgDtwBQBywFxp0piFAHXxoAWG+Omg60AOBgI9V1/dQAna24Clf2+FACo2Oe4MaFebIBe9S2a0rJpHaPZmVnQiR0TgXAepCLV5ebOkz3ev19Db+2OzcfF4h6z+1lFChKtPkmorz8kZNTrpltjcPYOP29l5bFdNNkDHYwk36nyqMVGma5uzSIgqXIdvjhJQwPL4QdrXPOvnXTKZwptgiM2lrQoboel6llAE2PI9XuJIBt4CgEMCN73lqFxIS1h5Uxg2XxRkYfd0SzG+elOt4JepSuexpIMaaINUXQDUV3YrSzizV0KJEHtag+oGu5nmqR0QOeQXAho/jUyUqhEeNtu0a6LUtmnEebA7/xLoh6+dQ7FJDzMdwUpf9lTJpA83GQetAvQVPIaQ6yBR6Qo8Re9JspIeZCxjVcVJuPl1pSXAsNe9SAjDp0qRixGyNA76/DpSbGOxwzSn02CqQfhSbgpEjjcY0+qYqTeody1UmsXAcSkEanq5FSsXY0VScxeDjY0vyVJQKwCy1i7mkE7jYRG1kLdg1JOv7etZtjkkYcdrCGxNMkupsrRUSMk4OLLvXluDQ64aKiRSGRNAJZgxf8Aicl71I0ENxWRLJmSAkBTdAlJjK1z33D4jiGmGB4e9EsbKPhWtMNrEtpbmSdyd/chy7yxshZD/SNL16WPrqu5y3zfBU9uTkP3SG2pJ1rs0RzOWFRY8bBtaNzj1PQ1LYx5WopNun/SkB5u4oBYG1qBwOABosPV5pSEJc4ak3dcDrQUme3OeU0A8OlAyb4DtXl+4MhsHG4rnuVPecCGAfFL1nbIqmio2br2d9lcDjnMzuZH6vNHq2OHoB8hXFfLa2x0VSRq+Jw0cUbYomBkTLNY0INLJWaxzuJ3JCPEjgBJsTZDWiqkZ8pEy5IA9thU6J0NS7FKoIC57iD9X9R0FZGmwraUQoQt18/CgJPB6ENXp8qCTgLnD1Hb49bUFHCEcFQgUBIh8pcQyO3X40DHImhEdc+NEEth0DADtA9RrRIzbCxGGi9iLH51qkQ2LMrQobbwPWhuAiREZfI8NTXRKddWK2iJuBntxoNTXq46wjzbuWJlenqJvqlamRSe+uaGBgv9W0oV61jktCKqfOmN7nOc87IeN7GuIH415uS0I9PDXU2Pg8Z8EDA0bQQAR5V5zZ3FhhgAQuUJYk1aRk2EpsJIuRVCEvcCSU6hR4GgAV8uq/C3hUFQMSTOIvoLFPCkxoElmAKAgk/JKktAj52ApuUDqvjSKSGg9p1sEXyIoGMTZkYCD6gFC2FIcEe/MkeUVCSoPSgpIEmJerW6u/CkixLMB87vV0Qk0xSSeLhMhQEX/YV60zN2DBsA2pbQrTIPOYT09J6/HxoCRDiyIAucgTr1+FOBEflZbSSGhD/CmxpEZJOUQAfClJUDLsSbJKP9LbafuqkJsNxmR4cVo0aCSv8AjWnJk9QfK5FznFhRfEUSUqAcgZKCAf7h6GgtKAWLB90EkbSDa3jQ0DsKnYYAW6u/M4UEzJGSOL3KSSBrVDQwgeAAoAOvS1UMUIw0emgQ05oKNRFNx1+NNEg7o7+Lrre1VIhIi9SXWxWqJYsQtDmqQp0H86CZF7GklR5p1oFJ4tJB3A2vb+dMkZ2EWPgoXpVCk6WtIRP29DegBp8gFytxpbx8KBjbpdxUXJB/zogQkvu7xAAQ9BQAFNmRMU7lJKWNaKpMkdkci94c2MaWAOlaKoCMfDmyXgvUHVKJgTJjHxIoAF+SfzqJCRx0jGtJ6dENqCJApclybYyka3Q1cDGHPACucSn0lUoAHOSSQl0+dMZdlshO8hUPQfKs0UOxtc/0gKD06fzNJktknj8XlSjc1iR2C9FoQnYl8fhseNqv/uSHRo/dQZO5Mxwsjj2oIx4N+pPGkTItrwixNHj6tfMUiR2M77qSTpv0+QplCixEVSfOw/CkxSc2MY4bkQag6AUhnnFgBIYXO6EfTagCI7hyJcbjJ5yU2NPoH8Ka3KRkfDcjh85NI/ksqzHE+2T4dDXrYqpI4Oy7LYlsnu/guGZ7eNtUA3HlXTBwpWe5SuZ+5mTLubA7aw6IUqjRY0ij5/dGbmEvkkPnek2XCRCzZckhO51tQ5daRQO57jc9fw+VIQgkp4jp8aAEjp8r9PKgD2iIL+FAI4gVU1/jQAprHFwDRagcSSGJxGTko5rUa7qbCsbZUjox9e1ifweChgAc+79PL5VyXztnp4+oluSPssa2w+Vc/KTtWOFoIdPGxRYHzvVKrE7pEXNnTOcQy7V+r4V0VxqDjtlc6HcjK96BrdZFQka061hjvk5VgfxONE8bXMaXSjS2tFskMKYZRbOP7TyuTjjkfGY0QEuso+Brhv2VU9GvW5LUspwu3uAxgclzXPZ1dcqPCuPnkyPQ63XHjWpUec+5XtNdBxjRG0KA/r5WrtxdKdbHnZu+q6IzzkefzuQeXTSkjzNlNepTDWux4eXtWu9WRW90h9Tj/jrW8QcbtJ1L+JTSgQtLHoB+AoGeaUN79b9DSAUqABvWmB0JYnrpQB3aD10t4UgPFRa/76YClUWseiaUDOhxHzoEeaT42GtAxyJjpCGt66gVLaRpSjZoXZfaTJ8hmVnhIxch1ia8zsdiNEe31ur8m58fzHDcPBHHG1jQxu1OqV4lm7HsVpAVkd28FPGpmEUiIioCBp/1oryQr0lFP5v7myQM/SY2SkEdmHcTp416Fa2sjiWOlNWUHlvuDlZ8zA9ytaQFXWtadeCL9ivgufFZH/I4bMiFXucAHJ0PVaysoI5SSg44PAdMdrv6Gn8FFZyEjM2JtcWMFuu3SlJUgjsZqESEknQN/wBVMRGcnxMWRjubI1GnoNa0x3hkXqmZtn8AMSZzmsO1ShNehXLJxWxgQxEWyjxS3+dU7CVR1uO43IK9EH86mRwONgAB3W/ctKRpC2sBcjW+rQkeVTJcDoia277k9OlKRwKu+0YDW6W6ikB0RxMAc4hx8KBwKAkmKMCAE6eVEwAZBxqkOl1OnWodilUlsXCLkZAwkHUnpWTZokT+NwKI+coQdG9TWLuapFgxMHajGM2NKKf51k2Mk4MaJp2Rt9x46nxqGBJQca9wDskhnVFqWxSHxRxsG3GZuJO0nr/nUFhbMHaPdzH2S7dF8zSYkyH5rvXieBic1rmulT6Qbr5mtKY7XE2kY73P9y8/ky+LHcWQ3IDSQv8AOvSxdVLVmF8y8FIkmysyTdK9xJuXGuxJLY5W29x6HGaADq8dTehsUD4RrblPEVJQrcC70jaDp8KBCgEv9R6LQODu5QjrDqmppFCSXO+mzNL+FMgkOJ4PkubyWY3F4z8iZ1vToL6k6CotZV3NK0bNw7L+wt2Z3csgcoB/StHp+HnXLbM7fx0NkkjbeJ7c47iIWwYOMyFrfzBoBtWX49ZG7kuyCJl0RNU/GtVUzdxL52Ncjbef80pNwNagk0xcp1PVPD4VlZmlUMCNQS74nyPxrI0k8XMY24BUJbShiG3PBCC/+dIcHtrEC2GttL0CgQ6YN+Rt1oHBwSOkv56aJTFA+wBC4tH7lpwJjjG7ngIg8fKhEhjZYogXKrvwrWYRENjBy95sdfkiVnzNFUUZQSAqpcL50mxxBLcdB6Q5Be9q7+vQ489ySeUagso6V6Z5zAcucRRuc4oGhaBHz390+5HTSHFhd6nHa1oKknxrhu5Z0Y6iOwu3yI45XN9TkcviSetebktyZ6lFCNUixmxtQix+SHxrKCmx5rk+oqNKYjj52tNrEfOgIB5Zup0/qqZHABNkxtQkggBSpQW6VBoRWZzUcDTtQuOoBpFqpBT81kSEtB23N/8ApSLVTsGWTcuVLk/upD4nZc8DqmnWgaUApyC8636NoKHmRyOALlv1oEw2KAan8f50yZDo3MADfJEFBm2dJBN0Fv8ACrTJZwybVH5T9PiKBixKTuQ2sEHRDVCI3O3yo78q3C31pPUpMEZhTSO9dv4/4FKBuw83DjiTd+VLjoacEO0jo9stS3h8kqiIBMhu8EE7QgQf50ikQmVE/wBSE7whAoRpIzC1xX3NVuEpibJFmXC0bSRu8RVpmTQ1MGTOuhYfqKWphsiOnx0CR3jco+FBSYN7LgUYEXUeNCHIPIt0/Z5UwEe2tzYLcn9tUScc0JtTXUfChCZ1sQBK3AQL+2nJDPPYNu5L9R8elUiBFh6QoJ0HlTASvUXbovQnwoExLztIJUjr5VQgeWRDf9nT5UwBZXKU3W0FqaCRl8rWep9kunU9KcSBGZnKKAyNVNtVJTxrStBNkdGzIyXBVDSiL+yrmBEvi8c2MhzrEnXrUNiklGNZG1G329TZKl6kjGVlBlm2clhpTSAi5ch7zudcKQn/AEqhiXSABShX8beFMY0+X3LaH9qedADRexp3auVD8KYGsQcM+Rwc5Gsdck2FZGXIlIMHEgegbveljpUEttkk3a5m1zio0Y3r/KmiUOCTa0tajQTol/xoEPRguCCyfmOpoEeki9t4ICnw1+NAD6tZd3pH7flQPcS6VpR0bbjRxP7DQVAh0ikgu3Hr4VJUCjM0BxeUXo3UGgSIrlIX5uFk4wYNsjCCXW10poXk+UeUGZwXOZeE9zgPccgCgFpNetRypMMtSIy82d8rmyOJ8FOoroTOVqGAumLyAD5fE0EjbnIUXrQBzctjqnWgBJIK62oE9zw2keoWWwoGdA/x0/CgBTY3vda69KBpMksLh8nIIO3a0anpesbZUjqx9e1iyYXb+NAAXje9FU6W61xXztnqY+pVbkoyFrGgBoHVPOuZ2k7640jk6xQ79oCKPEU1qF3xQDx+YMqQwkItq1vTijDHl5OAPk+PlhmUOUO1Tota4rJowzY2mLxIHxMLZYi4OtpTs5FSkLUneH7XnzpC6ZntQooUJaubL2FVHXh6/Is+NgcL25G6TJe3dqFK6VxWyXybHbwpiK7zn3JbE18PGtDD/wDaH+FdWLpTrY4M3sFX+JnXJc/m8jK58sjnEm5JUL5V6uPCqrRHh5eza/ki3Oe8q6661vByt/J1rU0uALn40EQLATaCFH8aBnkXT/pSA7oPVp1PSmB2x0pAeaSq2C6fCmB1UKfv0NAClvcfGgBSBPPVBrQBw7Vtbr5XpDEoT5+HhRIRITj4rpDYED+NZ2vB0UxSWXicCGFzZJhcXANceTI3oetiwqpZD3GMeMRxIALBP8a1x/hb3O55lUi8nuWd5UvJHT41rXAYX7JEzc3lSfncoOlbrEkc9uwyPlyJpCSXKdQtaqsHO7tnoMPKynBkTNxKaLTlImGzbOyMLJxeMZFJd6KWhdPjXmZnLOpaItgxyfUTcIAG61zmiGshm3Vu1pGnWgJAJW2UBLar40xgsx9wBqKDrQmOCv8AJcYZyVCn9lbVvBDqVvL4sYz1d9A8LVtW8kcQR0TigjbbqfOqkUCTiADdMQUTSjkHEbe1QWwruP7qcig5+nLfXKbEaLrRIQe2SP8ATC0hqIPFKAgfh48lyyXW4HhSdhpErjYji/bFGpNlNZuxokT+HwLnI7IKEdE/fWNshaRP4+C2Jv8AYZtaPzHW9lrF2ZRJY+K16bG73aLUtjRKQ8bIAHTna3w/glQ2MMhDYRsxY/7i3KKUqdQJGLjJHgyZb9rddtrUpFIHyncfC9vwuD5G+6wLtBDnG37KqtXZi/qZH3T908vML4MFxYz/AE6fiK78fV8sytmSM7yc7O5GQumcT1/Gu+tVU5bXdtzsWKwAOcCXG6jpQ2TASdrQC4J/p60hig4mzEpQAnYB9RUkKCf3UAKIVdyNXQUAdU6DTSgB/DwcnNmZjYkT8id5RrGAuKnyFJuC1Vs2Xsn7Cclyft5ncchxcQof0zPqd5E1z2yt7Giqq6+TfuB7O4LtrGZjcXiMjDRd6DeT8ay4zuN2kmxsbdyXuv8A1p6ImRL8lmjT6TYUSOASbJc46/wrN2LVRgvKqpAPloaiSoESPDQUuALeOlQ2UkCGYl1vpqJLHEcUGoN06rTE2K2bSFFh46GlAJjTmySqiAXXxSgY5FjFFdoUt4mqSJ5BAgCKQSl7U4JdhuWRsLVUbhZRSGgT9a4H066KOgHjU8i+I0/kLhpUN6p4+NQ7FKqEszHudta7aNPhSkbRJ4UgfIGEkeFaU1ZnbYtuHLG1o2m5/AV7uFQjyMr1FSPClL6A10HMVHvTlxgcfIdwDiLeNZZLQi6qT5ua9/cPchc4l0Mbjr41513CO7HU2/goIcTEaQECfBfhXCdkEo/LagLT1TToKJCBiTJaLqgGo0qZGkR+XykUFiVaP3edJs0SITK7ibdgOpX8OlSy1UipuTnyLbiB1BpFcQcRiVfccnmfGkWht7oIvW0XF72oKA35zvpChpJAP7qcDgegD8gqqAWFyvyoYmSeNiuABdqNSAtzSIbDwAun0iyfvpEyKLgU8dARpQBwTeotGo1Px8qoUDhyLXOl7f51SIOb3H6rNKW8zQgH42EC/XQdbUENnpfbsSeqjwXwpwCYJJltYC0AbdPmaRUAUuS5ytuiX8KUlJA4yHhAVN1TSiRweMxeLLf9hpkwNS+2hXUa0JAROXK4lG2J/aPNKcFwAmRy6n/P51aAJhyJAW7h6evQkUzNhQlZtDgUF7HofjTJaG3I60YG3VPj1pEyDvxwCv5vhdaY+QK4OcS1xQLc/CqBscbEeuo/MaBNnHscAouB08aZEjBab2UoA4LVIQy/aNCi6/LwpgNvkYhAOnSmSCyTL/pB1/lVADSyKBfb0QeFNITYDk5YhUBHP8a0VRSQ2RnSz2aq6a9RpWiUCbHMXBfI7c8lP20NgTmPjxQtCgK3xNqhkinzBt26+B6DypQKQWXOX0Dr5/wqoGkAS5C2J8Pn+FUkMadIfq8dBpQhjZfu9KhAdaQHHP1+H/SgBp7iSSF8x0qgN8G11wPcOov4WtXOcoshjkGqXIGi/GgJFx+tWiw0KePmaACI2NYERd1wOnzpBuOtkawkbr/0tvamgY6XPcEjRjR1IQ+NAIaJVxKl8h1JsKChDntUK7y2N8/GpGjuyS6JGw/itDAQ5+PAASTJKNRqb+FMIBpn5UxVoETSVLvI0BBiP3Y7bjgyRyUQJdJaU+BNxXXiuacZqZLmwufGJB9Tb+ZHWu6ljhy0IwmyWX+dbHKeQAlRroKQHiUF7H+HnQB5dxQBV1oAcEbnu9LT4LRMDSbJPD4TKyNqNIb0J6jxrG2VI68fXtYsmDwWPAASN726nQVxXztnqYuqluTMOOxjfS0NT1J5VyuzO6uNIdaxqkDU3AWyGpNT22yqgUpQAoxRzMLHakEH+FCcA6porUvHZeHlmSBpc1xUJXcr1stTzHjtS0olcLj83kp2OyRthbq7yrG160Wh00pa71Lc4cTxsDff2/29C415/wB93od/2UWpV+X79jx2vj44AKLv00rtx9RvVnn5u8q7FB5Ln8vkXl0shcT0vXp0xVrsjxM3atd7kW4l59SkVucbbZ4ttYoeq/woJOhqC+tAxYBRCiUAed1t/K1IJPAXT8aAPa201vTA8B0W/jSA6LkLp560wOKvw8KAFbyRpr08KAOhXWAVNaRSUjsWO5xC6CodjauNh0WGGlT16Vk7nVXEkHxe1Ag/MNPhWL1OhQj0mW4BGk6XK0lQp5AV8sjiS463vrWqRi7SNlwKFbHqf4U4JkQZQSQuun+dOCWwrDZHI8F4sKTGmX7hYcZu1zIxvaiDT9tcl5OhGgcZL/bDV2j+gW6VyXNEydx3NDVBAB1cb2SsWMYyHv3Da1SdCaJKQI/EkeSZAo/pS1ElDL8MQjc8hqhUGtKQkEez3VbBHfq42VLLRMDgi83io2hz8lyu8PhVq5UFeyscIWwNKLcolbKxDQE7GLCDKbtOh6rVyTA2rT/bhYh8U1WqJHIuNLzvdp1B/jUuw+Idjce9xDYWKDYm5qXcriTWJ28T/dyHJ1RNayeQfEnMfjGRM9DEYRqgU/CsuUlQSEOM1r9zBvf/AFfwqZBEri8a5ySzFG6gHUipbGSEDImHZjM9Qt8fGobBBrMBziHZTi1gvtNj8qGwkYz+4OE4KJzpJGhzfpuCbUVrZ7CZl3dP3Zmn3wYHoaPzN1IPnXdj6vyY2yquxmOZymfysznyvc/cSfiK9CtK1OW2R2GW4jR6n38RVNkpBLWIPAn5KKmShzcEDQFPX40gOICVfprt86JA6gDSluieQoA4HqCl9DppRAx2KGSZ4iYHSPcoYxo3En4CkNVbNP7M+yncXchjyc5jsDjzf1BJHDr8Kxtl+DVVS3PontL7a9udpQMbgYrXTIN87xueT4qaxhvcHedi3lwa0geOlVsSDy5QaC0WXqvSodikgGaZ5uT4Vk7GiQwHlw8XC2lTJUC0KqT9N70AILvbuTZLlKUgDmcSekqKjcvYfbjxtG4m/j51fEjlIsFAjEtqfhSYCmwBx3Ep5/5UJAL9tjSNoUj6kqgk9vYFeTbW/WiRAuRmhpJjIRb+NQ7FKpHOyBItiTpbwrOTaIOCIuVLePitECkR+mO9QASDob/GlxGmJ9EN3fhoqVOw1qedyRhb6TpqTr8a0q4ZFq6ErxXcALmseQSfPpXr4csnk5sbRZBlB8W4usFO5a7ZOSDCfuz3VtEmPG+xBAQ9a5buWa0qU/saGNpbM8+txDiTZVvXFlZ6ONGrN5SCJgY6Qem2q1yQbajWT3BDE1Q8KQjD4AeAogtIgcjuphcWMJe5yoB4+dKDVVI2Xkpckne4s/0jz/jUlpHN0bAHEnzJ6UhnW5DVDG3OuvSiBDcuQT6VJGvzpQXIOXySlRZrvEdKBj+NhOeWud6tpNqJB2JnHgbGLBLa6H50jNsI9wtS4DutBMiDOCPSbpdNaIFIr3HEHcLHoOlAScQ2AKAAEgCqCToLm2IQBbUyRbZwdwOgvf8AdRAmLObsao6AKenwpsniCvyjIVB+olF/ilTJUDJ8dXeBFSUNPdruJAH4mgYI99yA6w6eAqhjZnEYRVI0PS9Amgd+Q57hqhFj51QQMveT6U3FLoetAxh0YTQly/hVkNnHWOlm6UhHGve4AqjengnhVDHmytbZ24N0X91Bm0GRgSK0qpVT50zPYU/CCEuai6O8KBcgct2nadToaYpGZAToQnT/ACpoYK8KHAj5fGqQgSVwDf8AHS1qpAASy+Fmi341SJAZpwGkHRNSfCqSAjcnPbGHMaflqUPStVUlsjiJ8pxJCNI0+PjWmiEHYuC1iOfZf3dahsTYc17GBOhNj1pEyJkyw0EA+ki1BQDJkueAD1W6XSmMGe4oFPpVQlAHHEAE/MfCmA05xKtNgf3UwPNIBT4IAaTGkIc8XcFU2H/ShAzm8DQr4r+3WqEb04vA3OJLXHRUAArmOYVHINqtCtOp6UwHGva12u4jwsq1IwoOklaD9A6jr8qYDrY2xkFqebjrSkQtuSAjGEyONtv5aYQdd627pyI2D5UMoYflQROPst3nwGlSECXTTTDc47GJYA9KbGcPsstG0PNtdKRQl0rGBZHL/S0afKkOJKp3jx45rh54GMa3YCQSirV1tDNq6HznmYxx55IZAhaUK6g9da9GtjHJQr2TD7UpBCNcFHyrrq5R5d6wxpTtNlutMgUxjnusNfmholDSkk8PhZ8i7gQ023G1YXypHXTruxZMLg4IS1z0dIUIJGg6/OuO+Zs9TF1UiahhaGiyg6N0rmdpO9US2CUaU/YBpas5NBTrkoEX6SAtIYhAoACmmAppW6p4rqaJAU0WBJv5/wAaQ0OnIhx27py0Bt73qeNnsN2SWpDch3lFiMMeKA54H1dAK6sfWdtWcGXu1ooRSeS7gzM53rkJTRq2Ar0ceGtTx83ZtYiXvfIVeVPWtzgbbPBuqnX9tMQtEQ6gaf50DO9Li9gtAHei6AajWgDtv4t+FIZxbgdVpk+TyAlCE8DQM5Ygjz0oE2ct8unSgcnlaL2tQB0AmwFzY2pSOGwiOBxRRbyqXY2rjbC4sUAAkovXWsXc6q40gpjGMHp/bWcyapI4Xi4BQ9EogciHSAnrfoT+8UyZE7gAh/A+AqoE2MPnaAvn41SRm7JA5ne4BPpqoM3aToBKn9g0oESOEdpaQdvlUWNaly4bKKbSRuHVfGua501LxxMznlrLuBv5VyXNUW/FBftLSoN/IVzMokhBFC1ZE3EAon7qkYlwdJuZGwr0J8vKpKI7JxQ126Zdxvs6Uy0Rrp3F5ZCxAuqa0mUhqXGaR7uSflQmMhs2Np9GPGh6lL1rURDv4qRxJms3w61srENCoONK7IGFy6FKTsLiS+Jwbhtfkaf0m2tZu5ZOY2DFFGGwx7dt956Vk2AczHYD6QXO8TrUsYczAc5qzehh6fyqZE2FRsYz0QsV+gci0gJCLCe9v9921uoHx6UpAbzeZ4vhY3Pke0HUEop+VCTewjNe5/uqdr8fCCXTdqUrtx9VvVmdsiRl/I87yHKSF0r3esnqpr0a4lU5bZGwSLGLk927idTpVyZJBTWiMo0bQi/hSZR7cNWoXDrSgDo3uu8p4/5UMYsO1slrkn91IBO4WDbu6GnAHQx7ijtSUaOp/wCtAy+9m/avuXut7HRQPxMJyLPKL/IVjbKlp5NFX5Po3sv7Pdt9pxsyJoG5PINALppUJX51k+Vtw5+EaG10MQDYka1tg1thRohbiHZJT0hbaVLZSQI+bcUC7RqlQ2WkDSENCFCT4XrNspIEdKHOIaPnoiVJY4x1lS4FiLpSFI80PkuCgNkNlqkmQ2Ouxm33IvXpVcQ5AJhDHI0X1XyrFouR1ikAFSTZdKpAdBa0aKfBdKQhQc5ARqBb/HWmSMz5IbcqrunnSkuqIyfMc5xQ6fj+FZtmiQKkkrlQhfE6ilBUwPxwhrCXD4hf4UJCmR52RCwgBwtqRTmBDMvIwRsIYUGoQ3obKVZIDJ5CSWQNaUCqvlUSWkJD5JmbW+snp5GhDD+O4nMje17nHafpOlb47NM5c1UwruTuP/gOLf7r9rtp+On7RXqVyaQeZakHyj3p3i/leXJ3KxrjtNaqoloEcH3jJjxtZE4qCBr1rnviO3HYs2L3Dn5so3ykNd4WrmtSDpqyekllmiaJX+aA6edYmoPHGWuUO00NSy0GxSBrQb2UOJ1vUQMcfM7o5T462ogB6IkjYLE3Ty8aBDrIHOKrapKkPgxmhC43T5p8qRPIMDmMCmy69KIAbdmtXazofPrRAHonPlcXO+ANBLH2RgfH83l50Ej4FlAJ6efxoASUstjoPOgBoyGwTyFNANOc4E21VRRICNr5CVNvEePlUNlDrW7G9L/M0iTjkUk6nQfwpjBpiA1CqJqPOmABK8hrgLHWmWgYte4+oXOlMGNiNUttTqFqhSLDQ0GxDqBCAd5RgsB6vH9lMgQ5oYpVSep+FMBsWJDAvRTrp1piHYoHuuQHEIijRackWZJxR7R1tqtBiwveNiE7gVAXQeNWjMCnY1o3ag+F6cFSRb37XbHfSPptSRQLK66B21RYHyqhkfNKQXMuPPwpoCLzMuOJpJICafLwrRVEQWRlTZD0YLfhrW6UEM9DhPedzz11PjRJIZG1kLUH1NuFpBIp84BXco6AWoAEkyXqbovTotOAGXykOub6kUQAj3VAug6/OgbGDKL7Ph5+FOBSd9xfq9KeXSgZ7d6S46XGlqAEl4Fh0CpQMbdI5xRuh1PnTEPQwvehNhoSdPjQwNxdMwt9oN3Osvga5jmHmABoY4o3XaNFoKH49jBdqKFDj4LQA8yZyKwE9FNAoOktC+/JYC39NulKBjX6sBxjxY1d/VolNDSOgySAmeTRVaL1IxO5se72wGhbP/jQBwZcLfze5IOgoCAeTIlPqcRGx3QItBaQO/J3DbGNNXPpFoCyZog14lcZpHdE6edIoxPvbjjHnyZPt7d50H767sT0C6kpOZj+4wkC7fpNdlLHBlpIPh8fLO6zSU16AVV8iqY48Lsyz8fwsMDQXhXkKSa4r5m9j1sXVS3JqCFsYDQAiX6ha5XZs760SH0UqPpCWNSai2IgGvj++kMUHaXUi/n8qQzzng/Vrqo/yoEe3WsQB18UNEAcfkRQtLpCAik7rU1WROyRCZ3csUCiI7jpu+FdNOu2cOTtquxVc/ncjKf6iSD+QaCu6mFI8rL2nYinyvkcr3fA1ukcNrtnNgB8R/KmShQADiGkJ5ftoGd8E81+FAHU8Br870AdCEWsaQHiVH+P40xScQDVFGo0IoGeVSWuUeCUBB49SqnwFBJwuCp0OgSgGjqHw0uppSUkOsh3WAUnRal2Nq0kOjxLjdc+HnWTsdNcYQGMY3RfLSomTZKBLng6WQdKIGIc5xGnp181ogUnNwJJIt0/zpwKRl84bcICPCqVTN3gYfK5xRvhbzqkjJ2kQ1hPn8aZEDzYfxpNlwERxHrr18alstILhbt0IUoazbLROcc57Xgi3nWNjahoHBzNIAenjauS50Iu3H5ZKNYy2m741zNFJEsxsSh0zlA86gcCy5zhsgABVNx/xepKSB5sRoLnTncf6VqZLIvJUktij0sCiVSGCfpS52+ZwDfA/upgcOOCrYI16bj4+K0SAk8EZNpmOhB2Np8xMNg4uOJu1kYYepP7aGxIdGM1wIKvKi5/hSkYTDgPN5EDSdF0FSAezHY0bYWK7QE+WtKRhMOA953ZTtoW4takJscys/j+Lhc5zgwN+l51HwFESKGzOu5PuZDC2SLDcslwHHX5JXTj6zsTa6qZTync3IcrI4ukcQ42udK9KmJVOS+Z22I1mO95BlO4f41raTHcKaxoQNCpZSERako6SQP9X5etAHfUQrtP6aAPdTtFA4FEoEcVJKgCgD20kqU2jS1AFo7V7D7h7qyGx8XiO9gn1ZUgIZ53rO10jRUPorsf7EcJwQizec/99nA7vWAWtPkPKsG3YrklsaxE7DwY2w4kbY2NCANCDyqdETqwaTJdJY3B6eXjSdioPNDifUbHQVI4OPFtdNaQ0DvJZc66/jUlDB9Z8wFtUNDTHY8UlLotydSlNVBsebHGwEJ8VSq4kyeEwYURetLkkECDM54Qn+XwWlykcDTlNxfwB1pNAmNN9zftT0k6VBUj/pib67bTYDWqgJkDyM1pVsZuP31DYJArhJINxP1aAa2FTBomDmFjULyNw6LSge5ybKZCEGoGmpoCCLyc/IcoisfBOlS2aJEW+bJ3K5xIPQdVqSoGn5YHp3F3lqp8KJLSQ5iYOXmSNUEM8BqlCIs4LpxXDsiaC5th1d9VhW1aHNa5YoooGx7doQhFKJXSkkYSZ59xOGfyODJFGhsQCPCod+LktUk+Wue7JycHJeZCdocbdUrtx55RlbAQ0UQw3IApabDrr51tuSlxLLxGe9jmklBr86wvU6KMtUfJlzQBY6fGuV1OhElDO1zVchefNQlZNQaJhjN0jvQE0qQDocHcbp8akQdFjtYAHdBddfHpSbFI8C1gOgPUD4daEA0/MDQ5rdTcH49BQEAj5ppSgJctlugoKQbi47nXfb91AiTiDWD0/I6BKkgWQqdPLWwpoBD5hcN6+HSqEIcVVB8SelSCPf6gF6ldNESpYz0bN1z6mhQF8VpDHnANCpcEoTY2pAhlxRA8oRqgQ/KgENSSlr+oA+dqYwN83uG35rL4UFDfsq0pooCkftpyEiAwgA9Oq+FMBElgdvwDhTJQw9hJBKAXJHXy1qhM4E2lwHpGi00SMuD3oEAb1cOtMB2LGPXSykL8qDN2D4Y2hFHVAB50zNhIGiCwslMzbG3A6qvkKskalkABY67fGw0pjIzKawA9QVuLCgtETO8N9RKHRfDzqhld5HlmBxZEpcmq3tW1aEtkZHHNl+t4O0n51psQHNxY4gLKdCn76mRiJpGss0i2gXSmSBzTFUCho8OppgCSSmxJQXuaqAYy7IQobhFK6inAhBmcSEPkaIBCfdc8WKeI/lRAzwKfUik3oA97gtewsp1Pw8qBnDIRZbDUeJogUiFMnpAIPiDT2CQ6HEDQHPHRRfwpSODmXkhkexnpBsEtrTSJZuEYbH9RDSthr1/ZXKYMfClNrQ0jRzvjQB4zQxWmcXyXQeFMcDbsyZ52xMRh6mgaRwC+6Zxe4npe9IaHBKQwggRtsUOvzoQ2MfrRG4tiDpH9DdKkcDGRM9/+9J1uxuqUFpQejfIm5jQxuu46+VIcDjtzmreR51LtAtIBiYsaVndtX8opgRmRLI/+3ixoB1OpWqSKRTO5uIM0LpJXLJre963o4KKPicE6d7i4I1t00vV2ywXXDIWzjmY92tRp6jofOsXeTopiSHtoBSwX8UqJN4FtQlANfKkUOoUNrGw+NIZ0XKEW8PM0AccWts8r4X6UAxqTIiiarnIwaDqtUqtkWukQ2f3HHEvs+p39Qropgb3OHJ2kisZvOT5JPqIaei6V3VwpHl5Oy2RjpZJCSdNF1862SOJ2kSGBdfM1RO4ogBU06L1WkM6gaQB+A8aQHU2ooQmwTqKAOnUE9AhFAHQUuigXSgDylbjQ/E0wOByjy/ZQI8UINv2+FAzhJ10boKBnUXroOlIIFtjBIBSk2aKoVFjjroTrWTsb1oGsja1LIdErNs6EoPOcA5B00/x1oGIJG7W+tMQjdZOpubUxSNSzNAIaT8KcEOyB3yvfYkonW16tIydpONYTfVaJJgebCmov0pSVA/HF086mS0h9kLkIHXRKlspIIZjXUBPFfIWqGy4CY8dCriL2sKlspIkMU7SkQHxIWs7GiLdwhDHtdK4aqmumtc1jVF4xpvSCwIfFOhrmZsibw2e4wPldtARGnxFZgSkTOkWg0I/nUMYp+K0AOmI3NNSNMjsrYSY8aM+APXy+FNDQE3jHyO3ZBRfUgqpGSccMUbdrGgdD43qdxDghCtDQSVSgDzcQl26Qo0i56LRIQLbCwHbCxSbB1KRhMfGved2QUammlKSZFT5mFgRklwGzVztNKQ2myi9w/cbCwWvbA/dIFHkCnSummC1iHdVMn5zvTkeWkd63Bh/atenjwKpy3zTsV4RyykOmcVNx43reY2MNWFRRRsBQX8amRiyUCH1O8KBilc65t/KgDgHqLGrYW/jQAoAaFd3RaAOhrnFdGfglAyY4LtfmO4spmLxWI+Z7iAXgHaPMmptZIpUZv/Y3/bzi4nt8h3U8TzBHDHUhgS+nWsHd22LlLY2zDw+L4bHGPxuO2JrQAECafCphIjViJZpJDtUqbpUtlpCWxuchdqLg+BFTBQvcxpKgaIfI0gEmUISbWQW/ZSkcDDpm223cNB/nSkaR4NfIQX/gKICR4MYwJ1BFqaJOukAarrIb/wDQUSAPJIpQu01TrWdmaJDSlyJp4+NQtQegRHDtCqidDetFUlsedG0NG+48/wCVXBIJkZUWOuwAvHWos4KSkjJJzKbKOvnWDZtVQca1kY3G+iUhg+RlOKhLaA0NjSATMXenog18KgtHf7JG553L81NAMYmBcD7bEb/UmtDBEa/DyppA1jSB49akuSW4ztsWdKFKqrhpVKrZnbIWfGwoMcNRqFvUitlUwdpHpMmKAetwsLHzq2yYkAk5fc5IjYFP51k7mixgeZkMmjRyEkFB8amZNEoMq7v4puUXBrFcqnoAnjVVvDNOMoyvkO2pWSueW3X5V21ymFsYLBgOgIBFidfhVu0iVIJXHaV2hb/srNmiJvFicoLtdLVjYosGIEI2hVtesgZLRuDAHWuNRZakBqTKDvoHwJ8KRUAzpJHNNkTUj9lAxUELnFSF6C62/wA6YpDY4mxhDqCpIqRSFCRrR4+JX9lOAPHKZGiBPBaUEwMnO3HaAS46X06UyhTC9wIddpCga60SSPlwa1u1US6XqGAlnq1bYa31Sy0hhTXhgCaJeiBCHPclit0IPRKcADzZDWLdFstEDQE5ZHfBPVca0ih5sahX28PlTgUnJJWNIS66eaUoGDSHftLbfP8AfVBIkBL6CwXRaaRI0Tcgo4dFGtUDPCEvTcEHhTRDYVFiABSE0/ZTghsd9ogKNApFMhsT+f1C1vnQSL99OoC3AqkQweWUqiahSpFMmCMyMgh5AKElUPXzqiwLI5CKJhlc4KNGk1SrIFS5DlZst5jgDgCUX410VrASNYvGXEs7lVClDsKQ7ayAEAoP6ha3lSECST7rjQdPhTAjZJCtlsPBdaoQw6QNCE+ZHhVCBJJQSg+YGhNMTB9hVPC/kpphAoL+OnwoHB1VBB1086AEFwsPkB5UCbOBXBGj0m69KokchicTe62SlJUSFD2scb3fULIfHWpgYPLnOkswbbXpwJsabH7g3SEEGqBG6e6xh9A3k3DltXGYpDnvZMyEu2t1+NBZ5joySQ3dJqpKimAqWVv1SuAT8vypCQ3+tQFsTUTRxoGkDyZAdKG7/dP9A0B8KRbHGueR6iGN8BrSGENiahMTPMvfrSCTqxMJDnmRyL6dKAFsbl5AIYzbFZTQMafiRRHdK7fJ4X66U0iZA3Ee44ABng3QaVQMgOZELA4JvcQVBv8AGma0Usq8LGtkdtb9VyKybPUqtBnNxQPUwbQLrqFpKxfGCOc3aVQAAg/E1ZJwg+FipaBQMWNwBLvSoVfEUCGJMhkCkuDQPHx8apVbJtdIhM/uGOMFsRBWxNdNMEnBl7SRWczmcickhyqSAlq7a4kjysnYdiNe+R5JJKeBrY5OUiWssbJ0A8qYhYJFxp1oCDqflW/WgBSFunTX50AeIB+A1oA6NNNPD+FIDij5NvQM7rfr50CPKvmv4UxnPIFP3UCOC5Ro0086BixCVC/E+CVLZarIRHAfqA/ZWbsb1xhccICW1spvrUOxuqD3pjCka/OoNBsuBCHr08aaRMibXuiDSmIYfKG9dPxv0qkiHaBl8znaKnSqSMnYS2MnX5rdaZMDzYWlF06GlJSqENg66n9tS2XAQ2EkBoB/zqWyoH48dxN+hGnhUNlwFMx2tPq0CIvhUNlJDoQlGXPw6VJQ6I1ALlUaihjgIiNwI2lehGq1DKRZeIxpnuDpCQOo0rC7NkaHx0TnRhrG73W+FcjZoWHEwRGFmd6h0F9ahsaYcMmOIe3jMvoahoOMiDA6RX5DvTqRqTSKPOEYVsbAPhqPGgDvtFwO0epLqVtQJMdZigHdMiDToaUjOktPpiaVVAgoBjreOlmCzuQC+13ldKYSKdNhYDHO9IPidKncSllL7j+4eFgB4ZJukbaxCWFb0wWsJtIyLn+/uQ5RxbC9wj01Ir0sfWS3Oa+b4Ks79RlK6V5N7uJ611aLY5pb3HooGMbcqRYEhaTAdKAovTp0pFHFcSXAWF/CgBQt1N+vxoA6g16ppQB0KfS0JQAZx3FZ/K5DcXjsd+RkOIAawKL+JpNpFKrNw7F/7fczNMWb3Q/2oj6v0vklwT1rF3nYvRG/cJ27wPbGO3G4zFZGGW3gBSlRC3e4S2GyZbpCg6m1KWCqIa0uRyouq/yqYGL2tYqXP86Ak44EhHmxGg/nSKB3hrbKniT++oYAxcZCQwqzqTapLHG+zE25Dj+xaoliJs1jRYgAXt0SpdilWQP/AJYOckep66Cp5j4BMUjneoD4k6UpEwgQveRuuD86pVFI8I2tBA6amrVYJbOOyI2A6BClDYokBy88bS1hHjrqlZu5oqELLO5ziVXQkH+FYNmyR5sqbQAh1LtShpMo46SxC/A9PwpDgDlymgow73Gw+dAA0WPmZEqEOazoE6UQJuCcxOGcE9xV6r4nyq1STN3DWcdCy3UdU1quEEchbceCNDtG78KIQSOh6Ig9KXNNOBQD5nIiBrg0+o6DUg/GpdoLrWSuzZGVlyK8nYuvVKxbk2g457YWklyn/FhTK1Etmkna5oCBFUWUUggDy+N9wOU2pMaKpy3ExAENYrrqP51VbQNop2Zw5Lyduxy6V01vJDUAQxfZQ6nqU61ckh8FkLWkHU+C1LKRJRZAa1zjrax8DWcAOfqzKdpVB59KQJDjNQNRqOtSWHxtVC7X9haaSFI8HtjXaf8AqKZIh05BN73OmgpDgafM7YNblG9L0DgSPdlRShsq3NABUGO5pBdq3XyqWyQhxLQnQfspAIbIXfSECX86IGOb7uBsB0F16UyRTZdocVt+ygBmbJOjQdENkv4+dMAcAyuBcdPyrb4pSGPsHtNG4qfDypwIbkmJBaCg8tKIAYeXOduOml+tMZ5ul7E+GtAhTiqt6r81pgdZjqQ43NymnxpwS2GMiDQDoT49KZk2KDmAIdLI2mS2Ie5oBKp4fzpkgz3qSt9SD50ABSTFgQH4jS1NDBpMsBXLtANwTqlUIhuR5eOMloP9waJYKfCtVSRECRk8g9Xkhhunga1cIYdjYEOO0OeFd4n6lqHYk7kSsDSGWaEsE/ChBBHSy7rG7j59KtAgKeQBSU8An7qoGASyhxB/dVCBHvcbaeHX51RIggNHx69RQAkhdAFB1NMDjnIFLh43ogBuR4sg3DzpibOBj3lBcfgaBQFxxBjdzrAWQ9aQDU2YI/SwqgQH41SQpAnySzFXFSl/lVAOsVgBa1ToKkB5rJHI1NrfEBKRRtsbujGhernEfsrkMxxygGxc9LjQJTGhmR2Y4DY3YxB9JB/dSKUAZLgW7wXSdFsF+ZoAcG4r7hQWUN0oHoPR3YPbRrfHU1IeR+EsbKNoMknnbr50AgrbK/8A3pPbj8ACf3WoAfxG4TSjHbyvqJUFfmBQDkPN2+DfFvQfKhEEbmuYAdjN3iVQr/jWqGQWT7xed/pZ4i/xplkdliHYd5v0Pl50OTam5W3BgmJY5QuidPnXNY9WmwrIEftKqGyikimRUgjVAQl79a0Qhj07fShPnVkEdnTZwUY2MXa7Tub/ABNbUVfLMMlrxoip8i/liSZY3DyJCfvruxqng8fM8vwQUplJ9QIFdSPPtIgAWvdbLTMmKCdLlTceNDGjtj5eHxpDFWC9QtqAFu1C/JKYHAikn8OlAHWrY/s8KBngu39yapSA8/p4UCE+Ca9PjTA5exHjYBPnSGKGxfWooGoHomxKfV8QBeocm1UgqMRWRwRNPKsnJ01gfbs9KAp5VJodCj6bny/zpAIJd4Beq0xDRLl09S9KogZkMngg86pQZWkaAUncUHT/AAKokdaGrc36+K0mCgeaI1G4hL0ikExhlkcDYp8KhyaIfYGWV3WyrpUlBUQhQK5T+b/CVDKCAn5fl8ako6Ay+426UhofF02gBR8x+FSyhyKOIn+7LtHUITb8KGNQS2I3AG3Y8F3Sx/lWTk0UFp4qPDLmmSUAIECFf2Cua0mygvnGljYWjFG4dHWHTz61zsegeWucSZnlnkAT8VRakpB0AiT+2QnVfH50mTqEHaGBL+BOnnSBCUjK7nI7wTpQUONc7aRE0bf6lCrQToMvaC4mZ5abK1CbL8KRQQxzAAIGK5bOUKqUhAfJ5PMxxE4+G6V/5QHxtHyVwppLyPTwZL3Xl99PbKDx8kUHUiSMhOmjzXdirinczu7xojLMz9c55/Xbmm6g3/nXp1iNDhfLyNwiIIpU9PD9tNySEt2oD+weHyqRiyqWFkFvAUCEAXKm/VaChfUKqJ6UWgDxJVAPiaAOtRPUVKdfDzoAtfbHFdqZc7X9zc63j8YH1RsgyJXn4mOJwqG34Na8T6f+3MP2yx8aNnaeTj5cuj5C0seviRI1prB/UHJo0pnLULUHQtIRPlT8EqAVwuVcnin+VQWjn9kE9Xdf4UFDqlRb5UEnCfVp6rJQAiUvC+ldU0qWNAEpkX1A7U+S+dZuTRQIcXXJB2WUVIDT/cPkOp1pORoFkbDt9T79LH5qgrI0QHisxw9RIt7Agj+FAOYLNjbditQlLC2vzrdGLHV9HpaulglUQxiaTKU7IrrYgj+dJtjSRB5ZzSfU0tKnwP7q57Sb0gjnHI2aFF/6VBqcCgWUnw/nQBxzp/ys0Vbi/wC2hgIIeQ33HbW36H+C0gC8SPjwW+5MC/oNp+fSqUGbbJzGGICPbIcLfBPnWlYMXIWFS2o18/wrQkYkL1ARPA/vrNyWhm6j+OtSUxqV0m2zSnU2+S0mNEROAXq9yXsCDr8qyZsgPIfNtcMeMp/UCP50i0AN98yA5BDT0Go/ZQMlMYQrZ3qQaKlNEsXkFx+poAXVQmlDJRB5bcbc73HX8waSLK3yLcS+14VfVYp+6tKiZXMhmLv/ANwb7ooP8RWuokDOREj0S7h/GqGNjepXVL/CgQTB9XVE0qWNEnjWQlC1bDzqGUGxmRAg9Pmn7KRLPK65cPSultaCj2ulh1Hl50gO7cdfU4rbVf2W1pMA2L2V9KByjd4LSZDHzsFwhPh51IA8m0u9dnWP+VUB0Ltsb9f4UCGjvVXBT0A/jQMZlM3pQHd5aeS00MTGBb3ChTROnnQIKaQF2hSvq+HzoEMP321XwutUIa9Zd6rX/wAaWoGhwoA5PUUstv30ANnct11+a0APwiMH1FSoVV+VUQwwbUVoB8jQZ6iHn0nYLft/wlMTOEuQoOl0SgkHlLkPp8Vpkgkhl2fSU6XpoZHzucAVYpSwUL8qvQZAcg/k3K32y2JLuBBKedzWtYERkTIN6zSevwIOvmorQCUiLAAIAHOQoVA+OtZsljMhmsgd8SiU1AkBTF10Hq/Mf31RQDO6YNO1ilbXCfvq0DIqYS7yZCU6g6a+VWSJKkakeKLQIZeG9D+OpPktMBLfqup8V/bTEecAhQ2+AWgAaTcfKqRLOwti33cd3iAUpsA5vtBp2I49BYH9tQPwDZTsq+5npQ3BCp+NUoER519WvUVQh0LoPH1E0DCoBGDcqbL4VAg0Kg2prr1/bQM//9k="
                }
            }, {
                "attributes": {
                    "align": "center"
                },
                "insert": "\n"
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": "by "
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": "Your Name"
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": " on September 04"
            }, {
                "insert": "\n"
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat."
            }, {
                "insert": "\n"
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan."
            }, {
                "insert": "\n\n"
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": "THIS WEEK'S"
            }, {
                "attributes": {
                    "align": "center"
                },
                "insert": "\n"
            }, {
                "attributes": {
                    "background": "transparent",
                    "bold": true
                },
                "insert": "TOP STORIES"
            }, {
                "attributes": {
                    "align": "center"
                },
                "insert": "\n\n"
            }, {
                "attributes": {
                    "height": "231",
                    "width": "623",
                    "background": "transparent"
                },
                "insert": {
                    "image": "data:image/jpeg;base64,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"
                }
            }, {
                "attributes": {
                    "align": "center"
                },
                "insert": "\n"
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": "Lorem ipsum dolor sit amet"
            }, {
                "attributes": {
                    "header": 2
                },
                "insert": "\n"
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": "by "
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": "Your Name"
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": " on September 04"
            }, {
                "insert": "\n"
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum."
            }, {
                "insert": "\n\n"
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": "Duis autem vel eum iriure dolor"
            }, {
                "attributes": {
                    "header": 2
                },
                "insert": "\n"
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": "by "
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": "Your Name"
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": " on September 04"
            }, {
                "insert": "\n"
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan."
            }, {
                "insert": "\n"
            }, {
                "attributes": {
                    "bold": true,
                    "background": "transparent",
                    "link": "http://www.google.com/"
                },
                "insert": "READ MORE ON OUR WEBSITE "
            }, {
                "attributes": {
                    "align": "center"
                },
                "insert": "\n"
            }, {
                "attributes": {
                    "height": "58",
                    "width": "58",
                    "background": "transparent"
                },
                "insert": {
                    "image": "data:image/png;base64,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"
                }
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": " "
            }, {
                "attributes": {
                    "align": "center"
                },
                "insert": "\n"
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": "HeartWorks Inc."
            }, {
                "attributes": {
                    "align": "center"
                },
                "insert": "\n"
            }, {
                "attributes": {
                    "background": "transparent"
                },
                "insert": "115, SomeCity, PA, 55344"
            }, {
                "attributes": {
                    "align": "center"
                },
                "insert": "\n"
            }, {
                "insert": "\n\n"
            }]
        };

        newDoc(false, 'Newsletter', newsLetterContents, '0 KB', false, true, false);
    });

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
    audio.volume = 0.4;
    audio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
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

    var themes = ['dark.css', 'turquoise.css', 'midnight.css'];

    function loadStyles(name) {
        var themeArray = themes.slice();
        themeArray.splice(themeArray.indexOf(name));

        removeStyles(themeArray);

        var string = '<link type="text/css" rel="stylesheet" href="assets/settings/themes/' + name + '"/>';
        if ($('link[href="' + name + '"]').length < 1) {
            $('head').append(string);
        }
    }

    function removeStyles(arrayOfNames) {
        if (typeof arrayOfNames === 'string') {
            $('link[href="assets/settings/themes/' + arrayOfNames + '"]').remove();
        } else {
            arrayOfNames.forEach(function (item) {
                $('link[href="assets/settings/themes/' + item + '"]').remove();
            });
        }
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
                removeStyles(['midnight.css', 'dark.css', 'turquoise.css']);
                break;
            case 'Dark':
                loadStyles('dark.css');
                break;
            case 'Turquoise':
                loadStyles('turquoise.css');
                break;
            case 'Midnight':
                loadStyles('midnight.css');
                break;
        }
        changeSettings('theme', theme);
    });

    $workBgChildren.click(function () {
        var workbg = $(this).text();
        var color = $(this).attr('hex');
        $('html').css('background-color', color);
        changeSettings('workbg', workbg);
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
                $(this).click();
            }
        });

        $editorScrollToggle.click();
        $focus.click();

        var settingDefaults = '.default-theme, .default-workbg, .droid, .14px, .double-line, .medium-margin';
        $(settingDefaults).click();

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
            doc.setContents('');
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
        }, 200);
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

    function hostReachable() {
        return window.navigator.onLine;
    }

    function initiateSignIn(token, callback) {
        $.get('https://www.googleapis.com/plus/v1/people/me?access_token=' + token, function (profile) {
            var coverURL = profile.cover;
            var imageURL = profile.image.url;
            var name = profile.displayName;

            getImage(imageURL, function (data) {
                $('.user-image').css('background-image', 'url(' + data + ')');
            });

            if (!coverURL) {
                $('.user-profile').css('background-color', '#4885ed');
                $('.user-info').css('color', '#FFF');
                $('.fallback-signin').hide();
                $('.sign-out').css({
                    backgroundColor: 'rgb(33, 52, 92)',
                    color: '#FFF'
                });
                $('.sign-out .material-icons').css('color', '#FFF');
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
            } else {
                coverURL = coverURL.coverPhoto.url;
                getImage(coverURL, function (data) {
                    $('.user-profile').css('background-image', 'url(' + data + ')');
                    var img = document.createElement('img');
                    img.addEventListener('load', function () {
                        var vibrant = new Vibrant(img);
                        var color = vibrant.DarkMutedSwatch;
                        if (color) {
                            color = color.rgb;
                        } else {
                            color = vibrant.DarkVibrantSwatch.rgb;
                        }
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
                    img.setAttribute('src', data);
                });
            }

            $('.user-name').text(name);
            chrome.identity.getProfileUserInfo(function (info) {
                $('.user-email').text(info.email);
            })
        }).fail(function () {
            revokeToken();
        });
    }

    function getToken(install, load, callback) {
        if (hostReachable()) {
            $('.loading-online').text(' - Online');

            var gService = analytics.getService('Writer');
            gService.getConfig().addCallback(function (config) {
                config.setTrackingPermitted(true);
            });
            var gTracker = gService.getTracker('UA-96857701-1');
            gTracker.sendAppView('MainView');

            requestAccess(true, function (token) {
                current_token = token;
                if (chrome.runtime.lastError) {
                    if (token) {
                        if (install === false) {
                            revokeToken();
                        }
                    } else {
                        if (install === false) {
                            console.log('User declined.');
                        } else {
                            loadScreen();
                            $installScreen.show();
                            setStorage({
                                installed: false
                            });
                        }
                    }
                } else {
                    initiateSignIn(token, callback);
                }
            });
        } else {
            console.log('No Internet Connection.');
            $('.loading-online').text(' - Offline');
            if (load) {
                $installScreen.hide();
                realLoad();
            }

            applySignOut();
        }

    }

    window.addEventListener('online', function () {
        getToken(false, false);
    });

    window.addEventListener('offline', function () {
        getToken(false, false);
    });

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
                    getToken(false, true, realLoad);
                }
            }
        });
    }

    $('.signin-button').click(function () {
        getToken(true, false, realLoad);
    });

    $('.fallback-signin').click(function () {
        getToken(false, false);
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
                        var hasGoal = thisData.hasGoal;
                        var simpleID = thisData.simpleID;
                        var changed = thisData.changed;
                        var id = thisData.fileID;
                        newDoc(false, name, content, size, savedFileEntry, active, changed, id, hasGoal, simpleID);

                        documentAct().children().first().children().css('opacity', '0.6');
                        documentAct().children().first().children().first().css('opacity', '1');

                        counter++;
                        if (counter === array.length) {
                            openLaunchData();
                            loadSettings(settings);
                            loadScreen();

                            loadGoals();

                            getStorage({
                                credentials: 'credentials'
                            }, function (simpleNote) {
                                if (simpleNote.credentials != 'credentials') {
                                    credentials = simpleNote.credentials;
                                }
                            });
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

    $(window).on('mouseenter', function (e) {
        clearTimeout(screenTimeout);
    });

    function resetDocContent() {
        documents.forEach(function (doc) {
            doc.setContents('');
        });
    }

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
                }, resetDocContent);
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