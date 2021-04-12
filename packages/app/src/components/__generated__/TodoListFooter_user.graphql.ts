/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TodoListFooter_user = {
    readonly id: string;
    readonly userId: string;
    readonly completedCount: number;
    readonly totalCount: number;
    readonly " $refType": "TodoListFooter_user";
};
export type TodoListFooter_user$data = TodoListFooter_user;
export type TodoListFooter_user$key = {
    readonly " $data"?: TodoListFooter_user$data;
    readonly " $fragmentRefs": FragmentRefs<"TodoListFooter_user">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoListFooter_user",
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
      "name": "completedCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalCount",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '9918b7f02ce09807ec3a3e2a082da3f0';
export default node;
