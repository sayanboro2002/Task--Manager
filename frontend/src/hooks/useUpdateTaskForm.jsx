import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { calculateStatus } from "../Utils/taskUtils"; 

export const useUpdateTaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Pending"); 
  const [duration, setDuration] = useState("");
  const [checklistText, setChecklistText] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [taskRes, memberRes] = await Promise.all([
          axios.get(`http://localhost:3001/api/tasks/${id}`, { headers }),
          axios.get("http://localhost:3001/api/team", { headers })
        ]);

        const task = taskRes.data;
        setTitle(task.title || "");
        setDescription(task.description || "");
        setPriority(task.priority || "Low");
        setStatus(task.status || "Pending");
        
        const formattedChecklist = task.checklist ? task.checklist.map(item => 
          typeof item === 'string' ? { title: item, completed: false } : { title: item.title, completed: item.completed || false }
        ) : [];
        setChecklist(formattedChecklist);
        
        setDuration(task.duration ? new Date(task.duration).toISOString().split('T')[0] : "");
        setSelectedUsers(task.assignedUsers ? task.assignedUsers.map(u => u._id || u) : []);
        setMembers(memberRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleAddChecklistItem = () => {
    if (!checklistText.trim()) return;
    const updated = [...checklist, { title: checklistText.trim(), completed: false }];
    setChecklist(updated);
    setStatus(calculateStatus(updated));
    setChecklistText("");
  };

  const handleRemoveChecklistItem = (index) => {
    const updated = checklist.filter((_, i) => i !== index);
    setChecklist(updated);
    setStatus(calculateStatus(updated));
  };

  const handleToggleChecklist = (index) => {
    const updated = checklist.map((item, i) => i === index ? { ...item, completed: !item.completed } : item);
    setChecklist(updated);
    setStatus(calculateStatus(updated));
  };

  const handleCheckboxChange = (memberId) => {
    setSelectedUsers(prev => 
      prev.includes(memberId) ? prev.filter(uid => uid !== memberId) : [...prev, memberId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3001/api/tasks/${id}`, {
        title, description, priority, status, duration, checklist, assignedUsers: selectedUsers
      }, { headers: { Authorization: `Bearer ${token}` } });

      alert("Task Updated Successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task");
    }
  };

  const handleDeleteTask = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsDeleteModalOpen(false);
      navigate("/home");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  return {
    title, setTitle, description, setDescription, priority, setPriority,
    status, setStatus, duration, setDuration, checklistText, setChecklistText,
    checklist, members, selectedUsers, isModalOpen, setIsModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen, handleAddChecklistItem,
    handleRemoveChecklistItem, handleToggleChecklist, handleCheckboxChange,
    handleSubmit, handleDeleteTask
  };
};