import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
import { projectId, dataset } from './project';

// Studio for Sam, served at /admin on the site itself (built into public/admin).
// Products only: nothing else on the site is editable from here.
export default defineConfig({
  name: 'default',
  title: 'Stationery Point',
  basePath: '/admin',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Website')
          .items([S.documentTypeListItem('product').title('Products')]),
    }),
  ],
  schema: { types: schemaTypes },
});
