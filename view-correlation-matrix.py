import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt

# Read the CSV file into a DataFrame
df = pd.read_csv('health.csv')

# Drop rows with null values
df = df.dropna()

# Extract relevant columns for correlation matrix
columns_of_interest = ['calm', 'joy', 'unified', 'reflection', 'community', 'generosity', 'patience', 'clarity', 'healing', 'effort']
df_selected = df[columns_of_interest]

# Calculate the correlation matrix
correlation_matrix = df_selected.corr()

# Display the correlation matrix using a heatmap
plt.figure(figsize=(10, 8))
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt=".2f", linewidths=.5)
plt.title('Correlation Matrix')
plt.show()

# Save the plot to a file
plt.savefig('correlation_matrix.png')
