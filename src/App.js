import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);
  const httpData = useHttp({
    url: 'https://react-http-154f5-default-rtdb.firebaseio.com/tasks.json'
  }, (data) => {
    const loadedTasks = [];

    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }
    setTasks(loadedTasks);
  });

  useEffect(() => {
    httpData.sendRequest();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={httpData.isLoading}
        error={httpData.error}
        onFetch={httpData.sendRequest}
      />
    </React.Fragment>
  );
}

export default App;