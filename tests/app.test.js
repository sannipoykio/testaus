import { describe, it, expect, beforeEach } from 'vitest';

let store = {};
beforeEach(() => {
  store = {};
  global.localStorage = {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
});

function addTask(tasks, { topic, priority = 'medium' }) {
  if (!topic) throw new Error('Topic required');
  const newTask = {
    id: 't_' + Math.random(),
    topic,
    priority,
    completed: false,
  };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return tasks;
}

function toggleComplete(tasks, id) {
  return tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
}

describe('Task logic', () => {
  it('adds a task', () => {
    let tasks = [];
    tasks = addTask(tasks, { topic: 'Test', priority: 'high' });
    expect(tasks.length).toBe(1);
    expect(tasks[0].topic).toBe('Test');
    expect(localStorage.getItem('tasks')).toBe(JSON.stringify(tasks));
  });

  it('cannot add task without topic', () => {
    expect(() => addTask([], { topic: '' })).toThrow();
  });

  it('toggles task completion', () => {
    let tasks = addTask([], { topic: 'Task 1' });
    const id = tasks[0].id;
    tasks = toggleComplete(tasks, id);
    expect(tasks[0].completed).toBe(true);
    tasks = toggleComplete(tasks, id);
    expect(tasks[0].completed).toBe(false);
  });
});
