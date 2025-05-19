import { Link } from 'react-router-dom';
import SearchOrder from '../pages/order/SearchOrder';
import Username from '../pages/user/Username';

function Header() {
  return (
    <header className="flex items-center justify-between border border-stone-200 bg-yellow-500 p-4 uppercase">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>

      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
