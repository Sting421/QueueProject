import React, { useState, useEffect } from 'react';

function MyQueue() {
  const [tasks, setTasks] = useState([])
  const [highPriorityQueue, setHighPriorityQueue] = useState([])
  const [regularQueues, setRegularQueues] = useState([[], [], []])
  const [progress, setProgress] = useState({})

  const addTask = () => {
    // This code creates a new task object and adds it to the tasks state
    const newTask = {
      // Assign a unique ID using the current timestamp
      id: Date.now(),
      // Generate a random value between 50 and 100 (inclusive)
      value: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
      // Determine if the task is high priority (30% chance)
      isHighPriority: Math.random() < 0.3 // 30% chance of being high priority
    }
    // Update the tasks state by adding the new task to the existing array
    setTasks([...tasks, newTask])
  }
  
  const queueTask = () => {
    if (tasks.length === 0) return;

    const task = tasks[0];
    if (task.isHighPriority) {
      setHighPriorityQueue(prevQueue => [...prevQueue, task]);
    } else {
      const shortestQueue = regularQueues.reduce((acc, queue, index) => 
        queue.length < regularQueues[acc].length ? index : acc, 0);
      setRegularQueues(prevQueues => {
        const newQueues = [...prevQueues];
        newQueues[shortestQueue] = [...newQueues[shortestQueue], task];
        return newQueues;
      });
    }
    setTasks(prevTasks => prevTasks.slice(1));
    
    // Start the timer for the task
    startTimer(task);
  };

  const startTimer = (task) => {
    setProgress(prev => ({ ...prev, [task.id]: 100 }));
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = { ...prev };
        // Adjust the progress calculation to decrease
        newProgress[task.id] = Math.max((newProgress[task.id] || 100) - (100 / (task.value - 1)), 0);
        return newProgress;
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      removeTask(task);
    }, task.value * 1000);
  };

  const removeTask = (task) => {
    if (task.isHighPriority) {
      setHighPriorityQueue(prev => prev.filter(t => t.id !== task.id));
    } else {
      setRegularQueues(prev => prev.map(queue => queue.filter(t => t.id !== task.id)));
    }
    setProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[task.id];
      return newProgress;
    });
  };

  const renderQueue = (queue, title) => (
    <div className={title.toLowerCase().replace(' ', '-')}>
      <h3>{title}</h3>
      <ul>
        {queue.map(task => (
          <li key={task.id}>
            {task.value}
            <div style={{
              width: '100%',
              backgroundColor: '#ddd',
              marginTop: '5px'
            }}>
              <div style={{
                width: `${progress[task.id] || 0}%`,
                backgroundColor: '#f00',
                height: '5px',
                transition: 'width 1s linear'
              }}></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="app">
      <div className="task-table">
        <h2>Task Table</h2>
        <button onClick={addTask}>Add Task</button>
        <button onClick={queueTask}>Queue Task</button>
        <table>
          <thead>
            <tr>
              <th>Task</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <td key={task.id} style={{ color: task.isHighPriority ? 'red' : 'black' }}>
                <td>{task.value}</td>
              </td>
            ))}
          </tbody>
        </table>
      </div>
      <div className="queues">
        {renderQueue(highPriorityQueue, "High Priority Queue")}
        {regularQueues.map((queue, index) => renderQueue(queue, `Regular Queue ${index + 1}`))}
      </div>
    </div>  
  )


}

export default MyQueue;