export const clearFilter = async () => {
  while (
    Array.from(document.querySelectorAll('input[type="checkbox"]')).some(
      (checkbox) => (checkbox as any).checked,
    )
  ) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let index = 0; index < checkboxes.length; index++) {
      const checkBox = checkboxes[index] as any;
      if (checkBox.checked) {
        checkBox.click();
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 10));
  }
};
