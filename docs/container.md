Container sizes: `r-container-tiny`, `r-container-small`, `r-container-medium`, `r-container-large`, `r-container-huge`, `r-container-maximum`

For basic content container use class `r-container` and `r-container-{size}`.

For columns, use `r-container-row` on parent and if you want your row to have a maximum width add `r-container-{size}`.
Use `r-container-column` for columns and add `r-container-{size}` to limit column size.

Add `r-columns-mobile-{small|medium|large}` to `r-container-row` to specify the breakpoint when columns should switch to block layout.


```html
<div class="r-container r-container-{tiny|small|medium|large|huge|maximum}"></div>

<div class="r-container-row r-container-{tiny|small|medium|large|huge|maximum} r-columns-mobile-{small|medium|large}">
  <div class="r-container-column r-container-{tiny|small|medium|large|huge|maximum}"></div>
  <div class="r-container-column r-container-{tiny|small|medium|large|huge|maximum}"></div>
  <div class="r-container-column r-container-{tiny|small|medium|large|huge|maximum}"></div>
</div>
```
