import format from "date-fns/format";

export const getDate = (dateString) => {
  try {
    return format(new Date(dateString), "MMMM dd, yyyy");
  } catch (error) {
    return "Дата неизвестна";
  }
};
