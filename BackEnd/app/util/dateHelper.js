// dateHelper.js

export const getCurrentDateTime = () => {
    const currentDate = new Date();
    return currentDate.toISOString(); // Retorna la fecha y hora actual en formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
  };
  