export const usePhoneFormatter = () => {
  const formatIndianPhone = (phone: string | number): string => {
    if (!phone) return ''
    
    // Remove all non-digit characters
    let cleaned = phone.toString().replace(/\D/g, '')
    
    // If it is 12 digits starting with 91 (e.g. 9198765-43210)
    if (cleaned.length === 12 && cleaned.startsWith('91')) {
      const part1 = cleaned.substring(2, 7)
      const part2 = cleaned.substring(7)
      return `+91 ${part1}-${part2}`
    }
    
    // If it is 10 digits (e.g. 9876543210)
    if (cleaned.length === 10) {
      const part1 = cleaned.substring(0, 5)
      const part2 = cleaned.substring(5)
      return `+91 ${part1}-${part2}`
    }
    
    // Fallback if formatting doesn't fit standard pattern
    return phone.toString()
  }

  return {
    formatIndianPhone
  }
}
