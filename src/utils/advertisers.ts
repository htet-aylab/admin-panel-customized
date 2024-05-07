export const advertiser_statuses = [
    {
        id: 0,
        name: "Pending",
        color: "orange"
    },
    {
        id: 1,
        name: "Active",
        color: "green"
    },
    {
        id: 2,
        name: "Inactive",
        color: "red"
    }
];

export const getAdvertiserStatus = (value: number) => {
    const status = advertiser_statuses.find(status => status.id === value);
  
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
  