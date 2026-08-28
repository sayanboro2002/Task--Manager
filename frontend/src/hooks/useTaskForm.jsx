import { useState, useEffect } from "react";
import axios from "axios";

export const useTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  
  const [checklistText, setChecklistText] = useState("");
  const [checklist, setChecklist] = useState([]);

  const [members, setMembers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get("http://localhost:3001/api/team", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }); 
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    fetchMembers();
  }, []);

  const handleAddChecklistItem = () => {
    if (!checklistText.trim()) return;
    setChecklist([...checklist, { title: checklistText, isDone: false }]);
    setChecklistText("");
  };

  const handleRemoveChecklistItem = (index) => {
    const updated = checklist.filter((_, i) => i !== index);
    setChecklist(updated);
  };

  const handleCheckboxChange = (memberId) => {
    if (selectedUsers.includes(memberId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== memberId));
    } else {
      setSelectedUsers([...selectedUsers, memberId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); 
      await axios.post("http://localhost:3001/api/tasks", {
        title,
        description,
        priority,
        status: "Pending",
        startDate,
        duration,
        checklist,
        assignedUsers: selectedUsers,
      }, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });

      alert("Task Created Successfully!");

      // input field reset if form submitted successfully
      setTitle("");
      setDescription("");
      setPriority("Low");
      setStartDate("");
      setDuration("");
      setChecklist([]);
      setSelectedUsers([]);

    } catch (error) {
      console.error("Error creating task:", error.response?.data || error.message);
      alert("Failed to create task: " + JSON.stringify(error.response?.data || error.message));
    }
  };

  return {
    title, setTitle,
    description, setDescription,
    priority, setPriority,
    startDate, setStartDate,
    duration, setDuration,
    checklistText, setChecklistText,
    checklist,
    members,
    selectedUsers,
    isModalOpen, setIsModalOpen,
    handleAddChecklistItem,
    handleRemoveChecklistItem,
    handleCheckboxChange,
    handleSubmit
  };
};