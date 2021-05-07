// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from 'next-iron-session'

export default function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'letsGetIT_auth',
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  })
}

export function useUserServerSide(req) {
  const user = req?.session?.get('user');

  if (!user) {
    return {
      isLoggedIn: false,
      httpResponse: {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      },
      user: null,
    };
  }

  return {
    isLoggedIn: true,
    httpResponse: null,
    user,
  };
}