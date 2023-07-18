function processText(text) {
    // Remove non-alphanumeric characters except spaces
    const processedText = text.replace(/[^a-zA-Z0-9\s]/g, "");
  
    // Replace consecutive spaces and newlines with a single space
    const finalText = processedText.replace(/[\s\n]+/g, " ");

    // Remove single letters
    const filteredText = finalText.replace(/\b[a-zA-Z0-9]{1}\b/g, "");
  
    return filteredText;
  }

  export default processText
