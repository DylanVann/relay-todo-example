/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TodoMarkAllComplete_user = {
    readonly id: string;
    readonly userId: string;
    readonly totalCount: number;
    readonly completedCount: number;
    readonly " $refType": "TodoMarkAllComplete_user";
};
export type TodoMarkAllComplete_user$data = TodoMarkAllComplete_user;
export type TodoMarkAllComplete_user$key = {
    readonly " $data"?: TodoMarkAllComplete_user$data;
    readonly " $fragmentRefs": FragmentRefs<"TodoMarkAllComplete_user">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoMarkAllComplete_user",
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
(node as any).hash = '0f4c7ecd467ede3094b5892a6bd389de';
export default node;
