export const handleKeyPress = (e: any) => {
  const charCode = e.which ? e.which : e.keyCode;
  if (
    e.key === "Backspace" ||
    e.key === "Delete" ||
    e.key === "Tab" ||
    e.key === "Escape" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight"
  ) {
    return;
  }

  // Allow numeric keypad input when Num Lock is enabled
  const isNumericKeypad = charCode >= 96 && charCode <= 105;

  // Allow standard number keys (0-9) and numeric keypad keys (0-9)
  if (
    (charCode < 48 || charCode > 57) &&
    !isNumericKeypad &&
    charCode !== 46 &&
    charCode !== 110 &&
    charCode !== 190
  ) {
    e.preventDefault();
  }

  // Ensure only one decimal point is allowed
  if (
    (charCode === 46 || charCode === 110 || charCode === 190) &&
    e.target.value.includes(".")
  ) {
    e.preventDefault();
  }
};

// Prevent pasting non-numeric content
export const handlePaste = (e: any) => {
  const paste = (e.clipboardData || (window as any).clipboardData).getData(
    "text",
  );
  if (!/^\d*\.?\d*$/.test(paste)) {
    e.preventDefault();
  }
};
