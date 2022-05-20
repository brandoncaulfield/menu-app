/**
 * Get the full menu
 * @returns
 */
export const getMenu = async () => {
    const data: any = await fetch('http://localhost:3002/api/v1/menu');
    const parsedData = await data.json();
    return parsedData;
};
