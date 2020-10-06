import Button from '@components/Button/Button';
import '@styles/index.scss';

const Home: React.FC = () => (
  <>
    <h1 className='m'>Hello, World!</h1>
    <Button text='click me' theme='success' />
  </>
);

export default Home;
