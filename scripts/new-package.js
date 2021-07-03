const { execSync } = require('child_process')
const fs = require('fs-extra')
const path = require('path')

const types = ['access', 'engine', 'manager', 'utility']

const usage = () => console.error(`Usage: yarn new [type] [name]`)

async function main() {
  const [, , type, name, description] = process.argv
  if (!types.includes(type)) {
    console.error(`Must use one of these types: ${types.join(' ')}`)
    usage()
    process.exit(1)
  }

  if (!name) {
    console.error('Please provide a name')
    usage()
    process.exit(1)
  }

  try {
    const packageName = `@${type}/${name}`
    const templateRoot = path.join(__dirname, '../.config/package-template')
    const packageRoot = path.join(__dirname, '..', type, name)
    await fs.copy(templateRoot, packageRoot)

    // Change package name
    const packagePath = path.join(packageRoot, 'package.json')
    const packageContents = fs.readFileSync(packagePath).toString()
    fs.writeFileSync(
      packagePath,
      packageContents.replace('@package/template', packageName),
    )

    // Remove lines in test file to keep VS Code from screaming
    const testFilePath = path.join(packageRoot, 'src/__test__/hello.test.ts')
    const testFileContents = fs.readFileSync(testFilePath).toString()
    fs.writeFileSync(
      testFilePath,
      testFileContents.split('\n').slice(3).join('\n'),
    )

    // Add to workspace
    const workspaceRoot = path.join(__dirname, '..')
    const workspacePackagePath = path.join(workspaceRoot, 'package.json')
    const workspacePackage = require(workspacePackagePath)
    workspacePackage.workspaces.packages.push(`${type}/${name}`)

    // Remove any duplicates and sort
    workspacePackage.workspaces.packages = Array.from(
      new Set(workspacePackage.workspaces.packages),
    )
    workspacePackage.workspaces.packages.sort()

    fs.writeFileSync(
      workspacePackagePath,
      JSON.stringify(workspacePackage, null, 2),
    )

    execSync('yarn install', { cwd: workspaceRoot })

    // Add mapping to jest.config.js
    const jestConfigPath = path.join(workspaceRoot, '.config/jest.config.js')
    const jestConfig = require(jestConfigPath)
    jestConfig.moduleNameMapper[
      `${packageName}(.*)`
    ] = `<rootDir>/../../${type}/${name}/src$1`

    // Sort keys
    const moduleMapping = JSON.parse(
      JSON.stringify(jestConfig.moduleNameMapper),
    )
    jestConfig.moduleNameMapper = {}
    for (const [key, value] of Object.entries(moduleMapping).sort(([a], [b]) =>
      a.localeCompare(b),
    )) {
      jestConfig.moduleNameMapper[key] = value
    }
    fs.writeFileSync(
      jestConfigPath,
      `module.exports = ${JSON.stringify(jestConfig)}`,
    )

    execSync('yarn prettier --write package.json .config/jest.config.js', {
      cwd: workspaceRoot,
    })

    console.log(`Created ${packageName}`)
  } catch (err) {
    console.log(err)
  }
}

main()
