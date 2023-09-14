export default function getRecentConversations(
  conversationsObj,
  maxSize = 125000
) {
  // Get array of all conversation objects
  const conversationArr = Object.values(conversationsObj);

  // Sort conversations by most recent timestamp
  conversationArr.sort((a, b) => b.mem[0].timestamp - a.mem[0].timestamp);

  // Initialize output object and size
  let output = {};
  let size = 0;

  // Loop through conversations until max size is reached
  for (let i = 0; i < conversationArr.length; i++) {
    const conversation = conversationArr[i];

    // Add conversation to output if it doesn't exceed max size
    const newSize = size + JSON.stringify(conversation).length;
    if (newSize <= maxSize) {
      output[conversation.guid] = conversation;
      size = newSize;
    } else {
      // Stop loop if max size is exceeded
      break;
    }
  }

  return output;
}
