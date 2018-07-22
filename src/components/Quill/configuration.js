/**
 * configuration (Create by ggboom)
 * @author: ggboom
 * @datetime: 2018/7/21 17:58
 */

export const toobarOptions = [
  // font size
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  // toggled buttons
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  // superscript/subscript
  [{ 'script': 'sub' }, { 'script': 'super' }],
  // outdent/indent
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  // dropdown with defaults from theme
  [{ 'color': [] }, { 'background': [] }],
  [{ 'direction': 'rtl' }, { 'align': [] }],
  // image & link
  ['link', 'image', 'video'],
  // remove formatting button
  ['clean']
]

export const document = {
  modules: {
    toolbar: toobarOptions,
    imageDrop: true,
    history: {
      delay: 1000,
      maxStack: 50,
      userOnly: false
    }

  },
  theme: 'snow'
}
