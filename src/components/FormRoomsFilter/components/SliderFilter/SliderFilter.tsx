import { FC, useState, useEffect, useCallback } from 'react';
import Slider, { ISliderValues } from 'src/components/Slider/Slider';

const MIN_PRICE = 10000;
const MAX_PRICE = 40000;
const SLIDER_STEP = 100;

const useDebouncedEffect = (
  effect: () => void,
  delay: number,
  deps: ISliderValues[],
): void => {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};

type ISliderFilterProps = {
  price: ISliderValues;
  onChange: (price: ISliderValues) => void;
};

const SliderFilter: FC<ISliderFilterProps> = ({ price, onChange }) => {
  const [state, setState] = useState<ISliderValues>(price);

  const handleSliderSlide = (values: ISliderValues): void => setState(values);

  useDebouncedEffect(() => {
    if (state !== undefined) onChange(state);
  }, 200, [state]);

  // useEffect(() => {
  //   if (state !== undefined) onChange(state);
  // }, [state]);

  return (
    <Slider
      title="диапазон цены"
      currentValues={state}
      min={MIN_PRICE}
      max={MAX_PRICE}
      step={SLIDER_STEP}
      onChange={handleSliderSlide}
      description="Стоимость за сутки пребывания в номере"
    />
  );
};

export default SliderFilter;

export {
  MAX_PRICE,
  MIN_PRICE,
};
