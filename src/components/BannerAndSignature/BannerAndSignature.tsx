import { FC } from 'react';
import { block } from 'bem-cn';

import './BannerAndSignature.scss';

const b = block('banner-and-signature');

type IBannerAndSignatureProps = {
  signature: string;
};

/**
 * Exapmle
 * <BannerAndSignature signature="Lorem ipsum dolor sit amet consectetur adipisicing elit.">
 *   <form>...</form>
 * </BannerAndSigrature>
 */
const BannerAndSignature: FC<IBannerAndSignatureProps> = (props) => {
  const {
    children,
    signature,
  } = props;

  return (
    <section className={b()}>
      <div className={b('center')}>
        {children}
        <p className={b('signature')}>{ signature }</p>
      </div>
    </section>
  );
};

export default BannerAndSignature;
