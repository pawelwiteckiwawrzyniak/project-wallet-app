export const fetchCategories = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/categories");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
