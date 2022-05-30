# Peditor 

### Smallest WYSIWYG HTML editor

## Example

```html
<link rel="stylesheet" href="https://raw.githubusercontent.com/pixiedevpraveen/peditor/master/dist/peditor.css">
<script src="https://raw.githubusercontent.com/pixiedevpraveen/peditor/master/dist/peditor.js"></script>

<div id="editor" class="peditor"></div>
<div>
    HTML output:
    <div id="html-output"></div>
</div>
```

```js
const editor = peditor.init({
    element: document.getElementById('editor'),
    onChange: html => {
        document.getElementById('html-output').textContent = html
    },
    defaultParagraphSeparator: 'p',
    styleWithCSS: true,
})
```

## UI changes
- to change editor background color just change '--peditor-bg' css variable

```css
  --peditor-bg: #BF787E;
``` 

- Other css varibles
```css
  --peditor-btn: #6FBFA255;
  --peditor-size: 2rem;
  --peditor-shadow: #05050555;
``` 