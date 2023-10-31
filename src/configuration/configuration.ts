export default () => ({
  env: process.env.NODE_ENV || 'development',
  RESEND_KEY: process.env.RESEND,
  FROM_EMAIL:
    process.env.NODE_ENV === 'production'
      ? 'contat@your-domain.com'
      : 'contat-dev@your-domain.com',
  DEFAULT_TEST_EMAILS: ['your@email.com'],
});
