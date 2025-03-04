export function toSentenceCase(
  string_: string | undefined
): string | undefined {
  if (!string_) return string_;
  // Split the string into sentences based on punctuation followed by a space or end of string
  const sentences = string_.match(/[^.!?]+[.!?]*/g) || [];

  // Process each sentence
  const sentenceCased = sentences.map((sentence) => {
    // Trim leading and trailing spaces
    sentence = sentence.trim();

    // Convert the first character to uppercase and the rest to lowercase
    sentence =
      sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();

    // Replace standalone ' i ' with ' I '
    sentence = sentence.replaceAll(/\bi\b/g, "I");

    return sentence;
  });

  // Join the processed sentences back together
  return sentenceCased.join(" ");
}
