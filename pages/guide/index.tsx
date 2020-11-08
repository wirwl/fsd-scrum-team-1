import { FC, createElement } from 'react';
import { block } from 'bem-cn';

import GuideLayout from 'src/layouts/GuideLayout/GuideLayout';

import './GuideIndex.scss';

const b = block('guide-index');

const colors = [
  { label: 'Dark Shade 100%', colorDesc: '#1f2041', classMod: 'with-100-shade' },
  { label: 'Dark Shade 75%', colorDesc: '#1f2041', classMod: 'with-75-shade' },
  { label: 'Dark Shade 50%', colorDesc: '#1f2041', classMod: 'with-50-shade' },
  { label: 'Dark Shade 25%', colorDesc: '#1f2041', classMod: 'with-25-shade' },
  { label: 'Dark Shade 5%', colorDesc: '#1f2041', classMod: 'with-5-shade' },
  { label: 'Purple', colorDesc: '#BC9CFF', classMod: 'with-purple' },
  { label: 'Green', colorDesc: '#6FCF97', classMod: 'with-green' },
];

const types = [
  {
    title: 'H1',
    tag: 'h1',
    example: 'This one is the sub-section or widget title',
    classMod: 'with-h1',
  },
  {
    title: 'H2',
    tag: 'h2',
    example: 'Next one is the item title inside widgets',
    classMod: 'with-h2',
  },
  {
    title: 'H3',
    tag: 'h3',
    example: 'This is a label or CTA text',
    classMod: 'with-h3',
  },
  {
    title: 'Body',
    tag: 'p',
    example: 'This is the body text which is used for most of the design, like paragraphs, lists, etc.',
    classMod: 'with-body',
  },
];

const Guide: FC = () => {
  const colorItems = colors.map((item) => (
    <li
      key={item.classMod}
      className={b('color-item')}
    >
      <div className={b('color-block', { [item.classMod]: true })} />

      <div className={b('color-info')}>
        <h3 className={b('color-title')}>{item.label}</h3>
        <span className={b('color-description')}>
          {item.colorDesc}
        </span>
      </div>
    </li>
  ));

  const typeItems = types.map((item) => (
    <li
      key={item.classMod}
      className={b('types-item')}
    >
      {
        createElement(
          item.tag,
          { className: b('types-title') },
          [item.title],
        )
      }

      {
        createElement(
          item.tag,
          { className: b('types-example', { [item.classMod]: true }) },
          [item.example],
        )
      }
    </li>
  ));

  return (
    <GuideLayout title="Guide">

      <div className={b()}>
        <ul className={b('colors')}>{colorItems}</ul>

        <ul className={b('types')}>{typeItems}</ul>
      </div>

    </GuideLayout>
  );
};

export default Guide;
