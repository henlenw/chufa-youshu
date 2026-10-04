declare namespace Cloudflare {
  interface Env {
    ADMIN_PASSWORD?: string;
    DB?: D1Database;
    BUCKET?: R2Bucket;
  }
}
