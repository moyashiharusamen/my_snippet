var MOYASHI = MOYASHI || {};
MOYASHI.COMMON = {};

MOYASHI.COMMON.Disclosure = function ($wrapper) {
    this.$wrapper = $wrapper;
    this.init();
};

MOYASHI.COMMON.Disclosure.prototype = {
    init: function () {
        this.createBtn();
        this.setConfig();
        this.setParameter();
        this.bindEvent();
        this.setA11y();
    },
    setParameter: function () {
        this.$btn = this.$wrapper.find('.js-disclosure-btn');
        this.$content = this.$wrapper.find('.js-disclosure-content');
    },
    setConfig: function () {
        this.RESIZE_INTERVAL_TIME = 500;
        this.klass = {
            show: 'is-show',
            hide: 'is-hide'
        };
        this.text = {
            open: '\u958b\u304f', // 開く
            close: '\u9589\u3058\u308b' // 閉じる
        };
    },
    createBtn: function () {
        if ($('.js-disclosure-btn').length > 0) {
            return;
        }

        const $btnWrap = $('.js-disclosure-btnWrap');
        const $btnElem = $('<button type="button" class="js-disclosure-btn"></button>');

        $btnWrap.wrapInner($btnElem);

        this.createBtnIcon();
    },
    createBtnIcon: function () {
        const $btnElem = $('.js-disclosure-btn');
        const $btnIcon = '<span class="disclosure-btnIcon"><span class="disclosure-btnTxt js-disclosure-btnTxt">開く</span></span>';

        $btnElem.append($btnIcon);
    },
    setA11y: function () {
        const _this = this;

        this.$btn.each(function () {
            const $this = $(this);
            const $relatedContent = $this.parent(this.$btnWrap).next(_this.$content);
            const relatedContentId = $relatedContent.attr('id');

            $this.attr('aria-controls', relatedContentId);

            if ($relatedContent.css('display') === 'none') {
                _this.$btn.attr('aria-expanded', false);
            } else {
                _this.$btn.attr('aria-expanded', true);
            }
        });
    },
    bindEvent: function () {
        const _this = this;

        if (this.$wrapper.hasClass('js-disclosure-onlySp')) {
            _this.judgeWindowSize();

            windowSize.addListener(function () {
                _this.judgeWindowSize();
            });

            $win.on('resize', function () {
                _this.judgeWindowSize();
            });
        }

        this.$content.each(function () {
            const $this = $(this);

            if ($this.css('display') === 'none') {
                $this.addClass(_this.klass.hide);
            } else {
                $this.addClass(_this.klass.show);
            }
        });

        this.$btn.on('click', function () {
            _this.execute($(this));
        });
    },
    execute: function ($currentBtn) {
        const btnId = $currentBtn.attr('aria-controls');
        const $currentContent = $('.js-disclosure-content[id="' + btnId + '"]');
        const contentId = $currentContent.attr('id');
        const $btnIcon = $currentBtn.find('.js-disclosure-btnTxt');

        if ($currentContent.is(':animated') || btnId !== contentId) {
            return;
        }

        if ($currentContent.hasClass(this.klass.hide)) {
            this.open($currentContent, $currentBtn, $btnIcon);
        } else {
            this.close($currentContent, $currentBtn, $btnIcon);
        }
    },
    open: function ($currentContent, $currentBtn, $btnIcon) {
        $currentBtn.attr('aria-expanded', true);
        $currentContent
            .addClass(this.klass.show)
            .removeClass(this.klass.hide)
            .slideDown(this.SLIDE_INTERVAL_TIME);

        if ($btnIcon.text() === this.text.close) {
            return;
        }

        $btnIcon.text(this.text.close);
    },
    close: function ($currentContent, $currentBtn, $btnIcon) {
        $currentBtn.attr('aria-expanded', false);
        $currentContent
            .addClass(this.klass.hide)
            .removeClass(this.klass.show)
            .slideUp(this.SLIDE_INTERVAL_TIME);

        if ($btnIcon.text() === this.text.open) {
            return;
        }

        $btnIcon.text(this.text.open);
    },
    judgeWindowSize: function () {
        if (windowSize.matches) {
            this.enableClick();
        } else {
            this.disableClick();
        }
    },
    enableClick: function () {
        this.$btn
            .prop('disabled', false)
            .attr('aria-expanded', false);

        if (this.$content.hasClass(this.klass.show)) {
            this.$btn.attr('aria-expanded', false);
            this.$content
                .removeClass(this.klass.show)
                .addClass(this.klass.hide)
                .css('display', 'none');
        }
    },
    disableClick: function () {
        this.$btn
            .prop('disabled', true)
            .removeAttr('aria-expanded');

        if (this.$content.hasClass(this.klass.hide)) {
            this.$content
                .removeClass(this.klass.hide)
                .addClass(this.klass.show)
                .css('display', 'block');
        }
    }
};

$(function(){
    $('.js-disclosure').each(function () {
        new MOYASHI.COMMON.Disclosure($(this));
    });
})
