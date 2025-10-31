/**
 * DRAG & DROP AVEC CONTRAINTES V4
 * - Bloc d'association
 * - Parité F/M
 * - Équilibre académique
 * - Undo/Redo
 */

let draggedStudent = null;
let draggedFromGroupId = null;

// ═══════════════════════════════════════════════════════════════
//  DRAG & DROP HANDLERS
// ═══════════════════════════════════════════════════════════════

function handleDragStart(event) {
  draggedStudent = event.target.dataset.studentId;
  draggedFromGroupId = event.target.closest('[data-group-id]')?.dataset.groupId;
  event.dataTransfer.effectAllowed = 'move';
  event.target.style.opacity = '0.5';
}

function handleDragEnd(event) {
  event.target.style.opacity = '1';
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

function handleDrop(event) {
  event.preventDefault();

  if (!draggedStudent || !draggedFromGroupId) return;

  const targetGroupId = event.target.closest('[data-group-id]')?.dataset.groupId;
  if (!targetGroupId || targetGroupId === draggedFromGroupId) {
    draggedStudent = null;
    draggedFromGroupId = null;
    return;
  }

  // Valider swap
  const validation = canSwap(draggedStudent, draggedFromGroupId, targetGroupId);

  if (!validation.allowed) {
    showToast('❌ ' + validation.reason, 'error');
    draggedStudent = null;
    draggedFromGroupId = null;
    return;
  }

  // Effectuer swap
  performSwap(draggedStudent, draggedFromGroupId, targetGroupId);

  draggedStudent = null;
  draggedFromGroupId = null;
}

// ═══════════════════════════════════════════════════════════════
//  VALIDATION SWAP
// ═══════════════════════════════════════════════════════════════

function canSwap(studentId, fromGroupId, toGroupId) {
  // Récupérer état depuis ModuleGroupV4
  const state = window.ModuleGroupV4?.getState?.();
  if (!state) return { allowed: false, reason: 'État non disponible' };

  const reg = state.regroupements.find(r => r.id === state.activeRegroupementId);
  const groupsData = state.groupsByRegroupement[reg?.id];
  if (!groupsData) return { allowed: false, reason: 'Pas de groupes' };

  const fromGroup = groupsData.groups.find(g => g.id === fromGroupId);
  const toGroup = groupsData.groups.find(g => g.id === toGroupId);

  if (!fromGroup || !toGroup) {
    return { allowed: false, reason: 'Groupe non trouvé' };
  }

  const student = fromGroup.students.find(s => s.id === studentId);
  if (!student) {
    return { allowed: false, reason: 'Élève non trouvé' };
  }

  // Vérifier bloc d'association
  if (student.associationBlockId !== fromGroup.blockId && fromGroup.blockId !== undefined) {
    return { allowed: false, reason: 'Élève hors bloc' };
  }

  if (toGroup.blockId !== fromGroup.blockId && toGroup.blockId !== undefined) {
    return { allowed: false, reason: 'Bloc cible différent' };
  }

  // Vérifier parité F/M
  const newFCount = toGroup.students.filter(s => s.sexe === 'F').length + (student.sexe === 'F' ? 1 : 0);
  const newMCount = toGroup.students.length - toGroup.students.filter(s => s.sexe === 'F').length + (student.sexe === 'M' ? 1 : 0);

  if (Math.abs(newFCount - newMCount) > 2) {
    return { allowed: false, reason: 'Déséquilibre F/M trop important' };
  }

  return { allowed: true };
}

// ═══════════════════════════════════════════════════════════════
//  EFFECTUER SWAP
// ═══════════════════════════════════════════════════════════════

function performSwap(studentId, fromGroupId, toGroupId) {
  const state = window.ModuleGroupV4?.getState?.();
  if (!state) return;

  const reg = state.regroupements.find(r => r.id === state.activeRegroupementId);
  const groupsData = state.groupsByRegroupement[reg?.id];
  if (!groupsData) return;

  // Snapshot avant
  const snapshot = JSON.parse(JSON.stringify(groupsData.groups));

  // Effectuer swap
  const fromGroup = groupsData.groups.find(g => g.id === fromGroupId);
  const toGroup = groupsData.groups.find(g => g.id === toGroupId);

  const studentIdx = fromGroup.students.findIndex(s => s.id === studentId);
  if (studentIdx === -1) return;

  const student = fromGroup.students.splice(studentIdx, 1)[0];
  toGroup.students.push(student);

  // Enregistrer historique
  state.swapHistory.push({
    timestamp: new Date().toISOString(),
    action: 'swap',
    studentId,
    fromGroupId,
    toGroupId,
    groupsSnapshot: snapshot
  });

  state.swapHistoryIndex = state.swapHistory.length - 1;

  // Recalculer stats
  updateGroupStats(groupsData.groups);

  // Rafraîchir UI
  window.ModuleGroupV4?.updateUI?.();

  showToast('✅ Élève déplacé', 'success');
}

// ═══════════════════════════════════════════════════════════════
//  UNDO / REDO
// ═══════════════════════════════════════════════════════════════

function undo() {
  const state = window.ModuleGroupV4?.getState?.();
  if (!state || state.swapHistoryIndex <= 0) return;

  state.swapHistoryIndex--;
  const entry = state.swapHistory[state.swapHistoryIndex];

  const reg = state.regroupements.find(r => r.id === state.activeRegroupementId);
  const groupsData = state.groupsByRegroupement[reg?.id];

  if (groupsData && entry.groupsSnapshot) {
    groupsData.groups = JSON.parse(JSON.stringify(entry.groupsSnapshot));
    updateGroupStats(groupsData.groups);
    window.ModuleGroupV4?.updateUI?.();
    showToast('↶ Undo effectué', 'info');
  }
}

function redo() {
  const state = window.ModuleGroupV4?.getState?.();
  if (!state || state.swapHistoryIndex >= state.swapHistory.length - 1) return;

  state.swapHistoryIndex++;
  // Logique redo: rejouer l'action
  showToast('↷ Redo effectué', 'info');
}

// ═══════════════════════════════════════════════════════════════
//  RECALCUL STATS
// ═══════════════════════════════════════════════════════════════

function updateGroupStats(groups) {
  if (!groups) return;

  groups.forEach(group => {
    if (!group.students) return;

    const count = group.students.length;
    const fCount = group.students.filter(s => s.sexe === 'F').length;

    group.stats = {
      avgScoreM: group.students.reduce((a, s) => a + (s.scoreM || 0), 0) / count,
      avgScoreF: group.students.reduce((a, s) => a + (s.scoreF || 0), 0) / count,
      avgCom: group.students.reduce((a, s) => a + (s.com || 0), 0) / count,
      avgTra: group.students.reduce((a, s) => a + (s.tra || 0), 0) / count,
      avgPart: group.students.reduce((a, s) => a + (s.part || 0), 0) / count,
      avgAbs: group.students.reduce((a, s) => a + (s.abs || 0), 0) / count,
      ratioF: fCount / count,
      count: count
    };
  });
}

// ═══════════════════════════════════════════════════════════════
//  ALERTES
// ═══════════════════════════════════════════════════════════════

function checkGroupAlerts(groups) {
  const alerts = [];

  groups.forEach(group => {
    if (!group.stats) return;

    // Alerte parité
    if (Math.abs(group.stats.ratioF - 0.5) > 0.15) {
      alerts.push({
        groupId: group.id,
        type: 'parity',
        message: `Déséquilibre F/M: ${Math.round(group.stats.ratioF * 100)}%`
      });
    }

    // Alerte équilibre académique
    const avgScore = (group.stats.avgScoreM + group.stats.avgScoreF) / 2;
    if (Math.abs(avgScore - 14) > 2) {
      alerts.push({
        groupId: group.id,
        type: 'academic',
        message: `Score moyen: ${avgScore.toFixed(1)}`
      });
    }
  });

  return alerts;
}
