export function validateTitle(name) {
    if (name.trim() === "") {
      return "Title is required";
    }
    return "";
}

export function validateSummary(description) {
if (description.trim() === "") {
    return "Summary is required";
    }
    return "";
}

export function validateSteps(steps) {
    if (steps.length === 0) {
      return "Please write at least one step";
    }
    return "";
}

export function validateDiets(diets) {
    if (diets.length === 0) {
      return "Please select at least one genre";
    }
    return "";
}

export function validateHealthScore(healthScore) {
    if (healthScore === 0) {
      return "The rating cannot be zero";
    }
    return "";
}

export function validateImageURL(imageURL) {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
  
    if (!urlPattern.test(imageURL)) {
      return "Please enter a valid URL for the image";
    } 
    return "";
}

export function validateDate(date) {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (date.trim() === "") {
      return "Description is required";
  }
  if (!datePattern.test(date)) {
      return "Please enter a valid date in the format YYYY-MM-DD";
  }

  return "";
}