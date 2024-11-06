import { Outlet } from 'react-router';
import Header from './Header';

export default function Root() {
  return (
    <div className='container mx-auto px-20'>
      <Header />
      <Outlet />
    </div>
  );
}
