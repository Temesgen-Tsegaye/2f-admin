import { NextResponse } from "next/server";
import { auth} from "./auth/index"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default auth((req) => {
  const reqUrl = new URL(req.url);

  console.log(process.env.AUTH_URL,'PRO')
  if (!req.auth || req.auth.user?.role=='normal') {
    return NextResponse.redirect(
      new URL(
        `${process.env.AUTH_URL}/signin?callbackUrl=${encodeURIComponent(
          reqUrl?.pathname
        )}`,
        req.url
      )
    );
  }
});