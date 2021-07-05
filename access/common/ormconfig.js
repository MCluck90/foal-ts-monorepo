const path = require('path')

const toPath = (str) => path.join(__dirname, str)

module.exports = {
  type: 'sqlite',
  database: 'dev.db',
  synchronize: false,
  logging: false,
  entities: [toPath('src/entity/**/*.ts')],
  migrations: [toPath('src/migration/**/*.ts')],
  subscribers: [toPath('src/subscriber/**/*.ts')],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
}
