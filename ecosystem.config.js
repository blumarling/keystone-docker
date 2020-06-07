module.exports = {
  apps : [{
    name: "keystone app",
    script: "yarn dev",
    watch: true,
    ignore_watch: ["node_modules"],
    // instances: 4,
    autorestart: false,
    // exec_mode: "cluster",
    env: {
      NODE_ENV: "development",
      DISABLE_LOGGING: "false",
      SESSION_HOST: "keystone-cache",
      SESSION_PORT: 6379,
      SESSION_DB: 12,
      CREATE_TABLES: true,
    },
  }]
}