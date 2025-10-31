/**
 * ALGORITHME DE RÉPARTITION V4
 * Normalisation, pondération, stratégies hétérogène/homogène
 */

// ═══════════════════════════════════════════════════════════════
//  NORMALISATION (Z-SCORES)
// ═══════════════════════════════════════════════════════════════

function calculateStats(students, columns = ['scoreM', 'scoreF', 'com', 'tra', 'part', 'abs']) {
  const stats = {};

  columns.forEach(col => {
    const values = students.map(s => s[col] || 0).filter(v => Number.isFinite(v));
    const mean = values.reduce((a, b) => a + b, 0) / values.length || 0;
    const variance = values.reduce((a, v) => a + Math.pow(v - mean, 2), 0) / values.length || 1;
    const stdDev = Math.sqrt(variance) || 1;

    stats[col] = { mean, stdDev, min: Math.min(...values), max: Math.max(...values) };
  });

  return stats;
}

function normalizeStudent(student, stats) {
  return {
    ...student,
    z_scoreM: (student.scoreM - stats.scoreM.mean) / (stats.scoreM.stdDev || 1),
    z_scoreF: (student.scoreF - stats.scoreF.mean) / (stats.scoreF.stdDev || 1),
    z_com: (student.com - stats.com.mean) / (stats.com.stdDev || 1),
    z_tra: (student.tra - stats.tra.mean) / (stats.tra.stdDev || 1),
    z_part: (student.part - stats.part.mean) / (stats.part.stdDev || 1),
    z_abs: (student.abs - stats.abs.mean) / (stats.abs.stdDev || 1)
  };
}

// ═══════════════════════════════════════════════════════════════
//  PONDÉRATIONS DYNAMIQUES
// ═══════════════════════════════════════════════════════════════

function getWeights(scenario) {
  const weights = {
    needs: {
      scoreM: 0.35,
      scoreF: 0.35,
      com: 0.15,
      tra: 0.10,
      part: 0.05,
      abs: -0.10
    },
    language: {
      scoreM: 0.20,
      scoreF: 0.40,
      com: 0.10,
      tra: 0.10,
      part: 0.15,
      abs: -0.05
    },
    option: {
      scoreM: 0.25,
      scoreF: 0.25,
      com: 0.15,
      tra: 0.15,
      part: 0.10,
      abs: -0.10
    }
  };

  return weights[scenario] || weights.needs;
}

function calculateIndice(student, scenario) {
  const weights = getWeights(scenario);

  return (
    weights.scoreM * (student.z_scoreM || 0) +
    weights.scoreF * (student.z_scoreF || 0) +
    weights.com * (student.z_com || 0) +
    weights.tra * (student.z_tra || 0) +
    weights.part * (student.z_part || 0) +
    weights.abs * (student.z_abs || 0)
  );
}

// ═══════════════════════════════════════════════════════════════
//  STRATÉGIE HÉTÉROGÈNE (Round-robin inverse)
// ═══════════════════════════════════════════════════════════════

function distributeHeterogeneous(students, groupCount) {
  // Trier par indice décroissant
  const sorted = [...students].sort((a, b) => (b.indice || 0) - (a.indice || 0));

  // Créer groupes vides
  const groups = Array.from({ length: groupCount }, (_, i) => ({
    id: `grp_${i}`,
    number: i + 1,
    students: [],
    stats: {}
  }));

  // Distribution serpentine (round-robin inverse)
  sorted.forEach((student, idx) => {
    const groupIdx = idx % groupCount;
    groups[groupIdx].students.push(student);
  });

  // Ajustement parité F/M
  adjustParityInGroups(groups);

  // Calculer stats
  groups.forEach(group => {
    group.stats = calculateGroupStats(group.students);
  });

  return groups;
}

// ═══════════════════════════════════════════════════════════════
//  STRATÉGIE HOMOGÈNE (Quantiles)
// ═══════════════════════════════════════════════════════════════

function distributeHomogeneous(students, groupCount) {
  // Trier par indice décroissant
  const sorted = [...students].sort((a, b) => (b.indice || 0) - (a.indice || 0));

  // Diviser en quantiles
  const quantileSize = Math.ceil(sorted.length / groupCount);
  const groups = Array.from({ length: groupCount }, (_, i) => ({
    id: `grp_${i}`,
    number: i + 1,
    students: sorted.slice(i * quantileSize, (i + 1) * quantileSize),
    stats: {}
  }));

  // Ajustement parité
  adjustParityInGroups(groups);

  // Calculer stats
  groups.forEach(group => {
    group.stats = calculateGroupStats(group.students);
  });

  return groups;
}

