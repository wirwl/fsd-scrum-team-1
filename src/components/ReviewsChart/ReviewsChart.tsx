import React from 'react';
import { block } from 'bem-cn';
import type { WithTranslation } from 'next-i18next';

import i18n from 'src/services/i18n';
import './ReviewsChart.scss';

type ReviewsKeys = 'veryGood' | 'good' | 'fine' | 'bad';
type Reviews = { [key in ReviewsKeys]: number; };
type SvgPaths = { [key in ReviewsKeys]?: string; };

interface IReviewsChartProps extends WithTranslation {
  title: string;
  reviews: Reviews;
}

const b = block('reviews-chart');

const linearGradients = [
  { name: 'veryGood', startColor: '#FFBA9C', stopColor: '#FFE39C' },
  { name: 'good', startColor: '#6FCF97', stopColor: '#66D2EA' },
  { name: 'fine', startColor: '#BC9CFF', stopColor: '#8BA4F9' },
  { name: 'bad', startColor: '#919191', stopColor: '#3D4975' },
];

const degreesToRadians = (degrees: number): number => (degrees * Math.PI) / 180;
const cos = (degrees: number): number => Math.cos(degreesToRadians(degrees));
const sin = (degrees: number): number => Math.sin(degreesToRadians(degrees));

const FULL_RADIUS = 60;
const LINE_WIDTH = 4;
const RADIUS = FULL_RADIUS - (LINE_WIDTH / 2);
const LINE_INDENT = 1; // отступ между линиями в градусах

const getX = (degrees: number): number => FULL_RADIUS + (RADIUS * cos(degrees));
const getY = (degrees: number): number => FULL_RADIUS + (RADIUS * sin(degrees));

const getPaths = (reviews: Reviews): JSX.Element[] => {
  const reviewsObjKeys = (Object.keys(reviews) as (ReviewsKeys)[]).reverse()
    .filter((key) => reviews[key] > 0);
  const sumReviews = reviewsObjKeys.reduce<number>((acc, key) => (acc + reviews[key]), 0);
  const paths: SvgPaths = {};

  if (reviewsObjKeys.length > 1) {
    const lastPos = {
      x: getX(LINE_INDENT),
      y: getY(LINE_INDENT),
    };

    let sumDegrees = LINE_INDENT;

    reviewsObjKeys.forEach((key) => {
      const degrees = ((reviews[key] / sumReviews) * 360) - (LINE_INDENT * 2);
      sumDegrees += degrees;

      const x = getX(sumDegrees);
      const y = getY(sumDegrees);

      paths[key] = `M${lastPos.x} ${lastPos.y} A ${RADIUS} ${RADIUS} 0 ${degrees > 180 ? 1 : 0} 1 ${x} ${y}`;

      sumDegrees += LINE_INDENT * 2;
      lastPos.x = getX(sumDegrees);
      lastPos.y = getY(sumDegrees);
    });
  } else {
    if (reviewsObjKeys.length === 0) reviewsObjKeys.push('fine');
    paths[reviewsObjKeys[0]] = `M${getX(0)} ${getY(0)} A ${RADIUS} ${RADIUS} 0 0 1 ${getX(180)} ${getY(180)} M${getX(180)} ${getY(180)} A ${RADIUS} ${RADIUS} 0 1 1 ${getX(360)} ${getY(360)}`;
  }

  return reviewsObjKeys.map((key) => (
    <path
      key={key}
      d={paths[key]}
      strokeWidth={LINE_WIDTH}
      stroke={`url(#linear-gradient-${key})`}
    />
  ));
};

const ReviewsChart: React.FC<IReviewsChartProps> = ({
  reviews,
  title,
  t,
}) => {
  const reviewsObjKeys = (Object.keys(reviews) as (ReviewsKeys)[])
    .filter((key) => reviews[key] > 0);
  const sumReviews = reviewsObjKeys.reduce<number>((acc, key) => (acc + reviews[key]), 0);

  const linearGradientElements = linearGradients.map(({ name, startColor, stopColor }) => (
    <linearGradient id={`linear-gradient-${name}`} key={name}>
      <stop stopColor={startColor} />
      <stop offset="1" stopColor={stopColor} />
    </linearGradient>
  ));

  const chart = (
    <svg
      className={b('chart')}
      width={120}
      height={120}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {getPaths(reviews)}
      {linearGradientElements}
    </svg>
  );

  return (
    <div className={b()}>
      <h2 className={b('title')}>{title}</h2>
      <div className={b('container')}>
        <div className={b('chart-wrapper')}>
          {chart}
          <p className={b('all-reviews')}>
            <span className={b('reviews-number')}>{sumReviews}</span>
            {t('room:roomImpressions.votes')}
          </p>
        </div>
        <ul className={b('legend')}>
          <li className={b('legend-item', { type: 'very-good' })}>
            {t('room:roomImpressions.wonderful')}
          </li>
          <li className={b('legend-item', { type: 'good' })}>
            {t('room:roomImpressions.good')}
          </li>
          <li className={b('legend-item', { type: 'fine' })}>
            {t('room:roomImpressions.satisfactorily')}
          </li>
          <li className={b('legend-item', { type: 'bad' })}>
            {t('room:roomImpressions.bad')}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default i18n.withTranslation(['common', 'footer'])(
  ReviewsChart,
);
