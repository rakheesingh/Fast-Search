export function isEmpty(obj:object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  export const truncateBody = (text: string, maxLength: number = 64): string => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };