import mdcAutoInit from '@material/auto-init';
import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple';
import { MDCDrawer } from "@material/drawer";
import { MDCList } from "@material/list";
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCMenuSurface } from '@material/menu-surface';
import { MDCMenu } from '@material/menu';
import { Corner } from '@material/menu-surface/constants';
import { MDCSelect } from '@material/select';
import { EventEmitter } from './EventEmitter';

mdcAutoInit.register('MDCRipple', MDCRipple);
mdcAutoInit.register('MDCTextField', MDCTextField);
mdcAutoInit.register('MDCDrawer', MDCDrawer);
mdcAutoInit.register('MDCList', MDCList);
mdcAutoInit.register('MDCTopAppBar', MDCTopAppBar);
mdcAutoInit.register('MDCMenuSurface', MDCMenuSurface);
mdcAutoInit.register('MDCMenu', MDCMenu);
mdcAutoInit.register('MDCSelect', MDCSelect);

const mdcEventEmitter = new EventEmitter();

const navdrawerMain = MDCDrawer.attachTo(document.querySelector('#navdrawerMain'));
const topAppBar = MDCTopAppBar.attachTo(document.querySelector('.mdc-top-app-bar'));
topAppBar.setScrollTarget(document.querySelector('main'));
topAppBar.listen('MDCTopAppBar:nav', () => {
  navdrawerMain.open = !navdrawerMain.open;
});
const altMenuEl = document.getElementById('navbarContent');
const altMenuSurface = MDCMenuSurface.attachTo(altMenuEl);
altMenuSurface.listen('MDCMenuSurface:opened', () => {
  altMenuEl.style.transformOrigin = 'top right';
  altMenuEl.style.left = '';
  altMenuEl.style.right = '40px';
});

const altMenu = MDCMenu.attachTo(altMenuEl);
altMenu.setAnchorCorner(Corner.TOP_RIGHT);
altMenu.setAnchorMargin({ right: 40, top: 50 });
const altMenuButton = document.getElementById('alt-menu');
altMenuButton.addEventListener('click', () => {
  altMenu.open = !altMenu.open;
});

document.querySelectorAll(".mdc-select").forEach(select => {
  const mdcSelect = MDCSelect.attachTo(select);
  const selectMenuSurface = select.querySelector('.mdc-select__menu.mdc-menu-surface');
  selectMenuSurface.classList.add('mdc-menu-surface--open', 'mdc-menu-surface--is-open-below');
  const maxWidth = selectMenuSurface.getBoundingClientRect().width;
  selectMenuSurface.classList.remove('mdc-menu-surface--open', 'mdc-menu-surface--is-open-below');
  select.style.width = `${maxWidth}px`;
  select.querySelector('.mdc-select__anchor').style.width = `${maxWidth}px`;
  mdcSelect.listen('MDCSelect:change', (event) => {
    mdcEventEmitter.emit('select:change', select, event.detail.value);
  });
});

mdcEventEmitter.on('select:change', (select, value) => {
  const selectedOption = select.querySelector(`[data-value="${value}"]`);
  console.log(selectedOption.dataset);
  select.querySelector('.mdc-select__selected-text').textContent = selectedOption.textContent;
});