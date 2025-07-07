//concise es6 with Set
const capitalize = (sentence, lowercaseArticles = true) => {
  const articles = new Set(["the", "a", "an", "and", "but", "or", "for", "nor", "so", "yet", "as", "at", "by", "in", "of", "off", "on", "per", "to", "up", "via"]);
  return sentence
    .toLowerCase()
    .split(" ")
    .map((word, i) =>
      i === 0 || !(lowercaseArticles && articles.has(word))
        ? word[0].toUpperCase() + word.slice(1)
        : word
    )
    .join(" ");
};

document.querySelector("h1").textContent = capitalize(document.querySelector("h1").textContent);

/*
//not fully supported
const capitalize = (sentence, lowercaseArticles = true) => {
  const articles = new Set(["the", "a", "an", "and", "but", "or", "for", "nor", "so", "yet", "as", "at", "by", "in", "of", "off", "on", "per", "to", "up", "via"]);
  const segmenter = new Intl.Segmenter("en", { granularity: "word" });

  return [...segmenter.segment(sentence.toLowerCase())].map(({ segment, index }) =>
    index === 0 || !(lowercaseArticles && articles.has(segment)) && /\w/.test(segment)
      ? segment[0].toUpperCase() + segment.slice(1)
      : segment
  ).join("");
};
*/
/*
//es6 long
function capitalize(sentence, lowercaseArticles = true) {
	const words = sentence.toLowerCase().split(" ");
	const articles = ["the", "a", "an", "and", "but", "or", "for", "nor", "so", "yet", "as", "at", "by", "for", "in", "of", "off", "on", "per", "to", "up", "via"]; 
  
	const capitalizedWords = words.map((word, index) => {
	  // Capitalize the first word 
	  if (index === 0) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	  } 
	  // If lowercaseArticles is true, keep articles lowercase
	  if (lowercaseArticles && articles.includes(word)) { 
		return word; 
	  }
	  // Otherwise, capitalize the word
	  return word.charAt(0).toUpperCase() + word.slice(1); 
	});
	return capitalizedWords.join(" ");
  }
  
  const h1Element = document.querySelector("h1");
  
  // To lowercase articles in the middle of the sentence:
  h1Element.textContent = capitalize(h1Element.textContent, true); 
  
  // To capitalize all words except the first word:
  // h1Element.textContent = capitalize(h1Element.textContent, false);
*/
  //es5
  /*
function capitalize(sentence, lowercaseArticles) {
  var words = sentence.toLowerCase().split(" ");
  var articles = ["the", "a", "an", "and", "but", "or", "for", "nor", "so", "yet", "as", "at", "by", "for", "in", "of", "off", "on", "per", "to", "up", "via"]; 
  lowercaseArticles = typeof lowercaseArticles !== 'undefined' ? lowercaseArticles : true; // Default value for lowercaseArticles

  var capitalizedWords = words.map(function(word, index) {
    // Capitalize the first word 
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } 
    // If lowercaseArticles is true, keep articles lowercase
    if (lowercaseArticles && articles.indexOf(word) !== -1) { 
      return word; 
    }
    // Otherwise, capitalize the word
    return word.charAt(0).toUpperCase() + word.slice(1); 
  });
  return capitalizedWords.join(" ");
}

var h1Element = document.querySelector("h1");

// To lowercase articles in the middle of the sentence:
h1Element.textContent = capitalize(h1Element.textContent, true); 

// To capitalize all words except the first word:
// h1Element.textContent = capitalize(h1Element.textContent, false);
  */