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
      <div className="art-card p-8 text-center text-[#17211C]/60 font-serif">
        No active visit in queue.
      </div>
    );
  }

  const completedCount = activeVisit.tasks.filter(t => t.completed).length;
  const totalCount = activeVisit.tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6 font-serif">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#CFB53B]/30 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#008080]">Care Attendant Checklist</span>
          <h1 className="text-2xl font-bold text-[#17211C]">Task Execution Checklist</h1>
          <p className="text-xs sm:text-sm text-[#17211C]/75 font-sans">
            Active assignment for <strong>{activeVisit.elder_name}</strong> • <span className="font-mono">{activeVisit.time_slot}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeVisit.status !== 'in_progress' && activeVisit.status !== 'completed' && (
            <button
              onClick={handleCheckIn}
              className="art-btn-primary px-5 py-2.5 flex items-center gap-2 text-xs shadow-md"
            >
              <CheckCircle2 className="w-4 h-4 text-[#CFB53B]" /> GPS Check-in
            </button>
          )}

          {activeVisit.status === 'in_progress' && (
            <button
              onClick={handleCheckOut}
              className="px-5 py-2.5 rounded-art bg-[#808000] hover:bg-[#686800] text-[#FFFFF0] font-bold text-xs shadow-md border border-[#CFB53B]/50 flex items-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-[#FFFDD0]" /> Complete & Check-Out
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar Card */}
      <div className="art-card p-6 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#17211C] uppercase tracking-wider">Protocol Completion</span>
          <span className="font-bold text-[#008080] font-mono">{completedCount} of {totalCount} completed ({progressPercent}%)</span>
        </div>
        <div className="w-full h-3 rounded-full bg-[#FFFDD0] border border-[#CFB53B]/50 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#008080] to-[#808000] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Task Checklist Items */}
      <div className="space-y-3">
        {activeVisit.tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => handleToggleTask(task.id)}
            className={`art-card p-5 cursor-pointer flex items-center justify-between gap-4 transition-all hover:border-[#CFB53B] ${
              task.completed ? 'bg-[#FFFDD0]/40 opacity-85' : 'bg-[#FFFFF0]'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-6 h-6 rounded-art border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                task.completed ? 'bg-[#808000] border-[#808000] text-[#FFFFF0]' : 'border-[#CFB53B] bg-[#FFFFF0]'
              }`}>
                {task.completed && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
              </div>
              <div>
                <h3 className={`text-base font-bold ${task.completed ? 'line-through text-[#17211C]/50' : 'text-[#17211C]'}`}>
                  {task.title}
                </h3>
                <p className="text-xs text-[#17211C]/65 font-sans mt-0.5">
                  Category: <span className="font-semibold text-[#008080] capitalize">{task.category}</span>
                </p>
              </div>
            </div>

            <span className={`text-[11px] font-bold px-3 py-1 rounded-art border font-sans ${
              task.completed
                ? 'bg-[#808000]/15 text-[#808000] border-[#808000]/30'
                : 'bg-[#FFFDD0] text-[#17211C]/75 border-[#CFB53B]/50'
            }`}>
              {task.completed ? 'Done ✓' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
