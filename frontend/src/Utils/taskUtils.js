// src/utils/taskUtils.js
export const calculateStatus = (list) => {
  if (!list || list.length === 0) return "Pending";
  const completedCount = list.filter(item => item.completed).length;
  if (completedCount === 0) return "Pending";
  if (completedCount === list.length) return "Completed";
  return "In Progress";
};