import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const base =
    'rounded-full bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-500 focus:bg-yellow-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 disabled:cursor-not-allowed';

  const style = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    round: base + ' px-3 py-1.5 md:px-3.5 md:py-2 text-sm',
    secondary:
      'inline-block rounded-full border-2 border-stone-300 px-3 py-2.5 md:px-6 md:py-3.5 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-400 focus:outline-none focus:ring focus:ring-stone-400 focus:ring-offset-2 disabled:cursor-not-allowed',
  };

  if (to)
    return (
      <Link to={to} className={style[type]}>
        {children}
      </Link>
    );

  // if (onClick)
  //   return (
  //     <button disabled={disabled} onClick={onClick} className={style[type]}>
  //       {children}
  //     </button>
  //   );

  // return (
  //   <button disabled={disabled} className={style[type]}>
  //     {children}
  //   </button>
  // );

  return (
    <button disabled={disabled} onClick={onClick} className={style[type]}>
      {children}
    </button>
  );
}

export default Button;
