declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    INTEGRATIONS_MASTER_KEY?: string;
    INTEGRATIONS_CHECK_TOKEN?: string;
    AI_DEMO_IMPORT_TOKEN?: string;
  }
}
