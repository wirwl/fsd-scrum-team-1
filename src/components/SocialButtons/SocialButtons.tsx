import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import twitterSvg from 'src/components/SocialButtons/img/twitter-icon.svg';
import facebookSvg from 'src/components/SocialButtons/img/facebook-icon.svg';
import instagramSvg from 'src/components/SocialButtons/img/instagram-icon.svg';

import './SocialButtons.scss';

const b = block('social-buttons');

const TWITTER_LINK = 'http://www.twitter.com';
const FACEBOOK_LINK = 'http://www.facebook.com';
const INSTAGRAM_LINK = 'http://www.instagram.com';

const items = [
  { svg: twitterSvg, href: TWITTER_LINK },
  { svg: facebookSvg, href: FACEBOOK_LINK },
  { svg: instagramSvg, href: INSTAGRAM_LINK },
];

const SocialButtons: React.FC = () => {
  const list = items.map(({ svg, href }) => (
    <li className={b('item')} key={href}>
      <a
        className={b('button')}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SVGInline
          className={b('toggle-btn-icon').toString()}
          svg={svg}
        />
      </a>
    </li>
  ));

  return (
    <ul className={b()}>{list}</ul>
  );
};

export default SocialButtons;
