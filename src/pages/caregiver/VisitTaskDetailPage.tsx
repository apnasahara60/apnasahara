import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  AlertCircle,
  Activity,
  ArrowRight
} from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
import { Visit } from '../../types';
import { useNotification } from '../../context/NotificationContext';

export const VisitTaskDetailPage: React.FC = () => {
  const { showToast } = useNotification();
  const caregiver = dbStore.getCaregivers()[0];
  const [activeVisit, setActiveVisit] = useState<Visit | null>(null);

  const loadVisit = () => {
    const list = dbStore.getVisits(caregiver?.id);
    setActiveVisit(list[0] || null);
  };

  useEffect(() => {
    loadVisit();
    const handleUpdate = () => loadVisit();
    window.addEventListener('apnasahara_datachange', handleUpdate);
    return () => window.removeEventListener('apnasahara_datachange', handleUpdate);
  }, []);

  const handleToggleTask = (taskId: string) => {
    if (!activeVisit) return;
    dbStore.toggleVisitTask(activeVisit.id, taskId);
    showToast('Task Updated', 'Visit task checklist updated', 'info');
  };

  const handleCheckIn = () => {
    if (!activeVisit) return;
    const updated: Visit = {
      ...activeVisit,
      status: 'in_progress',
      checked_in_at: new Date().toISOString()
    };
    dbStore.updateVisit(updated);
    showToast('Checked In', `GPS check-in verified at ${activeVisit.elder_name}'s residence`, 'visit');
  };

  const handleCheckOut = () => {
    if (!activeVisit) return;
    const allDone = activeVisit.tasks.every(t => t.completed);
    if (!allDone) {
      if (!confirm('Some tasks are still pending. Do you wish to complete visit check-out?')) return;
    }

    const updated: Visit = {
      ...activeVisit,
      status: 'completed',
      checked_out_at: new Date().toISOString()
    };
    dbStore.updateVisit(updated);
    showToast('Visit Completed', 'Checked out and summary report dispatched to family', 'visit');
  };

  if (!activeVisit) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-3xl border border-slate-200">
        No active visit in queue.
      </div>
    );
  }

  const completedCount = activeVisit.tasks.filter(t => t.completed).length;
  const totalCount = activeVisit.tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Task Execution Checklist</h1>
          <p className="text-xs text-slate-500">
            Active assignment for <strong>{activeVisit.elder_name}</strong> • {activeVisit.time_slot}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeVisit.status !== 'in_progress' && activeVisit.status !== 'completed' && (
            <button
              onClick={handleCheckIn}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> GPS Check-in
            </button>
          )}

          {activeVisit.status === 'in_progress' && (
            <button
              onClick={handleCheckOut}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Check-out & Sign Off
            </button>
          )}
        </div>
      </div>

      {/* Progress Card */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span>Task Completion Progress</span>
          <span className="text-blue-600">{completedCount} of {totalCount} completed ({progressPercent}%)</span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Interactive Task Checklist */}
      <div className="space-y-3">
        {activeVisit.tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => handleToggleTask(task.id)}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 select-none ${
              task.completed
                ? 'bg-emerald-50/70 border-emerald-300'
                : 'bg-white border-slate-200 hover:border-blue-300'
            }`}
          >
            <div className={`w-5 h-5 rounded-full mt-0.5 flex items-center justify-center shrink-0 ${
              task.completed ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300'
            }`}>
              {task.completed && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
            </div>

            <div className="flex-1">
              <h4 className={`text-sm font-bold ${task.completed ? 'text-slate-800 line-through' : 'text-slate-900'}`}>
                {task.title}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">Tap to toggle completion</p>
              {task.completed_at && (
                <span className="text-[10px] font-bold text-emerald-700 mt-1 inline-block">
                  Completed at {task.completed_at}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
