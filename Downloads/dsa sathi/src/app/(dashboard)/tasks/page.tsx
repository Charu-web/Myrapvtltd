'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { formatDate } from '@/lib/utils';
import { CalendarCheck, Plus, Clock, CheckCircle2 } from 'lucide-react';

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      if (Array.isArray(data)) setTasks(data);
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      });
      if (res.ok) {
        setModalOpen(false);
        fetchTasks();
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarCheck className="h-6 w-6 text-rose-600" /> Tasks & Follow-up Calendar
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Schedule customer follow-ups, document collection deadlines, and bank query resolution tasks.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} className="gap-1.5 shadow-sm">
          <Plus className="h-4 w-4" /> Add Task
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-xs text-slate-500">Loading task list...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Pending', 'In Progress', 'Completed'].map((stg) => {
            const list = tasks.filter((t) => (stg === 'Pending' ? t.status === 'Pending' : stg === 'Completed' ? t.status === 'Completed' : true));
            return (
              <Card key={stg} className="p-5 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <h3 className="text-xs font-bold text-slate-900 uppercase">{stg} Tasks</h3>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-xs font-bold text-slate-700">{list.length}</span>
                </div>
                <div className="space-y-3">
                  {list.map((t) => (
                    <div key={t.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1.5 text-xs">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-slate-900">{t.title}</span>
                        <Badge variant={t.priority === 'High' ? 'rose' : 'blue'}>{t.priority}</Badge>
                      </div>
                      <p className="text-[10px] text-slate-500">{t.description}</p>
                      <div className="pt-2 border-t border-slate-100 flex justify-between text-[10px] text-slate-400">
                        <span>Due: {formatDate(t.dueDate)}</span>
                        <span>{t.assignedTo?.fullName}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add Task Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Follow-up Task">
        <form onSubmit={handleCreateTask} className="space-y-4">
          <Input
            label="Task Description *"
            placeholder="e.g. Collect 6 months bank statement from Rajesh Kumar"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Create Task</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
