```html
<r-modal
  title: string | false
  blocking: boolean // optional
  buttons: boolean // optional, set to false to hide bottom bar with buttons
  size: string  // optional, ("small" | "medium" | "large" | "huge" | "maximum")
>
  {{ modal content }}
  <template v-slot:buttons>
    {{ r-buttons }}
  </template>
</r-modal>
```

Confirmation modal
```javascript
const result = await this.$root.rModalConfirm(
  "Question",
  "Confirm text", // optional
  "Cancel text", // optional
  "Description text", // optional
);
```
