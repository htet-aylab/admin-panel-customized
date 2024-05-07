export const topup_statuses = [
    {
        id: 0,
        name: "Pending",
        color: "orange"
    },
    {
        id: 1,
        name: "Approved",
        color: "green"
    },
    {
        id: 2,
        name: "Decline",
        color: "red"
    }
];

export const getTopUpStatus = (value: number) => {
    const status = topup_statuses.find(status => status.id === value);
  
    if (!status) {
      return {
        colorScheme: "red",
        name: "Unknown"
      };
    }
  
    return {
      colorScheme: status.color,
      name: status.name,
      id: status.id
    };
};
  