// ═══════════════════════════════════════════════════════════════
//  AJUSTEMENT PARITÉ F/M
// ═══════════════════════════════════════════════════════════════

function adjustParityInGroups(groups) {
  // Compter F/M par groupe
  groups.forEach(group => {
    const fCount = group.students.filter(s => s.sexe === 'F').length;
    const mCount = group.students.length - fCount;
    group.fCount = fCount;
    group.mCount = mCount;
  });

  // Chercher déséquilibres et swapper
  for (let iteration = 0; iteration < 10; iteration++) {
    let swapped = false;

    for (let i = 0; i < groups.length; i++) {
      for (let j = i + 1; j < groups.length; j++) {
        const group1 = groups[i];
        const group2 = groups[j];

        const diff1 = Math.abs(group1.fCount - group1.mCount);
        const diff2 = Math.abs(group2.fCount - group2.mCount);

        if (diff1 > 1 || diff2 > 1) {
          // Chercher swap bénéfique
          const fInG1 = group1.students.find(s => s.sexe === 'F');
          const mInG1 = group1.students.find(s => s.sexe === 'M');
          const fInG2 = group2.students.find(s => s.sexe === 'F');
          const mInG2 = group2.students.find(s => s.sexe === 'M');

          if (group1.fCount > group1.mCount && mInG2 && fInG1) {
            // Swap F de G1 avec M de G2
            const fIdx = group1.students.indexOf(fInG1);
            const mIdx = group2.students.indexOf(mInG2);
            [group1.students[fIdx], group2.students[mIdx]] = [group2.students[mIdx], group1.students[fIdx]];
            group1.fCount--;
            group1.mCount++;
            group2.fCount++;
            group2.mCount--;
            swapped = true;
          } else if (group1.mCount > group1.fCount && fInG2 && mInG1) {
            // Swap M de G1 avec F de G2
            const mIdx = group1.students.indexOf(mInG1);
            const fIdx = group2.students.indexOf(fInG2);
            [group1.students[mIdx], group2.students[fIdx]] = [group2.students[fIdx], group1.students[mIdx]];
            group1.fCount++;
            group1.mCount--;
            group2.fCount--;
            group2.mCount++;
            swapped = true;
          }
        }
      }
    }

    if (!swapped) break;
  }
}

// ═══════════════════════════════════════════════════════════════
//  CALCUL STATS GROUPES
// ═══════════════════════════════════════════════════════════════

function calculateGroupStats(students) {
  if (!students || students.length === 0) {
    return {
      avgScoreM: 0,
      avgScoreF: 0,
      avgCom: 0,
      avgTra: 0,
      avgPart: 0,
      avgAbs: 0,
      ratioF: 0.5,
      count: 0
    };
  }

  const count = students.length;
  const fCount = students.filter(s => s.sexe === 'F').length;

  return {
    avgScoreM: students.reduce((a, s) => a + (s.scoreM || 0), 0) / count,
    avgScoreF: students.reduce((a, s) => a + (s.scoreF || 0), 0) / count,
    avgCom: students.reduce((a, s) => a + (s.com || 0), 0) / count,
    avgTra: students.reduce((a, s) => a + (s.tra || 0), 0) / count,
    avgPart: students.reduce((a, s) => a + (s.part || 0), 0) / count,
    avgAbs: students.reduce((a, s) => a + (s.abs || 0), 0) / count,
    ratioF: fCount / count,
    count: count
  };
}

// ═══════════════════════════════════════════════════════════════
//  GÉNÉRATION PRINCIPALE
// ═══════════════════════════════════════════════════════════════

function generateGroups(students, groupCount, distributionMode, scenario) {
  if (!students || students.length === 0) {
    return { success: false, error: 'Aucun élève' };
  }

  try {
    // 1. Calculer stats
    const stats = calculateStats(students);

    // 2. Normaliser élèves
    const normalized = students.map(s => normalizeStudent(s, stats));

    // 3. Calculer indices
    const withIndices = normalized.map(s => ({
      ...s,
      indice: calculateIndice(s, scenario)
    }));

    // 4. Distribuer selon mode
    const groups = distributionMode === 'heterogeneous'
      ? distributeHeterogeneous(withIndices, groupCount)
      : distributeHomogeneous(withIndices, groupCount);

    return {
      success: true,
      groups: groups,
      totalStudents: students.length,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Erreur génération:', error);
    return { success: false, error: error.message };
  }
}
