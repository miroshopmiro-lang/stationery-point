import { defineField, defineType } from 'sanity';

/*
 * One product added by Sam from /admin.
 *
 * These are EXTRA to the products in src/data/products/*.json, never a replacement: the site
 * shows both lists together (src/data/catalog.js). Augzet's studio replaced its code list the
 * moment one CMS entry existed; that is the behaviour this project deliberately avoids.
 *
 * Category values must match the ids in src/data/categories.json exactly, or the product
 * lands in no filter. If a category is ever added there, add it here too and rebuild.
 */
const CATEGORIES = [
  { title: 'Stationery', value: 'stationery' },
  { title: 'Office Supplies', value: 'office-supplies' },
  { title: 'Art Supplies', value: 'art-supplies' },
  { title: 'Craft Material', value: 'craft-material' },
  { title: 'Party & Gifts', value: 'party-gifts' },
  { title: 'Return Gifts', value: 'return-gifts' },
  { title: 'Special Edition', value: 'special-edition' },
];

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product name',
      type: 'string',
      description: 'As a customer would say it, with brand and size. e.g. "Camlin Oil Pastels 25 Shades"',
      validation: (r) => r.required().min(3).max(80),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: CATEGORIES, layout: 'dropdown' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      description: 'One product per photo, plain background, taken in daylight.',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      description: 'Optional. e.g. Camlin, Doms, Faber-Castell',
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
      description: 'Optional. e.g. PCS, PACK, BOX',
    }),
    defineField({
      name: 'mrp',
      title: 'MRP (₹)',
      type: 'number',
      description: 'Optional. Fill both MRP and Our price to show the "Save ₹" tag. Leave both empty to show "Price on WhatsApp".',
      validation: (r) => r.min(1),
    }),
    defineField({
      name: 'ourPrice',
      title: 'Our price (₹)',
      type: 'number',
      validation: (r) =>
        r.min(1).custom((ourPrice, ctx) => {
          const mrp = ctx.document?.mrp;
          if (ourPrice == null || mrp == null) return true;
          return ourPrice < mrp ? true : 'Our price must be lower than MRP';
        }),
    }),
    defineField({
      name: 'newArrival',
      title: 'Show "New in" tag',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    { title: 'Newest first', name: 'createdDesc', by: [{ field: '_createdAt', direction: 'desc' }] },
    { title: 'Name', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: CATEGORIES.find((c) => c.value === subtitle)?.title ?? subtitle,
      media,
    }),
  },
});
