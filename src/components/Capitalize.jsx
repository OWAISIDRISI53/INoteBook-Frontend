const Capitalize = (word) => {
  const cap = word.charAt(0).toUpperCase();
  return word.replace(word.charAt(0), cap);
};

export default Capitalize;
