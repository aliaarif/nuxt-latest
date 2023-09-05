<template>
    <div>
  <tiptap-vuetify
        :value="value"
        :extensions="extensions"
        @input="$emit('input', arguments[0])"
      />
    </div>
  </template>
  <script>
  export default {
    components: { TiptapVuetify },
    props: {
      value: {
        type: String,
        default: `<p>Example paragraph</p>`,
      },
    },
    data: () => ({
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [Heading, { options: { levels: [1, 2, 3] } }],
        Bold,
        Link,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
    }),
  };
  </script>