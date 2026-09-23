export function updateCategory(transactions, categories) {
  return transactions.map((transaction) => {
    const category = categories.find((cat) => cat._id === transaction.category);
    if (category) {
      return { ...transaction, category: category.name };
    }
    return transaction;
  });
}
