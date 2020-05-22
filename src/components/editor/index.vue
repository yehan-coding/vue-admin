<template>
  <quill-editor
    :style="{ height: height }"
    :value="value"
    ref="myQuillEditor"
    :options="editorOption"
    @change="onEditorChange($event)">
  </quill-editor>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor, Quill } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
import { ImageDrop } from 'quill-image-drop-module'
import imageResize from 'quill-image-resize-module'

Quill.register('modules/ImageExtend', ImageExtend)
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', imageResize)

export default {
  model: [
    {
      prop: 'value',
      event: 'change'
    }
  ],
  props: {
    value: {
      default: ''
    },
    imageServer: {
      type: String,
      default: ''
    },
    height: {
      default: '300px'
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    }
  },
  components: { quillEditor },
  data () {
    return {
      editorOption: {
        placeholder: this.placeholder,
        modules: {
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
          },
          ImageExtend: {
            loading: true,
            name: 'file',
            size: 5,
            action: this.imageServer,
            response: (res) => {
              return this.$imgServer + res.data.url
            }
          },
          toolbar: {
            container: container,
            handlers: {
              'image': function (value) {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      }
    }
  },
  methods: {
    onEditorChange({ quill, html, text }) {
      this.$emit('input', html)
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
}
</script>

<style lang="css">
  .ql-tooltip.ql-editing {
    left: 50% !important;
    transform: translateX(-50%) !important;
  }
  .ql-video {
    width: 600px;
    height: 400px;
    margin: auto;
  }
  .ql-toolbar {
    line-height: 1;
  }
</style>

<style lang="scss" scoped>
  .quill-editor {
    width: 100%;
    padding-bottom: 4rem;
  }
  .el-input {
    width: 100%;
  }
</style>
