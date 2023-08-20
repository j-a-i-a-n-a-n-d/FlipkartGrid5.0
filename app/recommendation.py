from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
# from models import *
import numpy as np

# Sample list of strings in the database
database_strings = [
    "apple orange banana",
    "apple banana cherry",
    "orange peach",
    "grapefruit apple",
    "cherry grapefruit"
]

def find_closest_matching_strings(new_input_string, num_results=2):
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

# Find the three closest matching strings for the new input
closest_matching_strings = find_closest_matching_strings(new_input_string)

print("Three closest matching strings:", closest_matching_strings)