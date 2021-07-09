const defaultConfig = {
  type: 'sqlite',
  entities: ['src/entity/*.{js,ts}'],
  migrations: ['src/migration/*.{js,ts}'],
  subscribers: ['src/subscriber/*.{js,ts}'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
}

console.log(process.cwd())

module.exports = [
  {
    ...defaultConfig,
    name: 'default',
    database: 'dev.db',
    synchronize: false,
    logging: false,
  },
  {
    ...defaultConfig,
    name: 'integration',
    dropSchema: true,
    synchronize: true,
    database: 'integration.db',
    loggerLevel: 'debug',
  },
]
