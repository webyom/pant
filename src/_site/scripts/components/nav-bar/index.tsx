import * as preact from 'preact';
import { route } from 'preact-router';
import { createBEM } from '../../../../utils/bem';
import githubLogo from '../../../assets/github.svg';
import './index.scss';

const bem = createBEM('nav-bar');

function ArrowBack(): preact.JSX.Element {
  return (
    <svg
      className={bem('back')}
      viewBox="0 0 1000 1000"
      onClick={(): void => {
        route('/');
      }}
    >
      <path
        fill="#969799"
        fill-rule="evenodd"
        d="M296.114 508.035c-3.22-13.597.473-28.499 11.079-39.105l333.912-333.912c16.271-16.272 42.653-16.272 58.925 0s16.272 42.654 0 58.926L395.504 498.47l304.574 304.574c16.272 16.272 16.272 42.654 0 58.926s-42.654 16.272-58.926 0L307.241 528.058a41.472 41.472 0 0 1-11.127-20.023z"
      ></path>
    </svg>
  );
}

function GithubLink({ type }: { type?: string }): preact.JSX.Element {
  const url = type
    ? `https://github.com/webyom/pant/blob/master/src/${type}/demo/index.tsx`
    : 'https://github.com/webyom/pant/blob/master';
  return (
    <a className={bem('github')} href={url} target="_blank">
      <img src={githubLogo} />
    </a>
  );
}

export function NavBar({ title, type }: { title: string; type?: string }): preact.JSX.Element {
  return (
    <div className={bem()}>
      <h1>{title}</h1>
      <ArrowBack />
      <GithubLink type={type} />
    </div>
  );
}
