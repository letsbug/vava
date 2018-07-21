/**
 * configuration (Create by ggboom)
 * @author: ggboom
 * @datetime: 2018/7/21 17:58
 */

export const toobarOptions = [
  // toggled buttons
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  // custom dropdown
  [{ 'font': [] }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  // superscript/subscript
  [{ 'script': 'sub' }, { 'script': 'super' }],
  // outdent/indent
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  // text direction
  [{ 'direction': 'rtl' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  // dropdown with defaults from theme
  [{ 'color': [] }, { 'background': [] }],
  [{ 'align': [] }],
  // remove formatting button
  ['clean']
]

export const document = {
  modules: {
    toolbar: toobarOptions
  },
  theme: 'snow'
}
