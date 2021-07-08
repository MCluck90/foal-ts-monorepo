const path = require('path')

// const toPath = (str) => path.join(__dirname, str)
const toPath = (str) => str

module.exports = {
  type: 'sqlite',
  database: 'dev.db',
  synchronize: false,
  logging: false,
  entities: [toPath('src/entity/*.{js,ts}')],
  migrations: [toPath('src/migration/*.{js,ts}')],
  subscribers: [toPath('src/subscriber/*.{js,ts}')],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
}
