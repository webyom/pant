import * as preact from 'preact';
import { RootComponent } from './root-component';
import '../../styles/base.scss';
import '../styles/base.scss';

const container = document.getElementById('app');
container.innerHTML = '';
preact.render(preact.createElement(RootComponent, {}), container);
