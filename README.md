# Relay Todo Example

Shows how to accomplish a few things:

- **Render-as-you-fetch** • Renders while fetching.
- **Nested routes** • Configure routes in a nested manner. Fetches
  simultaneously.
- **Optimistic updates** • Updates assumed to work. Will rollback if not.
  - A better user experience.
- **Paginated list view** • Load more items.
  - Very common UI pattern.
  - User can create items on this page.
- **Detail view** • Update item, changes affect list when going back.
  - Item can be updated on this view.
  - Item can be deleted on this view, user will be sent back to list, item
    should not be present.

## Running

```bash
yarn
yarn dev
```
