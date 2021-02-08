const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/atb_development",
      test: "postgres://postgres:postgres@localhost:5432/engage_test",
      e2e: "postgres://postgres:postgres@localhost:5432/engage_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
