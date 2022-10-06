// Dependencies
import * as mustache from 'mustache';
import * as fse from 'fs-extra';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as yargs from 'yargs';
const argv = yargs.argv;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const migrationName: any = argv.name;

const rootPath = './migrations/steps/';
const pageSequence = ['Migration'];

// Error strings
const errorUnableToOpenTemplate = (templateFile) =>
  `Unable to open mustache template ${templateFile} for page`;
const errorUnableToWriteFile = (step) => `Unable to write ${step} file`;

function handleError(error, errorPrependMessage) {
  if (error) {
    console.error(errorPrependMessage, error);
    return false;
  } else {
    return true;
  }
}

function handleWriteFile(buffer, filePath, step, fileName) {
  const fileData = mustache.render(buffer, {
    migrationName: migrationName,
    fileName: fileName,
    pagePath: rootPath,
  });
  return fse
    .writeFile(filePath, fileData)
    .catch((error) => handleError(error, errorUnableToWriteFile(step)));
}

async function createFiles() {
  // Ensure rootPath
  await fse.ensureDir(rootPath);
  // Paths/File Names
  const now = new Date().getTime().toString();
  const fileName =
    now +
    '-' +
    migrationName
      .split(' ')
      .map((s) => s.toLowerCase())
      .join('-');
  const templateFolderPath =
    './src/commands/migrations/templates/create-migration';

  // Page file paths
  const outputFiles = {
    Migration: rootPath + fileName + '.ts',
  };
  // Create page files
  pageSequence.forEach((step) => {
    const mustacheTemplateName = `Empty${step}.mustache`;

    console.log('Creating ' + outputFiles[step] + '...');

    fse
      .readFile(templateFolderPath + '/' + mustacheTemplateName, 'utf8')
      .then((results) =>
        handleWriteFile(results, outputFiles[step], step, fileName),
      )
      .catch((error) =>
        handleError(error, errorUnableToOpenTemplate(mustacheTemplateName)),
      );
  });

  console.log(`'New page '${migrationName}' successfully created.`);
}

if (!migrationName) {
  console.error('Please pass in the page name using --name');
} else {
  createFiles();
}