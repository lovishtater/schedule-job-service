export const getFormattedDate = (date: string) => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleString();
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "text-yellow-500";
    case "COMPLETED":
      return "text-green-500";
    case "FAILED":
      return "text-red-500";
    default:
      return "";
  }
};
