export const COOKIE_NAME = "chat-conv-x";
export const promptPresets = {
  "Explain This": "explain the contents of this document",
  "Clean Up This Code":
    "rewrite this code to be more efficient and readable. add verbose comments",
  "Translate To...": "translate this do document to <language>",
};

export const promptLabels = Object.keys(promptPresets);
