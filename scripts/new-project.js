const { execSync } = require('child_process')
const fs = require('fs-extra')
const path = require('path')

const projectTypes = ['access', 'engine', 'manager', 'utility']

const usage = () => console.error(`Usage: yarn new [type] [name]`)

async function main() {
  const [, , projectType, projectName, description] = process.argv
  if (!projectTypes.includes(projectType)) {
    console.error(`Must use one of these types: ${projectTypes.join(' ')}`)
    usage()
    process.exit(1)
  }

  if (!projectName) {
    console.error('Please provide a name')
    usage()
    process.exit(1)
  }

  try {
    const packageName = `@${projectType}/${projectName}`
    const templateRoot = path.join(__dirname, '../.config/project-template')
    const packageRoot = path.join(__dirname, '..', projectType, projectName)
    await fs.copy(templateRoot, packageRoot)

    // Change package name
    const packagePath = path.join(packageRoot, 'package.json')
    const packageContents = fs.readFileSync(packagePath).toString()
    fs.writeFileSync(
      packagePath,
      packageContents.replace('@project/template', packageName),
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
    workspacePackage.workspaces.packages.push(`${projectType}/${projectName}`)

    // Remove any duplicates and sort
    workspacePackage.workspaces.packages = Array.from(
      new Set(workspacePackage.workspaces.packages),
    )
    workspacePackage.workspaces.packages.sort()

    fs.writeFileSync(
      workspacePackagePath,
      JSON.stringify(workspacePackage, null, 2),
    )

    execSync('yarn prettier --write package.json', { cwd: workspaceRoot })
    execSync('yarn install', { cwd: workspaceRoot })

    console.log(`Created ${packageName}`)
  } catch (err) {
    console.log(err)
  }
}

main()
