import './BulletsList.scss';
import block from 'bem-cn';

const b = block('bullets-list');

interface IBulletsList {
  textList: string[];
}

const BulletsList: React.FC<IBulletsList> = ({ textList }) => (
  <ul className={b()}>
    {textList.map((text) => (
      <li key={text} className={b('item')}>
        <p className={b('bullet')}>{text}</p>
      </li>
    ))}
  </ul>
);

export default BulletsList;
