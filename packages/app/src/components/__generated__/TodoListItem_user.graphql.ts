/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TodoListItem_user = {
    readonly id: string;
    readonly userId: string;
    readonly totalCount: number;
    readonly completedCount: number;
    readonly " $refType": "TodoListItem_user";
};
export type TodoListItem_user$data = TodoListItem_user;
export type TodoListItem_user$key = {
    readonly " $data"?: TodoListItem_user$data;
    readonly " $fragmentRefs": FragmentRefs<"TodoListItem_user">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoListItem_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "userId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "completedCount",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = 'f137fb4593d6a6ad5dd1339233fa2e1b';
export default node;
