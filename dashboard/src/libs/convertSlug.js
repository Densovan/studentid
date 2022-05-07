function convertToSlug(Text) {
  return Text.toLowerCase().replace(/ /g, '-');
}

export default convertToSlug;
