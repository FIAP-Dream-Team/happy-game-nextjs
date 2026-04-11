import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      /** Provedor OAuth (ex.: google), usado para localizar o perfil no Supabase */
      provider?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    provider?: string;
  }
}
