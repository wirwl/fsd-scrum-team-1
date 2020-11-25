import {
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { WithTranslation } from 'next-i18next';

import i18n from 'src/services/i18n';
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
} & WithTranslation;

const SliderFilter: FC<ISliderFilterProps> = ({ query, onChange, t }) => {
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
      title={t('components:priceRange.title')}
      currentValues={state}
      min={MIN_PRICE}
      max={MAX_PRICE}
      step={SLIDER_STEP}
      onChange={handleSliderSlide}
      description={t('components:priceRange.description')}
    />
  );
};

export default i18n.withTranslation(['common', 'components'])(SliderFilter);

export {
  MAX_PRICE,
  MIN_PRICE,
};
