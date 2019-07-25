/*jshint esversion: 6 */

const St = imports.gi.St;
const Main = imports.ui.main;
const GLib = imports.gi.GLib;
const Util = imports.misc.util;

const iconPrev = new St.Icon({
  icon_name: 'media-skip-backward-symbolic',
  style_class: 'system-status-icon'
});

const iconPlay = new St.Icon({
  icon_name: 'media-playback-start-symbolic',
  style_class: 'system-status-icon'
});

const iconPause = new St.Icon({
  icon_name: 'media-playback-pause-symbolic',
  style_class: 'system-status-icon'
});

const PlayPause = [iconPause, iconPlay]

const iconNext = new St.Icon({
  icon_name: 'media-skip-forward-symbolic',
  style_class: 'system-status-icon'
});

let buttonPrev = new St.Button({ style_class: 'panel-button'});
let buttonPlayPause = new St.Button({ style_class: 'panel-button'});
let buttonNext = new St.Button({ style_class: 'panel-button'});

//keep track of the toggle
let isPlaying = 0; // add spawn async

function set_play_icon(button) {
  button.set_child(PlayPause[isPlaying])
  isPlaying ^= 1 // toggle
}

function _play_pause(button) {
  set_play_icon(button)
  Util.spawn(['playerctl' ,'play-pause']);
}

function _prev() {
  Util.spawn(['playerctl' ,'previous']);
}

function _next() {
  Util.spawn(['playerctl','next']);
}

function init() {
  buttonPrev.set_child(iconPrev);
  buttonPrev.connect('button-press-event', _prev);

  set_play_icon(buttonPlayPause)
  buttonPlayPause.connect('button-press-event', _play_pause);

  buttonNext.set_child(iconNext);
  buttonNext.connect('button-press-event', _next);
}

function enable() {
  Main.panel._rightBox.insert_child_at_index(buttonNext, 2);
  Main.panel._rightBox.insert_child_at_index(buttonPlayPause, 2);
  Main.panel._rightBox.insert_child_at_index(buttonPrev, 2);
}

function disable() {
  Main.panel._rightBox.remove_child(buttonPrev);
  Main.panel._rightBox.remove_child(buttonPlayPause);
  Main.panel._rightBox.remove_child(buttonNext);
}
