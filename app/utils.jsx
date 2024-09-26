export function extractNumberAndUnit(str) {
    const regex = /^(\d+)(\D+)$/;
    const match = str.match(regex);
  
    if (match) {
      return {
        number: parseInt(match[1], 10),
        unit: match[2]
      };
    } else {
      return null;
    }
  }