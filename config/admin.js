module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '441cbb1421c92db2e070ffd0f3c85880'),
  },
});
