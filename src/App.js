import "./App.css";
import {
  Card,
  Button,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";
import {
  findAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./TaskService";

const emptyTask = {
  id: null,
  title: "",
  description: "",
  status: "",
  date: "",
};

const App = () => {
  const [open, setOpen] = useState(false);
  const [currData, setCurrData] = useState([]);
  const [editTask, setEditTask] = useState(emptyTask);
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    refreshTasks();
  }, []);

  const clickOpenNew = () => {
    setIsNew(true);
    setEditTask(emptyTask);
    setOpen(true);
  };

  const clickOpenEdit = (task) => {
    setIsNew(false);
    setEditTask(task);
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja mesmo excluir essa Task?"))
      deleteTask(id).then(() => {
        refreshTasks();
      });
  };

  const newTask = () => {
    createTask(editTask).then(() => {
      setOpen(false);
      refreshTasks();
    });
  };

  const saveEditTask = () => {
    updateTask(editTask.id, editTask).then(() => {
      setOpen(false);
      refreshTasks();
    });
  };

  const handleDialogSave = () => {
    if (isNew) newTask();
    else saveEditTask();
  };

  const refreshTasks = () => {
    findAllTasks().then((data) => {
      console.log("data", data);
      setCurrData(data);
    });
  };

  return (
    <main>
      <Card variant="outlined" sx={{ minWidth: 200, width: 1000 }}>
        <CardHeader
          title="Tasks"
          action={
            <Button variant="contained" onClick={clickOpenNew}>
              <Add />
            </Button>
          }
        />
      </Card>
      <div className="tasks">
        {currData.map((i) => (
          <Card key={i.id} sx={{ width: 200 }}>
            <CardHeader
              title={i.title}
              action={
                <>
                  <IconButton
                    variant="contained"
                    size="small"
                    onClick={() => clickOpenEdit(i)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    variant="contained"
                    size="small"
                    onClick={() => handleDelete(i.id)}
                  >
                    <Delete />
                  </IconButton>
                </>
              }
            />
            <CardContent>
              <Typography>{i.description}</Typography>
              <Typography>{i.status}</Typography>
              <Typography>{i.date}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>{isNew ? "Nova" : "Editar"} Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Título"
            type="text"
            fullWidth
            variant="outlined"
            value={editTask.title}
            onChange={(event) => {
              const newTask = { ...editTask, title: event.target.value };
              setEditTask(newTask);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Descrição"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={2}
            value={editTask.description}
            onChange={(event) => {
              const newTask = { ...editTask, description: event.target.value };
              setEditTask(newTask);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Status"
            type="text"
            fullWidth
            variant="outlined"
            value={editTask.status}
            onChange={(event) => {
              const newTask = { ...editTask, status: event.target.value };
              setEditTask(newTask);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Data"
            type="text"
            fullWidth
            variant="outlined"
            value={editTask.date}
            onChange={(event) => {
              const newTask = { ...editTask, date: event.target.value };
              setEditTask(newTask);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleDialogSave}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default App;
