import React, { useState } from 'react';

function MyQueue() {
  const [tasks, setTasks] = useState([])
  const [highPriorityQueue, setHighPriorityQueue] = useState([])
  const [regularQueues, setRegularQueues] = useState([[], [], []])

  const addTask = () => {
    // This code creates a new task object and adds it to the tasks state
    const newTask = {
      // Assign a unique ID using the current timestamp
      id: Date.now(),
      // Generate a random value between 50 and 100 (inclusive)
      value: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
      // Determine if the task is high priority (30% chance)
      isHighPriority: Math.random() < 0.3 // 30% chance of being high priority
    }
    // Update the tasks state by adding the new task to the existing array
    setTasks([...tasks, newTask])
  }

  const queueTask = (task) => {
    if (task.isHighPriority) {
      setHighPriorityQueue([...highPriorityQueue, task])
    } else {
      const shortestQueue = regularQueues.reduce((acc, queue, index) => 
        queue.length < regularQueues[acc].length ? index : acc, 0)
      const newRegularQueues = [...regularQueues]
      newRegularQueues[shortestQueue] = [...newRegularQueues[shortestQueue], task]
      setRegularQueues(newRegularQueues)
    }
    setTasks(tasks.filter(t => t.id !== task.id))
  }
  
  return (
    <div className="app">
      <div className="task-table">
        <h2>Task Table</h2>
        <button onClick={addTask}>Add Task</button>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} style={{ color: task.isHighPriority ? 'red' : 'black' }}>
                <td>{task.value}</td>
                <td><button onClick={() => queueTask(task)}>Queue Task</button></td>
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