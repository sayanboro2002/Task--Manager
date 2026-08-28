// Home page download report
export const downloadTaskReport = (allTasks) => {
  if (!allTasks || allTasks.length === 0) {
    alert("No tasks available to export!");
    return;
  }

  const reportData = allTasks.map((task) => ({
    Title: task.title,
    Description: task.description || "N/A",
    Priority: task.priority,
    Status: task.status,
    "Start Date": task.startDate || "N/A",
    "Due Date": task.duration || "N/A",
    "Assigned To": task.assignedUsers ? task.assignedUsers.map(u => u.name).join(", ") : "None"
  }));

  const headers = Object.keys(reportData[0]);
  const csvRows = [];
  csvRows.push(headers.join(","));

  reportData.forEach(row => {
    const values = headers.map(header => {
      const val = row[header] || "";
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(","));
  });

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "Tasks_Report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// team page download report
export const downloadTeamReport = (members) => {
  if (!members || members.length === 0) {
    alert("No team members available to export!");
    return;
  }

  const reportData = members.map((member) => ({
    "User Name": member.name,
    Email: member.email,
    "Pending Tasks": member.pendingCount || 0,
    "In Progress Tasks": member.inProgressCount || 0,
    "Completed Tasks": member.completedCount || 0,
  }));

  const headers = Object.keys(reportData[0]);
  const csvRows = [];
  csvRows.push(headers.join(","));

  reportData.forEach((row) => {
    const values = headers.map((header) => {
      const val = row[header] || "";
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(","));
  });

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "User_Task_Report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};