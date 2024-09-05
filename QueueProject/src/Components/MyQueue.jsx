import React, { useState } from 'react';

function MyQueue() {
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const [highPriorityQueue, setHighPriorityQueue] = useState([])
  const [regularQueues, setRegularQueues] = useState([[], [], []])

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      value: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
      isHighPriority: Math.random() < 0.3
    }
    setTasks([...tasks, newTask])
  }

  const queueTask = () => {
    if (tasks.length === 0) return;
    const task = tasks[0]; // Fixed: Changed 'task' to 'tasks'
    setTasks(tasks.slice(1)); // Added: Remove the queued task from the tasks array
    if (task.isHighPriority) {
      setHighPriorityQueue([...highPriorityQueue, task]);
    } else {
      const shortestQueue = regularQueues.reduce((acc, queue, index) => 
        queue.length < regularQueues[acc].length ? index : acc, 0);
      const newRegularQueues = [...regularQueues];
      newRegularQueues[shortestQueue] = [...newRegularQueues[shortestQueue], task];
      setRegularQueues(newRegularQueues);
    }
  }

  return (
    <div className="app">
      <div className="task-table">
        <h2>Task Table</h2>
        <button onClick={addTask}>Add Task</button>
        <button onClick={queueTask} disabled={tasks.length === 0}>Queue Task</button> {/* Changed: Disabled condition */}
        <table>
          <thead>
            <tr>
              <th>Task</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr 
                key={task.id} 
                style={{ 
                  color: task.isHighPriority ? 'red' : 'black',
                  backgroundColor: selectedTask?.id === task.id ? '#e0e0e0' : 'transparent'
                }}
                onClick={() => setSelectedTask(task)}
              >
                <td>{task.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="queues">
        <div className="high-priority-queue">
          <h3>High Priority Queue</h3>
          <ul>
            {highPriorityQueue.map(task => <li key={task.id}>{task.value}</li>)}
          </ul>
        </div>
        {regularQueues.map((queue, index) => (
          <div key={index} className="regular-queue">
            <h3>Regular Queue {index + 1}</h3>
            <ul>
              {queue.map(task => <li key={task.id}>{task.value}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyQueue;