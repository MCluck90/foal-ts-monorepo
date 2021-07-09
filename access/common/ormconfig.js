const defaultConfig = {
  type: 'sqlite',
  synchronize: false,
  entities: ['src/entity/*.{js,ts}'],
  migrations: ['src/migration/*.{js,ts}'],
  subscribers: ['src/subscriber/*.{js,ts}'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
}

module.exports = [
  {
    ...defaultConfig,
    name: 'default',
    database: 'dev.db',
    logging: false,
  },
  {
    ...defaultConfig,
    name: 'integration',
    dropSchema: true,
    database: 'integration.db',
    loggerLevel: 'debug',
  },
]
