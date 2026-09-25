import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
import { projectId, dataset } from './project';

// Studio for Sam, served at /admin on the site itself (built into public/admin).
// Products and the homepage "New In" list: nothing else on the site is editable from here.
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
          .items([
            // Singleton: always the one document with id "newIn".
            S.listItem()
              .title('New In (homepage)')
              .id('newIn')
              .child(S.document().schemaType('newIn').documentId('newIn').title('New In')),
            S.divider(),
            S.documentTypeListItem('product').title('Products'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    // No "create another New In" button: there is only ever one.
    templates: (prev) => prev.filter((t) => t.schemaType !== 'newIn'),
  },
  document: {
    actions: (prev, ctx) =>
      ctx.schemaType === 'newIn' ? prev.filter((a) => !['delete', 'duplicate'].includes(a.action)) : prev,
  },
});
