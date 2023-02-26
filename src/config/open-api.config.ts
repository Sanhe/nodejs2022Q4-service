import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { docsMessages } from '../common/messages/docs.messages';
import * as jsyaml from 'js-yaml';

const getOpenApiConfig = async (): Promise<OpenAPIObject> => {
  let docConfig = null;

  try {
    const apiYamlPath = join(__dirname, '..', '..', 'doc', 'api.yaml');

    const apiYaml = await readFile(apiYamlPath, 'utf8');
    docConfig = jsyaml.load(apiYaml) as OpenAPIObject;
  } catch (error) {
    // TODO: Log error
  }

  if (!docConfig) {
    docConfig = new DocumentBuilder()
      .setTitle(docsMessages.INFO_TITLE)
      .setDescription(docsMessages.INFO_DESCRIPTION)
      .setVersion(docsMessages.OPEN_API_VERSION)
      .addTag(docsMessages.OPEN_API_TAG)
      .build();
  }

  return docConfig;
};

export { getOpenApiConfig };
