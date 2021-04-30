import Link from 'next/link';
const Navbar = () => {
  return (
    <nav>
      <div>
        <h1>Let's Get IT</h1>
      </div>
      <Link href='/dashboard'>Dasnboard</Link>
      <Link href='/profile'>Profile</Link>
      <Link href='/'>Create Resume</Link>
      <Link href='/'>Log Out</Link>
    </nav>
  );
};

export default Navbar;
