import Schema from '@sanity/schema';
import blockTools from '@sanity/block-tools';

// Start with compiling a schema we can work against
const defaultSchema = Schema.compile({
  name: 'myBlog',
  types: [
    {
      type: 'object',
      name: 'blogPost',
      fields: [
        {
          title: 'Title',
          type: 'string',
          name: 'title',
        },
        {
          title: 'Body',
          name: 'body',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
    },
  ],
});

// The compiled schema type for the content type that holds the block array
export const blockContentType = defaultSchema
  .get('blogPost')
  .fields.find(field => field.name === 'body').type;