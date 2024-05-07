export const OPTIONS_PURPOSE = [
    {
      name: "More website/social media visits",
      description: "Get more people to visit your website",
      id: 0,
    },
    {
      name: "More awareness",
      description: "Make more people know about your project",
      id: 1,
    },
    {
      name: "Maximise twitter following",
      description: "Make more people know about your twitter",
      id: 2,
    },
];

export const getPurposeName = (id:number) => {
    const option = OPTIONS_PURPOSE.find(option => option.id === id);
    return option?.name || ''; 
};

export const campaign_statuses = [
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
        name: "Completed",
        color: "purple"
    },
    {
        id: 3,
        name: "Rejected",
        color: "red"
    }
];

export const getCampaignStatus = (value: number) => {
    const status = campaign_statuses.find(status => status.id === value);
  
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
  