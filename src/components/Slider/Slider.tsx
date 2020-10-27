import React, { useState, FC } from 'react';
import { block } from 'bem-cn';
import ReactSlider from 'react-slider';

import './Slider.scss';

type ISliderValues = [number, number] | [number];
type IReactSliderValues = number[] | number | null | undefined;
type IMinMax = { min: number; max: number };

interface ISliderProps {
  title?: string;
  description?: string;
  currentValues?: ISliderValues;
  min?: number;
  max?: number;
  step?: number;
  onChange: (rangeValues: ISliderValues) => void;
}

const b = block('slider');

const normalizeMinMax = ({ min, max }: IMinMax): IMinMax => {
  const correctMin = Math.min(min, max);
  const correctMax = Math.max(min, max);

  return { min: correctMin, max: correctMax };
};

const normalizeCurrentValues = (
  values: ISliderValues,
  min: number,
  max: number,
): ISliderValues => {
  let [minValue, maxValue] = values;
  const isCorrectMinValue = minValue >= min && minValue <= max;
  const isCorrectMaxValue = maxValue
        && (maxValue >= minValue && maxValue <= max && maxValue >= min);

  if (!isCorrectMinValue || (maxValue && minValue > maxValue)) minValue = min;
  if (!isCorrectMaxValue && maxValue) maxValue = max;

  return maxValue ? [minValue, maxValue] : [minValue];
};

const Slider: FC<ISliderProps> = (props) => {
  const {
    title = 'Range slider',
    description,
    currentValues = [0, 16000],
    min: initialMin = 0,
    max: initialMax = 16000,
    step: initialStep = 1,
    onChange,
  } = props;

  const step = Math.abs(initialStep);
  const { min, max } = normalizeMinMax({ min: initialMin, max: initialMax });

  const [values, setValues] = useState(() => normalizeCurrentValues(currentValues, min, max));
  const [minValue, maxValue] = values;

  const isRange = values.length === 2;

  const handleChange = (data: IReactSliderValues): void => {
    const isCorrectData = data !== null && data !== undefined;

    if (isCorrectData) {
      const result = (Array.isArray(data) ? data : [data]) as ISliderValues;
      setValues(result);
      onChange(result);
    }
  };

  const normalizeLocalString = (num: number): string => (
    process.browser
      ? num.toLocaleString()
      : num.toLocaleString().replace(',', ' ')
  );

  return (
    <div className={b({ range: isRange })}>
      <div className={b('header')}>
        <h3 className={b('label')}>{title}</h3>
        <p className={b('price-range')}>
          <span className={b('min')}>{`${normalizeLocalString(minValue)}₽`}</span>
          {typeof maxValue === 'number' && (
            <span className={b('max')}>
              -&nbsp;
              {`${normalizeLocalString(maxValue)}₽`}
            </span>
          )}
        </p>
      </div>
      <ReactSlider
        className={b('container').toString()}
        thumbClassName={b('button').toString()}
        trackClassName={b('bar').toString()}
        defaultValue={values}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
      />
      {description && <p className={b('sublabel')}>{description}</p>}
    </div>
  );
};

export default Slider;
export type { ISliderValues };
