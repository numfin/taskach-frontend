export function UILabel(el?: JSX.Element, required = false) {
  if (el) {
    return (
      <label class="block text-sm font-medium text-gray-dark tablet:absolute tablet:bottom-100%">
        {el}: {required && <span class="text-red-500">*</span>}
      </label>
    );
  }
  return null;
}
