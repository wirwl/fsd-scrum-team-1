import {
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react';
import Slider, { ISliderValues } from 'src/components/Slider/Slider';
import { initPriceState } from 'src/components/FormRoomsFilter/helpers';

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
  query: Record<string, string>;
  onChange: (price: ISliderValues, priceString: string) => void;
};

const SliderFilter: FC<ISliderFilterProps> = ({ query, onChange }) => {
  const [state, setState] = useState<ISliderValues>(
    () => initPriceState(query, MIN_PRICE, MAX_PRICE),
  );

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
