export function removeThinking(responseContent) {
    const regex = /<think>[\s\S]*?<\/think>/g;
    return responseContent.replace(regex, '').trim();
}
  