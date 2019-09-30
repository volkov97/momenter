const minimist = require('minimist');
const fse = require('fs-extra');

const { name, basic: isBasic } = minimist(process.argv.slice(2));

const prepareComponentContent = str => `${str.trim()}\n`;

const tsxTemplate = name =>
  prepareComponentContent(`
import React from 'react';

import { Wrap } from './${name}.styled';

interface ${name}Props {
}

export const ${name}: React.FC<${name}Props> = () => (
  <Wrap>${name}</Wrap>
);
`);

const styledTemplate = () =>
  prepareComponentContent(`
import styled from 'styled-components';

export const Wrap = styled.div\`\`;
`);

const indexTemplate = name =>
  prepareComponentContent(`
export * from './${name}';
`);

const componentsFolder = isBasic ? 'components-basic' : 'components';

fse.outputFile(`./src/${componentsFolder}/${name}/${name}.tsx`, tsxTemplate(name));
fse.outputFile(`./src/${componentsFolder}/${name}/${name}.styled.ts`, styledTemplate(name));
fse.outputFile(`./src/${componentsFolder}/${name}/index.ts`, indexTemplate(name));
