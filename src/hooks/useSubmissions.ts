import { useState, useEffect, useCallback } from 'react';
import { demoSubmissions } from '../data/photoChallengeData';

export interface Submission {
  id: string;
  photographer: string;
  title: string;
  locationName: string;
  photoUrl: string;
  dateSubmitted: string;
  votes: number;
  story: string;
  status: 'pending' | 'approved' | 'rejected';
}

export function useSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const loadSubmissions = useCallback(() => {
    const stored = localStorage.getItem('histonex_submissions');
    if (stored) {
      setSubmissions(JSON.parse(stored));
    } else {
      const initial = demoSubmissions.map(sub => ({ ...sub, status: 'approved' as const }));
      setSubmissions(initial);
      localStorage.setItem('histonex_submissions', JSON.stringify(initial));
    }
  }, []);

  // Initialize and listen for changes
  useEffect(() => {
    loadSubmissions();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'histonex_submissions') {
        loadSubmissions();
      }
    };

    const handleCustomChange = () => {
      loadSubmissions();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('histonex_submissions_updated', handleCustomChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('histonex_submissions_updated', handleCustomChange);
    };
  }, [loadSubmissions]);

  const saveSubmissions = (newSubmissions: Submission[]) => {
    setSubmissions(newSubmissions);
    try {
      localStorage.setItem('histonex_submissions', JSON.stringify(newSubmissions));
      window.dispatchEvent(new Event('histonex_submissions_updated'));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
      alert('Storage limit reached! Please reject some old photos in the Admin Panel to free up space.');
    }
  };

  const addSubmission = (newSub: Omit<Submission, 'id' | 'status' | 'votes' | 'dateSubmitted'>) => {
    const submission: Submission = {
      ...newSub,
      id: `sub_${Date.now()}`,
      status: 'pending',
      votes: 0,
      dateSubmitted: new Date().toISOString()
    };
    const updated = [submission, ...submissions];
    saveSubmissions(updated);
  };

  const updateStatus = (id: string, status: 'approved' | 'rejected') => {
    const updated = submissions.map(sub => 
      sub.id === id ? { ...sub, status } : sub
    );
    saveSubmissions(updated);
  };

  const toggleLike = (id: string) => {
    const updated = submissions.map(sub => 
      sub.id === id ? { ...sub, votes: sub.votes + 1 } : sub
    );
    saveSubmissions(updated);
  };

  return {
    submissions,
    pendingSubmissions: submissions.filter(s => s.status === 'pending'),
    approvedSubmissions: submissions.filter(s => s.status === 'approved'),
    addSubmission,
    updateStatus,
    toggleLike
  };
}
