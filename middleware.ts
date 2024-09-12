import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  afterAuth: auth => {
    console.log("afterAuth", auth);
  },
  publicRoutes: ["/api/uploadthing"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
