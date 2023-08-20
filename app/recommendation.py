from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Sample list of strings in the database
database_strings = [
    "Green Shirt for men",
    "Black shirt for women",

]

# Mapping of words to suggestions
word_suggestions = {
    "Kurta": ["black kurta", "white kurta"],
    "Pant": ["blue pant", "white pant"],
    "Shirt": ["black shirt", "check shirt"],
    "Lehenga": ["Black wedding lehenga", "White lehenga"],
    "Top": ["red women's top", "orange top"],
    "Kurti": ["White Kurti for women", "olive kurti for women"]
}


def find_closest_matching_strings(new_input_string, num_results=3):
    # Check if database_strings has less than 2 entries
    # if len(database_strings) < 2:
    #     # Check if any words from word_suggestions are present in new_input_string
    #     matching_suggestion = None
    #     for word, suggestion in word_suggestions.items():
    #         if word.lower() in new_input_string.lower():
    #             matching_suggestion = suggestion
    #             break

    #     # If a matching suggestion is found, return it
    #     if matching_suggestion:
    #         return [matching_suggestion]
    #     else:
    #         return [new_input_string + ' ']

    # Initialize the vectorizer
    vectorizer = CountVectorizer()
    X = vectorizer.fit_transform(database_strings)

    # Preprocess and vectorize the new input string
    new_input_vector = vectorizer.transform([new_input_string])

    # Calculate cosine similarities with the existing database vectors
    similarities = cosine_similarity(new_input_vector, X)

    # Find indices of closest matching strings
    closest_indices = np.argsort(similarities[0])[::-1][:num_results]

    # Get the closest matching strings from the database
    closest_strings = [database_strings[i] for i in closest_indices]

    return closest_strings


# New input string
new_input_string = "black shirt for men"

if len(database_strings) <= 2:
    # Check if any words from word_suggestions are present in new_input_string
    matching_suggestion = None
    for word, suggestion in word_suggestions.items():
        if word.lower() in new_input_string.lower():
            matching_suggestion = suggestion
            break

    # If a matching suggestion is found, return it
    if matching_suggestion:
        print([matching_suggestion])
    else:
        print([new_input_string + ' '])
else:
    closest_matching_strings = find_closest_matching_strings(new_input_string)

    print("Three closest matching strings:", closest_matching_strings)
# Find the three closest matching strings for the new input
