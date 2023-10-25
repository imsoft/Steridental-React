export const formatDate = (originalDate: string): string => {
  const dateObject: Date = new Date(originalDate);

  const getMonthName = (month: number): string => {
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return monthNames[month];
  };

  const day: number = dateObject.getDate();
  const month: string = getMonthName(dateObject.getMonth());
  const year: number = dateObject.getFullYear();

  const formattedDate: string = `${day} de ${month} de ${year}`;
  return formattedDate;
};
