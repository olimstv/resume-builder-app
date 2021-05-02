import Link from 'next/link';
const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link href='/'>
        <a className='navbar-brand'>Let's Get IT</a>
      </Link>
      <Link href='/dashboard'>
        <a className='nav-link'>Dasnboard</a>
      </Link>
      <Link href='/profile'>
        <a className='nav-link'>Profile</a>
      </Link>
      <Link href='/'>
        <a className='nav-link'>Create Resume</a>
      </Link>
      <Link href='/'>
        <a className='nav-link'>Log Out</a>
      </Link>
    </nav>
  );
};

export default Navbar;
