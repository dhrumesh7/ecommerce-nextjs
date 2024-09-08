// Function to calculate Percentage
export const calPercentage = (price, noOfferprice) => {
    return Math.round(((noOfferprice - price) / noOfferprice) * 100) || 0
}