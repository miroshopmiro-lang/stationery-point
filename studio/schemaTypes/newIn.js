import { defineArrayMember, defineField, defineType } from 'sanity';
import codeProducts from './codeProducts.json';

/*
 * The homepage "New In" rail, as one editable list (a single document, id "newIn").
 *
 * Sam can add, remove and drag to reorder. Items are either:
 *   - a product he added in /admin (a reference), or
 *   - a product that is already on the site in code (picked from a dropdown).
 * The site shows exactly this list, in this order, once it has been published. Until the
 * first publish the site keeps its built-in New In set, and the editor opens pre-filled
 * with that same set so nothing looks different until he changes it.
 */
const titleFor = (value) => codeProducts.find((p) => p.value === value)?.title;

export default defineType({
  name: 'newIn',
  title: 'New In',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Products in "New In"',
      description:
        'Shown on the homepage in this order. Drag to reorder, use the ⋯ menu to remove, "Add item" to add. Press Publish when done.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'productRef',
          title: 'A product you added in admin',
          type: 'reference',
          to: [{ type: 'product' }],
        }),
        defineArrayMember({
          name: 'shopItem',
          title: 'A product already on the website',
          type: 'object',
          fields: [
            defineField({
              name: 'product',
              title: 'Product',
              type: 'string',
              options: { list: codeProducts.map(({ title, value }) => ({ title, value })) },
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { value: 'product' },
            prepare: ({ value }) => ({ title: titleFor(value) || 'Choose a product', subtitle: 'On the website' }),
          },
        }),
      ],
    }),
  ],
  initialValue: {
    items: codeProducts
      .filter((p) => p.newArrival)
      .map((p) => ({ _type: 'shopItem', _key: p.value, product: p.value })),
  },
  preview: { prepare: () => ({ title: 'New In' }) },
});
