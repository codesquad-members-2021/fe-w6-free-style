//------------------------✻✻✻ 사이드바 페이지 ✻✻✻--------------------------
import { _ } from '../util.js';

const toggleNav = _.$('.toggle-nav');
const sidebarOverlay = _.$('.sidebar-overlay');
const closeBtn = _.$('.sidebar-close');

_.addEvent(toggleNav, 'click', () => {_.addClass(sidebarOverlay, 'show')});
_.addEvent(closeBtn, 'click', () => {_.removeClass(sidebarOverlay, 'show')});