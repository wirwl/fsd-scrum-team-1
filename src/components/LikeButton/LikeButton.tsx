/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
import './LikeButton.scss';
import block from 'bem-cn';
import { useEffect, useRef, useState } from 'react';

const b = block('like-button');

interface ILikeButton {
  isChecked?: boolean;
  count?: number;
}

const LikeButton: React.FC<ILikeButton> = (props) => {
  const {
    isChecked = false,
    count = 0,
  } = props;

  const [state, setState] = useState({ isChecked: isChecked, count: count } as ILikeButton);

  const onLikeButtonClick = (): void => {
    const prevState = usePrevious(state);
    const newValue = prevState?.isChecked ? prevState.count - 1 : prevState.count + 1;
    setState((state) => { count: newValue, isChecked: !state.isChecked });
  };

  function usePrevious(value): undefined {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  return (
    <label className={b()} onClick={onLikeButtonClick}>
      <input className={b('input')} type="checkbox" defaultChecked={state.isChecked} />
      <div className={b('border')}>
        <div className={b('count')}>{state.count}</div>
      </div>
    </label>
  );
};

export default LikeButton;
