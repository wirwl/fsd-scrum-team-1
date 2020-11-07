import {
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react';
import Slider, { ISliderValues } from 'src/components/Slider/Slider';

const MIN_PRICE = 10000;
const MAX_PRICE = 40000;
const SLIDER_STEP = 100;
const PRICE_DEFAULT: [number, number] = [MIN_PRICE, MAX_PRICE];

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
  query: Record<string, string>;
  onChange: (price: ISliderValues, priceString: string) => void;
};

const isPriceValid = (price: number[]): boolean => (
  price.length === 2
  && price.filter((p) => Number.isNaN(p)).length === 0
  && price[0] >= MIN_PRICE
  && price[1] <= MAX_PRICE
);

const initState = (query: Record<string, string>): [number, number] => {
  const priceValue = query.price;
  if (priceValue === undefined) return PRICE_DEFAULT;

  const price = priceValue.split('-')
    .map((p) => parseInt(p, 10));

  if (price.length !== 2) return PRICE_DEFAULT;

  if (!isPriceValid(price)) PRICE_DEFAULT;

  return price as [number, number];
};

const SliderFilter: FC<ISliderFilterProps> = ({ query, onChange }) => {
  const [state, setState] = useState<ISliderValues>(initState(query));

  const handleSliderSlide = (values: ISliderValues): void => setState(values);

  useDebouncedEffect(() => {
    if (state !== undefined) {
      onChange(
        state,
        state.map((p) => p.toString()).join('-'),
      );
    }
  }, 200, [state]);

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
