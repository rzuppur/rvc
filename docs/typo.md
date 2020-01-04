Semantic heading level and visual style is separated — headings are all reset to normal text. Use `r-title-N` for visually styling them.

Default font stack is `"Inter", BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"` but Inter is not imported, if you want to use it instead of OS default fonts you have to add `@import url('https://rsms.me/inter/inter.css')` to your css.

You can override the font and weights using stylus variables. Font size and ratio affects spacing, this can be overridden using `$spacing-base`.
- `$font-sans` font stack
- `$font-weight-sans-regular` default 400
- `$font-weight-sans-medium` default 500
- `$font-weight-sans-bold` default 600
- `$line-height-base` default 1.5
- `$font-size-base` default 16px
- `$font-sizes-ratio` default 1.333, used for generating heading sizes

Text style classes:

**Weight:** 
`r-text-regular`, `r-text-medium`, `r-text-bold`

**Color:** 
`r-text-color-body`, `r-text-color-quiet`, `r-text-color-error`

**Size:** 
`r-text-small`, `r-title-1`, `r-title-2`, `r-title-3`, `r-title-4`, `r-title-5`, `r-title-6`, `r-title-caps`

**Alignment:** 
`r-text-left`, `r-text-center`, `r-text-right`

**Overflow:**
`r-ellipsis`