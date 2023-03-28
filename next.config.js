// next.config.js
module.exports = {
    env: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      NEXT_PUBLIC_SUPABASE_URL:process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_SERVICE_KEY:process.env.SUPABASE_SERVICE_KEY,
      NEXT_PUBLIC_BASE_URL:process.env.NEXT_PUBLIC_BASE_URL,
      SUPABASE_STORAGE_BUCKET:process.env.SUPABASE_STORAGE_BUCKET,
    },
  };
  