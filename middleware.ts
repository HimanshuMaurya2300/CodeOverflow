import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        "/",
        '/api/webhook',
        '/question/:id',
        '/tags',
        '/tags/:id',
        '/profile/:id',
        '/community',
        '/jobs',
        '/rooms'
    ],
    ignoredRoutes: [
        "/api/webhook",
        "/api/chatgpt"
    ]
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};