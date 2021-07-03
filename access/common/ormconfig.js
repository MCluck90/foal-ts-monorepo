const path = require('path')

module.exports = {
  type: 'sqlite',
  database: 'dev.db',
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, 'src/entity/**/*.ts')],
  migrations: [path.join(__dirname, 'src/migration/**/*.ts')],
  subscribers: [path.join(__dirname, 'src/subscriber/**/*.ts')],
  cli: {
    entitiesDir: path.join(__dirname, 'src/entity'),
    migrationsDir: path.join(__dirname, 'src/migration'),
    subscribersDir: path.join(__dirname, 'src/subscriber'),
  },
}
