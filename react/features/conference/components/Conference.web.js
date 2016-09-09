/* @flow */

import React, { Component } from 'react';
import JitsiMeetJS from '../../base/lib-jitsi-meet';
import { connect as reactReduxConnect } from 'react-redux';

import { connect, disconnect } from '../../base/connection';
import { Watermarks } from '../../base/react';
import { FeedbackButton } from '../../feedback';
import { OverlayContainer } from '../../overlay';
import { HideNotificationBarStyle } from '../../unsupported-browser';

declare var $: Function;
declare var APP: Object;

/**
 * For legacy reasons, inline style for display none.
 *
 * @private
 * @type {{
 *     display: string
 * }}
 */
const _DISPLAY_NONE_STYLE = {
    display: 'none'
};

/**
 * The conference page of the Web application.
 */
class Conference extends Component {

    /**
     * Conference component's property types.
     *
     * @static
     */
    static propTypes = {
        dispatch: React.PropTypes.func
    }

    /**
     * Until we don't rewrite UI using react components
     * we use UI.start from old app. Also method translates
     * component right after it has been mounted.
     *
     * @inheritdoc
     */
    componentDidMount() {
        APP.UI.start();

        APP.UI.registerListeners();
        APP.UI.bindEvents();

        this.props.dispatch(connect());

        let init = true;

        $('.valiantContainer').Valiant360({
            crossOrigin: 'anonymous', // 'anonymous' or 'use-credentials'
            clickAndDrag: true,       // use click-and-drag camera controls
            flatProjection: false,    // map image to appear flat
            fov: 35,                  // initial field of view
            fovMin: 3,                // min field of view allowed
            fovMax: 100,              // max field of view allowed
            hideControls: true,       // hide player controls
            lon: 0,                   // initial lon for camera angle
            lat: 0,                   // initial lat for camera angle
            loop: 'loop',             // video loops by default
            muted: true,              // video muted by default
            autoplay: true,           // video autoplays by default
            videoid: 'largeVideo'
        });

        /**
         * Show 360 video if nickName ends with 360.
         *
         * @param {string} nickName - Check if it ends with 360.
         * @returns {void}
         */
        function checkLargeVideo360(nickName) {
            const largeVideoID = APP.UI.getLargeVideoID();
            const members = APP.conference.listMembers();
            let largeVideoName = nickName === undefined
                ? APP.settings.getDisplayName() : nickName;

            for (let i = 0; i < members.length; i++) {
                if (largeVideoID === members[i]._id) {
                    largeVideoName = members[i]._displayName;
                }
            }

            if (largeVideoName !== undefined
                && largeVideoName.endsWith('360')) {
                $('#largeVideo').hide();
            } else {
                $('#largeVideo').show();
            }
        }

        APP.UI.addListener('UI.nickname_changed', checkLargeVideo360);
        $('#largeVideo')[0].addEventListener('loadedmetadata', () => {
            if (init) {
                init = false;
                APP.conference.addConferenceListener(
                    JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,
                    checkLargeVideo360);
            }
            checkLargeVideo360();
        });
    }

    /**
     * Disconnect from the conference when component will be
     * unmounted.
     *
     * @inheritdoc
     */
    componentWillUnmount() {
        APP.UI.unregisterListeners();
        APP.UI.unbindEvents();

        APP.conference.isJoined() && this.props.dispatch(disconnect());
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <div id = 'videoconference_page'>
                <div id = 'mainToolbarContainer'>
                    <div
                        className = 'notice'
                        id = 'notice'
                        style = { _DISPLAY_NONE_STYLE }>
                        <span
                            className = 'noticeText'
                            id = 'noticeText' />
                    </div>
                    <div
                        className = 'toolbar'
                        id = 'mainToolbar' />
                </div>
                <div
                    className = 'hide'
                    id = 'subject' />
                <div
                    className = 'toolbar'
                    id = 'extendedToolbar'>
                    <div id = 'extendedToolbarButtons' />

                    <FeedbackButton />

                    <div id = 'sideToolbarContainer' />
                </div>
                <div id = 'videospace'>
                    <div
                        className = 'videocontainer'
                        id = 'largeVideoContainer'>
                        <div id = 'sharedVideo'>
                            <div id = 'sharedVideoIFrame' />
                        </div>
                        <div id = 'etherpad' />

                        <Watermarks />

                        <div id = 'dominantSpeaker'>
                            <div className = 'dynamic-shadow' />
                            <img
                                id = 'dominantSpeakerAvatar'
                                src = '' />
                        </div>
                        <span id = 'remoteConnectionMessage' />
                        <div
                            className = 'valiantContainer'
                            id = 'largeVideoWrapper'>
                            <video
                                autoPlay = { true }
                                id = 'largeVideo'
                                muted = 'true' />
                        </div>
                        <span id = 'localConnectionMessage' />
                        <span
                            className = 'video-state-indicator moveToCorner'
                            id = 'videoResolutionLabel'>HD</span>
                        <span
                            className
                                = 'video-state-indicator centeredVideoLabel'
                            id = 'recordingLabel'>
                            <span id = 'recordingLabelText' />
                            <img
                                className = 'recordingSpinner'
                                id = 'recordingSpinner'
                                src = 'images/spin.svg' />
                        </span>
                    </div>
                    <div className = 'filmstrip'>
                        <div
                            className = 'filmstrip__videos'
                            id = 'remoteVideos'>
                            <span
                                className = 'videocontainer'
                                id = 'localVideoContainer'>
                                <div className = 'videocontainer__background' />
                                <span id = 'localVideoWrapper' />
                                <audio
                                    autoPlay = { true }
                                    id = 'localAudio'
                                    muted = { true } />
                                <div className = 'videocontainer__toolbar' />
                                <div className = 'videocontainer__toptoolbar' />
                                <div
                                    className
                                        = 'videocontainer__hoverOverlay' />
                            </span>
                            <audio
                                id = 'userJoined'
                                preload = 'auto'
                                src = 'sounds/joined.wav' />
                            <audio
                                id = 'userLeft'
                                preload = 'auto'
                                src = 'sounds/left.wav' />
                        </div>
                    </div>
                </div>

                <OverlayContainer />
                <HideNotificationBarStyle />
            </div>
        );
    }
}

export default reactReduxConnect()(Conference);
