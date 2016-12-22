module.exports = {
  db: {
    name: "db",
    connector: "memory"
  },
  delfindb: {
    host: "",
    port: 0,
    url: process.env.DB_URL,
    database: "delfin2",
    password: process.env.DB_PASSWORD,
    name: "delfindb",
    user: process.env.DB_USER,
    connector: "mongodb"
  }
};
