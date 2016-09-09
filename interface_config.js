var interfaceConfig = {
    CANVAS_EXTRA: 104,
    CANVAS_RADIUS: 0,
    SHADOW_COLOR: '#ffffff',
    INITIAL_TOOLBAR_TIMEOUT: 20000,
    TOOLBAR_TIMEOUT: 4000,
    DEFAULT_REMOTE_DISPLAY_NAME: "Fellow VCuber",
    DEFAULT_LOCAL_DISPLAY_NAME: "me",
    SHOW_JITSI_WATERMARK: false,
    JITSI_WATERMARK_LINK: "http://sg.vcube.com/",
    SHOW_BRAND_WATERMARK: false,
    BRAND_WATERMARK_LINK: "",
    SHOW_POWERED_BY: false,
    GENERATE_ROOMNAMES_ON_WELCOME_PAGE: true,
    APP_NAME: "VCube Meet",
    INVITATION_POWERED_BY: true,
    // the toolbar buttons line is intentionally left in one line, to be able
    // to easily override values or remove them using regex
    TOOLBAR_BUTTONS: ['authentication', 'microphone', 'camera', 'desktop', 'recording', 'security', 'invite', 'chat', 'etherpad', 'sharedvideo', 'fullscreen', 'sip', 'dialpad', 'settings', 'hangup', 'filmstrip', 'contacts'], // jshint ignore:line
    // Determines how the video would fit the screen. 'both' would fit the whole
    // screen, 'height' would fit the original video height to the height of the
    // screen, 'width' would fit the original video width to the width of the
    // screen respecting ratio.
    VIDEO_LAYOUT_FIT: 'both',
    /**
     * Whether to only show the filmstrip (and hide the toolbar).
     */
    filmStripOnly: false,
    RANDOM_AVATAR_URL_PREFIX: false,
    RANDOM_AVATAR_URL_SUFFIX: false,
    FILM_STRIP_MAX_HEIGHT: 120
};
