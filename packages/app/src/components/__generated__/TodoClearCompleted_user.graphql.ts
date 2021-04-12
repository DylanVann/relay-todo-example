/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TodoClearCompleted_user = {
    readonly id: string;
    readonly userId: string;
    readonly completedCount: number;
    readonly " $refType": "TodoClearCompleted_user";
};
export type TodoClearCompleted_user$data = TodoClearCompleted_user;
export type TodoClearCompleted_user$key = {
    readonly " $data"?: TodoClearCompleted_user$data;
    readonly " $fragmentRefs": FragmentRefs<"TodoClearCompleted_user">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoClearCompleted_user",
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
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '6d0f3da749ce85fffa1cf60c86c0265b';
export default node;
