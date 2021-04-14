<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <!-- <button
               class="menubar__button"
               :class="{ 'is-active': isActive.bold() }"
               @click="commands.bold"
               >
               <icon name="bold" />
        </button>-->
        <b-button icon-right="undo" @click="commands.undo" />
        <b-button icon-right="redo" @click="commands.redo" />
        <b-button
          icon-right="format-bold"
          :class="{'is-primary': isActive.bold()}"
          @click="commands.bold"
        />
        <b-button
          icon-right="format-italic"
          :class="{'is-primary': isActive.italic()}"
          @click="commands.italic"
        />
        <b-button
          icon-right="format-strikethrough"
          :class="{'is-primary': isActive.strike()}"
          @click="commands.strike"
        />

        <b-button
          icon-right="format-underline"
          :class="{'is-primary': isActive.underline()}"
          @click="commands.underline"
        />

        <b-button
          label="{ }"
          :class="{'is-primary': isActive.code_block()}"
          @click="commands.code_block"
        />

        <b-button
          icon-right="format-paragraph"
          :class="{'is-primary': isActive.paragraph()}"
          @click="commands.paragraph"
        />

        <b-button
          :class="{'is-primary': isActive.heading({level: 1})}"
          icon-right="format-header-1"
          @click="commands.heading({ level: 1 })"
        />
        <b-button
          icon-right="format-header-2"
          :class="{'is-primary': isActive.heading({level: 2})}"
          @click="commands.heading({ level:2 })"
        />
        <b-button
          icon-right="format-header-3"
          :class="{'is-primary': isActive.heading({level: 3})}"
          @click="commands.heading({ level: 3 })"
        />

        <b-button
          icon-right="format-list-bulleted"
          :class="{'is-primary': isActive.bullet_list()}"
          @click="commands.bullet_list"
        />
        <b-button
          icon-right="format-list-numbered"
          :class="{'is-primary': isActive.ordered_list()}"
          @click="commands.ordered_list"
        />

        <b-button
          icon-right="format-quote-open"
          :class="{'is-primary': isActive.blockquote()}"
          @click="commands.blockquote"
        />
        <b-button
          icon-right="image"
          :class="{'is-primary': isActive.image()}"
          @click="showImagePrompt(commands.image)"
        />

        <b-button icon-right="format-page-break" @click="commands.horizontal_rule" />
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content box" onUpdate="updatedText" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image,
} from "tiptap-extensions";
export default {
  components: {
    EditorContent,
    EditorMenuBar,
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
        ],
        content: "",
        onUpdate: ({ getJSON, getHTML }) => {
          this.json = getJSON();
          this.html = getHTML();
          this.$emit("textChange", this.html);
        },
      }),
      json: {},
      html: "",
    };
  },
  mounted() {},
  beforeDestroy() {
    this.editor.destroy();
  },

  methods: {
    updatedText() {
      console.log("hi");
    },
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    },
  },
};
</script>
<style lang="scss">
.editor {
  h {
    &1 {
      font-size: 26pt;
    }
    &2 {
      font-size: 20pt;
    }
    &3 {
      font-size: 16pt;
    }
  }
  ul {
    list-style: square outside !important;
    margin-left: 2rem;
  }
  ol {
    margin-left: 2rem;
  }
  blockquote {
    background: #f9f9f9;
    font-style: italic;
    text-align: right;
    margin-right: 1em;
  }
  hr {
    background: #c0c0c0;
  }
  img {
    height: 10rem;
  }

  .ProseMirror {
    min-height: 15rem;
    max-height: 25rem;
    overflow: auto;
    border: 1px solid black;
    padding-left: 1em;
  }
}
</style>
