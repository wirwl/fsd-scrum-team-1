import React, { useState, FC } from 'react';
import { block } from 'bem-cn';
import ReactSlider from 'react-slider';

import './Slider.scss';

type SliderValues = [number, number] | [number];
type ReactSliderValues = number[] | number | null | undefined;

interface ISliderProps {
  title?: string;
  currentValues?: SliderValues;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (rangeValues: SliderValues) => void;
}

const b = block('slider');

const validateCurrentValues = (
  values: SliderValues,
  min: number,
  max: number,
): SliderValues => {
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
    currentValues = [0, 100],
    min = 0,
    max = 100,
    step = 1,
    onChange,
  } = props;

  const [values, setValues] = useState(() => validateCurrentValues(currentValues, min, max));
  const [minValue, maxValue] = values;

  const isRange = values.length === 2;

  const handleChange = (data: ReactSliderValues): void => {
    const isCorrectData = data !== null && data !== undefined;

    if (isCorrectData) {
      const result = (data instanceof Array ? data : [data]) as SliderValues;
      setValues(result);
      onChange && onChange(result);
    }
  };

  return (
    <div className={b({ range: isRange })}>
      <div className={b('header')}>
        <h3 className={b('label')}>{title}</h3>
        <p className={b('price-range')}>
          <span className={b('min')}>{`${minValue.toLocaleString()}₽`}</span>
          {typeof maxValue === 'number' && (
            <span className={b('max')}>
              -&nbsp;
              {`${maxValue.toLocaleString()}₽`}
            </span>
          )}
        </p>
      </div>
      <ReactSlider
        className={b('container')}
        thumbClassName={b('button')}
        trackClassName={b('bar')}
        defaultValue={values}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
      />
    </div>
  );
};

export default Slider;
