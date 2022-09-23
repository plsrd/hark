import Schema from '@sanity/schema';
import blockTools from '@sanity/block-tools';
import { toHTML } from '@portabletext/to-html';
import htm from 'htm';
import vhtml from 'vhtml';

const html = htm.bind(vhtml);

const components = {
  types: {
    code: ({ value }) =>
      html`<pre class="ql-syntax"><code>${value.text}</code></pre>`,
  },
};

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

export const generateBlocks = field =>
  blockTools.htmlToBlocks(field, blockContentType, {
    rules: [
      // Special rule for code blocks
      {
        deserialize(el, next, block) {
          if (el.tagName.toLowerCase() != 'pre') {
            return undefined;
          }
          const code = el.children[0];
          const childNodes =
            code && code.tagName.toLowerCase() === 'code'
              ? code.childNodes
              : el.childNodes;
          let text = '';
          childNodes.forEach(node => {
            text += node.textContent;
          });
          // Return this as an own block (via block helper function), instead of appending it to a default block's children
          return block({
            _type: 'code',
            language: 'javascript',
            text: text,
          });
        },
      },
    ],
  });

export const generateHTML = content => toHTML(content, { components });
